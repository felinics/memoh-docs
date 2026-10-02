# Telegram

把 Memoh Bot 接到 Telegram。Memoh 对 Telegram 的支持较全：流式、Markdown、附件等。

## 前提条件

- 一个 Telegram 账号，用于和 **@BotFather** 对话建 Bot。
- 一个 Memoh Bot；渠道在它的 **平台** 标签页里配置。

## 步骤

### 1. 在 Telegram 用 @BotFather 创建 Bot

1. 在 Telegram 里搜索官方 **@BotFather**。
2. 发送 `/newbot`。
3. 按提示填写：
   - **Name**：展示名，如 `My Memoh Bot`。
   - **Username**：全局唯一、以 `bot` 结尾，如 `my_memoh_bot`。
4. BotFather 会回复 **API Token**（形如 `123456789:ABC...`）。**不要泄露。**

> 官方说明：[Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)

### 2. 在 Memoh 添加 Telegram 渠道

1. 打开 Bot 详情页，进入 **平台** 标签页。
2. 点 **Add Channel**，选 **Telegram**。
3. 把 **API Token** 填进凭据字段。
4. 点 **Save and Enable**。

## 凭据

| 字段 | 说明 |
|------|------|
| **API Token** | 创建 Bot 时 BotFather 发给你的 token（形如 `123456789:ABC...`），不要泄露。 |

## 验证

在 Telegram 里私聊 Bot，发送 `/help`。Bot 回复命令列表即说明渠道已生效。

## 群聊

Telegram 支持群聊。把 Bot 拉进群后，@它的用户名即可在群里对话。

## 停用与更换凭据

在 Bot 的 **平台** 标签页可以随时停用或移除该渠道。更换 token 时，更新 **API Token** 字段并保存即可。
