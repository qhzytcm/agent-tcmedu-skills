<div align="center">

# agent-tcmedu-skills

**tcmP 中医药网络教育平台 · 教育技能亚项目**

把中医药教育场景封装成 Hermes Agent 可发现、可调用、可安装、可导出的结构化能力库

`v0.3.0` · `84 Skills` · `13 Categories` · `四级目录（篇·章·节·目）` · `120 学科对齐` · `上游提取报告` · MIT

</div>

---

## 这是什么

`agent-tcmedu-skills` 是 **tcmP 中医药网络教育平台** 的**教育能力层**。

平台已经有教材（120 门学科 / 8 域）、病证知识图谱（60,000+ 病证单位）、医圣人格 SOUL（张仲景 / 孙思邈）、sage-api 服务与六者 Agent 目录——但它们本身不是「教育动作」。本亚项目把平台能力翻译成**可被 Agent 直接执行的技能**，并按 **篇·章·节·目** 四级目录组织成可导航的知识结构。

| 问题 | 答案 |
| --- | --- |
| 这是什么 | 面向中医药教育场景的开源 Agent Skill Pack，也是 tcmP 平台的亚项目。 |
| 为什么需要 | 通用 Agent 不懂中医教材体系、辨证范式、六者岗位与医圣成长路径。 |
| 怎么实现 | 用 84 个结构化 `SKILL.md`，把「教材学习 → 辨证推理 → 平台检索 → 成长考核」封装成可调用能力。 |
| 怎么组织 | **四级目录**：篇（分类）→ 章（学科）→ 节（能力族）→ 目（技能），四级编码纯数字分列。 |
| 默认平台 | Hermes Agent（`skills.external_dirs` 接入）。 |
| 可导出平台 | 通用 Agent 扁平技能包（`export generic`）。 |
| 与平台关系 | 只读消费平台接口与学科目录；数据不下沉、密钥不入库。 |
| 开源内容 | 技能文档、索引、校验与导出工具链；不含用户数据与商业后端实现。 |

