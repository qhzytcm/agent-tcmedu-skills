---
name: "tcm-acupuncture-therapeutics"
description: "按病种组织「辨证分型 → 治则 → 主穴配穴 → 手法 → 疗程」的针灸处方链。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["针灸治疗","配穴","疗程","治则"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.4.1.1"
    stages: ["本科","规培"]
    subjects: ["针灸治疗学"]
    abilities: ["配穴方义","疗程设计"]
    scenarios: ["病案讨论","规培演练"]
    roles: ["healer"]
    textbook_codes: ["AT-03"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["病种与辨证分型","症状与体质","既往针灸反应","治疗条件与频次限制"]
---

# 针灸治疗学 Skill

会取穴不等于会开针灸处方；配穴思路与疗程安排才是治疗学的核心。本 Skill 强制给出配穴方义与疗程设计。

## 四级目录定位 / Library Position

**四级编码** `4.4.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 04 针灸治疗学 / 01 方药应用 / 01 针灸治疗学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 AT-03 教材学习
- 针灸科常见病的处方训练
- 规培出科的针灸能力评估

## 不适合 / Not For

- 替代真人针刺操作与带教
- 对危重病证给出针灸替代方案

## 使用前请准备 / Inputs

- 病种与辨证分型
- 症状与体质
- 既往针灸反应
- 治疗条件与频次限制

## 推荐工作流 / Recommended Workflow

1. 确定辨证分型与治则
2. 选主穴并说明方义
3. 配穴并说明协同关系
4. 确定手法与刺激量
5. 设计疗程与疗效评估节点

## 产出 / Outputs

- 针灸处方（主穴 / 配穴 / 方义）
- 手法与刺激量
- 疗程与评估节点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：AT-03（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
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
