# 渠道

渠道把 Memoh 机器人接到消息平台。你可以在机器人 **Platforms** tab 里配置，让同一个机器人通过 Slack、Telegram、飞书、Discord、微信、邮件、网页端等入口被访问。

## 支持的渠道

| 平台 | 指南 | 备注 |
|------|------|------|
| Slack | [Slack](./slack.md) | Workspace 消息、thread |
| Telegram | [Telegram](./telegram.md) | 附件、流式较好 |
| 飞书 | [飞书](./feishu.md) | 可走 webhook 入站 |
| Discord | [Discord](./discord.md) | 社群、服务器 |
| QQ | [QQ](./qq.md) | 偏个人 DM |
| Matrix | [Matrix](./matrix.md) | 自建 homeserver |
| Misskey | [Misskey](./misskey.md) | 回复、反应；无流式 |
| 钉钉 | [钉钉](./dingtalk.md) | 企业私聊/群 |
| 企微 | [企微](./wecom.md) | 企业微信工作区 |
| 微信 | [微信](./weixin.md) | 个人扫码登录 |
| 微信公众号 | [微信公众号](./wechatoa.md) | 公众号 webhook |
| 邮件 | [邮件](../../guides/email.md) | SMTP、Mailgun、Gmail OAuth 等邮件流程 |
| Web | 内置 | Memoh 网页端自带 |

## 微信选项

Memoh 支持两种微信相关适配：

- **微信（`weixin`）**：个人号扫码登录。
- **微信公众号（`wechatoa`）**：公众号 webhook，需要 `App ID`、`App Secret`、`Token`，可选 AES 设置。

按实际部署模型选择，不要混用。

## 通用配置流程

1. 在目标平台注册应用或机器人。
2. 获取 API token、App ID、app secret、access token 等凭据。
3. 在 Memoh 的机器人 **Platforms** tab 里添加渠道。
4. 保存并启用渠道。

不同平台的最后一步可能不同：有的要把 webhook 回调 URL 粘到平台控制台，有的要手机扫码，有的需要由 Memoh 持续维护 stream 或 WebSocket 连接。
