# 定时任务

用 **cron 表达式** 在固定时间让 Bot 干一件事：发报告、查外网、维护、或任何能交给智能体＋工具完成的活。

## 是什么

**Schedule** 绑在某个 Bot 上。到点就把一条自然语言 **command** 交给智能体，由它用工具、技能去执行，结果可发到已接好的渠道。

---

## 字段

| 字段 | 说明 |
|------|------|
| **Name** | 展示名，如 `晨间摘要` |
| **Description** | 短说明 |
| **Pattern** | 五段 cron，如 `0 9 * * *` 每天 9:00 |
| **Command** | 到点时发给智能体的自然语言任务 |
| **Enabled** | 是否启用 |
| **Max Calls** | 总执行次数上限，空=不限 |
| **Current Calls** | 已跑次数 |

---

## Cron（五段）

按 Bot 的时区求值——即 Bot **通用** 标签页的 **Timezone** 字段；未设置时回退到服务器顶层 `timezone` 配置（默认 **UTC**）。五段为：分、时、日、月、周。

```
┌ 分 0–59
│ ┌ 时 0–23
│ │ ┌ 日 1–31
│ │ │ ┌ 月 1–12
│ │ │ │ ┌ 周 0–6，周日=0
* * * * *
```

| Pattern | 含义 |
|---------|------|
| `0 9 * * *` | 每天 9:00 |
| `*/30 * * * *` | 每 30 分钟 |
| `0 0 * * 1` | 每周一 0:00 |
| `0 8,20 * * *` | 每天 8:00 和 20:00 |
| `0 0 1 * *` | 每月 1 号 0:00 |

---

## 看列表

Bot **Schedule** tab：名、pattern、是否启用、执行次数等；**Refresh** 重载。

---

## 创建

### 让 Bot 自己建

Bot 有 `schedule` 工具。你可以说人话，例如让每个工作日 8:00 汇总仓库动态，它会去拼 cron 并登记。

### 调 API

`POST /api/bots/{bot_id}/schedule`，例如：

```json
{
  "name": "Daily Digest",
  "description": "Summarize repository activity every morning",
  "pattern": "0 8 * * *",
  "command": "Summarize yesterday's repository activity and send the result to Telegram.",
  "enabled": true,
  "max_calls": null
}
```

（字段名以当前 API 为准。）

---

## 执行时发生什么

1. cron 到点
2. `current_calls` +1
3. 若设了 `max_calls` 且到顶，任务自动关
4. 智能体收 `command` 与计划上下文
5. 用工具发消息/搜网页等
6. 结果可发到已连接渠道
