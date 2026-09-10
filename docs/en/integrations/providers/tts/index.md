# TTS Providers

Memoh supports **Text-to-Speech (TTS)** so bots can synthesize spoken audio from text. The TTS system is organized into three layers:

- **TTS Provider**: A service type (e.g. Edge TTS). You create named provider instances from the TTS Providers page.
- **TTS Model**: A specific voice/model under a provider (e.g. `edge-read-aloud`). Models have configurable voice, format, speed, and pitch settings.
- **Bot Assignment**: In Bot Settings, select a TTS Model. The bot can then synthesize speech in conversations.

---

## Basic Flow

1. Navigate to the **TTS Providers** page from the sidebar.
2. Click **Add** and select a provider type (e.g. `edge`).
3. Click **Create** — the provider's default model is auto-imported.
4. Click the model to configure voice, format, speed, and pitch.
5. Test synthesis with the built-in test button.
6. Open a bot's **General** tab and select the TTS Model.
7. Save — the bot can now synthesize speech.

---

## Available Speech Providers

| Provider | Description |
|----------|-------------|
| [Edge TTS](./edge.md) | Free, uses Microsoft Edge's public read-aloud API. 256+ voices across 50+ languages. No API key required. |
| OpenAI-compatible speech | Uses OpenAI-compatible speech APIs when configured with a matching provider template and credentials. |
| OpenRouter Speech | Uses OpenRouter speech-capable routes when available to the configured account. |
| ElevenLabs Speech | Uses ElevenLabs text-to-speech models and voices. |
| Deepgram Speech | Uses Deepgram text-to-speech models. |
| MiniMax Speech | Uses MiniMax text-to-speech models. |
| Volcengine Speech | Uses Volcengine speech synthesis models. |
| Alibaba Cloud Speech | Uses Alibaba Cloud speech synthesis models. |
| Microsoft Speech | Uses Microsoft speech synthesis models. |

Exact model, voice, format, and language availability depends on the provider template and upstream account you configure.

Transcription is managed separately from TTS. Memoh also supports transcription provider categories for OpenAI-compatible, OpenRouter, ElevenLabs, Deepgram, and Google speech-to-text workflows.

---

## Next Steps

- To set up the no-key Edge option, continue with [Edge TTS](./edge.md).
- To understand how audio provider client types relate to models, see [Providers And Models](../llm.md).
