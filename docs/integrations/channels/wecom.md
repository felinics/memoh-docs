# WeCom (WeWork) Channel Configuration

Connect your Memoh bot to WeCom (企业微信) so it can talk with users in your organization's WeCom workspace, in direct messages and in group chats.

## Prerequisites

- Admin access to the [WeCom Admin Console](https://work.weixin.qq.com/), to create the bot application.

## Steps

### 1. Create a WeCom bot

In the WeCom admin console:

1. Log in to the [WeCom Admin Console](https://work.weixin.qq.com/).
2. Navigate to **App Management** > **Custom Apps** or **Bot Management**.
3. Create a new bot application.
4. Note the **Bot ID** and **Secret** credentials.

> Official docs: [WeCom Open Platform](https://developer.work.weixin.qq.com/) · [WeCom Bot Documentation](https://developer.work.weixin.qq.com/document/path/91770)

### 2. Add the channel in Memoh

In Memoh:

1. Open the bot's **Platforms** tab.
2. Click **Add Channel** and select **WeCom**.
3. Fill in **Bot ID** and **Secret**; set a custom **WebSocket URL** only if you need one.
4. Click **Save and Enable**.

Once enabled, Memoh connects to WeCom over WebSocket and begins receiving messages.

## Credentials

| Field | Required | Description |
|-------|----------|-------------|
| **Bot ID** | Yes | The WeCom bot identifier. |
| **Secret** | Yes | The bot's authentication credential. |
| **WebSocket URL** | No | Custom WebSocket endpoint; the default endpoint is used when empty. |

## Verify

Send `/help` to the bot in a direct message, or @mention it in a group chat with `/help`. The bot replies with its command list, which confirms the channel is working.

## Group chats

The bot also works in WeCom group chats: @mention it in a group to trigger a reply.

## Disable and rotate credentials

Disable or remove the channel at any time from the bot's **Platforms** tab. To rotate credentials, update **Bot ID** / **Secret** in the same panel and save.
