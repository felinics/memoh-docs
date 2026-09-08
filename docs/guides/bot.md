# Bot Management

A Bot is an independent AI agent that comes with its own workspace, persistent memory, and configurable personality. Bots can chat via various messaging platforms (Channels) and perform complex tasks using specialized tools.

## Creating a Bot

1. Navigate to the **Bots** page from the sidebar.
2. Click the **Create Bot** button.
3. Fill in the basic info:
   - **Display Name**: The name users will see in chats.
   - **Avatar**: A URL for the bot's profile picture.
   - **Timezone**: Optional per-bot timezone. If left empty, the bot inherits the user or system timezone.
   - **ACL Preset**: Quick-start access policy such as `allow_all` or `private_only`.
4. Click **Create**.

---

## Bot Detail Page

Once created, clicking on a bot card takes you to its **Detail Page**, where you can manage its entire lifecycle through specialized tabs.

### Tab Overview

| Tab | Description |
|-----|-------------|
| **Overview** | Health checks for workspace runtime, database, channels, and memory. |
| **General** | Core runtime settings: chat/title/image models, memory/search/TTS bindings, timezone, language, reasoning, and danger zone. |
| **Desktop** | Workspace display runtime, headed browser availability, and active display sessions. |
| **Computers** | Remote runtimes (your own machines running the Memoh runtime) that the bot can use for files and commands. |
| **Workspace** | Container-backed workspace lifecycle, snapshots, data export/import. |
| **Network** | Workspace network and overlay provider status/actions. |
| **Memory** | Browse, search, create, edit, and compact memories. |
| **Platforms** | Channel configurations such as Telegram, Discord, Feishu, QQ, Matrix, WeCom, WeChat, Misskey, DingTalk, and Web. |
| **Access** | ACL rules and default access behavior. |
| **Tool Approval** | Human approval settings for tools that require confirmation. |
| **Agents** | ACP-compatible coding agents, such as Codex and Claude Code, that can be enabled for chat workspace use. |
| **Email** | Email bindings and outbox. |
| **Connectors** | Third-party service connections (OAuth or API key) via Connect-It: status, enable/disable, reauthorize, disconnect. |
| **Hooks** | Bot-scoped automation rules stored in `/data/.memoh/hooks.json`. |
| **MCP** | MCP connection management (Stdio, Remote, OAuth). |
| **Compaction** | Session context compaction settings and logs. |
| **Schedule** | Cron-based scheduled tasks and execution logs. |
| **Skills** | Markdown-based skill files that define bot personality and capabilities. |

Files, Terminal, Display, and Browser workspace tools live in the chat workspace UI. They are not Bot Detail tabs. Use the workspace side of a chat when you need to inspect files, run shell commands, or operate the bot's browser/desktop.

---

## Configuring the Bot's Core Settings

After creating a bot, the most important step is configuring its runtime settings. These settings are split across a few tabs instead of living in one giant form.

1. Navigate to your bot's **Detail Page**.
2. Start with the **General** tab for chat/runtime bindings.
3. Use the **Schedule** tab for recurring autonomous tasks.
4. Use the **Compaction** tab for session context compaction behavior.
5. Use the **Access** tab to refine ACL rules after the initial ACL preset.

If you have not created these resources yet, set them up first:

- [Providers And Models](/integrations/providers/llm)
- [Built-in Memory Provider](/integrations/providers/memory/builtin.md)
- [Search Providers](/integrations/providers/web-search)
- [TTS Providers](/integrations/providers/tts/index.md)
- [Agents / ACP](/guides/acp.md)

---

## General Tab Reference

The **General** tab contains the settings that shape everyday conversation behavior.

| Field | Description |
|-------|-------------|
| **Chat Model** | The main LLM used for generating chat responses. |
| **Title Model** | Optional model used to generate session titles. |
| **Image Generation Model** | Optional model used by image-generation features. Pick a chat model that supports `image-output`. |
| **Memory Provider** | The memory backend assigned to the bot. The built-in provider can optionally define its own memory and embedding models. |
| **Search Provider** | The search engine used for web browsing capabilities. |
| **TTS Model** | Optional speech model used for text-to-speech output. Speech models come from the TTS Providers flow, not the normal chat provider flow. |
| **Timezone** | Per-bot timezone. If empty, Memoh inherits the user timezone and then falls back to the system timezone. |
| **Language** | The bot's primary communication language. |
| **Reasoning Effort** | Available when the selected chat model exposes `reasoning` compatibility. Options depend on the model (for example `low`, `medium`, `high`). |

Notes:

- The **Image Generation Model** is intentionally separate from the normal chat model so you can dedicate an image-capable model only to visual generation tasks.
- The **TTS Model** comes from the [TTS Providers](/integrations/providers/tts/index.md) system and uses `speech` models from the configured speech provider.
- The selected chat model's `context_window` influences session status reporting and [Context Compaction](/guides/compaction).

---

## Compaction Tab Reference

Compaction is now about **session context compaction**, not memory maintenance.

| Field | Description |
|-------|-------------|
| **Compaction Enabled** | Enable or disable automatic context compaction. |
| **Compaction Threshold** | Estimated token threshold that triggers compaction. |
| **Compaction Ratio** | How aggressively the session context should be reduced. |
| **Compaction Model** | Optional dedicated model used to summarize old session context. |

The Compaction tab also exposes compaction logs so you can see recent successful, pending, or failed runs.

For the runtime behavior, see [Context Compaction](/guides/compaction).

---

## Access And ACL

At creation time, the bot starts from an **ACL preset**. After that, use the **Access** tab for fine-grained control.

Two layers matter:

- **ACL Preset** gives you a sensible starting policy for a new bot.
- **ACL Default Effect** controls the default result when no rule matches.

Use the **Access** tab to refine conversation, group, and thread rules after the initial setup.

---

## Discuss-Related Advanced Settings

Most users only need the `chat` and `discuss` behavior described in [Sessions](/guides/sessions).

If you manage bot settings through the API or custom automation, the settings schema also includes `discuss_probe_model_id` for discuss-mode specific setups. Treat it as an advanced setting rather than a required field for normal bot creation.

---

## Workspace Files And Terminal

Workspace files and terminals are available from the chat workspace UI after the bot has an active workspace runtime. From there you can:

- Browse and edit files in the bot workspace.
- Open terminal sessions inside the workspace runtime.
- Use display/browser tools when the bot workspace has display support enabled.

For file workflows, see [Files](/guides/files.md). For headed browser and desktop workflows, see [Browser / Computer Use](/guides/browser-computer-use.md).

---

## Deleting a Bot

To permanently remove a bot and all its associated data (including workspace files and memory):
1. Navigate to the **General** tab in the Bot Detail page.
2. Scroll to the **Danger Zone** at the bottom.
3. Click **Delete Bot** and confirm the action.

> **Warning**: This action is irreversible. All persistent data for this bot will be lost.
