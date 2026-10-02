# Edge TTS

用 Edge 对外公开的朗读接口做合成：免费、无 API key，提供 256+ 个声音，覆盖 50+ 种语言。

---

## 建提供方

1. **TTS Providers** → **Add**。
2. 类型选 `edge`。
3. **Create**。

创建提供方时会自动导入默认模型 `edge-read-aloud`。

---

## 调模型

点 `edge-read-aloud`：

| 字段 | 说明 |
|------|------|
| **Voice** | 语言 + 声线 id，默认 `en-US-EmmaMultilingualNeural`；共 256+ 个声音、50+ 种语言可选 |
| **Format** | 输出格式：`audio-24khz-48kbitrate-mono-mp3`（默认）、`audio-24khz-96kbitrate-mono-mp3`、`webm-24khz-16bit-mono-opus` |
| **Speed** | 语速：`0.5`、`1.0`（默认）、`2.0`、`3.0` |
| **Pitch** | 音高：`-100` ～ `+100`，默认 `0` |

---

## 绑到 Bot

1. Bot **General** → **TTS Model**
2. 选配好的 Edge 模型
3. 保存

---

## 试听

模型配置页有内置的试合成按钮，绑给 Bot 前先听一遍所选声音、格式、语速、音高的效果。
