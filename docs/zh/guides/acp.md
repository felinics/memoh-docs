# Agents / ACP

Memoh 可以把 Bot 连接到 ACP 兼容的编码智能体。ACP 智能体是外部编码工作流，可以从 Bot 的聊天 workspace 里工作，同时把自己的会话和普通 chat / discuss 分开。

内置三个 agent profile：**Codex**、**Claude Code**、**Grok Build**。它们是当前支持的配置路径，不代表未来只能接这三种。

ACP 智能体在 Bot 的容器 workspace 里运行，所以 Bot 必须使用容器类 workspace backend。

---

## 设置流程

1. 打开 Bot**详情页** → **Agents** tab。
2. 每个智能体一行，右侧 Switch 启用，点行进设置。
3. 选 setup 模式，按要求填字段。
4. 保存，然后从聊天 workspace 启动。

每行有三种状态：**Needs setup**（已启用但缺凭据）、**Disabled**、绿点（就绪）。

### 各智能体的 Setup 模式

| 智能体 | API Key | OAuth | Self-managed |
|--------|---------|-------|--------------|
| **Codex** | ✅ | ✅ ChatGPT 登录（设备码） | ✅ |
| **Claude Code** | ✅ | ✅ 粘贴 `claude setup-token` 生成的 token | ✅ |
| **Grok Build** | ✅ xAI API Key | ✅ Grok 账号登录（设备码） | — |

**Self-managed** 表示 Memoh 直接用你在 workspace 里自己维护的配置来启动智能体。

### Codex 设备码授权

在 Codex 设置里点 **Use Device Code**，Memoh 显示验证 URL 和一次性代码，你在 OpenAI 页面确认后授权自动完成。

> 一次性代码只在显示的 OpenAI 验证 URL 上输入——设备码可能被用于钓鱼。

### Grok Build {#grok-build}

Grok Build 用 xAI API Key 或 Grok 账号认证。创建 Bot 时只能先填 API Key；Grok 账号要等 Bot 创建之后，在该智能体的设置里登录。Memoh 会显示验证页面和一次性代码，你在页面显示的 accounts.x.ai 地址上确认后，授权自动完成。不要在其他地址上确认这个代码。Memoh 会加密保存这个智能体的 Grok 凭据，并且只在运行时提供给 Grok Build。

Grok Build 的内置工具遵循它自己的权限模式：

| 模式 | 行为 |
|------|------|
| **每次询问**（默认） | 执行有副作用的操作前先由你确认。 |
| **自动判断** | 由 Grok 判断哪些操作可以安全执行，不再逐一询问。 |
| **全部批准** | 所有操作直接批准，不再询问；Memoh 工具权限仍然生效。 |

Bot 的 **工具审核** 规则只约束 Memoh 提供的工具。Grok Build 发来的询问会以卡片展示，由持有对应工作区权限的用户决定。Grok Build 只能从最新一轮分叉对话。

## Adapter 自动升级

Codex 和 Claude Code 的 adapter 是 npm 包。Memoh 每次服务进程启动后（按 bot）解析一次 npm 上的最新版本并启动它，adapter 的修复不需要升级 Memoh 就能拿到。解析或启动失败时回退到 workspace 镜像里内置的版本，直到下次服务重启。Grok Build 不需要 adapter：它原生支持 ACP，Memoh 运行的是作为受管工作区依赖提供的 `grok` CLI。

---

## Reasoning Effort

智能体支持时，可以在 composer 的模型选择器里悬停 **Reasoning** 按会话选择推理力度。

- 可选项（以及它们的名字）由外部智能体自己声明，换模型时可能变化。
- 未选择时的默认值：Codex 是 `medium`，Claude Code 是 `high`。
- 选择按会话独立，和模型选择互不影响。

之前选的力度失效时，Memoh 会刷新智能体的选项并让你重选，而不是悄悄失败。

---

## 附件

ACP 智能体会话支持消息附件：

- **图片**：智能体声明支持图片输入时原生发送；不支持时若图片有 workspace 路径可引用，自动降级为文件引用。
- **文件**、长文本粘贴、引用/回复消息里带的附件，以 workspace 路径或公开 URL 的形式传给智能体。
- 可以只发附件不带文字。

附件送不到智能体时会在聊天里报明确错误，不会静默丢弃。

---

## 默认 Agent

Bot 的交互设置里有 **默认 Agent** 下拉框——可以选 Memoh 本体，或任一已启用且配置完成的 ACP 智能体。只影响之后新建的一对一会话，已有会话和群聊 Discuss 不受影响。

---

## ACP Agent 会话

ACP 工作使用 `acp_agent` 会话类型，由 Agents/ACP 工作流创建和管理，不走普通 `/new chat` / `/new discuss` 路由。客户端里可以按 `acp_agent` 过滤，把编码工作和日常对话分开看。

---

## 相关页面

- [Bot](./working-with-bots.md)
- [会话](./sessions.md)
- [文件](./files.md)
- [模型服务商与模型](../integrations/providers/llm.md)
