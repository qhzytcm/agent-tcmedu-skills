<div align="center">

# agent-tcmedu-skills

**tcmP 中医药网络教育平台 · 教育技能亚项目**

把中医药教育场景封装成 Hermes Agent 可发现、可调用、可安装、可导出的结构化能力库

`v0.1.0` · `42 Skills` · `12 Categories` · `17 平台绑定 / 25 离线可用` · MIT

</div>

---

## 这是什么

`agent-tcmedu-skills` 是 **tcmP 中医药网络教育平台** 的**教育能力层**。

平台已经有教材（120 门 / 8 域）、病证知识图谱（60,000+ 病证单位）、医圣人格 SOUL（张仲景 / 孙思邈）、sage-api 服务与六者 Agent 目录——但它们本身不是「教育动作」。本亚项目把平台能力翻译成**可被 Agent 直接执行的技能**：

| 问题 | 答案 |
| --- | --- |
| 这是什么 | 面向中医药教育场景的开源 Agent Skill Pack，也是 tcmP 平台的亚项目。 |
| 为什么需要 | 通用 Agent 不懂中医教材体系、辨证范式、六者岗位与医圣成长路径。 |
| 怎么实现 | 用 42 个结构化 `SKILL.md`，把「教材学习 → 辨证推理 → 平台检索 → 成长考核」封装成可调用能力。 |
| 默认平台 | Hermes Agent（`skills.external_dirs` 接入）。 |
| 可导出平台 | 通用 Agent 扁平技能包（`export generic`）。 |
| 与平台关系 | 只读消费平台接口与教材号；数据不下沉、密钥不入库。 |
| 开源内容 | 技能文档、索引、校验与导出工具链；不含用户数据与商业后端实现。 |

