# Desktop

Memoh Desktop is the native client for Memoh Cloud or a self-hosted Memoh server. It packages the same Web UI into an Electron shell with native windows, tray, menus, and keyboard integration, and it can register the computer it runs on as a **Computer** that your bots can use.

Desktop does **not** run its own local server or database. You always connect it to a Memoh server: either [Memoh Cloud](https://memoh.ai) or your own [Server Deploy](./docker.md).

## When to use Desktop

Choose Desktop when you want:

- a native app window and system tray instead of a browser tab
- native menus and keyboard shortcuts for the daily Memoh workflow
- to let server-side bots use this computer's files, shell, and browser without running a separate runtime process

Use the Web UI directly if you only need occasional access from a browser.

## Install

1. Download the installer for your platform (macOS DMG, Windows NSIS, or Linux AppImage/deb/rpm) from the [Memoh Desktop download page](https://memoh.ai/desktop).
2. Open Memoh.
3. On the connect screen, enter your server address (or pick Memoh Cloud).
4. Sign in with your Memoh account.

## Connecting to a server

On the connect screen, enter the server address and connect:

- A bare domain such as `memoh.example.com` is assumed to be `https://` (only localhost addresses default to `http://`).
- The `/api` path suffix is appended automatically when missing, so entering just the domain is enough.
- Desktop probes the server's `/ping` endpoint (5-second timeout) before proceeding, then takes you to sign-in.

Switching to a different server clears the local sign-in state, so you will authenticate against the new server.

## Sharing this computer with bots

Desktop can register the machine it runs on as a **Computer** that server-side bots can work on, without running a separate runtime process. Enable **This computer**, give it a name, and Desktop keeps the connection alive in the background using the embedded Memoh runtime SDK. Credentials are stored with the OS secure storage.

See [Computers](../guides/computers.md) for the permission model, per-bot setup, and what bots can do on a connected computer.

## What Desktop manages

- the application window, tray icon, reopen and quit behavior
- native menus wired to the same command registry as the Web UI
- the connection to the selected server and its cached sign-in state
- the optional Remote Runtime connection for **This computer**

Everything else (bots, sessions, memory, workspaces, channels) lives on the server you connected to. Workspace runtimes are configured server-side; see [Workspace Backends](./workspace-backends.md).