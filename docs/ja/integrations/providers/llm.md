# モデルプロバイダーとモデル

Memoh を日常的に使うには、たいてい次のものを設定します。

- 1 つ以上の**モデルプロバイダー**（上流 API への接続方法）
- その配下の**モデル**
- 読み上げを使うなら **音声合成**（**音声合成** 設定ページを参照）
- 音声をテキストに変換するなら **文字起こし**

チャットと embedding は **Models** ページで管理します。音声合成モデルは TTS のフローで別に扱い、文字起こしモデルは文字起こし設定ページで管理します。

---

## モデルプロバイダーの基本

**モデルプロバイダー**には、ある上流サービスへの接続方法が保存されます。例えば次のとおりです。

- プロトコル（`client_type`）
- 必要な場合の base URL
- API Key や OAuth などの認証情報

よくあるのは OpenAI 互換エンドポイント、Anthropic、Google、Codex、GitHub Copilot などです。

### モデルプロバイダーの新規作成

モデルプロバイダーは現在、**テンプレートカタログ**から作成します。テンプレートには適切な client type、base URL、厳選されたモデル一覧が含まれているので、通常は API Key を入力するだけで済みます。

1. サイドバーから **Models** を開きます。
2. **Add Provider** をクリックし、テンプレート一覧から選びます——まだ設定していないものだけが表示され、検索もできます（ローカライズされたベンダー名でも検索できます）。
3. テンプレートが求める認証情報を入力します。
4. 保存します。モデルプロバイダーとそのプリセットモデルは、保存時に一緒に生成されます。

内蔵テンプレートには OpenAI、Anthropic、Google、OpenRouter、DeepSeek、**Zhipu AI（bigmodel.cn）**、Z.AI、Azure OpenAI、Cerebras、Cloudflare、Fireworks、Perplexity、Together などがあります。**Zhipu AI**（`open.bigmodel.cn`、中国本土アカウント）と **Z.AI**（`api.z.ai`、国際アカウント）は、別のテンプレート・別の key 体系であることに注意してください——key がどちらで発行されたかに合わせて選びます。

合うテンプレートがない場合でも、完全にカスタムなモデルプロバイダーを作成できます。

よく使うフィールド：

| フィールド | 説明 |
|------|------|
| **Name** | 表示名。例: `OpenAI`。 |
| **Client Type** | このモデルプロバイダーが使うプロトコル。 |
| **Base URL** | 一部のプロトコルで必須となるルート URL。 |
| **API Key** | キー認証の場合に入力します。 |

### クライアントタイプ

| Client Type | 主な用途 |
|-------------|----------|
| `openai-responses` | OpenAI Responses スタイル |
| `openai-completions` | Chat Completions 互換 |
| `anthropic-messages` | Anthropic Messages |
| `google-generative-ai` | Google Gemini |
| `openai-codex` | Codex / ChatGPT 系、OAuth |
| `github-copilot` | Copilot、デバイスコード OAuth |
| `edge-speech` | Edge 読み上げ |
| `openai-speech` | OpenAI 互換の音声合成 |
| `openai-transcription` | OpenAI 互換の文字起こし |
| `openrouter-speech` | OpenRouter 音声合成 |
| `openrouter-transcription` | OpenRouter 文字起こし |
| `elevenlabs-speech` | ElevenLabs 音声合成 |
| `elevenlabs-transcription` | ElevenLabs 文字起こし |
| `deepgram-speech` | Deepgram 音声合成 |
| `deepgram-transcription` | Deepgram 文字起こし |
| `minimax-speech` | MiniMax 音声合成 |
| `volcengine-speech` | Volcengine 音声合成 |
| `alibabacloud-speech` | Alibaba Cloud 音声合成 |
| `microsoft-speech` | Microsoft 音声合成 |
| `google-transcription` | Google 文字起こし |

音声合成と文字起こしのタイプは、メインのチャット用には使えません。音声合成は **音声合成** 設定ページ、文字起こしは文字起こし設定ページで設定します。利用できるモデル・ボイス・言語は、provider テンプレートと上流アカウントによって異なります。

---

## OAuth を使うモデルプロバイダー

ほとんどのタイプは通常の API Key を使います。例外は `openai-codex` と `github-copilot` です——どちらも同じフローの**デバイスコード認証**を使い、API Key の入力欄はありません。

1. まずモデルプロバイダーを作成して**保存**します——認証の入り口は、保存済みモデルプロバイダーの詳細パネルにしかありません。
2. **Account** セクションで **Connect** をクリックすると、確認用 URL、ワンタイムのユーザーコード、有効期限のカウントダウンが表示されます。
3. **Copy & Open** をクリックして確認ページでコードを入力すれば、残りは Memoh が自動で完了させます。

> ワンタイムコードは、表示された公式の確認 URL でのみ入力してください——デバイスコードはフィッシングに悪用されることがあります。

接続後はモデルプロバイダー上に現在のアカウントが表示され、**Revoke** で切断できます。

### OpenAI Codex

- タイプは `openai-codex` で、テンプレートは `https://chatgpt.com/backend-api` を指します
- ChatGPT アカウントでサインインします

コーディング寄りで、Codex 系のワークフローを使いたい場合に適しています。

### GitHub Copilot

- タイプは `github-copilot`
- GitHub アカウントでサインインします

すでに Copilot を持っているなら、それを Memoh でも再利用できます。

::: warning アップグレードに関する注意
Copilot の認証情報は以前はユーザー単位で保存されていましたが、現在は Codex と同じく、モデルプロバイダー単位の 1 件になりました。既存のデプロイをアップグレードした後は、Copilot のモデルプロバイダーを**一度再認証**してください。
:::

