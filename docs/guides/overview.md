# Memoh Overview

Memoh gives every bot its own cloud computer: a workspace with a real filesystem and terminal, a desktop browser you can watch and take over, and long-term memory that carries across sessions. Close your laptop; the bot keeps working.

You work with a bot by messaging it — in the Memoh app, or on Telegram, Slack, Discord, Feishu, DingTalk, WeCom, WeChat, QQ, and LINE. Every entry point reaches the same bot and the same memory.

Getting in takes a download and a Memoh Cloud sign-in. Hosted models (DeepSeek, Kimi, GPT, Claude, and more) are ready to use; to run your own keys or model service, see [BYOK](./quick-start.md#bring-your-own-key-byok).

## What makes Memoh different

- **A real computer, not a throwaway sandbox.** Files you write and runtimes you install stay in the [workspace](./container.md); what you set up on Monday is still there on Friday.
- **A screen you can see.** The bot drives a real browser on a visible desktop; when it hits a login or CAPTCHA, you [take over the keyboard](./browser-computer-use.md), finish the step, and hand control back.
- **It remembers.** [Long-term memory](./memory.md) works across sessions and channels; a preference you correct once should stick.
- **It runs while you are away.** [Scheduled tasks](./schedule.md) fire on cron and deliver to your connected channels — checking on time, speaking only when something changed.
- **Bring your own coding agent.** Put Claude Code or Codex into the same workspace over [ACP](./acp.md), on your own subscription.

## One bot per job

Every bot has its own workspace, memory, channels, and permission boundary; bots cannot see into each other. When work genuinely splits into roles, create another bot instead of overloading one. Who can chat with a bot, read or write its files, and run commands is granted level by level in [Access Control](./access.md) — give the level the job needs and no more.

## A good first handoff

Pick something small you already do by hand every week, and state the outcome, sources, and boundaries:

> Every Friday at 17:00, turn the links and files I sent you this week into a weekly report — grouped by theme, one line each. Save it in the workspace and post the summary to this conversation. Organize only what I sent you; never send anything to anyone else.

The bot registers the schedule itself and delivers weekly. Start with read-only work, review a few outputs, then widen what it may write and execute — see [Use Cases](./use-cases.md) for ready-made setups.

## FAQ

**Does it keep running when my computer is off?**

Yes. The bot runs in a cloud workspace; schedules fire and channel messages get answered either way.

**How many bots can I create?**

That depends on your plan. Each bot is independent — its own workspace, memory, and permissions — and deleting one does not affect the others.

**Where do my files live?**

In that bot's isolated container workspace (`/data`), kept across sessions and browsable under [Files](./files.md).

**Can I use my own models?**

Yes. Add your own API keys under Providers (see [BYOK](./quick-start.md#bring-your-own-key-byok)); for coding agents, sign in with your own Claude Code or Codex subscription on the bot's **Agent** tab.

**Where do plan and billing questions go?**

The [Help Center](https://memoh.ai/help): plans, credits, account questions, and a direct line to the Memoh team.

## Next steps

- [Quick Start](./quick-start.md) — from installing the app to a connected chat platform, in about fifteen minutes.
- [Use Cases](./use-cases.md) — ready-to-follow scenarios that combine features to solve real problems.
- [Bot](./working-with-bots.md) — configure a bot tab by tab.
- [Channels](../integrations/channels/index.md) — per-platform setup guides.
- [Help Center](https://memoh.ai/help) — plans, billing, and account questions.
