# Slash Commands

Memoh bots support **slash commands** that are intercepted before the LLM runs. They are intended for fast inspection and control tasks such as viewing settings, switching providers, checking session status, or creating a fresh session.

Slash commands work in channel adapters and in the built-in Web UI chat. They do not consume model tokens just to parse the command itself.

---

## Command Model

Most commands follow a resource-group pattern:

```text
/resource [action] [arguments...]
```

Examples:

```text
/schedule list
/model current
/schedule create morning-news "0 9 * * *" "Send a daily summary"
```

Key ideas:

- **resource** is the command group, such as `schedule`, `model`, or `status`.
- **action** is the specific operation, such as `list`, `get`, `set`, or `latest`.
- **arguments** are positional values after the action. Use quotes when a value contains spaces.
- Some groups have a **default action**, so `/settings` is equivalent to `/settings get`, and `/status` is equivalent to `/status show`.

Two commands are **top-level** instead of resource groups:

- `/new` — create a new session for the current conversation route
- `/stop` — abort the currently running generation for the current conversation

---

## Skill Activation And Quick Actions

Besides fixed commands, the slash system can activate the bot's [Skills](./skills.md) on demand:

```text
/<skill-name> [optional prompt]
```

- In the **Web UI composer**, typing `/` opens a panel with **Quick actions** (`/help`, `/skill list`, `/new`, `/compact`, `/model`) and the bot's skills. Selecting a skill attaches it as a removable chip; you can also type the form above directly.
- In **IM channels**, the same `/<skill-name>` form works, and `/skill list` renders the available skills as tappable buttons.
- The activated skill's content is injected into the **current turn only** — it does not persist into history, session titles, or memory.

Skill names are resolved **server-side** against the bot's current effective skill catalog on every send. Slash-shaped input that matches no known command or skill is rejected with a clear error instead of being passed to the model, while ordinary text that merely starts with `/` (paths, URLs) still goes through as normal chat.

Two limitations to know:

- A skill activation message cannot carry attachments (fixed commands with attachments still execute).
- In group chats, a slash message that is not directed at the bot is silently ignored.

## Built-in Help

The slash system has layered help built into it:

| Command | Meaning |
|---------|---------|
| `/help` | Show the top-level command list |
| `/help <group>` | Show actions inside one group |
| `/help <group> <action>` | Show detailed usage for one action |

Examples:

```text
/help
/help model
/help model set
```

This is the fastest way to discover the exact live command surface for your current Memoh version.

---

## Parsing Rules

Slash commands support a few convenience forms:

- **Mention-prefixed commands** work in group chats, for example `@BotName /help`.
- **Telegram bot suffixes** are accepted, for example `/help@MemohBot`.
- Quoted strings are preserved as one argument, for example:

```text
/schedule create morning-news "0 9 * * *" "Send today's top stories"
```

If the text does not resolve to a known command, Memoh treats it as a normal chat message instead of a slash command.

---

## Permissions

Read-only actions are available to users who can already chat with the bot. Write actions such as `set`, `create`, `update`, `delete`, `enable`, and `disable` are **owner-only**.

In `/help` output, owner-only actions are marked with `[owner]`.

---

## Quick Reference

### Top-Level Commands

| Command | Description |
|---------|-------------|
| `/help` | Show slash command help |
| `/new [chat|discuss]` | Create a new session for the current route |
| `/stop` | Stop the current generation |

### Resource Groups

| Group | Description | Default Action |
|-------|-------------|----------------|
| `/schedule` | Manage scheduled tasks | None |
| `/mcp` | Inspect MCP connections | None |
| `/settings` | View and update bot settings | `get` |
| `/model` | View and switch bot models | None |
| `/memory` | View and switch memory providers | None |
| `/search` | View and switch search providers | None |
| `/usage` | View token usage | `summary` |
| `/email` | Inspect email providers, bindings, and outbox | None |
| `/skill` | View loaded bot skills | `list` |
| `/fs` | Browse files inside the bot workspace | None |
| `/status` | Inspect session message/context/cache status | `show` |
| `/access` | Inspect identity, role, and ACL context | `show` |
| `/compact` | Trigger immediate session context compaction | `run` |
| `/context` | Show context window usage for the current session | `show` |
| `/reasoning` (aliases `/reason`, `/effort`, `/think`) | View or set the reasoning level for this session | `show` |
| `/language` | View or set the command UI language (`auto`, `en`, `zh`, `ja`) | `show` |
| `/link <code>` | Link this channel account to your Memoh user with a code from the Web UI | `consume` |

---

## Session Commands

### `/new`

Creates a fresh session for the current conversation route. It is the fastest way to reset conversational context without deleting old history.

Supported forms:

- `/new` — use the default session type for the current context
- `/new chat` — force a normal chat session
- `/new discuss` — force a discuss session

Default behavior:

- **Web UI local chat** defaults to `chat`
- **Direct messages** default to `chat`
- **Group conversations on channel adapters** default to `discuss`

