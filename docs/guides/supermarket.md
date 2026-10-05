# Supermarket

The Supermarket is Memoh's built-in App catalog. An **App** here is a packaged unit of capability: one App can carry several **Skills** (reusable procedures), **dependencies** (tools installed into the workspace), and **connectors** (bindings to third-party services such as GitHub or Notion). You install the App as a whole — no separate hunting for Skills or connectors.

Open **Supermarket** from the client sidebar: Apps are laid out by category, searchable, and filterable by tag. An App's detail page shows its description, component makeup (how many Skills, dependencies, and connectors), author, version, source registry, and links.

---

## Install an App

1. Pick an App in the **Supermarket** and open its detail page.
2. Click **Install to Bot** and choose the target bot.
3. If the App declares environment variables, fill in the required values first.
4. Confirm the installation.

Installing and updating needs the bot's workspace running: Skills are written into the workspace, dependencies are installed into it, and connectors are bound. Installation shows progress; an interrupted install can be **resumed** or **restored**.

---

## After installing: the bot's Apps tab

The **Apps** tab on the bot detail page lists installed Apps with per-component status:

| Component | Where it goes |
|-----------|---------------|
| **Skills** | Written to the managed workspace directory `/data/skills/<registry>/<app>/`, owned by the App — updated and removed with it, so don't edit them by hand (see [Skills](./skills.md)) |
| **Dependencies** | Installed into the bot's workspace and shared with other Apps in the same workspace that need them |
| **Connectors** | Marked **Needs authorization**, **Optional**, or **Shared across workspaces**; click **Authorize** to run OAuth or enter an API key (see [Connectors](../self-hosted/connectors.md)) |

Common actions: **Check for updates**, **Update**, **Remove**. When some components failed or still need authorization, the App is flagged as needing attention — open its component list to finish setup.

---

## Where the catalog comes from

Supermarket content is served from an upstream registry, `supermarket.memoh.ai` by default. Self-hosted instances can point `supermarket.base_url` at another trusted catalog; see the configuration reference in [Server Deploy](../self-hosted/docker.md).

---

## Contributing

New Apps can be submitted to:

- [felinics/supermarket](https://github.com/felinics/supermarket)
