---
name: "tcm-review-assistant"
description: "把「复习」从重读一遍变成按遗忘曲线与考点权重的排程任务。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["复习","遗忘曲线","排程"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.1.1"
    stages: ["本科","硕士","规培","继续教育"]
    subjects: ["学习能力"]
    abilities: ["复习计划","抗遗忘"]
    scenarios: ["单元复习","考前规划"]
    upstream_source: "hermes-edu-skills/agent-review-assistant@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["待复习的学科与章节范围","各科考试或考核时间","每天可用时间","已掌握程度自评"]
---

# 中医复习助手 Skill

中医课程背诵量大、学科间互为依据，复习若不排程就会「哪科急看哪科」。本 Skill 按遗忘曲线与考点权重排出复习日程，并指定每次复习的产出。

## 四级目录定位 / Library Position

**四级编码** `13.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 01 综合能力 / 01 中医复习助手 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 期中期末的课程复习排程
- 执业医师多科并行的复习统筹
- 经典条文与方药的长期抗遗忘

## 不适合 / Not For

- 替代系统性的首轮学习
- 在无课程范围信息时的空泛排程

## 使用前请准备 / Inputs

- 待复习的学科与章节范围
- 各科考试或考核时间
- 每天可用时间
- 已掌握程度自评

## 推荐工作流 / Recommended Workflow

1. 列出待复习清单并标注考点权重
2. 按遗忘曲线排 1 / 3 / 7 / 21 天节点
3. 把每次复习指定为「回忆—核对—补漏」三段
4. 为每次复习设可验收产出（默写 / 口述 / 做题）
5. 每周按实际完成率重排

## 产出 / Outputs

- 复习排程表
- 每次复习的产出要求
- 每周重排建议

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-review-assistant@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
