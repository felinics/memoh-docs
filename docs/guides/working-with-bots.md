# Working with Bots

[Quick Start](./quick-start.md) gets a bot running; this page is about working with one well — what to delegate, how to phrase it, where rules should live, and when one bot should become two — followed by the configuration reference: creating a bot and every tab on its detail page.

## What to hand off

A task is a good fit for a bot when three things hold:

- **A clear outcome.** You can say what should exist when the work is done — a file, a message, a table.
- **Reachable sources.** The files, sites, or conversations involved are ones the bot can actually get to: uploaded into its workspace, connected as a channel or service, or public.
- **A checkable result.** You can tell at a glance whether the output is right, so reviewing stays cheap.

When all three hold, start read-only anyway: let the bot read and organize first, review a few outputs, then grant more. Every scenario in [Use Cases](./use-cases.md) begins this way.

## State the request

A good request answers five questions — outcome, source, constraints, format, checkpoint. The table is in [Quick Start](./quick-start.md#step-4-give-it-a-task); here is what the difference looks like in practice.

::: warning Vague
> Keep an eye on tech news and send me anything interesting.
:::

No source (which sites or repositories?), no delivery time, and "interesting" is a judgment the bot has to make for you. Every digest becomes a coin flip.

**Instead:**

::: tip Specific
> Every weekday at 8am, summarize releases and notable issues from the repositories I follow over the last 24 hours, and send them to me as one digest. Cite a source for every item; if something is uncertain, say so instead of guessing.
:::

::: warning Vague
> Clean up this spreadsheet.
:::

"Clean" is undefined: which rows count as dirty, may the original file change, and what should come back? The bot has to guess three times before it starts.

**Instead:**

::: tip Specific
> Remove every row with an empty email column from the CSV I just uploaded. Give me the cleaned file and tell me how many rows you dropped. Do not modify the original file.
:::

The pattern in both rewrites: name the sources, bound the actions, and make the result something you can verify in one look.

## Where rules live

Two kinds of instruction, two homes:

- **Permanent rules** belong in the bot's instructions on its detail page — its role, format standards, standing constraints. They apply to every future session.
- **One-off asks** belong in the message — today's file, this week's exception.

When a correction should stick, promote it: phrase it as a durable rule and move it into the instructions, exactly as [Quick Start](./quick-start.md#step-7-review-then-make-it-stick) step 7 shows. When a whole routine repeats, save it as a [Skill](./skills.md) so one sentence invokes it; preferences the bot should recall on its own belong in [Memory](./memory.md).

## When to split bots

One bot, one job. A bot with a single focused job accumulates context that keeps helping it; a do-everything bot dilutes its own instructions and memory. Both [Quick Start](./quick-start.md) and the [Overview](./overview.md) make the same point, so here is only the practical test: when a new request has a different audience, different sources, or needs different permissions than the bot's current job, create a second bot.

Each bot gets its own workspace, memory, channels, and permission boundary, and bots cannot see into each other. Splitting also keeps permissions honest — the bot that only reads release notes never needs the right to execute commands.

## Approval habits

Grant the level a job needs and no more — workspace access is tiered from chat through read, write, execute, and manage; see [Access Control](./access.md).

In practice:

1. Start new routines read-only and keep write and execute tool calls behind approval.
2. Review the first few runs before widening anything.
3. Keep actions that leave the workspace — messages to other people, anything external — behind approval even after the routine feels safe.

This is the same path the [Use Cases](./use-cases.md#from-example-to-routine) checklist walks: approving a few requests costs far less than undoing a wrong write.

---

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
| **Workspace** | Container-backed workspace lifecycle, snapshots, data export/import. |
| **Network** | Workspace network and overlay provider status/actions. |
| **Memory** | Browse, search, create, edit, and compact memories. |
| **Platforms** | Channel configurations such as Telegram, Discord, Feishu, QQ, WeCom, WeChat, DingTalk, and Web. |
| **Access** | ACL rules and default access behavior. |
| **Tool Approval** | Human approval settings for tools that require confirmation. |
| **Agents** | ACP-compatible coding agents, such as Codex and Claude Code, that can be enabled for chat workspace use. |
| **Connectors** | Third-party service connections (OAuth or API key) via Connect-It: status, enable/disable, reauthorize, disconnect. |
| **Hooks** | Bot-scoped automation rules stored in `/data/.memoh/hooks.json`. |
| **MCP** | MCP connection management (Stdio, Remote, OAuth). |
| **Compaction** | Session context compaction settings and logs. |
| **Schedule** | Cron-based scheduled tasks and execution logs. |
| **Skills** | Markdown-based skill files that define bot personality and capabilities. |

Files, Terminal, and the desktop/browser panes are also available inside the chat workspace UI — use the workspace side of a chat when you want to inspect files, run shell commands, or watch the bot's browser and desktop without leaving the conversation.

---

## Configuring the Bot's Core Settings

After creating a bot, the most important step is configuring its runtime settings. These settings are split across a few tabs instead of living in one giant form.

1. Navigate to your bot's **Detail Page**.
2. Start with the **General** tab for chat/runtime bindings.
3. Use the **Schedule** tab for recurring autonomous tasks.
4. Use the **Compaction** tab for session context compaction behavior.
5. Use the **Access** tab to refine ACL rules after the initial ACL preset.

If you have not created these resources yet, set them up first:

- [Providers And Models](../integrations/providers/llm.md)
- [Built-in Memory Provider](../integrations/providers/memory/builtin.md)
- [Search Providers](../integrations/providers/web-search.md)
- [TTS: Edge](../integrations/providers/tts/edge.md)
- [Agents / ACP](./acp.md)

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
- The **TTS Model** comes from the [TTS provider](../integrations/providers/tts/edge.md) flow and uses `speech` models from the configured speech provider.
- The selected chat model's `context_window` influences session status reporting and [Context Compaction](./compaction.md).

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

For the runtime behavior, see [Context Compaction](./compaction.md).

---

## Access And ACL

At creation time, the bot starts from an **ACL preset**. After that, use the **Access** tab for fine-grained control.

Two layers matter:

- **ACL Preset** gives you a sensible starting policy for a new bot.
- **ACL Default Effect** controls the default result when no rule matches.

Use the **Access** tab to refine conversation, group, and thread rules after the initial setup.

---

## Discuss-Related Advanced Settings

Most users only need the `chat` and `discuss` behavior described in [Sessions](./sessions.md).

If you manage bot settings through the API or custom automation, the settings schema also includes `discuss_probe_model_id` for discuss-mode specific setups. Treat it as an advanced setting rather than a required field for normal bot creation.

---

## Workspace Files And Terminal

Workspace files and terminals are available from the chat workspace UI after the bot has an active workspace runtime. From there you can:

- Browse and edit files in the bot workspace.
- Open terminal sessions inside the workspace runtime.
- Use display/browser tools when the bot workspace has display support enabled.

For file workflows, see [Files](./files.md). For headed browser and desktop workflows, see [Browser / Computer Use](./browser-computer-use.md).

---

## Deleting a Bot

To permanently remove a bot and all its associated data (including workspace files and memory):
1. Navigate to the **General** tab in the Bot Detail page.
2. Scroll to the **Danger Zone** at the bottom.
3. Click **Delete Bot** and confirm the action.

> **Warning**: This action is irreversible. All persistent data for this bot will be lost.
