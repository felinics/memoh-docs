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

产品代码在 [`felinics/Memoh`](https://github.com/felinics/Memoh)。这个仓库只负责文档站：VitePress 配置、Markdown 页面和截图。

## 这里有什么

- **教程**：面向 SaaS/产品使用，覆盖机器人、workspace、会话、记忆、MCP、邮件、计划任务和斜杠命令。
- **集成**：渠道和提供方，包括消息平台、LLM、记忆提供方、TTS 和网页搜索。
- **自托管**：Desktop、Server Deploy、workspace backend、Kata 和 SQLite 等开源部署文档。
- 英文和中文文档，分别位于 `docs/` 和 `docs/zh/`。
- 截图、logo 等静态资源，位于 `docs/public/`。
- VitePress 配置，位于 `docs/.vitepress/`。

## 文档站结构

当前 VitePress 文档站围绕四个主导航路径组织：

- `docs/guides/`：产品使用教程。
- `docs/integrations/`：渠道、提供方、记忆提供方、TTS 和网页搜索。
- `docs/self-hosted/`：Desktop、Server Deploy、workspace backend 和连接器（Connect-It）。
- `docs/use-cases/`：使用场景，每个场景独立成章。

简体中文文档使用相同结构，位于 `docs/zh/` 下：

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`
- `docs/zh/use-cases/`

旧路径仍然保留，用于兼容外部旧链接，但它们是重定向页面，不是主要内容源：

- `docs/getting-started/`
- `docs/installation/`
- `docs/channels/`
- `docs/memory-providers/`
- `docs/zh/` 下对应的中文重定向路径

更新内容时，请优先修改上面的主路径。只有重定向目标本身变化时，才需要修改 legacy redirect 页面。

英文和简体中文文档需要保持镜像一致。如果在一种语言中新增、重命名、删除或移动页面，请在另一种语言中做对应变更，并同时更新两个 VitePress 侧边栏文件。

不要手动编辑 `docs/.vitepress/dist/`。它是构建生成产物，不应当作为文档源码维护。

## 本地开发

需要 Node.js 和 pnpm。这个仓库是独立的 VitePress 项目。

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在：

```text
http://localhost:5173
```

## 构建

```bash
pnpm build
```

预览生产构建：

```bash
pnpm preview
```

## 目录结构

```text
.
├── docs/
│   ├── .vitepress/        # VitePress 配置、导航、侧边栏
│   ├── guides/            # 产品使用教程
│   ├── integrations/      # 渠道和提供方
│   ├── self-hosted/       # 开源自托管部署文档
│   ├── use-cases/         # 使用场景章节
│   ├── getting-started/   # 到 guides 的旧路径重定向
│   ├── installation/      # 到 self-hosted 的旧路径重定向
│   ├── channels/          # 到 integrations/channels 的旧路径重定向
│   ├── memory-providers/  # 到 integrations/providers/memory 的旧路径重定向
│   ├── public/            # 静态图片和 logo
│   ├── zh/                # 中文文档和重定向页面
│   └── *.md               # 入口和兼容页面
├── package.json
└── pnpm-lock.yaml
```

## 更新日志

### 2026-10

- **客户端优先修正**：顶栏改为 教程 / 使用场景 / 帮助中心（移除 集成 与 关于）；使用场景拆分为独立目录、每个场景一章；侧边栏恢复自部署分组（Server Deploy、Workspace 后端、连接器）。
- **应用（App）模型**：应用市场与技能页面按统一的 App 概念重写（一个 App 打包 Skills、依赖和连接器）；技能页改为说明工作区目录，不再描述已移除的管理界面；连接器移入自部署章节。
- **工作区页面以 Cloud 为基准**：开源后端配置与 CDI/GPU 透传移至 Workspace 后端；移除用户偏好页；记忆提供方条目合并为一个；移除 TTS: Edge。

### 2026-09

- **导航结构重组**：文档统一收入单一的 **References（参考文档）** 树——快速开始（内含部署与渠道）、进阶教程（内含提供方 → 记忆/TTS 提供方）、使用场景。版本选择器移到页头右侧，并为每个页面加上编辑链接。
- **新增 Get Started 新手教程**：中英文各新增一份分步上手指南；侧边栏中 Overview 调整到 Getting Started 之前。
- **框架**：尝试迁移到 Scalar Docs 后还原回 VitePress，全部内容与结构改动均保留。
- **翻译质量核查**：全量核查 53 对中英文页面，修正误译（如 ACL 预设、私有频道、会话压缩描述）、错别字、机翻痕迹和术语不一致，共涉及 29 个文件；同时修复英文 Matrix 页面的一处单复数笔误。
- **杂项**：修正 `.gitignore`，正确排除 `docs/.vitepress/cache`。

### 更早

- 与 Memoh 源码同步并新增 Quick Start（#7）。
- 新增 Connect-It 连接器文档（#5）。
- 更新 v0.17（#4）与 v0.13 文档。

## 贡献文档

小的错别字、链接和措辞修正可以直接改对应 Markdown 页面。较大的结构调整建议这样做：

1. 运行 `pnpm dev`。
2. 修改 `docs/` 下的文档。
3. 运行 `pnpm build`。
4. 如果改动影响布局或图片，在 PR 里附上截图。

新增页面时，记得更新对应的侧边栏配置：

- 英文页面：`docs/.vitepress/en.ts`
- 中文页面：`docs/.vitepress/zh.ts`

不要把 legacy redirect 目录作为新内容的规范位置。新的源码页面应放在 `guides`、`integrations` 或 `self-hosted` 下，并同步维护对应的 `docs/zh/` 页面。

## 许可证

除非单独文件另有说明，文档沿用 Memoh 项目的许可证。
