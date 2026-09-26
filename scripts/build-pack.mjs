#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 生成器
 * ------------------------------------------------------------------
 * 从 scripts/skills.spec.mjs 生成全部派生产物：
 *   - skills/<category>/<slug>/SKILL.md
 *   - catalog.json
 *   - .well-known/skills/index.json
 *   - data/four-level-index.json          （四级目录机器可读）
 *   - docs/05-四级目录（篇·章·节·目）.md   （四级目录人读）
 *
 * 幂等：同样输入必得同样输出（输出确定性排序），CI 靠此判定「生成物已提交」。
 *
 *   npm run build
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CAPABILITY_FAMILIES, CATEGORIES, PACK, PLATFORM_APIS, SKILLS as RAW_SKILLS } from './skills.spec.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const skillsRoot = join(root, 'skills');

const catBySlug = new Map(CATEGORIES.map((c) => [c.slug, c]));

/** 把技能的 abilities/tags 归纳到能力族（四级目录的「节」层） */
function capabilityFamily(skill) {
  const bag = [...skill.abilities, ...skill.tags, skill.title, ...skill.subjects].join(' ');
  for (const fam of CAPABILITY_FAMILIES) {
    if (fam.keywords.some((k) => bag.includes(k))) return fam.zh;
  }
  return '综合能力';
}

/**
 * 四级目录（篇·章·节·目）
 *   篇 L1 = 分类        （12 篇）
 *   章 L2 = 主学科       （skills 的 subjects[0]）
 *   节 L3 = 能力族       （CAPABILITY_FAMILIES 归纳）
 *   目 L4 = 技能         （skill）
 * 编码为纯数字分列，横向读即完整四级编码，对齐 tcmP「四级编码分列」约定。
 */
function buildFourLevel(skills) {
  const byCat = new Map();
  for (const s of skills) {
    if (!byCat.has(s.category)) byCat.set(s.category, []);
    byCat.get(s.category).push(s);
  }

  const tree = [];
  let p = 0;

  for (const c of CATEGORIES) {
    const list = byCat.get(c.slug) ?? [];
    if (!list.length) continue;
    p += 1;

    const chapterMap = new Map();          // 章名 → (节名 → 技能[])
    for (const s of list) {
      const chapter = s.subjects[0] ?? '通用模块';
      const section = capabilityFamily(s);
      if (!chapterMap.has(chapter)) chapterMap.set(chapter, new Map());
      if (!chapterMap.get(chapter).has(section)) chapterMap.get(chapter).set(section, []);
      chapterMap.get(chapter).get(section).push(s);
    }

    let k = 0;
    const chapters = [];
    for (const [chapterName, sectionMap] of chapterMap) {
      k += 1;
      let j = 0;
      const sections = [];
      for (const [sectionName, items] of sectionMap) {
        j += 1;
        const leaves = items.map((s, idx) => {
          const code = `${p}.${k}.${j}.${idx + 1}`;
          s.libraryCode = code;
          s.libraryPath = [
            `${String(p).padStart(2, '0')} ${c.zh}`,
            `${String(k).padStart(2, '0')} ${chapterName}`,
            `${String(j).padStart(2, '0')} ${sectionName}`,
            `${String(idx + 1).padStart(2, '0')} ${s.title}`,
          ].join(' / ');
          return s;
        });
        sections.push({ n: j, code: `${p}.${k}.${j}`, name: sectionName, skills: leaves });
      }
      chapters.push({ n: k, code: `${p}.${k}`, name: chapterName, sections });
    }

    tree.push({
      n: p, code: String(p), category: c.slug, name: c.zh, domain: c.domain,
      skillCount: list.length, chapterCount: chapters.length,
      sectionCount: chapters.reduce((n2, ch) => n2 + ch.sections.length, 0),
      chapters,
    });
  }

  return {
    scheme: '篇·章·节·目（四级编码分列，纯数字，横向读即完整编码）',
    l1: '篇 = 分类',
    l2: '章 = 主学科（subjects[0]）',
    l3: '节 = 能力族（CAPABILITY_FAMILIES 归纳）',
    l4: '目 = 技能',
    partCount: tree.length,
    chapterCount: tree.reduce((n, t) => n + t.chapterCount, 0),
    sectionCount: tree.reduce((n, t) => n + t.sectionCount, 0),
    skillCount: skills.length,
    parts: tree,
  };
}

