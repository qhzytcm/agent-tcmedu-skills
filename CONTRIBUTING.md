# 贡献指南

感谢参与 `agent-tcmedu-skills`。本仓是 tcmP 中医药网络教育平台的教育技能亚项目。

---

## 一、最重要的规则

> **不要手改生成物。**

以下文件由 `scripts/build-pack.mjs` 从 `scripts/skills.spec.mjs` 生成，手改会在 CI 被拒：

- `skills/**/SKILL.md`
- `catalog.json`
- `.well-known/skills/index.json`
- `HERMES.md`

**改内容 → 改 `scripts/skills.spec.mjs` → `npm run build`。**

---

## 二、本地开发流程

```bash
git clone <repo>
cd agent-tcmedu-skills
npm install          # 无第三方依赖，仅为脚本可用性

# 改 scripts/skills.spec.mjs

npm run verify       # build + validate，必须全绿
npm run doctor       # 可选：体检
git add -A           # 生成物必须一并提交
git commit -m "feat(skill): 新增 xxx 技能"
```

---

## 三、新增一个技能

在 `scripts/skills.spec.mjs` 的 `SKILLS` 数组追加一条：

```js
{
  slug: 'tcm-xxx',                 // kebab-case，唯一
  title: '中医 xxx Skill',
  category: 'tcm-clinical',        // 必须是 CATEGORIES 中已登记的分类
  summary: '一句话说明这个技能把什么变成什么。',
  problem: '这个技能解决什么具体问题（2–4 句）。',
  bestFor: ['场景1', '场景2'],      // ≥ 2 条
  notFor: ['不适用场景'],           // ≥ 1 条
  inputs: ['用户需提供的信息'],
  workflow: ['步骤1', '步骤2', '步骤3', '步骤4'],  // ≥ 4 步
  outputs: ['产出物'],
  apis: [],                        // 需调平台则填，且必须已在 PLATFORM_APIS 登记
  textbookCodes: ['CM-01'],        // 必须引用主仓真实教材号
  subjects: ['…'], abilities: ['…'], scenarios: ['…'],
  stages: ['本科'], roles: [], tags: ['…'],
}
```

然后：

```bash
npm run verify
node scripts/agent-pack.mjs info tcm-xxx      # 核对渲染结果
```

---

## 四、新增一个平台接口

1. 在 `PLATFORM_APIS` 登记键与用途；
2. 同步更新 `docs/02-与tcmP平台对接契约.md`；
3. 在用到它的技能上填 `apis`；
4. `npm run verify`（未登记会被 build 拦截）。

---

## 五、审查标准

| 维度 | 要求 |
| --- | --- |
| 语文 | 中文表述准确，术语与主仓 `domain-specs/` 一致 |
| 边界 | `notFor` 必须诚实，宁可少覆盖也不能越界 |
| 安全 | 不输出处方剂量；患者端必须带边界声明；不写任何密钥 |
| 可验收 | 工作流每步都有可检查的产出 |
| 引用 | `textbookCodes` / `platform_apis` 必须真实存在 |

---

## 六、禁止事项

- ❌ 向本仓写入密钥、令牌、密码、患者数据、图谱数据、教材正文
- ❌ 手改生成物
- ❌ 在 slug 中编入年级 / 章节 / 难度（这些是参数）
- ❌ 引用不存在的教材号或未登记的 API
- ❌ 用 `--force` 绕过校验提交

---

## 七、提交信息约定

```
feat(skill): 新增 XX 技能
feat(category): 新增 XX 分类
fix(skill): 修正 XX 技能的错误引用
docs: 更新平台对接契约
chore: 重新生成产物
```

---

## 八、报告问题

- 技能内容错误 → 提 Issue，注明 slug 与错误位置
- 平台接口异常 → 先跑 `node scripts/agent-pack.mjs doctor`，附上输出
- 安全问题 → 见 `SECURITY.md`
