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
      { text: 'Hooks', link: '/zh/guides/hooks.md' },
      { text: 'MCP', link: '/zh/guides/mcp.md' },
      { text: '长期记忆', link: '/zh/guides/memory.md' },
      { text: '上下文压缩', link: '/zh/guides/compaction.md' },
      { text: '定时任务', link: '/zh/guides/schedule.md' },
      { text: '模型服务商', link: '/zh/integrations/providers/llm.md' },
      { text: '搜索提供方', link: '/zh/integrations/providers/web-search.md' },
      { text: '视频提供方', link: '/zh/integrations/providers/video.md' },
      { text: '记忆', link: '/zh/integrations/providers/memory/builtin.md' },
    ],
  },
  {
    text: '使用场景',
    items: [
      { text: '总览', link: '/zh/use-cases/' },
      { text: '晨间简报', link: '/zh/use-cases/morning-briefing.md' },
      { text: '发版盯守', link: '/zh/use-cases/release-watch.md' },
      { text: '群聊值班助理', link: '/zh/use-cases/group-duty-assistant.md' },
      { text: '数据表格的日常维护', link: '/zh/use-cases/data-upkeep.md' },
      { text: '带登录墙的网页任务', link: '/zh/use-cases/gated-web-tasks.md' },
      { text: '云端写码与预览', link: '/zh/use-cases/code-and-preview.md' },
      { text: '记得住事的个人助理', link: '/zh/use-cases/personal-assistant.md' },
    ],
  },
  {
    text: '自部署',
    items: [
      { text: '总览', link: '/zh/self-hosted/' },
      { text: 'Server Deploy', link: '/zh/self-hosted/docker.md' },
      { text: 'Workspace 后端', link: '/zh/self-hosted/workspace-backends.md' },
      { text: '连接器（Connect-It）', link: '/zh/self-hosted/connectors.md' },
    ],
  },
]

export const zh = {
  '/zh/guides/': references,
  '/zh/integrations/': references,
  '/zh/self-hosted/': references,
  '/zh/use-cases/': references,
}
