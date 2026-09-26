---
name: "tcm-unit-review"
description: "把单元复习设计成「知识结构重建 → 易错点清扫 → 综合应用」三段课堂。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["单元复习","易错点","变式训练"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.5.1.2"
    stages: ["继续教育"]
    subjects: ["教师发展"]
    abilities: ["单元复习","教学设计"]
    scenarios: ["教研","单元复习"]
    upstream_source: "hermes-edu-skills/teacher-geography-unit-review@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["单元范围与课时","本单元测验或作业数据","学员易错点"]
---

# 中医单元复习设计 Skill

单元复习常退化成再讲一遍。本 Skill 以「重建结构—清扫易错—综合应用」三段重构课堂。

## 四级目录定位 / Library Position

**四级编码** `13.5.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 05 教师发展 / 01 教学与学习 / 02 中医单元复习设计 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 课程单元复习课设计
- 考前专题复习课
- 师承阶段小结会

## 不适合 / Not For

- 替代新授课
- 在无单元测验数据时的复习重点判定

## 使用前请准备 / Inputs

- 单元范围与课时
- 本单元测验或作业数据
- 学员易错点

## 推荐工作流 / Recommended Workflow

1. 让学员自己重建本单元知识结构
2. 按数据定位三大易错点
3. 针对易错点设计变式训练
4. 设计一道跨节综合应用题
5. 输出课堂时间分配与板书要点

## 产出 / Outputs

- 复习课三段设计
- 易错点变式训练
- 综合应用题与时间分配

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/teacher-geography-unit-review@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
