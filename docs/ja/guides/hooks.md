# Bot Hooks

Bot Hooks を使うと、ツール呼び出し、会話の turn、メモリ、ワークスペースの活動、承認、圧縮、subagent といったフローの前後で、Bot に小さな自動化ルールを実行させられます。各 Bot は自分専用の設定ファイルを持ちます:

```text
/data/.memoh/hooks.json
```

Bot の**詳細ページ**を開いて **Hooks** タブに進むと、このファイルを UI から編集できます。

---

## Hooks タブ

Hooks タブは、Bot の hook 設定の JSON エディターです。できることは次のとおりです:

- `/data/.memoh/hooks.json` が存在するかの表示
- ユーザー設定が有効かの表示
- 有効な hook と action の数の集計
- サポートされているイベントカタログの一覧表示
- どのイベントがランタイムに接続済みかの表示
- JSON 設定の再読み込みと保存
- スターターテンプレートの挿入
- 合成イベント 1 件で現在の effective hooks 設定をテスト

ファイルが存在しない場合、UI とサービスは有効状態の空の設定を作成します:

```json
{
  "version": 1,
  "enabled": true,
  "hooks": []
}
```

このタブにビジュアルなルールビルダーはありません。JSON を直接編集する必要があります。

---

## 設定の構造

```json
{
  "version": 1,
  "enabled": true,
  "defaults": {
    "timeout": "10s",
    "on_error": "fail",
    "max_output_bytes": 65536,
    "trigger_nested_hooks": false
  },
  "env": {
    "HOOK_LOG": "/data/.memoh/hooks.log"
  },
  "hooks": [
    {
      "name": "review shell commands",
      "event": "PreToolUse",
      "matcher": "^exec$",
      "enabled": true,
      "priority": 10,
      "actions": [
        {
          "type": "command",
          "command": "python3 /data/.memoh/review-command.py",
          "timeout": "5s",
          "on_error": "block"
        }
      ]
    }
  ]
}
```

トップレベルのフィールド:

| フィールド | 説明 |
|------|------|
| `version` | 必須の schema バージョン。現在のバージョンは `1` です。 |
| `enabled` | このユーザー設定ファイル内の hooks を有効化・無効化します。デフォルトは `true` です。 |
| `defaults.timeout` | デフォルトの action タイムアウト。`10s` のような Go duration と、整数の秒数の両方をサポートします。デフォルトは `10s` です。 |
| `defaults.on_error` | デフォルトのエラー処理: `ignore`、`fail`、`block` のいずれか。デフォルトは `fail` です。 |
| `defaults.max_output_bytes` | command action 1 つあたりで捕捉する stdout/stderr の最大バイト数。デフォルトは `65536` です。 |
| `defaults.trigger_nested_hooks` | schema はこのフィールドを解析し、デフォルトは `false` です。Hooks UI には現在、専用のコントロールはありません。 |
| `env` | ユーザー設定内の command action が使う追加の環境変数。 |
| `hooks` | ルールのリスト。マッチした hook は `priority` の高い順に実行され、同じ優先度ではファイル内の順序が保たれます。 |

Hook のフィールド:

| フィールド | 説明 |
|------|------|
| `name` | 任意の表示／デバッグ用の名前。 |
| `event` | 必須。イベントカタログにある名前でなければなりません。 |
| `matcher` | 任意の正規表現。リクエスト内の最適なターゲットテキストに対してマッチします。 |
| `enabled` | この hook を有効化・無効化します。デフォルトは `true` です。 |
| `priority` | 数字が大きいほど先に実行されます。 |
| `actions` | hook がマッチしたときに実行する action。 |
| `conditions` | schema 内では将来の拡張用に予約されています。現在のマッチングは `event`、`enabled`、`matcher` を使います。 |

`matcher` のターゲットテキストは、hook リクエストから次の順序で選ばれます:

- `tool.name`
- `approval.tool_name`
- `channel.platform`
- `memory.scope`
- `extra.command`、`extra.path`、`extra.operation`、または `extra.scope`
- イベント名

---

## Action の種類

