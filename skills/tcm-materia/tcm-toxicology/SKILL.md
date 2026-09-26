---
name: "tcm-toxicology"
description: "按毒性成分、靶器官与剂量—时间关系评估中药安全性，给出减毒策略。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["毒理","安全性","ADR","减毒"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.10.1.1"
    stages: ["硕士","继续教育"]
    subjects: ["中药毒理学"]
    abilities: ["毒性评估","减毒策略"]
    scenarios: ["安全培训","病案讨论"]
    roles: ["pharmacist","healer"]
    textbook_codes: ["MM-16"]
    platform_apis: ["/pharmacists/interaction"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["药材或成分名","剂量与用药时长","靶器官与症状","炮制与配伍情况"]
---

# 中药毒理学 Skill

「中药无毒副作用」是危险的误解，而毒性又与炮制、配伍、剂量强相关。本 Skill 以毒代动力学视角组织安全性评估。

## 四级目录定位 / Library Position

**四级编码** `3.10.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 10 中药毒理学 / 01 方药应用 / 01 中药毒理学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 硕士M1 按 MM-16 教材学习
- 含毒性成分药材的用药安全培训
- 不良反应（ADR）案例复盘

## 不适合 / Not For

- 替代临床安全性评价与法定报告
- 给出自行服用毒性药材的建议

## 使用前请准备 / Inputs

- 药材或成分名
- 剂量与用药时长
- 靶器官与症状
- 炮制与配伍情况

## 推荐工作流 / Recommended Workflow

1. 识别毒性成分与毒性类型
2. 说明靶器官与中毒表现
3. 分析剂量—时间—毒性关系
4. 评估炮制与配伍对毒性的影响
5. 给出减毒策略与监测指标

## 产出 / Outputs

- 毒性成分与靶器官表
- 剂量—毒性关系
- 减毒策略与监测指标

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/pharmacists/interaction` | 药者药物相互作用 |

- **关联教材**：MM-16（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
- **六者角色**：pharmacist、healer
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
