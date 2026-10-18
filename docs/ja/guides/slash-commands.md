# スラッシュコマンド

Memoh は **スラッシュコマンド** に対応しています。コマンドは LLM に届く前にインターセプトされ、ステータスの確認、設定の変更、モデルの切り替え、セッションの作成、生成の停止などを手早く行えます。外部チャネルでも内蔵のウェブチャットでも使えます。**コマンドの解析自体にモデルの token は基本的に消費されません**（実際に会話へ入る内容とは別の話です）。

---

## コマンドの形

ほとんどのコマンドは「リソース / アクション / 引数」の形をとります。

```text
/resource [action] [arguments...]
```

例：

```text
/schedule list
/model current
/schedule create morning-news "0 9 * * *" "Send a daily summary"
```

ポイント：

- **resource** はグループです。`schedule`、`model`、`status` など。
- **action** は具体的なサブコマンドです。`list`、`get`、`set` など。
- **arguments** は action の後ろに置きます。スペースを含む値は引用符で囲みます。
- グループによっては**デフォルトアクション**があります。たとえば `/settings` は `/settings get` と、`/status` は `/status show` と同じです。

このほかに **トップレベル** のコマンドが 2 つあります。

- `/new`：現在の会話ルートに新しいセッションを開く
- `/stop`：現在のスレッドで進行中の生成を止める

---

## スキルの起動とクイックアクション

固定コマンドのほかに、スラッシュで Bot の [スキル](./skills.md) を必要なときに起動できます。

```text
/<スキル名> [任意のプロンプト]
```

- **ウェブのコンポーザー** で `/` を入力するとパネルが開きます。**クイックアクション**（`/help`、`/skill list`、`/new`、`/compact`、`/model`）に加えて、Bot のスキル一覧が表示されます。選んだスキルは取り外せるチップになります。上の形式を直接打ち込んでもかまいません。
- **IM チャネル** でも同じ `/<スキル名>` の形が使えます。`/skill list` はタップできるボタンとして表示されます。
- 起動したスキルの内容が注入されるのは**現在のターンだけ**です。履歴にも、セッションタイトルにも、メモリにも残りません。

スキル名は送信のたびに、Bot で現在有効なスキルカタログに対して**サーバー側**で解決されます。コマンドやスキルのように見えてどちらにも一致しないスラッシュ入力は、モデルに流れることなく明確なエラーになります。先頭が `/` なだけの普通のテキスト（パスや URL）は、これまでどおりチャットとして扱われます。

制限が 2 つあります。

- スキル起動のメッセージには添付ファイルを付けられません（固定コマンドは添付ファイル付きでもそのまま実行されます）。
- グループチャットでは、Bot に向けられていないスラッシュメッセージは黙って無視されます。

## 組み込みヘルプ

| コマンド | 内容 |
|------|------|
| `/help` | トップレベルのコマンド一覧 |
| `/help <group>` | グループ内にどんな action があるか |
| `/help <group> <action>` | 特定の action の使い方 |

```text
/help
/help model
/help model set
```

**現在のバージョン** が実際にどのコマンドに対応しているかを調べる、いちばん速い方法です。

---

## 解析ルール

- グループでは **@Bot プレフィックス** が使えます。例：`@BotName /help`。
- **Telegram** では bot サフィックスを付けられます。例：`/help@MemohBot`。
- 引用符で囲むと 1 つの引数として扱われます。例：

```text
/schedule create morning-news "0 9 * * *" "Send today's top stories"
```

行全体が既知のコマンドに**一致しない**場合は、スラッシュコマンドではなく普通のチャットとして送られます。

---

## 権限

読み取り系は、Bot と話せる人なら基本的に使えます。  
`set`、`create`、`update`、`delete`、`enable`、`disable` などの書き込み操作の多くは **owner** が必要です。

`/help` の出力では、owner 専用のものに `[owner]` が付きます。

---

## クイックリファレンス

### トップレベル

| コマンド | 説明 |
|------|------|
| `/help` | ヘルプ |
| `/new`（任意で `chat` / `discuss`） | 新しいセッション |
| `/stop` | 進行中の生成を停止 |

### リソースグループ

| グループ | 説明 | デフォルトアクション |
|----|------|----------|
| `/schedule` | スケジュールタスク | なし |
| `/mcp` | MCP 接続の確認 | なし |
| `/settings` | Bot の設定 | `get` |
| `/model` | チャットモデル | なし |
| `/memory` | メモリプロバイダー | なし |
| `/search` | ウェブ検索プロバイダー | なし |
| `/usage` | token 使用量 | `summary` |
| `/email` | メールプロバイダー、バインディング、送信トレイ | なし |
| `/skill` | スキル一覧 | `list` |
| `/fs` | ワークスペースのファイル | なし |
| `/status` | セッションのメッセージ/コンテキスト/キャッシュ | `show` |
| `/access` | アイデンティティと ACL | `show` |
| `/compact` | **セッション** のコンテキスト圧縮を即時実行 | `run` |
| `/context` | 現在のセッションのコンテキストウィンドウ使用量 | `show` |
| `/reasoning`（エイリアス `/reason`、`/effort`、`/think`） | このセッションの推論レベルを表示・設定 | `show` |
| `/language` | コマンド UI の言語を表示・設定（`auto`、`en`、`zh`、`ja`） | `show` |
| `/link <code>` | アプリで生成したコードで、現在のチャネルアカウントを Memoh ユーザーに紐付け | `consume` |

---

## セッション系コマンド

### `/new`

