const references = [
  {
    text: 'Справочник',
    items: [
      { text: 'Обзор', link: '/ru/guides/' },
    ],
  },
  {
    text: 'Начало работы',
    items: [
      { text: 'Обзор', link: '/ru/guides/overview.md' },
      { text: 'Быстрый старт', link: '/ru/guides/quick-start.md' },
      { text: 'Работа с Bot', link: '/ru/guides/working-with-bots.md' },
      { text: 'Сессии', link: '/ru/guides/sessions.md' },
      { text: 'Файлы', link: '/ru/guides/files.md' },
      { text: 'Слэш-команды', link: '/ru/guides/slash-commands.md' },
      { text: 'Настольное приложение', link: '/ru/self-hosted/desktop.md' },
      {
        text: 'Каналы',
        collapsed: true,
        items: [
          { text: 'Обзор', link: '/ru/integrations/channels/' },
          { text: 'Slack', link: '/ru/integrations/channels/slack.md' },
          { text: 'Telegram', link: '/ru/integrations/channels/telegram.md' },
          { text: 'Feishu (Lark)', link: '/ru/integrations/channels/feishu.md' },
          { text: 'Discord', link: '/ru/integrations/channels/discord.md' },
          { text: 'QQ', link: '/ru/integrations/channels/qq.md' },
          { text: 'LINE', link: '/ru/integrations/channels/line.md' },
          { text: 'DingTalk', link: '/ru/integrations/channels/dingtalk.md' },
          { text: 'WeCom', link: '/ru/integrations/channels/wecom.md' },
          { text: 'WeChat', link: '/ru/integrations/channels/weixin.md' },
        ],
      },
    ],
  },
  {
    text: 'Продвинутые возможности',
    items: [
      { text: 'Выбор расширения', link: '/ru/guides/extensions.md' },
      { text: 'Agents / ACP', link: '/ru/guides/acp.md' },
      { text: 'Подтверждения и доверие', link: '/ru/guides/approvals.md' },
      { text: 'Контроль доступа', link: '/ru/guides/access.md' },
      { text: 'Рабочее пространство', link: '/ru/guides/container.md' },
      { text: 'Browser / Computer Use', link: '/ru/guides/browser-computer-use.md' },
      { text: 'Навыки', link: '/ru/guides/skills.md' },
      { text: 'Supermarket', link: '/ru/guides/supermarket.md' },
      { text: 'Hooks', link: '/ru/guides/hooks.md' },
      { text: 'MCP', link: '/ru/guides/mcp.md' },
      { text: 'Долговременная память', link: '/ru/guides/memory.md' },
      { text: 'Сжатие контекста', link: '/ru/guides/compaction.md' },
      { text: 'Задачи по расписанию', link: '/ru/guides/schedule.md' },
      { text: 'Провайдеры моделей', link: '/ru/integrations/providers/llm.md' },
      { text: 'Провайдеры веб-поиска', link: '/ru/integrations/providers/web-search.md' },
      { text: 'Провайдеры видео', link: '/ru/integrations/providers/video.md' },
      { text: 'Память', link: '/ru/integrations/providers/memory/builtin.md' },
    ],
  },
  {
    text: 'Развёртывание',
    items: [
      { text: 'Обзор', link: '/ru/self-hosted/' },
      { text: 'Server Deploy', link: '/ru/self-hosted/docker.md' },
      { text: 'Бэкенды рабочих пространств', link: '/ru/self-hosted/workspace-backends.md' },
      { text: 'Коннекторы (Connect-It)', link: '/ru/self-hosted/connectors.md' },
    ],
  },
]

export const ru = {
  '/ru/guides/': references,
  '/ru/integrations/': references,
  '/ru/self-hosted/': references,
}
