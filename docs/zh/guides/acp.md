# Agents / ACP

Memoh 可以把机器人连接到 ACP 兼容的编码智能体。ACP 智能体是外部编码工作流，可以从机器人的聊天 workspace 里工作，同时把自己的会话和普通 chat / discuss 分开。

内置三个 agent profile：**Codex**、**Claude Code**、**Hermes**。它们是当前支持的配置路径，不代表未来只能接这三种。

ACP 智能体在机器人的容器 workspace 里运行，所以机器人必须使用容器类 workspace backend。

---

## 设置流程

1. 打开机器人**详情页** → **Agents** tab。
2. 每个智能体一行，右侧 Switch 启用，点行进设置。
3. 选 setup 模式，按要求填字段。
4. 保存，然后从聊天 workspace 启动。

每行有三种状态：**Needs setup**（已启用但缺凭据）、**Disabled**、绿点（就绪）。

### 各智能体的 Setup 模式

| 智能体 | API Key | OAuth | Self-managed |
|--------|---------|-------|--------------|
| **Codex** | ✅ | ✅ ChatGPT 登录（设备码） | ✅ |
| **Claude Code** | ✅ | ✅ 粘贴 `claude setup-token` 生成的 token | ✅ |
| **Hermes** | ✅ | — | ✅ |

**Self-managed** 表示 Memoh 直接用你在 workspace 里自己维护的配置来启动智能体。

### Codex 设备码授权

在 Codex 设置里点 **Use Device Code**，Memoh 显示验证 URL 和一次性代码，你在 OpenAI 页面确认后授权自动完成。

> 一次性代码只在显示的 OpenAI 验证 URL 上输入——设备码可能被用于钓鱼。

### Hermes

Hermes 是随 workspace toolkit 一起分发的 Python 智能体。设置字段：

- **Provider**——Gemini（Google AI Studio）、OpenRouter、OpenAI API、或自定义端点
- **Model**——每个 provider 有预设列表，也可填自定义模型 ID
- **Base URL**——仅自定义端点时显示且必填
- **API Key**——对应所选 provider

---

## Adapter 自动升级

Codex 和 Claude Code 的 adapter 是 npm 包。Memoh 每次服务进程启动后（按 bot）解析一次 npm 上的最新版本并启动它，adapter 的修复不需要升级 Memoh 就能拿到。解析或启动失败时回退到 workspace 镜像里内置的版本，直到下次服务重启。

Hermes 用 toolkit 里 pin 死的运行时，不自动升级。

---

## Reasoning Effort

智能体支持时，可以在 composer 的模型选择器里悬停 **Reasoning** 按会话选择推理力度。

- 可选项（以及它们的名字）由外部智能体自己声明，换模型时可能变化。
- 未选择时的默认值：Codex 是 `medium`，Claude Code 是 `high`；Hermes 不支持。
- 选择按会话独立，和模型选择互不影响。

之前选的力度失效时，Memoh 会刷新智能体的选项并让你重选，而不是悄悄失败。

---

## 附件

ACP 智能体会话现在支持消息附件：

- **图片**：智能体声明支持图片输入时原生发送；不支持时若图片有 workspace 路径可引用，自动降级为文件引用。
- **文件**、长文本粘贴、引用/回复消息里带的附件，以 workspace 路径或公开 URL 的形式传给智能体。
- 可以只发附件不带文字。

附件送不到智能体时会在聊天里报明确错误，不会静默丢弃。

---

## 默认 Agent

机器人的交互设置里有 **默认 Agent** 下拉框——可以选 Memoh 本体，或任一已启用且配置完成的 ACP 智能体。只影响之后新建的一对一会话，已有会话和群聊 Discuss 不受影响。

---

## ACP Agent 会话

ACP 工作使用 `acp_agent` 会话类型，由 Agents/ACP 工作流创建和管理，不走普通 `/new chat` / `/new discuss` 路由。网页端可以按 `acp_agent` 过滤，把编码工作和日常对话分开看。

---

## 相关页面

- [机器人](./bot.md)
- [会话](./sessions.md)
- [文件](./files.md)
- [模型服务商与模型](../integrations/providers/llm.md)
