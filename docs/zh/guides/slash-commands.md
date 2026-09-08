# 斜杠命令

Memoh 支持 **斜杠命令**，在进 LLM 之前截获。用来快速看状态、改配置、切模型、开会话、停生成等。外接渠道和内置网页聊天都支持；**解析命令本身一般不吃模型 token**（与真正进对话的内容无关）。

---

## 命令长什么样

多数命令是「资源 / 动作 / 参数」：

```text
/resource [action] [arguments...]
```

例如：

```text
/schedule list
/model current
/schedule create morning-news "0 9 * * *" "Send a daily summary"
```

要点：

- **resource** 是组，如 `schedule`、`model`、`status`。
- **action** 是具体子命令，如 `list`、`get`、`set`。
- **arguments** 在 action 后面；带空格的用引号包起来。
- 有的组有**默认动作**，例如 `/settings` 等于 `/settings get`，`/status` 等于 `/status show`。

另有两条**顶层**命令：

- `/new`：给当前会话路由新开一路会话
- `/stop`：停当前这一路正在生成

---

## 技能激活与快捷操作

固定命令之外，斜杠还能按需激活机器人的[技能](/zh/guides/skills.md)：

```text
/<技能名> [可选的提示词]
```

- **网页 composer** 里输入 `/` 会弹面板：**快捷操作**（`/help`、`/skill list`、`/new`、`/compact`、`/model`）加上机器人的技能列表。选中的技能变成可移除的 chip，也可以直接打上面那种形式。
- **IM 渠道**里同样支持 `/<技能名>`；`/skill list` 会渲染成可点的按钮。
- 激活的技能内容**只注入当前这一轮**——不进历史、不进会话标题、不进记忆。

技能名每次发送都在**服务端**按机器人当前生效的技能目录解析。长得像命令/技能但都对不上的斜杠输入会明确报错，不会漏给模型；只是开头带 `/` 的普通文本（路径、URL）照常当聊天。

两个限制：

- 技能激活消息不能带附件（固定命令带附件照常执行）。
- 群聊里没有指向机器人的斜杠消息会被静默忽略。

## 内建帮助

| 命令 | 作用 |
|------|------|
| `/help` | 顶层命令列表 |
| `/help <group>` | 某组里有哪些 action |
| `/help <group> <action>` | 某条 action 的用法 |

```text
/help
/help model
/help model set
```

这是查**当前版本**实际支持哪些命令最快的方式。

---

## 解析规则

- 群里可 **@机器人 前缀**，如 `@BotName /help`。
- **Telegram** 可带 bot 后缀，如 `/help@MemohBot`。
- 引号包一整个参数，例如：

```text
/schedule create morning-news "0 9 * * *" "Send today's top stories"
```

整行**对不上**已知命令时，当普通聊天发出去，不当斜杠命令。

---

## 权限

只读类：能跟机器人聊的人一般就能用。  
`set`、`create`、`update`、`delete`、`enable`、`disable` 等写操作多要 **owner**。

`/help` 里 owner 专属会标 `[owner]`。

---

## 速查

### 顶层

| 命令 | 说明 |
|------|------|
| `/help` | 帮助 |
| `/new`（可选 `chat` / `discuss`） | 新会话 |
| `/stop` | 停当前生成 |

### 资源组

| 组 | 说明 | 默认动作 |
|----|------|----------|
| `/schedule` | 计划任务 | 无 |
| `/mcp` | 看 MCP 连接 | 无 |
| `/settings` | 机器人设置 | `get` |
| `/model` | 聊天模型 | 无 |
| `/memory` | 记忆提供方 | 无 |
| `/search` | 搜索提供方 | 无 |
| `/usage` | token 用量 | `summary` |
| `/email` | 邮服、绑定、发件箱 | 无 |
| `/skill` | 技能列表 | `list` |
| `/fs` | workspace 文件 | 无 |
| `/status` | 会话消息/上下文/缓存 | `show` |
| `/access` | 身份与 ACL | `show` |
| `/compact` | 立刻做**会话**上下文压缩 | `run` |
| `/context` | 当前会话的上下文窗口占用 | `show` |
| `/reasoning`（别名 `/reason`、`/effort`、`/think`） | 查看或设置本会话的推理档位 | `show` |
| `/language` | 查看或设置命令界面语言（`auto`、`en`、`zh`、`ja`） | `show` |
| `/link <code>` | 用 Web UI 里生成的码，把当前渠道账号绑定到 Memoh 用户 | `consume` |

---

## 会话类

### `/new`

给**当前会话路由**新开会话，老历史还在，只是切到新的当前上下文。

- `/new`：按当前场景默认类型
- `/new chat`：强制 chat
- `/new discuss`：强制 discuss

