#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 校验器
 * ------------------------------------------------------------------
 * 校验项：
 *   1. catalog.json / .well-known/skills/index.json / skills/ 三者存在
 *   2. 名字与 PACK 一致
 *   3. 三者的技能数一致，且与磁盘上的 SKILL.md 数量一致
 *   4. catalog 中的 path 在磁盘上存在
 *   5. 每个 SKILL.md 的 frontmatter name 与其目录名 / catalog 条目一致
 *   6. 每个 SKILL.md 携带 source: agent-tcmedu-skills 与 author
 *   7. 无重复 slug；无孤儿目录（有 SKILL.md 但不在 catalog）
 *   8. 公开内容不含密钥类敏感模式
 *   9. spec 与 catalog 同步（防止忘记 npm run build）
 *
 *   npm run validate
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PACK, SKILLS } from './skills.spec.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalogPath = join(root, 'catalog.json');
const indexPath = join(root, '.well-known', 'skills', 'index.json');
const fourLevelPath = join(root, 'data', 'four-level-index.json');
const skillsRoot = join(root, 'skills');

let failures = 0;
function fail(message) {
  failures += 1;
  console.error(`[agent-tcmedu-skills] ✗ ${message}`);
}
function ok(message) {
  console.log(`[agent-tcmedu-skills] ✓ ${message}`);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function walkSkillFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkSkillFiles(full));
    else if (entry.isFile() && entry.name === 'SKILL.md') out.push(full);
  }
  return out;
}

const norm = (p) => p.split(sep).join('/');

/** 公开内容禁止出现的敏感模式（防止密钥 / 凭据泄入公开 Skill 文档） */
const FORBIDDEN = [
  /api[_-]?key\s*[:=]/i,
  /\bsk-[A-Za-z0-9]{16,}/,
  /access[_-]?token\s*[:=]/i,
  /refresh[_-]?token\s*[:=]/i,
  /database[_-]?url\s*[:=]/i,
  /private[_-]?key\s*[:=]/i,
  /client[_-]?secret\s*[:=]/i,
  /password\s*[:=]/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
];

// ── 1. 存在性 ──
for (const [label, p] of [
  ['catalog.json', catalogPath],
  ['.well-known/skills/index.json', indexPath],
  ['data/four-level-index.json', fourLevelPath],
  ['skills/', skillsRoot],
]) {
  if (!existsSync(p)) { fail(`${label} 缺失`); }
}
if (failures) { console.error('[agent-tcmedu-skills] 前置文件缺失，终止。'); process.exit(1); }

const catalog = readJson(catalogPath);
const index = readJson(indexPath);
const fourLevel = readJson(fourLevelPath);
const skillFiles = walkSkillFiles(skillsRoot);

// ── 2. 名字 ──
if (catalog.name !== PACK.name) fail(`catalog.name 应为 ${PACK.name}，实际 ${catalog.name}`);
if (index.name !== PACK.name) fail(`discovery index name 应为 ${PACK.name}，实际 ${index.name}`);
if (catalog.version !== PACK.version) fail(`catalog.version=${catalog.version} 与 spec PACK.version=${PACK.version} 不一致（是否忘记 npm run build？）`);
if (index.version !== PACK.version) fail(`discovery index version=${index.version} 与 spec 不一致`);

// ── 3. 计数 ──
if (catalog.skillCount !== catalog.skills.length) {
  fail(`catalog.skillCount=${catalog.skillCount} 但 catalog.skills 有 ${catalog.skills.length} 条`);
}
if (index.skills.length !== catalog.skills.length) {
  fail(`discovery index 有 ${index.skills.length} 条，catalog 有 ${catalog.skills.length} 条`);
}
if (skillFiles.length !== catalog.skills.length) {
  fail(`磁盘上有 ${skillFiles.length} 个 SKILL.md，catalog 有 ${catalog.skills.length} 条`);
}

// ── 4~7. 逐条 ──
const names = new Set();
const fileSet = new Set(skillFiles.map((f) => norm(relative(root, f))));
const indexPathByName = new Map(index.skills.map((s) => [s.name, s]));
const indexByName_libraryCode = new Map(index.skills.map((s) => [s.name, s.libraryCode]));
const liveSlugs = new Set(SKILLS.map((s) => s.slug));

