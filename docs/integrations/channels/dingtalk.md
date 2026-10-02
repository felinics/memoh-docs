# DingTalk Channel Configuration

Connect your Memoh bot to DingTalk for private and group chats: inbound events arrive over DingTalk's Stream mode, and replies and media are sent through DingTalk's official APIs.

::: warning Limits
- Responses are delivered as complete messages; DingTalk output is not streamed token by token.
:::

## Prerequisites

- Access to your organization's DingTalk developer platform, with permission to create apps.
- No public callback URL is required: Memoh receives inbound events over a DingTalk Stream connection that it maintains automatically.

## Steps

### 1. Create a DingTalk app

In the DingTalk developer platform for your organization:

1. Create or choose the app that will act as the bot.
2. Enable the bot / messaging capability for that app.
3. Copy the **App Key** and **App Secret**.
4. Grant the app message permissions and publish it in your organization so end users can reach it.

### 2. Add the channel in Memoh

In Memoh:

1. Open the bot's **Platforms** tab.
2. Click **Add Channel** and choose **DingTalk**.
3. Fill in **App Key** and **App Secret**.
4. Click **Save and Enable**.

Memoh maintains the DingTalk Stream connection automatically — there is no webhook callback URL to paste.

## Credentials

| Field | Required | Description |
|-------|----------|-------------|
| **App Key** | Yes | The DingTalk app's key, copied from the app's credentials in the DingTalk developer platform. |
| **App Secret** | Yes | The DingTalk app's secret, copied from the same place. |

## Verify

Send `/help` to the bot in a private chat, or @mention it in a group chat with `/help`. The bot replies with its command list, which confirms the channel is working.

## Group chats

The bot works in DingTalk group chats: @mention it in a supported group to trigger a reply.

## Disable and rotate credentials

Disable or remove the channel at any time from the bot's **Platforms** tab. To rotate credentials, update **App Key** / **App Secret** in the same panel and save.