現在サポートされている action は `command` と `tool` の 2 種類です。

### Command Action

```json
{
  "type": "command",
  "command": "mkdir -p .memoh && cat >> .memoh/hooks.log",
  "work_dir": "/data",
  "timeout": "10s",
  "on_error": "ignore"
}
```

`command` action は Bot のワークスペースコンテナ内で実行されます。hook リクエストは JSON として stdin から渡され、末尾に改行が付きます。

作業ディレクトリの解決順序:

1. `action.work_dir`
2. リクエスト内のワークスペース CWD
3. `/data`

環境変数には次が含まれます:

- 現在の設定のトップレベルにある `env`
- `MEMOH_HOOK_EVENT`
- `MEMOH_HOOK_NAME`
- `MEMOH_BOT_ID`
- `MEMOH_SESSION_ID`

stdout が JSON の場合、command は次を返せます:

```json
{
  "decision": "append_context",
  "reason": "extra context added",
  "append_context": "Use the production-safe command variant.",
  "metadata": {
    "source": "hook"
  }
}
```

stdout が JSON でない場合、Memoh はその action を `allow` として扱い、生の stdout を action metadata に格納します。非ゼロの終了コードは action エラーと見なされます。

### Tool Action

```json
{
  "type": "tool",
  "tool": "record_event",
  "input": {
    "source": "hook"
  },
  "timeout": "10s",
  "on_error": "fail"
}
```

`tool` action は、利用可能な Bot ツールを名前で呼び出し、設定にある `input` を渡します。ツールの結果がオブジェクトの場合、`decision`、`reason`、`append_context` を返せます。

`mcp_tool` はコード内では予約された型ですが、現在は拒否されます。

---

## 決定とエラー

action は次の decision を返せます:

| Decision | 効果 |
|----------|------|
| `allow` | 通常どおり続行します。 |
| `deny` | ガード対象の操作を拒否します。`PreToolUse` の場合、そのツール呼び出しを拒否します。 |
| `ask_approval` | ランタイムが承認の引き継ぎをサポートしている箇所で、人間による承認を要求します。 |
| `append_context` | イベントの接続点が `append_context` を消費する場合にコンテキストを追加します。たとえば prompt、model、memory 関連のフローです。 |

`on_error` は action が失敗したときの挙動を制御します:

| 値 | 効果 |
|----|------|
| `ignore` | 記録して、次の action に進みます。 |
| `fail` | action エラーを返します。デフォルト値です。 |
| `block` | 失敗を `deny` decision に変換します。 |

---

## イベントカタログ

Hooks タブは `/bots/{bot_id}/hooks/events` からイベントカタログを読み込みます。runtime-supported とマークされたイベントは、現在の実行パスに接続済みです。catalog-only のイベントは設定の解析とテストインターフェースを通りますが、現時点ではそれらを発行する実際のランタイムパスはありません。

