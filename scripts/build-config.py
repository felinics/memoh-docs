#!/usr/bin/env python3
"""Generate scalar.config.json from a single bilingual sidebar spec."""
import json, pathlib, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"

# Sidebar spec. Page tuple: (path, en, zh). Group tuple: ("group", en, zh, slug, children).
LOGO_URL = "https://raw.githubusercontent.com/felinics/memoh-docs/main/docs/public/logo.svg"

CHANNELS = ["dingtalk", "discord", "feishu", "line", "matrix", "misskey", "qq",
            "slack", "telegram", "wechatoa", "wecom", "weixin"]

SIDEBAR = [
    ("group", "Getting Started", "快速开始", "getting-started", [
        ("guides/get-started.md", "Get Started", "入门教程"),
        ("guides/quick-start.md", "Quick Start", "快速开始"),
        ("guides/preferences.md", "Preferences", "用户偏好"),
        ("guides/bot.md", "Bot", "机器人"),
        ("guides/sessions.md", "Sessions", "会话"),
        ("guides/files.md", "Files", "文件"),
        ("guides/slash-commands.md", "Slash Commands", "斜杠命令"),
        ("group", "Deployment", "部署", "deployment", [
            ("self-hosted/index.md", "Overview", "总览"),
            ("self-hosted/docker.md", "Server Deploy", "服务器部署"),
            ("self-hosted/desktop.md", "Desktop", "Desktop 桌面版"),
            ("self-hosted/workspace-backends.md", "Workspace Backends", "工作区后端"),
        ]),
        ("group", "Channels", "渠道", "channels", [
            ("integrations/channels/index.md", "Overview", "总览"),
            ("integrations/channels/slack.md", "Slack", "Slack"),
            ("integrations/channels/telegram.md", "Telegram", "Telegram"),
            ("integrations/channels/feishu.md", "Feishu (Lark)", "飞书"),
            ("integrations/channels/discord.md", "Discord", "Discord"),
            ("integrations/channels/qq.md", "QQ", "QQ"),
            ("integrations/channels/matrix.md", "Matrix", "Matrix"),
            ("integrations/channels/misskey.md", "Misskey", "Misskey"),
            ("integrations/channels/line.md", "LINE", "LINE"),
            ("integrations/channels/dingtalk.md", "DingTalk", "钉钉"),
            ("integrations/channels/wecom.md", "WeCom (WeWork)", "企微"),
            ("integrations/channels/weixin.md", "WeChat", "微信"),
            ("integrations/channels/wechatoa.md", "WeChat Official Account", "微信公众号"),
        ]),
    ]),
    ("group", "Advanced", "进阶教程", "advanced", [
        ("guides/acp.md", "Agents / ACP", "Agents / ACP"),
        ("guides/access.md", "Access Control", "访问控制"),
        ("guides/container.md", "Workspace", "工作区"),
        ("guides/computers.md", "Computers", "电脑（远程 Runtime）"),
        ("guides/browser-computer-use.md", "Browser / Computer Use", "Browser / Computer Use"),
        ("guides/skills.md", "Skills", "技能"),
        ("guides/supermarket.md", "Supermarket", "应用市场"),
        ("guides/connectors.md", "Connectors", "连接器"),
        ("guides/hooks.md", "Hooks", "Hooks"),
        ("guides/mcp.md", "MCP", "MCP"),
        ("guides/memory.md", "Memory", "长期记忆"),
        ("guides/compaction.md", "Compaction", "上下文压缩"),
        ("guides/schedule.md", "Scheduled Tasks", "定时任务"),
        ("guides/email.md", "Email", "邮件"),
        ("group", "Providers", "提供方", "providers", [
            ("integrations/providers/index.md", "Overview", "总览"),
            ("integrations/providers/llm.md", "LLM Providers", "模型服务商"),
            ("integrations/providers/web-search.md", "Web Search Providers", "搜索提供方"),
            ("integrations/providers/video.md", "Video Providers", "视频提供方"),
            ("group", "Memory Providers", "记忆提供方", "memory-providers", [
                ("integrations/providers/memory/index.md", "Overview", "总览"),
                ("integrations/providers/memory/builtin.md", "Built-in", "内置"),
                ("integrations/providers/memory/mem0.md", "Mem0", "Mem0"),
                ("integrations/providers/memory/openviking.md", "OpenViking", "OpenViking"),
            ]),
            ("group", "TTS Providers", "TTS 提供方", "tts-providers", [
                ("integrations/providers/tts/index.md", "Overview", "总览"),
                ("integrations/providers/tts/edge.md", "Edge TTS", "Edge TTS"),
            ]),
        ]),
    ]),
    ("guides/use-cases.md", "Use Cases", "使用场景"),
]

