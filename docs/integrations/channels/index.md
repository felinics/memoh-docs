# Channels

Channels connect Memoh bots to messaging platforms. Configure them from the bot **Platforms** tab so users can talk to the same bot through Slack, Telegram, Feishu, Discord, WeChat, and other platforms, as well as directly in the Memoh app.

## Supported channels

- [Telegram](./telegram.md)
- [Slack](./slack.md)
- [Discord](./discord.md)
- [Feishu (Lark)](./feishu.md)
- [DingTalk](./dingtalk.md)
- [WeCom](./wecom.md)
- [WeChat](./weixin.md)
- [QQ](./qq.md)
- [LINE](./line.md)

What each channel supports (Markdown, attachments, streaming, group chats, and so on) is noted in the Limits section of its page.

## General Setup Flow

1. Register an app or bot on the target platform.
2. Obtain credentials such as API tokens, app IDs, app secrets, or access tokens.
3. Add the channel from the bot **Platforms** tab in Memoh.
4. Save and enable the channel.

Depending on the platform, the final step may involve copying a webhook callback URL into the platform console, approving a QR login on mobile, or keeping a stream/WebSocket connection running through Memoh.
