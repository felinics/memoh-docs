# 机器人

机器人是 Memoh 里**独立**的智能体：自带 workspace、长期记忆、可配性格，并能通过各 **渠道** 对话、用工具做事。

## 创建

1. 侧栏进入 **Bots**。
2. 点 **Create Bot**。
3. 基本信息：
   - **Display Name**：对外的名字
   - **Avatar**：头像 URL
   - **Timezone**：可空；不填则继承用户或系统时区
   - **ACL Preset**：如 `allow_all` 只给自己用、`private_only` 等快捷策略
4. 创建。

---

## 详情页

点卡片进 **详情**，各 tab 管不同事：

| Tab | 内容 |
|-----|------|
| **Overview** | workspace runtime、库、渠道、记忆等健康检查 |
| **General** | 主模型/标题/生图、记忆/搜索/浏览器/TTS、时区、语言、推理、危险区 |
| **Desktop** | Workspace display runtime、有头浏览器、实时 display session |
| **电脑** | 远程运行时（运行 Memoh runtime 的自有机器），机器人可在其上读写文件、执行命令 |
| **Workspace** | 容器型 workspace 起停、快照、导入导出 |
| **Network** | Workspace 网络与 overlay provider 状态/动作 |
| **Memory** | 浏览、搜、建、改、压记忆 |
| **Platforms** | 各消息渠道（Telegram、Discord、飞书等） |
| **Access** | ACL 与默认通过/拒绝 |
| **Tool Approval** | 需要人类确认的工具审批设置 |
| **Agents** | 可为聊天 workspace 启用的 ACP 兼容编码智能体，如 Codex、Claude Code |
| **Email** | 邮服绑定、发件箱 |
| **Connectors** | 经 Connect-It 连接的第三方服务（OAuth 或 API Key）：状态、启停、重新授权、断开 |
| **Hooks** | 保存在 `/data/.memoh/hooks.json` 的机器人自动化规则 |
| **MCP** | 连接（Stdio/Remote/OAuth） |
| **Compaction** | 会话压缩设置与记录 |
| **Schedule** | cron 与日志 |
| **Skills** | 技能 Markdown |

Files、Terminal、Display、Browser 这些 workspace 工具在聊天 workspace UI 里，不是机器人详情页 tab。要看文件、跑 shell、操作浏览器或桌面，请进入对应聊天里的 workspace 区域。

---

## 核心先配什么

1. 打开机器人 **General**，先管模型与各类绑定。
2. **Schedule** 管周期性自主任务。
3. **Compaction** 管会话写不长时的压缩。
4. **Access** 在 ACL 预设之后细调。

若这些资源还没有，先建好：

- [模型服务商与模型](../integrations/providers/llm.md)
- [内置记忆提供方](../integrations/providers/memory/builtin.md)（如用）
- [搜索提供方](../integrations/providers/web-search.md)
- [TTS 提供方](../integrations/providers/tts/index.md)
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
| **TTS Model** | 来自 TTS 流，不是普通 chat 模型服务商里选 |
| **Timezone** | 不填则用户时区再落到系统 |
| **Language** | 机器人主用语 |
| **Reasoning Effort** | 当前 chat 模型有 `reasoning` 时可用；可选值随模型而定（如 `low` / `medium` / `high`） |

注意：

- **生图模型** 故意与主聊天模型分开，好单独换「更擅长出图」的。
- **TTS** 在 [TTS 提供方](../integrations/providers/tts/index.md) 里用所配置语音提供方的 `speech` 模型。
- `context_window` 会影响状态栏展示和 [会话压缩](./compaction.md) 的体感。

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

Workspace 文件和终端在聊天 workspace UI 里使用；前提是该机器人有可用的 workspace runtime。这里可以：

- 浏览、编辑 workspace 文件
- 打开 workspace 内的终端会话
- 在开启 display 后使用浏览器/桌面相关工具

文件流程见 [文件](./files.md)，有头浏览器和桌面操作见 [Browser / Computer Use](./browser-computer-use.md)。

---

## 删除

**General** 最下 **Danger Zone** -> **Delete Bot**，会删掉该机器人相关数据（含 workspace 文件与记忆等），**不可恢复**。