EDIT_JS_TEMPLATE = """(function () {
  var EDIT_BASE = "__EDIT_BASE__";
  var MAP = __MAP__;
  var EN_LABEL = "Edit on GitHub";
  var ZH_LABEL = "在 GitHub 上编辑";

  function currentPath() {
    var p = window.location.pathname;
    if (p.length > 1 && p.charAt(p.length - 1) === "/") p = p.slice(0, -1);
    return p;
  }

  function isZh() {
    return currentPath().indexOf("/zh") === 0;
  }

  function ensureStyle() {
    if (document.getElementById("memoh-edit-style")) return;
    var style = document.createElement("style");
    style.id = "memoh-edit-style";
    style.textContent = [
      ".memoh-edit-github { margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--scalar-border-color); }",
      ".memoh-edit-github a { display: inline-flex; align-items: center; gap: 8px; font-size: var(--scalar-small); color: var(--scalar-color-2); text-decoration: none; }",
      ".memoh-edit-github a:hover { color: var(--scalar-color-1); text-decoration: underline; }"
    ].join(" ");
    document.head.appendChild(style);
  }

  function inject() {
    var file = MAP[currentPath()];
    var content = document.querySelector(".page-node.t-prose");
    if (!file || !content) return;
    if (content.querySelector(".memoh-edit-github")) return;
    var zh = isZh();
    var wrap = document.createElement("div");
    wrap.className = "memoh-edit-github";
    var a = document.createElement("a");
    a.href = EDIT_BASE + file;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", zh ? ZH_LABEL : EN_LABEL);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z");
    svg.appendChild(path);
    a.appendChild(svg);
    a.appendChild(document.createTextNode(zh ? ZH_LABEL : EN_LABEL));
    wrap.appendChild(a);
    content.appendChild(wrap);
  }

  function run() {
    ensureStyle();
    inject();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  var scheduled = false;
  var observer = new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      inject();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
"""

errors = []
OLD_TO_NEW = {}  # docs-relative path (lang-less) -> new route
ROUTE_TO_FP = {}  # full URL -> source filepath (edit-on-github map)

EDIT_BASE = "https://github.com/felinics/memoh-docs/edit/main/"


def full_url(lang, route):
    """Prefix zh routes with /zh; keep the home path clean."""
    if route == "/":
        return "/" if lang == "en" else "/zh"
    return route if lang == "en" else "/zh" + route


def slug(rel):
    """docs-relative path -> route segment (index.md collapses to parent)."""
    seg = pathlib.Path(rel).stem
    return None if seg == "index" else "/" + seg


def old_route(rel):
    """Reconstruct the pre-merge route for a docs-relative (lang-less) path."""
    parts = rel.split("/")
    stem = parts[-1][:-3]  # strip .md
    if stem == "index":
        return "/" + "/".join(parts[:-1])
    return "/" + "/".join(parts[:-1]) + "/" + stem


def build(items, lang, prefix=""):
    """Return an ordered dict of route-segment -> node; record old->new mapping."""
    out = {}
    for it in items:
        if it[0] == "group":
            _, en, zh, gslug, kids = it
            gp = prefix + "/" + gslug
            kids_map = build(kids, lang, gp)
            idx = kids_map.pop("__index__", None)
            node = {"type": "group", "title": zh if lang == "zh" else en, "children": kids_map}
            if idx:
                node["children"][""] = {"type": "page", "title": "Overview" if lang == "en" else "总览", "filepath": idx["filepath"]}
            out["/" + gslug] = node
        else:
            rel, en, zh = it
            fp = f"docs/{lang}/{rel}"
            if not (REPO / fp).exists():
                errors.append(fp)
            node = {"type": "page", "title": zh if lang == "zh" else en, "filepath": fp}
            seg = slug(rel)
            if seg is None:
                key = "__index__"
                route = prefix
            else:
                key = seg
                route = prefix + seg
            OLD_TO_NEW[rel] = route
            ROUTE_TO_FP[full_url(lang, route)] = fp
            out[key] = node
    return out


