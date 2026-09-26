#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 上游技能提取分析器
 * ------------------------------------------------------------------
 * 扫描上游 `hermes-edu-skills` 技能包，判定每个技能对 tcmP 的可用性，
 * 产出提取报告与机器可读清单：
 *   - data/upstream-extraction.json
 *   - docs/07-上游技能提取报告.md
 *
 *   node scripts/extract-from-upstream.mjs [--upstream <hermes-edu-skills 路径>]
 *
 * 三分类判定（规则见 classify()）：
 *   USE      直接可用   学科无关的通用学习 / 教学工作流外壳，可直接沿用
 *   ADAPT    需改造     有 K12 学段或学科绑定的外壳，需重绑 tcmP 参数
 *   REJECT   不适用     幼小衔接 / 亲子 / 考公 / 外语等级 / K12 学科教材同步
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const argIdx = process.argv.indexOf('--upstream');
const CANDIDATES = [
  argIdx > -1 ? resolve(process.argv[argIdx + 1]) : null,
  'F:\\_ref2',
  join(process.env.USERPROFILE || process.env.HOME || '.', '_ref2'),
].filter(Boolean);

const upstreamRoot = CANDIDATES.find((p) => existsSync(join(p, 'catalog.json')));
if (!upstreamRoot) {
  console.error('[extract] 找不到上游技能包（需含 catalog.json）。用 --upstream <path> 指定。');
  process.exit(1);
}

const upstream = JSON.parse(readFileSync(join(upstreamRoot, 'catalog.json'), 'utf8'));

/** K12 学科：绑定到具体学科的技能，其知识点不可直接迁移 */
const K12_SUBJECTS = ['语文', '数学', '英语', '物理', '化学', '生物', '地理', '历史', '政治', '道德与法治', '科学', '通识'];
/** 与 tcmP（高等中医药教育 + 中医院场景）无关的上游主题——硬性不适用 */
const REJECT_RULES = [
  { re: /preschool|幼小|幼升小/i, why: '学前/幼小衔接，tcmP 无对应学段' },
  { re: /family-|亲子|家长陪|屏幕时间|情绪支持|家校/i, why: 'K12 家庭教育场景，tcmP 无对应需求方' },
  { re: /civil-service|公务员|考公/i, why: '公务员考试，非中医药教育' },
  { re: /cet[46]|四六级|ielts|雅思|toefl|托福/i, why: '外语等级考试，非中医药教育' },
];

/** 可迁移的工作流外壳所在分类 */
const SHELL_CATEGORIES = ['learning-core', 'teacher-tools', 'exam-prep', 'daily-practice', 'reading-writing', 'career-learning'];

/** 上游「工作流外壳」→ 迁移后 tcmP 版技能 slug */
const PORT_MAP = {
  'agent-review-assistant': 'tcm-review-assistant',
  'agent-weakness-boost': 'tcm-weakness-boost',
  'agent-memory-method': 'tcm-memory-method',
  'agent-socratic-tutor': 'tcm-socratic-tutor',
  'agent-learning-habit': 'tcm-learning-habit',
  'agent-holiday-plan': 'tcm-holiday-plan',
  'primary-chinese-recitation-daily': 'tcm-daily-recitation',
  'junior-chemistry-quick-practice': 'tcm-daily-herb-drill',
  'senior-biology-quick-practice': 'tcm-daily-acupoint-drill',
  'teacher-geography-homework-generation': 'tcm-homework-generation',
  'teacher-geography-unit-review': 'tcm-unit-review',
  'teacher-class-analysis-lite': 'tcm-class-analysis',
};

