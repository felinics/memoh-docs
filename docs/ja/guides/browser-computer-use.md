# Browser Use と Computer Use

Memoh は、Bot のワークスペースコンテナの中で可視デスクトップとヘッド付きブラウザを起動できます。これは headless の Playwright スクリプトを走らせるのとは別の経路です: Bot が操作するのは、クライアントの **Desktop** パネルでも見られる、あのグラフィカルなブラウザそのものです。

## 概念の違い

| 能力 | 向いている用途 | 動作の仕組み |
|------|------|----------|
| Headless browser コマンド | 素早くスクリプト化した Web 自動化 | ワークスペース内で Playwright などのブラウザツールを通常どおり実行します。 |
| Browser Use | Web ページ、フォーム、ナビゲーション、スクリーンショット、アクセシビリティツリーの検査 | CDP 経由でワークスペース内のヘッド付き Chrome/Chromium を操作します。 |
| Computer Use | ネイティブのダイアログ、壊れたブラウザ状態、ブラウザ以外の GUI | デスクトップのアクセシビリティツリー（AT-SPI）を読んで ref を取得し、解決できないときは座標とスクリーンショットにフォールバックします。 |

Web ページ内の操作には、まず Browser Use を使ってください。CDP では届かない GUI 状態にぶつかったときにだけ、Computer Use を使います。

## Workspace display と VNC

Workspace display は、Bot のワークスペースコンテナ内のデスクトップ環境です。VNC/RFB はこのデスクトップの表示と入力を運ぶ土台で、クライアントのデスクトップセッションは画面の伝送に WebRTC を使います。

重要なのは「VNC がある」こと自体ではなく、ワークスペースがヘッド付きの Chrome/Chromium を動かせることです。多くのログイン、CAPTCHA、複雑なフロントエンド状態、本物のグラフィカルセッションしかサポートしないサイトでは、headless モードは必ずしも安定して動きません。

## Bot デスクトップの準備

1. Bot の詳細ページを開きます。
2. **Desktop** タブに進みます。
3. workspace display runtime を準備または有効化します。
4. Bot の設定ページ、またはチャットのワークスペースから display session を開きます。

Display runtime は、デスクトップ、VNC server、ブラウザ、フォントなどのコンポーネントをインストールまたは利用します。実際に使えるかどうかは、workspace backend とイメージに依存します。

## Agent ツール

ワークスペースのデスクトップが有効になると、agent はブラウザ操作とコンピューター操作のツールを使えます:

- `browser_observe` は現在のブラウザページを検査します（snapshot、get_content、screenshot、evaluate など）。
- `browser_action` はヘッド付きブラウザでクリック、フォーム入力、タイピング、キー押下、ナビゲーションを行います。
- `browser_remote_session` はブラウザの CDP endpoint を公開し、コード駆動のセッションに使わせます。
- `computer_observe` はデスクトップのアクセシビリティツリーのスナップショット（`e3` のような ref）、またはディスクに保存されたスクリーンショットのパスを返します。
- `computer_action` はデスクトップを操作します: スナップショット内の `ref` を優先し、ref が使えないときやアクセシビリティ呼び出しが失敗したときは `(x, y)` 座標にフォールバックします。

### スクリーンショットは会話に自動注入されません

`browser_observe` と `computer_observe` のスクリーンショットはワークスペースのパス（例: `/data/computer-screenshots/1716200000.jpg`）に保存され、ツールの結果はそのパスだけを返します。会話に自動で押し込まれることはありません。画像を見る必要があるときは、ファイル読み取りツールを明示的に呼んでそのパスを読みます。これにより観察のコストが下がり、「画像を読むのに token を費やす価値があるか」の判断がモデルの側に戻ります。

### アクセシビリティ補助バイナリ

Computer Use は、コンテナ内の `/opt/memoh/toolkit/display/bin/a11y-cli` と、ワークスペースの `at-spi2-core` パッケージに依存します。Display runtime の probe は `a11y_available` を返すので、クライアントはアクセシビリティ経路が健全かどうかを表示できます。AT-SPI が使えないときでも、`computer_action` は座標ベースで引き続き動き、`computer_observe screenshot` も使えます。

これらはワークスペースランタイムの能力であって、Electron のデスクトップアプリ自体を自動操作するためのものではありません。

## 関連ページ

- [コンテナとワークスペース](./container.md)
- [Workspace バックエンド](../self-hosted/workspace-backends.md)
