(function () {
  var EDIT_BASE = "https://github.com/felinics/memoh-docs/edit/main/";
  var MAP = {
  "/": "docs/en/index.md",
  "/about": "docs/en/about.md",
  "/references": "docs/en/guides/index.md",
  "/references/advanced/access": "docs/en/guides/access.md",
  "/references/advanced/acp": "docs/en/guides/acp.md",
  "/references/advanced/browser-computer-use": "docs/en/guides/browser-computer-use.md",
  "/references/advanced/compaction": "docs/en/guides/compaction.md",
  "/references/advanced/computers": "docs/en/guides/computers.md",
  "/references/advanced/connectors": "docs/en/guides/connectors.md",
  "/references/advanced/container": "docs/en/guides/container.md",
  "/references/advanced/email": "docs/en/guides/email.md",
  "/references/advanced/hooks": "docs/en/guides/hooks.md",
  "/references/advanced/mcp": "docs/en/guides/mcp.md",
  "/references/advanced/memory": "docs/en/guides/memory.md",
  "/references/advanced/providers": "docs/en/integrations/providers/index.md",
  "/references/advanced/providers/llm": "docs/en/integrations/providers/llm.md",
  "/references/advanced/providers/memory-providers": "docs/en/integrations/providers/memory/index.md",
  "/references/advanced/providers/memory-providers/builtin": "docs/en/integrations/providers/memory/builtin.md",
  "/references/advanced/providers/memory-providers/mem0": "docs/en/integrations/providers/memory/mem0.md",
  "/references/advanced/providers/memory-providers/openviking": "docs/en/integrations/providers/memory/openviking.md",
  "/references/advanced/providers/tts-providers": "docs/en/integrations/providers/tts/index.md",
  "/references/advanced/providers/tts-providers/edge": "docs/en/integrations/providers/tts/edge.md",
  "/references/advanced/providers/video": "docs/en/integrations/providers/video.md",
  "/references/advanced/providers/web-search": "docs/en/integrations/providers/web-search.md",
  "/references/advanced/schedule": "docs/en/guides/schedule.md",
  "/references/advanced/skills": "docs/en/guides/skills.md",
  "/references/advanced/supermarket": "docs/en/guides/supermarket.md",
  "/references/getting-started/bot": "docs/en/guides/bot.md",
  "/references/getting-started/channels": "docs/en/integrations/channels/index.md",
  "/references/getting-started/channels/dingtalk": "docs/en/integrations/channels/dingtalk.md",
  "/references/getting-started/channels/discord": "docs/en/integrations/channels/discord.md",
  "/references/getting-started/channels/feishu": "docs/en/integrations/channels/feishu.md",
  "/references/getting-started/channels/line": "docs/en/integrations/channels/line.md",
  "/references/getting-started/channels/matrix": "docs/en/integrations/channels/matrix.md",
  "/references/getting-started/channels/misskey": "docs/en/integrations/channels/misskey.md",
  "/references/getting-started/channels/qq": "docs/en/integrations/channels/qq.md",
  "/references/getting-started/channels/slack": "docs/en/integrations/channels/slack.md",
  "/references/getting-started/channels/telegram": "docs/en/integrations/channels/telegram.md",
  "/references/getting-started/channels/wechatoa": "docs/en/integrations/channels/wechatoa.md",
  "/references/getting-started/channels/wecom": "docs/en/integrations/channels/wecom.md",
  "/references/getting-started/channels/weixin": "docs/en/integrations/channels/weixin.md",
  "/references/getting-started/deployment": "docs/en/self-hosted/index.md",
  "/references/getting-started/deployment/desktop": "docs/en/self-hosted/desktop.md",
  "/references/getting-started/deployment/docker": "docs/en/self-hosted/docker.md",
  "/references/getting-started/deployment/workspace-backends": "docs/en/self-hosted/workspace-backends.md",
  "/references/getting-started/files": "docs/en/guides/files.md",
  "/references/getting-started/preferences": "docs/en/guides/preferences.md",
  "/references/getting-started/quick-start": "docs/en/guides/quick-start.md",
  "/references/getting-started/sessions": "docs/en/guides/sessions.md",
  "/references/getting-started/slash-commands": "docs/en/guides/slash-commands.md",
  "/references/use-cases": "docs/en/guides/use-cases.md",
  "/zh": "docs/zh/index.md",
  "/zh/about": "docs/zh/about.md",
  "/zh/references": "docs/zh/guides/index.md",
  "/zh/references/advanced/access": "docs/zh/guides/access.md",
  "/zh/references/advanced/acp": "docs/zh/guides/acp.md",
  "/zh/references/advanced/browser-computer-use": "docs/zh/guides/browser-computer-use.md",
  "/zh/references/advanced/compaction": "docs/zh/guides/compaction.md",
  "/zh/references/advanced/computers": "docs/zh/guides/computers.md",
  "/zh/references/advanced/connectors": "docs/zh/guides/connectors.md",
  "/zh/references/advanced/container": "docs/zh/guides/container.md",
  "/zh/references/advanced/email": "docs/zh/guides/email.md",
  "/zh/references/advanced/hooks": "docs/zh/guides/hooks.md",
  "/zh/references/advanced/mcp": "docs/zh/guides/mcp.md",
  "/zh/references/advanced/memory": "docs/zh/guides/memory.md",
  "/zh/references/advanced/providers": "docs/zh/integrations/providers/index.md",
  "/zh/references/advanced/providers/llm": "docs/zh/integrations/providers/llm.md",
  "/zh/references/advanced/providers/memory-providers": "docs/zh/integrations/providers/memory/index.md",
  "/zh/references/advanced/providers/memory-providers/builtin": "docs/zh/integrations/providers/memory/builtin.md",
  "/zh/references/advanced/providers/memory-providers/mem0": "docs/zh/integrations/providers/memory/mem0.md",
  "/zh/references/advanced/providers/memory-providers/openviking": "docs/zh/integrations/providers/memory/openviking.md",
  "/zh/references/advanced/providers/tts-providers": "docs/zh/integrations/providers/tts/index.md",
  "/zh/references/advanced/providers/tts-providers/edge": "docs/zh/integrations/providers/tts/edge.md",
  "/zh/references/advanced/providers/video": "docs/zh/integrations/providers/video.md",
  "/zh/references/advanced/providers/web-search": "docs/zh/integrations/providers/web-search.md",
  "/zh/references/advanced/schedule": "docs/zh/guides/schedule.md",
  "/zh/references/advanced/skills": "docs/zh/guides/skills.md",
  "/zh/references/advanced/supermarket": "docs/zh/guides/supermarket.md",
  "/zh/references/getting-started/bot": "docs/zh/guides/bot.md",
  "/zh/references/getting-started/channels": "docs/zh/integrations/channels/index.md",
  "/zh/references/getting-started/channels/dingtalk": "docs/zh/integrations/channels/dingtalk.md",
  "/zh/references/getting-started/channels/discord": "docs/zh/integrations/channels/discord.md",
  "/zh/references/getting-started/channels/feishu": "docs/zh/integrations/channels/feishu.md",
  "/zh/references/getting-started/channels/line": "docs/zh/integrations/channels/line.md",
  "/zh/references/getting-started/channels/matrix": "docs/zh/integrations/channels/matrix.md",
  "/zh/references/getting-started/channels/misskey": "docs/zh/integrations/channels/misskey.md",
  "/zh/references/getting-started/channels/qq": "docs/zh/integrations/channels/qq.md",
  "/zh/references/getting-started/channels/slack": "docs/zh/integrations/channels/slack.md",
  "/zh/references/getting-started/channels/telegram": "docs/zh/integrations/channels/telegram.md",
  "/zh/references/getting-started/channels/wechatoa": "docs/zh/integrations/channels/wechatoa.md",
  "/zh/references/getting-started/channels/wecom": "docs/zh/integrations/channels/wecom.md",
  "/zh/references/getting-started/channels/weixin": "docs/zh/integrations/channels/weixin.md",
  "/zh/references/getting-started/deployment": "docs/zh/self-hosted/index.md",
  "/zh/references/getting-started/deployment/desktop": "docs/zh/self-hosted/desktop.md",
  "/zh/references/getting-started/deployment/docker": "docs/zh/self-hosted/docker.md",
  "/zh/references/getting-started/deployment/workspace-backends": "docs/zh/self-hosted/workspace-backends.md",
  "/zh/references/getting-started/files": "docs/zh/guides/files.md",
  "/zh/references/getting-started/preferences": "docs/zh/guides/preferences.md",
  "/zh/references/getting-started/quick-start": "docs/zh/guides/quick-start.md",
  "/zh/references/getting-started/sessions": "docs/zh/guides/sessions.md",
  "/zh/references/getting-started/slash-commands": "docs/zh/guides/slash-commands.md",
  "/zh/references/use-cases": "docs/zh/guides/use-cases.md"
};
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