| Event | 領域 | ランタイム接続済み | 説明 |
|-------|------|--------------|------|
| `PreToolUse` | ツール | はい | ツール呼び出しの承認決定の前に実行されます。拒否や承認の要求ができます。 |
| `PostToolUse` | ツール | はい | ツール呼び出しの成功後に実行されます。 |
| `ToolError` | ツール | はい | ツール呼び出しがエラーを返したときに実行されます。 |
| `SessionStart` | セッション | はい | セッションの作成後に実行されます。 |
| `UserMessageReceived` | 会話 | はい | conversation resolver がユーザーメッセージを受け取った後に実行されます。 |
| `BeforePromptBuild` | Prompt | はい | prompt の組み立て前に実行されます。`append_context` を system prompt に追加できます。 |
| `AfterPromptBuild` | Prompt | はい | prompt の組み立て後に実行されます。`append_context` を system prompt に追加できます。 |
| `BeforeModelCall` | モデル | はい | モデルの生成 step の前に実行されます。`append_context` を user message として追加できます。 |
| `AfterModelCall` | モデル | はい | モデルの生成 step の後に実行されます。 |
| `TurnEnd` | Turn | はい | 1 つの turn が完了したときに実行されます。 |
| `TurnError` | Turn | はい | 1 つの turn が失敗したときに実行されます。 |
| `BeforeMemorySearch` | メモリ | はい | メモリ検索の前に実行されます。 |
| `AfterMemorySearch` | メモリ | はい | メモリ検索の後に実行されます。`append_context` をメモリコンテキストにマージできます。 |
| `BeforeMemoryWrite` | メモリ | はい | 会話メモリの書き込み前に実行されます。 |
| `AfterMemoryWrite` | メモリ | はい | メモリの書き込み後に実行されます。 |
| `MemoryExtracted` | メモリ | はい | メモリの抽出／書き込み準備の完了後に実行されます。 |
| `WorkspaceStart` | Workspace | はい | ワークスペースの起動後に実行されます。 |
| `WorkspaceStop` | Workspace | はい | ワークスペースの停止時に実行されます。 |
| `BeforeWorkspaceCommand` | Workspace | はい | ワークスペースの shell コマンド実行前に実行されます。コマンドを拒否できます。 |
| `AfterWorkspaceCommand` | Workspace | はい | ワークスペースの shell コマンド実行後に実行されます。 |
| `BeforeFileWrite` | Workspace | はい | ファイルの書き込みと patch の前に実行されます。書き込みを拒否できます。 |
| `AfterFileWrite` | Workspace | はい | ファイルの書き込みと patch の後に実行されます。 |
| `BeforeApprovalCreate` | 承認 | はい | ツール承認リクエストの作成前に実行されます。 |
| `ApprovalRequested` | 承認 | はい | 承認リクエストの送信後に実行されます。 |
| `ApprovalResolved` | 承認 | はい | 承認が処理された後に実行されます。 |
| `ApprovalTimeout` | 承認 | はい | 承認がタイムアウトしたときに実行されます。 |
| `PreCompact` | 圧縮 | はい | セッション圧縮の前に実行されます。 |
| `PostCompact` | 圧縮 | はい | セッション圧縮の後に実行されます。 |
| `SubagentStart` | Subagent | はい | subagent タスクの開始前に実行されます。 |
| `SubagentStop` | Subagent | はい | subagent タスクの終了後に実行されます。 |
| `InboundMessageNormalized` | メッセージ | いいえ | 現在はイベントカタログにのみ存在します。 |
| `BeforeOutboundMessage` | メッセージ | いいえ | 現在はイベントカタログにのみ存在します。 |
| `AfterOutboundMessage` | メッセージ | いいえ | 現在はイベントカタログにのみ存在します。 |
| `ChannelDeliveryFailed` | メッセージ | いいえ | 現在はイベントカタログにのみ存在します。 |

---

## Hooks のテスト

Hooks タブの **Test** セクションで、合成イベントを 1 件実行できます:

1. イベントを選びます。
2. JSON payload を編集します。
3. **Run Test** をクリックします。
4. 返ってきた結果を確認します。マッチした hooks、実行された actions、decision、action results、hook source metadata が含まれます。

テストパスは effective config を使い、action を実際に実行します。破壊的なコマンドやツール呼び出しの検証がまさに目的である場合を除き、テスト payload でそれらをトリガーしないでください。

---

## セキュリティ上の注意

Hooks は Bot のワークスペース内で実際に実行されます。そこで動くコードと同じものとして扱ってください。

- 有効化する前に、すべての command action をレビューしてください。
- `PreToolUse`、`BeforeWorkspaceCommand`、`BeforeFileWrite` の使用には注意してください。Bot の通常の作業をブロックしてしまうことがあります。
- timeout は短く保ち、`on_error` を明示的に設定してください。
- 長期間有効な secrets を `hooks.json` に直接書かないでください。
- リスクの高い hooks には、できるだけ狭い `matcher` を使ってください。
- command action は stdin から hook リクエストを受け取り、そこにはメッセージテキスト、ツール入力、パス、エラー情報が含まれ得ることを覚えておいてください。

---

## 関連ページ

- [Bot](./working-with-bots.md)
- [スキル](./skills.md)
