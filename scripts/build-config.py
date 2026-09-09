#!/usr/bin/env python3
"""Generate scalar.config.json from a single bilingual sidebar spec."""
import json, pathlib, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"

# (path, en, zh) or ("group", en, zh, children)
LOGO_URL = "https://raw.githubusercontent.com/felinics/memoh-docs/main/docs/public/logo.svg"

CHANNEL_REDIRECTS = [
    {"from": "/channels", "to": "/integrations/channels"},
] + [
    {"from": f"/channels/{c}", "to": f"/integrations/channels/{c}"}
    for c in ["dingtalk", "discord", "feishu", "matrix", "misskey", "qq",
              "slack", "telegram", "wechatoa", "wecom", "weixin"]
]

SIDEBAR = [
    ("group", "Guides", "教程", [
        ("guides/index.md", "Overview", "总览"),
        ("guides/quick-start.md", "Quick Start", "快速开始"),
        ("guides/preferences.md", "Preferences", "用户偏好"),
        ("guides/bot.md", "Bot", "机器人"),
        ("guides/sessions.md", "Sessions", "会话"),
        ("guides/acp.md", "Agents / ACP", "Agents / ACP"),
        ("guides/access.md", "Access Control", "访问控制"),
        ("guides/container.md", "Workspace", "工作区"),
        ("guides/computers.md", "Computers", "电脑（远程 Runtime）"),
        ("guides/browser-computer-use.md", "Browser / Computer Use", "Browser / Computer Use"),
        ("guides/files.md", "Files", "文件"),
        ("guides/skills.md", "Skills", "技能"),
        ("guides/supermarket.md", "Supermarket", "应用市场"),
        ("guides/connectors.md", "Connectors", "连接器"),
        ("guides/hooks.md", "Hooks", "Hooks"),
        ("guides/mcp.md", "MCP", "MCP"),
        ("guides/memory.md", "Memory", "长期记忆"),
        ("guides/compaction.md", "Compaction", "上下文压缩"),
        ("guides/schedule.md", "Scheduled Tasks", "定时任务"),
        ("guides/email.md", "Email", "邮件"),
        ("guides/slash-commands.md", "Slash Commands", "斜杠命令"),
    ]),
    ("group", "Integrations", "集成", [
        ("integrations/index.md", "Overview", "总览"),
        ("group", "Channels", "渠道", [
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
        ("group", "Providers", "提供方", [
            ("integrations/providers/index.md", "Overview", "总览"),
            ("integrations/providers/llm.md", "LLM Providers", "模型服务商"),
            ("integrations/providers/web-search.md", "Web Search Providers", "搜索提供方"),
            ("integrations/providers/video.md", "Video Providers", "视频提供方"),
            ("group", "Memory Providers", "记忆提供方", [
                ("integrations/providers/memory/index.md", "Overview", "总览"),
                ("integrations/providers/memory/builtin.md", "Built-in", "内置"),
                ("integrations/providers/memory/mem0.md", "Mem0", "Mem0"),
                ("integrations/providers/memory/openviking.md", "OpenViking", "OpenViking"),
            ]),
            ("group", "TTS Providers", "TTS 提供方", [
                ("integrations/providers/tts/index.md", "Overview", "总览"),
                ("integrations/providers/tts/edge.md", "Edge TTS", "Edge TTS"),
            ]),
        ]),
    ]),
    ("group", "Self-hosted", "自托管", [
        ("self-hosted/index.md", "Overview", "总览"),
        ("self-hosted/desktop.md", "Desktop", "Desktop 桌面版"),
        ("self-hosted/docker.md", "Server Deploy", "服务器部署"),
        ("self-hosted/workspace-backends.md", "Workspace Backends", "工作区后端"),
    ]),
]

errors = []
def slug(rel):
    """docs-relative path -> route segment (index.md collapses to parent)."""
    seg = pathlib.Path(rel).stem
    return None if seg == "index" else "/" + seg

def build(items, lang):
    """Return an ordered dict of route-segment -> node."""
    out = {}
    for it in items:
        if it[0] == "group":
            _, en, zh, kids = it
            kids_map = build(kids, lang)
            # the group's own index page becomes the folder's landing page
            idx = kids_map.pop("__index__", None)
            key = "/" + pathlib.Path(kids[0][0]).parent.name if kids and kids[0][0] != "group" else "/" + en.lower().replace(" ", "-")
            node = {"type": "group", "title": zh if lang == "zh" else en, "children": kids_map}
            if idx: node["children"][""] = {"type": "page", "title": "Overview" if lang == "en" else "总览", "filepath": idx["filepath"]}
            out[key] = node
        else:
            rel, en, zh = it
            fp = f"docs/{lang}/{rel}"
            if not (REPO / fp).exists(): errors.append(fp)
            node = {"type": "page", "title": zh if lang == "zh" else en, "filepath": fp}
            key = slug(rel) or "__index__"
            out[key] = node
    return out

def version_routes(lang, home_title, about_title):
    children = {"/": {"type": "page", "title": home_title, "filepath": f"docs/{lang}/index.md"}}
    children.update(build(SIDEBAR, lang))
    children["/about"] = {"type": "page", "title": about_title, "filepath": f"docs/{lang}/about.md"}
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
    {"title": "Guides", "to": "/guides", "icon": "phosphor/regular/book-open"},
    {"title": "Integrations", "to": "/integrations", "icon": "phosphor/regular/plugs-connected"},
    {"title": "Self-hosted", "to": "/self-hosted", "icon": "phosphor/regular/hard-drives"},
]
zh_tabs = [
    {"title": "教程", "to": "/guides", "icon": "phosphor/regular/book-open"},
    {"title": "集成", "to": "/integrations", "icon": "phosphor/regular/plugs-connected"},
    {"title": "自托管", "to": "/self-hosted", "icon": "phosphor/regular/hard-drives"},
]

cfg = {
    "$schema": "https://registry.scalar.com/@scalar/schemas/config",
    "scalar": "2.0.0",
    "info": {
        "title": "Memoh",
        "description": "Memoh documentation — guides, integrations, and self-hosting.",
    },
    "assetsDir": "docs/public",
    "siteConfig": {
        "customDomain": "docs.memoh.ai",
        "logo": "docs/public/logo.svg",
        "theme": "default",
        "colorScheme": {"default": "system", "showToggle": True},
        "layout": {"toc": True, "header": True, "search": {"enabled": True, "position": "sidebar"}},
        "head": {"links": [{"rel": "icon", "href": "/logo.svg"}]},
        "footer": {"type": "page", "filepath": "docs/footer.html"},
        "routing": {"redirects": CHANNEL_REDIRECTS},
    },
    "versions": {
        "default": version("en", "English", en_tabs, "Home", "About"),
        "zh": version("zh", "简体中文", zh_tabs, "首页", "关于"),
    },
}

for e in errors: print("MISSING", e)
if errors: sys.exit(1)
(REPO / "scalar.config.json").write_text(json.dumps(cfg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
n = sum(1 for _ in DOCS.rglob("*.md"))
listed = json.dumps(cfg).count('"filepath"')
print(f"wrote scalar.config.json — {listed} pages listed, {n} .md files on disk")
