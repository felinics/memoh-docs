# 语音（TTS）

Memoh 支持把字变成声音。可以分三层想：

- **TTS Provider**：一种服务类型（如 Edge TTS），在 TTS 页建**具名实例**。
- **TTS Model**：某实例下的具体声音/模型，可配音色、格式、变速、音高。
- **机器人绑定**：在机器人 **General** 里选 TTS Model，之后对话里可朗读。

---

## 一般步骤

1. 侧栏 **TTS Providers**。
2. **Add**，选类型（如 `edge`）。
3. **Create**（常会自动导入默认模型）。
4. 点进模型，调音色、格式等。
5. 用页面试听。
6. 机器人 **General** 里选这个 TTS Model 并保存。

---

## 可用语音合成提供方

| 提供方 | 说明 |
|--------|------|
| [Edge TTS](./edge.md) | 走 Edge 公开朗读接口，无 key，多语音 |
| OpenAI 兼容语音合成 | 使用 OpenAI 兼容的语音合成 API，需要匹配 provider 模板和凭据。 |
| OpenRouter Speech | 使用 OpenRouter 可用的语音合成路线，具体取决于账号能力。 |
| ElevenLabs Speech | 使用 ElevenLabs 语音合成模型和音色。 |
| Deepgram Speech | 使用 Deepgram 语音合成模型。 |
| MiniMax Speech | 使用 MiniMax 语音合成模型。 |
| 火山引擎语音合成 | 使用火山引擎语音合成模型。 |
| 阿里云语音合成 | 使用阿里云语音合成模型。 |
| Microsoft Speech | 使用 Microsoft 语音合成模型。 |

具体模型、音色、格式和语言取决于你配置的 provider 模板与上游账号。

语音转写与 TTS 分开管理。Memoh 也支持 OpenAI 兼容、OpenRouter、ElevenLabs、Deepgram、Google 等语音转写 provider 类别。

---

## 接下来

- 配无 key 的 Edge 选项：[Edge TTS](./edge.md)
- 了解音频 provider client type 与模型关系：[模型服务商与模型](../llm.md)