function classify(s) {
  const bag = [s.name, s.title || '', s.category, (s.subjects || []).join(' ')].join(' ');

  // ① 硬性不适用
  for (const r of REJECT_RULES) {
    if (r.re.test(bag)) return { verdict: 'REJECT', why: r.why };
  }
  // ② 非外壳分类（如 textbook-sync：按 K12 教材版本切分，知识点不可迁移）
  if (!SHELL_CATEGORIES.includes(s.category)) {
    return { verdict: 'REJECT', why: `分类 ${s.category} 为 K12 学科教材同步，知识点与 tcmP 无交集` };
  }

  const subjectBound = (s.subjects || []).some((x) => K12_SUBJECTS.includes(x));
  const gradeBound = /^(primary|junior|senior)-/.test(s.name) || (s.stages || []).some((x) => ['primary', 'junior', 'senior', 'preschool'].includes(x));

  // ③ 学科无关的通用学习/教学工作流外壳 → 直接可用
  if (!subjectBound && !gradeBound) {
    return { verdict: 'USE', why: '学科无关的通用工作流外壳，可直接沿用并重绑 tcmP 参数' };
  }
  // ④ 绑定 K12 学科或学段 → 工作流外壳可复用，须重绑中医药学科/学段
  const binds = [subjectBound ? `学科（${(s.subjects || []).join('/')}）` : null, gradeBound ? 'K12 学段' : null].filter(Boolean).join(' + ');
  return { verdict: 'ADAPT', why: `绑定 ${binds}；工作流外壳可复用，须重绑中医药学科与学段` };
}

const rows = (upstream.skills || []).map((s) => {
  const c = classify(s);
  return {
    upstreamSlug: s.name,
    upstreamTitle: s.title || s.name,
    upstreamCategory: s.category,
    subjects: s.subjects || [],
    stages: s.stages || [],
    abilities: s.abilities || [],
    scenarios: s.scenarios || [],
    verdict: c.verdict,
    why: c.why,
    portedTo: PORT_MAP[s.name] || null,
  };
});

const byVerdict = (v) => rows.filter((r) => r.verdict === v);
const byCategory = {};
for (const r of rows) {
  byCategory[r.upstreamCategory] = byCategory[r.upstreamCategory] || { USE: 0, ADAPT: 0, REJECT: 0, total: 0 };
  byCategory[r.upstreamCategory][r.verdict] += 1;
  byCategory[r.upstreamCategory].total += 1;
}

const result = {
  source: `上游技能包 ${upstream.name} v${upstream.version}`,
  sourceRoot: upstreamRoot.replace(/\\/g, '/'),
  generatedBy: 'scripts/extract-from-upstream.mjs',
  upstreamSkillCount: upstream.skillCount ?? rows.length,
  verdicts: { USE: byVerdict('USE').length, ADAPT: byVerdict('ADAPT').length, REJECT: byVerdict('REJECT').length },
  byCategory,
  portedCount: rows.filter((r) => r.portedTo).length,
  skills: rows,
};

mkdirSync(join(repoRoot, 'data'), { recursive: true });
writeFileSync(join(repoRoot, 'data', 'upstream-extraction.json'), JSON.stringify(result, null, 2) + '\n', 'utf8');

