#!/usr/bin/env node
/**
 * check-locale-parity.mjs — en/zh docs parity checker. Dependency-free.
 *
 * Checks two things:
 *   1. Page tree — every *.md under docs/ (excluding docs/zh, docs/public,
 *      docs/.vitepress) has a mirror at docs/zh/<same path>, and vice versa.
 *   2. Sidebars — docs/.vitepress/en.ts and zh.ts link the same multiset of
 *      paths once the /zh prefix is stripped from the zh side.
 *
 * Exits 1 on any mismatch, 0 otherwise.
 * Run from anywhere: paths are resolved relative to this script.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(repoRoot, 'docs')
const zhDir = join(docsDir, 'zh')

const EN_EXCLUDED_TOP_DIRS = new Set(['zh', 'public', '.vitepress'])

/** Recursively collect *.md paths under `dir`, POSIX-relative to `base`. */
function listMarkdown(dir, base, isExcluded) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    const rel = relative(base, full).split(sep).join('/')
    if (isExcluded && isExcluded(rel)) continue
    if (entry.isDirectory()) {
      out.push(...listMarkdown(full, base, isExcluded))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(rel)
    }
  }
  return out.sort()
}

/** Extract every `link: '...'` value from a VitePress locale config, in order. */
function extractSidebarLinks(source) {
  const links = []
  const re = /\blink:\s*(['"`])([^'"`]*)\1/g
  let m
  while ((m = re.exec(source)) !== null) links.push(m[2])
  return links
}

/** Strip a leading /zh locale prefix: /zh/guides/x.md -> /guides/x.md */
function stripZhPrefix(link) {
  return link.replace(/^\/zh(?=\/|$)/, '') || '/'
}

/** Array -> Map of value -> occurrence count. */
function toMultiset(items) {
  const counts = new Map()
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)
  return counts
}

let failures = 0

function reportGroup(title, lines) {
  if (lines.length === 0) return
  failures += lines.length
  console.log(`  ${title}:`)
  for (const line of lines) console.log(`    - ${line}`)
}

// ---------------------------------------------------------------------------
// 1. Page tree parity
// ---------------------------------------------------------------------------

console.log('Locale parity check: docs/ (en) <-> docs/zh/ (zh)')
console.log('')
console.log('[1/2] Markdown page tree')

const enPages = listMarkdown(docsDir, docsDir, (rel) => EN_EXCLUDED_TOP_DIRS.has(rel))
const zhPages = existsSync(zhDir) ? listMarkdown(zhDir, zhDir) : []
const enSet = new Set(enPages)
const zhSet = new Set(zhPages)

console.log(`  en pages: ${enPages.length}   zh pages: ${zhPages.length}`)

reportGroup(
  'Missing zh mirror (en page exists, zh twin does not)',
  enPages.filter((p) => !zhSet.has(p)).map((p) => `docs/${p}  ->  expected docs/zh/${p}`),
)
reportGroup(
  'Missing en source (zh page exists, en twin does not)',
  zhPages.filter((p) => !enSet.has(p)).map((p) => `docs/zh/${p}  ->  expected docs/${p}`),
)
if (enPages.every((p) => zhSet.has(p)) && zhPages.every((p) => enSet.has(p))) {
  console.log('  OK: every page is mirrored in both locales.')
}

// ---------------------------------------------------------------------------
// 2. Sidebar link parity
// ---------------------------------------------------------------------------

console.log('')
console.log('[2/2] Sidebar links: docs/.vitepress/en.ts <-> docs/.vitepress/zh.ts')

const enConfigPath = join(docsDir, '.vitepress', 'en.ts')
const zhConfigPath = join(docsDir, '.vitepress', 'zh.ts')

const missingConfigs = [enConfigPath, zhConfigPath].filter((p) => !existsSync(p))
if (missingConfigs.length > 0) {
  for (const p of missingConfigs) console.log(`  ERROR: config not found: ${relative(repoRoot, p)}`)
  failures += missingConfigs.length
} else {
  const enLinks = extractSidebarLinks(readFileSync(enConfigPath, 'utf8'))
  const zhLinks = extractSidebarLinks(readFileSync(zhConfigPath, 'utf8')).map(stripZhPrefix)

  console.log(`  en links: ${enLinks.length}   zh links: ${zhLinks.length}`)

  const enCounts = toMultiset(enLinks)
  const zhCounts = toMultiset(zhLinks)
  const allLinks = [...new Set([...enCounts.keys(), ...zhCounts.keys()])].sort()

  const onlyEn = []
  const onlyZh = []
  for (const link of allLinks) {
    const inEn = enCounts.get(link) ?? 0
    const inZh = zhCounts.get(link) ?? 0
    if (inEn > inZh) onlyEn.push(inZh === 0 ? link : `${link}  (${inEn}x in en.ts, ${inZh}x in zh.ts)`)
    if (inZh > inEn) onlyZh.push(inEn === 0 ? link : `${link}  (${inZh}x in zh.ts, ${inEn}x in en.ts)`)
  }

  reportGroup('Linked in en.ts but not in zh.ts (zh path shown without /zh prefix)', onlyEn)
  reportGroup('Linked in zh.ts but not in en.ts (shown without /zh prefix)', onlyZh)
  if (onlyEn.length === 0 && onlyZh.length === 0) {
    console.log('  OK: both sidebars link the same set of pages.')
  }
}

// ---------------------------------------------------------------------------

console.log('')
if (failures > 0) {
  console.log(`FAIL: ${failures} parity mismatch${failures === 1 ? '' : 'es'}. en is the source of truth; every content PR must update both locales.`)
  process.exit(1)
}
console.log('PASS: en and zh locales are in parity.')
process.exit(0)
