# Agents / ACP

Memoh can connect a bot to ACP-compatible coding agents. ACP agents are external coding workflows that work from the bot's chat workspace while keeping their sessions separate from normal chat and discuss conversations.

Three agent profiles ship with Memoh: **Codex**, **Claude Code**, and **Hermes**. Treat them as supported setup paths, not as the only possible ACP-compatible agents over time.

ACP agents run inside the bot's container workspace, so the bot must use a container-backed workspace backend.

---

## Setup Flow

1. Open a bot's **Detail Page** and go to the **Agents** tab.
2. Each agent appears as a row with an enable switch. Click the row to open its settings.
3. Choose a setup mode and fill in the fields that agent requires.
4. Save, then start the enabled agent from the chat workspace.

A row shows one of three states: **Needs setup** (enabled but missing credentials), **Disabled**, or a green dot (enabled and ready).

### Setup Modes Per Agent

| Agent | API Key | OAuth | Self-managed |
|-------|---------|-------|--------------|
| **Codex** | ✅ | ✅ ChatGPT sign-in with device code | ✅ |
| **Claude Code** | ✅ | ✅ paste a token from `claude setup-token` | ✅ |
| **Hermes** | ✅ | — | ✅ |

**Self-managed** means Memoh launches the agent against configuration you maintain yourself inside the workspace.

### Codex Device Authorization

In the Codex settings, click **Use Device Code**. Memoh shows a verification URL and a one-time user code, and finishes authorization automatically once you approve it on OpenAI's page.

> Only enter the code on the displayed OpenAI verification URL — device codes can be used for phishing.

### Hermes

Hermes is a Python-based agent bundled with the workspace toolkit. Its settings ask for:

- **Provider** — Gemini (Google AI Studio), OpenRouter, OpenAI API, or a custom endpoint
- **Model** — a preset list per provider, or a custom model ID
- **Base URL** — only shown and required for custom endpoints
- **API Key** — for the selected provider

---

## Adapter Updates

The Codex and Claude Code adapters are npm-backed. Memoh resolves the adapter's latest published version once per server run (per bot) and launches that version, so adapter fixes arrive without upgrading Memoh itself. If the lookup or launch fails, Memoh falls back to the adapter version bundled in the workspace image until the next server restart.

Hermes uses a pinned runtime from the workspace toolkit and does not self-update.

---

## Reasoning Effort

When the active agent supports it, you can pick a reasoning effort per session from the model picker in the composer: hover **Reasoning** to open the list.

- The available options (and their names) are declared by the external agent itself; they can change when you switch models.
- Defaults when you have not chosen one: Codex uses `medium`, Claude Code uses `high`. Hermes does not support reasoning selection.
- The choice is per session and independent of the model choice.

If a previously chosen effort becomes unavailable, Memoh refreshes the agent's options and asks you to pick again instead of failing silently.

---

## Attachments

ACP agent sessions support message attachments:

- **Images** are sent natively when the agent declares image input support. Otherwise, Memoh automatically falls back to referencing the image as a workspace file when possible.
- **Files**, long pasted text, and attachments carried by quoted/replied messages are passed to the agent as workspace paths or public URLs.
- Sending an attachment without any text is allowed.

If an attachment cannot be delivered to the agent, Memoh reports a clear error in chat instead of silently dropping it.

---

## Default Agent

In the bot's interaction settings you can pick a **Default Agent** — Memoh itself or any enabled, fully configured ACP agent. The default applies to newly created one-on-one sessions only; existing sessions and group discuss conversations are not affected.

---

## ACP Agent Sessions

ACP work uses the `acp_agent` session type. These sessions are created and managed by the Agents/ACP workflow, not through normal `/new chat` or `/new discuss` routing. In the Web UI, you can filter sessions by `acp_agent` to find coding-agent work separately from everyday conversations.

---

## Related Pages

- [Bot Management](./bot.md)
- [Sessions](./sessions.md)
- [Files](./files.md)
- [Providers And Models](../integrations/providers/llm.md)
