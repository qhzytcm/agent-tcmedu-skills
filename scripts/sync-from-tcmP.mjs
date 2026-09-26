#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 从 tcmP 主仓同步学科目录
 * ------------------------------------------------------------------
 * 只读消费 tcmP 主仓的领域规范，抽取「领域 → 学科」权威目录，
 * 输出 data/tcmP-subjects.json 供技能 spec 与四级目录索引引用。
 *
 *   node scripts/sync-from-tcmP.mjs [--root <textbook-project 路径>]
 *
 * 主仓 8 个领域规范文件的表格形态**不统一**，故采用三层抽取策略：
 *   策略 1（可信度最高）小标题式：`### D03-S01：经络腧穴学` + 紧随的键值表
 *   策略 2              宽表式：`| S01 | 名称 | 学分/学时 | 学段 | 教材号 | 前置 | 轮次 |`
 *   策略 3（兜底）      轮次表式：`| 第2轮 | D05-S01 中医骨伤科学基础、D05-S02 骨伤诊断学 |`
 * 同一学科的字段按可信度取最高者，避免「抓到表头当学科名」这类静默错误。
 *
 * 设计原则：主仓是领域规范的事实源，本脚本**不修改**主仓任何文件。
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const argRoot = process.argv.indexOf('--root');
const TCM_ROOT = argRoot > -1
  ? resolve(process.argv[argRoot + 1])
  : join(process.env.USERPROFILE || process.env.HOME || '.', 'textbook-project');
const SPEC_DIR = join(TCM_ROOT, 'domain-specs');

if (!existsSync(SPEC_DIR)) {
  console.error(`[sync] 找不到领域规范目录: ${SPEC_DIR}`);
  console.error('      请用 --root <path> 指定 tcmP 主仓路径。');
  process.exit(1);
}

/** 教材前缀 → 领域（D01–D08） */
const PREFIX_BY_DOMAIN = {
  D01: 'CM', D02: 'MM', D03: 'AT', D04: 'TU',
  D05: 'OR', D06: 'ENT', D07: 'AI', D08: 'MG',
};

const cells = (line) => line.split('|').slice(1, -1).map((c) => c.trim());
const isSeparator = (line) => /^\|[\s:|-]+\|$/.test(line.trim());
const plain = (v) => String(v).replace(/\*\*/g, '').replace(/[《》]/g, '').trim();
const textbookOf = (v) => (String(v).match(/[A-Z]{2,4}-\d{1,2}/) || [''])[0];
/** 「5 学分 / 90 学时」→「5/90」；已是「5/90」原样返回 */
function creditsOf(v) {
  const m = String(v).match(/(\d+)\s*学分?\s*\/\s*(\d+)\s*学时/);
  if (m) return `${m[1]}/${m[2]}`;
  const m2 = String(v).match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+)$/);
  return m2 ? `${m2[1]}/${m2[2]}` : '';
}

/**
 * 三层抽取。返回 Map<学科序号, {s, code, name, textbook, stage, credits}>
 * 每个字段各自记录可信度，最后取最高。
 */