### マネージドモデルカタログ

2 つの OAuth モデルプロバイダーのモデル一覧は、どちらも上流からリアルタイムに取得される**マネージドカタログ**です（Codex にはそもそも静的なモデル一覧がなく、常にあなたの ChatGPT アカウントで実際に使えるものを反映します）。

- デバイス認証の完了後にカタログは自動同期され、その後もいつでも再インポートできます。
- 上流のカタログから消えたモデルは利用不可としてマークされるだけで、削除はされません。
- 再インポートは増分マージです。新しく検出された機能が補完され、自分のモデル設定は上書きされません。

---

## モデルのインポート

モデルプロバイダーを作成したら、その配下にモデルをインポートしたり手動で追加したりできます。

典型的な流れ：

1. モデルプロバイダーを選択します。
2. モデルカタログを取得できるプロバイダーなら、**Import Models** をクリックします。
3. Memoh に保存したいモデルにチェックを入れます。

上流のモデル ID が分かっている場合は、手動で追加することもできます。

### モデルの有効化スイッチ

モデルプロバイダーの詳細ページではモデルが 1 行ずつ並び、それぞれに**有効化スイッチ**があります。無効にしたモデルは再び有効化できるようこのページに残りますが、すべてのモデルセレクター（Bot 設定、チャット、embedding など）からは表示されなくなります。

デフォルト値は、モデルの追加のされ方によって異なります。

- **手動**で追加したモデルは、デフォルトで有効です。
- **一括インポート**したモデルは、デフォルトで**無効**です——大きなカタログをインポートしてもセレクターがあふれないようにするためで、使いたいものだけ自分で有効にします。

---

## モデルタイプ

| タイプ | 用途 |
|------|------|
| `chat` | 会話、ツール、推論、画像生成など |
| `embedding` | ベクトル化、メモリ検索 |
| `speech` | 読み上げ。TTS で使用 |
| `transcription` | 音声からテキストへの変換。文字起こしで使用 |

**Models** ページで主に管理するのは chat / embedding です。speech は **音声合成** 設定ページ、transcription は文字起こし設定ページで扱います。

---

## チャットモデルで注意すべき項目

| フィールド | 説明 |
|------|------|
| **Model ID** | 上流の実際の id。例: `gpt-4o`。 |
| **Name** | UI に表示される名前。 |
| **Description** | 任意の説明テキスト。モデル一覧ではホバーで表示され、セレクターでは検索対象にもなります。 |
| **Compatibilities** | `vision`、`tool-call`、`image-output`、`reasoning` など。 |
| **Context Window** | おおよそのコンテキスト上限。 |

### 互換性

| フラグ | 意味 |
|------|------|
| `vision` | 画像を入力できる |
| `tool-call` | ツールを呼び出せる |
| `image-output` | 画像を生成できる |
| `reasoning` | 明示的な推論モード／エフォート段階がある |

推論に対応している場合は、`reasoning_efforts`（`none`、`low`…`xhigh` など）を持つこともあります。

### `context_window`

Memoh は次の用途に使います。

- アプリ上で、現在のセッションがどれだけコンテキストを使っているかを計算する
- `/status` などの表示を支える
- 上限に近づいているかを判断する
- いつ [コンテキスト圧縮](../../guides/compaction.md) が必要になるかを決める

未設定でも使えますが、**使用率のパーセンテージ**を正確に表示できなくなります。

### 画像生成モデル

Bot には **Image Generation Model** を個別に割り当てられます。`image-output` を持つ chat モデルである必要があります。必要に応じて、デフォルトのチャットモデルとは分けられます。

---

## Embedding モデル

Embedding モデルは、セマンティックなインデックス作成と検索に使われます。

必須フィールド：

| フィールド | 説明 |
|------|------|
| **Dimensions** | embedding 出力のベクトル次元数。例: `1536`。 |

メモリプロバイダーや、ベクトル検索に依存するあらゆる機能と組み合わせて使います。

---

## 音声合成と文字起こしのモデル

音声合成は **音声合成** 設定ページで設定し、通常の chat モデルプロバイダーのフローとは分かれています。現在の音声合成カテゴリーは次のとおりです。

- Edge：`edge-speech`
- OpenAI 互換：`openai-speech`
- OpenRouter：`openrouter-speech`
- ElevenLabs：`elevenlabs-speech`
- Deepgram：`deepgram-speech`
- MiniMax：`minimax-speech`
- Volcengine：`volcengine-speech`
- Alibaba Cloud：`alibabacloud-speech`
- Microsoft：`microsoft-speech`

文字起こしは文字起こし設定ページで設定します。現在の文字起こしカテゴリーは次のとおりです。

- OpenAI 互換：`openai-transcription`
- OpenRouter：`openrouter-transcription`
- ElevenLabs：`elevenlabs-transcription`
- Deepgram：`deepgram-transcription`
- Google：`google-transcription`

音声系モデルには provider 固有のボイス・フォーマット・話速・ピッチ・言語・認識の設定があり、chat / embedding とは別系統の設定です。

---

## シンプルな考え方

ほとんどの Bot では、いくつかの系統に分けて考えられます。

- **Chat**：日常の会話
- **Embedding**：メモリ
- **Speech / Transcription / 画像生成モデル**：補助的な機能

1 つのモデルに無理やりすべてを任せる必要はありません。

---

## 次のステップ

- チャット・画像生成・メモリ・読み上げなどを Bot に割り当てる：[Bot](../../guides/working-with-bots.md)
- 音声プロバイダーと音声モデルを設定する：**音声合成** 設定ページ
- 音声からテキストへの変換を設定する：クライアントの文字起こし設定ページを開く