// ── 生成人读报告 ──
const L = [];
const pct = (n) => ((n / result.upstreamSkillCount) * 100).toFixed(1) + '%';
L.push('# 上游技能提取报告');
L.push('');
L.push(`> 版本 v${upstream.version} ｜ **由 \`${result.generatedBy}\` 生成，请勿手工编辑。**`);
L.push(`> 源：\`${result.sourceRoot}/catalog.json\`（${result.source}）`);
L.push('>');
L.push(`> 上游技能 **${result.upstreamSkillCount}** 个 → 直接可用 **${result.verdicts.USE}**（${pct(result.verdicts.USE)}）· 需改造 **${result.verdicts.ADAPT}**（${pct(result.verdicts.ADAPT)}）· 不适用 **${result.verdicts.REJECT}**（${pct(result.verdicts.REJECT)}）`);
L.push('>');
L.push(`> 已落地移植 **${result.portedCount}** 个，见分类 \`tcm-upstream\`。`);
L.push('');
L.push('## 判定规则');
L.push('');
L.push('| 判定 | 含义 | 判据 |');
L.push('| --- | --- | --- |');
L.push('| ✅ 直接可用 USE | 可直接沿用并重绑 tcmP 参数 | 学科无关的通用学习/教学工作流外壳（learning-core、teacher-tools 通用项） |');
L.push('| 🔧 需改造 ADAPT | 工作流外壳可复用，须重绑中医药学科 | 绑定 K12 学段或学科（daily-practice、exam-prep、reading-writing 的学科项） |');
L.push('| ❌ 不适用 REJECT | 无对应场景 | 学前/亲子/考公/外语等级/K12 学科教材同步 |');
L.push('');
L.push('## 分上游分类统计');
L.push('');
L.push('| 上游分类 | 总数 | ✅ 可用 | 🔧 改造 | ❌ 不适用 | 可用率 |');
L.push('| --- | :-: | :-: | :-: | :-: | :-: |');
for (const [cat, v] of Object.entries(byCategory).sort((a, b) => b[1].total - a[1].total)) {
  const usable = v.USE + v.ADAPT;
  L.push(`| ${cat} | ${v.total} | ${v.USE} | ${v.ADAPT} | ${v.REJECT} | ${((usable / v.total) * 100).toFixed(0)}% |`);
}
L.push('');
L.push('## 已移植清单（分类 `tcm-upstream`）');
L.push('');
L.push('| 上游技能 | → tcmP 技能 | 上游分类 | 上游学科 | 判定 |');
L.push('| --- | --- | --- | --- | :-: |');
for (const r of rows.filter((x) => x.portedTo)) {
  L.push(`| \`${r.upstreamSlug}\` | \`${r.portedTo}\` | ${r.upstreamCategory} | ${r.subjects.join('/') || '-'} | ${r.verdict === 'USE' ? '✅' : '🔧'} |`);
}
L.push('');
L.push('## 全量判定明细');
L.push('');
L.push('| 上游技能 | 分类 | 学科 | 判定 | 理由 |');
L.push('| --- | --- | --- | :-: | --- |');
const mark = { USE: '✅ 可用', ADAPT: '🔧 改造', REJECT: '❌ 不适用' };
for (const r of [...rows].sort((a, b) => a.verdict.localeCompare(b.verdict) || a.upstreamSlug.localeCompare(b.upstreamSlug))) {
  L.push(`| \`${r.upstreamSlug}\` | ${r.upstreamCategory} | ${r.subjects.join('/') || '-'} | ${mark[r.verdict]} | ${r.why} |`);
}
L.push('');
L.push('---');
L.push('');
L.push('## 提取策略说明');
L.push('');
L.push('上游包 170 个技能中，**可迁移的是「工作流外壳」而不是「知识点」**：');
L.push('');
L.push('- `textbook-sync`（41 个）按中国 K12 教材版本切分，**知识点与 tcmP 无交集** → 整体不适用；');
L.push('  但其**结构**（教材版本 × 年级/册别 × 单元 × 课时 参数化）已被本包以「学科 × 教材号 × 章节」的形式复刻。');
L.push('- `learning-core`（15 个）是学科无关的学习闭环外壳，**迁移价值最高** → 已移植 6 个。');
L.push('- `daily-practice` / `exam-prep` / `reading-writing` 是**学科绑定的外壳** → 重绑到中医药学科后移植。');
L.push('- `family-education` / 学前 / 考公 / 外语等级 → 与 tcmP 场景无交集，**不移植**。');
L.push('');
L.push('> 移植方式：**重写内容 + 重绑参数**（学科 → `D0N-SNN`/教材号、学段 → 本科/规培/继续教育、场景 → 中医药教学场景），');
L.push('> 而非照抄上游正文。上游是 K12 场景，直接照抄会产出与 tcmP 不匹配的技能。');
L.push('');

writeFileSync(join(repoRoot, 'docs', '07-上游技能提取报告.md'), L.join('\n'), 'utf8');

console.log(`[extract] 上游: ${upstreamRoot}`);
console.log(`[extract] ${upstream.name} v${upstream.version} · ${result.upstreamSkillCount} 个技能`);
console.log(`[extract] ✅ 直接可用 ${result.verdicts.USE} · 🔧 需改造 ${result.verdicts.ADAPT} · ❌ 不适用 ${result.verdicts.REJECT}`);
console.log(`[extract] 已移植 ${result.portedCount} 个`);
console.log('\n[extract] 分分类可用率：');
for (const [cat, v] of Object.entries(byCategory).sort((a, b) => b[1].total - a[1].total)) {
  console.log(`  ${cat.padEnd(18)} ${String(v.total).padStart(3)} 个  可用 ${String(v.USE + v.ADAPT).padStart(3)}  不适用 ${String(v.REJECT).padStart(3)}`);
}
console.log('\n[extract] 已写出 data/upstream-extraction.json 与 docs/07-上游技能提取报告.md');
