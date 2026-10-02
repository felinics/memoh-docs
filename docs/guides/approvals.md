# Approvals and Trust

A bot that can write files, run commands, and message people needs a boundary you actually understand. This page explains that boundary from the user's side: what a bot can reach, when it stops to ask, and what approval does and does not cover. The mechanics — member lists, modes, and rules — live in [Access Control](./access.md).

## What a bot can touch by default

- **Its own workspace, and nothing else.** Each bot works inside its own isolated container workspace (`/data`). Files and state stay there, and bots cannot see into each other — see [Workspace](./container.md).
- **Only the channels and people you connected.** A bot reaches a platform because you added it on the **Platforms** tab, and answers an identity because access allows it.
- **Only the tier each person was granted.** Workspace access is tiered (chat, read files, write files, execute commands, manage), and a job gets the level it needs, no more. The tiers are defined in [Access Control](./access.md).

Two member lists feed these grants, both on the bot's **Access** tab: **Channel Members** for identities on IM platforms, and **Workspace Members** for registered Memoh users.

## When it asks you

Write and execute tool calls can require human approval, controlled per bot on its **Tool Approval** tab. When a tool is set to require confirmation, the flow is:

1. The bot proposes the action — the specific tool call, before anything runs.
2. You approve or reject it.
3. Only an approved call executes; a rejected one never runs.

Approval always happens before the action, so reviewing the request is your moment of control, not damage control. A pending request can also time out rather than wait forever; if you missed one, ask the bot to try the action again.

::: tip More gates, if you want them
Beyond the Tool Approval settings, a [hook](./hooks.md) matched on an event can itself request human approval — useful for guarding one specific command pattern rather than a whole tool.
:::

## Keep these behind approval

These are recommendations, not defaults Memoh enforces; treat them as a sensible starting point:

- **Messages that leave the workspace** — anything sent to other people or posted publicly.
- **Deleting or overwriting files**, especially ones the bot did not create.
- **Installs and long-running commands** in the workspace.
- **Anything that spends money or touches production.**

Actions that stay inside the bot's own workspace (drafting, organizing, reading) are the ones worth freeing from approval first. For how this fits a routine's lifecycle, from the first read-only run to widened permissions, see [Working with Bots](./working-with-bots.md).

## Takeover and credentials

When a bot working in its visible desktop hits a login wall or a CAPTCHA, you take over the screen and type the password, passkey, or one-time code yourself, then hand control back. The credential goes from your keyboard into the site — you never have to tell it to the bot.

The browser session stays in that workspace afterwards, so later tasks remain signed in without repeating the takeover. See [Browser / Computer Use](./browser-computer-use.md) and [Quick Start](./quick-start.md#step-5-let-it-use-the-workspace-and-browser).

## An honest boundary note

::: warning What approval does not do
An approval gates the proposed action — it does not undo work that already ran, and it cannot retract a message that was already sent. Rejecting a request stops that request; it is not a rollback button.
:::

That is why the durable habit is the one from [Access Control](./access.md): grant the minimum tier the job needs, review a few runs, and widen afterwards. Trust in a bot is built the same way as trust in a new teammate: incrementally, on evidence.
