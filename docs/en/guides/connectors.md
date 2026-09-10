# Connectors

Connectors let a bot use third-party services such as GitHub or Notion. You pick a service from the Supermarket catalog, authorize it with OAuth or an API key, and bind it to a bot — from then on the bot can call that service's tools directly in conversation.

Behind the scenes, connections are managed by [Connect-It](https://github.com/memohai/connect-it), a companion service deployed next to Memoh. All credentials (OAuth tokens, API keys) live in Connect-It; Memoh only keeps a binding record — which bot is bound to which connection, what its tool namespace is, and whether it is enabled.

---

## Requirements

Connectors are available when the server is configured with a Connect-It endpoint:

```toml
[connect_it]
base_url = ""   # e.g. "http://connect-it:8421"
api_token = ""  # trusted server-to-server token
```

Leaving both empty disables the feature. In deployed environments, prefer the matching environment variables (`MEMOH_CONNECT_IT_BASE_URL`, `MEMOH_CONNECT_IT_API_TOKEN`).

The one-click server deployment provisions a co-hosted Connect-It automatically on fresh installs; see [Server Deploy](../self-hosted/docker.md#connect-it-connectors). When Connect-It is not configured, the Supermarket hides the **Connectors** tab and connector operations report that connectors are not configured on this server.

---

## Connect A Service

1. Open **Supermarket** in the Web UI.
2. Stay on the **Connectors** tab — it is the first tab and the default landing tab when connectors are configured.
3. Choose a connector and click **Connect**.
4. Select the target bot.
5. Choose an authentication method — OAuth or API key, depending on what the connector supports.
6. For OAuth, complete the authorization popup. If the browser blocks it, allow popups for the page and try again. For API keys, fill in the credential fields.
7. The connection appears in the bot's **Connectors** tab.

---

## Manage Connections

The bot detail page has a **Connectors** tab listing the bot's connected services. Each connection shows one of these statuses:

| Status | Meaning |
|--------|---------|
| **Connected** | Active. The connection's tools are available to the bot. |
| **Waiting for authorization** | The connection was created but OAuth was never completed. Finish the authorization or disconnect it. |
| **Authorization required** | Credentials expired or were revoked. Click **Reauthorize**. |
| **Authorization failed** | The last authorization attempt did not succeed. Try **Reauthorize** again. |
| **Unavailable** | The connector is no longer available on the Connect-It side. |
| **Disabled** | Turned off. The connection's tools are not offered to the bot. |

From the same tab you can:

- **Enable / disable** a connection without removing it.
- **Reauthorize** a connection whose credentials went stale.
- **Disconnect** a connection — this removes the binding from the bot **and** deletes the stored connection, including its credentials, in Connect-It.

If you abandon an OAuth authorization halfway, the connection stays in **Waiting for authorization** until you disconnect it.

---

## How Tools Reach The Bot

At conversation time, Memoh combines all of the bot's enabled, active connections into a single aggregated MCP session and offers it to the agent as a tool source. Connector tools appear alongside workspace and MCP tools.

Each connection gets a **tool namespace** derived from the connector type when it is first bound — `github` for a GitHub connection, `github-2` for a second one. The namespace is fixed for the lifetime of the binding: connecting or disconnecting other services never renames an existing connection's tools.

---

## Related Pages

- [Supermarket](./supermarket.md) — where connectors are discovered and connected.
- [MCP](./mcp.md) — direct MCP connection management.
- [Server Deploy](../self-hosted/docker.md#connect-it-connectors) — co-hosted Connect-It provisioning, credentials, and the OAuth callback URL.