> 与 [`hermes-edu-skills`](https://gitee.com/devai/hermes-edu-skills) 的关系：**同构不同域**——沿用其仓库范式（catalog + skills/ + 校验/导出工具链 + CI），域换成中医药，并增加与 tcmP 平台的**绑定层**。

---

## 5 分钟上手

```bash
git clone <repo> && cd agent-tcmedu-skills

npm run verify                                    # 构建 + 校验（应全绿）
node scripts/agent-pack.mjs list                   # 浏览 42 个技能
node scripts/agent-pack.mjs list tcm-role-agents   # 按分类浏览
node scripts/agent-pack.mjs search 辨证             # 关键词搜索
node scripts/agent-pack.mjs info role-healer       # 查看技能详情

# 自然语言匹配（调试路由效果）
node scripts/agent-pack.mjs match "帮我查少阳病的经方，再做一次病案辨证训练" --top 5

# 匹配 + 调用 Hermes 执行
node scripts/agent-pack.mjs ask "制定一份考研中医综合的半年复习计划"

# 接入 Hermes（默认 dry-run，确认后加 --apply）
node scripts/agent-pack.mjs install hermes
node scripts/agent-pack.mjs install hermes --apply
hermes skills list

# 生成项目级启动 Prompt（让 Agent 先检索本技能包）
node scripts/agent-pack.mjs prompt --target ./HERMES.md

# 体检
node scripts/agent-pack.mjs doctor

# 导出给其它 Agent
node scripts/agent-pack.mjs export generic --target ./dist/agent-skills
```

---

## 分类总览

| 分类 | 选择器 | 领域 | 技能数 | 能力定位 |
| --- | --- | :-: | :-: | --- |
| 中医基础与经典 | `tcm-foundation` | D01 | 5 | 中基、中诊、四大经典（内经 / 伤寒 / 金匮 / 温病） |
| 中医临床各科 | `tcm-clinical` | D01 | 4 | 内科、妇科、儿科、病案辨证实训 |
| 中药与方剂 | `tcm-materia` | D02 | 3 | 中药学、方剂学、炮制与鉴定 |
| 针灸与推拿 | `tcm-acupuncture` | D03,D04 | 3 | 经络腧穴、刺法灸法、推拿手法 |
| 骨伤与五官口腔 | `tcm-orthopedics` | D05,D06 | 2 | 正骨理筋、五官口腔辨证 |
| 中医智能 | `tcm-intelligence` | D07 | 5 | DSU 检索 RAG、知识图谱、ICD-11、SOUL 锻造、AI 课程实验 |
| 中医管理 | `tcm-management` | D08 | 2 | 医疗质控、医保与法规 |
| 学习核心 | `tcm-learning-core` | - | 5 | 学习计划、错题、拍照答疑、预习复盘、学情报告 |
| 考试备考 | `tcm-exam-prep` | - | 3 | 执业医师、考研中医综合、住院医师规培 |
| 六者角色 | `tcm-role-agents` | 平台 | 6 | 医·患·药·械·规·法 六者端点绑定 |
| 医圣成长 | `tcm-sage-growth` | 平台 | 2 | 医圣带教、成长路径与病证数门槛 |
| 教研工具 | `tcm-teacher-tools` | - | 2 | 备课、命题组卷 |

**依赖**列：`平台` = 需 tcmP 接口；`离线` = 可独立使用。

| # | slug | 名称 | 分类 | 依赖 |
| :-: | --- | --- | --- | :-: |
| 1 | `tcm-basic-theory` | 中医基础理论 Skill | tcm-foundation | 离线 |
| 2 | `tcm-diagnostics` | 中医诊断学 Skill | tcm-foundation | 离线 |
| 3 | `tcm-neijing` | 内经选读 Skill | tcm-foundation | 离线 |
| 4 | `tcm-shanghan` | 伤寒论讲义 Skill | tcm-foundation | 离线 |
| 5 | `tcm-wenbing` | 温病学 Skill | tcm-foundation | 离线 |
| 6 | `tcm-internal-medicine` | 中医内科学 Skill | tcm-clinical | 离线 |
| 7 | `tcm-gynecology` | 中医妇科学 Skill | tcm-clinical | 离线 |
| 8 | `tcm-pediatrics` | 中医儿科学 Skill | tcm-clinical | 离线 |
| 9 | `tcm-case-dialectics` | 病案辨证实训 Skill | tcm-clinical | **平台** |
| 10 | `tcm-materia-medica` | 中药学 Skill | tcm-materia | 离线 |
| 11 | `tcm-formulas` | 方剂学 Skill | tcm-materia | 离线 |
| 12 | `tcm-herb-processing` | 中药炮制与鉴定 Skill | tcm-materia | **平台** |
| 13 | `tcm-meridians-acupoints` | 经络腧穴学 Skill | tcm-acupuncture | 离线 |
| 14 | `tcm-acupuncture-technique` | 刺法灸法学 Skill | tcm-acupuncture | 离线 |
| 15 | `tcm-tuina` | 推拿手法学 Skill | tcm-acupuncture | 离线 |
| 16 | `tcm-orthopedics-trauma` | 中医骨伤科学 Skill | tcm-orthopedics | 离线 |
| 17 | `tcm-ent-stomatology` | 中医五官口腔科学 Skill | tcm-orthopedics | 离线 |
| 18 | `tcm-dsu-retrieval` | 病证单位检索 Skill（RAG） | tcm-intelligence | **平台** |
| 19 | `tcm-kg-query` | 病证知识图谱查询 Skill | tcm-intelligence | **平台** |
| 20 | `tcm-icd11-coding` | ICD-11 编码桥接 Skill | tcm-intelligence | **平台** |
| 21 | `tcm-soul-agent-forge` | 六者 SOUL 智能体锻造 Skill | tcm-intelligence | **平台** |
| 22 | `tcm-ai-course-lab` | 中医 AI 课程实验 Skill | tcm-intelligence | 离线 |
| 23 | `tcm-quality-control` | 中医医疗质控 Skill | tcm-management | **平台** |
| 24 | `tcm-medical-insurance` | 中医医保与法规 Skill | tcm-management | **平台** |
| 25 | `tcm-study-plan` | 中医学习计划 Skill | tcm-learning-core | 离线 |
| 26 | `tcm-mistake-review` | 中医错题复盘 Skill | tcm-learning-core | 离线 |
| 27 | `tcm-photo-question` | 中医拍照答疑 Skill | tcm-learning-core | 离线 |
| 28 | `tcm-preview-review` | 中医预习与每周复盘 Skill | tcm-learning-core | 离线 |
| 29 | `tcm-learning-report` | 中医学情报告 Skill | tcm-learning-core | 离线 |
| 30 | `tcm-licensed-physician-exam` | 中医执业医师考试 Skill | tcm-exam-prep | 离线 |
| 31 | `tcm-postgraduate-exam` | 考研中医综合 Skill | tcm-exam-prep | 离线 |
| 32 | `tcm-residency-training` | 住院医师规范化培训 Skill | tcm-exam-prep | **平台** |
| 33 | `role-healer` | 医者 Agent Skill（含师带徒） | tcm-role-agents | **平台** |
| 34 | `role-patient` | 患者 Agent Skill | tcm-role-agents | **平台** |
| 35 | `role-pharmacist` | 药者 Agent Skill | tcm-role-agents | **平台** |
| 36 | `role-device` | 械者 Agent Skill | tcm-role-agents | **平台** |
| 37 | `role-regulator` | 规者 Agent Skill | tcm-role-agents | **平台** |
| 38 | `role-legal` | 法者 Agent Skill | tcm-role-agents | **平台** |
| 39 | `sage-mentorship` | 医圣带教 Skill | tcm-sage-growth | **平台** |
| 40 | `sage-growth-path` | 医圣成长路径 Skill | tcm-sage-growth | **平台** |
| 41 | `tcm-lesson-prep` | 中医备课 Skill | tcm-teacher-tools | 离线 |
| 42 | `tcm-item-generation` | 中医命题与组卷 Skill | tcm-teacher-tools | 离线 |

---

## 架构

```
① tcmP 平台层（已有）        ② agent-tcmedu-skills（本亚项目）      ③ Agent 运行时
   sage-api / 知识图谱 /           skills/<分类>/<slug>/SKILL.md          Hermes Agent
   医圣 SOUL / 120 门教材   ←只读引用→   catalog.json / 发现索引        / 其它 Agent 工具
   ICD-11 内网镜像 / 六者目录          生成·校验·安装·导出 工具链          手机 APP（六者 CLI）
```

### 单一事实源与生成管线

```
scripts/skills.spec.mjs      ← 唯一人工编辑点（分类 + 42 技能 + 平台 API 登记）
        │  npm run build
        ▼
skills/**/SKILL.md  +  catalog.json  +  .well-known/skills/index.json
        │  npm run validate
        ▼
① 三者计数/路径/名字一致  ② frontmatter 完整  ③ 无敏感模式  ④ spec 已同步
```

**为什么用生成器？** 一致性可证（索引与技能同源，不可能漂移）、规模可扩展（v1.0 要覆盖 120 门教材）、可自动校验（CI 能判定生成物是否已提交）。这本身就是一次重复性工作的自动化。

### 仓库结构

```text
agent-tcmedu-skills/
├── scripts/skills.spec.mjs     ★ 单一事实源
├── scripts/build-pack.mjs      生成器
├── scripts/validate.mjs        校验器
├── scripts/check-docs.mjs      文档同步校验器（技能表 ↔ catalog）
├── scripts/agent-pack.mjs      CLI（9 条命令）
├── skills/<分类>/<slug>/SKILL.md   ← 生成物
├── catalog.json                    ← 生成物
├── .well-known/skills/index.json   ← 生成物
├── docs/    00 架构总览 · 01 能力地图 · 02 平台对接契约 · 03 命名规范 · 04 路线图
├── .github/workflows/validate.yml  CI
└── HERMES.md                       ← 生成物：项目级启动 Prompt
```

---

## 与 tcmP 平台的对接

| 层面 | 绑定方式 |
| --- | --- |
| 教材 | 技能声明 `textbookCodes`（`CM-` / `MM-` / `AT-` / `TU-` / `OR-` / `ENT-` / `AI-` / `MG-`），对应主仓 `domain-specs/` |
| 病证 | 通过 `/kg/query`、`/kg/detail`、`/diag`、`/bianzheng` 访问病证单位（DSU） |
| 检索 | `/semantic-search` + `/rag`（TF-IDF + FTS5 + RRF，**内网零 token**） |
| 六者 | 六组端点组与六个角色技能一一绑定（`/patients/*` `/pharmacists/*` `/devices/*` `/regulators/*` `/legals/*` + 医者复用 `/consult` `/teach`） |
| 医圣 | `/sages` `/consult/{sage_id}` `/teach/{sage_id}` `/analyze-case/{sage_id}` |
| 编码 | `/icd/*`（内网镜像，零外网依赖） |
| 智能体 | `/agents/*`（六者 SOUL 注册） |

**离线降级**：平台不可达时，技能必须标注「未能核实」，不得凭记忆补齐结论。详见 [`docs/02-与tcmP平台对接契约.md`](docs/02-与tcmP平台对接契约.md)。

---

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 从 spec 重新生成全部产物 |
| `npm run validate` | 一致性 / frontmatter / 敏感模式 / spec 同步 校验 |
| `npm run check:docs` | 文档同步校验（README 与能力地图的技能表必须与 catalog 一致） |
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
- **仓库层面**：`npm run validate` 自动拦截敏感模式（密钥 / 令牌 / 密码 / 私钥）与生成物漂移。
- **临床边界**：所有技能均为辅助性教育能力，不替代医师 / 药师 / 律师 / 工程师 / 管理者的判断与签字。

详见 [`SECURITY.md`](SECURITY.md)。

---

## 文档

| 文档 | 内容 |
| --- | --- |
| [架构总览](docs/00-架构总览.md) | 定位、三环关系、边界、生成管线、独立发展机制 |
| [能力地图](docs/01-能力地图.md) | 12 分类 × 42 技能全表、六者矩阵、成长阶梯、覆盖度差距 |
| [平台对接契约](docs/02-与tcmP平台对接契约.md) | 接口清单、教材编码、离线降级、变更流程 |
| [命名与编码规范](docs/03-命名与编码规范.md) | slug 规则、frontmatter 字段、参数维度、自检清单 |
| [路线图](docs/04-路线图.md) | M0–M4 里程碑、度量指标、平台侧待办 |
| [贡献指南](CONTRIBUTING.md) | 新增技能 / 新增接口的完整流程 |
| [发布说明](RELEASE.md) | 版本规则、发布步骤、离线分发 |
| [更新日志](CHANGELOG.md) | 版本历史 |

---

## 路线图（摘要）

| 里程碑 | 版本 | 目标 |
| :-: | :-: | --- |
| M0 | **v0.1.0** ✅ | 骨架可用、工具链闭环（42 技能 / 12 分类） |
| M1 | v0.2.0 | 接入 Hermes，形成可用闭环；路由 Top-3 命中率 ≥ 80% |
| M2 | v0.5.0 | 学科同步层补全（D01–D06），技能数 ≥ 60 |
| M3 | v0.8.0 | 平台双向闭环：调用埋点 + 反馈回流 |
| M4 | v1.0.0 | 系统支撑 tcmP 网络教育平台（三层完整 + 发布通道） |

---

## 开源协议

MIT，见 [LICENSE](LICENSE)。
