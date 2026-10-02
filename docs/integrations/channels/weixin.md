# WeChat Channel Configuration

Connect your Memoh bot to WeChat personal messaging: setup is a QR-code login, with no manual token or API key entry.

::: warning Limits
- Private chats only.
- Output is plain text; Markdown is not rendered.
- Text messages are split into chunks of at most 4000 characters.
- Responses are delivered as complete messages; output is not streamed.
:::

## Prerequisites

- WeChat on your phone, signed in to the account the bot will use — you approve the login by scanning a QR code.

## Steps

### 1. Add the WeChat channel in Memoh

In Memoh, open the bot's **Platforms** tab, click **Add Channel**, and select **WeChat**.

### 2. Scan the QR code

In Memoh:

1. Click **Start QR Login**. Memoh fetches a QR code from the WeChat platform.
2. Open WeChat on your phone and scan the displayed QR code.
3. Confirm the login on your phone when prompted.

Once confirmed, Memoh saves the credentials automatically and the channel is enabled.

## Credentials

QR login stores the session credentials automatically — there are no fields to fill in. One optional setting is available:

| Field | Required | Description |
|-------|----------|-------------|
| **Enable Typing** | No | Show a typing indicator while the bot generates a response. |

## Verify

After the QR login succeeds, the channel is enabled automatically. Send `/help` to the bot in a WeChat private chat; the bot replies with its command list, which confirms the channel is working.

## Disable and rotate credentials

Disable or remove the channel at any time from the bot's **Platforms** tab. To sign in again, click **Start QR Login** and repeat the QR flow.

## FAQ {#faq}

### The QR code expired before I scanned it {#qr-expired}

The QR code is valid for a limited window. Click **Start QR Login** again to fetch a fresh one.
