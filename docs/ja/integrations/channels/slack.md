# Slack

Memoh Bot を Slack につなぎます。DM の受信、チャンネルやスレッドへの参加、添付ファイルの読み取り、ファイルの送信、ストリーミング返信に対応します。

## 前提条件

- アプリをインストールできる Slack ワークスペースと、[Slack API コンソール](https://api.slack.com/apps) へのアクセス。
- Memoh Bot。チャネルはその **プラットフォーム** タブで設定します。

## 手順

### 1. Slack API コンソールでアプリを作成する

1. [Slack API コンソール](https://api.slack.com/apps) を開き、**Create New App** をクリックします。
2. Bot をインストールするワークスペースを選択します。

::: tip
アプリの設定ページは開いたままにしておいてください。ステップ 2 から 5 はすべてここで行います。
:::

### 2. Slack API コンソールで Socket Mode を有効にする

Memoh の Slack アダプターは Socket Mode を使うため、Bot token に加えて app-level token も必要です。

1. **Basic Information** で **Socket Mode** を有効にします。
2. **App-Level Token** を作成し、scope に `connections:write` をチェックします。
3. 生成された token をコピーします。`xapp-` で始まります。

### 3. Slack API コンソールで Bot Token Scopes を追加する

**OAuth & Permissions** で、Slack アダプターに必要な scope を追加します。

- `app_mentions:read`：チャンネル内での Bot への @メンションを受信
- `channels:history`：パブリックチャンネルのメッセージを読む
- `groups:history`：プライベートチャンネルのメッセージを読む
- `im:history`：DM を読む
- `mpim:history`：グループ DM を読む
- `chat:write`：返信とスレッドメッセージを送信
- `files:read`：アップロードされたファイルや画像を読む
- `files:write`：ファイルを送信
- `reactions:write`：リアクションの追加／削除

会話名やメタデータを Memoh でより完全に表示したい場合は、次も追加することをおすすめします。

- `channels:read`
- `groups:read`
- `im:read`
- `mpim:read`

### 4. Slack API コンソールでイベントを購読する

**Event Subscriptions** で bot events を有効にし、Slack アダプターが処理する受信イベントを追加します。

- `app_mention`
- `message.channels`
- `message.groups`
- `message.im`
- `message.mpim`

### 5. Slack API コンソールでアプリをワークスペースにインストールする

1. **OAuth & Permissions** で **Install to Workspace** をクリックします。
2. 権限の確認画面で内容を確認し、承認します。
3. **Bot User OAuth Token** をコピーします。`xoxb-` で始まります。

### 6. Memoh で Slack チャネルを追加する

1. Bot の詳細ページを開き、**プラットフォーム** タブに移動します。
2. **Add Channel** をクリックし、**Slack** を選択します。
3. 次を入力します。
   - **Bot Token**：`xoxb-` で始まる token
   - **App-Level Token**：`xapp-` で始まる token
4. **Save and Enable** をクリックします。

### 7. Slack で Bot を会話に追加する

チャネルを有効にしたあとも、この Slack アプリを使いたい会話に参加させておく必要があります。

- DM：アプリとの DM を開いてメッセージを送信します。
- パブリックチャンネル：Bot をチャンネルに招待します。
- プライベートチャンネル：インストール後に明示的にチャンネルへ招待します。

## 認証情報

| フィールド | 説明 |
|------|------|
| **Bot Token** | ワークスペースへのインストール後にコピーする **Bot User OAuth Token**（`xoxb-` で始まる）。 |
| **App-Level Token** | Socket Mode 用に作成した、`connections:write` scope 付きの token（`xapp-` で始まる）。 |

2 つの token は、同じ Slack アプリ・同じワークスペースのものでなければなりません。

## 動作確認

Bot をチャンネルに招待して @メンション付きで `/help` を送るか、DM で `/help` を送ります。Bot がコマンド一覧を返せば、チャネルは機能しています。

## グループチャット

Slack ではチャンネルがグループチャットに相当します。Bot をパブリックまたはプライベートチャンネルに招待し、@メンションすると会話できます。返信はスレッドで続けられます。スレッドに対応しているのは Slack チャネルだけです。

## 無効化と認証情報の更新

Bot の **プラットフォーム** タブから、いつでもこのチャネルを無効化・削除できます。認証情報を更新するときは、**Bot Token** と **App-Level Token** のフィールドを更新して保存してください。

## よくある質問 {#faq}

### なぜ token を 2 つ入力するのですか？ {#why-two-tokens}

Memoh の Slack アダプターは Socket Mode を使います。`xoxb-` で始まる Bot token に加えて `xapp-` で始まる app-level token が必要で、両方が同じ Slack アプリ・同じワークスペースのものでなければなりません。

### Bot はメッセージを送れるのに、アップロードされた画像やファイルを読めない {#cannot-read-files}

`files:read` scope が有効になっているか確認してください。

### 接続はできているのに、受信メッセージがまったく届かない {#no-incoming-messages}

**Event Subscriptions** の bot events と、対応する `history` 系 scope をもう一度確認してください。
