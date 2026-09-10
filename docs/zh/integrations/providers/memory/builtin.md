# 内置记忆

自带默认记忆后端，接 Memoh 的抽取/检索流程，支持：

- 从对话里抽记忆
- 聊天时语义检索
- 手建、手改
- 记忆压缩、整库重建

---

## 工作方式

内置提供方运行在 **graph** 模式：记忆节点与边存放在 PostgreSQL 中作为唯一真源，并派生出一份 Markdown 视图（机器人工作区里的 `memory/` bundle 和 `MEMORY.md`）供 Agent 读写。

语义检索是可选的加层：

| 层 | 存储 | 要啥 | 提供什么 |
|----|------|------|----------|
| **Graph**（始终开启） | PostgreSQL 记忆节点/边 | 只要主库 | 结构化召回、记忆间关系、压缩、重建 |
| **语义索引**（可选） | `pgvector` 数据库 | Compose 栈里的 `[pgvector]` 库 **加上** 在提供方里选好 embedding 模型 | 对记忆节点做向量相似度检索 |

没选 embedding 模型，或没配 `pgvector`，提供方照样以纯 graph 模式工作，只是跳过语义检索。

---

## 建一个

1. **Memory Providers**。
2. **Add Memory Provider**。
3. **Name**、**Provider Type** 选 `builtin`。
4. **Create**。

---

## 配置

| 字段 | 说明 |
|------|------|
| **Embedding Model** | 可选。来自某个模型服务商的 embedding 模型。选了（且 `pgvector` 可用）就会给记忆节点做向量并开启语义检索；留空即纯 graph 模式。 |

**Edit**、**Delete** 如常。

---

## 依赖

### 纯 graph

除主 PostgreSQL 外无额外依赖。

### 语义索引

默认 Docker Compose 栈已经带了 `pgvector` 服务，`config.toml` 里也有对应段：

```toml
[pgvector]
enabled = true
host = "pgvector"
port = 5432
user = "memoh"
password = "memoh123"
database = "memoh_vector"
sslmode = "disable"
```

然后在提供方里选一个 **Embedding Model**。向量由所选模型服务商（OpenAI、Gemini、Ollama……）生成，因此该提供方需要有 embedding 模型可用。

---

## 绑到机器人

1. **Bots** → 机器人
2. **General** → **Memory Provider**
3. 保存

若未选，运行层面不会用这条提供方。

---

## 配好之后

在机器人的 **Memory** tab 里管理具体记忆：

- 手动新建
- 从对话抽取
- 搜索、编辑、删除
- 压缩或重建记忆库

日常操作见 [记忆管理](../../../guides/memory.md)。