function extractSubjects(lines, domain) {
  /** num → { name:{v,p}, textbook:{v,p}, stage:{v,p}, credits:{v,p} } */
  const acc = new Map();
  const put = (num, key, value, prio) => {
    if (!num || !value) return;
    const rec = acc.get(num) ?? {};
    if (!rec[key] || prio > rec[key].p) rec[key] = { v: value, p: prio };
    acc.set(num, rec);
  };

  // ── 策略 1：小标题式 `### D03-S01：经络腧穴学` + 紧随的键值表 ──
  const headRe = new RegExp(`^#{2,5}\\s*${domain}-S(\\d{1,2})\\s*[：:、\\s]\\s*(.+?)\\s*$`);
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(headRe);
    if (!m) continue;
    const num = Number(m[1]);
    const name = plain(m[2]).replace(/^[（(].*?[）)]/, '').trim();
    if (name && !/^(编号|学科编号|名称)$/.test(name)) put(num, 'name', name, 3);

    // 只在本学科块内扫描：遇到「同级或更高级」标题才结束（`#### 基本信息` 这类子标题不结束）
    const level = (lines[i].match(/^#+/) || [''])[0].length;
    for (let j = i + 1; j < lines.length; j += 1) {
      const hm = lines[j].match(/^(#+)\s/);
      if (hm && hm[1].length <= level) break;
      if (!lines[j].trim().startsWith('|') || isSeparator(lines[j])) continue;
      const c = cells(lines[j]);
      if (c.length < 2) continue;
      const key = plain(c[0]).replace(/[（(].*?[）)]/g, '');
      const val = plain(c.slice(1).join(' '));
      if (!val) continue;
      if (/^(学科名称|名称)$/.test(key)) put(num, 'name', val, 3);
      else if (/^(教材号|教材编号|教材代码)$/.test(key)) put(num, 'textbook', textbookOf(val), 3);
      else if (/^学段$/.test(key)) put(num, 'stage', val, 3);
      else if (/^(学分\/学时|学分|学时)$/.test(key)) put(num, 'credits', creditsOf(val), 3);
    }
  }

  // ── 策略 2：宽表式 `| S01 | 名称 | 学分/学时 | 学段 | 教材号 | ... |` ──
  const bareRe = /^S\d{1,2}$/;
  for (const line of lines) {
    if (!line.trim().startsWith('|') || isSeparator(line)) continue;
    const c = cells(line);
    if (c.length < 3) continue;
    const num = (() => {
      const v = plain(c[0]).replace(/[（(].*$/, '');
      return bareRe.test(v) ? Number(v.slice(1)) : null;
    })();
    if (!num) continue;

    // 名称：第 2 格若为纯中文且非表头词
    const nameCell = plain(c[1]);
    if (nameCell && !/^(名称|学科名称|编号|学科编号)$/.test(nameCell) && !/^\d/.test(nameCell)) {
      put(num, 'name', nameCell, 2);
    }
    for (const cell of c.slice(2)) {
      const tb = textbookOf(cell);
      if (tb) put(num, 'textbook', tb, 2);
      const cr = creditsOf(cell);
      if (cr) put(num, 'credits', cr, 2);
      if (/^(本科|硕士|博士|专科)[A-Z0-9\-–]*$/.test(plain(cell))) put(num, 'stage', plain(cell), 2);
    }
  }

  // ── 策略 3：轮次表式 `D05-S01 中医骨伤科学基础、D05-S02 骨伤诊断学` ──
  const pairRe = new RegExp(`${domain}-S(\\d{1,2})\\s*([\\u4e00-\\u9fa5A-Za-z][^、，,\\s|]*)`, 'g');
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    if (!/第?\s*\d*\s*轮次?|轮次\s*\d|编写轮次/.test(line)) continue;
    for (const m of line.matchAll(pairRe)) {
      const num = Number(m[1]);
      const name = plain(m[2]);
      if (name && name.length >= 2) put(num, 'name', name, 1);
    }
  }

  return [...acc.entries()]
    .map(([num, rec]) => ({
      s: num,
      code: `${domain}-S${String(num).padStart(2, '0')}`,
      name: rec.name?.v ?? '',
      textbook: rec.textbook?.v ?? '',
      stage: rec.stage?.v ?? '',
      credits: rec.credits?.v ?? '',
    }))
    .filter((s) => s.name)
    .sort((a, b) => a.s - b.s);
}

/** 领域名与统计：从文件头部信息表读取 */
function cleanDomainName(raw, domain) {
  const n = String(raw)
    .replace(/DOMAIN_SPEC_\w+/g, '')
    .replace(/中医教材体系/g, '')
    .replace(/领域规范/g, '')
    .replace(new RegExp(domain, 'g'), '')
    .replace(/[—\-–·]/g, ' ')
    .replace(/[（(].*?[）)]/g, '')
    .replace(/\s+/g, '')
    .trim();
  return n || domain;
}

function extractDomainMeta(text, domain) {
  const nameM = text.match(/\|\s*领域名称\s*\|\s*([^|\n]+?)\s*\|/) ||
                text.match(/^#+\s*(?:DOMAIN_SPEC_)?\d*\s*[—\-–]?\s*(.+学院[^|\n]*)$/m) ||
                text.match(/^#\s+(.+?)\s*$/m);
  const name = cleanDomainName(nameM ? nameM[1] : domain, domain);
  const countM = text.match(/学科总数\s*\|\s*(\d+)/) ||
                 text.match(/学科总数[：:]\s*(\d+)/) ||
                 text.match(/学科方向数\s*\|\s*(\d+)/) ||
                 text.match(/(\d+)\s*个学科方向/) ||
                 text.match(/(\d+)\s*个学科/);
  return { name, declaredCount: countM ? Number(countM[1]) : null };
}

const domains = [];
const warnings = [];

for (const file of readdirSync(SPEC_DIR).filter((f) => /^DOMAIN_SPEC_D0\d\.md$/.test(f)).sort()) {
  const domain = (file.match(/D0\d/) || [])[0];
  const text = readFileSync(join(SPEC_DIR, file), 'utf8');
  const lines = text.split(/\r?\n/);
  const meta = extractDomainMeta(text, domain);
  const subjects = extractSubjects(lines, domain);

  const suspicious = subjects.filter((s) => /^(编号|学科编号|名称|学科名称)$/.test(s.name) || /^\d+$/.test(s.name));
  if (suspicious.length) warnings.push(`${domain}: ${suspicious.length} 条学科名可疑（抓到表头/数字）`);

  if (meta.declaredCount && meta.declaredCount !== subjects.length) {
    warnings.push(`${domain}: 声明 ${meta.declaredCount} 个学科，实际抽取 ${subjects.length} 个`);
  }
  const noTextbook = subjects.filter((s) => !s.textbook);
  if (noTextbook.length) warnings.push(`${domain}: ${noTextbook.length} 条学科缺教材号（${noTextbook.slice(0, 4).map((s) => s.code).join(',')}…）`);

  domains.push({
    domain,
    name: meta.name,
    prefix: PREFIX_BY_DOMAIN[domain] ?? '',
    declaredCount: meta.declaredCount,
    extractedCount: subjects.length,
    subjects,
  });
}

const result = {
  source: 'tcmP 主仓 domain-specs/DOMAIN_SPEC_D0*.md',
  sourceRoot: TCM_ROOT.replace(/\\/g, '/'),
  generatedBy: 'scripts/sync-from-tcmP.mjs',
  domainCount: domains.length,
  subjectCount: domains.reduce((n, d) => n + d.subjects.length, 0),
  withTextbook: domains.reduce((n, d) => n + d.subjects.filter((s) => s.textbook).length, 0),
  domains,
};

const outDir = join(repoRoot, 'data');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'tcmP-subjects.json'), JSON.stringify(result, null, 2) + '\n', 'utf8');

console.log(`[sync] 源: ${result.sourceRoot}`);
console.log(`[sync] 领域 ${result.domainCount} 个 / 学科 ${result.subjectCount} 个 / 带教材号 ${result.withTextbook} 个`);
for (const d of domains) {
  const flag = d.declaredCount && d.declaredCount !== d.extractedCount ? ' ⚠数量不符' : '';
  const nb = d.subjects.filter((s) => !s.textbook).length;
  console.log(`  ${d.domain}  ${String(d.name).padEnd(10)} 抽取 ${String(d.extractedCount).padStart(2)} / 声明 ${String(d.declaredCount ?? '?').padStart(2)}  前缀 ${String(d.prefix).padEnd(3)} 缺教材号 ${nb}${flag}`);
}
if (warnings.length) {
  console.log('\n[sync] 需人工核对：');
  for (const w of warnings) console.log(`  ⚠ ${w}`);
} else {
  console.log('\n[sync] 无告警：名称、数量、教材号三项自检通过。');
}
console.log('[sync] 已写出 data/tcmP-subjects.json');
