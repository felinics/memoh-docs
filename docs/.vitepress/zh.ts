const references = [
  {
    text: '参考文档',
    items: [
      { text: '总览', link: '/zh/guides/' },
    ],
  },
  {
    text: '快速开始',
    items: [
      { text: '概览', link: '/zh/guides/overview.md' },
      { text: '快速开始', link: '/zh/guides/quick-start.md' },
      { text: '和 Bot 协作', link: '/zh/guides/working-with-bots.md' },
      { text: '用户偏好', link: '/zh/guides/preferences.md' },
      { text: '会话', link: '/zh/guides/sessions.md' },
      { text: '文件', link: '/zh/guides/files.md' },
      { text: '斜杠命令', link: '/zh/guides/slash-commands.md' },
      { text: '桌面客户端', link: '/zh/self-hosted/desktop.md' },
      {
        text: '渠道',
        collapsed: true,
        items: [
          { text: '总览', link: '/zh/integrations/channels/' },
          { text: 'Slack', link: '/zh/integrations/channels/slack.md' },
          { text: 'Telegram', link: '/zh/integrations/channels/telegram.md' },
          { text: '飞书', link: '/zh/integrations/channels/feishu.md' },
          { text: 'Discord', link: '/zh/integrations/channels/discord.md' },
          { text: 'QQ', link: '/zh/integrations/channels/qq.md' },
          { text: 'LINE', link: '/zh/integrations/channels/line.md' },
          { text: '钉钉', link: '/zh/integrations/channels/dingtalk.md' },
          { text: '企微', link: '/zh/integrations/channels/wecom.md' },
          { text: '微信', link: '/zh/integrations/channels/weixin.md' },
        ],
      },
    ],
  },
  {
    text: '进阶教程',
    items: [
      { text: '扩展能力怎么选', link: '/zh/guides/extensions.md' },
      { text: 'Agents / ACP', link: '/zh/guides/acp.md' },
      { text: '审批与信任', link: '/zh/guides/approvals.md' },
      { text: '访问控制', link: '/zh/guides/access.md' },
      { text: '工作区', link: '/zh/guides/container.md' },
      { text: 'Browser / Computer Use', link: '/zh/guides/browser-computer-use.md' },
      { text: '技能', link: '/zh/guides/skills.md' },
      { text: '应用市场', link: '/zh/guides/supermarket.md' },
      { text: '连接器', link: '/zh/guides/connectors.md' },
      { text: 'Hooks', link: '/zh/guides/hooks.md' },
      { text: 'MCP', link: '/zh/guides/mcp.md' },
      { text: '长期记忆', link: '/zh/guides/memory.md' },
      { text: '上下文压缩', link: '/zh/guides/compaction.md' },
      { text: '定时任务', link: '/zh/guides/schedule.md' },
      { text: '模型服务商', link: '/zh/integrations/providers/llm.md' },
      { text: '搜索提供方', link: '/zh/integrations/providers/web-search.md' },
      { text: '视频提供方', link: '/zh/integrations/providers/video.md' },
      { text: '记忆提供方：内置', link: '/zh/integrations/providers/memory/builtin.md' },
      { text: '记忆提供方：Mem0', link: '/zh/integrations/providers/memory/mem0.md' },
      { text: '记忆提供方：OpenViking', link: '/zh/integrations/providers/memory/openviking.md' },
      { text: 'TTS：Edge', link: '/zh/integrations/providers/tts/edge.md' },
    ],
  },
  {
    text: '使用场景',
    items: [
      { text: '使用场景', link: '/zh/guides/use-cases.md' },
    ],
  },
]

export const zh = {
  '/zh/guides/': references,
  '/zh/integrations/': references,
  '/zh/self-hosted/': references,
}
