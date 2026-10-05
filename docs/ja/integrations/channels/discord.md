# Discord

Memoh Bot を Discord につなぎ、サーバーに参加して、チャンネルや DM でコミュニティのメンバーと会話できるようにします。

## 前提条件

- [Discord Developer Portal](https://discord.com/developers/applications) にログインできる Discord アカウント。
- Bot の参加を承認できるサーバー。
- Memoh Bot。チャネルはその **プラットフォーム** タブで設定します。

## 手順

### 1. Discord Developer Portal でアプリケーションを作成し、Bot Token を取得する

1. [Discord Developer Portal](https://discord.com/developers/applications) を開きます。
2. **New Application** をクリックし、名前を付けます。
3. 左側のメニューから **Bot** に移動します。
4. **Reset Token** をクリックして **Bot Token** を生成し、コピーして安全に保管します。

### 2. Discord Developer Portal で特権インテントを有効にする

1. **Bot** ページを下にスクロールし、**Privileged Gateway Intents** を見つけます。
2. `Message Content Intent`、`Server Members Intent`、`Presence Intent` を有効にします。
3. 保存します。

### 3. Discord Developer Portal で招待リンクを生成し、Bot をサーバーに追加する

1. **OAuth2** > **URL Generator** に移動します。
2. scope の `bot` と `applications.commands` にチェックを入れます。
3. 権限の `Send Messages`、`Read Message History`、`Embed Links`、`Attach Files` にチェックを入れます。
4. 生成された URL をコピーし、ブラウザで開きます。
5. 追加先のサーバーを選択して承認します。

> 公式ガイド：[Discord Developer Portal - Bots](https://discord.com/developers/docs/intro)

### 4. Memoh で Discord チャネルを追加する

1. Bot の詳細ページを開き、**プラットフォーム** タブに移動します。
2. **Add Channel** をクリックし、**Discord** を選択します。
3. **Bot Token** を貼り付けます。
4. **Save and Enable** をクリックします。

## 認証情報

| フィールド | 説明 |
|------|------|
| **Bot Token** | アプリケーションの **Bot** ページで **Reset Token** により生成します。安全に保管してください。 |

## 動作確認

Bot に DM で `/help` を送るか、Bot が参加しているサーバーのチャンネルで @メンションします。Bot がコマンド一覧を返せば、チャネルは機能しています。

## グループチャット

Discord ではサーバーがグループチャットに相当します。Bot の参加を承認したあと、チャンネルで @メンションすると会話できます。

## 無効化と認証情報の更新

Bot の **プラットフォーム** タブから、いつでもこのチャネルを無効化・削除できます。token を更新するときは、**Bot Token** フィールドを更新して保存してください。
