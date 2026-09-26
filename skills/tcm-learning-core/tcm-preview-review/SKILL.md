---
name: "tcm-preview-review"
description: "课前用问题清单预习，周末用「掌握了什么—还差什么」做结构化复盘。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["预习","周复盘","掌握度自评"]
    source: agent-tcmedu-skills
    category: "tcm-learning-core"
    domain: "-"
    library_code: "8.1.1.4"
    stages: ["本科","硕士","规培"]
    subjects: ["学习能力"]
    abilities: ["预习","阶段复盘"]
    scenarios: ["课前预习","学习报告"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["下次课的章节或主题","本周学习内容清单","自评掌握程度"]
---

# 中医预习与每周复盘 Skill

中医课程节奏快，不预习听课效率低；不复盘则学一章丢一章。本 Skill 把预习与复盘固定成两个短流程。

## 四级目录定位 / Library Position

**四级编码** `8.1.1.4`（篇·章·节·目，横向读即完整编码）

**定位路径** 08 学习核心 / 01 学习能力 / 01 教学与学习 / 04 中医预习与每周复盘 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 在校生按课表的同步预习
- 每周一次的阶段复盘
- 师承跟诊后的复盘

## 不适合 / Not For

- 替代课堂听讲与跟诊实践
- 在没有课程信息时的空泛预习

## 使用前请准备 / Inputs

- 下次课的章节或主题
- 本周学习内容清单
- 自评掌握程度

## 推荐工作流 / Recommended Workflow

1. 预习：生成 5 个带答案锚点的问题清单
2. 预习：标注预计难点
3. 复盘：按主题逐项自评掌握度
4. 复盘：找出「以为会其实不会」的项
5. 生成下周的优先级调整建议

## 产出 / Outputs

- 预习问题清单
- 每周复盘表
- 下周优先级建议

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
