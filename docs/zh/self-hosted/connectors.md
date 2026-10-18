# 连接器（Connect-It）

连接器让 Bot 能用上第三方服务（GitHub、Notion 这类）的工具。背后接的是 [Connect-It](https://github.com/memohai/connect-it)，一个和 Memoh 一起部署的配套服务。所有凭据（OAuth token、API Key）都存在 Connect-It 那边；Memoh 只存一张绑定表——哪个 Bot 绑了哪个连接、工具命名空间叫什么、开没开。

对使用者来说，连接器不是单独安装的东西：它作为[应用](../guides/supermarket.md)的组件随 App 一起到达。App 的清单里声明了它用到哪些连接器类型、是否必需；装好后在 Bot 的 **应用** 标签页里完成授权即可。本页其余部分是部署方视角——怎么把 Connect-It 跑起来，以及连接背后的机制。

---

## 服务端前提

服务端配置了 Connect-It 地址，连接器功能才会出现：

```toml
[connect_it]
base_url = ""   # 例如 "http://connect-it:8421"
api_token = ""  # 服务端之间的可信 token
```

两项留空即关闭该功能。线上环境建议用对应的环境变量（`MEMOH_CONNECT_IT_BASE_URL`、`MEMOH_CONNECT_IT_API_TOKEN`）。

一键 Server Deploy 会在全新安装时自动带起一个同机部署的 Connect-It，见 [Server Deploy](./docker.md#connect-it-连接器)。没配置 Connect-It 时，依赖连接器的 App 组件会显示"连接器不可用"。

---

## 授权与管理

装好带连接器的 App 后，Bot 的 **应用** 标签页会按组件列出它的连接器，并标注状态：**需要授权**、**可选**，或 **所有工作区共享**。点 **去授权** 完成绑定——OAuth 走弹窗授权（浏览器拦了弹窗就放行后重试），API Key 则填好凭据字段。

每条连接会显示状态：

| 状态 | 含义 |
|------|------|
| **已连接** | 正常，工具对 Bot 可用 |
| **等待授权** | 连接建了但 OAuth 没走完；补完授权，或者断开它 |
| **需要重新授权** | 凭据过期或被撤销，点 **重新授权** |
| **授权失败** | 上次授权没成功，可再点 **重新授权** 重试 |
| **不可用** | 这个连接器类型在当前 Connect-It 侧没有提供 |
| **已停用** | 已停用，工具不会给到 Bot |

可以**启用 / 停用**某条连接而不删掉它；**断开连接**则把绑定从 Bot 上移除，**并且**删掉 Connect-It 里存的这条连接（含凭据）——之后使用它的 App 需要重新授权。

---

## 工具怎么到 Bot 手上

对话时，Memoh 会把这个 Bot 所有启用且状态正常的连接聚合成一个 MCP 会话，作为工具源给智能体。连接器工具和 workspace、MCP 工具并排出现。

每条连接在绑定那一刻会拿到一个按连接器类型生成的**工具命名空间**——GitHub 连接是 `github`，再连一个就是 `github-2`。命名空间在绑定的整个生命周期内固定不变：之后增删其它连接，不会影响已有连接的工具名。

---

## 相关页面

- [应用市场](../guides/supermarket.md) —— 应用（含连接器组件）的安装入口。
- [MCP](../guides/mcp.md) —— 直接管理 MCP 连接。
- [Server Deploy](./docker.md#connect-it-连接器) —— 同机部署 Connect-It、凭据管理和 OAuth 回调地址。
