# 视频生成提供方

机器人靠 `generate_video` 工具生成视频。要用上它，两步缺一不可：

1. 在 **设置 → 集成 → Video** 里配好**视频提供方**和至少一个视频模型；
2. 在 **机器人设置 → 多媒体** 里给机器人选一个**视频生成模型**。

没选视频模型的机器人根本不会拿到 `generate_video` 这个工具。

---

## 支持的提供方

| 提供方 | Client Type | 默认 Base URL |
|--------|-------------|---------------|
| **OpenRouter** | `openrouter-video` | `https://openrouter.ai/api` |
| **ModelArk（BytePlus）** | `modelark-video` | `https://ark.ap-southeast.bytepluses.com/api/v3` |
| **火山引擎（Ark）** | `volcengine-video` | `https://ark.cn-beijing.volces.com/api/v3` |

都只要填 **API Key**；**Base URL** 不填就用默认值。

模板里带好了当前的 Seedance / Veo / 豆包 Seedance 预设模型：

- **OpenRouter**：`bytedance/seedance-2.0`、`google/veo-3.1-fast`、`google/veo-3.1-lite`
- **ModelArk**：`dreamina-seedance-2-0-260128`、`dreamina-seedance-2-0-fast-260128`、`dreamina-seedance-2-5`
- **火山引擎**：`doubao-seedance-2-0-260128`、`doubao-seedance-2-0-fast-260128`、`doubao-seedance-2-5`

OpenRouter 支持 **Import Models** 在线拉模型列表；ModelArk 和火山引擎没有在线列表，模型来自模板或手动添加。

---

## 配置步骤

1. 打开 **设置 → 集成 → Video**。
2. 从模板列表里加一个提供方（OpenRouter / ModelArk / 火山引擎）。
3. 填 API Key，非默认接入点才需要改 Base URL，保存。
4. 看 **Video Models** 区：列表空的话从提供方导入或手动加一个。
5. 去机器人 **设置 → 多媒体**，选上**视频生成模型**。

---

## 机器人怎么用

直接跟机器人说"给我生成一个 xx 的视频"就行。背后发生的事：

- `generate_video` 是**后台任务**，立刻返回 task ID；生成通常要几分钟，机器人自己用后台任务工具盯进度。
- 参数除了 `prompt`，还有可选的 `duration_seconds`、`resolution`（`720p`/`1080p`）、`aspect_ratio`（`16:9`、`9:16`、`1:1`）、提供方专属的 `size`、`generate_audio`。
- 成片下载到机器人 workspace 的 `/data/generated-videos/<task_id>.mp4`（也可能是 `.webm`/`.mov`，看提供方输出）。
- 视频**不会自动发出去**——机器人以消息附件形式交付，你也可以去 workspace 的 **Files** tab 拿。

生成完成时如果 workspace 不可达，任务照样算完成，会带 warning 和提供方的输出 URL，只是没存盘。

---

## 相关页面

- [模型服务商与模型](./llm.md)
- [Workspace](../../guides/container.md)
