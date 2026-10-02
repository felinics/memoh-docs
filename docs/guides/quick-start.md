# Quick Start

One complete tutorial from zero: install the app, sign in, create your first bot, give it real work, and reach it from a chat platform. It takes about fifteen minutes.

## Prerequisites

- A computer running macOS, Windows, or Linux.
- A [Memoh Cloud](https://app.memoh.net) account — you can create one during sign-in.

That is all. Memoh Cloud comes with hosted models (DeepSeek, Kimi, GPT, Claude, and more), so you do not need an API key to start.

## Step 1: Install Memoh

Download the app for your platform from the [download page](https://memoh.ai/desktop) — macOS (DMG), Windows (installer), or Linux (AppImage/deb/rpm) — and open it.

## Step 2: Sign in

On the connect screen, choose **Memoh Cloud** and sign in, or create an account.

## Step 3: Create your first bot

Go to **Bots → New Bot**, give it a name and display name, then select its chat model on the **General** tab. Hosted models are ready to use.

Now write its instructions. This step matters most, and it is where people most often go wrong — usually by being too vague. Describe one job clearly:

> **Name:** Digest
>
> **Role:** Weekly reading digest
>
> **Instructions:** Collect the articles I send you during the week. Every Friday, produce a digest grouped by theme: one sentence per article with its original link, followed by a "worth re-reading" section. Keep original links unchanged. Never publish anything publicly.

A bot with one focused job accumulates far more useful context than a bot that does everything. When work genuinely splits into separate roles, create another bot instead of overloading this one — each bot has its own workspace, memory, and configuration. For a walkthrough of every tab, see [Bot](./working-with-bots.md).

Click **Chat** and say hello. A reply confirms the model path works.

## Bring Your Own Key (BYOK)

Hosted models aside, you can bring your own models at any time:

1. Open **Providers** in the sidebar and click **Add Provider**.
2. Pick a template (OpenAI, Anthropic, Gemini, DeepSeek, Zhipu, OpenRouter, Ollama, and others) and paste your API key; for OpenAI-compatible endpoints, add the base URL as well.
3. Open the provider and **sync** its model list, or add at least one chat model manually, then switch to it on the bot's **General** tab.

BYOK usage is billed by your provider at its own rates. The same idea applies to coding agents: on the bot's **Agent** tab, sign in to Claude Code or Codex with your own subscription or API key. Provider-specific fields and notes are in [LLM Providers](../integrations/providers/llm.md).

## Step 4: Give it a task

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

## Step 5: Let it use the workspace and browser

The workspace is where a bot does its work. It has a Linux filesystem, a terminal, and a preinstalled toolchain (Python, Node.js, uv, npm), so it can run data cleanups, scripts, and builds directly:

```text
Remove every row with an empty email column from the CSV I just uploaded.
Give me the cleaned file and tell me how many rows you dropped.
```

When a task needs a real browser — a site that breaks in headless mode, or a page behind a login — enable the visible desktop on the bot's **Desktop** tab. Once started, the bot drives a headed Chrome and you can watch it work in the desktop panel.

When it hits a login wall, take over the screen yourself: type the password, passkey, or one-time code, then hand control back. The browser session stays in that workspace, so later tasks remain signed in.

::: warning Grant access deliberately
Workspace access is tiered: chat only, read files, write files, execute commands, and manage the container. Grant the level the job needs and no more. See [Access Control](./access.md).
:::

For details, see [Workspace](./container.md) and [Browser / Computer Use](./browser-computer-use.md).

## Step 6: Reach it from a chat platform

A bot is most useful where you already talk.

1. Open the bot's **Platforms** tab and click **Add**.
2. Choose a platform — Telegram, Slack, Discord, Feishu, DingTalk, WeCom, WeChat, QQ, or LINE — and paste that platform's credentials.
3. Message it from that platform. The first message creates a session; send `/help` to see the available [slash commands](./slash-commands.md).

From then on you can hand off a task from your phone and collect the result in the same conversation. For per-platform setup, see [Channels](../integrations/channels/index.md).

## Step 7: Review, then make it stick

When something is not right, say so. Phrase corrections as durable rules rather than one-off fixes:

```text
For all future digests, use this format: grouped by theme, one line per article,
links inline, and a "worth re-reading" section at the end.
```

Once a routine is stable, stop retyping it:

- Save it as a [Skill](./skills.md) so one sentence invokes the whole routine.
- Turn it into a [Scheduled Task](./schedule.md) that runs on cron with no chat at all.
- Use [Memory](./memory.md) to carry your preferences and project context into every future session.

## What's next

| Goal | Read |
|------|------|
| Configure a bot tab by tab | [Bot](./working-with-bots.md) |
| Understand chat, discuss, and routing | [Sessions](./sessions.md) |
| Run scheduled or recurring tasks | [Schedule](./schedule.md) |
| Connect external tools and data | [MCP](./mcp.md), [Connectors](./connectors.md) |
| Install prebuilt capabilities | [Supermarket](./supermarket.md) |
| Hook into lifecycle events | [Hooks](./hooks.md) |
| Control who can talk to the bot | [Access Control](./access.md) |
| See what others run | [Use Cases](./use-cases.md) |

::: tip Need help?
Questions about plans, credits, or your account — or anything this site doesn't cover — are answered in the [Help Center](https://memoh.ai/help), where you can also reach the Memoh team.
:::
