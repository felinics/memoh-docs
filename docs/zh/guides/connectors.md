# 连接器

连接器让 Bot 能用上第三方服务（GitHub、Notion 这类）。在应用市场里挑一个服务，走 OAuth 授权或者填 API Key，绑到某个 Bot 上——之后对话里 Bot 就能直接调这个服务的工具。

背后接的是 [Connect-It](https://github.com/memohai/connect-it)，一个和 Memoh 一起部署的配套服务。所有凭据（OAuth token、API Key）都存在 Connect-It 那边；Memoh 只存一张绑定表——哪个 Bot 绑了哪个连接、工具命名空间叫什么、开没开。

---

## 前提

服务端配置了 Connect-It 地址，连接器功能才会出现：

```toml
[connect_it]
base_url = ""   # 例如 "http://connect-it:8421"
api_token = ""  # 服务端之间的可信 token
```

两项留空即关闭该功能。线上环境建议用对应的环境变量（`MEMOH_CONNECT_IT_BASE_URL`、`MEMOH_CONNECT_IT_API_TOKEN`）。

一键 Server Deploy 会在全新安装时自动带起一个同机部署的 Connect-It，见 [Server Deploy](/zh/self-hosted/docker.md#connect-it-连接器)。没配置 Connect-It 时，应用市场不会显示 **Connectors** tab，连接器相关操作会提示服务器未配置连接器。

---

## 连接一个服务

1. 在 Web UI 中打开 **Supermarket**。
2. 停在 **Connectors** tab——配置了连接器时它排在第一个，也是默认落地的 tab。
3. 选一个连接器，点 **Connect**。
4. 选择目标 Bot。
5. 选认证方式——OAuth 还是 API Key，取决于这个连接器支持什么。
6. OAuth 走弹窗完成授权；浏览器拦了弹窗的话，给页面放行弹窗再试。API Key 则填好凭据字段。
7. 连接会出现在该 Bot 的 **Connectors** tab 里。

---

## 管理连接

Bot 详情页有一个 **Connectors** tab，列出这个 Bot 连了哪些服务。每条连接会显示状态：

| 状态 | 含义 |
|------|------|
| **Connected** | 正常，工具对 Bot 可用 |
| **Waiting for authorization** | 连接建了但 OAuth 没走完；补完授权，或者断开它 |
| **Authorization required** | 凭据过期或被撤销，点 **Reauthorize** 重新授权 |
| **Authorization failed** | 上次授权没成功，可再点 **Reauthorize** 重试 |
| **Unavailable** | 这个连接器在 Connect-It 侧已经下架 |
| **Disabled** | 已停用，工具不会给到 Bot |

在这个 tab 里可以：

- **启用 / 停用**某条连接，不用删掉它。
- **Reauthorize** 重新授权凭据失效的连接。
- **Disconnect** 断开连接——会把绑定从 Bot 上移除，**并且**删掉 Connect-It 里存的这条连接（含凭据）。

OAuth 授权中途放弃的话，这条连接会一直停在 **Waiting for authorization**，手动断开即可清理。

---

## 工具怎么到 Bot 手上

对话时，Memoh 会把这个 Bot 所有启用且状态正常的连接聚合成一个 MCP 会话，作为工具源给智能体。连接器工具和 workspace、MCP 工具并排出现。

每条连接在绑定那一刻会拿到一个按连接器类型生成的**工具命名空间**——GitHub 连接是 `github`，再连一个就是 `github-2`。命名空间在绑定的整个生命周期内固定不变：之后增删其它连接，不会影响已有连接的工具名。

---

## 相关页面

- [应用市场](/zh/guides/supermarket.md) —— 发现和连接服务的入口。
- [MCP](/zh/guides/mcp.md) —— 直接管理 MCP 连接。
- [Server Deploy](/zh/self-hosted/docker.md#connect-it-连接器) —— 同机部署 Connect-It、凭据管理和 OAuth 回调地址。
