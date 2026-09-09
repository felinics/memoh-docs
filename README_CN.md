# Memoh 文档

<p align="center">
  <img src="./docs/public/logo.svg" alt="Memoh" width="96" height="96">
</p>

<p align="center">
  <strong>Memoh 官方文档站源码。</strong>
</p>

<p align="center">
  <a href="https://docs.memoh.ai">docs.memoh.ai</a>
  ·
  <a href="https://github.com/felinics/Memoh">Memoh 主仓库</a>
  ·
  <a href="./README.md">English</a>
</p>

这个仓库保存 [Memoh](https://github.com/felinics/Memoh) 的公开文档。Memoh 是一个多成员、长期记忆的 AI 智能体平台，支持独立 workspace、跨渠道接入，以及桌面版和服务器部署。

产品代码在 [`felinics/Memoh`](https://github.com/felinics/Memoh)。这个仓库只负责文档站：[Scalar Docs](https://scalar.com/products/docs) 配置、Markdown 页面和截图。

## 这里有什么

- **教程**：机器人、会话、工作区、技能、连接器、Hooks、MCP、记忆、定时任务、斜杠命令。
- **集成**：渠道与各类提供方（模型服务商、记忆、TTS、搜索、视频）。
- **自托管**：Desktop 桌面版、服务器部署、工作区后端。
- **中英文文档**分别位于 `docs/en/` 和 `docs/zh/`，在站点顶部以两个 Tab 切换。
- **Scalar 配置** `scalar.config.json`，由 `scripts/build-config.py` 生成。

## 文档站结构

```
docs/
├── en/
│   ├── index.md          # 英文首页（卡片）
│   ├── about.md
│   ├── guides/
│   ├── integrations/
│   └── self-hosted/
├── zh/                   # 简体中文镜像，结构相同
└── public/               # logo 与截图
```

请保持中英文文档同步：在一种语言里新增、重命名、删除或移动页面时，另一种语言也要做同样的修改。

## 本地开发

使用 Scalar CLI 本地预览（需要 Node.js 20+）：

```bash
npx @scalar/cli project preview
```

预览读取 `scalar.config.json`，Markdown 修改会热更新。

## 检查

```bash
python3 scripts/check-links.py
```

校验 `scalar.config.json` 中每个页面都存在、每个 `.md` 都被列出，以及所有内部链接和图片可解析。CI 会在每个 PR 上运行。

## 部署

推送到 `main` 会触发 `.github/workflows/deploy.yml`，通过 `npx @scalar/cli project publish` 发布到 Scalar。来自本仓库的 PR 会生成预览部署。工作流需要仓库 secret `SCALAR_API_KEY`（在 https://dashboard.scalar.com/user/api-keys 创建）。

## 贡献文档

1. 在 `docs/en/` 和 `docs/zh/` 下编辑或新增 Markdown。
2. 若新增、删除或重命名页面，请更新 `scripts/build-config.py` 中的 `SIDEBAR`，然后运行 `python3 scripts/build-config.py` 重新生成 `scalar.config.json`。不要手改生成文件。
3. 运行 `python3 scripts/check-links.py`。
4. 运行 `npx @scalar/cli project preview`，检查 English 和中文两个 Tab。

写作约定：

- 页面间使用相对 `.md` 链接，如 `[机器人](../guides/bot.md)`。
- 提示框使用 `<scalar-callout type="tip|info|warning|danger">…</scalar-callout>`。
- Front matter 支持 `title` 和 `description`。

## 许可证

文档遵循 Memoh 项目的许可证，除非文件另有说明。