> 与 [`hermes-edu-skills`](https://gitee.com/devai/hermes-edu-skills) 的关系：**同构不同域**——沿用其仓库范式（catalog + skills/ + 校验/导出工具链 + CI），域换成中医药，并增加**与 tcmP 平台的绑定层**与**四级目录体系**。

---

## 5 分钟上手

```bash
git clone <repo> && cd agent-tcmedu-skills

npm run verify                                     # 构建 + 三项校验（应全绿）

# ── 浏览 ──
npm run list                                       # 列出 72 个技能
node scripts/agent-pack.mjs list tcm-role-agents   # 按分类浏览
node scripts/agent-pack.mjs search 辨证             # 关键词搜索
node scripts/agent-pack.mjs info role-healer       # 技能详情
cat docs/05-四级目录（篇·章·节·目）.md              # 四级目录全树

# ── 路由 ──
node scripts/agent-pack.mjs match "帮我查少阳病的经方，再做一次病案辨证训练" --top 5
node scripts/agent-pack.mjs ask "制定一份考研中医综合的半年复习计划"

# ── 接入 Hermes ──
node scripts/agent-pack.mjs install hermes          # dry-run
node scripts/agent-pack.mjs install hermes --apply  # 落盘（先备份 config.yaml）
hermes skills list

# ── 与主仓同步 / 体检 / 导出 ──
npm run sync                                        # 从 tcmP 主仓抽取 120 学科目录
npm run doctor                                      # 体检
npm run export:generic                              # 导出通用扁平技能包
```

---

## 四级目录（篇·章·节·目）

对齐 tcmP 教材目录的**四级编码约定**：编码纯数字分列，横向读即完整编码。

| 级 | 名称 | 取值 | 规模 |
| :-: | --- | --- | :-: |
| 篇 L1 | 分类 | 13 个分类 | **13** |
| 章 L2 | 学科 | 技能的主学科（`subjects[0]`） | **62** |
| 节 L3 | 能力族 | 由 `abilities`/`tags` 归纳的 9 个能力族 | **68** |
| 目 L4 | 技能 | 一个技能 = 一种可执行的教学工作流 | **84** |

完整目录树见 [`docs/05-四级目录（篇·章·节·目）.md`](docs/05-四级目录（篇·章·节·目）.md)，机器可读见 [`data/four-level-index.json`](data/four-level-index.json)。

每个技能的 `SKILL.md` 都带 `library_code` 字段与「四级目录定位」章节，例如 `1.2.1.1`。

---

## 分类总览

| 分类 | 选择器 | 领域 | 技能数 | 能力定位 |
| --- | --- | :-: | :-: | --- |
| 中医基础与经典 | `tcm-foundation` | D01 | 8 | 中基、中诊、四大经典（内经 / 伤寒 / 金匮 / 温病）、医史、各家学说 |
| 中医临床各科 | `tcm-clinical` | D01 | 11 | 内科、妇科、儿科、急诊、皮肤、男科、老年病、肿瘤、循证、临床思维 |
| 中药与方剂 | `tcm-materia` | D02 | 10 | 中药、方剂、炮制、鉴定、化学、药理、药剂、分析、毒理、药用植物 |
| 针灸与推拿 | `tcm-acupuncture` | D03,D04 | 7 | 经络腧穴、刺灸、推拿手法、针灸治疗、实验针灸、推拿治疗、小儿推拿 |
| 骨伤与五官口腔 | `tcm-orthopedics` | D05,D06 | 8 | 骨伤基础 / 筋伤 / 骨病、眼科、耳鼻喉、口腔 |
| 中医智能 | `tcm-intelligence` | D07 | 5 | DSU 检索 RAG、知识图谱、ICD-11、SOUL 锻造、AI 课程实验 |
| 中医管理 | `tcm-management` | D08 | 5 | 质控、医保法规、运营管理、药事管理、卫生经济 |
| 学习核心 | `tcm-learning-core` | - | 5 | 学习计划、错题、拍照答疑、预习复盘、学情报告 |
| 考试备考 | `tcm-exam-prep` | - | 3 | 执业医师、考研中医综合、住院医师规培 |
| 六者角色 | `tcm-role-agents` | 平台 | 6 | 医·患·药·械·规·法 六者端点绑定 |
| 医圣成长 | `tcm-sage-growth` | 平台 | 2 | 医圣带教、成长路径与病证数门槛 |
| 教研工具 | `tcm-teacher-tools` | - | 2 | 备课、命题组卷 |
| 上游技能移植 | `tcm-upstream` | - | 12 | 从上游 hermes-edu-skills 提取并重绑的通用学习/教学工作流外壳 |

**依赖**：22 个平台绑定技能需 tcmP 接口，62 个可离线独立使用。

> 全部 84 个技能的可点击清单见 [`docs/05-四级目录（篇·章·节·目）.md`](docs/05-四级目录（篇·章·节·目）.md)，机器可读索引见 [`catalog.json`](catalog.json)。

---

## 学科覆盖（tcmP 120 学科 × 本技能包）

| 指标 | 数值 |
| --- | :-: |
| tcmP 规划学科 | **120**（8 域） |
| 已被技能覆盖 | **55**（45.8%） |
| 待覆盖 | **65** |

分域明细与逐学科对照见 [`docs/06-学科覆盖矩阵.md`](docs/06-学科覆盖矩阵.md)。

**处理原则**：不搞「一学科一技能」。优先用**参数化**（`textbookCode` / `chapter` / `knowledgePoint`）把未覆盖学科挂到已有技能上；只有当该学科的**教学工作流形态**与现有技能不同时，才新增技能。

---

## 架构

```
① tcmP 平台层（已有）        ② agent-tcmedu-skills（本亚项目）      ③ Agent 运行时
   sage-api / 知识图谱 /           skills/<分类>/<技能>/SKILL.md        Hermes Agent
   医圣 SOUL / 120 门学科   ←只读引用→   catalog.json / 发现索引       / 其它 Agent 工具
   ICD-11 内网镜像 / 六者目录          data/*.json（四级目录 / 覆盖矩阵）  手机 APP（六者 CLI）
                                     docs/05 · docs/06（生成文档）
```

### 单一事实源与生成管线

```
scripts/skills.spec.mjs        ★ 唯一人工编辑点（分类 + 72 技能 + API 登记表 + 能力族）
        │  npm run build
        ▼
skills/**/SKILL.md + catalog.json + .well-known/skills/index.json
                  + data/four-level-index.json + docs/05-四级目录.md
                  + data/subject-coverage.json + docs/06-学科覆盖矩阵.md
        │  npm run validate  +  npm run check:docs
        ▼
① 三者计数/路径/名字一致  ② frontmatter 完整  ③ 无敏感模式  ④ spec 已同步
⑤ 四级编码唯一且与四级目录一致  ⑥ 文档与 catalog 不漂移

主仓 domain-specs/  ──npm run sync──▶  data/tcmP-subjects.json（120 学科）
```

**为什么用生成器？** 一致性可证（索引与技能同源，不可能漂移）、规模可扩展、可自动校验（CI 能判定生成物是否已提交）。这本身就是一次重复性工作的自动化。

### 仓库结构

```text
agent-tcmedu-skills/
├── scripts/skills.spec.mjs          ★ 单一事实源
├── scripts/build-pack.mjs           生成器（技能 + 索引 + 四级目录 + 覆盖矩阵）
├── scripts/validate.mjs             校验器
├── scripts/check-docs.mjs           文档同步校验器
├── scripts/sync-from-tcmP.mjs       主仓 → 学科目录同步器
├── scripts/extract-from-upstream.mjs 上游技能包 → 提取判定与移植清单
├── scripts/agent-pack.mjs           CLI（9 条命令）
├── skills/<分类>/<技能>/SKILL.md     ← 生成物（84 个）
├── catalog.json                      ← 生成物
├── .well-known/skills/index.json     ← 生成物
├── data/tcmP-subjects.json           ← 生成物（120 学科）
├── data/four-level-index.json        ← 生成物（四级目录）
├── data/subject-coverage.json        ← 生成物（覆盖矩阵）
├── data/upstream-extraction.json     ← 生成物（上游提取判定）
├── docs/  00 架构总览 · 01 能力地图 · 02 平台对接契约 · 03 命名规范
│          04 路线图 · 05 四级目录 · 06 学科覆盖矩阵 · 07 上游技能提取报告
├── .github/workflows/validate.yml    CI
└── HERMES.md                         ← 生成物：项目级启动 Prompt
```

---

## 与 tcmP 平台的对接

| 层面 | 绑定方式 |
| --- | --- |
| 学科 | `data/tcmP-subjects.json` 从主仓 `domain-specs/`（120 学科 / 8 域）抽取，零人工转录 |
| 教材 | 技能声明 `textbookCodes`（`CM-` / `MM-` / `AT-` / `TU-` / `OR-` / `ENT-` / `AI-` / `MG-`） |
| 病证 | 通过 `/kg/query`、`/kg/detail`、`/diag`、`/bianzheng` 访问病证单位（DSU） |
| 检索 | `/semantic-search` + `/rag`（TF-IDF + FTS5 + RRF，**内网零 token**） |
| 六者 | 六组端点组与六个角色技能一一绑定 |
| 医圣 | `/sages`、`/consult/{sage_id}`、`/teach/{sage_id}`、`/analyze-case/{sage_id}` |
| 编码 | `/icd/*`（内网镜像，零外网依赖） |
| 智能体 | `/agents/*`（六者 SOUL 注册） |

**离线降级**：平台不可达时，技能必须标注「未能核实」，不得凭记忆补齐结论。详见 [`docs/02-与tcmP平台对接契约.md`](docs/02-与tcmP平台对接契约.md)。

---

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run sync` | 从 tcmP 主仓抽取 120 学科目录（只读） |
| `npm run extract` | 从上游 hermes-edu-skills 提取可用技能判定与移植清单 |
| `npm run build` | 生成技能、索引、四级目录、覆盖矩阵 |
| `npm run validate` | 一致性 / frontmatter / 敏感模式 / spec 同步 / 四级编码 |
| `npm run check:docs` | 文档同步校验 |
| `npm run verify` | build + validate + check:docs |
| `agent-tcmedu list [分类]` | 列出技能 |
| `agent-tcmedu search <关键词>` | 搜索 |
| `agent-tcmedu info <slug>` | 技能详情 |
| `agent-tcmedu match "<问题>" --top N` | 自然语言匹配（调试路由） |
| `agent-tcmedu ask "<问题>"` | 匹配并调用 Hermes |
| `agent-tcmedu prompt --target HERMES.md` | 生成启动 Prompt |
| `agent-tcmedu doctor` | 体检（文件数 / 版本 / Hermes 配置可见性） |
| `agent-tcmedu install hermes [--apply]` | 接入 Hermes（默认 dry-run） |
| `agent-tcmedu export generic --target <dir>` | 导出通用扁平技能包 |

---

## 质量与安全

- **技能层面**：每条结论必须可答「依据是什么」；平台绑定结论必须标出处；患者端输出必须带边界声明且不给剂量；输出必须可验收。
- **仓库层面**：`npm run validate` 拦截敏感模式（密钥 / 令牌 / 密码 / 私钥）与生成物漂移；`npm run check:docs` 拦截文档漂移。
- **临床边界**：所有技能均为辅助性教育能力，不替代医师 / 药师 / 律师 / 工程师 / 管理者的判断与签字。

详见 [`SECURITY.md`](SECURITY.md)。

---

## 文档

| 文档 | 内容 |
| --- | --- |
| [架构总览](docs/00-架构总览.md) | 定位、三环关系、边界、生成管线、独立发展机制 |
| [能力地图](docs/01-能力地图.md) | 分类总览、六者矩阵、成长阶梯 |
| [平台对接契约](docs/02-与tcmP平台对接契约.md) | 接口清单、学科编码、离线降级、变更流程 |
| [命名与编码规范](docs/03-命名与编码规范.md) | slug 规则、四级编码、frontmatter 字段、参数维度 |
| [路线图](docs/04-路线图.md) | M0–M4 里程碑、度量指标、平台侧待办 |
| [四级目录](docs/05-四级目录（篇·章·节·目）.md) | **生成物**：篇·章·节·目 全树与四级编码 |
| [学科覆盖矩阵](docs/06-学科覆盖矩阵.md) | **生成物**：120 学科 × 技能覆盖率与缺口清单 |
| [上游技能提取报告](docs/07-上游技能提取报告.md) | **生成物**：hermes-edu-skills 170 技能 → 可用/改造/不适用 全量判定与移植清单 |
| [贡献指南](CONTRIBUTING.md) | 新增技能 / 新增接口的完整流程 |
| [发布说明](RELEASE.md) | 版本规则、发布步骤、离线分发 |
| [更新日志](CHANGELOG.md) | 版本历史 |

---

## 路线图（摘要）

| 里程碑 | 版本 | 目标 | 状态 |
| :-: | :-: | --- | :-: |
| M0 | v0.1.0 | 骨架可用、工具链闭环（42 技能） | ✅ |
| M1 | v0.2.0 | 四级目录体系 + 学科同步 + 学科层补全（72 技能，覆盖 45.8%） | ✅ |
| M1.5 | v0.3.0 | **上游技能提取 + 移植**（84 技能 / 13 分类 / 12 个移植技能） | ✅ 本次 |
| M2 | v0.5.0 | 学科覆盖 ≥ 80%；技能数 ≥ 90 | 进行中 |
| M3 | v0.8.0 | 平台双向闭环：调用埋点 + 反馈回流 | 待启动 |
| M4 | v1.0.0 | 系统支撑 tcmP 网络教育平台 | 待启动 |

---

## 开源协议

MIT，见 [LICENSE](LICENSE)。
