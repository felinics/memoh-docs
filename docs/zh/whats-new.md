---
title: 最新动态
description: Memoh 新功能速览：会改变你使用方式的更新。
outline: [2, 3]
---

# 最新动态

Memoh 新功能速览，只收录会改变你使用方式的更新。每个版本的完整改动和 Bug 修复，见 [GitHub 上的更新日志](https://github.com/felinics/Memoh/releases)。

## 2026 年 10 月 19 日 {#2026-10-19}

![Memoh 更新：Grok Build 成为一方 Agent、云桌面复制粘贴、更清爽的定时任务会话、缓存命中大幅提升](/images/whats-new/2026-10-19.png)

::: info 9 月订阅用户
如果你在 9 月订阅，额外的一个月已经加到你的账户中。
:::

### 把 Grok Build 用作内置 Agent {#2026-10-19-grok-build}

Grok Build 现在作为一方 Agent 随 Memoh 提供，与 Codex、Claude Code 并列。在 Bot 的 **Agent** 标签页添加它，然后用 Grok 账号登录，或者填入 xAI API Key。

Grok Build 的内置工具遵循它自己的权限模式：**每次询问**（默认，执行有副作用的操作前先确认）、**自动判断**（由 Grok 判断哪些操作可以安全执行），或 **全部批准**。Grok 账号登录要在 Bot 创建之后、到该 Agent 的设置里进行。详见 [Agents / ACP](./guides/acp.md#grok-build)。

### 在云桌面里复制粘贴、用自己的输入法打字 {#2026-10-19-desktop-input}

文本现在可以在你的电脑和 Bot 的桌面之间双向复制粘贴。本机输入法也能用了：在自己的键盘上用中文、日文或其他语言输入，确认后的文字会直接打到桌面上。macOS 的编辑快捷键在桌面里同样可用。

详见 [Browser / Computer Use](./guides/browser-computer-use.md)。

### 定时任务的会话更清爽 {#2026-10-19-schedule-sessions}

每次运行都新建会话的定时任务，不会再把 **最近** 塞满。在 **日程** 面板里点开任务卡片，就能看到每次运行创建的会话（失败的运行会标出来），点任意一条即可打开。**编辑** 移到了卡片的 **…** 菜单里。

清理也更快了：在会话的菜单里选择 **多选**（也可以右键，手机上长按），勾选任意多个会话，一次删除。

详见 [定时任务](./guides/schedule.md) 和 [会话](./guides/sessions.md)。

### Prompt 缓存命中率大幅提升 {#2026-10-19-cache-hits}

我们修复了两个让长对话命中不了 prompt 缓存的设计缺陷：

- **历史只追加。** 对话超过 10 条消息后，以前各轮的工具调用、工具结果和推理会被剥离，等于改写了 prompt 的开头。现在它们都会保留，Agent 仍能看到之前读过的文件、跑过的命令，不必再重做一遍。
- **记忆不再打断缓存。** 记忆概览在 prompt 里位于整段对话历史之前，以前每轮结束都会重写。现在记忆仍然立即保存，概览则改到缓存冷的时候刷新，落后超过 30 分钟时强制刷新。

缓存命中率因此大幅提升。

[查看 v0.22.0 完整更新日志 →](https://github.com/felinics/Memoh/releases/tag/v0.22.0)
