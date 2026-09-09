# 集成

集成用于把 Memoh 接到外部系统。需要让机器人出现在消息平台里，或需要配置模型、记忆、语音、搜索等上游能力时，从这里开始。

## 渠道

渠道让机器人可以在网页端之外被访问。

- **[渠道总览](./channels/index.md)**：支持的平台和通用配置流程。
- **[Slack](./channels/slack.md)**、**[Telegram](./channels/telegram.md)**、**[飞书](./channels/feishu.md)**、**[Discord](./channels/discord.md)**、**[微信](./channels/weixin.md)** 等。

## 提供方

提供方把 Memoh 接到外部能力后端。

- **[模型服务商](./providers/llm.md)**：配置上游 API、client type 和模型角色。
- **[记忆提供方](./providers/memory/index.md)**：选择内置记忆、Mem0 或 OpenViking。
- **[TTS 提供方](./providers/tts/index.md)**：配置语音合成提供方和模型。
- **[搜索提供方](./providers/web-search.md)**：配置搜索提供方接入。

## 产品教程

集成配置完成后，到 **[教程](../guides/index.md)** 查看机器人、会话、记忆操作、工具和日常工作流。