默认：网页本地多 `chat`；私聊多 `chat`；外接群多 `discuss`。

**内置网页本地** 没有 `/new discuss`，要 discuss 请用 Telegram、Discord 等。

细节见 [会话](/zh/guides/sessions.md)。

### `/stop`

停**当前这一路**正在生成。适合：流式已经够了、工具转太久、要在下一句前打断。

---

## 状态与排查

### `/status`

当前会话级：消息数、上下文占用、缓存命中、读写 token、本路用过的技能等。

| 动作 | 用法 |
|------|------|
| `show` | `/status` 或 `/status show`，当前路由 |
| `latest` | 若当前路由没有活跃会话，要看**该机器人最新**会话时用 |

### `/access`

看当前渠道身份、绑定的用户、角色、写命令是否允许、渠道/会话/thread 范围、ACL 结果。排绑定、ACL、为何拒绝写命令时用。

```text
/access
```

### `/usage`

最近 7 天 token。

| 动作 | 用法 |
|------|------|
| `summary` | `/usage` 或 `/usage summary` |
| `by-model` | `/usage by-model` |


### `/email`

当前机器人邮服、绑定、发件箱。

| 动作 | 用法 |
|------|------|
| `providers` | `/email providers` |
| `bindings` | `/email bindings` |
| `outbox` | `/email outbox` |

---

## 配置类

### `/settings`

| 动作 | 用法 | 权限 |
|------|------|------|
| `get` | `/settings` 或 `/settings get` | 全体 |
| `update` | `/settings update [options]` | Owner |

`update` 常见选项：

| 选项 | 说明 |
|------|------|
| `--language` | 如 `en`、`zh` |
| `--acl_default_effect` | `allow` / `deny` |
| `--reasoning_effort` | 档位如 `low` / `medium` / `high` / `xhigh`——实际可用值取决于所选模型声明的 reasoning efforts |
| `--chat_model_id` | 聊天模型 UUID |

```text
/settings update --language en --reasoning_effort high
```

### `/model`

| 动作 | 用法 | 权限 |
|------|------|------|
| `list [provider_name]` | `/model list` | 全体 |
| `current` | `/model current` | 全体 |
| `set` | `/model set <model_id>` 或 `/model set <provider_name> <model_name>` | Owner |

```text
/model list
/model list OpenAI
/model current
/model set gpt-4o
/model set OpenAI gpt-4o
```

### `/memory`

| 动作 | 用法 | 权限 |
|------|------|------|
| `list` | `/memory list` | 全体 |
| `current` | `/memory current` | 全体 |
| `set` | `/memory set <name>` | Owner |

### `/search`

| 动作 | 用法 | 权限 |
|------|------|------|
| `list` | `/search list` | 全体 |
| `current` | `/search current` | 全体 |
| `set` | `/search set <name>` | Owner |

### `/mcp`

| 动作 | 用法 | 权限 |
|------|------|------|
| `list` | `/mcp list` | 全体 |
| `get` | `/mcp get <name>` | 全体 |
| `delete` | `/mcp delete <name>` | Owner |

---

## 自动化与文件

### `/schedule`

| 动作 | 用法 | 权限 |
|------|------|------|
| `list` | `/schedule list` | 全体 |
| `get` | `/schedule get <name>` | 全体 |
| `create` | `/schedule create <name> <pattern> <command>` | Owner |
| `update` | `/schedule update <name> [--pattern P] [--command C]` | Owner |
| `delete` | `/schedule delete <name>` | Owner |
| `enable` | `/schedule enable <name>` | Owner |
| `disable` | `/schedule disable <name>` | Owner |

```text
/schedule list
/schedule create morning-news "0 9 * * *" "Summarize today's top tech news"
/schedule disable morning-news
```

### `/skill`

只列**运行时可用**的技能——被禁用或被遮蔽的来源不出现。

| 动作 | 用法 |
|------|------|
| `list` | `/skill` 或 `/skill list` |

要按轮激活技能，用 `/<技能名> [提示词]`，见上面「技能激活与快捷操作」。

### `/fs`

| 动作 | 用法 |
|------|------|
| `list` | `/fs list [path]` |
| `read` | `/fs read <path>` |

```text
/fs list /
/fs list /home
/fs read /home/bot/IDENTITY.md
```

文件太大时输出会截断。

---

## `/compact`

立刻对**当前会话**做 [会话上下文压缩](/zh/guides/compaction.md)，**不是**改记忆库里条目的那种记忆压缩。

| 动作 | 用法 |
|------|------|
| `run` | `/compact` 或 `/compact run` |

聊得很长、想先摘要再续时有用。
