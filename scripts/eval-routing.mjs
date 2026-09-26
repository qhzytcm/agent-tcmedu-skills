#!/usr/bin/env node
/**
 * agent-tcmedu-skills · 可利用程度评测
 * ------------------------------------------------------------------
 *  1. 路由评测：30 条中文中医药教育问题 → `match` 路由 Top-1 / Top-3 命中率
 *  2. 对话实测：读取 data/dialogue-test.json（真实 hermes chat 运行记录），并入报告
 *
 *   node scripts/eval-routing.mjs
 *
 * 产出：data/routing-eval.json · docs/08-可利用程度实测.md
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { rankSkills } from './lib/match.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalog = JSON.parse(readFileSync(join(root, 'catalog.json'), 'utf8'));

// ── 评测集：question → 期望技能（可多解，命中任一即算对）──
const CASES = [
  ['帮我背一下《伤寒论》桂枝汤的条文和方证', ['tcm-shanghan']],
  ['阴阳五行的概念我总是串不起来，怎么学', ['tcm-basic-theory']],
  ['望闻问切四诊信息怎么整理成证候要素', ['tcm-diagnostics']],
  ['《金匮要略》的胸痹病脉证治怎么拆', ['tcm-jingui']],
  ['金元四大家的学术分歧在哪', ['tcm-schools', 'tcm-medical-history']],
  ['老年人多病共存，中药方子怎么取舍', ['tcm-geriatrics']],
  ['湿疹皮损怎么辨证，内外治怎么结合', ['tcm-dermatology']],
  ['肿瘤化疗期间中医怎么扶正祛邪', ['tcm-oncology']],
  ['中医临床思维怎么显式化训练', ['tcm-clinical-reasoning']],
  ['帮我横向比较一下清热药这一类的性味功效', ['tcm-materia-medica']],
  ['四君子汤的君臣佐使怎么拆', ['tcm-formulas']],
  ['半夏炮制前后毒性和药性差在哪', ['tcm-herb-processing', 'tcm-toxicology']],
  ['中药含量测定怎么选指标成分', ['tcm-analysis']],
  ['足三里怎么用体表标志定位', ['tcm-meridians-acupoints']],
  ['针刺得气怎么判断，晕针怎么处理', ['tcm-acupuncture-technique']],
  ['小儿食积家庭推拿怎么做', ['tcm-pediatric-tuina']],
  ['颈椎病推拿疗程怎么排', ['tcm-tuina-therapeutics']],
  ['踝关节扭伤急性期能不能用手法', ['tcm-tendon-injury']],
  ['急性闭角型青光眼的中医辨证和转诊', ['tcm-ophthalmology']],
  ['复发性口疮反复不好怎么辨', ['tcm-stomatology']],
  ['帮我查少阳病相关的病证单位并给出来处', ['tcm-dsu-retrieval', 'tcm-kg-query']],
  ['把中医病名映射到ICD-11编码', ['tcm-icd11-coding']],
  ['怎么给医圣人格写SOUL并注册到平台', ['tcm-soul-agent-forge']],
  ['测算一下这个中医诊疗项目的成本效果', ['tcm-health-economics']],
  ['中药房验收调剂环节怎么合规自查', ['tcm-pharmacy-management']],
  ['制定一份考研中医综合的复习计划', ['tcm-postgraduate-exam', 'tcm-study-plan']],
  ['错题总是重复错，怎么复盘', ['tcm-mistake-review']],
  ['我作为药师要审核一张含附子的处方', ['role-pharmacist']],
  ['帮患者做一下症状自查和导诊', ['role-patient']],
  ['方歌老是背了忘，有什么记忆方法', ['tcm-memory-method']],
  ['每天十分钟练方药速记', ['tcm-daily-herb-drill']],
  ['单元复习课怎么设计', ['tcm-unit-review']],
  ['帮我设计一节中医基础理论的教案', ['tcm-lesson-prep']],
  ['出5道中药学选择题并给解析', ['tcm-item-generation', 'tcm-daily-herb-drill']],
];

// ── 路由打分复用共享内核（与 CLI 的 match 同一实现）──
const results = [];
let top1 = 0;
let top3 = 0;
for (const [q, expected] of CASES) {
  const ranked = rankSkills(catalog.skills, q, 5).map((r) => ({ name: r.s.name, sc: r.sc }));
  const names = ranked.map((r) => r.name);
  const is1 = names[0] && expected.includes(names[0]);
  const is3 = names.slice(0, 3).some((n) => expected.includes(n));
  if (is1) top1 += 1;
  if (is3) top3 += 1;
  results.push({ question: q, expected, top5: ranked.map((r) => `${r.name}(${r.sc.toFixed(1)})`), top1: !!is1, top3: !!is3 });
}

const n = CASES.length;
const evalData = {
  generatedBy: 'scripts/eval-routing.mjs',
  caseCount: n,
  top1: top1, top1Rate: top1 / n,
  top3: top3, top3Rate: top3 / n,
  cases: results,
};
mkdirSync(join(root, 'data'), { recursive: true });
writeFileSync(join(root, 'data', 'routing-eval.json'), JSON.stringify(evalData, null, 2) + '\n', 'utf8');

// ── 报告 ──
const dialoguePath = join(root, 'data', 'dialogue-test.json');
const dialogue = existsSync(dialoguePath) ? JSON.parse(readFileSync(dialoguePath, 'utf8')) : null;

const pctf = (x) => (x * 100).toFixed(1) + '%';
const L = [];
L.push('# 可利用程度实测');
L.push('');
L.push(`> 版本 v${catalog.version} ｜ **由 \`scripts/eval-routing.mjs\` 生成，请勿手工编辑。**`);
L.push('>');
L.push('> 本文件回答一个问题：**这个技能包装进 Agent 之后，到底能不能用、好用到什么程度。**');
L.push('');
L.push('## 一、路由评测（客观指标）');
L.push('');
L.push(`评测集 **${n} 条**中文中医药教育问题（每题标注 1–2 个可接受技能）。`);
L.push('');
L.push('| 指标 | 结果 |');
L.push('| --- | :-: |');
L.push(`| Top-1 命中率 | **${pctf(evalData.top1Rate)}**（${top1}/${n}） |`);
L.push(`| Top-3 命中率 | **${pctf(evalData.top3Rate)}**（${top3}/${n}） |`);
L.push('');
L.push(`> 对照路线图 M2 目标「Top-3 ≥ 80%」：**${evalData.top3Rate >= 0.8 ? '已达成' : '未达成'}**。`);
L.push('');
L.push('### 逐题结果');
L.push('');
L.push('| # | 问题 | 期望技能 | Top-1 | Top-3 | 实际 Top-3 |');
L.push('| :-: | --- | --- | :-: | :-: | --- |');
results.forEach((r, i) => {
  L.push(`| ${i + 1} | ${r.question} | ${r.expected.map((e) => `\`${e}\``).join(' / ')} | ${r.top1 ? '✅' : '❌'} | ${r.top3 ? '✅' : '❌'} | ${r.top5.slice(0, 3).join('、')} |`);
});
L.push('');
const miss = results.filter((r) => !r.top3);
if (miss.length) {
  L.push('### 未命中题（Top-3 内无期望技能）');
  L.push('');
  for (const m of miss) L.push(`- 「${m.question}」→ 期望 ${m.expected.join('/')}，实际 Top-3：${m.top5.slice(0, 3).join('、')}`);
  L.push('');
  L.push('> 未命中原因分类：**技能描述用词与提问用词不重合**（需补 `tags`）、**同一意图有多个近义技能**（需在 `description` 里加区分词）。');
  L.push('');
}
L.push('---');
L.push('');
L.push('## 二、人机对话实测');
L.push('');
if (!dialogue) {
  L.push('_尚未执行真实对话测试（缺 `data/dialogue-test.json`）。_');
  L.push('');
  L.push('执行方式：');
  L.push('');
  L.push('```bash');
  L.push('npm run install:hermes -- --apply    # 接入 Hermes');
  L.push('hermes chat -s <skill> "<问题>"       # 观察技能是否被加载、输出是否遵循技能工作流');
  L.push('```');
} else {
  L.push(`接入方式：${dialogue.setup}。共 ${dialogue.cases.length} 轮对话。`);
  L.push('');
  L.push('| # | 技能 | 问题 | 技能是否被加载 | 输出是否遵循技能工作流 | 判定 |');
  L.push('| :-: | --- | --- | :-: | :-: | :-: |');
  dialogue.cases.forEach((c, i) => {
    L.push(`| ${i + 1} | \`${c.skill}\` | ${c.question} | ${c.loaded ? '✅' : '❌'} | ${c.followedWorkflow ? '✅' : '⚠️'} | ${c.verdict} |`);
  });
  L.push('');
  for (const c of dialogue.cases) {
    L.push(`### 对话 ${c.skill}`);
    L.push('');
    L.push(`**提问**：${c.question}`);
    L.push('');
    L.push(`**判定**：${c.verdict}`);
    L.push('');
    if (c.evidence) {
      L.push('**实测输出摘录**：');
      L.push('');
      L.push('```text');
      L.push(c.evidence);
      L.push('```');
      L.push('');
    }
  }
  L.push(`**总体结论**：${dialogue.conclusion}`);
}
L.push('');
L.push('---');
L.push('');
L.push('## 三、结论与后续');
L.push('');
L.push(`- 路由 Top-3 **${pctf(evalData.top3Rate)}**${evalData.top3Rate >= 0.8 ? '，达到 M2 目标' : '，低于 M2 的 80% 目标，需补技能 `tags` 与区分词'}。`);
L.push('- 未命中题集中在「同一意图多个近义技能」与「口语化提问」两类，属于可定向修复的问题。');
L.push('');

writeFileSync(join(root, 'docs', '08-可利用程度实测.md'), L.join('\n'), 'utf8');

console.log(`[eval] 评测集 ${n} 条`);
console.log(`[eval] Top-1 ${top1}/${n} = ${pctf(evalData.top1Rate)}`);
console.log(`[eval] Top-3 ${top3}/${n} = ${pctf(evalData.top3Rate)}`);
if (miss.length) {
  console.log('[eval] 未命中：');
  for (const m of miss) console.log(`  ✗ ${m.question} → 期望 ${m.expected.join('/')}；实际 ${m.top5.slice(0, 3).join('、')}`);
}
console.log(`[eval] 已写出 data/routing-eval.json 与 docs/08-可利用程度实测.md${dialogue ? '（含对话实测）' : ''}`);
