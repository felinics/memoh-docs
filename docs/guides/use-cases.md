# Use Cases

Ready-to-follow scenarios that combine multiple Memoh features to solve real problems.

A good bot **owns a repeatable outcome**, not a loose category of questions. Each scenario below states what the bot owns, which features it uses, and a starting prompt you can send as-is. Every example starts with read-only work — check the output first, then grant more.

## Morning Digest

**Owns:** one message that starts your workday with everything you care about.

**Uses:** [Scheduled Tasks](./schedule.md) · [Web Search Providers](../integrations/providers/web-search.md) · [Platforms](../integrations/channels/index.md)

**Start with:**

> Every weekday at 8am, summarize releases and notable issues from the repositories I follow over the last 24 hours, add today's weather, and send it to me as one digest. Cite a source for every item; if something is uncertain, say so instead of guessing.

The bot has a `schedule` tool: describe the timing in plain language and it registers the cron entry itself. Cap the first runs with **Max Calls** until the format looks right.

## Release Watch

**Owns:** an external change you are waiting for, reported the moment it happens.

**Uses:** [Scheduled Tasks](./schedule.md) · [Workspace](./container.md) · [Platforms](../integrations/channels/index.md)

**Start with:**

> Watch this project's releases page and check every 30 minutes. When a new version ships, write the changes up as Markdown in your workspace and ping me once on Telegram. Organize only — do not run any upgrade or install anything.

"It's there even when you're not" is schedules plus proactive messages: check on a timer, speak only when something changed. The same pattern watches prices, stock, or document updates.

## Group On-Call Assistant

**Owns:** secretary duty in a team group: answers when mentioned and posts a daily recap.

**Uses:** [Platforms](../integrations/channels/index.md) · [Sessions](./sessions.md) · [Access Control](./access.md) · [Scheduled Tasks](./schedule.md)

**Start with:**

> Once you join this group: when someone mentions you, summarize the day's discussion and open items. Every day at 6pm, post a recap organized as decisions / to-dos / open questions. Post only in this group — never message anyone privately.

Use the "group only" [Access Control](./access.md) preset to fence its territory. In discuss sessions the bot decides for itself whether it has anything worth saying, so it will not flood the channel.

## A Living Spreadsheet

**Owns:** one data file that the bot creates, updates on schedule, and reports changes to first.

**Uses:** [Workspace](./container.md) · [Files](./files.md) · [Scheduled Tasks](./schedule.md)

**Start with:**

> Create a competitor pricing sheet (CSV) in your workspace. Check each vendor's site every morning and append any changes to the sheet; message me first if a price drops. Maintain this file only — do not send anything to anyone else.

The workspace is a real filesystem with a terminal (Python, Node.js, and uv preinstalled), so cleaning CSVs, running scripts, and generating reports all happen in place. Browse the output any time under **Files**.

## Screen Work Behind Logins

**Owns:** web tasks that need eyes on a screen: console checks, form flows, OAuth.

**Uses:** [Browser / Computer Use](./browser-computer-use.md) · [Workspace](./container.md) (visible desktop)

**Start with:**

> Open our admin console and verify the configuration against the checklist I give you, saving a screenshot of each item into the workspace. If you hit a login, a CAPTCHA, or anything you are unsure about, stop and wait for me to take over the desktop; continue after I hand it back. Read-only throughout — change no settings.

The visible desktop works both ways: watch it work in the desktop pane, or take over the keyboard to type a password, then hand control back. The browser session stays in the workspace, so the next task is already signed in.

## Build and Preview in the Cloud

**Owns:** a small project built in its own workspace, running where you can see it.

**Uses:** [Agents / ACP](./acp.md) · [Workspace](./container.md) · [Skills](./skills.md)

**Start with:**

> Build a reading-list web page in your workspace: add items, mark them finished, filter by theme. When it works, start the dev server and tell me how to preview it. Commit every change locally with git — do not push to any remote.

Prefer Claude Code or Codex? Attach your own subscription on the bot's **Agent** tab; it keeps working in the same workspace, on the same files.

## An Assistant That Remembers

**Owns:** your preferences and project state, carried across sessions and platforms.

**Uses:** [Memory](./memory.md) · [Platforms](../integrations/channels/index.md) · [Scheduled Tasks](./schedule.md)

**Start with:**

> Remember these preferences: mornings are for deep work, meetings go in the afternoon, and the weekly report is due Friday before end of day. From now on, check memory before scheduling reminders or writing summaries; if a preference is unclear, ask me instead of guessing.

With a [memory provider](../integrations/providers/memory/builtin.md) configured, "whatever happened with that PR?" is a question it can just answer. When memories pile up, run **Compact** to merge and dedupe.

---

## From Example to Routine

1. **Start read-only.** Let it read and prepare; review a few outputs before granting writes or execution.
2. **Put constraints in the instructions.** Outcome, sources, constraints, format, checkpoints — spell out all five (see [Quick Start](./quick-start.md)).
3. **Save repeated flows as [Skills](./skills.md).** One sentence should invoke the whole routine.
4. **Add a [Schedule](./schedule.md) only once the flow is stable.** Trial-run with Max Calls first.
5. **Keep writes and external actions behind approval,** even after the routine feels safe.
6. **Fence who can command it with [Access Control](./access.md)** — especially bots that join group chats.
7. **Let [Memory](./memory.md) hold your preferences.** A correction made once should stick.
