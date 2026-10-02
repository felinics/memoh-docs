# 企业微信(WeCom / WeWork)

把 Memoh Bot 接入企业微信,在组织的企微工作区内与用户私聊或在群聊中协作。

## 前提条件

- 拥有 [企微管理后台](https://work.weixin.qq.com/) 的管理权限,用于创建 Bot 应用。

## 步骤

### 1. 在企微管理后台创建 Bot

在企微管理后台:

1. 登录 [企微管理后台](https://work.weixin.qq.com/)。
2. 进入 **应用管理** 下的 **自建应用** 或 **Bot 管理**。
3. 创建一个新的 Bot 应用。
4. 记下 **Bot ID** 和 **Secret** 凭据。

> 官方文档:[企微开放平台](https://developer.work.weixin.qq.com/) · [企微 Bot 文档](https://developer.work.weixin.qq.com/document/path/91770)

### 2. 在 Memoh 里添加渠道

在 Memoh:

1. 打开 Bot 的 **平台** 标签页。
2. 点 **Add Channel**,选择 **WeCom**。
3. 填入 **Bot ID** 和 **Secret**;仅在需要时填自定义 **WebSocket URL**。
4. 点 **Save and Enable**。

启用后,Memoh 通过 WebSocket 连接企微并开始接收消息。

## 凭据

| 字段 | 必填 | 说明 |
|------|------|------|
| **Bot ID** | 是 | 企微里该 Bot 的标识。 |
| **Secret** | 是 | Bot 的鉴权凭据。 |
| **WebSocket URL** | 否 | 自定义 WebSocket 端点;留空时使用默认端点。 |

## 验证

私聊给 Bot 发送 `/help`,或在群聊中 @Bot 并发送 `/help`。Bot 回复命令列表,说明渠道已接通。

## 群聊

Bot 也能在企微群聊中使用:在群里 @Bot 即可触发回复。

## 停用与更换凭据

随时可在 Bot 的 **平台** 标签页停用或移除该渠道。更换凭据时,在同一面板更新 **Bot ID** / **Secret** 并保存即可。
