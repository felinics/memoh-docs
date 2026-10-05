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
- **English and Chinese docs** under `docs/` and `docs/zh/`.
- **Static assets** under `docs/public/`, including screenshots and logos.
- **VitePress config** under `docs/.vitepress/`.

## Documentation Structure

The current VitePress site is organized around four primary navigation roots:

- `docs/guides/` for product usage guides.
- `docs/integrations/` for channels, providers, memory providers, TTS, and web search.
- `docs/self-hosted/` for Desktop, Server Deploy, workspace backends, and connectors (Connect-It).
- `docs/use-cases/` for ready-to-follow scenarios, one chapter per case.

The Simplified Chinese mirror uses the same structure under `docs/zh/`:

- `docs/zh/guides/`
- `docs/zh/integrations/`
- `docs/zh/self-hosted/`
- `docs/zh/use-cases/`

Legacy paths still exist for old external links, but they are redirect pages instead of the main content source:

- `docs/getting-started/`
- `docs/installation/`
- `docs/channels/`
- `docs/memory-providers/`
- Matching Chinese redirects under `docs/zh/`

When updating content, edit the primary paths above first. Only touch a legacy redirect page when the redirect target itself changes.

Keep the English and Simplified Chinese docs mirrored. If you add, rename, remove, or move a page in one language, make the matching change in the other language and update both VitePress sidebar files.

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
│   ├── use-cases/         # Use-case chapters
│   ├── getting-started/   # Legacy redirects to guides
│   ├── installation/      # Legacy redirects to self-hosted
│   ├── channels/          # Legacy redirects to integrations/channels
│   ├── memory-providers/  # Legacy redirects to integrations/providers/memory
│   ├── public/            # Static images and logo
│   ├── zh/                # Simplified Chinese documentation and redirects
│   └── *.md               # Landing and compatibility pages
├── package.json
└── pnpm-lock.yaml
```

## Changelog

### 2026-10

- **Client-first corrections round**: top nav is now Guides / Use Cases / Help Center (Integrations and About removed); Use Cases split into its own directory with one chapter per scenario; the Deployment sidebar group is back (Server Deploy, Workspace Backends, Connectors).
- **Apps model**: Supermarket and Skills pages rewritten around the unified App concept (an App bundles Skills, dependencies, and connectors); Skills now documents workspace directories instead of a removed management UI; Connectors moved to the Deployment section.
- **Cloud-baseline Workspace page**: open-source backend configuration and CDI/GPU passthrough moved to Workspace Backends; Preferences page removed; Memory provider entries consolidated into one; TTS: Edge removed.

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