def version_routes(lang, home_title, about_title):
    home_fp = f"docs/{lang}/index.md"
    ref_fp = f"docs/{lang}/guides/index.md"
    about_fp = f"docs/{lang}/about.md"
    children = {"/": {"type": "page", "title": home_title, "filepath": home_fp}}
    ROUTE_TO_FP[full_url(lang, "/")] = home_fp
    ref_kids = build(SIDEBAR, lang, "/references")
    ref_node = {"type": "group", "title": "References" if lang == "en" else "参考文档", "children": {}}
    # References landing page goes FIRST (before Getting Started)
    ref_node["children"][""] = {"type": "page", "title": "Overview" if lang == "en" else "总览",
                                 "filepath": ref_fp}
    ref_node["children"].update(ref_kids)
    OLD_TO_NEW["guides/index.md"] = "/references"
    ROUTE_TO_FP[full_url(lang, "/references")] = ref_fp
    children["/references"] = ref_node
    children["/about"] = {"type": "page", "title": about_title, "filepath": about_fp}
    ROUTE_TO_FP[full_url(lang, "/about")] = about_fp
    return children


def version(lang, title, tabs, home_title, about_title):
    return {
        "title": title,
        "tabs": tabs,
        "header": [
            {"type": "link", "title": "GitHub", "icon": "phosphor/regular/github-logo", "to": "https://github.com/felinics/Memoh", "newTab": True, "align": "end"},
            {"type": "version-selector", "align": "end"},
        ],
        "routes": version_routes(lang, home_title, about_title),
    }


en_tabs = [
    {"title": "References", "to": "/references", "icon": "phosphor/regular/books"},
]
zh_tabs = [
    {"title": "参考文档", "to": "/references", "icon": "phosphor/regular/books"},
]

# Redirects: legacy VitePress /channels/* (kept), plus every moved page.
redirects = [
    {"from": "/channels", "to": "/references/getting-started/channels"},
] + [
    {"from": f"/channels/{c}", "to": f"/references/getting-started/channels/{c}"}
    for c in CHANNELS
]

cfg = {
    "$schema": "https://registry.scalar.com/@scalar/schemas/config",
    "scalar": "2.0.0",
    "info": {
        "title": "Memoh",
        "description": "Memoh documentation — references, integrations, and self-hosting.",
    },
    "assetsDir": "docs/public",
    "siteConfig": {
        "customDomain": "docs.memoh.ai",
        "logo": "docs/public/logo.svg",
        "theme": "default",
        "colorScheme": {"default": "system", "showToggle": True},
        "layout": {"toc": True, "header": True, "search": {"enabled": True, "position": "sidebar"}},
        "head": {
            "links": [{"rel": "icon", "href": "/logo.svg"}],
            "scripts": [{"path": "docs/public/edit-on-github.js", "tagPosition": "bodyClose"}],
        },
        "footer": {"type": "page", "filepath": "docs/footer.html"},
        "routing": {"redirects": []},
    },
    "versions": {
        "default": version("en", "English", en_tabs, "Home", "About"),
        "zh": version("zh", "简体中文", zh_tabs, "首页", "关于"),
    },
}

# Build page-level redirects AFTER version_routes() has populated OLD_TO_NEW.
for rel, new in sorted(OLD_TO_NEW.items()):
    old = old_route(rel)
    if old != new:
        redirects.append({"from": old, "to": new})
cfg["siteConfig"]["routing"]["redirects"] = redirects

# Generate the client-side "Edit on GitHub" script (URL -> source filepath).
edit_js = (EDIT_JS_TEMPLATE
           .replace("__EDIT_BASE__", EDIT_BASE)
           .replace("__MAP__", json.dumps(ROUTE_TO_FP, ensure_ascii=False, indent=2, sort_keys=True)))
(REPO / "docs" / "public" / "edit-on-github.js").write_text(edit_js, encoding="utf-8")

for e in errors:
    print("MISSING", e)
if errors:
    sys.exit(1)
(REPO / "scalar.config.json").write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
n = sum(1 for _ in DOCS.rglob("*.md"))
listed = json.dumps(cfg).count('"filepath"')
print(f"wrote scalar.config.json — {listed} pages listed, {n} .md files on disk")
print(f"generated {len(redirects)} redirects")
