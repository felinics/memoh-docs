# Server Deploy

Server Deploy is the self-hosted Memoh stack for always-on, multi-user or multi-tenant usage. Use it when Memoh should run on a server, VM, or NAS, or when bots need to keep serving external channels while your desktop is offline.

This page documents the Docker Compose server deployment. For the native local client, see [Desktop Installation](/self-hosted/desktop).

The default Compose stack includes PostgreSQL, a pgvector database for memory embeddings, a one-shot migration job, the main server with an explicit workspace backend and in-process AI agent, the channel worker, and the web UI. PostgreSQL is the only supported database.

The official Compose stack uses the `containerd` workspace backend. The server image starts an embedded containerd and mounts the runtime files needed by bot workspaces. For Docker Engine and Apple backends, see [Workspace backends](/self-hosted/workspace-backends.md).

## Service Architecture

The Docker Compose stack consists of multiple services. Some are always started, others are optional and enabled via `--profile`:

| Service | Profile | Description |
|---------|---------|-------------|
| **server** | *(core)* | Main Memoh server with the configured container runtime backend and in-process AI agent |
| **channel** | *(core)* | Channel worker (`memoh-channel`) that owns platform connections and webhooks; talks to the server over internal RPC |
| **web** | *(core)* | Web UI (Vue 3) |
| **postgres** | *(core)* | PostgreSQL database (system of record) |
| **pgvector** | *(core)* | PostgreSQL with `pgvector` used for optional memory embeddings; see [Built-in Memory](/integrations/providers/memory/builtin.md) |
| **migrate** | *(core, one-shot)* | Runs `memoh-server migrate up` before the server starts |
| **webhook-tunnel** | `webhook-tunnel` | Optional `cloudflared` quick tunnel that exposes the channel worker's webhook listener to the internet |
| **connect-it** | `connectors` | Co-hosted [Connect-It](https://github.com/memohai/connect-it) service backing bot [connectors](/guides/connectors.md) (see below) |


## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose v2](https://docs.docker.com/compose/install/)
- Git

## One-Click Server Deploy (Recommended)

Run the official install script (requires Docker and Docker Compose):

```bash
curl -fsSL https://memoh.sh | sh
```

Run the installer as your normal user. Do not wrap the whole script in `sudo`;
the script will use `sudo docker` internally only if Docker requires it. If you
intentionally need to run the whole installer as root, set
`MEMOH_ALLOW_ROOT_INSTALL=true` explicitly.

The script will:

1. Check for Docker and Docker Compose
2. Detect whether this is a first-time install, an upgrade, or a reinstall
3. Prompt for configuration (workspace, data directory, admin credentials, JWT secret, Postgres password, and workspace backend notice)
4. Reuse the existing `config.toml` automatically during upgrades so database credentials stay aligned with the persisted PostgreSQL volume
5. Offer a clean reinstall mode that removes Memoh Docker containers, volumes, and network before starting again
6. Fetch the latest release tag from GitHub and clone the repository
7. Generate `config.toml` from the Docker template with your settings when needed
8. Refuse to upgrade legacy SQLite installs (PostgreSQL is the only supported database; choose a clean reinstall instead)
9. Pin Memoh Docker image versions to the release (for example, `v0.13.0` uses image tag `0.13.0`)
10. Provision co-hosted Connect-It on fresh installs — generate its credentials once, persist them in `.env`, and add the `connectors` profile (see [Connect-It Connectors](#connect-it-connectors))
11. Start `docker-compose.yml` (core services), adding the `connectors` and `webhook-tunnel` profiles when enabled
12. Print recent database, migration, and server logs automatically if startup fails

**Silent install** (use all defaults, no prompts):

```bash
curl -fsSL https://memoh.sh | sh -s -- -y
```

Defaults when running silently:

- Workspace: `~/memoh`
- Data directory: `~/memoh/data`
- Admin: `admin` / `admin123`
- JWT secret: auto-generated
- Database: PostgreSQL (with the `pgvector` sidecar)
- Postgres password: `memoh123`
- Webhook tunnel: disabled unless `MEMOH_WEBHOOK_TUNNEL_MODE=external`

If the script detects an existing Memoh installation in silent mode, it defaults to **upgrade** and reuses the previous `config.toml`. If Docker state exists but no reusable `config.toml` can be found, the script exits and asks you to choose an explicit reinstall.

**Force a clean reinstall** (removes Memoh Docker data before starting again):

```bash
curl -fsSL https://memoh.sh | MEMOH_INSTALL_MODE=reinstall sh
```

You can also pass the install mode as an argument:

```bash
curl -fsSL https://memoh.sh | sh -s -- --install-mode reinstall
```

**Install a specific version:**

```bash
curl -fsSL https://memoh.sh | sh -s -- --version v0.13.0
```

Or using the environment variable:

```bash
curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 sh
```

**Use China mainland mirror** (for slow image pulls):

```bash
curl -fsSL https://memoh.sh | USE_CN_MIRROR=true sh
```

> Environment variables can be combined, e.g. `curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 USE_CN_MIRROR=true sh`

**Expose channel webhooks through a Cloudflare quick tunnel** (for platforms that need a public callback URL):

```bash
curl -fsSL https://memoh.sh | MEMOH_WEBHOOK_TUNNEL_MODE=external sh
```

### Installer Options

The install script accepts these flags after `sh -s --`:

| Option | Description |
|--------|-------------|
| `-y`, `--yes` | Run silently with defaults. The script also switches to silent mode automatically when no TTY is available. |
| `--version <tag>`, `--version=<tag>` | Install a specific Git tag, such as `v0.13.0`. |
| `--install-mode <mode>`, `--install-mode=<mode>` | Choose `auto`, `fresh`, `upgrade`, or `reinstall`. |
| `--database-driver <driver>`, `--database-driver=<driver>` | Accepted for compatibility; `postgres` is the only supported value. |
| `--container-backend <backend>`, `--workspace-backend <backend>` | Choose the workspace backend value written to config. One-click Docker Compose installs support `containerd` only; use manual deployment for `docker` or `apple`. |

## Manual Install

```bash
git clone https://github.com/felinics/Memoh.git
cd Memoh
cp conf/app.docker.toml config.toml
```

Edit `config.toml` — at minimum change:

- `admin.password` — Admin password
- `auth.jwt_secret` — Generate with `openssl rand -base64 32`
- `postgres.password` — Database password (also set `POSTGRES_PASSWORD` env var to match)

Then start the core services:

```bash
POSTGRES_PASSWORD=your-db-password docker compose up -d
```

Add `--profile connectors` for co-hosted Connect-It and `--profile webhook-tunnel` for the Cloudflare webhook sidecar as needed.

> On macOS or if your user is in the `docker` group, `sudo` is not required.

> **Important**: `docker-compose.yml` mounts `./config.toml` by default. You must create this file before starting — running without it will fail.

To enable [connectors](/guides/connectors.md) in a manual deployment, generate the Connect-It credentials yourself and add the `connectors` profile:

```bash
MEMOH_CONNECT_IT_BASE_URL="http://connect-it:8421" \
MEMOH_CONNECT_IT_API_TOKEN="cit_$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_SECRET_KEY="1:$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_COOKIE_SECRET="$(openssl rand -base64 32)" \
MEMOH_CONNECT_IT_ADMIN_PASSWORD="choose-a-password" \
POSTGRES_PASSWORD=your-db-password \
docker compose --profile connectors up -d
```

Keep the same values across restarts (for example in an `.env` file) — the API token is what Memoh presents to Connect-It, and the secret key encrypts stored credentials. The install script does all of this automatically.

### China Mainland Mirror

For users in mainland China who cannot access Docker Hub directly, uncomment the `registry` line in `config.toml`:

```toml
[container]
registry = "memoh.cn"
image_pull_policy = "if_not_present" # if_not_present, always, or never
```

And add the China mirror compose overlay:

```bash
docker compose -f docker-compose.yml -f docker/docker-compose.cn.yml up -d
```

The install script handles this automatically when you set `USE_CN_MIRROR=true`.

## Access Points

After startup:

| Service         | URL                    |
|-----------------|------------------------|
| Web UI          | http://localhost:8082  |
| API             | http://localhost:8080  |
| Connect-It admin console *(with the `connectors` profile)* | http://localhost:8421 |

Default login: `admin` / `admin123` (change this in `config.toml`). The Connect-It admin login is `admin` plus the password generated by the installer (printed at the end of the install, stored in `.env`).

First startup may take 1–2 minutes while images are pulled and services initialize.

## Configuration Reference

The `config.toml` file controls all server behavior. Here is a summary of the available sections:

| Section | Description |
|---------|-------------|
| `[log]` | Logging level and format (`info`, `debug`; `text`, `json`) |
| `[server]` | HTTP listen address (default `:8080`) |
| `[admin]` | Admin account credentials (username, password, email) |
| `[auth]` | JWT secret and token expiration |
| `timezone` | Server timezone (default `UTC`) |
| `[database]` | Database driver; `postgres` is the only supported value |
| `[container]` | Workspace backend selection plus common workspace image, pull policy, data path, runtime path, and CNI settings |
| `[containerd]` | Containerd socket path and namespace |
| `[docker]` | Docker Engine host override; empty uses Docker environment/default socket |
| `[apple]` | socktainer socket and binary overrides for the Apple backend |
| `[postgres]` | PostgreSQL connection (host, port, user, password, database, sslmode) |
| `[pgvector]` | Optional pgvector database used for memory embeddings (`enabled`, host, port, user, password, database, sslmode) |
| `[internal_rpc]` | Server/channel-worker RPC targets and shared secret for the split deployment |
| `[webhook_tunnel]` | Webhook tunnel mode (`disabled` or `external`) and `public_base_url` |
| `[registry]` | Provider definitions directory |
| `[connect_it]` | Connect-It endpoint for [connectors](/guides/connectors.md) (`base_url`, `api_token`); both empty disables the feature. The Compose environment overrides these via `MEMOH_CONNECT_IT_BASE_URL` / `MEMOH_CONNECT_IT_API_TOKEN`. |
| `[web]` | Web frontend host and port |
| `[agent]` | Tool output truncation limits: `tool_output_max_bytes` (default 65536), `tool_output_max_lines` (default 2000), `system_files_max_bytes` (default 32768). Oversized tool output keeps head and tail instead of being cut off blindly. |
| `[session_runtime]` | Session-state backend for multi-instance deployments; see [Multi-Instance Deployments](#multi-instance-deployments) |

## Multi-Instance Deployments

A single-instance deployment needs none of this — session state lives in process memory by default, with a durable ledger in the database.

To run more than one Memoh server instance behind a load balancer, agent-turn session state must move to a shared backend. Configure the `[session_runtime]` block:

```toml
[session_runtime]
backend = "redis"   # "memory" (default, single instance only) or "redis"
cluster = true       # declare multi-instance mode; requires backend = "redis"
# state_ttl = "24h"
# owner_lease_ttl = "30s"

[session_runtime.redis]
url = "redis://redis:6379/0"
# key_prefix = "memoh:session_runtime:"
```

Notes:

- `redis` speaks the Redis protocol; Valkey works too. The bundled Docker Compose stack does not include a Redis/Valkey service — add your own.
- Setting `cluster = true` with the `memory` backend fails at startup by design.
- With the Redis backend, the server checks Redis health at startup and refuses to start if it is unreachable.

## Common Commands

> Prefix with `sudo` on Linux if your user is not in the `docker` group.

```bash
docker compose up -d           # Start
docker compose down            # Stop
docker compose down -v         # Stop and remove Memoh Docker data
docker compose logs -f         # View logs
docker compose ps              # Status
docker compose pull && docker compose up -d  # Update to latest images
```

## Environment Variables

| Variable           | Default            | Description                                  |
|--------------------|--------------------|----------------------------------------------|
| `POSTGRES_PASSWORD`| `memoh123`         | PostgreSQL password (must match `postgres.password` in `config.toml`) |
| `MEMOH_CONFIG`     | `./config.toml`    | Path to the configuration file               |
| `MEMOH_DATA_DIR`   | `~/memoh/data`     | Installer data directory value written to `.env`; currently reserved for future bind-mount support. |
| `MEMOH_VERSION`    | *(latest release)* | Git tag to install (e.g. `v0.13.0`). Also pins Memoh Docker image versions without the leading `v` (for example, `0.13.0`). |
| `MEMOH_INSTALL_MODE` | `auto`           | Install mode: `auto`, `fresh`, `upgrade`, or `reinstall` |
| `MEMOH_DATABASE_DRIVER` | `postgres`    | Accepted for compatibility; `postgres` is the only supported value |
| `MEMOH_CONTAINER_BACKEND` | `containerd` | Workspace backend. One-click Docker Compose installs support `containerd`; use manual deployment for `docker` or `apple`. |
| `MEMOH_ALLOW_ROOT_INSTALL` | `false` | Allow running the installer shell itself as root. Prefer leaving this unset and running the installer as a normal user. |
| `MEMOH_WEBHOOK_TUNNEL_MODE` | `disabled` | `external` adds the `webhook-tunnel` profile (Cloudflare `cloudflared` sidecar) so channel webhooks get a public URL. |
| `USE_CN_MIRROR`    | `false`            | Set to `true` to use China mainland image mirrors |
| `MEMOH_CONNECT_IT_MODE` | `embedded` on fresh installs; unchanged on upgrades | `embedded` runs the co-hosted Connect-It (`connectors` profile); `disabled` turns connectors off. |
| `MEMOH_CONNECT_IT_PUBLIC_BASE_URL` | `http://localhost:8421` | Public URL for connector OAuth callbacks and the admin console. Set it when Memoh is used from other machines. |
| `MEMOH_CONNECT_IT_PORT` | `8421` | Host port for the Connect-It container. |
| `MEMOH_CONNECT_IT_IMAGE` | *(pinned release)* | Connect-It image override. |

The remaining `MEMOH_CONNECT_IT_*` values (admin password, secret key, cookie secret, API token) are credentials the installer generates once and persists in `.env`; there is normally no reason to set them by hand.
