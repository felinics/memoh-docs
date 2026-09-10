# 模型服务商与模型

日常用 Memoh，多半要配好：

- 一个或多个 **模型服务商**（怎么连上游 API）
- 其下的 **模型**
- 若要朗读，再配 **语音合成**（见 [TTS](./tts/index.md)）
- 若要把语音转文字，再配 **语音转写**

聊天与 embedding 在 **Models** 页管理；语音合成模型在 TTS 流程里单走，语音转写模型在 Transcription 设置页管理。

---

## 模型服务商基础

**模型服务商**里存的是某一类上游的连法，例如：

- 协议（`client_type`）
- 需要时的 base URL
- API Key 或 OAuth 等凭据

常见有 OpenAI 兼容站、Anthropic、Google、Codex、GitHub Copilot 等。

### 新建模型服务商

模型服务商现在从**模板目录**建。模板自带对的 client type、base URL 和一份精选模型清单，通常你只需要填个 API Key。

1. 侧栏打开 **Models**。
2. 点 **Add Provider**，从模板列表挑——只显示你还没配过的，可搜索（中文厂商名也能搜到）。
3. 填模板要的凭据。
4. 保存。模型服务商和它的预置模型在保存时一起生成。

内置模板包括 OpenAI、Anthropic、Google、OpenRouter、DeepSeek、**智谱 AI（bigmodel.cn）**、Z.AI、Azure OpenAI、Cerebras、Cloudflare、Fireworks、Perplexity、Together 等。注意**智谱 AI**（`open.bigmodel.cn`，国内账号）和 **Z.AI**（`api.z.ai`，国际账号）是两个模板、两套 key 体系——按你的 key 是哪边发的来选。

没有合适模板时，仍可以建全自定义模型服务商。

常用字段：

| 字段 | 说明 |
|------|------|
| **Name** | 展示名，如 `OpenAI`。 |
| **Client Type** | 本模型服务商用的协议。 |
| **Base URL** | 部分协议必填的根地址。 |
| **API Key** | 走密钥时填。 |

### 客户端类型

| Client Type | 常见用途 |
|-------------|----------|
| `openai-responses` | OpenAI Responses 风格 |
| `openai-completions` | Chat Completions 兼容 |
| `anthropic-messages` | Anthropic Messages |
| `google-generative-ai` | Google Gemini |
| `openai-codex` | Codex / ChatGPT 那套，OAuth |
| `github-copilot` | Copilot，设备码 OAuth |
| `edge-speech` | Edge 朗读 |
| `openai-speech` | OpenAI 兼容语音合成 |
| `openai-transcription` | OpenAI 兼容语音转写 |
| `openrouter-speech` | OpenRouter 语音合成 |
| `openrouter-transcription` | OpenRouter 语音转写 |
| `elevenlabs-speech` | ElevenLabs 语音合成 |
| `elevenlabs-transcription` | ElevenLabs 语音转写 |
| `deepgram-speech` | Deepgram 语音合成 |
| `deepgram-transcription` | Deepgram 语音转写 |
| `minimax-speech` | MiniMax 语音合成 |
| `volcengine-speech` | 火山引擎语音合成 |
| `alibabacloud-speech` | 阿里云语音合成 |
| `microsoft-speech` | Microsoft 语音合成 |
| `google-transcription` | Google 语音转写 |

语音合成与语音转写类型不能当主聊天用。语音合成走 [TTS 提供方](./tts/index.md)，语音转写走 Transcription 设置页。具体模型、音色和语言取决于 provider 模板与上游账号。

---

## 走 OAuth 的模型服务商

多数类型用普通 API Key。`openai-codex` 和 `github-copilot` 例外——两个都走**设备码授权**，同一套流程，都没有 API Key 输入框：

1. 先建好并**保存**模型服务商——授权入口只在已保存模型服务商的详情面板里。
2. **Account** 区点 **Connect**，界面给出验证 URL、一次性用户码和过期倒计时。
3. 点 **Copy & Open**，去验证页输码，Memoh 自动完成收尾。

> 一次性码只在显示的官方验证 URL 上输——设备码可能被用于钓鱼。

连上后模型服务商上会显示当前账号，**Revoke** 断开。

### OpenAI Codex

- 类型 `openai-codex`，模板指向 `https://chatgpt.com/backend-api`
- 用 ChatGPT 账号登录

偏写代码、走 Codex 那套时合适。

### GitHub Copilot

- 类型 `github-copilot`
- 用 GitHub 账号登录

你本来就有 Copilot 时，可复用进 Memoh。

