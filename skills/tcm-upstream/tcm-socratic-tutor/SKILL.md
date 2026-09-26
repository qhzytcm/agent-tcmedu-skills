---
name: "tcm-socratic-tutor"
description: "不给答案先给问题：用苏格拉底式追问把学习者逼到自己找出辨证结论。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["启发式","讲题","苏格拉底","追问"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.3.1"
    stages: ["本科","规培","硕士"]
    subjects: ["学习能力"]
    abilities: ["启发提问","临床推理"]
    scenarios: ["AI 讲题","病案讨论"]
    upstream_source: "hermes-edu-skills/agent-socratic-tutor@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["题目或病案内容","学习者的初步判断（可留空）","允许的追问轮次上限"]
---

# 中医启发式讲题 Skill

直接给答案会让人「看懂了但不会做」。本 Skill 用递进追问替代直接讲解，只在学习者卡死时给最小提示。

## 四级目录定位 / Library Position

**四级编码** `13.1.3.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 03 辨证推理 / 01 中医启发式讲题 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 病案辨证的思路训练
- 经方方证对应的辨析训练
- 规培阶段的临床思维打磨

## 不适合 / Not For

- 时间紧迫的考前答疑
- 学习者明确要求直接讲解时

## 使用前请准备 / Inputs

- 题目或病案内容
- 学习者的初步判断（可留空）
- 允许的追问轮次上限

## 推荐工作流 / Recommended Workflow

1. 先让学习者给出自己的判断与依据
2. 沿其依据追问「凭什么」至最小证据
3. 在其依据薄弱处提出反例
4. 仅在被卡住 2 轮后给最小提示
5. 最后要求用一句话总结判断依据

## 产出 / Outputs

- 追问链记录
- 学习者的判断演化
- 一句话依据总结

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-socratic-tutor@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
