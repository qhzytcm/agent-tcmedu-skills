# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.2.0] - 2026-09-26

### 新增

- **四级目录体系（篇·章·节·目）**：`篇 = 分类` / `章 = 主学科` / `节 = 能力族` / `目 = 技能`，
  四级编码纯数字分列（对齐 tcmP 教材目录的四级编码约定），由生成器推导并写入每个 `SKILL.md` 的
  `library_code` 字段与「四级目录定位」章节。
- **能力族** `CAPABILITY_FAMILIES`（9 个）：把细粒度 `abilities`/`tags` 归纳为可分组的能力族，避免「节」层退化成 1:1。
- **主仓学科同步器** `scripts/sync-from-tcmP.mjs`：三层抽取策略（小标题式 / 宽表式 / 轮次表式），
  从 tcmP 主仓 `domain-specs/DOMAIN_SPEC_D01~D08.md` 零转录抽取 **120 学科**（含编码 / 名称 / 教材号 / 学段 / 学分），
  并做名称、数量、教材号三项自检。
- **四级目录产物**：`data/four-level-index.json` + `docs/05-四级目录（篇·章·节·目）.md`（生成物）。
- **学科覆盖矩阵**：`data/subject-coverage.json` + `docs/06-学科覆盖矩阵.md`（生成物），逐学科对照并列出缺口清单。
- **文档同步门禁** `scripts/check-docs.mjs`：README / 能力地图 / 四级目录 / 覆盖矩阵 与 `catalog.json` 不漂移。

### 变更

- 技能数 **42 → 72**（+30），新增分类内技能：
  - 中医基础与经典 +3：金匮要略、中国医学史、各家学说
  - 中医临床各科 +7：急诊、皮肤、男科、老年病、肿瘤、循证医学、临床思维与决策
  - 中药与方剂 +7：药用植物、中药化学、中药药理、中药鉴定、中药药剂、中药分析、中药毒理
  - 针灸与推拿 +4：针灸治疗、实验针灸、推拿治疗、小儿推拿
  - 骨伤与五官口腔 +6：骨伤科基础、筋伤、骨病、眼科、耳鼻喉、口腔
  - 中医管理 +3：医院运营管理、药事管理与法规、卫生经济学与医保政策
- 学科覆盖 **40/120（33.3%）→ 55/120（45.8%）**。
- CLI 保持 9 条命令不变；新增 `npm run sync` 脚本。
- CI 增加「sync → build → validate → check:docs → 生成物已提交」五关。

### 破坏性变更

- 每个 `SKILL.md` 新增必填章节 `## 四级目录定位 / Library Position`，`validate.mjs` 强校验。
- 生成物新增 `data/`（3 个 JSON）与 `docs/05`、`docs/06`。

## [0.1.0] - 2026-09-26

### 新增

- **仓库骨架**：对齐 `hermes-edu-skills` 的 Skill Pack 范式（`catalog.json` + `skills/` + `.well-known/skills/index.json` + 工具链 + CI）。
- **单一事实源** `scripts/skills.spec.mjs`：12 个分类、42 个技能、平台 API 登记表。
- **生成器** `scripts/build-pack.mjs`：从 spec 渲染 `SKILL.md` / `catalog.json` / 发现索引；含「未登记 API 直接拦截」的完整性检查。
- **校验器** `scripts/validate.mjs`：一致性、frontmatter、敏感模式、spec 同步 四类校验。
- **文档同步校验器** `scripts/check-docs.mjs`：README 与能力地图的技能表、分类表必须与 `catalog.json` 一致，防止文档漂移。
- **CLI** `scripts/agent-pack.mjs`：`list` / `search` / `info` / `match` / `ask` / `prompt` / `doctor` / `install` / `export` 共 9 条命令。
- **CI** `.github/workflows/validate.yml`：build → validate → 生成物已提交 三关。
- **架构文档**：`docs/00-架构总览.md`、`01-能力地图.md`、`02-与tcmP平台对接契约.md`、`03-命名与编码规范.md`、`04-路线图.md`。
- **启动 Prompt** `HERMES.md`（由 CLI 生成）。

### 分类

中医基础与经典、中医临床各科、中药与方剂、针灸与推拿、骨伤与五官口腔、中医智能、中医管理、学习核心、考试备考、六者角色、医圣成长、教研工具。

### 平台绑定

- 固化 **35 条** sage-api v2.0 实测路由 + **v3.0** 新增端点（`/icd/*`、`/diag`、`/bianzheng`、`/semantic-search`、`/rag`、`/agents/*`）。
- 42 个技能中 **17 个**为平台绑定，**25 个**可离线独立使用。

[0.1.0]: #010---2026-09-26
