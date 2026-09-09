# Video Generation Providers

Memoh bots can generate videos through the `generate_video` tool. To enable it you need two things:

1. A **video provider** with at least one video model, configured under **Settings → Integrations → Video**.
2. A **Video Generation Model** assigned to the bot under **Bot Settings → Multimedia**.

If a bot has no video model assigned, the `generate_video` tool is simply not offered to it.

---

## Supported Providers

| Provider | Client Type | Default Base URL |
|----------|-------------|------------------|
| **OpenRouter** | `openrouter-video` | `https://openrouter.ai/api` |
| **ModelArk (BytePlus)** | `modelark-video` | `https://ark.ap-southeast.bytepluses.com/api/v3` |
| **Volcengine (Ark)** | `volcengine-video` | `https://ark.cn-beijing.volces.com/api/v3` |

Each provider needs an **API Key**; **Base URL** is optional and falls back to the default above.

The bundled templates ship with current Seedance / Veo / Doubao-Seedance model presets:

- **OpenRouter**: `bytedance/seedance-2.0`, `google/veo-3.1-fast`, `google/veo-3.1-lite`
- **ModelArk**: `dreamina-seedance-2-0-260128`, `dreamina-seedance-2-0-fast-260128`, `dreamina-seedance-2-5`
- **Volcengine**: `doubao-seedance-2-0-260128`, `doubao-seedance-2-0-fast-260128`, `doubao-seedance-2-5`

OpenRouter also supports **Import Models** from its live catalog. ModelArk and Volcengine do not expose a remote list, so their models come from the template or manual entry.

---

## Setup

1. Open **Settings → Integrations → Video**.
2. Add a provider from the template list (OpenRouter, ModelArk, or Volcengine).
3. Fill in the API key, adjust the base URL only if you use a non-default endpoint, and save.
4. Check the **Video Models** section: import from the provider or add a model manually if the list is empty.
5. Open the bot's **Settings → Multimedia** and pick a **Video Generation Model**.

---

## How the Bot Uses It

Ask the bot for a video in plain language. Under the hood:

- `generate_video` starts a **background task** and returns immediately with a task ID; generation usually takes minutes, and the bot checks progress with its background-task tools.
- The tool accepts a text `prompt` plus optional `duration_seconds`, `resolution` (such as `720p`/`1080p`), `aspect_ratio` (such as `16:9`, `9:16`, `1:1`), provider-specific `size`, and `generate_audio`.
- The finished video is downloaded into the bot workspace under `/data/generated-videos/<task_id>.mp4` (`.webm`/`.mov` depending on the provider output).
- The video is **not sent anywhere automatically** — the bot delivers it as a message attachment, and you can also grab it from the workspace **Files** tab.

If the workspace is unreachable when generation finishes, the task still completes with a warning and the provider's output URL, but nothing is saved to disk.

---

## Related Pages

- [Providers And Models](./llm.md)
- [Bot Workspace Management](../../guides/container.md)