<scalar-callout type="warning" title="升级提醒">
Copilot 凭据以前按用户存，现在和 Codex 一样是模型服务商级的一份。老部署升级后要把 Copilot 模型服务商**重新授权一次**。
</scalar-callout>

### 托管模型目录

两个 OAuth 模型服务商的模型列表都是**托管目录**，从上游实时拉取（Codex 干脆没有静态清单，永远反映你 ChatGPT 账号实际能用什么）：

- 设备授权完成后目录自动同步，之后也可以随时重新导入。
- 上游目录里消失的模型标记为不可用，不会被删。
- 重复导入是增量合并：补上新发现的能力，不覆盖你自己的模型配置。

---

## 导入模型

建完模型服务商后可以导入或手加模型。常见：选中模型服务商 → **Import Models**（若上游有目录）→ 勾要保存的。已知上游 id 时也可手填。

### 模型启用开关

模型服务商详情页里每个模型一行，各带**启用开关**。禁用的模型仍留在这页方便再开，但会从所有模型选择器（机器人设置、聊天、embedding 等）里消失。

默认值看模型怎么来的：

- **手动**添加的模型默认启用。
- **批量导入**的模型默认**禁用**——导一大目录不至于把每个选择器刷爆，要用哪个自己开哪个。

---

## 模型类型

| 类型 | 用途 |
|------|------|
| `chat` | 对话、工具、推理、文生图等 |
| `embedding` | 向量化、记忆检索 |
| `speech` | 朗读，挂在 TTS |
| `transcription` | 语音转文字，挂在 Transcription |

**Models** 页主要管 chat / embedding；speech 在 [TTS](./tts/index.md)，transcription 在 Transcription 设置页。

---

## 聊天模型上要注意的项

| 字段 | 说明 |
|------|------|
| **Model ID** | 上游真实 id，如 `gpt-4o`。 |
| **Name** | 界面展示名。 |
| **Description** | 可选说明文字，模型列表里悬停可见，选择器里还能按它搜。 |
| **Compatibilities** | 如 `vision`、`tool-call`、`image-output`、`reasoning`。 |
| **Context Window** | 粗算上下文上限。 |

### 兼容性

| 标记 | 含义 |
|------|------|
| `vision` | 能吃图 |
| `tool-call` | 能调工具 |
| `image-output` | 能出图 |
| `reasoning` | 有显式推理/档位 |

有推理时可能还带 `reasoning_efforts`：`none`、`low`…`xhigh` 等。

### `context_window`

Memoh 用来：

- 在网页上算当前会话占了多少上下文
- 驱动 `/status` 等
- 判断是否逼近上限
- 决定何时需要 [会话上下文压缩](../../guides/compaction.md)

不填也能用，但**百分比**会没法精确给。

### 文生图模型

机器人上可单挂 **Image Generation Model**，须是带 `image-output` 的 chat 模型。需要时与默认聊天模型分开。

---

## Embedding 模型

给语义索引用。必填如 **Dimensions**（向量维数，如 1536）。和记忆或其它向量检索能力绑在一起用。

---

## 语音合成与转写模型

语音合成在 [TTS 提供方](./tts/index.md) 配，不跟普通 chat 模型服务商混流。当前语音合成类别包括：

- Edge：`edge-speech`
- OpenAI 兼容：`openai-speech`
- OpenRouter：`openrouter-speech`
- ElevenLabs：`elevenlabs-speech`
- Deepgram：`deepgram-speech`
- MiniMax：`minimax-speech`
- 火山引擎：`volcengine-speech`
- 阿里云：`alibabacloud-speech`
- Microsoft：`microsoft-speech`

语音转写在 Transcription 设置页配。当前语音转写类别包括：

- OpenAI 兼容：`openai-transcription`
- OpenRouter：`openrouter-transcription`
- ElevenLabs：`elevenlabs-transcription`
- Deepgram：`deepgram-transcription`
- Google：`google-transcription`

音频模型有 provider 专属的音色、格式、语速、音高、语言和识别设置，和 chat/embedding 不是一路设置。

---

## 怎么记省事

对多数机器人，可以分几条线想：

- **Chat**：日常说人话
- **Embedding**：记忆
- **Speech / Transcription / 生图模型**：边能力

不必强行一模型全包。

---

## 接下来

- 给机器人绑聊天、生图、浏览器、记忆、朗读等：[机器人](../../guides/bot.md)
- 配语音提供方与语音模型：[TTS 提供方](./tts/index.md)
- 配语音转文字：打开 Web UI 的 Transcription 设置页
