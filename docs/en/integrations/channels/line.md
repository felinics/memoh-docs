# LINE Channel Configuration

Connecting your Memoh Bot to LINE lets it chat with users through a LINE Official Account in one-on-one conversations.

## Before You Start

LINE delivers messages to Memoh through a **webhook**, so your Memoh deployment must expose a public HTTPS endpoint:

- Set `MEMOH_WEBHOOK_PUBLIC_BASE_URL` to your public HTTPS origin (no path, port, or private address), or
- Enable the Cloudflare Quick Tunnel profile in the server deploy stack, and Memoh will obtain a public URL automatically.

Outbound images are also fetched by LINE's servers from your deployment, so the same public HTTPS requirement applies to sending pictures.

## Step 1: Create a LINE Messaging API Channel

1. Go to the [LINE Developers Console](https://developers.line.biz/console/).
2. Create a provider (or pick an existing one), then create a **Messaging API** channel. This links the channel to a LINE Official Account.
3. In **Basic settings**, copy the **Channel secret**.
4. In the **Messaging API** tab, issue and copy a **Channel access token** (long-lived).

> Official Guide: [LINE Messaging API - Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/)

## Step 2: Configure Memoh

1. Go to your Bot's **Platforms** tab in the Memoh Web UI.
2. Click **Add Channel** and select **LINE**.
3. Paste your **Channel Secret** and **Channel Access Token**.
4. Click **Save** (or **Save and Enable**). The webhook callback URL is generated only after the configuration is saved.

## Step 3: Register the Webhook

After saving, the panel shows a read-only **WebHook Callback URL** in the form:

```text
https://<your-public-base>/channels/line/webhook/<config_id>
```

You have two ways to register it:

- Click **Set in LINE** — Memoh writes the webhook endpoint into your LINE channel directly through the Messaging API. Save any pending changes first, otherwise the button reports an error.
- Or click **Copy** and paste the URL into **Messaging API → Webhook URL** in the LINE Developers Console manually.

Then, in the LINE Developers Console, make sure **Use webhook** is enabled for the channel. If the panel warns that no public base URL is available, fix the `MEMOH_WEBHOOK_PUBLIC_BASE_URL` / tunnel setup first.

## Features Supported

- **One-on-one chat**: Users chat with the bot by adding the linked LINE Official Account as a friend.
- **Inbound messages**: Text, images, and files sent by the user. Images must be hosted by LINE itself (the normal case for photos sent from the app).
- **Outbound messages**: Text, plus PNG/JPEG images.
- **Signature verification**: Incoming webhooks are verified against your Channel Secret; events are deduplicated for 24 hours.

## Limitations

- **Private chats only.** Group and multi-person room messages are ignored — inviting the bot into a LINE group has no effect.
- **Inbound audio, video, stickers, and location messages are not processed.**
- Outbound images must be publicly reachable over HTTPS and within LINE's size limits (10 MB original, 1 MB preview). Non-image attachments cannot be sent to LINE.
- Replies are delivered through the LINE **Push API**, so they count against your LINE plan's push message quota.
- Responses arrive as complete messages; LINE does not support incremental streaming output.
- Long replies are split into multiple messages at LINE's 5000-character limit.
