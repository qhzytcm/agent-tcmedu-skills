---
name: "tcm-geriatrics"
description: "老年多病共存与虚实夹杂场景下的用药取舍：先定主次，再谈补泻。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["老年病","多病共存","虚实","减药"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.8.1.1"
    stages: ["本科","规培"]
    subjects: ["中医老年病学"]
    abilities: ["虚实取舍","多病共存"]
    scenarios: ["病案讨论","规培演练"]
    roles: ["healer"]
    textbook_codes: ["CM-21"]
    platform_apis: ["/pharmacists/interaction"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["共存的疾病清单与当前主症","当前用药清单（含西药）","体质与活动能力","舌脉"]
---

# 中医老年病学 Skill

老年人多病共存、多药并用，最忌「一病一方」叠加。本 Skill 强制先排主次矛盾，再做补泻取舍与减药评估。

## 四级目录定位 / Library Position

**四级编码** `2.8.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 08 中医老年病学 / 01 辨证推理 / 01 中医老年病学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U9 按 CM-21 教材学习
- 老年科多病共存的处方取舍
- 老年综合评估的中医视角

## 不适合 / Not For

- 替代老年综合评估（CGA）量表
- 对多药并用者给出自行停药建议

## 使用前请准备 / Inputs

- 共存的疾病清单与当前主症
- 当前用药清单（含西药）
- 体质与活动能力
- 舌脉

## 推荐工作流 / Recommended Workflow

1. 排序当前主次矛盾
2. 判断虚实比例与可攻可补程度
3. 给出治法方药并标注减味理由
4. 做多药相互作用风险提示
5. 给出随访与剂量调整节点

## 产出 / Outputs

- 主次矛盾排序
- 治法方药与减味理由
- 多药风险提示与随访节点

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/pharmacists/interaction` | 药者药物相互作用 |

- **关联教材**：CM-21（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医临床各科）
- **六者角色**：healer
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
