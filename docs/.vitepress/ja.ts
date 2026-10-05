const references = [
  {
    text: 'リファレンス',
    items: [
      { text: '総覧', link: '/ja/guides/' },
    ],
  },
  {
    text: 'はじめに',
    items: [
      { text: '概要', link: '/ja/guides/overview.md' },
      { text: 'クイックスタート', link: '/ja/guides/quick-start.md' },
      { text: 'Bot との協働', link: '/ja/guides/working-with-bots.md' },
      { text: 'セッション', link: '/ja/guides/sessions.md' },
      { text: 'ファイル', link: '/ja/guides/files.md' },
      { text: 'スラッシュコマンド', link: '/ja/guides/slash-commands.md' },
      { text: 'デスクトップアプリ', link: '/ja/self-hosted/desktop.md' },
      {
        text: 'チャネル',
        collapsed: true,
        items: [
          { text: '総覧', link: '/ja/integrations/channels/' },
          { text: 'Slack', link: '/ja/integrations/channels/slack.md' },
          { text: 'Telegram', link: '/ja/integrations/channels/telegram.md' },
          { text: 'Feishu (Lark)', link: '/ja/integrations/channels/feishu.md' },
          { text: 'Discord', link: '/ja/integrations/channels/discord.md' },
          { text: 'QQ', link: '/ja/integrations/channels/qq.md' },
          { text: 'LINE', link: '/ja/integrations/channels/line.md' },
          { text: 'DingTalk', link: '/ja/integrations/channels/dingtalk.md' },
          { text: 'WeCom', link: '/ja/integrations/channels/wecom.md' },
          { text: 'WeChat', link: '/ja/integrations/channels/weixin.md' },
        ],
      },
    ],
  },
  {
    text: '高度な機能',
    items: [
      { text: '拡張機能の選び方', link: '/ja/guides/extensions.md' },
      { text: 'Agents / ACP', link: '/ja/guides/acp.md' },
      { text: '承認と信頼', link: '/ja/guides/approvals.md' },
      { text: 'アクセス制御', link: '/ja/guides/access.md' },
      { text: 'ワークスペース', link: '/ja/guides/container.md' },
      { text: 'Browser / Computer Use', link: '/ja/guides/browser-computer-use.md' },
      { text: 'スキル', link: '/ja/guides/skills.md' },
      { text: 'マーケットプレイス', link: '/ja/guides/supermarket.md' },
      { text: 'Hooks', link: '/ja/guides/hooks.md' },
      { text: 'MCP', link: '/ja/guides/mcp.md' },
      { text: '長期メモリ', link: '/ja/guides/memory.md' },
      { text: 'コンテキスト圧縮', link: '/ja/guides/compaction.md' },
      { text: 'スケジュールタスク', link: '/ja/guides/schedule.md' },
      { text: 'モデルプロバイダー', link: '/ja/integrations/providers/llm.md' },
      { text: 'ウェブ検索プロバイダー', link: '/ja/integrations/providers/web-search.md' },
      { text: '動画プロバイダー', link: '/ja/integrations/providers/video.md' },
      { text: 'メモリ', link: '/ja/integrations/providers/memory/builtin.md' },
    ],
  },
  {
    text: 'セルフホスト',
    items: [
      { text: '概要', link: '/ja/self-hosted/' },
      { text: 'Server Deploy', link: '/ja/self-hosted/docker.md' },
      { text: 'Workspace バックエンド', link: '/ja/self-hosted/workspace-backends.md' },
      { text: 'コネクター（Connect-It）', link: '/ja/self-hosted/connectors.md' },
    ],
  },
]

export const ja = {
  '/ja/guides/': references,
  '/ja/integrations/': references,
  '/ja/self-hosted/': references,
}