for (const skill of catalog.skills) {
  if (!skill.name) { fail('存在无 name 的 catalog 条目'); continue; }
  if (names.has(skill.name)) fail(`slug 重复: ${skill.name}`);
  names.add(skill.name);

  if (!skill.path || !fileSet.has(skill.path)) {
    fail(`catalog.path 在磁盘上不存在: ${skill.path}`);
    continue;
  }

  // 目录名必须等于 slug
  const dirName = norm(skill.path).split('/').slice(-2)[0];
  if (dirName !== skill.name) fail(`${skill.path} 所在目录 (${dirName}) 与 slug (${skill.name}) 不一致`);

  // 分类目录必须等于 category
  const catDir = norm(skill.path).split('/')[1];
  if (catDir !== skill.category) fail(`${skill.path} 所在分类目录 (${catDir}) 与 category (${skill.category}) 不一致`);

  // discovery 索引对齐
  const is = indexPathByName.get(skill.name);
  if (!is) fail(`discovery index 缺少技能: ${skill.name}`);
  else if (is.path !== skill.path) fail(`discovery path 不一致 ${skill.name}: ${is.path} != ${skill.path}`);

  const content = readFileSync(join(root, skill.path), 'utf8');

  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) fail(`${skill.path} 命中敏感模式: ${pattern}`);
  }
  if (!content.includes(`name: "${skill.name}"`)) fail(`${skill.path} frontmatter name 不匹配 ${skill.name}`);
  if (!content.includes(`source: ${PACK.name}`)) fail(`${skill.path} 缺少 source: ${PACK.name}`);
  if (!content.includes(`author: ${PACK.author}`)) fail(`${skill.path} 缺少 author: ${PACK.author}`);
  if (!content.includes('## 质量门禁 / Quality Gate')) fail(`${skill.path} 缺少质量门禁章节`);
  if (!content.includes('## 与 tcmP 平台的对接 / Platform Binding')) fail(`${skill.path} 缺少平台对接章节`);

  // 平台绑定技能必须声明接口表
  if (skill.platformApis?.length && !skill.platformApis.every((a) => content.includes(a))) {
    fail(`${skill.path} 的平台接口表与 catalog.platformApis 不一致`);
  }

  // 四级目录（篇·章·节·目）
  if (!/^## 四级目录定位 \/ Library Position$/m.test(content)) {
    fail(`${skill.path} 缺少「四级目录定位 / Library Position」章节`);
  }
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(skill.libraryCode ?? '')) {
    fail(`${skill.name} 的 libraryCode 格式非法（应为 篇.章.节.目 纯数字）: ${skill.libraryCode}`);
  } else if (!content.includes(`\`${skill.libraryCode}\``)) {
    fail(`${skill.path} 正文未体现 libraryCode ${skill.libraryCode}`);
  }
  if (indexByName_libraryCode.get(skill.name) !== skill.libraryCode) {
    fail(`discovery index 的 libraryCode 与 catalog 不一致: ${skill.name}`);
  }
}

for (const pattern of FORBIDDEN) {
  if (pattern.test(JSON.stringify(catalog))) fail(`catalog.json 命中敏感模式: ${pattern}`);
}

// 孤儿目录：磁盘有 SKILL.md 但不在 catalog
for (const rel of fileSet) {
  if (!catalog.skills.some((s) => s.path === rel)) fail(`孤儿 SKILL.md（不在 catalog 中）: ${rel}`);
}

// ── 8b. 四级目录一致性 ──
{
  const flCodes = new Map();
  for (const skill of catalog.skills) {
    const c = skill.libraryCode;
    if (!c) { fail(`catalog 条目缺少 libraryCode: ${skill.name}`); continue; }
    if (flCodes.has(c)) fail(`四级编码重复: ${c}（${skill.name} 与 ${flCodes.get(c)}）`);
    flCodes.set(c, skill.name);
  }
  if (fourLevel.skillCount !== catalog.skillCount) {
    fail(`四级目录 skillCount=${fourLevel.skillCount} 与 catalog ${catalog.skillCount} 不一致`);
  }
  const leaves = [];
  for (const p of fourLevel.parts) {
    for (const ch of p.chapters) {
      for (const sec of ch.sections) {
        for (const leaf of sec.skills) leaves.push(leaf);
      }
    }
  }
  if (leaves.length !== catalog.skillCount) {
    fail(`四级目录的「目」数 ${leaves.length} 与 catalog ${catalog.skillCount} 不一致`);
  }
  for (const leaf of leaves) {
    const cat = catalog.skills.find((s) => s.name === leaf.slug);
    if (!cat) { fail(`四级目录出现 catalog 之外的技能: ${leaf.slug}`); continue; }
    if (cat.libraryCode !== leaf.libraryCode) {
      fail(`四级目录编码与 catalog 不一致: ${leaf.slug}（${leaf.libraryCode} ≠ ${cat.libraryCode}）`);
    }
  }
}

// ── 9. spec 同步 ──
const catalogSlugs = catalog.skills.map((s) => s.name);
if (catalogSlugs.length === SKILLS.length) {
  SKILLS.forEach((s, i) => {
    if (catalogSlugs[i] !== s.slug) fail(`spec 与 catalog 顺序不一致 @${i}: spec=${s.slug} catalog=${catalogSlugs[i]}（请执行 npm run build）`);
  });
}
for (const slug of liveSlugs) if (!names.has(slug)) fail(`spec 中的技能未出现在 catalog: ${slug}`);

// ── 汇总 ──
if (failures) {
  console.error(`\n[agent-tcmedu-skills] 校验失败：${failures} 项。`);
  process.exit(1);
}
ok(`catalog / discovery index / skills 三者一致（${catalog.skillCount} 个技能，${catalog.categoryCount} 个分类）`);
ok('frontmatter、平台绑定、质量门禁章节完整');
ok('未发现敏感模式');
ok('spec 与生成物已同步');
console.log('\n[agent-tcmedu-skills] 校验通过。');
