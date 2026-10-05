import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { en } from './en'
import { zh } from './zh'
import { ja } from './ja'
import { ru } from './ru'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Memoh Documentation',
  description: 'Documentation for Memoh — bots with their own cloud computer, long-term memory, and your chat channels.',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],

  base: '/',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guides', link: '/guides/' },
          { text: 'Help Center', link: 'https://memoh.ai/help' },
        ],
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '教程', link: '/zh/guides/' },
          { text: '帮助中心', link: 'https://memoh.ai/help' },
        ],
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: [
          { text: 'ガイド', link: '/ja/guides/' },
          { text: 'ヘルプセンター', link: 'https://memoh.ai/help' },
        ],
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        nav: [
          { text: 'Руководства', link: '/ru/guides/' },
          { text: 'Центр помощи', link: 'https://memoh.ai/help' },
        ],
      },
    }
  },

  themeConfig: {
    siteTitle: 'Memoh',
    sidebar: {
      ...en,
      ...zh,
      ...ja,
      ...ru,
    },


    logo: {
      src: '/logo.svg',
      alt: 'Memoh'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/felinics/Memoh' }
    ],
    
    footer: {
      message: 'Published under AGPLv3',
      copyright: 'Copyright © 2024-present Memoh'
    },
    
    search: {
      provider: 'local'
    },
    
    editLink: {
      pattern: 'https://github.com/felinics/memoh-docs/edit/main/docs/:path',
      text: 'Edit on GitHub'
    },
    
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  ignoreDeadLinks: [/^https?:\/\/localhost/],

  lastUpdated: true,

  vite: {
    plugins: [llmstxt()],
  },
})
