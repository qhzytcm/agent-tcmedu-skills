---
name: "role-legal"
description: "医疗风险识别、知情同意、法规查询与纠纷预防，并覆盖医保报销合规口径。 依赖 tcmP 平台接口，离线不可用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["法者","风险","知情同意","纠纷预防"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    stages: ["继续教育"]
    subjects: ["医事法学"]
    abilities: ["风险防控","法规查询"]
    scenarios: ["医院管理","纠纷预防"]
    roles: ["legal"]
    platform_apis: ["/legals/risk","/legals/consent","/legals/regulation","/legals/cases","/legals/prevention"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["场景类型（风险 / 同意 / 法规 / 案例 / 预防 / 医保）","事实描述与时间线","涉及科室与人员","关键词或条款线索"]
---

# 法者 Agent Skill

医疗法务既要在事前预防又要能在事后取证，且中医项目法规依据分散。本 Skill 要求每条结论都定位到具体条款。

## 最适合 / Best For

- 医事法务与院办的风险防控
- 知情同意文书规范性检查
- 医保合规与纠纷预防培训

## 不适合 / Not For

- 替代执业律师的法律意见
- 对具体案件做责任认定

## 使用前请准备 / Inputs

- 场景类型（风险 / 同意 / 法规 / 案例 / 预防 / 医保）
- 事实描述与时间线
- 涉及科室与人员
- 关键词或条款线索

## 推荐工作流 / Recommended Workflow

1. 调用 /legals/risk 做风险点识别与分级
2. 调用 /legals/consent 检查知情同意完整性
3. 调用 /legals/regulation 定位法规条款
4. 调用 /legals/cases 检索类案
5. 调用 /legals/prevention 输出预防措施清单

## 产出 / Outputs

- 风险分级清单
- 知情同意检查结果
- 法规条款依据与预防措施

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/legals/risk` | 法者风险识别 |
| `/legals/consent` | 法者知情同意 |
| `/legals/regulation` | 法者法规查询 |
| `/legals/cases` | 法者案例库 |
| `/legals/prevention` | 法者纠纷预防 |

- **所属领域**：平台（六者角色）
- **六者角色**：legal
- **离线可用性**：否（必须平台可达）

## 参数 / Parameters

> 学段、册别、章节、知识点、难度以参数传入，不拆成独立 Skill。

| 参数 | 说明 |
| --- | --- |
| `discipline` | 学科编号（见 tcmP `domain-specs/`，如 D01-S01） |
| `textbookCode` | 教材号（如 CM-01 / MM-01 / AT-01） |
| `chapter` | 章 / 节 |
| `knowledgePoint` | 知识点或病证单位（DSU） |
| `scenario` | 使用场景（预习 / 巩固 / 复习 / 演练……） |
| `difficulty` | 基础 / 提高 / 综合 |

## 质量门禁 / Quality Gate

- 每条结论必须可回答「依据是什么」：教材章节 / 病证单位 / 平台接口返回。
- 依赖平台接口的结论必须标注来源端点；接口不可达时标注「未能核实」。
- 涉及患者安全的输出必须携带边界声明与就医提示，不输出处方剂量。
- 输出必须可验收：给出可自查的完成标准，而非「已了解」。

---

> 本文件由 `scripts/skills.spec.mjs` 生成，请勿手工编辑。改内容请改 spec 后执行 `npm run build`。
