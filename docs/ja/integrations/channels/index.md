# チャネル

チャネルは Memoh Bot をメッセージプラットフォームにつなぎます。Bot の **プラットフォーム** タブで設定すると、同じ Bot に Slack、Telegram、Feishu、Discord、WeChat などのプラットフォームからアクセスできるようになります。Memoh クライアントで直接チャットすることもできます。

## 対応チャネル

- [Telegram](./telegram.md)
- [Slack](./slack.md)
- [Discord](./discord.md)
- [Feishu (Lark)](./feishu.md)
- [DingTalk](./dingtalk.md)
- [WeCom](./wecom.md)
- [WeChat](./weixin.md)
- [QQ](./qq.md)
- [LINE](./line.md)

各チャネルが対応するメッセージ機能（Markdown、添付ファイル、ストリーミング出力、グループチャットなど）は、各ページの「使用制限」を参照してください。

## 共通の設定フロー

1. 対象プラットフォームでアプリまたは Bot を登録します。
2. API token、App ID、app secret、access token などの認証情報を取得します。
3. Memoh の Bot **プラットフォーム** タブでチャネルを追加します。
4. 保存してチャネルを有効にします。

最後のステップはプラットフォームによって異なります。webhook のコールバック URL をプラットフォームのコンソールに貼り付けるもの、スマートフォンで QR コードをスキャンするもの、Memoh が stream や WebSocket の接続を維持し続けるものがあります。
