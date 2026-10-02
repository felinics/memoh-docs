# Slack Channel Configuration

Connect your Memoh bot to Slack to receive direct messages, join channels and threads, read attachments, send files, and reply with streaming.

## Prerequisites

- A Slack workspace you can install apps into, and access to the [Slack API dashboard](https://api.slack.com/apps).
- A Memoh bot; channels are configured from its **Platforms** tab.

## Steps

### 1. In the Slack console, create an app

1. Go to the [Slack API dashboard](https://api.slack.com/apps) and create a new app.
2. Choose the workspace where you want to install the bot.

::: tip
Keep the app settings page open — steps 2 through 5 all happen there.
:::

### 2. In the Slack console, enable Socket Mode

Memoh's Slack adapter uses Socket Mode, so you need an app-level token in addition to the bot token.

1. In **Basic Information**, enable **Socket Mode**.
2. Create an **App-Level Token** with the `connections:write` scope.
3. Copy the generated token. It starts with `xapp-`.

### 3. In the Slack console, add bot token scopes

In **OAuth & Permissions**, add the bot token scopes required by the Slack adapter:

- `app_mentions:read` - receive bot mentions in channels
- `channels:history` - read messages in public channels
- `groups:history` - read messages in private channels
- `im:history` - read direct messages
- `mpim:history` - read group direct messages
- `chat:write` - send replies and thread messages
- `files:read` - read uploaded files and images
- `files:write` - upload outbound files
- `reactions:write` - add and remove reactions

Also add these recommended scopes if you want Slack conversation names and metadata to show up more completely in Memoh:

- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`

### 4. In the Slack console, subscribe to bot events

In **Event Subscriptions**, enable bot events and add the inbound event types the Slack adapter handles:

- `app_mention`
- `message.channels`
- `message.groups`
- `message.im`
- `message.mpim`

### 5. In the Slack console, install the app to your workspace

1. In **OAuth & Permissions**, click **Install to Workspace**.
2. Review the permission screen and authorize the app.
3. Copy the **Bot User OAuth Token**. It starts with `xoxb-`.

### 6. In Memoh, add the Slack channel

1. Open your bot's detail page and go to the **Platforms** tab.
2. Click **Add Channel** and select **Slack**.
3. Fill in:
   - **Bot Token**: your `xoxb-...` token
   - **App-Level Token**: your `xapp-...` token
4. Click **Save and Enable**.

### 7. In Slack, add the bot to conversations

After the channel is enabled, the Slack app still needs to be present in the conversations where you want it to work:

- Direct messages: open a DM with the app and send a message.
- Public channels: invite the bot to the channel.
- Private channels: invite the bot explicitly after installation.

## Credentials

| Field | Description |
|-------|-------------|
| **Bot Token** | The **Bot User OAuth Token** (`xoxb-...`) copied after installing the app to the workspace. |
| **App-Level Token** | The Socket Mode token (`xapp-...`) created with the `connections:write` scope. |

Both tokens must come from the same Slack app and workspace.

## Verify

Invite the bot to a channel and @mention it with `/help`, or send `/help` in a DM with the app. If the bot replies with its command list, the channel is working.

## Group chats

Slack channels are supported. Invite the bot to a public or private channel, then @mention it to talk to it there. Replies can continue in threads — Slack is the only channel with thread support.

## Disable and rotate credentials

You can disable or remove this channel at any time from the bot's **Platforms** tab. To rotate credentials, update the **Bot Token** and **App-Level Token** fields and save.

## FAQ {#faq}

### Why does Slack need two tokens? {#why-two-tokens}

Memoh's Slack adapter uses Socket Mode: the `xapp-...` app-level token is required in addition to the `xoxb-...` bot token, and both must come from the same Slack app and workspace.

### The bot can send messages but cannot read uploaded images or files {#cannot-read-files}

Check that the `files:read` scope is enabled.

### The bot connects but receives no incoming messages {#no-incoming-messages}

Check the bot events in **Event Subscriptions** and the matching `history` scopes again.
