#!/usr/bin/env python3
"""One-off VitePress -> Scalar Docs markdown conversion. Idempotent."""
import os, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "docs"
CALLOUT = {"tip": "tip", "info": "info", "warning": "warning", "danger": "danger", "details": "info", "note": "info"}
PUBLIC = ROOT / "public"

def convert(path: pathlib.Path) -> bool:
    src = path.read_text(encoding="utf-8")
    out = src

    # --- front matter: drop VitePress-only keys, keep title/description
    m = re.match(r"^---\n(.*?)\n---\n", out, re.S)
    if m:
        fm = m.group(1)
        fm = "\n".join(l for l in fm.splitlines() if not re.match(r"^(layout|hero|features|sidebar|aside|outline|prev|next|editLink|lastUpdated)\s*:", l))
        out = ("---\n" + fm + "\n---\n" if fm.strip() else "") + out[m.end():]

    # --- strip Vue script/style blocks and custom components
    out = re.sub(r"<script[^>]*>.*?</script>\s*", "", out, flags=re.S)
    out = re.sub(r"<style[^>]*>.*?</style>\s*", "", out, flags=re.S)
    out = re.sub(r"<DocsHome\s*/>\s*", "", out)

    # --- ::: containers -> scalar callouts
    def repl_container(m):
        kind, title = m.group(1), (m.group(2) or "").strip()
        body = m.group(3).rstrip("\n")
        tag = CALLOUT.get(kind, "info")
        head = f'<scalar-callout type="{tag}"' + (f' title="{title}"' if title else "") + ">"
        return f"{head}\n{body}\n</scalar-callout>\n"
    out = re.sub(r"^:::\s*(\w+)[ \t]*([^\n]*)\n(.*?)^:::[ \t]*$\n?", repl_container, out, flags=re.S | re.M)

    # --- links: resolve to relative .md paths (skip inside code fences)
    lang = "zh" if path.parts[len(ROOT.parts)] == "zh" else "en"
    def fix_link(m):
        text, target = m.group(1), m.group(2)
        if re.match(r"^(https?:|mailto:|#|<)", target) or target.startswith("!"):
            return m.group(0)
        anchor = ""
        if "#" in target:
            target, anchor = target.split("#", 1); anchor = "#" + anchor
        if not target:
            return m.group(0)
        # images stay as-is (handled below)
        if re.search(r"\.(png|jpg|jpeg|svg|gif|webp)$", target, re.I):
            return m.group(0)
        if target.startswith("/"):
            t = target.lstrip("/")
            if t.startswith("zh/") or t == "zh": abs_path = ROOT / t
            else: abs_path = ROOT / "en" / t
        else:
            abs_path = (path.parent / target).resolve()
        # normalise to .md
        s = str(abs_path)
        if s.endswith("/") or abs_path.is_dir(): abs_path = pathlib.Path(s.rstrip("/")) / "index.md"
        elif not s.endswith(".md"): abs_path = pathlib.Path(s + ".md")
        if not abs_path.exists():
            # fallback: maybe it was a dir index without trailing slash
            alt = pathlib.Path(s.rstrip("/")) / "index.md"
            if alt.exists(): abs_path = alt
            else:
                MISSING.append((str(path.relative_to(ROOT)), target))
        rel = os.path.relpath(abs_path, path.parent).replace(os.sep, "/")
        if not rel.startswith("."): rel = "./" + rel
        return f"[{text}]({rel}{anchor})"

    parts = re.split(r"(```.*?```)", out, flags=re.S)
    for i in range(0, len(parts), 2):
        parts[i] = re.sub(r"(?<!!)\[([^\]]*)\]\(([^)\s]+)\)", fix_link, parts[i])
        # images: /getting-started/x.png -> relative to public
        def fix_img(m):
            alt, target = m.group(1), m.group(2)
            if target.startswith("/"):
                rel = os.path.relpath(PUBLIC / target.lstrip("/"), path.parent).replace(os.sep, "/")
                return f"![{alt}]({rel})"
            return m.group(0)
        parts[i] = re.sub(r"!\[([^\]]*)\]\(([^)\s]+)\)", fix_img, parts[i])
    out = "".join(parts)

    if out != src:
        path.write_text(out, encoding="utf-8"); return True
    return False

MISSING = []
changed = 0
for p in sorted(ROOT.rglob("*.md")):
    if convert(p): changed += 1
print(f"changed {changed} files")
for f, t in MISSING: print("MISSING", f, "->", t)
sys.exit(1 if MISSING else 0)