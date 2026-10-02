# Telegram Channel Configuration

Connect your Memoh bot to Telegram — one of the most fully supported channels in Memoh, with streaming responses, Markdown formatting, and attachments.

## Prerequisites

- A Telegram account; you create the bot by talking to **@BotFather**.
- A Memoh bot; channels are configured from its **Platforms** tab.

## Steps

### 1. In Telegram, create a bot with @BotFather

1. Open Telegram and search for the official **@BotFather** bot.
2. Send the `/newbot` command.
3. Follow the prompts:
   - **Name**: a display name for your bot (e.g., `My Memoh Bot`).
   - **Username**: a unique username ending in `bot` (e.g., `my_memoh_bot`).
4. BotFather replies with an **API Token** (e.g., `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`). **Keep this token secret.**

> Official guide: [Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)

### 2. In Memoh, add the Telegram channel

1. Open your bot's detail page and select the **Platforms** tab.
2. Click **Add Channel** and select **Telegram**.
3. Paste the **API Token** into the credentials field.
4. Click **Save and Enable**.

## Credentials

| Field | Description |
|-------|-------------|
| **API Token** | The token BotFather issues when you create the bot (e.g., `123456789:ABC...`). Keep it secret. |

## Verify

Open a direct chat with your bot in Telegram and send `/help`. If the bot replies with its command list, the channel is working.

## Group chats

Telegram group chats are supported. Add the bot to a group and @mention it by its username to talk to it there.

## Disable and rotate credentials

You can disable or remove this channel at any time from the bot's **Platforms** tab. To rotate the token, update the **API Token** field and save.
