# Channels

Channels connect Memoh bots to messaging platforms. Configure them from the bot **Platforms** tab so users can talk to the same bot through Slack, Telegram, Feishu, Discord, WeChat, Email, the web UI, and other surfaces.

## Supported Channels

| Platform | Guide | Notes |
|----------|-------|-------|
| Slack | [Slack Configuration](./slack.md) | Workspace messaging with threads |
| Telegram | [Telegram Configuration](./telegram.md) | Strong attachment and streaming support |
| Feishu (Lark) | [Feishu Configuration](./feishu.md) | Supports webhook-style inbound mode |
| Discord | [Discord Configuration](./discord.md) | Good fit for communities and servers |
| QQ | [QQ Configuration](./qq.md) | Personal DM oriented |
| Matrix | [Matrix Configuration](./matrix.md) | Decentralized homeserver support |
| Misskey | [Misskey Configuration](./misskey.md) | Replies and reactions, no streaming |
| DingTalk | [DingTalk Configuration](./dingtalk.md) | Enterprise private/group chat |
| WeCom (WeWork) | [WeCom Configuration](./wecom.md) | Enterprise workspace integration |
| WeChat | [WeChat Configuration](./weixin.md) | Personal QR login flow |
| WeChat Official Account | [WeChat Official Account Configuration](./wechatoa.md) | Official account webhook flow |
| Email | [Email](../../guides/email.md) | SMTP, Mailgun, Gmail OAuth, and related email provider flows |
| Web | Built-in | Available from the Memoh web interface |

## WeChat Options

Memoh supports two different WeChat-related adapters:

- **WeChat (`weixin`)** is the personal-account style integration that relies on QR login.
- **WeChat Official Account (`wechatoa`)** is the official-account webhook integration that uses `App ID`, `App Secret`, `Token`, and optional AES settings.

Choose the one that matches your actual WeChat deployment model.

## General Setup Flow

1. Register an app or bot on the target platform.
2. Obtain credentials such as API tokens, app IDs, app secrets, or access tokens.
3. Add the channel from the bot **Platforms** tab in Memoh.
4. Save and enable the channel.

Depending on the platform, the final step may involve copying a webhook callback URL into the platform console, approving a QR login on mobile, or keeping a stream/WebSocket connection running through Memoh.
