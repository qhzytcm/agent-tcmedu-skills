# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

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
