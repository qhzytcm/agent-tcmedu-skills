---
name: "tcm-mistake-review"
description: "把错题按「概念型 / 记忆型 / 推理型 / 粗心型」四类归因，并生成复测。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["错题","归因","复测"]
    source: agent-tcmedu-skills
    category: "tcm-learning-core"
    domain: "-"
    library_code: "8.1.1.2"
    stages: ["本科","硕士","规培"]
    subjects: ["学习能力"]
    abilities: ["错题订正","复习计划"]
    scenarios: ["错题订正","单元复习"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["原题与你的作答","正确答案与解析","错误发生的时间与场景"]
---

# 中医错题复盘 Skill

中医错题常被笼统归为「没背熟」，但真正的失分点是辨证推理错误。本 Skill 强制四类归因，让复习打在最痛处。

## 四级目录定位 / Library Position

**四级编码** `8.1.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 08 学习核心 / 01 学习能力 / 01 教学与学习 / 02 中医错题复盘 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 执业医师与考研的题海复盘
- 课程测验后的订正
- 规培考核后的查漏

## 不适合 / Not For

- 替代教师对争议题目的裁定
- 在无原题的纯记忆复述

## 使用前请准备 / Inputs

- 原题与你的作答
- 正确答案与解析
- 错误发生的时间与场景

## 推荐工作流 / Recommended Workflow

1. 还原题目考点与所属学科
2. 做四类归因并给出判据
3. 提炼该考点的最小知识块
4. 生成 3 道同考点变式题
5. 排定 1 天 / 3 天 / 7 天复测

## 产出 / Outputs

- 错题归因卡
- 最小知识块
- 变式题与复测计划

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