/** 120 学科覆盖矩阵：把 tcmP 主仓学科目录与技能包做对照 */
function buildCoverage(skills) {
  const p = join(root, 'data', 'tcmP-subjects.json');
  if (!existsSync(p)) return null;
  const src = JSON.parse(readFileSync(p, 'utf8'));
  const domains = src.domains.map((d) => ({
    ...d,
    subjects: d.subjects.map((s) => {
      const byTextbook = skills.filter((k) => s.textbook && k.textbookCodes.includes(s.textbook));
      const byName = skills.filter((k) => k.subjects.some((x) => x === s.name || x.includes(s.name) || s.name.includes(x)));
      const hits = [...new Set([...byTextbook, ...byName])];
      return {
        code: s.code, name: s.name, textbook: s.textbook, stage: s.stage, credits: s.credits,
        covered: hits.length > 0, skills: hits.map((k) => k.slug),
      };
    }),
  }));
  const all = domains.flatMap((d) => d.subjects);
  const covered = all.filter((s) => s.covered).length;
  return {
    source: src.source, sourceRoot: src.sourceRoot,
    domainCount: domains.length, subjectCount: all.length,
    coveredCount: covered, uncoveredCount: all.length - covered,
    coverageRate: all.length ? covered / all.length : 0,
    domains,
  };
}

