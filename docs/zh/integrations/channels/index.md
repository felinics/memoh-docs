# 渠道

渠道把 Memoh Bot 接到消息平台。你可以在 Bot **平台** 标签页里配置,让同一个 Bot 通过 Slack、Telegram、飞书、Discord、微信等平台被访问,也可以直接在 Memoh 客户端里聊。

## 支持的渠道

- [Telegram](./telegram.md)
- [Slack](./slack.md)
- [Discord](./discord.md)
- [飞书](./feishu.md)
- [钉钉](./dingtalk.md)
- [企业微信](./wecom.md)
- [微信](./weixin.md)
- [QQ](./qq.md)
- [LINE](./line.md)

各渠道支持的消息能力(Markdown、附件、流式输出、群聊等)见对应页面的「使用限制」说明。

## 通用配置流程

1. 在目标平台注册应用或 Bot。
2. 获取 API token、App ID、app secret、access token 等凭据。
3. 在 Memoh 的 Bot **平台** 标签页里添加渠道。
4. 保存并启用渠道。

不同平台的最后一步可能不同:有的要把 webhook 回调 URL 粘到平台控制台,有的要手机扫码,有的由 Memoh 持续维护 stream 或 WebSocket 连接。
