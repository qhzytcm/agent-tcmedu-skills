#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 文档同步校验
 * ------------------------------------------------------------------
 * 防止「技能表漂移」：README.md 与 docs/01-能力地图.md 中的技能表
 * 必须与 catalog.json 完全一致（每个 slug 都要出现，且总数一致）。
 *
 * 另外校验 docs/03-命名与编码规范.md 的分类表与 CATEGORIES 一致。
 *
 *   node scripts/check-docs.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATEGORIES } from './skills.spec.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalog = JSON.parse(readFileSync(join(root, 'catalog.json'), 'utf8'));

let failures = 0;
const fail = (m) => { failures += 1; console.error(`[check-docs] ✗ ${m}`); };
const ok = (m) => console.log(`[check-docs] ✓ ${m}`);

/** 需要列出全部技能的文档（四级目录为生成物，是技能清单的事实源） */
const SKILL_TABLE_DOCS = ['docs/05-四级目录（篇·章·节·目）.md'];
/** 需要列出全部分类的文档 */
const CATEGORY_TABLE_DOCS = ['README.md', 'README.en.md', 'docs/01-能力地图.md', 'docs/03-命名与编码规范.md'];

for (const rel of SKILL_TABLE_DOCS) {
  const p = join(root, rel);
  if (!existsSync(p)) { fail(`${rel} 不存在`); continue; }
  const text = readFileSync(p, 'utf8');
  const missing = catalog.skills.map((s) => s.name).filter((slug) => !text.includes(`\`${slug}\``));
  if (missing.length) fail(`${rel} 缺少 ${missing.length} 个技能的引用：${missing.join(', ')}`);
  else ok(`${rel} 覆盖全部 ${catalog.skillCount} 个技能`);

  // 四级编码自检：每个技能的 libraryCode 都要出现
  const missingCode = catalog.skills.filter((s) => !text.includes(`目 ${s.libraryCode} `));
  if (missingCode.length) fail(`${rel} 缺少 ${missingCode.length} 个四级编码定位：${missingCode.slice(0, 5).map((s) => s.name).join(', ')}…`);
  else ok(`${rel} 覆盖全部 ${catalog.skillCount} 个四级编码`);
}

// 学科覆盖矩阵必须覆盖 tcmP 主仓的全部学科
{
  const rel = 'docs/06-学科覆盖矩阵.md';
  const p = join(root, rel);
  const subjPath = join(root, 'data', 'tcmP-subjects.json');
  if (!existsSync(p)) fail(`${rel} 不存在（请先 npm run sync && npm run build）`);
  else if (!existsSync(subjPath)) fail('data/tcmP-subjects.json 不存在（请先 npm run sync）');
  else {
    const text = readFileSync(p, 'utf8');
    const src = JSON.parse(readFileSync(subjPath, 'utf8'));
    const codes = src.domains.flatMap((d) => d.subjects.map((s) => s.code));
    const missing = codes.filter((c) => !text.includes(c));
    if (missing.length) fail(`${rel} 缺少 ${missing.length} 个学科行：${missing.slice(0, 5).join(', ')}…`);
    else ok(`${rel} 覆盖全部 ${codes.length} 个学科`);
  }
}

for (const rel of CATEGORY_TABLE_DOCS) {
  const p = join(root, rel);
  if (!existsSync(p)) { fail(`${rel} 不存在`); continue; }
  const text = readFileSync(p, 'utf8');
  const missing = CATEGORIES.map((c) => c.slug).filter((slug) => !text.includes(slug));
  if (missing.length) fail(`${rel} 缺少分类引用：${missing.join(', ')}`);
  else ok(`${rel} 覆盖全部 ${CATEGORIES.length} 个分类`);
}

// 总数声明自检：文档必须声明正确的技能总数，且不得出现自相矛盾的总数声明。
// 只在「明确的总数形态」上判定，避免把按分类的分项计数（如「炮制鉴定 3 个技能」）误判。
const TOTAL_FORMS = (n) => [`${n} 个技能`, `${n} 技能`, `${n} Skills`];
const CONTRADICTION_PATTERNS = [
  /共\s*(\d+)\s*个技能/g,
  /×\s*(\d+)\s*技能/g,
  /`(\d+)\s*Skills`/g,
];
for (const rel of ['README.md', 'docs/00-架构总览.md', 'docs/01-能力地图.md']) {
  const p = join(root, rel);
  if (!existsSync(p)) continue;
  const text = readFileSync(p, 'utf8');
  if (!TOTAL_FORMS(catalog.skillCount).some((f) => text.includes(f))) {
    fail(`${rel} 未声明技能总数（应出现「${catalog.skillCount} 个技能」或「${catalog.skillCount} Skills」）`);
  } else {
    ok(`${rel} 技能总数声明正确（${catalog.skillCount}）`);
  }
  for (const re of CONTRADICTION_PATTERNS) {
    const bad = [...text.matchAll(re)].map((m) => Number(m[1])).filter((n) => n !== catalog.skillCount);
    if (bad.length) fail(`${rel} 出现矛盾的技能总数声明：${[...new Set(bad)].join('/')}（应为 ${catalog.skillCount}）`);
  }
}

if (failures) { console.error(`\n[check-docs] 文档同步校验失败：${failures} 项。`); process.exit(1); }
console.log('\n[check-docs] 文档同步校验通过。');
