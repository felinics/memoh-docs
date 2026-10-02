# Slack

把 Memoh Bot 接到 Slack：收 DM、进频道、跟 thread、读附件、发文件、流式回复。

## 前提条件

- 一个可以安装 app 的 Slack workspace，并能访问 [Slack API 控制台](https://api.slack.com/apps)。
- 一个 Memoh Bot；渠道在它的 **平台** 标签页里配置。

## 步骤

### 1. 在 Slack API 控制台创建 app

1. 打开 [Slack API 控制台](https://api.slack.com/apps)，点 **Create New App**。
2. 选择要安装 Bot 的 workspace。

::: tip
保持 app 设置页开着，第 2 到 5 步都在这里完成。
:::

### 2. 在 Slack API 控制台开启 Socket Mode

Memoh 的 Slack 适配走 Socket Mode，所以除 Bot token 外还需要一个 app-level token。

1. 在 **Basic Information** 里开启 **Socket Mode**。
2. 创建 **App-Level Token**，scope 勾 `connections:write`。
3. 复制生成的 token，以 `xapp-` 开头。

### 3. 在 Slack API 控制台加 Bot Token Scopes

在 **OAuth & Permissions** 里加上 Slack 适配需要的 scope：

- `app_mentions:read`：接收频道里对 Bot 的 @
- `channels:history`：读公开频道消息
- `groups:history`：读私有频道消息
- `im:history`：读 DM
- `mpim:history`：读多人 DM
- `chat:write`：发送回复和 thread 消息
- `files:read`：读上传的文件和图片
- `files:write`：发出文件
- `reactions:write`：添加/移除 reaction

想让会话名称、元数据在 Memoh 里显示得更全，建议再加：

- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`

### 4. 在 Slack API 控制台订阅事件

在 **Event Subscriptions** 里开启 bot events，加上 Slack 适配处理的入站事件：

- `app_mention`
- `message.channels`
- `message.groups`
- `message.im`
- `message.mpim`

### 5. 在 Slack API 控制台把 app 装进 workspace

1. 在 **OAuth & Permissions** 点 **Install to Workspace**。
2. 确认权限页并授权。
3. 复制 **Bot User OAuth Token**，以 `xoxb-` 开头。

### 6. 在 Memoh 添加 Slack 渠道

1. 打开 Bot 详情页，进入 **平台** 标签页。
2. 点 **Add Channel**，选 **Slack**。
3. 填写：
   - **Bot Token**：`xoxb-` 开头的 token
   - **App-Level Token**：`xapp-` 开头的 token
4. 点 **Save and Enable**。

### 7. 在 Slack 把 Bot 加进对话

渠道启用后，还要让这个 Slack app 出现在你想用它的对话里：

- DM：和该 app 开对话并发一条消息。
- 公开频道：把 Bot 邀请进频道。
- 私有频道：装好后显式邀请进频道。

## 凭据

| 字段 | 说明 |
|------|------|
| **Bot Token** | 装进 workspace 后复制的 **Bot User OAuth Token**（`xoxb-` 开头）。 |
| **App-Level Token** | 为 Socket Mode 创建、带 `connections:write` scope 的 token（`xapp-` 开头）。 |

两个 token 必须来自同一个 Slack app、同一个 workspace。

## 验证

把 Bot 邀请进一个频道并 @它发送 `/help`，或在 DM 里发 `/help`。Bot 回复命令列表即说明渠道已生效。

## 群聊

Slack 频道即群聊场景。把 Bot 邀请进公开或私有频道，@它即可对话；回复可以在 thread 里继续，Slack 也是唯一支持 thread 的渠道。

## 停用与更换凭据

在 Bot 的 **平台** 标签页可以随时停用或移除该渠道。更换凭据时，更新 **Bot Token** 与 **App-Level Token** 字段并保存即可。

## 常见问题 {#faq}

### 为什么要填两个 token？ {#why-two-tokens}

Memoh 的 Slack 适配走 Socket Mode：除 `xoxb-` 开头的 Bot token 外，还需要 `xapp-` 开头的 app-level token，且两者必须来自同一个 Slack app 和 workspace。

### Bot 能发消息，但读不到上传的图片或文件 {#cannot-read-files}

检查 `files:read` scope 是否已开启。

### 连上了，但收不到任何入站消息 {#no-incoming-messages}

重新核对 **Event Subscriptions** 里的 bot events，以及配套的 `history` 类 scope。
