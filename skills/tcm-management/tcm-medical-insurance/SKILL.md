---
name: "tcm-medical-insurance"
description: "查清医保报销口径、药品分类与费用估算，并给出可复核的法规依据。 依赖 tcmP 平台接口，离线不可用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["医保","药品分类","费用估算","法规"]
    source: agent-tcmedu-skills
    category: "tcm-management"
    domain: "D08"
    stages: ["继续教育"]
    subjects: ["中医医院管理","医事法学"]
    abilities: ["医保口径","法规查询"]
    scenarios: ["医院管理","患者沟通"]
    roles: ["legal","regulator"]
    platform_apis: ["/legals/insurance/coverage","/legals/insurance/drug","/legals/insurance/estimate","/legals/regulation"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["医保类型（职工 / 居民 / 新农合）","诊疗项目或药品名称","就诊类型（门诊 / 住院）"]
---

# 中医医保与法规 Skill

医保政策地域性强、更新频繁，且中医项目分类特殊。本 Skill 固化「先查法规、再算口径、最后留痕」的流程。

## 最适合 / Best For

- 医院医保办日常咨询
- 临床科室费用沟通
- 法者角色医保知识支持

## 不适合 / Not For

- 替代医保部门的正式答复
- 对具体患者做出报销承诺

## 使用前请准备 / Inputs

- 医保类型（职工 / 居民 / 新农合）
- 诊疗项目或药品名称
- 就诊类型（门诊 / 住院）

## 推荐工作流 / Recommended Workflow

1. 确定适用医保类型与政策版本
2. 调用 /legals/insurance/drug 查药品分类（A/B/C 类）
3. 调用 /legals/insurance/coverage 核报销口径
4. 调用 /legals/insurance/estimate 做费用估算
5. 输出结论 + 依据条款 + 待确认提示

## 产出 / Outputs

- 报销口径结论
- 药品分类与自付比例
- 费用估算与依据条款

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/legals/insurance/coverage` | 医保报销口径 |
| `/legals/insurance/drug` | 医保药品分类 |
| `/legals/insurance/estimate` | 费用估算 |
| `/legals/regulation` | 法者法规查询 |

- **所属领域**：D08（中医管理）
- **六者角色**：legal、regulator
- **离线可用性**：是

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
