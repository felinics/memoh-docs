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

The product source code lives in [`felinics/Memoh`](https://github.com/felinics/Memoh). This repository only owns the docs site: the [Scalar Docs](https://scalar.com/products/docs) config, Markdown pages, and screenshots.

## What Is Here

- **Guides** for bots, sessions, workspaces, skills, connectors, hooks, MCP, memory, scheduled tasks, and slash commands.
- **Integrations** for channels and providers (LLM, memory, TTS, web search, video).
- **Self-hosted** docs for Desktop, Server Deploy, and workspace backends.
- **English and Chinese docs** under `docs/en/` and `docs/zh/`, exposed as two top-level tabs.
- **Scalar config** in `scalar.config.json`, generated from `scripts/build-config.py`.

## Documentation Structure

```
docs/
├── en/
│   ├── index.md          # English home (cards)
│   ├── about.md
│   ├── guides/
│   ├── integrations/
│   └── self-hosted/
├── zh/                   # Simplified Chinese mirror, same layout
└── public/               # logo + screenshots
```

Keep the English and Simplified Chinese docs mirrored. If you add, rename, remove, or move a page in one language, make the matching change in the other language.

## Local Development

Preview locally with the Scalar CLI (Node.js 20+):

```bash
npx @scalar/cli project preview
```

The preview reads `scalar.config.json` and hot-reloads Markdown changes.

## Checks

```bash
python3 scripts/check-links.py
```

Validates that every page in `scalar.config.json` exists, every `.md` file is listed, and all internal links and images resolve. This runs in CI on every pull request.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes to Scalar via `npx @scalar/cli project publish`. Pull requests from this repository get a preview deployment. The workflow needs a `SCALAR_API_KEY` repository secret (create one at https://dashboard.scalar.com/user/api-keys).

## Contributing

1. Edit or add Markdown under `docs/en/` and `docs/zh/`.
2. If you added, removed, or renamed a page, update `SIDEBAR` in `scripts/build-config.py` and run `python3 scripts/build-config.py` to regenerate `scalar.config.json`. Do not hand-edit the generated file.
3. Run `python3 scripts/check-links.py`.
4. Run `npx @scalar/cli project preview` and check both the English and 中文 tabs.

Authoring notes:

- Use relative `.md` links between pages, e.g. `[Bot](../guides/bot.md)`.
- Callouts use `<scalar-callout type="tip|info|warning|danger">…</scalar-callout>`.
- Front matter supports `title` and `description`.

## License

The documentation follows the license of the Memoh project unless a file says otherwise.
