---
name: "tcm-bone-disease"
description: "处理骨与关节的慢性病证（骨痹 / 骨蚀 / 骨质疏松），以内治外治结合为主线。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["骨病","骨痹","骨质疏松","慢病管理"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.5.1.1"
    stages: ["本科","继续教育"]
    subjects: ["骨病学"]
    abilities: ["分期病机","慢病管理"]
    scenarios: ["病案讨论","继续教育"]
    roles: ["healer"]
    textbook_codes: ["OR-04"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["病种与病程","影像与骨密度（可留空）","疼痛与功能受限","体质与舌脉"]
---

# 骨病学 Skill

骨病病程长、进展慢，容易只做对症处理而不管理病机演变。本 Skill 强调分期病机与长期管理方案。

## 四级目录定位 / Library Position

**四级编码** `5.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 05 骨病学 / 01 管理与决策 / 01 骨病学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 OR-04 教材学习
- 骨性关节炎 / 骨质疏松的中医管理
- 老年骨病的慢病管理

## 不适合 / Not For

- 替代骨科手术评估
- 对需手术的骨病给出保守替代承诺

## 使用前请准备 / Inputs

- 病种与病程
- 影像与骨密度（可留空）
- 疼痛与功能受限
- 体质与舌脉

## 推荐工作流 / Recommended Workflow

1. 判定病期与病机（肾虚 / 痰瘀 / 寒湿）
2. 给出内治治法方药
3. 给出外治（熏洗 / 敷贴 / 导引）
4. 设计功能锻炼方案
5. 排定长期随访与影像复查节点

## 产出 / Outputs

- 分期病机判断
- 内外合治方案
- 功能锻炼与随访计划

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：OR-04（见 tcmP `domain-specs/`）
- **所属领域**：D05,D06（骨伤与五官口腔）
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
