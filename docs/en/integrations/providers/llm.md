# Providers And Models

To use Memoh effectively, you usually configure:

- one or more **providers** that define how Memoh talks to upstream APIs
- one or more **models** under those providers
- optional **speech providers** if you want text-to-speech
- optional **transcription providers** if you want speech-to-text

The Web UI manages chat and embedding providers/models from the **Models** page. Speech models are managed from [TTS Providers](./tts/index.md), and transcription models are managed from the Transcription settings page.

---

## Provider Basics

A **provider** stores connection information for one upstream service, such as:

- the API protocol (`client_type`)
- the base URL if the protocol needs one
- credentials such as an API key or OAuth token

Typical examples include OpenAI-compatible endpoints, Anthropic, Google Gemini, OpenAI Codex, and GitHub Copilot.

### Creating A Provider

Providers are created from a **template catalog**. Each template carries the right client type, base URL, and a curated model list, so you usually only fill in an API key.

1. Open the **Models** page from the settings sidebar.
2. Click **Add Provider** and pick a template — the list only shows templates you have not configured yet, and it is searchable (including localized vendor names).
3. Fill in the credentials the template asks for.
4. Save. The provider and its preset models materialize on save.

Bundled templates include OpenAI, Anthropic, Google, OpenRouter, DeepSeek, **Zhipu AI (bigmodel.cn)**, Z.AI, Azure OpenAI, Cerebras, Cloudflare, Fireworks, Perplexity, Together, and more. Note that **Zhipu AI** (`open.bigmodel.cn`, mainland-China accounts) and **Z.AI** (`api.z.ai`, international accounts) are separate templates with separate API-key namespaces — pick the one matching where your key was issued.

You can still create a fully custom provider when no template fits.

Common fields:

| Field | Description |
|-------|-------------|
| **Name** | Friendly display name, such as `OpenAI` or `Copilot`. |
| **Client Type** | API protocol used by this provider. |
| **Base URL** | Root API endpoint, when required by the selected client type. |
| **API Key** | Token-based authentication, when the client type uses direct credentials. |

### Client Types

Memoh currently supports these client types:

| Client Type | Typical Use |
|-------------|-------------|
| `openai-responses` | OpenAI Responses API style providers |
| `openai-completions` | OpenAI Chat Completions compatible providers |
| `anthropic-messages` | Anthropic Messages API |
| `google-generative-ai` | Google Gemini API |
| `openai-codex` | OpenAI Codex / ChatGPT-backed coding workflow with OAuth |
| `github-copilot` | GitHub Copilot with device OAuth |
| `edge-speech` | Speech provider type for Microsoft Edge Read Aloud |
| `openai-speech` | OpenAI-compatible text-to-speech providers |
| `openai-transcription` | OpenAI-compatible speech-to-text providers |
| `openrouter-speech` | OpenRouter speech providers |
| `openrouter-transcription` | OpenRouter transcription providers |
| `elevenlabs-speech` | ElevenLabs speech providers |
| `elevenlabs-transcription` | ElevenLabs transcription providers |
| `deepgram-speech` | Deepgram speech providers |
| `deepgram-transcription` | Deepgram transcription providers |
| `minimax-speech` | MiniMax speech providers |
| `volcengine-speech` | Volcengine speech providers |
| `alibabacloud-speech` | Alibaba Cloud speech providers |
| `microsoft-speech` | Microsoft speech providers |
| `google-transcription` | Google transcription providers |

Speech and transcription client types are for audio workflows, not for chat. Configure speech through [TTS Providers](./tts/index.md) and transcription through the Transcription settings page. Exact model and voice availability depends on the configured provider template and upstream account.

---

## OAuth-Based Providers

Most provider types use a normal API key. Two notable exceptions are `openai-codex` and `github-copilot`. Both authenticate with **device authorization** through the same flow, and neither shows an API key field:

1. Create and **save** the provider first — authorization is only available from the saved provider's details panel.
2. In the **Account** section, click **Connect**. Memoh shows a verification URL and a one-time user code with an expiry countdown.
3. Click **Copy & Open**, enter the code on the provider's verification page, and Memoh completes authorization automatically.

> Only enter the code on the displayed verification URL — device codes can be used for phishing.

The connected account is shown on the provider afterwards, and **Revoke** disconnects it.

### OpenAI Codex

- Uses the `openai-codex` client type; the bundled template points at `https://chatgpt.com/backend-api`
- Signs in with your ChatGPT account

This is a good fit when you want Codex-style model access for coding-oriented workflows.

### GitHub Copilot

- Uses the `github-copilot` client type
- Signs in with your GitHub account

GitHub Copilot is especially useful if you already have access to Copilot-backed chat and embedding models and want to reuse that access from Memoh.

<scalar-callout type="warning" title="Upgrade note">
Copilot credentials used to be stored per user. They are now a single provider-level credential, the same as Codex. After upgrading an existing deployment, re-authorize the Copilot provider once.
</scalar-callout>

