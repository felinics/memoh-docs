# 和 Bot 协作

[快速开始](./quick-start.md) 解决的是把 Bot 跑起来；这一页讲的是怎么用好它——什么任务适合交出去、请求怎么说、规则放在哪、什么时候该拆成两个 Bot——后半部分是配置参考：创建 Bot 和详情页每个 tab 的字段。

## 什么样的任务适合交给 Bot

同时满足三个条件的任务，交给 Bot 最合适：

- **结果清楚。** 你说得出做完之后应该存在什么——一份文件、一条消息、一张表。
- **来源够得着。** 涉及的文件、网站或对话是它真能访问到的：已上传进工作区、已接入的渠道或服务、或者是公开内容。
- **产出好检查。** 你一眼能看出结果对不对，复查的成本才低。

三条都满足，也还是从只读开始：先让它读和整理，检查几次产出，再逐步放权。[使用场景](./use-cases.md) 里的每个示例都是这么起步的。

## 把请求说清楚

一个好的请求会回答五个问题——结果、来源、约束、形式、确认点。那张表在 [快速开始](./quick-start.md#第-4-步-交给它第一个任务)；这里看两组实际对比。

::: warning 含糊
> 帮我盯着科技新闻，有意思的发给我。
:::

没有来源（哪些网站、哪些仓库？），没有送达时间，「有意思」还是一个替你做的主观判断。每期简报都在碰运气。

**改成：**

::: tip 具体
> 每个工作日早上 8 点，汇总我关注的这几个仓库过去 24 小时的 release 和重要 issue，整理成一条简报发给我。每条信息注明来源，不确定的内容直接说不确定，不要编造。
:::

::: warning 含糊
> 把这个表格清理一下。
:::

「清理」没有定义：哪些行算脏数据、原文件能不能动、最后要交回什么？Bot 动手之前得连猜三次。

**改成：**

::: tip 具体
> 把我刚上传的 CSV 里 email 列为空的行全部删掉。给我清洗后的文件，并告诉我删了多少行。不要修改原文件。
:::

两处改写的共同点：点名来源、限定动作、让结果一眼可验。

## 长期规则放哪

两类指令，两个去处：

- **长期规则** 写进 Bot 详情页的指令里——角色、格式标准、常设约束。之后每一次会话都生效。
- **一次性要求** 写在消息里——今天这份文件、这周的例外。

一条纠正值得长期生效时，就把它升级：改写成持久规则，挪进指令，做法见 [快速开始](./quick-start.md#第-7-步-复盘-然后固化下来) 第 7 步。整套流程反复出现时，存成 [技能](./skills.md)，一句话就能唤起；希望 Bot 自己记得的偏好，交给 [长期记忆](./memory.md)。

## 什么时候拆成多个 Bot

一个 Bot 负责一件事。职责单一的 Bot 积累的上下文会持续帮到它；什么都干的 Bot 会稀释自己的指令和记忆。[快速开始](./quick-start.md) 和 [概览](./overview.md) 都讲过这一点，这里只补一个实用判断：新需求的受众不同、来源不同，或者需要的权限不同，就该新建第二个 Bot。

每个 Bot 都有独立的工作区、记忆、渠道和权限边界，互相看不见对方。拆开也让权限更诚实——只读 release 动态的那个 Bot，永远不需要执行命令的权利。

## 审批习惯

任务需要哪一级就给哪一级——工作区权限从聊天、读文件、写文件、执行命令到管理逐级授予，见 [访问控制](./access.md)。

实际操作：

1. 新流程从只读开始，写入和执行类工具调用留在审批后面。
2. 检查过前几次运行，再考虑放宽。
3. 会离开工作区的动作——给别人发消息、任何对外操作——即使流程已经很熟，也继续留在审批后面。

这和 [使用场景](./use-cases.md#从示例到日常使用) 的检查清单是同一条路：多批几次请求，远比撤销一次写错便宜。

---

## 创建

1. 侧栏进入 **Bots**。
2. 点 **Create Bot**。
3. 基本信息：
   - **Display Name**：对外的名字
   - **Avatar**：头像 URL
   - **Timezone**：可空；不填则继承用户或系统时区
   - **ACL Preset**：如 `allow_all`（默认放行）、`private_only`（仅私聊）等快捷策略
4. 创建。

---

## 详情页

点卡片进 **详情**，各 tab 管不同事：

| Tab | 内容 |
|-----|------|
| **Overview** | workspace runtime、库、渠道、记忆等健康检查 |
| **General** | 主模型/标题/生图、记忆/搜索/TTS 绑定、时区、语言、推理、危险区 |
| **Desktop** | Workspace display runtime、有头浏览器、实时 display session |
| **Workspace** | 容器型 workspace 起停、快照、导入导出 |
| **Network** | Workspace 网络与 overlay provider 状态/动作 |
| **Memory** | 浏览、搜、建、改、压记忆 |
| **Platforms** | 各消息渠道（Telegram、Discord、飞书等） |
| **Access** | ACL 与默认通过/拒绝 |
| **Tool Approval** | 需要人类确认的工具审批设置 |
| **Agents** | 可为聊天 workspace 启用的 ACP 兼容编码智能体，如 Codex、Claude Code |
| **Connectors** | 经 Connect-It 连接的第三方服务（OAuth 或 API Key）：状态、启停、重新授权、断开 |
| **Hooks** | 保存在 `/data/.memoh/hooks.json` 的 Bot 自动化规则 |
| **MCP** | 连接（Stdio/Remote/OAuth） |
| **Compaction** | 会话压缩设置与记录 |
| **Schedule** | cron 与日志 |
| **Skills** | 技能 Markdown |

Files、Terminal 以及桌面 / 浏览器面板在聊天的 workspace 区域里同样可用——想不离开对话就查看文件、跑 shell、盯着 Bot 的浏览器和桌面时，用聊天里的 workspace 侧栏。

---

## 核心先配什么

1. 打开 Bot **General**，先管模型与各类绑定。
2. **Schedule** 管周期性自主任务。
3. **Compaction** 管会话写不长时的压缩。
4. **Access** 在 ACL 预设之后细调。

若这些资源还没有，先建好：

- [模型服务商与模型](../integrations/providers/llm.md)
- [内置记忆提供方](../integrations/providers/memory/builtin.md)（如用）
- [搜索提供方](../integrations/providers/web-search.md)
- [TTS：Edge](../integrations/providers/tts/edge.md)
- [Agents / ACP](./acp.md)

---

## General 字段

| 字段 | 说明 |
|------|------|
| **Chat Model** | 主对话模型 |
| **Title Model** | 可选，生成会话标题 |
| **Image Generation Model** | 可选，需带 `image-output` 的聊天模型 |
| **Memory Provider** | 长期记忆后端；内置类型还可自带记忆/向量模型 |
| **Search Provider** | 联网搜索用哪家 |
| **TTS Model** | 来自 TTS 提供方流程，不在普通 chat 模型服务商里选 |
| **Timezone** | 不填则用户时区再落到系统 |
| **Language** | Bot 主用语 |
| **Reasoning Effort** | 当前 chat 模型有 `reasoning` 时可用；可选值随模型而定（如 `low` / `medium` / `high`） |

注意：

- **生图模型** 故意与主聊天模型分开，好单独换「更擅长出图」的。
- **TTS** 用 [TTS 提供方](../integrations/providers/tts/edge.md) 所配置语音提供方的 `speech` 模型。
- 所选聊天模型的 `context_window` 会影响会话状态展示和 [会话压缩](./compaction.md)。

---

## Compaction 相关（此处指「会话」）

这里说的是 **当前会话** 的上下文压短，不是改记忆条目的那种。

| 字段 | 说明 |
|------|------|
| **Compaction Enabled** | 是否自动在会话里压摘要 |
| **Compaction Threshold** | 触发的估算 token 阈值 |
| **Compaction Ratio** | 压多狠 |
| **Compaction Model** | 可选，专门做摘要的模型 |

细节见 [会话上下文压缩](./compaction.md)。

---

## 访问与 ACL

创建时先给一个 **ACL 预设**，之后在 **Access** 里微调。**预设** 给一版默认策略，**Default Effect** 管「没命中规则时」放行还是挡。

[会话](./sessions.md) 与 Discuss 的默认行为在那一页。若你用 API/自动化，配置里还可能有 `discuss_probe_model_id` 等进阶项，日常创建不必先动。

---

## Workspace 文件与终端

Workspace 文件和终端在聊天 workspace UI 里使用；前提是该 Bot 有可用的 workspace runtime。这里可以：

- 浏览、编辑 workspace 文件
- 打开 workspace 内的终端会话
- 在开启 display 后使用浏览器/桌面相关工具

文件流程见 [文件](./files.md)，有头浏览器和桌面操作见 [Browser / Computer Use](./browser-computer-use.md)。

---

## 删除

**General** 最下 **Danger Zone** -> **Delete Bot**，会删掉该 Bot 相关数据（含 workspace 文件与记忆等），**不可恢复**。
