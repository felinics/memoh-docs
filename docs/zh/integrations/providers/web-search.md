# 搜索提供方

给 Bot 接 **Search Provider** 后，它能在对话里**实时**查网，用搜索引擎 API 当工具。

## 在做什么

每个 Search Provider 是某一家的搜索 API（如 Brave、Google）。配好并绑到 Bot 后，需要新鲜事实时由模型去调。

---

## 支持哪些

在侧栏 **Search Provider** 页配置搜索引擎。支持的引擎：

| 引擎 | 说明 |
|------|------|
| **Brave** | 隐私和速度常被提及 |
| **Bing** | 覆盖面大 |
| **Google** | 传统网页搜 |
| **Tavily** | 偏 AI 研究向 |
| **SearxNG** | 自建聚合 |
| **DuckDuckGo** | 偏隐私 |
| 其它 | 如搜狗、Serper、Jina、Exa、Bocha、Yandex 等 |

---

## 建一个

1. 侧栏 **Search Provider**。
2. **Add Search Provider**。
3. 填 **Name**、**API Key**，有的引擎还要 **base_url**（如 SearxNG）。

**Edit** 改、**Delete** 删。

---

## 绑到 Bot

1. **Bots** → Bot
2. **General**
3. **Search Provider** 下拉选中
4. 保存

---

## Bot 怎么用

需要**较新、较贴问题**的公开信息时，会走搜索，再把结果融进回答；可多结果综合。具体策略由模型和工具设计决定。