### Managed Model Catalogs

For both OAuth providers, the model list is a **managed catalog** fetched live from the upstream service (Codex has no static model list at all — it always reflects what your ChatGPT account can use):

- The catalog syncs automatically after device authorization, and you can re-import at any time.
- Models that disappear from the upstream catalog are marked unavailable rather than deleted.
- Re-importing is an upsert: newly discovered capabilities are filled in without overwriting your own model configuration.

---

## Importing Models

After creating a provider, you can import or add models under it.

Typical flow:

1. Select the provider.
2. Click **Import Models** if the provider can expose a model catalog.
3. Choose the models you want to save into Memoh.

You can also add models manually when you already know the upstream model ID.

### Enabling Models

Each model row on the provider detail page has an **enable switch**. Disabled models stay visible there for re-enabling, but they disappear from every model picker (bot settings, chat, embedding, and so on).

The defaults differ by how the model was created:

- Models you add **manually** start enabled.
- Models created by **bulk import** start **disabled**, so importing a large catalog does not flood every picker — enable the ones you actually want to expose.

---

## Model Types

Memoh distinguishes four model types:

| Type | Purpose |
|------|---------|
| `chat` | Main LLMs for conversation, tool use, reasoning, and image generation |
| `embedding` | Vector models for memory and retrieval |
| `speech` | Text-to-speech models used by TTS providers |
| `transcription` | Speech-to-text models used by transcription providers |

Important distinction:

- The **Models** page is primarily where you manage `chat` and `embedding` models.
- `speech` models are exposed through [TTS Providers](./tts/index.md).
- `transcription` models are exposed through the Transcription settings page.

---

## Chat Model Configuration

When adding a chat model, the most important fields are:

| Field | Description |
|-------|-------------|
| **Model ID** | Exact upstream identifier, such as `gpt-4o` or `claude-sonnet-4.6`. |
| **Name** | Friendly display name shown in the UI. |
| **Description** | Optional free text shown as a tooltip in model lists and searchable in model pickers. |
| **Compatibilities** | Feature flags such as `vision`, `tool-call`, `image-output`, and `reasoning`. |
| **Context Window** | Approximate maximum context budget for the model. |

### Compatibilities

Memoh uses compatibility flags to decide which features a model can safely power:

| Compatibility | Meaning |
|---------------|---------|
| `vision` | Model can accept images as input |
| `tool-call` | Model can call tools |
| `image-output` | Model can generate images |
| `reasoning` | Model exposes explicit reasoning modes / effort levels |

If a model supports reasoning, it may also declare `reasoning_efforts` such as `none`, `low`, `medium`, `high`, or `xhigh`.

### `context_window`

`context_window` is important because Memoh uses it to:

- calculate session context usage in the Web UI
- power `/status` output
- decide when a session is approaching its prompt limit
- guide [Context Compaction](../../guides/compaction.md)

If you leave `context_window` empty, the model can still be used, but Memoh cannot show an exact usage percentage for that model.

### Image Generation Models

Memoh now lets you assign an **Image Generation Model** to a bot. This model must be a chat model whose compatibilities include `image-output`.

That keeps image generation separate from your default chat model when needed.

---

## Embedding Models

Embedding models are used for semantic indexing and retrieval.

The required field is:

| Field | Description |
|-------|-------------|
| **Dimensions** | Vector size for the embedding output, such as `1536`. |

Use embedding models with memory providers or any feature that relies on vector search.

---

## Speech And Transcription Models

Speech models are managed from [TTS Providers](./tts/index.md), not from the standard chat provider flow.

Current speech provider categories include:

- Edge via `edge-speech`
- OpenAI-compatible via `openai-speech`
- OpenRouter via `openrouter-speech`
- ElevenLabs via `elevenlabs-speech`
- Deepgram via `deepgram-speech`
- MiniMax via `minimax-speech`
- Volcengine via `volcengine-speech`
- Alibaba Cloud via `alibabacloud-speech`
- Microsoft via `microsoft-speech`

Transcription models are managed from the Transcription settings page. Current transcription provider categories include:

- OpenAI-compatible via `openai-transcription`
- OpenRouter via `openrouter-transcription`
- ElevenLabs via `elevenlabs-transcription`
- Deepgram via `deepgram-transcription`
- Google via `google-transcription`

This separation matters because audio models have provider-specific voice, format, speed, pitch, language, and recognition settings that do not apply to chat or embedding models.

---

## Recommended Mental Model

For most bots, think in terms of parallel model roles:

- **Chat model** for normal conversations
- **Embedding model** for memory search
- **Speech / transcription / image models** for side capabilities such as TTS, speech-to-text, and image generation

You do not need to force one model to do everything.

---

## Next Steps

- To assign chat, image, memory, and TTS settings to a bot, see [Bot Management](../../guides/bot.md).
- To configure speech providers and speech models, see [TTS Providers](./tts/index.md).
- To configure speech-to-text, open the Transcription settings page in the Web UI.
