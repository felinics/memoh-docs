# About Memoh

Memoh v0.13 is the open-source multi-agent platform. It lets you run multiple AI agents on one machine, with each agent getting its own workspace, browser, network, tools, and long-term memory.

Agents can talk through Telegram, Discord, Lark, WeChat, Web UI, Email, and other channels. They can remember context, operate a browser or desktop, call MCP tools, install skills and connectors, run scheduled tasks, and enforce per-bot access rules.

The hosted Memoh SaaS service is coming soon. Join the [SaaS waitlist](https://memoh.ai/waitlist) if you want a managed option instead of operating your own deployment.

## Distribution Modes

### Desktop

Desktop is the native client for Memoh Cloud or a self-hosted server. It wraps the Web UI in a native window with a system tray and shortcuts, and can register the computer it runs on as a Computer that bots may use. It does not run a local server.

### Server Deploy

Server Deploy is for always-on shared usage. Use it when Memoh should serve multiple users, keep channels online while your computer is offline, or run as a self-hosted service. The Docker Compose stack includes the backend, Web UI, database, memory services, and workspace runtime.

## What v0.13 Emphasizes

### Agent Workspaces

Each bot can use an isolated container workspace with files, commands, MCP hosting, network access, a headed browser, and a graphical desktop. Local and desktop setups can also use trusted local workspaces when host-level access is intentional.

### Web Product

The Web UI now covers more of the daily product surface: bot setup, sessions, providers, channels, workspace files, terminal and display panes, Supermarket, hooks, schedules, access control, and user preferences. v0.13 also includes English, Simplified Chinese, and Japanese UI language support.

### Hooks, Schedules, And Automation

Hooks let bots run small automation rules around supported events, while Schedule keeps recurring work moving without an active chat. Skills and connectors from the Supermarket extend what a bot can do without custom code.

### Access Control

Access control is split between channel-side chat permissions and workspace-side user permissions. Bot owners can allow or block channel members, grant registered users workspace roles, and keep advanced ACL rules for cases that need more precise matching.

## Where To Start

- **[Bot Setup](./guides/bot.md)** - create and configure a bot.
- **[Providers And Models](./integrations/providers/llm.md)** - configure model access.
- **[Channels](./integrations/channels/index.md)** - choose where bots are reachable.
- **[Skills](./guides/skills.md)** and **[Supermarket](./guides/supermarket.md)** - install reusable capabilities.
- **[Scheduled Tasks](./guides/schedule.md)** and **[Access Control](./guides/access.md)** - operate recurring work and permissions.
- **[Self-hosted](./self-hosted/index.md)** - deploy and maintain your own Memoh instance.
