#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 生成器
 * ------------------------------------------------------------------
 * 从 scripts/skills.spec.mjs 生成全部派生产物：
 *   - skills/<category>/<slug>/SKILL.md
 *   - catalog.json
 *   - .well-known/skills/index.json
 *
 * 幂等：同样输入必得同样输出（输出确定性排序），CI 靠此判定「生成物已提交」。
 *
 *   npm run build
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATEGORIES, PACK, PLATFORM_APIS, SKILLS as RAW_SKILLS } from './skills.spec.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const skillsRoot = join(root, 'skills');

const catBySlug = new Map(CATEGORIES.map((c) => [c.slug, c]));

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

function buildCatalog() {
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
  cleanGenerated();

  for (const s of SKILLS) write(join(root, s.path), renderSkill(s));

  const catalog = buildCatalog();
  write(join(root, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
  write(join(root, '.well-known', 'skills', 'index.json'), JSON.stringify(buildIndex(catalog), null, 2) + '\n');

  console.log(`[build-pack] ${PACK.name} v${PACK.version}`);
  console.log(`[build-pack] 分类 ${CATEGORIES.length} 个 / 技能 ${SKILLS.length} 个`);
  for (const c of catalog.categories) {
    console.log(`  - ${c.slug.padEnd(22)} ${String(c.count).padStart(2)}  ${c.zh}`);
  }
  const withApi = SKILLS.filter((s) => s.apis.length).length;
  console.log(`[build-pack] 平台绑定技能 ${withApi} / 离线可用 ${SKILLS.length - withApi}`);
  console.log('[build-pack] 已写出 skills/**, catalog.json, .well-known/skills/index.json');
}

main();
