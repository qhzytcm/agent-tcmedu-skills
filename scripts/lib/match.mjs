/**
 * 技能路由打分（共享内核）
 * ------------------------------------------------------------------
 * 被 `scripts/agent-pack.mjs`（CLI 的 match/ask）与
 * `scripts/eval-routing.mjs`（路由评测）共用。
 * 单一实现，避免两处打分逻辑漂移导致「评测通过但 CLI 路由不准」。
 */

/** 中文二元组 + 关键词加权打分 */
export function scoreSkill(skill, query) {
  const text = String(query).toLowerCase();
  let sc = 0;
  const hit = (hay, w) => { if (hay && String(hay).toLowerCase().includes(text)) sc += w; };

  hit(skill.title, 8);
  hit(skill.name.replace(/-/g, ''), 6);
  for (const t of skill.tags ?? []) hit(t, 5);
  for (const t of skill.subjects ?? []) hit(t, 4);
  for (const t of skill.abilities ?? []) hit(t, 3);
  for (const t of skill.scenarios ?? []) hit(t, 3);
  for (const t of skill.roles ?? []) hit(t, 4);
  for (const t of skill.textbookCodes ?? []) hit(t, 3);
  hit(skill.categoryZh, 2);

  // 单字 & 二元组回退，提升中文召回
  const grams = new Set();
  for (let i = 0; i < text.length; i += 1) {
    if (/[\u4e00-\u9fa5]/.test(text[i])) {
      grams.add(text[i]);
      if (i + 1 < text.length && /[\u4e00-\u9fa5]/.test(text[i + 1])) grams.add(text.slice(i, i + 2));
    }
  }
  const bag = [
    skill.title, ...(skill.tags ?? []), ...(skill.subjects ?? []),
    ...(skill.abilities ?? []), ...(skill.scenarios ?? []), skill.description,
  ].join('').toLowerCase();
  for (const g of grams) if (bag.includes(g)) sc += g.length >= 2 ? 1 : 0.2;

  return sc;
}

/** 按分数降序排名；同分按 slug 字典序保证确定性 */
export function rankSkills(skills, query, topN = 5, minScore = 1) {
  return skills
    .map((s) => ({ s, sc: scoreSkill(s, query) }))
    .filter((x) => x.sc > minScore)
    .sort((a, b) => b.sc - a.sc || a.s.name.localeCompare(b.s.name))
    .slice(0, topN);
}
