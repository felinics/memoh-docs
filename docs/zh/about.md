# 了解 Memoh

Memoh v0.13 是开源的多智能体平台。它让你在一台机器上运行多个 AI Agent，并为每个 Agent 提供自己的 workspace、浏览器、网络、工具和长期记忆。

Agent 可以通过 Telegram、Discord、飞书、微信、Web UI、邮件等渠道对话；也可以记住上下文、操作浏览器或桌面、调用 MCP 工具、安装技能和连接器、执行定时任务，并按机器人配置访问权限。

Memoh 托管版 SaaS 即将开放。如果你更想使用托管服务，而不是自己运维部署，可以加入 [SaaS waitlist](https://memoh.ai/waitlist)。

## 分发方式

### Desktop

Desktop 是 Memoh Cloud 或自托管服务端的原生客户端。它把 Web UI 包进带系统托盘与快捷键的原生窗口，并可把所在电脑注册为机器人可用的 Computer。它不会运行本地服务端。

### Server Deploy

Server Deploy 适合长期在线和多人共享。只要 Memoh 需要服务多个用户、在你的个人电脑离线时继续接入渠道，或作为自托管服务运行，就应该用这一形态。Docker Compose stack 包含后端、Web UI、数据库、记忆服务和 workspace runtime。

## v0.13 重点

### Agent Workspaces

每个机器人可以使用隔离容器 workspace，拥有文件、命令、MCP 托管、网络访问、有头浏览器和图形桌面。本地与桌面部署也可以在明确受信任时使用 trusted local workspace。

### Web 产品

Web UI 覆盖了更多日常操作：机器人设置、会话、模型服务商、渠道、workspace 文件、终端和显示面板、应用市场、Hooks、定时任务、访问控制和用户偏好。v0.13 也包含英文、简体中文和日文界面支持。

### Hooks、定时任务与自动化

Hooks 可以围绕支持的事件运行小型自动化规则，Schedule 则让周期性工作不依赖正在进行的聊天。来自应用市场的技能与连接器无需写代码即可扩展机器人的能力。

### 访问控制

访问控制分成渠道侧聊天权限和 workspace 侧用户权限。机器人 owner 可以允许或屏蔽渠道成员，给注册用户授予 workspace 角色，并在需要更精细匹配时继续使用高级 ACL 规则。

## 从哪开始

- **[机器人](./guides/bot.md)** - 创建并配置机器人。
- **[模型服务商与模型](./integrations/providers/llm.md)** - 配置模型访问。
- **[渠道](./integrations/channels/index.md)** - 选择机器人出现的位置。
- **[Skills](./guides/skills.md)** 和 **[应用市场](./guides/supermarket.md)** - 安装可复用能力。
- **[定时任务](./guides/schedule.md)** 和 **[访问控制](./guides/access.md)** - 运维周期性工作和权限。
- **[自托管](./self-hosted/index.md)** - 部署并维护自己的 Memoh 实例。
