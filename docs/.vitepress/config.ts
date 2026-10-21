import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { en } from './en'
import { zh } from './zh'
import { ja } from './ja'
import { ru } from './ru'

const docsDir = fileURLToPath(new URL('..', import.meta.url))

// Old URLs are kept as `title: Redirecting` stub pages that only run a client
// redirect. They carry no content, so the LLM indexes leave them out.
function redirectPages(dir = docsDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name.startsWith('.') || entry.name === 'public' ? [] : redirectPages(path)
    }
    if (!entry.name.endsWith('.md')) return []
    return /^---\n(?:[^\n]*\n)*?title: Redirecting\n/.test(readFileSync(path, 'utf8'))
      ? [relative(docsDir, path)]
      : []
  })
}

// The plugin matches a directory's index.md by its output path, `<dir>.md`.
const llmsIgnoredPages = redirectPages().map(page => page.replace(/\/index\.md$/, '.md'))

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
    plugins: [llmstxt({
      // Each locale maps /guides/, /integrations/ and /self-hosted/ to the same
      // sidebar object, and the plugin builds the llms.txt table of contents
      // from every sidebar key, so pass each object once.
      sidebar: sidebar => [...new Set(Object.values(sidebar ?? {}))].flat(),
      ignoreFilesPerOutput: {
        llmsTxt: llmsIgnoredPages,
        llmsFullTxt: llmsIgnoredPages,
      },
    })],
  },
})
