# Choosing an Extension

Memoh has five ways to extend what a bot can do. They sound alike until you put them side by side — so here they are, side by side.

| Extension | What it is | Where it lives / how it fires | Best for |
|-----------|------------|-------------------------------|----------|
| [Skills](./skills.md) | `SKILL.md` prompt modules that change how the bot behaves | In the bot workspace under `/data/skills/`, managed on the **Skills** tab; invoked in conversation | Routines and working styles you would otherwise retype every time |
| [Hooks](./hooks.md) | Event rules in `hooks.json` that run commands or tools | In `/data/.memoh/hooks.json`, edited on the **Hooks** tab; fires on lifecycle events such as `PreToolUse` or `TurnEnd` | Checks and side effects at fixed points, with no chat involved |
| [MCP](./mcp.md) | Connections to external MCP tool servers | Configured per bot on the **MCP** tab, as a Stdio or Remote connection; discovered tools are used during conversation | Attaching a tool that already ships an MCP server |
| [Connectors](./connectors.md) | OAuth or API-key bindings to services such as GitHub or Notion | Connected from the Supermarket's **Connectors** tab, managed on the bot's **Connectors** tab; the service's tools appear in conversation | Letting the bot act on your account of a hosted service |
| [Supermarket](./supermarket.md) | Memoh's built-in catalog: one-click install of packaged apps — skills plus their dependencies and connectors | Under **Settings**; what you install lands in the target bot's own tabs | Getting a ready-made capability without assembling the parts |

However the capability arrives, it converges in the same place: connector and MCP tools appear alongside the bot's workspace tools in conversation, and installed skills show up on the bot's **Skills** tab like hand-written ones.

## Which should I use?

- Change how the bot does its work → a [Skill](./skills.md).
- Do something automatically at a fixed event → a [Hook](./hooks.md).
- Attach a tool that has an MCP server → [MCP](./mcp.md).
- Let the bot use your GitHub or Notion account → a [Connector](./connectors.md).
- Install a ready-made package in one click → [Supermarket](./supermarket.md).

::: tip They combine
These are not competing options. An installed Supermarket app may bring skills and connectors together, and a hook can guard tools that arrived through MCP. Pick by the question above, not one per bot.
:::

## Where to start

Each option has a full page with the details this table compresses:

- [Skills](./skills.md) — writing `SKILL.md`, skill states, and adopting discovered skills.
- [Hooks](./hooks.md) — the event catalog, the config schema, and testing a rule.
- [MCP](./mcp.md) — Stdio and Remote connections, OAuth, and tool discovery.
- [Connectors](./connectors.md) — connection statuses, reauthorization, and tool namespaces.
- [Supermarket](./supermarket.md) — browsing the catalog and installing to a bot.

If you are unsure, browse the Supermarket first — an installed package shows what a finished setup looks like before you build your own.
