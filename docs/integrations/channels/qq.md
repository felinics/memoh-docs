# QQ Channel Configuration

Connect your Memoh bot to QQ through QQ's official bot platform, for private chats, group chats, and thread (话题) conversations.

::: warning Limits
- Each QQ account can create up to 5 bots.
- Responses are delivered as complete blocks; output is not streamed token by token.
:::

## Prerequisites

- A QQ account, used to log in to the [QQ Bot Open Platform](https://q.qq.com/qqbot/openclaw/).

## Steps

### 1. Create a QQ bot

In the QQ Bot Open Platform:

1. Go to the [QQ Bot Open Platform](https://q.qq.com/qqbot/openclaw/) and log in with your QQ account.
2. Click **Create Bot** (创建机器人) — no approval is required.
3. Copy the **AppID** and **AppSecret** displayed on the page. **AppSecret** is shown only once — save it securely.

> Official resources: [QQ Bot Open Platform](https://q.qq.com/) · [QQ Bot Documentation](https://bot.q.qq.com/wiki/)

### 2. Add the channel in Memoh

In Memoh:

1. Open the bot's **Platforms** tab.
2. Click **Add Channel** and select **QQ**.
3. Paste the **AppID** and **AppSecret**.
4. Adjust the optional settings if needed: **Markdown Support** and **Enable Input Hint** are both enabled by default.
5. Click **Save and Enable**.

## Credentials

| Field | Required | Description |
|-------|----------|-------------|
| **AppID** | Yes | The bot's app ID, shown on the QQ Bot Open Platform when the bot is created. |
| **AppSecret** | Yes | The bot's app secret, shown only once at creation. |
| **Markdown Support** | No | Enable Markdown formatting (default: enabled). |
| **Enable Input Hint** | No | Show typing indicators while the bot generates a response (default: enabled). |

## Verify

Send `/help` to the bot in a direct message, or @mention it in a group chat with `/help`. The bot replies with its command list, which confirms the channel is working.

## Group chats

The bot works in QQ group chats and thread (话题) conversations: @mention it in a group to trigger a reply.

## Disable and rotate credentials

Disable or remove the channel at any time from the bot's **Platforms** tab. To rotate credentials, update **AppID** / **AppSecret** in the same panel and save.

## FAQ {#faq}

### I lost the AppSecret {#appsecret-reset}

**AppSecret** is shown only once, when the bot is created. Viewing it again on the QQ Bot Open Platform forces a reset; after the reset, update **AppSecret** in Memoh and save.
