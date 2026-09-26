#!/usr/bin/env node
/**
 * agent-tcmedu-skills · CLI
 * ------------------------------------------------------------------
 *   agent-tcmedu list [分类]              列出技能
 *   agent-tcmedu search <关键词>          搜索技能
 *   agent-tcmedu info <slug>              查看技能详情
 *   agent-tcmedu match "<问题>" [--top N] 自然语言匹配技能
 *   agent-tcmedu ask   "<问题>"           匹配并调用 Hermes 执行
 *   agent-tcmedu prompt                   打印项目级启动 Prompt（HERMES.md）
 *   agent-tcmedu doctor                   体检：文件数 / 版本 / Hermes 配置可见性
 *   agent-tcmedu install hermes           Hermes 安装（默认 dry-run，加 --apply 落盘）
 *   agent-tcmedu export generic --target <dir>   导出为通用扁平技能包
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { rankSkills } from './lib/match.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalogPath = join(root, 'catalog.json');
const skillsRoot = join(root, 'skills');

const argv = process.argv.slice(2);
const cmd = argv[0];
const flags = {};
const positional = [];
for (let i = 1; i < argv.length; i += 1) {
  const a = argv[i];
  if (a.startsWith('--')) {
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) { flags[key] = next; i += 1; } else { flags[key] = true; }
  } else positional.push(a);
}

function loadCatalog() {
  if (!existsSync(catalogPath)) {
    console.error('catalog.json 不存在，请先执行: npm run build');
    process.exit(1);
  }
  return JSON.parse(readFileSync(catalogPath, 'utf8'));
}

function resolveCategory(catalog, token) {
  if (!token) return null;
  const hit = catalog.categories.find((c) => c.slug === token || c.zh === token);
  if (!hit) {
    console.error(`未知分类: ${token}`);
    console.error('可用分类: ' + catalog.categories.map((c) => `${c.slug}(${c.zh})`).join('、'));
    process.exit(1);
  }
  return hit;
}

function printTable(rows, headers) {
  const widths = headers.map((h, i) => Math.max(String(h).length, ...rows.map((r) => String(r[i] ?? '').length)));
  const line = (cells) => cells.map((c, i) => String(c ?? '').padEnd(widths[i])).join('  ');
  console.log(line(headers));
  console.log(widths.map((w) => '-'.repeat(w)).join('  '));
  for (const r of rows) console.log(line(r));
}

// ─────────────────────────── list ───────────────────────────
function cmdList() {
  const catalog = loadCatalog();
  const cat = resolveCategory(catalog, positional[0]);
  const items = cat ? catalog.skills.filter((s) => s.category === cat.slug) : catalog.skills;
  console.log(`${catalog.name} v${catalog.version} — ${items.length} 个 Skill${cat ? `（分类 ${cat.slug} / ${cat.zh}）` : ''}\n`);
  printTable(
    items.map((s) => [s.category, s.name, s.title, s.platformApis?.length ? '平台' : '离线', s.standaloneSupport]),
    ['分类', 'slug', '名称', '依赖', '可用性'],
  );
}

// ────────────────────────── search ──────────────────────────
function cmdSearch() {
  const catalog = loadCatalog();
  const kw = (positional.join(' ') || '').toLowerCase();
  if (!kw) { console.error('用法: agent-tcmedu search <关键词>'); process.exit(1); }
  const hits = catalog.skills.filter((s) =>
    [s.name, s.title, s.description, ...(s.tags ?? []), ...(s.subjects ?? []), ...(s.abilities ?? []), ...(s.scenarios ?? [])]
      .join(' ').toLowerCase().includes(kw));
  if (!hits.length) { console.log(`未找到与「${kw}」相关的 Skill。`); return; }
  console.log(`搜索「${kw}」命中 ${hits.length} 个 Skill\n`);
  printTable(hits.map((s) => [s.name, s.title, s.description.slice(0, 40) + '…']), ['slug', '名称', '简介']);
}

// ─────────────────────────── info ───────────────────────────
function cmdInfo() {
  const catalog = loadCatalog();
  const slug = positional[0];
  const s = catalog.skills.find((x) => x.name === slug);
  if (!s) { console.error(`未找到 Skill: ${slug}`); process.exit(1); }
  console.log(`# ${s.title}\n`);
  console.log(`slug       : ${s.name}`);
  console.log(`分类       : ${s.category} / ${s.categoryZh}`);
  console.log(`领域       : ${s.domain}`);
  console.log(`版本       : ${s.version}`);
  console.log(`简介       : ${s.description}`);
  console.log(`学段       : ${(s.stages ?? []).join('、') || '-'}`);
  console.log(`学科       : ${(s.subjects ?? []).join('、') || '-'}`);
  console.log(`角色       : ${(s.roles ?? []).join('、') || '-'}`);
  console.log(`教材       : ${(s.textbookCodes ?? []).join('、') || '-'}`);
  if (s.levelGate) console.log(`成长门禁   : ${s.levelGate}`);
  console.log(`平台接口   : ${(s.platformApis ?? []).join('、') || '（无，可离线）'}`);
  console.log(`可用性     : ${s.standaloneSupport}`);
  console.log(`文件       : ${s.path}`);
}

// ────────────────────────── match ───────────────────────────
function matchTop(q, top) {
  return rankSkills(loadCatalog().skills, q, top);
}

function cmdMatch() {
  const q = positional.join(' ');
  if (!q) { console.error('用法: agent-tcmedu match "<问题>" [--top N]'); process.exit(1); }
  const top = Number(flags.top || 5);
  const hits = matchTop(q, top);
  if (!hits.length) { console.log('未匹配到 Skill，建议补充领域或教材信息。'); return; }
  console.log(`问题：「${q}」\n匹配到 ${hits.length} 个候选：\n`);
  printTable(hits.map((h, i) => [`${i + 1}`, h.s.name, h.s.title, h.sc.toFixed(1)]), ['#', 'slug', '名称', '得分']);
}

// ─────────────────────────── ask ────────────────────────────
function cmdAsk() {
  const q = positional.join(' ');
  if (!q) { console.error('用法: agent-tcmedu ask "<问题>" [--hermes-bin <path>]'); process.exit(1); }
  const hits = matchTop(q, 1);
  if (!hits.length) { console.error('未匹配到 Skill。'); process.exit(1); }
  const skill = hits[0].s;
  console.log(`Using Skill: ${skill.name} — ${skill.title}`);
  const bin = flags['hermes-bin'] || 'hermes';
  const args = ['chat', '-s', skill.name, q];
  console.log(`执行: ${bin} ${args.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' ')}\n`);
  const r = spawnSync(bin, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.error) {
    console.error(`未能调用 Hermes：${r.error.message}`);
    console.error('提示：可用 --hermes-bin 指定路径，或先手动安装 Skill 包。');
    process.exit(1);
  }
  process.exit(r.status ?? 0);
}

// ────────────────────────── prompt ──────────────────────────
function promptText(catalog) {
  const lines = [];
  lines.push('# agent-tcmedu-skills · 项目级启动 Prompt');
  lines.push('');
  lines.push(`本项目已安装 tcmP 中医药网络教育平台的 Agent Skill Pack（${catalog.name} v${catalog.version}，共 ${catalog.skillCount} 个 Skill，${catalog.categoryCount} 个分类）。`);
  lines.push('');
  lines.push('当用户提出**中医药教育、教材学习、经典研读、临床辨证、中药方剂、针灸推拿、骨伤五官、中医智能、中医管理、考试备考、师承带教、六者角色或医圣成长**相关的请求时：');
  lines.push('');
  lines.push('1. **不要直接回答**，先在 `agent-tcmedu-skills` 这套 Skill Pack 中检索最匹配的 Skill；');
  lines.push('2. 选定后用 `skill_view(name)` 加载完整 SKILL.md，再按其中的「推荐工作流」执行；');
  lines.push('3. 涉及平台接口（病证单位检索 / 知识图谱 / ICD-11 / 六者端点）时，先确认平台可达；不可达则在结论中标注「未能核实」，不得凭记忆补齐；');
  lines.push('4. 涉及患者安全的输出必须携带边界声明与就医提示，不输出处方剂量。');
  lines.push('');
  lines.push('## 分类索引');
  lines.push('');
  for (const c of catalog.categories) {
    lines.push(`- \`${c.slug}\`（${c.zh}，${c.count} 个）：${c.description}`);
  }
  lines.push('');
  lines.push('## 全量 Skill 清单');
  lines.push('');
  lines.push('| slug | 名称 | 分类 | 依赖 |');
  lines.push('| --- | --- | --- | --- |');
  for (const s of catalog.skills) {
    lines.push(`| \`${s.name}\` | ${s.title} | ${s.category} | ${s.platformApis?.length ? '平台' : '离线'} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function cmdPrompt() {
  const catalog = loadCatalog();
  const text = promptText(catalog);
  if (flags.target) {
    const p = resolve(flags.target);
    if (existsSync(p) && !flags.overwrite) {
      console.error(`目标已存在，未覆盖: ${p}（如需覆盖请加 --overwrite）`);
      process.exit(1);
    }
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text, 'utf8');
    console.log(`已写出: ${p}`);
  } else {
    process.stdout.write(text);
  }
}

// ────────────────────────── doctor ──────────────────────────
function cmdDoctor() {
  const catalog = loadCatalog();
  console.log(`包版本          : ${catalog.version}`);
  console.log(`技能数(catalog) : ${catalog.skillCount}`);
  console.log(`分类数          : ${catalog.categoryCount}`);
  const onDisk = existsSync(skillsRoot)
    ? readdirSync(skillsRoot, { withFileTypes: true }).filter((e) => e.isDirectory())
        .reduce((n, e) => n + countSkillFiles(join(skillsRoot, e.name)), 0)
    : 0;
  console.log(`技能数(磁盘)    : ${onDisk}` + (onDisk === catalog.skillCount ? '  ✓' : '  ✗ 与 catalog 不一致，请 npm run build'));

  const home = process.env.HERMES_HOME || join(process.env.USERPROFILE || process.env.HOME || '.', '.hermes');
  const cfg = join(home, 'config.yaml');
  console.log(`Hermes home     : ${home}`);
  if (existsSync(cfg)) {
    const text = readFileSync(cfg, 'utf8');
    const linked = text.includes('agent-tcmedu-skills') || text.includes(skillsRoot.replace(/\\/g, '/'));
    console.log(`Hermes config   : ${cfg}  external_dirs 已接入: ${linked ? 'yes ✓' : 'no ✗'}`);
    if (!linked) console.log('                 修复: agent-tcmedu install hermes --apply');
  } else {
    console.log(`Hermes config   : ${cfg} 不存在`);
  }
  const apiBound = catalog.skills.filter((s) => s.platformApis?.length).length;
  console.log(`平台绑定技能    : ${apiBound} / ${catalog.skillCount}`);
  console.log(`平台地址        : ${catalog.platformBase}`);
}

function countSkillFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countSkillFiles(join(dir, e.name));
    else if (e.name === 'SKILL.md') n += 1;
  }
  return n;
}

// ───────────────────────── install ──────────────────────────
function cmdInstall() {
  const tool = positional[0];
  if (tool !== 'hermes') {
    console.error('当前仅支持: agent-tcmedu install hermes');
    process.exit(1);
  }
  const home = flags.config
    ? dirname(resolve(flags.config))
    : (process.env.HERMES_HOME || join(process.env.USERPROFILE || process.env.HOME || '.', '.hermes'));
  const cfg = flags.config ? resolve(flags.config) : join(home, 'config.yaml');
  const dir = skillsRoot.replace(/\\/g, '/');

  const snippet = existsSync(cfg) && readFileSync(cfg, 'utf8').includes('external_dirs')
    ? `# 把下面路径加入 config.yaml 的 skills.external_dirs 列表：\n  - "${dir}"`
    : `# 在 config.yaml 顶层加入：\nskills:\n  external_dirs:\n    - "${dir}"`;

  console.log(`目标配置: ${cfg}`);
  console.log(`技能目录: ${dir}`);
  console.log('');
  console.log(snippet);

  if (!flags.apply) {
    console.log('\n[DRY-RUN] 未写入。确认无误后加 --apply 落盘（会先备份 config.yaml）。');
    return;
  }
  if (!existsSync(cfg)) {
    console.error(`\n配置文件不存在: ${cfg}。请先创建 Hermes 配置，或用 --config 指定路径。`);
    process.exit(1);
  }
  const original = readFileSync(cfg, 'utf8');
  if (original.includes(dir)) { console.log('\n已存在该 external_dirs 条目，无需修改。'); return; }
  const backup = `${cfg}.bak-${Date.now()}`;
  writeFileSync(backup, original, 'utf8');
  let next;
  if (/^skills:\s*$/m.test(original) && /external_dirs:/.test(original)) {
    next = original.replace(/(external_dirs:\s*\n)/, `$1    - "${dir}"\n`);
  } else if (/^skills:\s*$/m.test(original)) {
    next = original.replace(/^skills:\s*$/m, `skills:\n  external_dirs:\n    - "${dir}"`);
  } else {
    next = original.replace(/\s*$/, `\n\nskills:\n  external_dirs:\n    - "${dir}"\n`);
  }
  writeFileSync(cfg, next, 'utf8');
  console.log(`\n已写入。备份: ${backup}`);
  console.log('验证: hermes skills list');
}

// ───────────────────────── export ───────────────────────────
function cmdExport() {
  const tool = positional[0] || 'generic';
  if (tool !== 'generic') {
    console.error('当前仅支持: agent-tcmedu export generic --target <dir>');
    process.exit(1);
  }
  const target = resolve(flags.target || './dist/agent-skills');
  const catalog = loadCatalog();
  mkdirSync(target, { recursive: true });
  for (const s of catalog.skills) {
    const from = join(root, ...s.path.split('/'));
    const to = join(target, s.name, 'SKILL.md');
    mkdirSync(dirname(to), { recursive: true });
    cpSync(from, to);
  }
  writeFileSync(join(target, 'AGENT_SKILL_PACK.json'), JSON.stringify({
    name: catalog.name, version: catalog.version, skillCount: catalog.skillCount, skills: catalog.skills.map((s) => ({ name: s.name, title: s.title, path: `${s.name}/SKILL.md` })),
  }, null, 2) + '\n', 'utf8');
  console.log(`已导出 ${catalog.skillCount} 个 Skill 到: ${target}`);
  console.log('每个 Skill 形如 <skill-name>/SKILL.md，可直接接入其它 Agent 的 Skill 目录。');
}

// ───────────────────────── route ────────────────────────────
const routes = {
  list: cmdList, search: cmdSearch, info: cmdInfo, match: cmdMatch, ask: cmdAsk,
  prompt: cmdPrompt, doctor: cmdDoctor, install: cmdInstall, export: cmdExport,
};
if (!cmd || cmd === 'help' || cmd === '--help') {
  console.log('agent-tcmedu-skills CLI');
  console.log('  list [分类]                列出技能');
  console.log('  search <关键词>            搜索技能');
  console.log('  info <slug>                查看技能详情');
  console.log('  match "<问题>" [--top N]   自然语言匹配技能');
  console.log('  ask   "<问题>"             匹配并调用 Hermes 执行');
  console.log('  prompt [--target HERMES.md] 打印/写出启动 Prompt');
  console.log('  doctor                     体检');
  console.log('  install hermes [--apply]   Hermes 安装（默认 dry-run）');
  console.log('  export generic --target <dir>  导出通用扁平技能包');
  process.exit(cmd ? 0 : 1);
}
const fn = routes[cmd];
if (!fn) { console.error(`未知命令: ${cmd}`); process.exit(1); }
fn();
