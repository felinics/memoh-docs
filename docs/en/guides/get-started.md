# Get Started

Memoh gives you bots that can actually do things. Every bot has its own workspace — a real filesystem, an executable terminal, and an optional visible desktop with a browser — plus long-term memory and the chat channels you already use.

This tutorial takes you from an empty account to a bot that completes real work. It takes about fifteen minutes.

<scalar-callout type="tip" title="Looking for installation?">
This page assumes you can already open a Memoh instance. If you need to deploy one yourself, read [Quick Start](./quick-start.md) first.
</scalar-callout>

## Before You Begin

You need:

- Access to a Memoh instance and an account that can create bots.
- An API key for at least one model provider (OpenAI, Anthropic, Gemini, DeepSeek, Zhipu, OpenRouter, Ollama, and others). Skip this if an administrator has already configured providers.

## 1. Sign In

Open the Memoh Web UI and sign in.

If this is a fresh instance, change the initial password immediately under **Settings → Account**.

Interface language, theme, and similar options can be adjusted at any time in [Preferences](./preferences.md). They do not affect the steps below.

## 2. Add A Model Provider

A bot cannot think without a model. Skip this step if your administrator has already configured one.

1. Open **Providers** in the sidebar and click **Add Provider**.
2. Pick a template, paste your API key, and save.
3. Open the provider and **sync** its model list, or add at least one chat model manually.

For client types, base URLs, and provider-specific notes, see [LLM Providers](../integrations/providers/llm.md).

## 3. Create Your First Bot

Go to **Bots → New Bot**, give it a name and display name, then select your chat model on the **General** tab.

Now write its instructions. This step matters most, and it is where people most often go wrong — usually by being too vague. Describe one job clearly:

> **Name:** Digest
>
> **Role:** Weekly reading digest
>
> **Instructions:** Collect the articles I send you during the week. Every Friday, produce a digest grouped by theme: one sentence per article with its original link, followed by a "worth re-reading" section. Keep original links unchanged. Never publish anything publicly.

A bot with one focused job accumulates far more useful context than a bot that does everything. When work genuinely splits into separate roles, create another bot instead of overloading this one — each bot has its own workspace, memory, and configuration. For a walkthrough of every tab, see [Bot](./bot.md).

Click **Chat** and say hello. A reply confirms the model path works.

## 4. Give It A Task

A good first request answers five questions:

| Element | The question it answers |
|---------|------------------------|
| **Outcome** | What should exist when this is done? |
| **Source** | Which files, sites, or conversations are relevant? |
| **Constraints** | What must it avoid, and what needs your approval? |
| **Format** | How should the answer be delivered? |
| **Checkpoint** | When should it stop and confirm with you? |

For a result in minutes with no external logins, upload a document and try:

```text
Summarize this document into five key points. In a separate section, list every
date, decision, and open question, noting which page or section each came from.
Do not modify the original file.
```

The bot reads the file inside its own workspace and writes the result back to the conversation. Everything it produces stays in the workspace, where you can browse and edit it under [Files](./files.md).

## 5. Let It Use The Workspace And Browser

The workspace is where a bot stops being a chatbot. It has a Linux filesystem, a terminal, and a preinstalled toolchain (Python, Node.js, uv, npm), so it can actually run the work:

```text
Remove every row with an empty email column from the CSV I just uploaded.
Give me the cleaned file and tell me how many rows you dropped.
```

When a task needs a real browser — a site that breaks in headless mode, or a page behind a login — enable the visible desktop on the bot's **Desktop** tab. Once started, the bot drives a headed Chrome and you can watch it work in the display panel.

When it hits a login wall, take over the screen yourself: type the password, passkey, or one-time code, then hand control back. The browser session stays in that workspace, so later tasks remain signed in.

<scalar-callout type="warning" title="Grant access deliberately">
Workspace access is tiered: chat only, read files, write files, execute commands, and manage the container. Grant the level the job needs and no more. See [Access Control](./access.md).
</scalar-callout>

For details, see [Workspace](./container.md) and [Browser / Computer Use](./browser-computer-use.md).

## 6. Connect A Chat Channel

A bot is most useful where you already talk.

1. Open the bot's **Platforms** tab and click **Add**.
2. Choose a platform — Telegram, Slack, Discord, Feishu, DingTalk, WeCom, QQ, LINE, Matrix, or Misskey — and paste that platform's credentials.
3. Message it from that platform. The first message creates a session; send `/help` to see the available [slash commands](./slash-commands.md).

From then on you can hand off a task from your phone and collect the result in the same conversation. For per-platform setup, see [Channels](../integrations/channels/index.md).

## 7. Review, Then Make It Stick

When something is not right, say so. Phrase corrections as durable rules rather than one-off fixes:

```text
For all future digests, use this format: grouped by theme, one line per article,
links inline, and a "worth re-reading" section at the end.
```

Once a routine is stable, stop retyping it:

- Save it as a [Skill](./skills.md) so one sentence invokes the whole routine.
- Turn it into a [Scheduled Task](./schedule.md) that runs on cron with no chat at all.
- Use [Memory](./memory.md) to carry your preferences and project context into every future session.

## Next Steps

| Goal | Read |
|------|------|
| Configure a bot tab by tab | [Bot](./bot.md) |
| Understand chat, discuss, and routing | [Sessions](./sessions.md) |
| Connect external tools and data | [MCP](./mcp.md), [Connectors](./connectors.md) |
| Install prebuilt capabilities | [Supermarket](./supermarket.md) |
| Attach your own machine as a work location | [Computers](./computers.md) |
| Hook into lifecycle events | [Hooks](./hooks.md) |
| Control who can talk to a bot | [Access Control](./access.md) |