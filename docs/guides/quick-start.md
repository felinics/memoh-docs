# Quick Start

Get a working Memoh in about ten minutes: deploy the server, sign in, add a model provider, create your first bot, and connect it to a chat channel.

::: tip Prefer not to self-host?
[Memoh Cloud](https://memoh.ai) runs the same product as a hosted service. Skip to [Step 3](#step-3-add-a-model-provider) once you have signed in.
:::

## Prerequisites

- A Linux server or workstation with **Docker** and **Docker Compose** installed.
- An API key for at least one LLM provider (OpenAI, Anthropic, DeepSeek, Zhipu, ...) or a local Ollama instance.
- Ports **8080** (API) and **8082** (Web UI) reachable from your browser.

## Step 1: Deploy the server

The one-line installer pulls the images, generates a `config.toml`, and starts everything with Docker Compose:

```bash
curl -fsSL https://memoh.sh | sh
```

Users in mainland China can enable the mirror:

```bash
curl -fsSL https://memoh.sh | USE_CN_MIRROR=true sh
```

::: warning Do not run the whole installer with `sudo`
The installer will call `sudo docker` on its own when your user is not in the `docker` group.
:::

Prefer to do it by hand? Clone the repository and run:

```bash
git clone https://github.com/felinics/Memoh.git
cd Memoh
cp conf/app.docker.toml config.toml
# edit config.toml (admin password, JWT secret, ...)
docker compose up -d
```

When it finishes you should see:

```text
🌐 Web UI:      http://localhost:8082
🔌 API:         http://localhost:8080
🔑 Admin login: admin / <your password>
```

Read [Server Deploy](/self-hosted/docker) for production hardening, reverse proxies, and upgrades.

## Step 2: Sign in

Open `http://<your-server>:8082` and sign in with the admin account you chose during install (the default in `conf/app.docker.toml` is `admin` / `admin123`). Change the password right away under **Settings → Account**.

## Step 3: Add a model provider

1. Go to **Providers** in the sidebar and click **Add Provider**.
2. Pick a template (OpenAI, Anthropic, Gemini, DeepSeek, Zhipu, OpenRouter, Ollama, ...) and paste your API key.
3. Open the provider and **sync** or add at least one chat model.

Details and client types are in [LLM Providers](/integrations/providers/llm).

## Step 4: Create your first bot

1. Go to **Bots → New Bot**, give it a name and a display name.
2. In the bot's **General** tab choose the chat model you just added.
3. Click the bot's **Chat** button and say hello. If you get a reply, the pipeline works.

Each bot has its own workspace, memory, and settings; see [Bot](/guides/bot) for every tab.

## Step 5: Connect a channel

1. Open the bot's **Channels** tab and click **Add**.
2. Pick a platform (Telegram, Discord, Slack, Feishu, DingTalk, WeCom, QQ, LINE, Matrix, Misskey, ...) and paste the platform credentials.
3. Message the bot from that platform. The first message creates a session; use `/help` to see the available slash commands.

Per-platform setup guides live under [Channels](/integrations/channels/).

## What's next

| Goal | Read |
|------|------|
| Let the bot remember users across sessions | [Memory](/guides/memory) |
| Run scheduled or recurring tasks | [Schedule](/guides/schedule) |
| Give the bot files, shell access, and a browser | [Workspace](/guides/container), [Computers](/guides/computers) |
| Add tools via MCP servers | [MCP](/guides/mcp) |
| Teach the bot reusable procedures | [Skills](/guides/skills), [Supermarket](/guides/supermarket) |
| Control who can talk to the bot | [Access Control](/guides/access) |
| Run everything on a Mac with the desktop app | [Desktop](/self-hosted/desktop) |