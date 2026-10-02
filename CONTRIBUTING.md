# Contributing to the Memoh Docs

This guide covers how documentation is structured, translated, and checked in this repository. A complete Chinese version follows at the bottom (中文对照).

## Keep the Two Locales in Lockstep

- English pages live under `docs/`.
- Chinese pages live under `docs/zh/` with **identical paths**: `docs/guides/memory.md` mirrors to `docs/zh/guides/memory.md`.
- **Every content PR updates both locales.** English is the source of truth; the Chinese mirror lands **in the same PR**, never in a follow-up.

## Use the Terminology Glossary

Translate product terms exactly as listed. Where a term has a product UI key, the **bold UI label** in the docs must use the product's own locale string for that key — never a re-translation of the English value.

| English | 中文 | Product UI key |
|---------|------|----------------|
| Bot | Bot | - |
| bot (prose) | Bot | - |
| workspace | 工作区 | `bots.tabs.container` |
| Platforms tab | 平台 | `bots.tabs.channels` |
| General tab | 通用 | `bots.tabs.general` |
| Desktop tab | 桌面 | `bots.tabs.desktop` |
| Memory tab | 记忆 | `bots.tabs.memory` |
| Schedule tab | 定时任务 | `bots.tabs.schedule` |
| Access Control | 访问控制 | `bots.tabs.access` |
| Providers | 模型服务商 | `sidebar.providers` |
| Add Provider | 添加服务商 | `provider.add` |
| Supermarket | 应用市场 | - |
| skill | 技能 | - |
| channel (concept) | 渠道 | - |
| session | 会话 | - |
| memory (long-term) | 长期记忆 | - |
| Help Center | 帮助中心 | - |

Rule: bold UI labels must use the product's own locale string, never re-translated by value. If the product string behind a UI key changes, update the docs to match it.

## Follow the Chinese Typography Rules (中文排版规则)

Chinese pages follow these rules without exception:

- Put a space between CJK characters and Latin letters or digits: 「在 Telegram 里发 3 条消息」.
- Use 「」 for quotes, never straight or curly Latin quotes.
- Use full-width punctuation in prose (，。：；？！); half-width only inside code, paths, and URLs.
- Address the reader as 「你」, never 「您」.
- Avoid the em dash ——; restructure the sentence instead.
- No AI-slop phrasing: no 「不只是…更是…」, no 「告别…」, no 「无缝」, no three-part parallel slogans (三连排比).
- Write definite statements. State what the product actually does; never hedge with 「以官网为准」「以实际为准」 or similar.

## Give Deep-Linkable Headings Explicit Anchors

FAQ entries and any heading meant to be deep-linked carry an explicit ASCII `{#id}`, **identical in both locales**:

```md
<!-- docs/guides/sessions.md -->
## How do I reset a session? {#reset-session}

<!-- docs/zh/guides/sessions.md -->
## 怎么重置会话？ {#reset-session}
```

This keeps links stable across locales and rewordings.

## Write in the House Copy Style

- Verb-first headings: "Create a provider", not "Provider creation".
- Exact numbers over vague claims: "256+ voices across 50+ languages", not "many voices".
- Every destructive action notes what it does **not** undo. Example: "Deleting a session removes its message history permanently; it does not delete memories already extracted from it."
- Example prompts end with a safety constraint. Example: "Summarize this thread and draft a reply, and ask me before sending anything."

## Run the Parity Check Before Opening a PR

```sh
node scripts/check-locale-parity.mjs
```

It must pass. It verifies that every page under `docs/` has its mirror under `docs/zh/` (and vice versa), and that the sidebars in `docs/.vitepress/en.ts` and `docs/.vitepress/zh.ts` link the same set of pages. CI runs the same script on every pull request.

---

# 中文对照

本指南说明这个仓库里文档怎么组织、怎么翻译、怎么检查。

## 两种语言同步走

- 英文页面在 `docs/` 下。
- 中文页面在 `docs/zh/` 下，**路径完全一致**：`docs/guides/memory.md` 对应 `docs/zh/guides/memory.md`。
- **每个内容 PR 同时更新两种语言。** 英文是唯一事实来源；中文镜像**在同一个 PR 里**落地，不留到后续 PR。

## 按术语表翻译

产品术语按下表统一翻译。术语有产品 UI key 时，文档里的**加粗 UI 标签**必须直接使用产品在该语言下的字符串，绝不按英文字面重译。

| English | 中文 | Product UI key |
|---------|------|----------------|
| Bot | Bot | - |
| bot (prose) | Bot | - |
| workspace | 工作区 | `bots.tabs.container` |
| Platforms tab | 平台 | `bots.tabs.channels` |
| General tab | 通用 | `bots.tabs.general` |
| Desktop tab | 桌面 | `bots.tabs.desktop` |
| Memory tab | 记忆 | `bots.tabs.memory` |
| Schedule tab | 定时任务 | `bots.tabs.schedule` |
| Access Control | 访问控制 | `bots.tabs.access` |
| Providers | 模型服务商 | `sidebar.providers` |
| Add Provider | 添加服务商 | `provider.add` |
| Supermarket | 应用市场 | - |
| skill | 技能 | - |
| channel (concept) | 渠道 | - |
| session | 会话 | - |
| memory (long-term) | 长期记忆 | - |
| Help Center | 帮助中心 | - |

规则：加粗的 UI 标签必须用产品自己的语言包字符串，绝不按字面值重译。UI key 背后的产品字符串改了，文档跟着改。

## 遵守中文排版规则

中文页面一律遵守：

- 中文与拉丁字母、数字之间加空格：「在 Telegram 里发 3 条消息」。
- 引号用「」，不用直引号或弯引号。
- 正文用全角标点（，。：；？！）；代码、路径、URL 里用半角。
- 称呼读者用「你」，不用「您」。
- 避免破折号 ——，改写句子。
- 不写 AI 味句式：不用「不只是…更是…」、不用「告别…」、不用「无缝」、不写三连排比。
- 只写确定的说法。写清产品实际行为，不写「以官网为准」「以实际为准」这类托词。

## 给可深链的标题加显式锚点

FAQ 条目和所有要被深链的标题带显式 ASCII `{#id}`，**两种语言完全相同**：

```md
<!-- docs/guides/sessions.md -->
## How do I reset a session? {#reset-session}

<!-- docs/zh/guides/sessions.md -->
## 怎么重置会话？ {#reset-session}
```

这样链接在换语言、改措辞后依然稳定。

## 按文案风格写

- 标题动词开头：「创建提供方」，不写「提供方的创建」。
- 用确切数字，不用含糊说法：「256+ 个声音、50+ 种语言」，不写「很多声音」。
- 每个破坏性操作都写明它**不会**撤销什么。例：「删除会话会永久移除消息历史；已经从中抽取的记忆不会随之删除。」
- 示例提示词以安全约束收尾。例：「总结这个帖子并起草回复，发送任何内容前先问我。」

## 发 PR 前跑一致性检查

```sh
node scripts/check-locale-parity.mjs
```

必须通过。它检查 `docs/` 下每个页面在 `docs/zh/` 下都有镜像（反之亦然），并且 `docs/.vitepress/en.ts` 与 `docs/.vitepress/zh.ts` 两份侧栏链接同一组页面。CI 会在每个 pull request 上跑同一个脚本。