function renderCoverageDoc(cov) {
  const L = [];
  const pct = (n, d) => (d ? ((n / d) * 100).toFixed(n === d ? 0 : 1) : '0') + '%';
  L.push('# 学科覆盖矩阵（tcmP 120 学科 × 本技能包）');
  L.push('');
  L.push(`> 版本 v${PACK.version} ｜ **由 \`${PACK.generatedFrom}\` 生成，请勿手工编辑。**`);
  L.push(`> 数据源：\`${cov.sourceRoot}/domain-specs/\`（经 \`scripts/sync-from-tcmP.mjs\` 抽取）`);
  L.push('>');
  L.push(`> 覆盖 **${cov.coveredCount} / ${cov.subjectCount}**（${pct(cov.coveredCount, cov.subjectCount)}），未覆盖 **${cov.uncoveredCount}** 门。`);
  L.push('>');
  L.push('> **覆盖判定**：技能的 `textbookCodes` 命中该学科教材号，或技能的 `subjects` 与该学科名互相包含。');
  L.push('');
  L.push('## 分域汇总');
  L.push('');
  L.push('| 域 | 院系 | 学科数 | 已覆盖 | 覆盖率 | 涉及技能数 |');
  L.push('| :-: | --- | :-: | :-: | :-: | :-: |');
  for (const d of cov.domains) {
    const c = d.subjects.filter((s) => s.covered).length;
    const n = new Set(d.subjects.flatMap((s) => s.skills)).size;
    L.push(`| ${d.domain} | ${d.name} | ${d.subjects.length} | ${c} | ${pct(c, d.subjects.length)} | ${n} |`);
  }
  L.push(`| — | **合计** | **${cov.subjectCount}** | **${cov.coveredCount}** | **${pct(cov.coveredCount, cov.subjectCount)}** | — |`);
  L.push('');
  L.push('## 逐学科明细');
  L.push('');
  for (const d of cov.domains) {
    L.push(`### ${d.domain} ${d.name}（教材前缀 ${d.prefix}）`);
    L.push('');
    L.push('| 学科编号 | 学科名 | 教材 | 学段 | 学分/学时 | 覆盖 | 对应技能 |');
    L.push('| :-: | --- | :-: | --- | :-: | :-: | --- |');
    for (const s of d.subjects) {
      L.push(`| ${s.code} | ${s.name} | ${s.textbook || '-'} | ${s.stage || '-'} | ${s.credits || '-'} | ${s.covered ? '✅' : '—'} | ${s.skills.map((x) => `\`${x}\``).join(' ')} |`);
    }
    L.push('');
  }
  const gaps = cov.domains.flatMap((d) => d.subjects.filter((s) => !s.covered).map((s) => `${d.domain} · ${s.code} · ${s.name}${s.textbook ? `（${s.textbook}）` : ''}`));
  L.push('---');
  L.push('');
  L.push('## 未覆盖学科清单（专项建设待办）');
  L.push('');
  if (!gaps.length) {
    L.push('无。全部学科均已被技能覆盖。');
  } else {
    L.push(`共 **${gaps.length}** 门未被任何技能覆盖：`);
    L.push('');
    for (const g of gaps) L.push(`- ${g}`);
    L.push('');
    L.push('> **处理原则**：不搞「一学科一技能」。优先用**参数化**（`textbookCode` / `chapter` / `knowledgePoint`）把未覆盖学科挂到已有技能上；');
    L.push('> 只有当该学科的**教学工作流形态**与现有技能不同（如新增实操类别、新增考核方式），才新增技能。');
  }
  L.push('');
  return L.join('\n');
}

function renderFourLevelDoc(fl) {
  const L = [];
  L.push('# 四级目录（篇·章·节·目）');
  L.push('');
  L.push(`> 版本 v${PACK.version} ｜ **本文件由 \`${PACK.generatedFrom}\` 生成，请勿手工编辑。**`);
  L.push('>');
  L.push('> 编码规则：**四级编码分列，纯数字，横向读即完整编码**（对齐 tcmP 教材目录的四级编码约定）。');
  L.push('>');
  L.push(`> 篇 ${fl.partCount} · 章 ${fl.chapterCount} · 节 ${fl.sectionCount} · 目 ${fl.skillCount} ｜ ${fl.l1} · ${fl.l2} · ${fl.l3} · ${fl.l4}`);
  L.push('');
  L.push('## 四级编码总览');
  L.push('');
  L.push('| 篇 | 篇名 | 域 | 章数 | 节数 | 目数（技能） |');
  L.push('| :-: | --- | :-: | :-: | :-: | :-: |');
  for (const t of fl.parts) {
    L.push(`| ${t.n} | ${t.name} | ${t.domain} | ${t.chapterCount} | ${t.sectionCount} | ${t.skillCount} |`);
  }
  L.push(`| — | **合计** | — | **${fl.chapterCount}** | **${fl.sectionCount}** | **${fl.skillCount}** |`);
  L.push('');
  L.push('## 目录树');
  L.push('');
  for (const t of fl.parts) {
    L.push(`### 篇 ${t.n} · ${t.name}（域 ${t.domain}）`);
    L.push('');
    for (const ch of t.chapters) {
      L.push(`- **章 ${ch.code} ${ch.name}**`);
      for (const sec of ch.sections) {
        L.push(`  - 节 ${sec.code} ${sec.name}`);
        for (const s of sec.skills) {
          L.push(`    - 目 ${s.libraryCode} [\`${s.slug}\`](../${s.path}) — ${s.title}`);
        }
      }
    }
    L.push('');
  }
  L.push('## 节层：能力族定义');
  L.push('');
  L.push('| 节（能力族） | 归入判据（abilities / tags 命中关键词） |');
  L.push('| --- | --- |');
  for (const f of CAPABILITY_FAMILIES) {
    L.push(`| ${f.zh} | ${f.keywords.join('、')} |`);
  }
  L.push('| 综合能力 | 以上均未命中时的兜底族 |');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 与 tcmP 平台的对应');
  L.push('');
  L.push('| 本包四级 | tcmP 平台层级 | 对应关系 |');
  L.push('| --- | --- | --- |');
  L.push('| 篇 L1 | 领域 / 院系（D01–D08） | 分类通过 `domain` 字段挂到域；通用与平台类分类无域 |');
  L.push('| 章 L2 | 学科（D0N-SNN，共 120 门） | `subjects[0]` 与主仓 `domain-specs/` 的学科名对齐 |');
  L.push('| 节 L3 | 能力模块 | 由 `abilities`/`tags` 归纳为 9 个能力族（见上表） |');
  L.push('| 目 L4 | 教材章节中的具体教学单元 | 一个技能 = 一种可执行的教学工作流 |');
  L.push('');
  L.push('> 单值化说明：一个技能若声明多个 `subjects`，四级目录取**首项**定位「章」；`abilities` 经能力族归纳后定位「节」。');
  L.push('> 其余学科与能力项仍保留在 `catalog.json` 中作为检索标签（交叉引用），不重复占位。');
  L.push('');
  return L.join('\n');
}

