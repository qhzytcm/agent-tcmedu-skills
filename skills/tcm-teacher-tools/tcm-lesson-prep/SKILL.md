---
name: "tcm-lesson-prep"
description: "按学时与学情生成教案：目标、重点难点、板书结构、课堂活动与作业。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["备课","教案","重难点","课堂活动"]
    source: agent-tcmedu-skills
    category: "tcm-teacher-tools"
    domain: "-"
    library_code: "12.1.1.1"
    stages: ["继续教育"]
    subjects: ["教师发展"]
    abilities: ["教学设计","重难点分析"]
    scenarios: ["备课","教研"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["课程与章节","学时与学段","学情（已学 / 未学 / 薄弱点）","教学形式（讲授 / 讨论 / 实训）"]
---

# 中医备课 Skill

中医课程概念密度大，备课容易变成「把教材抄成 PPT」。本 Skill 强制先定学习目标与难点，再设计课堂活动。

## 四级目录定位 / Library Position

**四级编码** `12.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 12 教研工具 / 01 教师发展 / 01 教学与学习 / 01 中医备课 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医药院校教师的日常备课
- 师承带教者的专题课设计
- 继续教育培训课程设计

## 不适合 / Not For

- 替代教学督导的正式评价
- 在没有学时与学情信息时的通用教案

## 使用前请准备 / Inputs

- 课程与章节
- 学时与学段
- 学情（已学 / 未学 / 薄弱点）
- 教学形式（讲授 / 讨论 / 实训）

## 推荐工作流 / Recommended Workflow

1. 写清 3 条可测的学习目标
2. 标出重点与 2–3 个难点
3. 设计板书或概念结构图
4. 设计 2 个课堂活动或提问链
5. 配套作业与下节课预习提示

## 产出 / Outputs

- 教案（目标 / 重难点 / 结构图 / 活动）
- 课堂提问链
- 作业与预习提示

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

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
