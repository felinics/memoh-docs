# Workspace

Every bot has its own **workspace** — a computer that belongs to it: a real filesystem, a terminal that executes commands, a preinstalled toolchain, and optionally a visible desktop. The files you hand the bot, the results it produces, and the tools it installs all live here, preserved across sessions.

## What it can do

- Store and edit files — browse them any time on the **Files** tab
- Run scripts and install packages: **Node.js** and **Python** come preinstalled (`pip` and `uv` on PATH), no interpreter setup needed
- Keep background tasks running
- Preserve state across sessions — yesterday's unfinished work continues today
- Optionally run a visible desktop with a headed browser

## Where it lives in the client

Several tabs on the bot detail page face the workspace:

| Tab | Content |
|-----|---------|
| **Workspace** | Workspace state and lifecycle: create, start, stop; runtime info, snapshots, import/export |
| **Files** | Browse and edit the workspace filesystem |
| **Terminal** | Open an interactive shell inside the workspace |
| **Desktop** | The visible desktop: live view, take over / hand back keyboard and mouse |
| **Network** | Workspace network status |
| **Apps** | Apps installed into this workspace — skills, dependencies, connectors (see [Supermarket](./supermarket.md)) |

## Lifecycle

Managed from the **Workspace** tab:

- **Create**: builds a new workspace from the template, with progress shown.
- **Start / Stop**: stop it to save resources when idle — nothing is lost.
- **Delete**: removes the running instance.

Most capabilities — terminal, desktop, installing and updating Apps — need the workspace **running**. The tab also shows runtime info such as state, image, and background task count.

## The visible desktop

The **Desktop** tab enables and inspects the graphical desktop. Once on, the bot can drive a **headed browser** inside the workspace, and the desktop pane shows the same screen it operates:

- Watch every step live
- **Take over** the keyboard and mouse any time — type a password, pass a CAPTCHA — then **hand control back**
- Browser sessions persist in the workspace, so the next task is already signed in

For the tool-level distinction, see [Browser / Computer Use](./browser-computer-use.md).

## Snapshots

**Create Snapshot** records the current workspace state — a rollback point before a big change; **Restore** reverts to a chosen snapshot, and unwanted snapshots can be deleted.

## Import and export

- **Export Data**: package the workspace files for download.
- **Import Data**: upload an archive and unpack it into the workspace.
- **Reset**: return the data directory to a clean state — for when the filesystem is wrecked or you want a fresh start.

::: tip Self-hosting
Which runtime the workspace runs on (containerd, Docker, Apple container, a trusted local directory) and how host devices such as GPUs are passed through are server-side deployment concerns — see [Workspace Backends](../self-hosted/workspace-backends.md). Memoh Cloud users never need to touch these.
:::