/** 按分类给出交互策略默认值 */
function defaultInteractionPolicy(skill, category) {
  const base = ['学习目标或任务目标', '使用场景', '难度', '可用时间'];
  const table = {
    'tcm-role-agents': ['角色', '场景', '输入事实与时间线', '是否需要法规/依据引用'],
    'tcm-sage-growth': ['当前成长阶段或职称', '已覆盖病证数', '目标阶段', '时间窗'],
    'tcm-exam-prep': ['考试目标与日期', '当前分数或正确率', '薄弱模块', '每天可用时间', '训练方式'],
    'tcm-teacher-tools': ['课程与章节', '学时与学段', '学情', '教学形式'],
    'tcm-intelligence': ['任务目标', '数据来源或接口', '输出格式', '是否需要出处引用'],
    'tcm-management': ['管理场景', '现行指标或制度', '约束条件', '输出用途'],
  };
  const requiredDimensions = table[skill.category] ?? [...base, '是否需要答案解析'];
  return {
    requiredDimensions,
    defaultAssumptions: [
      `学科与教材未指定：默认按本 Skill 绑定教材 ${(skill.textbookCodes ?? []).join('、') || '（无绑定，按通用课程目标处理）'} 处理，并提醒用户可补充。`,
      '章节与知识点未指定：默认选取该场景下的高频基础病证或核心能力，不假装知道用户学校 / 医院的进度。',
      '难度未指定：默认标准难度（基础 50% + 提高 40% + 综合 10%）。',
      '角色未指定：默认面向学习者本人；出现「患者 / 家属」切换到患者视角，出现「处方 / 审方 / 药品」切换到药者视角，出现「科室 / 排班 / 质控」切换到规者视角。',
      '未指定题量时默认 8–12 道或一个 30 分钟任务；未指定时间时默认 30 分钟。',
      '答案未指定：练习题默认提供答案与解析；概念型给要点，推理型给步骤，临床型给辨证依据与方药出处。',
      '平台不可达时：凡依赖平台 API 的结论一律标注「未能核实」，不得凭记忆补齐。',
    ],
  };
}

function normalize(skill) {
  const category = catBySlug.get(skill.category);
  if (!category) throw new Error(`未知分类: ${skill.category} (skill=${skill.slug})`);
  const apis = skill.apis ?? [];
  return {
    slug: skill.slug,
    title: skill.title,
    category: skill.category,
    categoryZh: category.zh,
    domain: category.domain,
    summary: skill.summary,
    problem: skill.problem,
    bestFor: skill.bestFor ?? [],
    notFor: skill.notFor ?? [],
    inputs: skill.inputs ?? [],
    workflow: skill.workflow ?? [],
    outputs: skill.outputs ?? [],
    apis,
    textbookCodes: skill.textbookCodes ?? [],
    subjects: skill.subjects ?? [],
    abilities: skill.abilities ?? [],
    roles: skill.roles ?? [],
    stages: skill.stages ?? ['本科'],
    scenarios: skill.scenarios ?? [],
    tags: skill.tags ?? [],
    levelGate: skill.levelGate ?? '',
    standaloneSupport: skill.standaloneSupport ?? 'supported',
    requiresTools: skill.requiresTools ?? (apis.length
      ? ['context.load', 'entitlement.check', 'platform.api_call', 'workflow.create', 'memory.write']
      : ['context.load', 'entitlement.check', 'workflow.create', 'memory.write']),
    requiresData: skill.requiresData ?? skill.inputs ?? [],
    parameterizedDimensions: skill.parameterizedDimensions ?? [
      'domain', 'discipline', 'textbookCode', 'chapter', 'knowledgePoint', 'scenario', 'difficulty',
    ],
    interactionPolicy: skill.interactionPolicy ?? defaultInteractionPolicy(skill, category),
    libraryCode: '',      // 由 buildFourLevel 填充
    libraryPath: '',
    path: `skills/${skill.category}/${skill.slug}/SKILL.md`,
  };
}

const SKILLS = RAW_SKILLS.map(normalize);

