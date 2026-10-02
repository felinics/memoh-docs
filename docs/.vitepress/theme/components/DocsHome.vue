<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  locale?: 'en' | 'zh'
}>()

const isZh = computed(() => props.locale === 'zh')

const copy = computed(() => {
  if (isZh.value) {
    return {
      sections: [
        {
          tone: 'guide',
          icon: 'rocket',
          title: '快速开始',
          text: '安装应用、登录、创建第一个 Bot，交给它真实任务，并接入聊天平台。',
          href: '/zh/guides/quick-start',
        },
        {
          tone: 'guide',
          icon: 'book',
          title: '进阶教程',
          text: '高级能力、自动化与外部提供方——智能体、Hooks、长期记忆等。',
          href: '/zh/guides/',
        },
        {
          tone: 'integration',
          icon: 'plug',
          title: '使用场景',
          text: '组合多种功能解决实际问题的即用型示例。',
          href: '/zh/guides/use-cases',
        },
        {
          tone: 'hosted',
          icon: 'server',
          title: '帮助中心',
          text: '订阅、账单与账号问题，以及联系 Memoh 团队的入口。',
          href: 'https://memoh.ai/help',
        },
      ],
    }
  }

  return {
    sections: [
      {
        tone: 'guide',
        icon: 'rocket',
        title: 'Quick Start',
        text: 'Install the app, sign in, create your first bot, give it real work, and connect a chat platform.',
        href: '/guides/quick-start',
      },
      {
        tone: 'guide',
        icon: 'book',
        title: 'Advanced',
        text: 'Capabilities, automation, and external providers — agents, hooks, memory, and more.',
        href: '/guides/',
      },
      {
        tone: 'integration',
        icon: 'plug',
        title: 'Use Cases',
        text: 'Ready-to-follow scenarios that combine features to solve real problems.',
        href: '/guides/use-cases',
      },
      {
        tone: 'hosted',
        icon: 'server',
        title: 'Help Center',
        text: 'Plans, billing, and account questions, plus a direct line to the team.',
        href: 'https://memoh.ai/help',
      },
    ],
  }
})
</script>

<template>
  <section class="docs-home" :lang="isZh ? 'zh' : 'en'">
    <div class="docs-home__cards" aria-label="Documentation sections">
      <a
        v-for="section in copy.sections"
        :key="section.title"
        class="docs-home__card"
        :class="`docs-home__card--${section.tone}`"
        :href="section.href"
      >
        <span class="docs-home__icon" aria-hidden="true">
          <svg v-if="section.icon === 'rocket'" viewBox="0 0 24 24" role="img">
            <path d="M14 4c3 0 6 3 6 6-2 4-6 8-10 10l-4-4C8 12 11 6 14 4Z" />
            <path d="M9 15 6 18M4 20l2-2" />
            <circle cx="14.5" cy="9.5" r="1.5" />
          </svg>
          <svg v-else-if="section.icon === 'book'" viewBox="0 0 24 24" role="img">
            <path d="M4 5.5C4 4.7 4.7 4 5.5 4H10c1.1 0 2 .9 2 2v14c0-1.1-.9-2-2-2H5.5C4.7 18 4 17.3 4 16.5v-11Z" />
            <path d="M20 5.5C20 4.7 19.3 4 18.5 4H14c-1.1 0-2 .9-2 2v14c0-1.1.9-2 2-2h4.5c.8 0 1.5-.7 1.5-1.5v-11Z" />
          </svg>
          <svg v-else-if="section.icon === 'plug'" viewBox="0 0 24 24" role="img">
            <path d="M9 4v5M15 4v5M7 9h10v3a5 5 0 0 1-10 0V9Z" />
            <path d="M12 17v3M8 20h8" />
          </svg>
          <svg v-else viewBox="0 0 24 24" role="img">
            <rect x="5" y="4" width="14" height="6" rx="1.5" />
            <rect x="5" y="14" width="14" height="6" rx="1.5" />
            <path d="M8 7h.01M8 17h.01M12 10v4" />
          </svg>
        </span>
        <span class="docs-home__card-title">{{ section.title }}</span>
        <span class="docs-home__card-text">{{ section.text }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.docs-home {
  margin-top: 2rem;
}

.docs-home__cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.docs-home__card {
  display: flex;
  min-height: 10.5rem;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.docs-home__card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.docs-home__icon {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.docs-home__icon svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.docs-home__card-title {
  font-size: 1rem;
  font-weight: 700;
}

.docs-home__card-text {
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

@media (max-width: 1080px) {
  .docs-home__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .docs-home__cards {
    grid-template-columns: 1fr;
  }
}
</style>
