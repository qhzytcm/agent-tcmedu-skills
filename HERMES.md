# agent-tcmedu-skills · 项目级启动 Prompt

本项目已安装 tcmP 中医药网络教育平台的 Agent Skill Pack（agent-tcmedu-skills v0.1.0，共 42 个 Skill，12 个分类）。

当用户提出**中医药教育、教材学习、经典研读、临床辨证、中药方剂、针灸推拿、骨伤五官、中医智能、中医管理、考试备考、师承带教、六者角色或医圣成长**相关的请求时：

1. **不要直接回答**，先在 `agent-tcmedu-skills` 这套 Skill Pack 中检索最匹配的 Skill；
2. 选定后用 `skill_view(name)` 加载完整 SKILL.md，再按其中的「推荐工作流」执行；
3. 涉及平台接口（病证单位检索 / 知识图谱 / ICD-11 / 六者端点）时，先确认平台可达；不可达则在结论中标注「未能核实」，不得凭记忆补齐；
4. 涉及患者安全的输出必须携带边界声明与就医提示，不输出处方剂量。

## 分类索引

- `tcm-foundation`（中医基础与经典，5 个）：中医基础理论、中医诊断学与四大经典（内经 / 伤寒 / 金匮 / 温病）的同步学习与经典研读能力。
- `tcm-clinical`（中医临床各科，4 个）：中医内科、妇科、儿科及病案辨证实训：把临床课程转成可执行的辨证论治训练闭环。
- `tcm-materia`（中药与方剂，3 个）：中药学、方剂学、炮制鉴定与饮片溯源：药性功效、配伍禁忌、方证对应的记忆与应用。
- `tcm-acupuncture`（针灸与推拿，3 个）：经络腧穴、刺法灸法、推拿手法：定位、主治、操作规范与临床配穴取穴训练。
- `tcm-orthopedics`（骨伤与五官口腔，2 个）：中医骨伤科与五官口腔科：正骨理筋手法、创伤急救、眼科 / 耳鼻喉 / 口腔辨证。
- `tcm-intelligence`（中医智能，5 个）：中医智能学院：病证单位检索（RAG）、知识图谱查询、ICD-11 编码桥接、六者 SOUL 智能体锻造与中医 AI 课程实验。
- `tcm-management`（中医管理，2 个）：中医管理学院的实务能力：医疗质控、排班调度、医保报销口径与医事法规。
- `tcm-learning-core`（学习核心，5 个）：通用学习闭环：学习计划、错题复盘、拍照答疑、预习复盘与学情报告。
- `tcm-exam-prep`（考试备考，3 个）：中医执业医师资格考试、考研中医综合、住院医师规范化培训的备考闭环。
- `tcm-role-agents`（六者角色，6 个）：医·患·药·械·规·法 六者角色技能：与 tcmP 平台 sage-api 六组端点一一绑定。
- `tcm-sage-growth`（医圣成长，2 个）：医圣人格带教与成长路径：张仲景 / 孙思邈人格授课、病证数门槛与职称映射考核。
- `tcm-teacher-tools`（教研工具，2 个）：面向教师与师承带教者：中医备课、教案设计、命题组卷与课堂学情分析。

## 全量 Skill 清单

| slug | 名称 | 分类 | 依赖 |
| --- | --- | --- | --- |
| `tcm-basic-theory` | 中医基础理论 Skill | tcm-foundation | 离线 |
| `tcm-diagnostics` | 中医诊断学 Skill | tcm-foundation | 离线 |
| `tcm-neijing` | 内经选读 Skill | tcm-foundation | 离线 |
| `tcm-shanghan` | 伤寒论讲义 Skill | tcm-foundation | 离线 |
| `tcm-wenbing` | 温病学 Skill | tcm-foundation | 离线 |
| `tcm-internal-medicine` | 中医内科学 Skill | tcm-clinical | 离线 |
| `tcm-gynecology` | 中医妇科学 Skill | tcm-clinical | 离线 |
| `tcm-pediatrics` | 中医儿科学 Skill | tcm-clinical | 离线 |
| `tcm-case-dialectics` | 病案辨证实训 Skill | tcm-clinical | 平台 |
| `tcm-materia-medica` | 中药学 Skill | tcm-materia | 离线 |
| `tcm-formulas` | 方剂学 Skill | tcm-materia | 离线 |
| `tcm-herb-processing` | 中药炮制与鉴定 Skill | tcm-materia | 平台 |
| `tcm-meridians-acupoints` | 经络腧穴学 Skill | tcm-acupuncture | 离线 |
| `tcm-acupuncture-technique` | 刺法灸法学 Skill | tcm-acupuncture | 离线 |
| `tcm-tuina` | 推拿手法学 Skill | tcm-acupuncture | 离线 |
| `tcm-orthopedics-trauma` | 中医骨伤科学 Skill | tcm-orthopedics | 离线 |
| `tcm-ent-stomatology` | 中医五官口腔科学 Skill | tcm-orthopedics | 离线 |
| `tcm-dsu-retrieval` | 病证单位检索 Skill（RAG） | tcm-intelligence | 平台 |
| `tcm-kg-query` | 病证知识图谱查询 Skill | tcm-intelligence | 平台 |
| `tcm-icd11-coding` | ICD-11 编码桥接 Skill | tcm-intelligence | 平台 |
| `tcm-soul-agent-forge` | 六者 SOUL 智能体锻造 Skill | tcm-intelligence | 平台 |
| `tcm-ai-course-lab` | 中医 AI 课程实验 Skill | tcm-intelligence | 离线 |
| `tcm-quality-control` | 中医医疗质控 Skill | tcm-management | 平台 |
| `tcm-medical-insurance` | 中医医保与法规 Skill | tcm-management | 平台 |
| `tcm-study-plan` | 中医学习计划 Skill | tcm-learning-core | 离线 |
| `tcm-mistake-review` | 中医错题复盘 Skill | tcm-learning-core | 离线 |
| `tcm-photo-question` | 中医拍照答疑 Skill | tcm-learning-core | 离线 |
| `tcm-preview-review` | 中医预习与每周复盘 Skill | tcm-learning-core | 离线 |
| `tcm-learning-report` | 中医学情报告 Skill | tcm-learning-core | 离线 |
| `tcm-licensed-physician-exam` | 中医执业医师考试 Skill | tcm-exam-prep | 离线 |
| `tcm-postgraduate-exam` | 考研中医综合 Skill | tcm-exam-prep | 离线 |
| `tcm-residency-training` | 住院医师规范化培训 Skill | tcm-exam-prep | 平台 |
| `role-healer` | 医者 Agent Skill（含师带徒） | tcm-role-agents | 平台 |
| `role-patient` | 患者 Agent Skill | tcm-role-agents | 平台 |
| `role-pharmacist` | 药者 Agent Skill | tcm-role-agents | 平台 |
| `role-device` | 械者 Agent Skill | tcm-role-agents | 平台 |
| `role-regulator` | 规者 Agent Skill | tcm-role-agents | 平台 |
| `role-legal` | 法者 Agent Skill | tcm-role-agents | 平台 |
| `sage-mentorship` | 医圣带教 Skill | tcm-sage-growth | 平台 |
| `sage-growth-path` | 医圣成长路径 Skill | tcm-sage-growth | 平台 |
| `tcm-lesson-prep` | 中医备课 Skill | tcm-teacher-tools | 离线 |
| `tcm-item-generation` | 中医命题与组卷 Skill | tcm-teacher-tools | 离线 |