`/new discuss` is not supported in the built-in Web UI local channel. Use a channel adapter such as Telegram or Discord if you want explicit discuss sessions.

See [Sessions](./sessions.md) for how `chat` and `discuss` differ.

### `/stop`

Stops the current in-progress generation for the current conversation. This is useful when:

- the bot is still streaming and you already have what you need
- a tool loop is taking too long
- you want to interrupt the current turn before sending a follow-up

---

## Status And Inspection Commands

### `/status`

Shows session-level runtime stats for the current conversation:

- message count
- current context usage
- cache hit rate
- cache read/write tokens
- used skills in the session

Actions:

| Action | Usage |
|--------|-------|
| `show` | `/status` or `/status show` |
| `latest` | `/status latest` |

Use `show` for the currently active conversation route. Use `latest` when you want the newest session for the bot even if the current route has no active session.

### `/access`

Shows the current identity and permission context that Memoh is using for the command:

- channel identity
- linked user
- bot role
- whether write commands are allowed
- channel / conversation / thread scope
- evaluated chat ACL result

Usage:

```text
/access
```

This command is useful when debugging ACL rules or why a write command was denied.

### `/usage`

Shows token usage for the last 7 days.

Actions:

| Action | Usage |
|--------|-------|
| `summary` | `/usage` or `/usage summary` |
| `by-model` | `/usage by-model` |


### `/email`

Shows email-related configuration data for the current bot.

Actions:

| Action | Usage |
|--------|-------|
| `providers` | `/email providers` |
| `bindings` | `/email bindings` |
| `outbox` | `/email outbox` |

---

## Configuration Commands

### `/settings`

Shows or updates core bot settings.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `get` | `/settings` or `/settings get` | All |
| `update` | `/settings update [options]` | Owner |

Supported `update` options:

| Option | Description |
|--------|-------------|
| `--language` | Bot language, such as `en` or `zh` |
| `--acl_default_effect` | `allow` or `deny` |
| `--reasoning_effort` | Effort level such as `low`, `medium`, `high`, `xhigh` — usable values depend on the selected model's declared reasoning efforts |
| `--chat_model_id` | Chat model UUID |

Example:

```text
/settings update --language en --reasoning_effort high
```

### `/model`

Shows or switches the bot's chat model.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `list [provider_name]` | `/model list` | All |
| `current` | `/model current` | All |
| `set` | `/model set <model_id>` or `/model set <provider_name> <model_name>` | Owner |

Examples:

```text
/model list
/model list OpenAI
/model current
/model set gpt-4o
/model set OpenAI gpt-4o
```

### `/memory`

Shows or switches the active memory provider.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `list` | `/memory list` | All |
| `current` | `/memory current` | All |
| `set` | `/memory set <name>` | Owner |

### `/search`

Shows or switches the active search provider.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `list` | `/search list` | All |
| `current` | `/search current` | All |
| `set` | `/search set <name>` | Owner |

### `/mcp`

Shows or deletes MCP connections configured for the bot.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `list` | `/mcp list` | All |
| `get` | `/mcp get <name>` | All |
| `delete` | `/mcp delete <name>` | Owner |

---

## Automation And Filesystem Commands

### `/schedule`

Manages scheduled tasks for the bot.

Actions:

| Action | Usage | Permission |
|--------|-------|------------|
| `list` | `/schedule list` | All |
| `get` | `/schedule get <name>` | All |
| `create` | `/schedule create <name> <pattern> <command>` | Owner |
| `update` | `/schedule update <name> [--pattern P] [--command C]` | Owner |
| `delete` | `/schedule delete <name>` | Owner |
| `enable` | `/schedule enable <name>` | Owner |
| `disable` | `/schedule disable <name>` | Owner |

Examples:

```text
/schedule list
/schedule create morning-news "0 9 * * *" "Summarize today's top tech news"
/schedule disable morning-news
```

### `/skill`

Lists the currently available bot skills. Only **runtime-usable** skills appear — disabled or shadowed sources are omitted.

Actions:

| Action | Usage |
|--------|-------|
| `list` | `/skill` or `/skill list` |

To activate a skill for one turn, use `/<skill-name> [prompt]` — see [Skill Activation And Quick Actions](#skill-activation-and-quick-actions).

### `/fs`

Browses the bot workspace filesystem.

Actions:

| Action | Usage |
|--------|-------|
| `list` | `/fs list [path]` |
| `read` | `/fs read <path>` |

Examples:

```text
/fs list /
/fs list /home
/fs read /home/bot/IDENTITY.md
```

Read output is truncated when the file is very large.

---

## Context Compaction Command

### `/compact`

Triggers immediate **session context compaction** for the current session. This is different from memory compaction:

- **context compaction** reduces the active prompt/history footprint of one session
- **memory compaction** rewrites long-term memory entries in the memory provider

Actions:

| Action | Usage |
|--------|-------|
| `run` | `/compact` or `/compact run` |

Use this when the current conversation has grown long and you want Memoh to summarize older turns before continuing. See [Context Compaction](./compaction.md).
