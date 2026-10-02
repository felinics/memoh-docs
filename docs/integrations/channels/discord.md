# Discord Channel Configuration

Connect your Memoh bot to Discord to join servers and chat with community members in channels and direct messages.

## Prerequisites

- A Discord account with access to the [Discord Developer Portal](https://discord.com/developers/applications).
- A Discord server you can authorize the bot into.
- A Memoh bot; channels are configured from its **Platforms** tab.

## Steps

### 1. In the Discord Developer Portal, create an application and get the bot token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give it a name.
3. In the left sidebar, go to **Bot**.
4. Click **Reset Token** to generate a **Bot Token**. Copy this token and store it securely.

### 2. In the Discord Developer Portal, enable privileged gateway intents

1. On the **Bot** page, scroll down to the **Privileged Gateway Intents** section.
2. Enable `Message Content Intent`, `Server Members Intent` and `Presence Intent`.
3. Save changes.

### 3. In the Discord Developer Portal, invite the bot to your server

1. Go to **OAuth2** > **URL Generator**.
2. Select scopes: `bot`, `applications.commands`.
3. Select permissions: `Send Messages`, `Read Message History`, `Embed Links`, `Attach Files`.
4. Copy the generated URL and open it in your browser.
5. Select the server you want to add the bot to and authorize it.

> Official guide: [Discord Developer Portal - Bots](https://discord.com/developers/docs/intro)

### 4. In Memoh, add the Discord channel

1. Open your bot's detail page and go to the **Platforms** tab.
2. Click **Add Channel** and select **Discord**.
3. Paste the **Bot Token**.
4. Click **Save and Enable**.

## Credentials

| Field | Description |
|-------|-------------|
| **Bot Token** | Generated with **Reset Token** on the application's **Bot** page. Store it securely. |

## Verify

Send the bot a direct message with `/help`, or @mention it in a channel of a server it has joined. If the bot replies with its command list, the channel is working.

## Group chats

Discord servers are supported. After the bot is authorized into a server, @mention it in a channel to talk to it there.

## Disable and rotate credentials

You can disable or remove this channel at any time from the bot's **Platforms** tab. To rotate the token, update the **Bot Token** field and save.
