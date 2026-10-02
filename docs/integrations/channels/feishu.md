# Feishu (Lark) Channel Configuration

Connect your Memoh bot to Feishu (Lark) via the Open Platform, so enterprise bots can interact with users in groups and private chats.

## Prerequisites

- A [Feishu Open Platform](https://open.feishu.cn/app) account that can create custom apps.
- A Memoh bot; channels are configured from its **Platforms** tab.

## Steps

### 1. In the Feishu console, create a custom app

1. Go to the [Feishu Open Platform](https://open.feishu.cn/app) and log in.
2. Click **Create Custom App**, enter a name and description, then click **Create**.
3. In the left sidebar, go to **App Settings** > **Credentials & Basic Info**.
4. Copy your **App ID** and **App Secret**.

### 2. In the Feishu console, enable the bot capability

Go to **Capabilities** > **Bot** and click **Enable Bot**.

### 3. In the Feishu console, configure permissions

1. Go to **Capabilities** > **Permissions**.
2. Search for and enable the following permissions (at minimum):
   - `im:message` (receive and send messages)
   - `im:chat` (access group chat information)
3. Click **Apply for Permissions** if required by your organization.

### 4. In Memoh, add the Feishu channel (default: long connection)

1. Go to your bot's **Platforms** tab and add a **Feishu** channel.
2. Keep **Inbound Mode** at its default: `websocket`.
3. Fill in your **App ID** and **App Secret**; if you use international Lark, switch **Region** to `lark`.
4. Click **Save**. Messages arrive over Feishu's **WebSocket long connection** — no public callback URL and no event-subscription setup needed.

### 5. Optional: switch to webhook mode

Choose this only when your server is publicly reachable and you prefer event callbacks.

::: tip
This mode round-trips between Memoh and the Feishu console: Memoh generates a callback URL that you paste back into **Event Subscriptions**, so keep the Feishu console open.
:::

1. In Memoh, set **Inbound Mode** to `webhook`; besides the **App ID** and **App Secret**, also fill in the **Encrypt Key** and **Verification Token** matching your Event Subscriptions settings in the Feishu console.
2. Click **Save**. Memoh generates a **Webhook Callback URL** — copy it.
3. In the Feishu console, go to **App Settings** > **Event Subscriptions**, paste the URL into the **Verification URL** field, and save.
4. Add events like **Receive Message** (`im.message.receive_v1`).

> Official guide: [Feishu Custom Bot Guide](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot)

### 6. In the Feishu console, publish your app

1. Go to **App Release** > **Version Management & Release**.
2. Click **Create a Version**, fill in the details, and submit for approval.
3. Once approved and published, the bot is ready to use in your tenant.

## Credentials

| Field | Description |
|-------|-------------|
| **App ID** | From **App Settings** > **Credentials & Basic Info** in the Feishu console. |
| **App Secret** | From the same **Credentials & Basic Info** page. |
| **Region** | Switch to `lark` if you use international Lark. |
| **Inbound Mode** | `websocket` (default, long connection) or `webhook`. |
| **Encrypt Key** | Webhook mode only; must match your Event Subscriptions settings in the Feishu console. |
| **Verification Token** | Webhook mode only; must match your Event Subscriptions settings in the Feishu console. |

## Verify

Open a private chat with the bot in Feishu and send `/help`. If the bot replies with its command list, the channel is working.

## Group chats

Feishu group chats are supported. Add the bot to a group and @mention it to talk to it there.

## Disable and rotate credentials

You can disable or remove this channel at any time from the bot's **Platforms** tab. To rotate credentials, update the fields (such as **App Secret**) and save.

## FAQ {#faq}

### The channel is configured but the bot does not respond {#app-not-published}

A custom app must be published first: in the Feishu console, go to **App Release** > **Version Management & Release**, create a version, and submit it for approval. Once approved and published, the bot is ready to use in your tenant.

### Enabling permissions requires an approval {#permission-approval}

Some organizations require an approval flow for app permissions: click **Apply for Permissions** under **Capabilities** > **Permissions** to submit the request.
