# QQ

通过 QQ 开放平台的官方 Bot 接入 Memoh,支持私聊、群聊与话题(thread)会话。

::: warning 使用限制
- 每个 QQ 账号最多创建 5 个 Bot。
- 回复按完整消息块送达,不做逐 token 流式输出。
:::

## 前提条件

- 一个 QQ 账号,用于登录 [QQ Bot 开放平台](https://q.qq.com/qqbot/openclaw/)。

## 步骤

### 1. 在 QQ 开放平台创建 Bot

在 QQ Bot 开放平台:

1. 打开 [QQ Bot 开放平台](https://q.qq.com/qqbot/openclaw/),用 QQ 账号登录。
2. 点 **创建机器人**(Create Bot),无需审批。
3. 复制页面上显示的 **AppID** 和 **AppSecret**。**AppSecret** 只显示一次,务必存好。

> 官方资料:[QQ Bot 开放平台](https://q.qq.com/) · [QQ Bot 文档](https://bot.q.qq.com/wiki/)

### 2. 在 Memoh 里添加渠道

在 Memoh:

1. 打开 Bot 的 **平台** 标签页。
2. 点 **Add Channel**,选择 **QQ**。
3. 粘贴 **AppID** 和 **AppSecret**。
4. 按需调整可选设置:**Markdown Support** 与 **Enable Input Hint** 默认均已开启。
5. 点 **Save and Enable**。

## 凭据

| 字段 | 必填 | 说明 |
|------|------|------|
| **AppID** | 是 | Bot 的 App ID,创建 Bot 时在 QQ 开放平台页面上显示。 |
| **AppSecret** | 是 | Bot 的 App Secret,只在创建时显示一次。 |
| **Markdown Support** | 否 | 启用 Markdown 格式(默认开启)。 |
| **Enable Input Hint** | 否 | 生成回复时显示「正在输入」提示(默认开启)。 |

## 验证

私聊给 Bot 发送 `/help`,或在群聊中 @Bot 并发送 `/help`。Bot 回复命令列表,说明渠道已接通。

## 群聊

Bot 支持 QQ 群聊与话题(thread)会话:在群里 @Bot 即可触发回复。

## 停用与更换凭据

随时可在 Bot 的 **平台** 标签页停用或移除该渠道。更换凭据时,在同一面板更新 **AppID** / **AppSecret** 并保存即可。

## 常见问题 {#faq}

### AppSecret 找不到了 {#appsecret-reset}

**AppSecret** 只在创建 Bot 时显示一次。在 QQ 开放平台再次查看会强制重置;重置后,在 Memoh 里更新 **AppSecret** 并保存。
