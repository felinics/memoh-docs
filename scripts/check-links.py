#!/usr/bin/env python3
"""Validate scalar.config.json paths and all internal markdown links/images."""
import json, pathlib, re, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"
errs = []

cfg = json.loads((REPO / "scalar.config.json").read_text(encoding="utf-8"))
listed = set()
def walk(node):
    for key in ("filepath",):
        if key in node:
            listed.add(node[key])
            if not (REPO / node[key]).is_file(): errs.append(f"config: missing {node[key]}")
    ch = node.get("children", {})
    for c in (ch.values() if isinstance(ch, dict) else ch): walk(c)

# Support both multi-version (v2: versions) and single-version (v1: navigation) configs.
for ver in cfg.get("versions", {}).values():
    for route in ver.get("routes", {}).values(): walk(route)
for route in cfg.get("navigation", {}).get("routes", {}).values(): walk(route)
for key in ():
    v = cfg.get("siteConfig", {}).get(key)
    if v and not (REPO / v).is_file(): errs.append(f"config: missing {key} {v}")
for v in ():
    if not (REPO / v).is_file(): errs.append(f"config: missing logo {v}")

on_disk = {str(p.relative_to(REPO)) for p in DOCS.rglob("*.md")}
for orphan in sorted(on_disk - listed): errs.append(f"orphan page not in config: {orphan}")

LINK = re.compile(r"!?\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HREF = re.compile(r'href="([^"]+)"')
for md in sorted(DOCS.rglob("*.md")):
    text = md.read_text(encoding="utf-8")
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = re.sub(r"`[^`\n]*`", "", text)
    for target in LINK.findall(text) + HREF.findall(text):
        if re.match(r"^(https?:|mailto:|#|<)", target): continue
        base = target.split("#", 1)[0]
        if not base: continue
        if base.startswith("/"): errs.append(f"{md.relative_to(REPO)}: absolute link {target}"); continue
        dest = (md.parent / base).resolve()
        if not dest.exists(): errs.append(f"{md.relative_to(REPO)}: broken link {target}")
    if re.search(r"^:::", text, re.M): errs.append(f"{md.relative_to(REPO)}: leftover VitePress ::: container")
    if "<script" in text: errs.append(f"{md.relative_to(REPO)}: leftover <script>")

for e in errs: print(e)
print(f"{len(on_disk)} pages, {len(listed)} listed, {len(errs)} problems")
sys.exit(1 if errs else 0)