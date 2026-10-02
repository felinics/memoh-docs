# Discord

把 Memoh Bot 接到 Discord，进服务器，在频道和私聊里与社群成员对话。

## 前提条件

- 一个能登录 [Discord Developer Portal](https://discord.com/developers/applications) 的 Discord 账号。
- 一个可以授权 Bot 加入的服务器。
- 一个 Memoh Bot；渠道在它的 **平台** 标签页里配置。

## 步骤

### 1. 在 Discord Developer Portal 创建应用并拿 Bot Token

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)。
2. 点 **New Application**，起名。
3. 左侧进入 **Bot**。
4. 点 **Reset Token** 生成 **Bot Token**，复制并妥善保管。

### 2. 在 Discord Developer Portal 开启特权意图

1. 在 **Bot** 页向下找到 **Privileged Gateway Intents**。
2. 开启 `Message Content Intent`、`Server Members Intent` 和 `Presence Intent`。
3. 保存。

### 3. 在 Discord Developer Portal 生成邀请链接，把 Bot 拉进服务器

1. 进入 **OAuth2** > **URL Generator**。
2. 勾选 scope：`bot`、`applications.commands`。
3. 勾选权限：`Send Messages`、`Read Message History`、`Embed Links`、`Attach Files`。
4. 复制生成的 URL，在浏览器里打开。
5. 选择要加入的服务器并授权。

> 官方说明：[Discord Developer Portal - Bots](https://discord.com/developers/docs/intro)

### 4. 在 Memoh 添加 Discord 渠道

1. 打开 Bot 详情页，进入 **平台** 标签页。
2. 点 **Add Channel**，选 **Discord**。
3. 贴上 **Bot Token**。
4. 点 **Save and Enable**。

## 凭据

| 字段 | 说明 |
|------|------|
| **Bot Token** | 在应用的 **Bot** 页用 **Reset Token** 生成，妥善保管。 |

## 验证

私聊 Bot 发送 `/help`，或在 Bot 已加入的服务器频道里 @它。Bot 回复命令列表即说明渠道已生效。

## 群聊

Discord 服务器即群聊场景。Bot 授权进入服务器后，在频道里 @它即可对话。

## 停用与更换凭据

在 Bot 的 **平台** 标签页可以随时停用或移除该渠道。更换 token 时，更新 **Bot Token** 字段并保存即可。
