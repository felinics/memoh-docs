# Mem0 记忆

把机器人接到 [Mem0](https://mem0.ai) 云端，由对方管存储、索引、检索，本机不搭那套库。

---

## 建提供方

1. **Memory Providers** → **Add Memory Provider**。
2. **Name**、**Provider Type** 选 `mem0`。
3. **Create**。

---

## 配置

| 字段 | 必填 | 说明 |
|------|------|------|
| **Base URL** | 否 | 空则默认 `https://api.mem0.ai` |
| **API Key** | 是 | 鉴权，按密钥存 |
| **Organization ID** | 否 | 工作区用 |
| **Project ID** | 否 | 工作区用 |

---

## 绑到机器人

1. **Bots** → 机器人 → **General**
2. **Memory Provider** 选 Mem0
3. 保存

---

## 使用

绑上后，抽取、搜索、管理都走 Mem0 API。日常见 [长期记忆](../../../guides/memory.md)。