/** 校验 spec 内部一致性（生成前拦截） */
function assertSpecIntegrity() {
  const seen = new Set();
  for (const s of SKILLS) {
    if (seen.has(s.slug)) throw new Error(`技能 slug 重复: ${s.slug}`);
    seen.add(s.slug);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug)) throw new Error(`slug 不合规（须 kebab-case）: ${s.slug}`);
    if (!s.subjects.length) throw new Error(`技能 ${s.slug} 缺少 subjects，四级目录无法定位「章」`);
    if (!s.abilities.length) throw new Error(`技能 ${s.slug} 缺少 abilities，四级目录无法定位「节」`);
    for (const api of s.apis) {
      const known = Object.keys(PLATFORM_APIS).some((k) => k === api || (k.endsWith('/*') && api.startsWith(k.slice(0, -1))));
      if (!known) throw new Error(`技能 ${s.slug} 声明了未登记的 API: ${api}`);
    }
  }
}

/** 渲染单个 SKILL.md */
function renderSkill(s) {
  const fm = [];
  fm.push('---');
  fm.push(`name: "${s.slug}"`);
  fm.push(`description: "${(s.summary + (s.apis.length ? ' 依赖 tcmP 平台接口，离线不可用。' : '')).replace(/"/g, "'")}"`);
  fm.push(`version: "${PACK.version}"`);
  fm.push(`author: ${PACK.author}`);
  fm.push('license: MIT');
  fm.push('platforms: [windows, linux, macos]');
  fm.push('metadata:');
  fm.push('  hermes:');
  fm.push(`    tags: ${JSON.stringify(s.tags)}`);
  fm.push(`    source: ${PACK.name}`);
  fm.push(`    category: "${s.category}"`);
  fm.push(`    domain: "${s.domain}"`);
  fm.push(`    library_code: "${s.libraryCode}"`);
  fm.push(`    stages: ${JSON.stringify(s.stages)}`);
  fm.push(`    subjects: ${JSON.stringify(s.subjects)}`);
  fm.push(`    abilities: ${JSON.stringify(s.abilities)}`);
  fm.push(`    scenarios: ${JSON.stringify(s.scenarios)}`);
  if (s.roles.length) fm.push(`    roles: ${JSON.stringify(s.roles)}`);
  if (s.textbookCodes.length) fm.push(`    textbook_codes: ${JSON.stringify(s.textbookCodes)}`);
  if (s.levelGate) fm.push(`    level_gate: "${s.levelGate}"`);
  if (s.apis.length) fm.push(`    platform_apis: ${JSON.stringify(s.apis)}`);
  fm.push('    quality_tier: "curated"');
  fm.push(`    standalone_support: "${s.standaloneSupport}"`);
  fm.push('    public_release: "recommended"');
  fm.push('    export_mode: "installable"');
  fm.push('    release_channel: "recommended"');
  fm.push(`    requires_tools: ${JSON.stringify(s.requiresTools)}`);
  fm.push(`    requires_data: ${JSON.stringify(s.requiresData)}`);
  fm.push('---');

  const body = [];
  body.push('');
  body.push(`# ${s.title}`);
  body.push('');
  body.push(s.problem);
  body.push('');
  body.push('## 四级目录定位 / Library Position');
  body.push('');
  body.push(`**四级编码** \`${s.libraryCode}\`（篇·章·节·目，横向读即完整编码）`);
  body.push('');
  body.push(`**定位路径** ${s.libraryPath}`);
  body.push('');
  body.push('> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。');
  body.push('');
  body.push('## 最适合 / Best For');
  body.push('');
  for (const x of s.bestFor) body.push(`- ${x}`);
  body.push('');
  body.push('## 不适合 / Not For');
  body.push('');
  for (const x of s.notFor) body.push(`- ${x}`);
  body.push('');
  body.push('## 使用前请准备 / Inputs');
  body.push('');
  for (const x of s.inputs) body.push(`- ${x}`);
  body.push('');
  body.push('## 推荐工作流 / Recommended Workflow');
  body.push('');
  s.workflow.forEach((x, i) => body.push(`${i + 1}. ${x}`));
  body.push('');
  body.push('## 产出 / Outputs');
  body.push('');
  for (const x of s.outputs) body.push(`- ${x}`);
  body.push('');
  body.push('## 与 tcmP 平台的对接 / Platform Binding');
  body.push('');
  if (s.apis.length) {
    body.push('| 平台接口 | 用途 |');
    body.push('| --- | --- |');
    for (const a of s.apis) body.push(`| \`${a}\` | ${PLATFORM_APIS[a] ?? '病证单元 / 角色服务端点（详见 docs/02）'} |`);
  } else {
    body.push('本 Skill 不依赖平台接口，可离线独立使用。');
  }
  body.push('');
  if (s.textbookCodes.length) body.push(`- **关联教材**：${s.textbookCodes.join('、')}（见 tcmP \`domain-specs/\`）`);
  if (s.domain && s.domain !== '-') body.push(`- **所属领域**：${s.domain}（${s.categoryZh}）`);
  if (s.roles.length) body.push(`- **六者角色**：${s.roles.join('、')}`);
  if (s.levelGate) body.push(`- **成长阶段门禁**：${s.levelGate}`);
  body.push(`- **离线可用性**：${s.standaloneSupport === 'needs_platform' ? '否（必须平台可达）' : s.standaloneSupport === 'needs_user_input' ? '部分（需用户提供输入）' : '是'}`);
  body.push('');
  body.push('## 参数 / Parameters');
  body.push('');
  body.push('> 学段、册别、章节、知识点、难度以参数传入，不拆成独立 Skill。');
  body.push('');
  body.push('| 参数 | 说明 |');
  body.push('| --- | --- |');
  body.push('| `discipline` | 学科编号（见 tcmP `domain-specs/`，如 D01-S01） |');
  body.push('| `textbookCode` | 教材号（如 CM-01 / MM-01 / AT-01） |');
  body.push('| `chapter` | 章 / 节 |');
  body.push('| `knowledgePoint` | 知识点或病证单位（DSU） |');
  body.push('| `scenario` | 使用场景（预习 / 巩固 / 复习 / 演练……） |');
  body.push('| `difficulty` | 基础 / 提高 / 综合 |');
  body.push('');
  body.push('## 质量门禁 / Quality Gate');
  body.push('');
  body.push('- 每条结论必须可回答「依据是什么」：教材章节 / 病证单位 / 平台接口返回。');
  body.push('- 依赖平台接口的结论必须标注来源端点；接口不可达时标注「未能核实」。');
  body.push('- 涉及患者安全的输出必须携带边界声明与就医提示，不输出处方剂量。');
  body.push('- 输出必须可验收：给出可自查的完成标准，而非「已了解」。');
  body.push('');
  body.push('---');
  body.push('');
  body.push(`> 本文件由 \`${PACK.generatedFrom}\` 生成，请勿手工编辑。改内容请改 spec 后执行 \`npm run build\`。`);
  body.push('');
  return fm.join('\n') + '\n' + body.join('\n');
}

