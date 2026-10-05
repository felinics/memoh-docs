# LINE

Memoh Bot を LINE 公式アカウントにつなぎます。ユーザーがそのアカウントを友だち追加すると、Bot と 1 対 1 でトークできます。

::: warning 使用制限
- 1 対 1 のトークのみ対応します。グループや複数人トークルームのメッセージは無視されるため、Bot を LINE グループに招待しても機能しません。
- 出力はプレーンテキストのみで、Markdown はレンダリングされません。
- 送信できるメディアは PNG/JPEG 画像のみです。画像は公開の HTTPS でアクセスでき、かつ LINE のサイズ制限（元画像 10 MB、プレビュー画像 1 MB）に収まっている必要があります。画像以外の添付ファイルは送信できません。
- 受信した音声、動画、スタンプ、位置情報は処理されません。受信画像は LINE がホストしているものに限ります（アプリ内で直接写真を送った場合はこれに該当します）。
- ストリーミング出力はなく、返信はメッセージ全体がまとめて届きます。長い返信は LINE の 5000 文字制限に合わせて複数のメッセージに分割されます。
- 返信は LINE の **Push API** 経由で送信されるため、LINE プランのプッシュメッセージ数の上限にカウントされます。
:::

## 前提条件

LINE は **webhook** でメッセージを Memoh に届け、送信画像も LINE のサーバー側から取得されるため、Memoh のデプロイには公開の HTTPS エンドポイントが必要です。次のいずれかで用意します。

- `MEMOH_WEBHOOK_PUBLIC_BASE_URL` に公開 HTTPS の origin を設定します（パス、ポート、プライベートアドレスは不可）。
- または server deploy で Cloudflare Quick Tunnel profile を有効にすると、Memoh が自動的に公開アドレスを取得します。

## 手順

### 1. LINE Developers Console で Messaging API channel を作成する

LINE Developers Console で次を行います。

1. [LINE Developers Console](https://developers.line.biz/console/) を開きます。
2. provider を作成（または選択）し、その下に **Messaging API** channel を作成します。channel は LINE 公式アカウントに関連付けられます。
3. **Basic settings** で **Channel secret** をコピーします。
4. **Messaging API** タブで **Channel access token**（長期）を発行してコピーします。

> 公式ドキュメント：[Messaging API - Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/)

### 2. Memoh でチャネルを追加する

Memoh で次を行います。

1. Bot の **プラットフォーム** タブを開きます。
2. **Add Channel** をクリックし、**LINE** を選択します。
3. **Channel Secret** と **Channel Access Token** を貼り付けます。
4. **Save**（または **Save and Enable**）をクリックします。コールバック URL は保存して初めて生成されます。

### 3. webhook を登録する

Memoh では、保存するとパネルに読み取り専用の **WebHook Callback URL** が次の形式で表示されます。

```text
https://<公開 base>/channels/line/webhook/<config_id>
```

登録方法は 2 通りあります。

- **Set in LINE** をクリックします。Memoh が Messaging API 経由でアドレスを LINE の channel に直接書き込みます。未保存の変更があるとエラーになるため、保存してからクリックしてください。
- または **Copy** をクリックし、LINE Developers Console の **Messaging API → Webhook URL** に手動で貼り付けます。

最後に、LINE Developers Console でその channel の **Use webhook** がオンになっていることを確認します。

Memoh は受信 webhook の署名を **Channel Secret** で検証し、イベントは 24 時間にわたって重複排除されます。

## 認証情報

| フィールド | 必須 | 説明 |
|------|------|------|
| **Channel Secret** | はい | Messaging API channel の **Basic settings** でコピーします。 |
| **Channel Access Token** | はい | **Messaging API** タブで発行する長期 token。 |

## 動作確認

LINE でその公式アカウントを友だち追加し、1 対 1 のトークで Bot に `/help` を送信します。Bot がコマンド一覧を返せば、チャネルは接続できています。

## 無効化と認証情報の更新

Bot の **プラットフォーム** タブから、いつでもこのチャネルを無効化・削除できます。認証情報を更新するときは、同じパネルで **Channel Secret** / **Channel Access Token** を更新して保存してください。

## よくある質問 {#faq}

### パネルに公開 base URL を取得できないと表示される {#no-public-base-url}

公開 HTTPS の origin がないと、webhook コールバック URL は生成できません。まず前提条件に従って `MEMOH_WEBHOOK_PUBLIC_BASE_URL` または Cloudflare Quick Tunnel を設定してください。
