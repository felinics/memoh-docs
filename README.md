# Memoh Docs

<p align="center">
  <img src="./docs/public/logo.svg" alt="Memoh" width="96" height="96">
</p>

<p align="center">
  <strong>Documentation source for Memoh.</strong>
</p>

<p align="center">
  <a href="https://docs.memoh.ai">docs.memoh.ai</a>
  ·
  <a href="https://github.com/felinics/Memoh">Memoh</a>
  ·
  <a href="./README_CN.md">简体中文</a>
</p>

This repository contains the public documentation site for [Memoh](https://github.com/felinics/Memoh), a multi-member, long-memory AI agent platform with isolated workspaces, channel integrations, and desktop/server deployment modes.

The product source code lives in [`felinics/Memoh`](https://github.com/felinics/Memoh). This repository only owns the docs site: VitePress config, Markdown pages, and screenshots.

## What Is Here

- **Guides** for SaaS/product usage: bots, workspaces, sessions, memory, MCP, email, scheduled tasks, and slash commands.
- **Integrations** for channels and providers, including messaging platforms, LLMs, memory providers, TTS, and web search.
- **Self-hosted** docs for Desktop, Server Deploy, workspace backends, Kata, and SQLite.
- **English, Chinese, Japanese, and Russian docs** under `docs/`, `docs/zh/`, `docs/ja/`, and `docs/ru/`.
- **Static assets** under `docs/public/`, including screenshots and logos.
- **VitePress config** under `docs/.vitepress/`.

## Documentation Structure

The current VitePress site is organized around three primary navigation roots:

- `docs/guides/` for product usage guides.
- `docs/integrations/` for channels, providers, memory providers, TTS, and web search.
- `docs/self-hosted/` for Desktop, Server Deploy, workspace backends, and connectors (Connect-It).

The Simplified Chinese, Japanese, and Russian mirrors use the same structure under `docs/zh/`, `docs/ja/`, and `docs/ru/`:

- `docs/zh/guides/`, `docs/ja/guides/`, `docs/ru/guides/`
- `docs/zh/integrations/`, `docs/ja/integrations/`, `docs/ru/integrations/`
- `docs/zh/self-hosted/`, `docs/ja/self-hosted/`, `docs/ru/self-hosted/`

Legacy paths still exist for old external links, but they are redirect pages instead of the main content source:

- `docs/getting-started/`
- `docs/installation/`
- `docs/channels/`
- `docs/memory-providers/`
- Matching Chinese redirects under `docs/zh/`

When updating content, edit the primary paths above first. Only touch a legacy redirect page when the redirect target itself changes.

Keep the English, Simplified Chinese, Japanese, and Russian docs mirrored. If you add, rename, remove, or move a page in one language, make the matching change in the other languages and update every VitePress sidebar file.

Do not edit `docs/.vitepress/dist/` by hand. It is generated build output and should not be treated as source documentation.

## Local Development

Use Node.js and pnpm. The repository is a standalone VitePress project.

```bash
pnpm install
pnpm dev
```

The dev server runs at:

```text
http://localhost:5173
```

## Build

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project Layout

```text
.
├── docs/
│   ├── .vitepress/        # VitePress config, nav, sidebars
│   ├── guides/            # Product usage guides
│   ├── integrations/      # Channels and providers
│   ├── self-hosted/       # Open-source deployment docs
│   ├── getting-started/   # Legacy redirects to guides
│   ├── installation/      # Legacy redirects to self-hosted
│   ├── channels/          # Legacy redirects to integrations/channels
│   ├── memory-providers/  # Legacy redirects to integrations/providers/memory
│   ├── public/            # Static images and logo
│   ├── zh/                # Simplified Chinese documentation and redirects
│   ├── ja/                # Japanese documentation and redirects
│   ├── ru/                # Russian documentation and redirects
│   └── *.md               # Landing and compatibility pages
├── package.json
└── pnpm-lock.yaml
```

## Changelog

### 2026-10

- **Client-first corrections round**: top nav is now Guides / Help Center (Integrations and About removed); the Deployment sidebar group is back (Server Deploy, Workspace Backends, Connectors).
- **Apps model**: Supermarket and Skills pages rewritten around the unified App concept (an App bundles Skills, dependencies, and connectors); Skills now documents workspace directories instead of a removed management UI; Connectors moved to the Deployment section.
- **Cloud-baseline Workspace page**: open-source backend configuration and CDI/GPU passthrough moved to Workspace Backends; Preferences page removed; Memory provider entries consolidated into one; TTS: Edge removed.
- **Use Cases removed**: the AI-drafted Use Cases section is gone from nav, sidebar, and pages; it will return as human-written chapters with real screenshots and recordings.
- **Japanese and Russian locales**: full ja and ru translations under `docs/ja/` and `docs/ru/` with their own navs and sidebars. Japanese terminology is aligned with the product's Japanese UI strings; Russian keeps UI labels in English because the product has no Russian UI. The parity script now checks en/zh/ja/ru.

### 2026-09

- **Navigation restructure**: docs are now organized under a single **References** tree — Getting Started (with Deployment and Channels), Advanced (with Providers → Memory / TTS Providers), and Use Cases. The version selector moved to the header right, and edit links were added to every page.
- **New Get Started tutorial**: a step-by-step onboarding guide added for both English and Chinese docs; Overview now comes before Getting Started in the sidebar.
- **Framework**: evaluated a migration to Scalar Docs, then restored VitePress while keeping all content and structure changes intact.
- **Translation quality pass**: reviewed all 53 English/Chinese page pairs; fixed mistranslations (e.g. ACL presets, private channels, compaction behavior), typos, machine-translated phrasing, and terminology mismatches across 29 files, plus a plural typo in the English Matrix page.
- **Housekeeping**: `.gitignore` now correctly excludes `docs/.vitepress/cache`.

### Earlier

- Synced docs with the Memoh source and added Quick Start (#7).
- Added Connect-It connectors documentation (#5).
- Updated documentation for v0.17 (#4) and v0.13.

## Contributing

Small fixes are best made directly in the relevant Markdown page. For larger changes:

1. Run `pnpm dev`.
2. Edit the docs under `docs/`.
3. Run `pnpm build`.
4. Open a pull request with screenshots when the change affects layout or images.

When adding a new page, update the matching sidebar file in `docs/.vitepress/`:

- `en.ts` for English pages
- `zh.ts` for Chinese pages

Do not use the legacy redirect folders as the canonical location for new content. New source pages should live under `guides`, `integrations`, or `self-hosted`, with the matching `docs/zh/` page kept in sync.

## License

The documentation follows the license of the Memoh project unless a file says otherwise.
