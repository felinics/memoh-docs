# Telegram

Memoh Bot を Telegram につなぎます。Memoh の Telegram 対応は比較的充実しており、ストリーミング、Markdown、添付ファイルなどをサポートします。

## 前提条件

- Telegram アカウント。**@BotFather** と対話して Bot を作成するために使います。
- Memoh Bot。チャネルはその **プラットフォーム** タブで設定します。

## 手順

### 1. Telegram で @BotFather を使って Bot を作成する

1. Telegram で公式の **@BotFather** を検索します。
2. `/newbot` を送信します。
3. プロンプトに従って入力します。
   - **Name**：表示名。例：`My Memoh Bot`。
   - **Username**：グローバルに一意で、`bot` で終わる名前。例：`my_memoh_bot`。
4. BotFather が **API Token**（`123456789:ABC...` のような形式）を返します。**漏えいさせないでください。**

> 公式ガイド：[Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial)

### 2. Memoh で Telegram チャネルを追加する

1. Bot の詳細ページを開き、**プラットフォーム** タブに移動します。
2. **Add Channel** をクリックし、**Telegram** を選択します。
3. **API Token** を認証情報フィールドに入力します。
4. **Save and Enable** をクリックします。

## 認証情報

| フィールド | 説明 |
|------|------|
| **API Token** | Bot 作成時に BotFather から送られる token（`123456789:ABC...` のような形式）。漏えいさせないでください。 |

## 動作確認

Telegram で Bot とのプライベートチャットを開き、`/help` を送信します。Bot がコマンド一覧を返せば、チャネルは機能しています。

## グループチャット

Telegram はグループチャットに対応しています。Bot をグループに追加したあと、ユーザー名で @メンションするとグループ内で会話できます。

## 無効化と認証情報の更新

Bot の **プラットフォーム** タブから、いつでもこのチャネルを無効化・削除できます。token を更新するときは、**API Token** フィールドを更新して保存してください。