function buildCatalog(fourLevel) {
  return {
    name: PACK.name,
    version: PACK.version,
    license: PACK.license,
    author: PACK.author,
    upstreamPlatform: PACK.upstreamPlatform,
    platformBase: PACK.platformBase,
    generatedFrom: PACK.generatedFrom,
    skillCount: SKILLS.length,
    categoryCount: CATEGORIES.length,
    libraryScheme: fourLevel.scheme,
    libraryShape: { parts: fourLevel.partCount, chapters: fourLevel.chapterCount, sections: fourLevel.sectionCount, skills: fourLevel.skillCount },
    categories: CATEGORIES.map((c) => ({
      slug: c.slug, zh: c.zh, en: c.en, domain: c.domain, description: c.desc,
      count: SKILLS.filter((s) => s.category === c.slug).length,
    })),
    skills: SKILLS.map((s) => ({
      name: s.slug,
      slug: s.slug,
      title: s.title,
      description: s.summary,
      version: PACK.version,
      status: 'published',
      category: s.category,
      categoryZh: s.categoryZh,
      domain: s.domain,
      libraryCode: s.libraryCode,
      libraryPath: s.libraryPath,
      path: s.path,
      stages: s.stages,
      subjects: s.subjects,
      abilities: s.abilities,
      roles: s.roles,
      scenarios: s.scenarios,
      textbookCodes: s.textbookCodes,
      levelGate: s.levelGate,
      platformApis: s.apis,
      tags: s.tags,
      qualityTier: 'curated',
      standaloneSupport: s.standaloneSupport,
      publicRelease: 'recommended',
      exportMode: 'installable',
      releaseChannel: 'recommended',
      requiresTools: s.requiresTools,
      requiresData: s.requiresData,
      parameterizedDimensions: s.parameterizedDimensions,
      interactionPolicy: s.interactionPolicy,
    })),
  };
}

