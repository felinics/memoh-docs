# LINE Channel Configuration

Connect your Memoh bot to a LINE Official Account: users add the linked account as a friend and chat with the bot one-on-one.

::: warning Limits
- Private chats only. Group and multi-person room messages are ignored — inviting the bot into a LINE group has no effect.
- Output is plain text; Markdown is not rendered.
- Outbound media is limited to PNG/JPEG images. Images must be publicly reachable over HTTPS and within LINE's size limits (10 MB original, 1 MB preview); non-image attachments cannot be sent.
- Inbound audio, video, stickers, and location messages are not processed. Inbound images must be hosted by LINE itself (the normal case for photos sent from the app).
- Responses arrive as complete messages — LINE does not support incremental streaming output — and long replies are split into multiple messages at LINE's 5000-character limit.
- Replies are delivered through the LINE **Push API**, so they count against your LINE plan's push message quota.
:::

## Prerequisites

LINE delivers messages to Memoh through a **webhook**, and LINE's servers also fetch outbound images from your deployment, so Memoh must expose a public HTTPS endpoint:

- Set `MEMOH_WEBHOOK_PUBLIC_BASE_URL` to your public HTTPS origin (no path, port, or private address), or
- Enable the Cloudflare Quick Tunnel profile in the server deploy stack, and Memoh will obtain a public URL automatically.

## Steps

### 1. Create a LINE Messaging API channel

In the LINE Developers Console:

1. Go to the [LINE Developers Console](https://developers.line.biz/console/).
2. Create a provider (or pick an existing one), then create a **Messaging API** channel. This links the channel to a LINE Official Account.
3. In **Basic settings**, copy the **Channel secret**.
4. In the **Messaging API** tab, issue and copy a **Channel access token** (long-lived).

> Official Guide: [LINE Messaging API - Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/)

### 2. Add the channel in Memoh

In Memoh:

1. Open the bot's **Platforms** tab.
2. Click **Add Channel** and select **LINE**.
3. Paste your **Channel Secret** and **Channel Access Token**.
4. Click **Save** (or **Save and Enable**). The webhook callback URL is generated only after the configuration is saved.

### 3. Register the webhook

In Memoh, after saving, the panel shows a read-only **WebHook Callback URL** in the form:

```text
https://<your-public-base>/channels/line/webhook/<config_id>
```

Register it in one of two ways:

- Click **Set in LINE** — Memoh writes the webhook endpoint into your LINE channel directly through the Messaging API. Save any pending changes first, otherwise the button reports an error.
- Or click **Copy** and paste the URL into **Messaging API → Webhook URL** in the LINE Developers Console manually.

Then, in the LINE Developers Console, make sure **Use webhook** is enabled for the channel.

Memoh verifies incoming webhooks against your **Channel Secret** and deduplicates events for 24 hours.

## Credentials

| Field | Required | Description |
|-------|----------|-------------|
| **Channel Secret** | Yes | Copied from **Basic settings** of the Messaging API channel. |
| **Channel Access Token** | Yes | Long-lived token issued in the **Messaging API** tab. |

## Verify

Add the linked LINE Official Account as a friend, then send `/help` to the bot in the one-on-one chat. The bot replies with its command list, which confirms the channel is working.

## Disable and rotate credentials

Disable or remove the channel at any time from the bot's **Platforms** tab. To rotate credentials, update **Channel Secret** / **Channel Access Token** in the same panel and save.

## FAQ {#faq}

### The panel warns that no public base URL is available {#no-public-base-url}

The webhook callback URL cannot be built without a public HTTPS origin. Fix the `MEMOH_WEBHOOK_PUBLIC_BASE_URL` / Cloudflare Quick Tunnel setup described in the prerequisites first.
