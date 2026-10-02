const references = [
  {
    text: 'References',
    items: [
      { text: 'Overview', link: '/guides/' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Overview', link: '/guides/overview.md' },
      { text: 'Quick Start', link: '/guides/quick-start.md' },
      { text: 'Working with Bots', link: '/guides/working-with-bots.md' },
      { text: 'Preferences', link: '/guides/preferences.md' },
      { text: 'Sessions', link: '/guides/sessions.md' },
      { text: 'Files', link: '/guides/files.md' },
      { text: 'Slash Commands', link: '/guides/slash-commands.md' },
      { text: 'Desktop App', link: '/self-hosted/desktop.md' },
      {
        text: 'Channels',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/integrations/channels/' },
          { text: 'Slack', link: '/integrations/channels/slack.md' },
          { text: 'Telegram', link: '/integrations/channels/telegram.md' },
          { text: 'Feishu (Lark)', link: '/integrations/channels/feishu.md' },
          { text: 'Discord', link: '/integrations/channels/discord.md' },
          { text: 'QQ', link: '/integrations/channels/qq.md' },
          { text: 'LINE', link: '/integrations/channels/line.md' },
          { text: 'DingTalk', link: '/integrations/channels/dingtalk.md' },
          { text: 'WeCom (WeWork)', link: '/integrations/channels/wecom.md' },
          { text: 'WeChat', link: '/integrations/channels/weixin.md' },
        ],
      },
    ],
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Choosing an Extension', link: '/guides/extensions.md' },
      { text: 'Agents / ACP', link: '/guides/acp.md' },
      { text: 'Approvals and Trust', link: '/guides/approvals.md' },
      { text: 'Access Control', link: '/guides/access.md' },
      { text: 'Workspace', link: '/guides/container.md' },
      { text: 'Browser / Computer Use', link: '/guides/browser-computer-use.md' },
      { text: 'Skills', link: '/guides/skills.md' },
      { text: 'Supermarket', link: '/guides/supermarket.md' },
      { text: 'Connectors', link: '/guides/connectors.md' },
      { text: 'Hooks', link: '/guides/hooks.md' },
      { text: 'MCP', link: '/guides/mcp.md' },
      { text: 'Memory', link: '/guides/memory.md' },
      { text: 'Compaction', link: '/guides/compaction.md' },
      { text: 'Scheduled Tasks', link: '/guides/schedule.md' },
      { text: 'LLM Providers', link: '/integrations/providers/llm.md' },
      { text: 'Web Search Providers', link: '/integrations/providers/web-search.md' },
      { text: 'Video Providers', link: '/integrations/providers/video.md' },
      { text: 'Memory: Built-in', link: '/integrations/providers/memory/builtin.md' },
      { text: 'Memory: Mem0', link: '/integrations/providers/memory/mem0.md' },
      { text: 'Memory: OpenViking', link: '/integrations/providers/memory/openviking.md' },
      { text: 'TTS: Edge', link: '/integrations/providers/tts/edge.md' },
    ],
  },
  {
    text: 'Use Cases',
    items: [
      { text: 'Use Cases', link: '/guides/use-cases.md' },
    ],
  },
]

export const en = {
  '/guides/': references,
  '/integrations/': references,
  '/self-hosted/': references,
}
