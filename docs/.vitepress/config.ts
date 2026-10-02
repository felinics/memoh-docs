import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { en } from './en'
import { zh } from './zh'

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
          { text: 'Integrations', link: '/integrations/' },
          { text: 'Help Center', link: 'https://memoh.ai/help' },
          { text: 'About', link: '/about.md' },
        ],
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '教程', link: '/zh/guides/' },
          { text: '集成', link: '/zh/integrations/' },
          { text: '帮助中心', link: 'https://memoh.ai/help' },
          { text: '关于', link: '/zh/about.md' },
        ],
      },
    }
  },

  themeConfig: {
    siteTitle: 'Memoh',
    sidebar: {
      ...en,
      ...zh,
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
