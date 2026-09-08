# MCP 连接

Memoh 支持 **Model Context Protocol (MCP)**，让机器人接外部工具与上下文服务。每个机器人可以有自己的一组 MCP 连接。

## 在做什么

MCP 把「外部数据、外部工具」用相对统一的方式接进来。你在机器人 **MCP** tab 里手配，或从 [应用市场](/zh/guides/supermarket.md) 装模板再进编辑器改。

---

## 连接类型

### 1. Stdio（本机进程）

在机器人**容器里**起本地命令，用标准输入输出通信。

| 字段 | 说明 |
|------|------|
| **Command** | 可执行文件，如 `npx`、`python3` |
| **Arguments** | 参数列表 |
| **Env** | 环境变量 |
| **CWD** | 工作目录 |

### 2. Remote（HTTP/SSE）

走网络的远程 MCP。

| 字段 | 说明 |
|------|------|
| **URL** | 服务端点 |
| **Headers** | 如鉴权头 |
| **Transport** | `http` 或 `sse` |

---

## OAuth

有的 MCP 服要走 OAuth。Memoh 会：

1. 在需要认证的连接上点 **OAuth**。
2. 自动 **discover** 服务方 OAuth 配置。
3. **Authorize** 打开授权页。
4. 用户同意后回跳，Memoh **换 token** 并安全存好。

也可看状态、**Revoke** 清掉 token。

---

## 操作

- **Add Connection**：加一条，选类型，填表。
- **Import JSON**：从标准 `mcpServers` JSON 一次导入多条。
- **Export**：导出备份或分享。
- **Toggle Active**：不删，只开/关某条。
- **Search**：按名或 id 找。
- **Batch Delete**：多选删除。

---

## 工具发现

连接 active 后，Memoh 会拉该服暴露的工具。点进连接可看 **Tools** 列表。需要时点 **Probe** 手动刷新。

---

## 和机器人怎么配合

连上后，对话里模型会按说明选用这些工具；发现到的工具会进推理流程。具体工具名、参数以服端为准。
