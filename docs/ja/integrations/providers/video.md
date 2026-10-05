# 動画生成プロバイダー

Bot は `generate_video` ツールで動画を生成します。これを使うには、次の 2 つが両方とも必要です。

1. **設定 → 統合 → 動画** で、**動画プロバイダー**と動画モデルを少なくとも 1 つ設定する。
2. **Bot 設定 → マルチメディア** で、Bot に**動画生成モデル**を 1 つ選ぶ。

動画モデルが選ばれていない Bot には、そもそも `generate_video` ツール自体が提供されません。

---

## サポートされるプロバイダー

| プロバイダー | Client Type | デフォルト Base URL |
|--------|-------------|---------------|
| **OpenRouter** | `openrouter-video` | `https://openrouter.ai/api` |
| **ModelArk（BytePlus）** | `modelark-video` | `https://ark.ap-southeast.bytepluses.com/api/v3` |
| **Volcengine（Ark）** | `volcengine-video` | `https://ark.cn-beijing.volces.com/api/v3` |

いずれも **API Key** を入力するだけです。**Base URL** は未入力ならデフォルト値が使われます。

テンプレートには、現行の Seedance / Veo / Doubao Seedance のプリセットモデルが含まれています。

- **OpenRouter**：`bytedance/seedance-2.0`、`google/veo-3.1-fast`、`google/veo-3.1-lite`
- **ModelArk**：`dreamina-seedance-2-0-260128`、`dreamina-seedance-2-0-fast-260128`、`dreamina-seedance-2-5`
- **Volcengine**：`doubao-seedance-2-0-260128`、`doubao-seedance-2-0-fast-260128`、`doubao-seedance-2-5`

OpenRouter は **Import Models** でオンラインのモデル一覧を取得できます。ModelArk と Volcengine にはオンライン一覧がないため、モデルはテンプレート由来か手動追加になります。

---

## 設定手順

1. **設定 → 統合 → 動画** を開きます。
2. テンプレート一覧からプロバイダーを追加します（OpenRouter / ModelArk / Volcengine）。
3. API Key を入力します。デフォルト以外のエンドポイントを使う場合のみ Base URL を変更し、保存します。
4. **Video Models** セクションを確認します。一覧が空なら、プロバイダーからインポートするか手動で 1 つ追加します。
5. Bot の **設定 → マルチメディア** で、**動画生成モデル**を選択します。

---

## Bot での使い方

Bot に「◯◯の動画を作って」と普通に話しかけるだけで使えます。裏側では次のことが起きています。

- `generate_video` は**バックグラウンドタスク**で、すぐに task ID を返します。生成には通常数分かかり、Bot はバックグラウンドタスク用のツールで自分で進捗を追います。
- パラメーターは `prompt` のほか、任意の `duration_seconds`、`resolution`（`720p`/`1080p`）、`aspect_ratio`（`16:9`、`9:16`、`1:1`）、プロバイダー固有の `size`、`generate_audio` があります。
- 完成した動画は、Bot のワークスペースの `/data/generated-videos/<task_id>.mp4` にダウンロードされます（プロバイダーの出力によっては `.webm`/`.mov` の場合もあります）。
- 動画が**自動でどこかに送信されることはありません**——Bot がメッセージの添付ファイルとして届けます。ワークスペースの **ファイル** タブから取得することもできます。

生成完了の時点でワークスペースに到達できない場合でも、タスクは完了扱いになります。warning とプロバイダー側の出力 URL が付きますが、ディスクには保存されません。

---

## 関連ページ

- [モデルプロバイダーとモデル](./llm.md)
- [ワークスペース](../../guides/container.md)