**現在の会話ルート** に新しいセッションを開きます。古い履歴は残ったまま、新しい現在のコンテキストに切り替わるだけです。

- `/new`：現在の場面のデフォルトタイプで作成
- `/new chat`：chat を強制
- `/new discuss`：discuss を強制

デフォルトでは、内蔵ウェブチャットは多くが `chat`、ダイレクトメッセージは多くが `chat`、外部チャネルのグループは多くが `discuss` です。

**内蔵のウェブチャット** に `/new discuss` はありません。discuss を使うには Telegram や Discord などを使ってください。

詳細は [セッション](./sessions.md) を参照してください。

### `/stop`

**現在のスレッド** で進行中の生成を止めます。ストリーミングの内容がもう十分なとき、ツールの処理が長引きすぎているとき、次の発言の前に割り込みたいときに向いています。

---

## ステータスと調査

### `/status`

現在のセッションレベルの情報です。メッセージ数、コンテキスト使用量、キャッシュヒット、読み書き token、このスレッドで使ったスキルなど。

| アクション | 使い方 |
|------|------|
| `show` | `/status` または `/status show`。現在のルートが対象 |
| `latest` | 現在のルートにアクティブなセッションがないとき、**その Bot の最新** セッションを見るのに使う |

### `/access`

現在のチャネルアイデンティティ、紐付いたユーザー、ロール、書き込みコマンドの可否、チャネル/会話/thread のスコープ、ACL の評価結果を表示します。紐付けや ACL、書き込みコマンドが拒否された理由を調べるときに使います。

```text
/access
```

### `/usage`

直近 7 日間の token 使用量です。

| アクション | 使い方 |
|------|------|
| `summary` | `/usage` または `/usage summary` |
| `by-model` | `/usage by-model` |


### `/email`

現在の Bot のメールプロバイダー、バインディング、送信トレイです。

| アクション | 使い方 |
|------|------|
| `providers` | `/email providers` |
| `bindings` | `/email bindings` |
| `outbox` | `/email outbox` |

---

## 設定系コマンド

### `/settings`

| アクション | 使い方 | 権限 |
|------|------|------|
| `get` | `/settings` または `/settings get` | 全員 |
| `update` | `/settings update [options]` | Owner |

`update` の主なオプション：

| オプション | 説明 |
|------|------|
| `--language` | `en`、`zh` など |
| `--acl_default_effect` | `allow` / `deny` |
| `--reasoning_effort` | `low` / `medium` / `high` / `xhigh` などのレベル。実際に使える値は、選択中のモデルが宣言している reasoning efforts によります |
| `--chat_model_id` | チャットモデルの UUID |

```text
/settings update --language en --reasoning_effort high
```

### `/model`

| アクション | 使い方 | 権限 |
|------|------|------|
| `list [provider_name]` | `/model list` | 全員 |
| `current` | `/model current` | 全員 |
| `set` | `/model set <model_id>` または `/model set <provider_name> <model_name>` | Owner |

```text
/model list
/model list OpenAI
/model current
/model set gpt-4o
/model set OpenAI gpt-4o
```

### `/memory`

| アクション | 使い方 | 権限 |
|------|------|------|
| `list` | `/memory list` | 全員 |
| `current` | `/memory current` | 全員 |
| `set` | `/memory set <name>` | Owner |

### `/search`

| アクション | 使い方 | 権限 |
|------|------|------|
| `list` | `/search list` | 全員 |
| `current` | `/search current` | 全員 |
| `set` | `/search set <name>` | Owner |

### `/mcp`

| アクション | 使い方 | 権限 |
|------|------|------|
| `list` | `/mcp list` | 全員 |
| `get` | `/mcp get <name>` | 全員 |
| `delete` | `/mcp delete <name>` | Owner |

---

## 自動化とファイル

### `/schedule`

| アクション | 使い方 | 権限 |
|------|------|------|
| `list` | `/schedule list` | 全員 |
| `get` | `/schedule get <name>` | 全員 |
| `create` | `/schedule create <name> <pattern> <command>` | Owner |
| `update` | `/schedule update <name> [--pattern P] [--command C]` | Owner |
| `delete` | `/schedule delete <name>` | Owner |
| `enable` | `/schedule enable <name>` | Owner |
| `disable` | `/schedule disable <name>` | Owner |

```text
/schedule list
/schedule create morning-news "0 9 * * *" "Summarize today's top tech news"
/schedule disable morning-news
```

### `/skill`

**実行時に使える** スキルだけを一覧します。無効化されたソースやシャドーイングされたソースは表示されません。

| アクション | 使い方 |
|------|------|
| `list` | `/skill` または `/skill list` |

ターン単位でスキルを起動するには `/<スキル名> [プロンプト]` を使います。上の [スキルの起動とクイックアクション](#スキルの起動とクイックアクション) を参照してください。

### `/fs`

| アクション | 使い方 |
|------|------|
| `list` | `/fs list [path]` |
| `read` | `/fs read <path>` |

```text
/fs list /
/fs list /home
/fs read /home/bot/IDENTITY.md
```

ファイルが大きすぎる場合、出力は途中で切り捨てられます。

---

## `/compact`

**現在のセッション** に対して [セッションコンテキスト圧縮](./compaction.md) を即時に実行します。メモリストアのエントリーを書き換えるメモリ圧縮**ではありません**。

| アクション | 使い方 |
|------|------|
| `run` | `/compact` または `/compact run` |

会話が長くなり、先に要約してから続けたいときに役立ちます。