function buildIndex(catalog) {
  return {
    name: PACK.name,
    version: PACK.version,
    description: 'tcmP 中医药网络教育平台 Agent Skill Pack 发现索引（.well-known/skills/index.json）',
    generatedFrom: PACK.generatedFrom,
    skillCount: catalog.skillCount,
    skills: catalog.skills.map((s) => ({
      name: s.name,
      title: s.title,
      description: s.description,
      category: s.category,
      libraryCode: s.libraryCode,
      path: s.path,
    })),
  };
}

function cleanGenerated() {
  if (!existsSync(skillsRoot)) return;
  for (const cat of readdirSync(skillsRoot, { withFileTypes: true })) {
    if (cat.isDirectory()) rmSync(join(skillsRoot, cat.name), { recursive: true, force: true });
  }
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function main() {
  assertSpecIntegrity();

  // 1) 先算四级目录（会回填每个技能的 libraryCode / libraryPath）
  const fourLevel = buildFourLevel(SKILLS);

  // 2) 再渲染（此时 renderSkill 能读到 libraryCode）
  cleanGenerated();
  for (const s of SKILLS) write(join(root, s.path), renderSkill(s));

  // 3) 索引类产物
  const catalog = buildCatalog(fourLevel);
  write(join(root, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
  write(join(root, '.well-known', 'skills', 'index.json'), JSON.stringify(buildIndex(catalog), null, 2) + '\n');

  // 4) 四级目录产物
  write(join(root, 'data', 'four-level-index.json'), JSON.stringify({ ...fourLevel, version: PACK.version, generatedFrom: PACK.generatedFrom }, null, 2) + '\n');
  write(join(root, 'docs', '05-四级目录（篇·章·节·目）.md'), renderFourLevelDoc(fourLevel));

  // 5) 学科覆盖矩阵（依赖 data/tcmP-subjects.json，缺失则跳过）
  const coverage = buildCoverage(SKILLS);
  if (coverage) {
    write(join(root, 'data', 'subject-coverage.json'), JSON.stringify({ version: PACK.version, generatedFrom: PACK.generatedFrom, ...coverage }, null, 2) + '\n');
    write(join(root, 'docs', '06-学科覆盖矩阵.md'), renderCoverageDoc(coverage));
  }

  console.log(`[build-pack] ${PACK.name} v${PACK.version}`);
  console.log(`[build-pack] 分类 ${CATEGORIES.length} 个 / 技能 ${SKILLS.length} 个`);
  for (const c of catalog.categories) {
    console.log(`  - ${c.slug.padEnd(22)} ${String(c.count).padStart(2)}  ${c.zh}`);
  }
  console.log(`[build-pack] 四级目录：篇 ${fourLevel.partCount} · 章 ${fourLevel.chapterCount} · 节 ${fourLevel.sectionCount} · 目 ${fourLevel.skillCount}`);
  if (coverage) {
    console.log(`[build-pack] 学科覆盖：${coverage.coveredCount}/${coverage.subjectCount}（${(coverage.coverageRate * 100).toFixed(1)}%）· 未覆盖 ${coverage.uncoveredCount}`);
  } else {
    console.log('[build-pack] 学科覆盖：跳过（未找到 data/tcmP-subjects.json，请先跑 npm run sync）');
  }
  const withApi = SKILLS.filter((s) => s.apis.length).length;
  console.log(`[build-pack] 平台绑定技能 ${withApi} / 离线可用 ${SKILLS.length - withApi}`);
  console.log('[build-pack] 已写出 skills/**, catalog.json, .well-known/skills/index.json, data/*.json, docs/05-*.md, docs/06-*.md');
}

main();
