# Context Compaction

**Context Compaction** reduces the prompt footprint of a single conversation session by summarizing older turns and keeping the active context smaller.

This page is about **session context**, not long-term memory storage. If you want to merge or rewrite stored memories in a memory provider, see [Bot Memory Management](./memory.md).

---

## Compaction Is On By Default

New bots ship with automatic context compaction **enabled and zero-config**. You do not need to pick a threshold, a ratio, or a summarization model — Memoh sizes everything relative to the chat model's `context_window`:

- When the compactable session history passes about **50%** of the model's context window, Memoh compacts in the **background** after the turn.
- If a session grows past about **75%** before the background pass catches up, Memoh compacts **synchronously** before sending the next turn.
- Either path aims to bring the raw history back down to about **40%** of the window.

The only real prerequisite: the bot's chat model must declare a `context_window` in its model settings. Without it, the automatic policy has no budget to work against and never triggers. See [Providers And Models](../integrations/providers/llm.md).

Bots created before this default changed keep their stored settings and behave as configured (see legacy mode below).

---

## Configuration

The bot's compaction settings still exist for tuning and overrides:

| Field | Description |
|-------|-------------|
| **Compaction Enabled** | On by default. Turn off to disable automatic compaction for this bot. |
| **Compaction Threshold** | Input-token threshold. `0` (the default) means the automatic model-relative policy above. A value **greater than 0** switches to the legacy absolute-threshold mode. |
| **Compaction Ratio** | How aggressively to reduce the session. Only used in legacy mode — the field is hidden while the threshold is `0`. |
| **Compaction Model** | Optional dedicated summarization model. Defaults to the chat model; you can clear an override back to **Use chat model (default)**. |

### Choosing A Compaction Model

Any enabled chat model can summarize, with one restriction: the provider must respect output-token limits. **OpenAI Codex models cannot be used as the summarizer** — the model dropdown filters them out.

This matters when a bot's main chat model is a Codex model: automatic compaction quietly stands down because there is nothing valid to inherit. Assign an explicit Compaction Model in that case.

---

## Immediate Compaction

You can trigger compaction immediately for the current session in two ways:

### From The Session Status Panel

1. Open the active conversation.
2. Open the session status panel.
3. Click **Compact Now**.

The status panel also shows the current context usage, cache hit rate, and used skills, which helps you decide whether compaction is useful right now.

### From Slash Commands

Run:

```text
/compact
```

or:

```text
/compact run
```

Manual compaction compacts as much of the session as possible (rather than stopping at the automatic target) and bypasses the short cooldown that automatic compaction observes after a failed attempt.

---

## What Compaction Preserves

The summarizer works on typed conversation records, which keeps the summary faithful:

- Tool calls and their results are never split apart — a tool exchange either stays in the raw history or is summarized as a whole.
- Media are summarized as `[image]` / `[file]` markers rather than raw data.
- Summaries that come back empty, truncated, or not actually smaller than the original are rejected instead of being stored.
- In sessions that run on multiple workspaces, the summary keeps track of which workspace each part of the conversation happened on.

Compaction applies to normal chat sessions and to **discuss** and pipeline-based conversations as well.

---

## Status And Logs

The **Compaction** tab in the bot detail page provides an audit trail for context compaction runs.

Typical fields include:

- **Status** — whether the compaction finished successfully or failed
- **Summary** — the compacted summary text or a summary preview
- **Message Count** — how many messages were involved
- **Started / Completed Time** — when the run happened
- **Model / Usage** — metadata about the model and token usage when available

The log list is useful when you want to verify that automatic compaction is actually running or diagnose a failure.

### Common Failure Reasons

When compaction cannot run, Memoh reports `compaction.model_unavailable` with a specific reason: the compaction model is not configured, not a chat model, disabled, its provider is disabled, the provider does not support output limits (Codex), or the model has no known context window. `/compact` reports the same conditions inline in chat.

---

## Relationship To `context_window`

Memoh tracks the current session against the selected chat model's `context_window`.

You can see this in:

- the Web UI session status panel
- the `/status` slash command

Context usage is an estimate (roughly four characters per token), so treat the percentages as guidance rather than exact numbers.

---

## Context Compaction vs Memory Compaction

These two features sound similar but solve different problems:

| Feature | Scope | Trigger | Result |
|---------|-------|---------|--------|
| **Context Compaction** | One active session | Automatic, session panel, or `/compact` | Summarizes older chat history for future turns |
| **Memory Compaction** | Long-term memory provider | Memory tab | Rewrites stored memory entries |

Use **Context Compaction** when one conversation has become too large.

Use **Memory Compaction** when the bot's stored memories themselves have become noisy or redundant.

---

## Next Steps

- To inspect session runtime information, see [Sessions](./sessions.md).
- To understand slash-triggered compaction, see [Slash Commands](./slash-commands.md).
- To manage long-term memory instead of session context, see [Bot Memory Management](./memory.md).
