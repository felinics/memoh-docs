# Computers (Remote Runtimes)

Memoh can connect your own computers to a deployment so bots can work on them: read and write files, and run commands. The Web UI calls these **Computers**; a bot picks between them as **Work locations**.

The agent itself does not move. Model calls, chat, sessions, and memory all stay on the Memoh server — a connected computer only provides its filesystem and command execution, and appears to the agent as another workspace.

The connection is outbound from the computer to the server over WebSocket. The computer does not need a public IP or any open ports and can sit behind NAT.

<scalar-callout type="danger" title="Understand what you are sharing">
A connected computer exposes the files of the OS user who runs the runtime and executes commands **as that user**. There is no directory sandbox: any file that user can touch, a bot with access can touch. Only bots you explicitly add the computer to can use it, and write/execute actions ask for approval by default — but treat connecting a computer as granting shell access.
</scalar-callout>

---

## Connecting A Computer

### With The Command Line

1. Open the **Computers** page in the Web UI settings.
2. Create a runtime key. Keys look like `mrk_...`; any signed-in user can create keys, and each computer belongs to the user who created its key.
3. Run the generated command on the computer you want to connect (Node.js 20+):

```bash
npx --yes @memohai/runtime --server https://your-memoh-server/api --key mrk_xxxx
```

The connection requires `wss://` (TLS). Plain `http` is only accepted for localhost together with `--insecure-localhost`, which the UI adds automatically when applicable. The client reconnects automatically with backoff if the connection drops.

The server URL and key can also come from the `MEMOH_RUNTIME_SERVER` and `MEMOH_RUNTIME_KEY` environment variables.

### From The Desktop App

Memoh Desktop has this built in: enable **This computer**, give it a name, and the app connects its own runtime in-process — no separate terminal needed. The key is stored encrypted with the OS keychain facility, the connection is restored on restart, and the runtime stays bound to the server it was configured for (connecting the desktop app to a different server puts it into an error state instead of silently reattaching).

### Managing Keys

- **Revoking** a key disconnects the computer immediately.
- Keys remain readable to their owner so the connection command can be copied again later. That also means they are stored readably server-side — protect the server database accordingly.

---

## Work Locations On A Bot

Each bot has a set of **Work locations**:

- **Server Workspace** — the bot's normal container workspace on the server. Always present, cannot be removed.
- Any **computers** you add to the bot.

Exactly one location is the **default**; new work happens there unless something says otherwise. Adding a computer to a bot requires bot manage permission, and a computer can only be attached to bots owned by the same user who owns the computer.

A location row shows its status: online, offline, or **Update required** when the computer runs an older `@memohai/runtime` client than the server needs — upgrade the client (`npx` picks up the latest automatically on restart).

### Choosing A Location Per Request

- The chat composer has a **computer picker** to route a single message's work to a specific location.
- The agent can target a location per tool call; if the requested location is unavailable, the call fails visibly — it never silently falls back to the server or another computer.
- The agent can list the bot's current locations with the `list_execution_locations` tool.

### Tool Approval Per Location

Every location has its own approval policy for **read**, **write**, and **execute**, each set to allow, ask, or deny. For computers the defaults are: read **allow**, write **ask**, execute **ask** — so a bot can look around, but changing files or running commands on your machine asks first. Approvals are pinned to the location they were requested on.

---

## Limitations

- **Browser Use / Computer Use always run in the Server Workspace**, regardless of the selected location.
- **ACP agent sessions** do not support running on a computer.
- Paths: the runtime works from the OS user's home directory; `~` and `/data` in tool calls are mapped to the home directory for compatibility with container workspace conventions.

---

## Related Pages

- [Bot Workspace Management](./container.md)
- [Browser / Computer Use](./browser-computer-use.md)
- [Self-hosted Overview](../self-hosted/index.md)
