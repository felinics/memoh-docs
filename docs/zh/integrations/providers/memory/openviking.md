# OpenViking 记忆

可自建或接 SaaS 的独立记忆 API，给需要专用记忆后端的场景多一个选项。

---

## 建提供方

1. **Memory Providers** → **Add Memory Provider**。
2. **Name**、**Provider Type** 选 `openviking`。
3. **Create**。

---

## 配置

| 字段 | 必填 | 说明 |
|------|------|------|
| **Base URL** | 是 | 如 `http://openviking:8088` |
| **API Key** | 否 | 需要时填，按密钥存 |

---

## 绑到机器人

1. **Bots** → 机器人 → **General**
2. **Memory Provider** 选 OpenViking
3. 保存

---

## 使用

绑上后，记忆相关 API 都走 OpenViking。日常见 [长期记忆](../../../guides/memory.md)。
