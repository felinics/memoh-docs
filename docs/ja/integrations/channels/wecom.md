# WeCom（WeWork）

Memoh Bot を WeCom（企業微信）につなぎ、組織の WeCom ワークスペース内でユーザーとプライベートチャットをしたり、グループチャットで協働したりできるようにします。

## 前提条件

- Bot アプリの作成に使う、[WeCom 管理コンソール](https://work.weixin.qq.com/) の管理者権限。

## 手順

### 1. WeCom 管理コンソールで Bot を作成する

WeCom 管理コンソールで次を行います。

1. [WeCom 管理コンソール](https://work.weixin.qq.com/) にログインします。
2. **アプリ管理** 配下の **カスタムアプリ** または **Bot 管理** に移動します。
3. 新しい Bot アプリを作成します。
4. **Bot ID** と **Secret** の認証情報を控えます。

> 公式ドキュメント：[WeCom オープンプラットフォーム](https://developer.work.weixin.qq.com/) · [WeCom Bot ドキュメント](https://developer.work.weixin.qq.com/document/path/91770)

### 2. Memoh でチャネルを追加する

Memoh で次を行います。

1. Bot の **プラットフォーム** タブを開きます。
2. **Add Channel** をクリックし、**WeCom** を選択します。
3. **Bot ID** と **Secret** を入力します。カスタムの **WebSocket URL** は必要な場合のみ設定します。
4. **Save and Enable** をクリックします。

有効にすると、Memoh は WebSocket で WeCom に接続し、メッセージの受信を開始します。

## 認証情報

| フィールド | 必須 | 説明 |
|------|------|------|
| **Bot ID** | はい | WeCom におけるこの Bot の識別子。 |
| **Secret** | はい | Bot の認証用クレデンシャル。 |
| **WebSocket URL** | いいえ | カスタムの WebSocket エンドポイント。空の場合はデフォルトのエンドポイントを使用します。 |

## 動作確認

プライベートチャットで Bot に `/help` を送るか、グループチャットで Bot を @メンションして `/help` を送ります。Bot がコマンド一覧を返せば、チャネルは接続できています。

## グループチャット

Bot は WeCom のグループチャットでも使えます。グループ内で Bot を @メンションすると返信します。

## 無効化と認証情報の更新

Bot の **プラットフォーム** タブから、いつでもこのチャネルを無効化・削除できます。認証情報を更新するときは、同じパネルで **Bot ID** / **Secret** を更新して保存してください。
