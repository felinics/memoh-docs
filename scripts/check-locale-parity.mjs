#!/usr/bin/env node
/**
 * check-locale-parity.mjs — docs locale parity checker. Dependency-free.
 *
 * For each translated locale (zh, ja), checks two things against en:
 *   1. Page tree — every *.md under docs/ (excluding locale dirs, docs/public,
 *      docs/.vitepress) has a mirror at docs/<locale>/<same path>, and vice versa.
 *   2. Sidebars — docs/.vitepress/en.ts and <locale>.ts link the same multiset
 *      of paths once the /<locale> prefix is stripped from the locale side.
 *
 * Exits 1 on any mismatch, 0 otherwise.
 * Run from anywhere: paths are resolved relative to this script.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const LOCALES = ['zh', 'ja', 'ru']

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(repoRoot, 'docs')

const EN_EXCLUDED_TOP_DIRS = new Set([...LOCALES, 'public', '.vitepress'])

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

/** Strip a leading /<locale> prefix: /zh/guides/x.md -> /guides/x.md */
function stripLocalePrefix(link, locale) {
  return link.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
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

const enPages = listMarkdown(docsDir, docsDir, (rel) => EN_EXCLUDED_TOP_DIRS.has(rel))
const enSet = new Set(enPages)

console.log(`Locale parity check: docs/ (en) <-> ${LOCALES.map((l) => `docs/${l}/`).join(', ')}`)

for (const locale of LOCALES) {
  const localeDir = join(docsDir, locale)

  // -------------------------------------------------------------------------
  // 1. Page tree parity
  // -------------------------------------------------------------------------

  console.log('')
  console.log(`[${locale}] [1/2] Markdown page tree`)

  const locPages = existsSync(localeDir) ? listMarkdown(localeDir, localeDir) : []
  const locSet = new Set(locPages)

  console.log(`  en pages: ${enPages.length}   ${locale} pages: ${locPages.length}`)

  reportGroup(
    `Missing ${locale} mirror (en page exists, ${locale} twin does not)`,
    enPages.filter((p) => !locSet.has(p)).map((p) => `docs/${p}  ->  expected docs/${locale}/${p}`),
  )
  reportGroup(
    `Missing en source (${locale} page exists, en twin does not)`,
    locPages.filter((p) => !enSet.has(p)).map((p) => `docs/${locale}/${p}  ->  expected docs/${p}`),
  )
  if (enPages.every((p) => locSet.has(p)) && locPages.every((p) => enSet.has(p))) {
    console.log('  OK: every page is mirrored in both locales.')
  }

  // -------------------------------------------------------------------------
  // 2. Sidebar link parity
  // -------------------------------------------------------------------------

  console.log('')
  console.log(`[${locale}] [2/2] Sidebar links: docs/.vitepress/en.ts <-> ${locale}.ts`)

  const enConfigPath = join(docsDir, '.vitepress', 'en.ts')
  const locConfigPath = join(docsDir, '.vitepress', `${locale}.ts`)

  const missingConfigs = [enConfigPath, locConfigPath].filter((p) => !existsSync(p))
  if (missingConfigs.length > 0) {
    for (const p of missingConfigs) console.log(`  ERROR: config not found: ${relative(repoRoot, p)}`)
    failures += missingConfigs.length
    continue
  }

  const enLinks = extractSidebarLinks(readFileSync(enConfigPath, 'utf8'))
  const locLinks = extractSidebarLinks(readFileSync(locConfigPath, 'utf8')).map((l) => stripLocalePrefix(l, locale))

  console.log(`  en links: ${enLinks.length}   ${locale} links: ${locLinks.length}`)

  const enCounts = toMultiset(enLinks)
  const locCounts = toMultiset(locLinks)
  const allLinks = [...new Set([...enCounts.keys(), ...locCounts.keys()])].sort()

  const onlyEn = []
  const onlyLoc = []
  for (const link of allLinks) {
    const inEn = enCounts.get(link) ?? 0
    const inLoc = locCounts.get(link) ?? 0
    if (inEn > inLoc) onlyEn.push(inLoc === 0 ? link : `${link}  (${inEn}x in en.ts, ${inLoc}x in ${locale}.ts)`)
    if (inLoc > inEn) onlyLoc.push(inEn === 0 ? link : `${link}  (${inLoc}x in ${locale}.ts, ${inEn}x in en.ts)`)
  }

  reportGroup(`Links only in en.ts (missing from ${locale}.ts)`, onlyEn)
  reportGroup(`Links only in ${locale}.ts (missing from en.ts)`, onlyLoc)
  if (onlyEn.length === 0 && onlyLoc.length === 0) {
    console.log('  OK: both sidebars link the same set of pages.')
  }
}

console.log('')
if (failures > 0) {
  console.log(`FAIL: ${failures} parity problem(s) found.`)
  process.exit(1)
}
console.log(`PASS: en and ${LOCALES.join('/')} locales are in parity.`)
