# セルフホスト概要

Memoh はサーバーとして動き、ウェブクライアントも Desktop もそのクライアントです。まずサーバーの形態を決め、それからアクセス方法を選びます。

| 場面 | 選択 | 理由 |
|------|------|------|
| 何もインストールせず、まず試したい | [Memoh Cloud](https://memoh.ai) | ホスティングサービス。機能は同一で、サーバー運用が不要。 |
| 共有サーバー、リモートアクセス、本番の常時稼働、Telegram/Discord/Feishu/WeChat/メールなどのチャネル連携、マルチユーザー／マルチテナント | [Server Deploy](./docker.md) | Docker Compose スタックがバックエンド、ウェブクライアント、PostgreSQL（pgvector のメモリストレージ込み）、ワークスペースランタイムを動かし続ける。 |
| 自分の PC でネイティブアプリを使いたい、またはこの PC を Bot が使える「コンピューター」として共有したい | [Desktop](./desktop.md) | Cloud またはセルフホストサーバーに接続するネイティブクライアント。ローカルでサーバーは動かさない。 |

## Server Deploy

Server Deploy は、複数人・リモート・常時稼働・マルチテナントの場面に向いています。Bot を Telegram、Discord、Feishu、WeChat、公式アカウント、メールなどの外部チャネルへ常時つないでおくなら、この形態を選んでください。

最短の道は[クイックスタート](../guides/quick-start.md)、完全なリファレンスは [Server Deploy](./docker.md) にあります。

## Desktop

Desktop は、トレイアイコンとショートカット付きのネイティブ体験がほしい場合や、サーバー側の Bot にこの PC のファイル・シェル・ブラウザを使わせたい場合に向いています。Desktop は常にサーバー（Cloud またはセルフホスト）に接続します。詳しくは [Desktop](./desktop.md) を参照してください。

## 関連ページ

- [Workspace バックエンド](./workspace-backends.md) が Docker・containerd・Apple・ローカルワークスペースの違いを説明しています。
