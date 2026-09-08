# Bot Hooks

Bot Hooks let a bot run small automation rules around tools, conversation turns, memory, workspace activity, approvals, compaction, and subagents. They are configured per bot in the workspace file:

```text
/data/.memoh/hooks.json
```

Open a bot's **Detail Page** and go to the **Hooks** tab to edit this file from the UI.

---

## Hooks Tab

The Hooks tab is a JSON editor for the bot's hook configuration. It can:

- show whether `/data/.memoh/hooks.json` exists
- show whether the user config is enabled
- count enabled hooks and actions
- list the supported event catalog
- show which events are wired into the runtime
- reload and save the JSON config
- insert a starter template
- run a synthetic event through the effective hooks config

If the file is missing, the UI and service create an empty enabled config:

```json
{
  "version": 1,
  "enabled": true,
  "hooks": []
}
```

The tab does not provide a visual rule builder. Edit the JSON directly.

---

## Configuration Structure

```json
{
  "version": 1,
  "enabled": true,
  "defaults": {
    "timeout": "10s",
    "on_error": "fail",
    "max_output_bytes": 65536,
    "trigger_nested_hooks": false
  },
  "env": {
    "HOOK_LOG": "/data/.memoh/hooks.log"
  },
  "hooks": [
    {
      "name": "review shell commands",
      "event": "PreToolUse",
      "matcher": "^exec$",
      "enabled": true,
      "priority": 10,
      "actions": [
        {
          "type": "command",
          "command": "python3 /data/.memoh/review-command.py",
          "timeout": "5s",
          "on_error": "block"
        }
      ]
    }
  ]
}
```

Top-level fields:

| Field | Description |
|-------|-------------|
| `version` | Required schema version. v0.13.0 supports `1`. |
| `enabled` | Enables or disables hooks in this user config. Defaults to `true`. |
| `defaults.timeout` | Default action timeout. Accepts Go-style durations such as `10s`, or an integer number of seconds. Defaults to `10s`. |
| `defaults.on_error` | Default error behavior: `ignore`, `fail`, or `block`. Defaults to `fail`. |
| `defaults.max_output_bytes` | Maximum captured stdout/stderr bytes per command action. Defaults to `65536`. |
| `defaults.trigger_nested_hooks` | Parsed by the schema and defaults to `false`; the Hooks UI does not expose a separate control for it in v0.13.0. |
| `env` | Extra environment variables for command actions from the user config. |
| `hooks` | Ordered rule list. Matching hooks run by descending `priority`, preserving file order for equal priorities. |

Hook fields:

| Field | Description |
|-------|-------------|
| `name` | Optional display/debug name. |
| `event` | Required event name from the catalog. |
| `matcher` | Optional regular expression. It is matched against the request's best target text. |
| `enabled` | Enables or disables this hook. Defaults to `true`. |
| `priority` | Higher numbers run first. |
| `actions` | Actions to run when the hook matches. |
| `conditions` | Present in the schema for future expansion; v0.13.0 matching uses `event`, `enabled`, and `matcher`. |

The `matcher` target is selected from the hook request in this order:

- `tool.name`
- `approval.tool_name`
- `channel.platform`
- `memory.scope`
- `extra.command`, `extra.path`, `extra.operation`, or `extra.scope`
- the event name

---

## Action Types

v0.13.0 supports two action types: `command` and `tool`.

### Command Action

```json
{
  "type": "command",
  "command": "mkdir -p .memoh && cat >> .memoh/hooks.log",
  "work_dir": "/data",
  "timeout": "10s",
  "on_error": "ignore"
}
```

A `command` action runs inside the bot workspace container. The hook request is passed as JSON on stdin, followed by a newline.

Working directory resolution:

1. `action.work_dir`
2. the request workspace CWD
3. `/data`

Environment variables include:

- top-level `env` from the active config
- `MEMOH_HOOK_EVENT`
- `MEMOH_HOOK_NAME`
- `MEMOH_BOT_ID`
- `MEMOH_SESSION_ID`

If stdout is JSON, the command can return:

```json
{
  "decision": "append_context",
  "reason": "extra context added",
  "append_context": "Use the production-safe command variant.",
  "metadata": {
    "source": "hook"
  }
}
```

If stdout is not JSON, Memoh treats the action as `allow` and stores the raw stdout in action metadata. A non-zero exit code is an action error.

### Tool Action

```json
{
  "type": "tool",
  "tool": "record_event",
  "input": {
    "source": "hook"
  },
  "timeout": "10s",
  "on_error": "fail"
}
```

A `tool` action calls an available bot tool by name with the configured `input`. Tool results may return `decision`, `reason`, and `append_context` in an object result.

`mcp_tool` is reserved in the codebase but rejected in v0.13.0.

---

## Decisions And Errors

Actions may return one of these decisions:

