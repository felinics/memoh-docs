# Connectors (Connect-It)

Connectors let bots use tools from third-party services such as GitHub and Notion. They are backed by [Connect-It](https://github.com/memohai/connect-it), a companion service deployed alongside Memoh. All credentials (OAuth tokens, API keys) live on the Connect-It side; Memoh only keeps a binding table — which bot is bound to which connection, what the tool namespace is called, and whether it is enabled.

From a user's point of view, connectors are not installed on their own: they arrive as components of an [App](../guides/supermarket.md). An App's manifest declares which connector types it uses and whether each is required; after installing, you authorize them on the bot's **Apps** tab. The rest of this page is the operator view — how to run Connect-It and how connections work underneath.

---

## Server requirements

The connector feature only appears when the server has a Connect-It endpoint configured:

```toml
[connect_it]
base_url = ""   # e.g. "http://connect-it:8421"
api_token = ""  # trusted server-to-server token
```

Leaving both empty disables the feature. In production, prefer the corresponding environment variables (`MEMOH_CONNECT_IT_BASE_URL`, `MEMOH_CONNECT_IT_API_TOKEN`).

The one-line Server Deploy brings up a co-hosted Connect-It on fresh installs; see [Server Deploy](./docker.md#connect-it-connectors). Without Connect-It configured, App components that depend on a connector show as unavailable.

---

## Authorization and management

After installing an App that carries connectors, the bot's **Apps** tab lists them among the App's components, marked **Needs authorization**, **Optional**, or **Shared across workspaces**. Click **Authorize** to complete the binding — OAuth runs through a popup (allow popups for the page if the browser blocks it); API-key connectors ask for the credential fields instead.

Each connection shows a status:

| Status | Meaning |
|--------|---------|
| **Connected** | Healthy; tools are available to the bot |
| **Waiting for authorization** | The connection exists but OAuth never finished; complete it or disconnect |
| **Authorization required** | Credentials expired or were revoked; click **Reauthorize** |
| **Authorization failed** | The last authorization attempt failed; **Reauthorize** retries it |
| **Unavailable** | The configured Connect-It does not provide this connector type |
| **Disabled** | Turned off; tools are not given to the bot |

You can **enable / disable** a connection without deleting it. **Disconnect** removes the binding from the bot **and** deletes the stored connection (credentials included) on the Connect-It side — Apps that used it will need to be reauthorized.

---

## How tools reach the bot

During conversation, Memoh aggregates all of a bot's enabled, healthy connections into one MCP session and hands it to the agent as a tool source. Connector tools appear alongside workspace and MCP tools.

Each connection receives a **tool namespace** generated from its connector type at binding time — a GitHub connection is `github`, a second one becomes `github-2`. The namespace stays fixed for the lifetime of the binding: adding or removing other connections later never changes the tool names of existing ones.

---

## Related pages

- [Supermarket](../guides/supermarket.md) — where Apps (connector components included) are installed from.
- [MCP](../guides/mcp.md) — manage MCP connections directly.
- [Server Deploy](./docker.md#connect-it-connectors) — co-hosting Connect-It, credential management, and OAuth callback URLs.
