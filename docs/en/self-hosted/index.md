# Self-hosted Overview

Memoh runs as a server stack; the Web UI and the Desktop app are clients for it. Pick the server option first, then decide how you want to access it.

| Use case | Choose | Why |
|----------|--------|-----|
| Try Memoh with nothing to install | [Memoh Cloud](https://memoh.ai) | Hosted service, same product, no server to run. |
| Shared server, remote access, public/private channels, production uptime, multi-user or multi-tenant usage | [Server Deploy](./docker.md) | The Docker Compose stack keeps the backend, Web UI, PostgreSQL (with pgvector for memory), and workspace runtime online. |
| A native app on your own computer, optionally shared with bots as a Computer | [Desktop](./desktop.md) | Native client that connects to Cloud or your server; it does not run a local server. |

## Server Deploy

Use Server Deploy when Memoh should be reachable by multiple users, run continuously, or connect to external channels such as Telegram, Discord, Feishu, WeChat, WeChat Official Account, Email, and more.

Start with the [Quick Start](../guides/quick-start.md) for the fastest route, then read [Server Deploy](./docker.md) for the full reference.

## Desktop

Use Desktop when you want Memoh to behave like a native app with a tray icon and shortcuts, or when you want server-side bots to use your computer's files, shell, and browser. Desktop always connects to a server (Cloud or self-hosted); see [Desktop](./desktop.md).

## Related

- [Workspace Backends](./workspace-backends.md) explains Docker, containerd, Apple, and local workspace runtime choices.
- [Computers](../guides/computers.md) covers sharing your own machines with bots.