| Decision | Effect |
|----------|--------|
| `allow` | Continue normally. |
| `deny` | Deny the guarded operation. For `PreToolUse`, this rejects the tool call. |
| `ask_approval` | Request human approval where the runtime supports approval handoff. |
| `append_context` | Add context where the event integration consumes `append_context`, such as prompt/model/memory-related flows. |

`on_error` controls what happens when an action fails:

| Value | Effect |
|-------|--------|
| `ignore` | Log and continue to the next action. |
| `fail` | Return the action error. This is the default. |
| `block` | Convert the failure into a `deny` decision. |

---

## Event Catalog

The Hooks tab loads the event catalog from `/bots/{bot_id}/hooks/events`. Events marked as runtime-supported are wired into v0.13.0 execution paths. Catalog-only events are accepted by config parsing and test runs, but are not currently emitted by a live runtime path in v0.13.0.

| Event | Area | Runtime-supported | Notes |
|-------|------|-------------------|-------|
| `PreToolUse` | Tools | Yes | Runs before a tool call approval decision. Can deny or request approval. |
| `PostToolUse` | Tools | Yes | Runs after a successful tool call. |
| `ToolError` | Tools | Yes | Runs when a tool call returns an error. |
| `SessionStart` | Session | Yes | Runs after a session is created. |
| `UserMessageReceived` | Conversation | Yes | Runs after an inbound user message is received by the conversation resolver. |
| `BeforePromptBuild` | Prompt | Yes | Runs before prompt assembly; `append_context` may be added to the system prompt. |
| `AfterPromptBuild` | Prompt | Yes | Runs after prompt assembly; `append_context` may be added to the system prompt. |
| `BeforeModelCall` | Model | Yes | Runs before model generation steps; `append_context` may be added as a user message. |
| `AfterModelCall` | Model | Yes | Runs after model generation steps. |
| `TurnEnd` | Turn | Yes | Runs when a turn completes. |
| `TurnError` | Turn | Yes | Runs when a turn fails. |
| `BeforeMemorySearch` | Memory | Yes | Runs before memory lookup. |
| `AfterMemorySearch` | Memory | Yes | Runs after memory lookup; `append_context` may be merged into memory context. |
| `BeforeMemoryWrite` | Memory | Yes | Runs before writing conversation memory. |
| `AfterMemoryWrite` | Memory | Yes | Runs after memory write. |
| `MemoryExtracted` | Memory | Yes | Runs after memory extraction/write preparation. |
| `WorkspaceStart` | Workspace | Yes | Runs after workspace startup. |
| `WorkspaceStop` | Workspace | Yes | Runs during workspace stop. |
| `BeforeWorkspaceCommand` | Workspace | Yes | Runs before workspace shell commands. Can deny the command. |
| `AfterWorkspaceCommand` | Workspace | Yes | Runs after workspace shell commands. |
| `BeforeFileWrite` | Workspace | Yes | Runs before file writes and patches. Can deny the write. |
| `AfterFileWrite` | Workspace | Yes | Runs after file writes and patches. |
| `BeforeApprovalCreate` | Approval | Yes | Runs before creating a tool approval request. |
| `ApprovalRequested` | Approval | Yes | Runs after approval is requested. |
| `ApprovalResolved` | Approval | Yes | Runs after approval is resolved. |
| `ApprovalTimeout` | Approval | Yes | Runs when approval times out. |
| `PreCompact` | Compaction | Yes | Runs before session compaction. |
| `PostCompact` | Compaction | Yes | Runs after session compaction. |
| `SubagentStart` | Subagents | Yes | Runs before a subagent task starts. |
| `SubagentStop` | Subagents | Yes | Runs after a subagent task stops. |
| `InboundMessageNormalized` | Messaging | No | Catalog-only in v0.13.0. |
| `BeforeOutboundMessage` | Messaging | No | Catalog-only in v0.13.0. |
| `AfterOutboundMessage` | Messaging | No | Catalog-only in v0.13.0. |
| `ChannelDeliveryFailed` | Messaging | No | Catalog-only in v0.13.0. |

---

## Testing Hooks

Use the **Test** section in the Hooks tab to run a synthetic event:

1. Select an event.
2. Edit the JSON payload.
3. Click **Run Test**.
4. Inspect the returned result, including matched hooks, actions run, decision, action results, and hook source metadata.

The test path uses the effective config and runs real actions. Avoid destructive commands or tool calls in test payloads unless that is what you intend to verify.

---

## Safety Notes

Hooks are powerful. Treat them like code that runs inside the bot workspace.

- Review every command action before enabling it.
- Be careful with `PreToolUse`, `BeforeWorkspaceCommand`, and `BeforeFileWrite`; they can block normal bot work.
- Keep timeouts short and set `on_error` intentionally.
- Do not store long-lived secrets directly in `hooks.json`.
- Prefer narrow `matcher` expressions for risky hooks.
- Remember that command actions receive the hook request on stdin, which can include message text, tool inputs, paths, and errors.

---

## Related Pages

- [Bot Management](/guides/bot.md)
- [Skills](/guides/skills.md)
