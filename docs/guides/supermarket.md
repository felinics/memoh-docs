# Supermarket

Supermarket is Memoh's built-in catalog for **connectors** and **skills**. Connectors bind third-party services such as GitHub or Notion to a bot; skills are reusable procedures the agent can load on demand.

The Web UI shows Supermarket under Settings with two tabs:

- **Connectors**
- **Skills**

**Connectors** comes first and is the default landing tab when the server has [Connect-It configured](/guides/connectors.md#requirements). Without Connect-It, the tab is hidden and **Skills** is the default instead.

---

## Connect A Service

The **Connectors** tab lists services a bot can connect through OAuth or an API key. Pick one, click **Connect**, select the target bot, and complete the authorization. The full flow — authentication methods, connection statuses, and how connector tools reach the bot — is documented in [Connectors](/guides/connectors.md).

---

## Install A Skill

1. Open **Supermarket** in the Web UI.
2. Switch to the **Skills** tab.
3. Choose a skill and click **Install**, or open the skill detail page and click **Install to Bot**.
4. Select the target bot.
5. Confirm the install.
6. The skill appears in that bot's **Skills** tab.

Skills install into the bot's managed skills directory (`/data/skills/<skill-name>` inside the bot workspace). Skill detail pages show the author, version, registry, and links. See [Skills](/guides/skills.md) for how skills are loaded and used.

---

## Configure Supermarket

By default, Memoh reads Supermarket content from:

```toml
[supermarket]
base_url = "https://supermarket.memoh.ai"
```

Operators can point `supermarket.base_url` at another trusted catalog. The configured endpoint is used for the connector list, skill lists, skill details, and skill downloads. The **Registry** filter in the Skills tab lets you narrow results to a single upstream registry.

---

## Contribute

Contribute new skills here:

- [felinics/supermarket](https://github.com/felinics/supermarket)
