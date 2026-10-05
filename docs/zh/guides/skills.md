# 技能

**技能（Skill）**是可复用的提示模块，用来教 Bot 一套固定做法：语气、流程、工具使用习惯。技能没有单独的管理界面——它就是工作区里的文件，放对目录就会被加载。

::: tip 限制
一次会话最多同时请求 5 个技能；单个技能注入上限 64 KiB，合计上限 256 KiB。这些上限不可配置。
:::

## 长什么样

一个技能是一个目录，里面放一份带 YAML 头的 `SKILL.md`，至少要有稳定的 `name` 和短 `description`。正文就是真正注入给 Agent 的说明：

```yaml
---
name: coder-skill
description: Enables advanced coding workflows and tool usage.
---

# Coder Skill

你写清楚代码、说明取舍，该用文件/命令工具时就用。
```

名字用简单 ASCII（如 `coder-skill`、`research`），别带空格——它同时也是目录名。

## 放到哪个目录

自己写的技能，放进 Bot 工作区的这个目录：

```text
/data/skills/user/personal/<技能名>/SKILL.md
```

怎么放都行：在 Bot 的 **文件** 标签页里直接建目录写文件，在 **终端** 里操作，或者干脆让 Bot 自己建——工作区自带一个 `skill-creator` 技能，描述清楚你要的流程，它会把文件写到正确的位置。

其它目录你会见到，但**不该手动往里放东西**：

| 目录 | 归谁管 |
|------|--------|
| `/data/skills/user/personal/` | **你**。手写技能都放这里 |
| `/data/skills/<registry>/<app>/` | [应用](./supermarket.md)。随 App 安装、更新、卸载，别手改 |
| `/data/.memoh/skills/` | 工作区模板的内置技能（如 `skill-creator`）。每次工作区初始化都会刷成模板版本，改了也会被覆盖；要定制就换个名字复制到自己的目录 |
| `/data/.skills/`、`/data/.agents/skills/` | 旧版兼容路径，仅作发现，不要新增 |

## 同名怎么办

**技能名就是身份**：同名技能不管来自几个目录，同一时刻只有一份生效。你自己目录里的同名技能会盖过旧版兼容路径里的那份。想换掉某个 App 技能的行为，别去改它的文件——用一个新名字写你的版本。

## 建议

1. 先少而精，`name` 和 `description` 写清楚——Agent 靠描述决定要不要加载它。
2. 重复出现的流程才值得固化成技能；一次性的要求直接说就行。
3. 能复用就从[应用市场](./supermarket.md)装，少复制粘贴多份。
