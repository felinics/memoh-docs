# Bot Hooks

Bot Hooks 可以让机器人在工具调用、对话 turn、记忆、workspace 活动、审批、压缩和 subagent 等流程前后运行小型自动化规则。每个机器人都有自己的配置文件：

```text
/data/.memoh/hooks.json
```

打开机器人 **详情页**，进入 **Hooks** tab，就可以从 UI 编辑这个文件。

---

## Hooks Tab

Hooks tab 是机器人 hook 配置的 JSON 编辑器。它可以：

- 显示 `/data/.memoh/hooks.json` 是否存在
- 显示用户配置是否启用
- 统计已启用 hook 和 action 数量
- 列出支持的事件目录
- 标出哪些事件已经接入运行时
- 重新加载和保存 JSON 配置
- 插入起步模板
- 用一条合成事件测试当前 effective hooks 配置

如果文件不存在，UI 和服务会创建一份启用的空配置：

```json
{
  "version": 1,
  "enabled": true,
  "hooks": []
}
```

这个 tab 不提供可视化规则构建器，需要直接编辑 JSON。

---

## 配置结构

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

顶层字段：

| 字段 | 说明 |
|------|------|
| `version` | 必填的 schema 版本。v0.13.0 支持 `1`。 |
| `enabled` | 启用或停用这个用户配置文件里的 hooks。默认 `true`。 |
| `defaults.timeout` | 默认 action 超时时间。支持 `10s` 这类 Go duration，也支持整数秒。默认 `10s`。 |
| `defaults.on_error` | 默认错误处理：`ignore`、`fail` 或 `block`。默认 `fail`。 |
| `defaults.max_output_bytes` | 每个 command action 捕获 stdout/stderr 的最大字节数。默认 `65536`。 |
| `defaults.trigger_nested_hooks` | schema 会解析这个字段，默认 `false`；v0.13.0 的 Hooks UI 没有单独控件。 |
| `env` | 用户配置里的 command action 会使用的额外环境变量。 |
| `hooks` | 规则列表。命中后按 `priority` 从高到低运行，同优先级保持文件顺序。 |

Hook 字段：

| 字段 | 说明 |
|------|------|
| `name` | 可选的展示/调试名称。 |
| `event` | 必填，必须来自事件目录。 |
| `matcher` | 可选正则表达式，会匹配请求里的最佳目标文本。 |
| `enabled` | 启用或停用这个 hook。默认 `true`。 |
| `priority` | 数字越大越先运行。 |
| `actions` | hook 命中后要运行的 action。 |
| `conditions` | schema 中保留给未来扩展；v0.13.0 匹配时使用 `event`、`enabled` 和 `matcher`。 |

`matcher` 的目标文本按下面顺序从 hook 请求里选择：

- `tool.name`
- `approval.tool_name`
- `channel.platform`
- `memory.scope`
- `extra.command`、`extra.path`、`extra.operation` 或 `extra.scope`
- 事件名称

---

## Action 类型

v0.13.0 支持两类 action：`command` 和 `tool`。

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

`command` action 会在机器人 workspace 容器内运行。hook 请求会作为 JSON 通过 stdin 传入，末尾带换行。

工作目录解析顺序：

1. `action.work_dir`
2. 请求里的 workspace CWD
3. `/data`

环境变量包括：

- 当前配置顶层的 `env`
- `MEMOH_HOOK_EVENT`
- `MEMOH_HOOK_NAME`
- `MEMOH_BOT_ID`
- `MEMOH_SESSION_ID`

如果 stdout 是 JSON，command 可以返回：

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

如果 stdout 不是 JSON，Memoh 会把 action 当成 `allow`，并把原始 stdout 放进 action metadata。非零退出码会被视为 action 错误。

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

`tool` action 会按名称调用一个可用的机器人工具，并传入配置里的 `input`。如果工具结果是对象，可以返回 `decision`、`reason` 和 `append_context`。

`mcp_tool` 在代码里是保留类型，但 v0.13.0 会拒绝它。

---

## 决策与错误

action 可以返回这些 decision：

| Decision | 效果 |
|----------|------|
| `allow` | 正常继续。 |
| `deny` | 拒绝被守卫的操作。对 `PreToolUse` 来说，会拒绝这次工具调用。 |
| `ask_approval` | 在运行时支持审批接管的位置请求人工审批。 |
| `append_context` | 在事件接入点会消费 `append_context` 时追加上下文，例如 prompt、model、memory 相关流程。 |

`on_error` 控制 action 失败时的行为：

| 值 | 效果 |
|----|------|
| `ignore` | 记录并继续下一个 action。 |
| `fail` | 返回 action 错误。默认值。 |
| `block` | 把失败转换为 `deny` decision。 |

---

## 事件目录

Hooks tab 会从 `/bots/{bot_id}/hooks/events` 加载事件目录。标记为 runtime-supported 的事件已经接入 v0.13.0 执行路径。catalog-only 事件可以通过配置解析和测试接口，但 v0.13.0 没有实时运行路径会自动发出这些事件。

| Event | 区域 | 已接入运行时 | 说明 |
|-------|------|--------------|------|
| `PreToolUse` | 工具 | 是 | 工具调用审批决策前运行。可以拒绝或要求审批。 |
| `PostToolUse` | 工具 | 是 | 工具调用成功后运行。 |
| `ToolError` | 工具 | 是 | 工具调用返回错误时运行。 |
| `SessionStart` | 会话 | 是 | 会话创建后运行。 |
| `UserMessageReceived` | 对话 | 是 | conversation resolver 收到用户消息后运行。 |
| `BeforePromptBuild` | Prompt | 是 | prompt 组装前运行；`append_context` 可以追加到 system prompt。 |
| `AfterPromptBuild` | Prompt | 是 | prompt 组装后运行；`append_context` 可以追加到 system prompt。 |
| `BeforeModelCall` | 模型 | 是 | 模型生成 step 前运行；`append_context` 可以作为 user message 追加。 |
| `AfterModelCall` | 模型 | 是 | 模型生成 step 后运行。 |
| `TurnEnd` | Turn | 是 | 一个 turn 完成时运行。 |
| `TurnError` | Turn | 是 | 一个 turn 失败时运行。 |
| `BeforeMemorySearch` | 记忆 | 是 | 记忆检索前运行。 |
| `AfterMemorySearch` | 记忆 | 是 | 记忆检索后运行；`append_context` 可以合并进记忆上下文。 |
| `BeforeMemoryWrite` | 记忆 | 是 | 写入对话记忆前运行。 |
| `AfterMemoryWrite` | 记忆 | 是 | 写入记忆后运行。 |
| `MemoryExtracted` | 记忆 | 是 | 记忆抽取/写入准备完成后运行。 |
| `WorkspaceStart` | Workspace | 是 | workspace 启动后运行。 |
| `WorkspaceStop` | Workspace | 是 | workspace 停止时运行。 |
| `BeforeWorkspaceCommand` | Workspace | 是 | workspace shell 命令执行前运行。可以拒绝命令。 |
| `AfterWorkspaceCommand` | Workspace | 是 | workspace shell 命令执行后运行。 |
| `BeforeFileWrite` | Workspace | 是 | 文件写入和 patch 前运行。可以拒绝写入。 |
| `AfterFileWrite` | Workspace | 是 | 文件写入和 patch 后运行。 |
| `BeforeApprovalCreate` | 审批 | 是 | 创建工具审批请求前运行。 |
| `ApprovalRequested` | 审批 | 是 | 审批请求发出后运行。 |
| `ApprovalResolved` | 审批 | 是 | 审批被处理后运行。 |
| `ApprovalTimeout` | 审批 | 是 | 审批超时时运行。 |
| `PreCompact` | 压缩 | 是 | 会话压缩前运行。 |
| `PostCompact` | 压缩 | 是 | 会话压缩后运行。 |
| `SubagentStart` | Subagent | 是 | subagent 任务开始前运行。 |
| `SubagentStop` | Subagent | 是 | subagent 任务结束后运行。 |
| `InboundMessageNormalized` | 消息 | 否 | v0.13.0 中仅存在于事件目录。 |
| `BeforeOutboundMessage` | 消息 | 否 | v0.13.0 中仅存在于事件目录。 |
| `AfterOutboundMessage` | 消息 | 否 | v0.13.0 中仅存在于事件目录。 |
| `ChannelDeliveryFailed` | 消息 | 否 | v0.13.0 中仅存在于事件目录。 |

---

## 测试 Hooks

在 Hooks tab 的 **Test** 区域可以运行一条合成事件：

1. 选择事件。
2. 编辑 JSON payload。
3. 点击 **Run Test**。
4. 查看返回结果，包括命中的 hooks、运行的 actions、decision、action results 和 hook source metadata。

测试路径使用 effective config，并且会真正执行 action。除非你就是要验证破坏性命令或工具调用，否则不要在测试 payload 里触发它们。

---

## 安全注意事项

Hooks 很强大。请把它们当成会在机器人 workspace 里运行的代码来对待。

- 启用前审查每个 command action。
- 小心使用 `PreToolUse`、`BeforeWorkspaceCommand` 和 `BeforeFileWrite`；它们会阻断机器人的正常工作。
- 保持较短 timeout，并明确设置 `on_error`。
- 不要把长期有效的 secrets 直接写进 `hooks.json`。
- 对高风险 hooks 使用尽量窄的 `matcher`。
- 记住 command action 会通过 stdin 收到 hook 请求，其中可能包含消息文本、工具输入、路径和错误信息。

---

## 相关页面

- [机器人](/zh/guides/bot.md)
- [技能](/zh/guides/skills.md)
