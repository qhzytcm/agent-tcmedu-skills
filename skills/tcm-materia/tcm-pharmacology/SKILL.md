---
name: "tcm-pharmacology"
description: "把中药功效与现代药理作用双向对照，建立「功效—药理—靶点」的证据链。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["药理","功效对照","靶点","证据强度"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.6.1.1"
    stages: ["本科","硕士"]
    subjects: ["中药药理学"]
    abilities: ["功效药理对照","证据评估"]
    scenarios: ["科研训练","同步巩固"]
    textbook_codes: ["MM-06"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["中药或有效成分","待对照的功效","关注的药理系统","现有证据类型"]
---

# 中药药理学 Skill

中药功效与现代药理分属两套语言，学习者常各背各的。本 Skill 强制双向对照，并标注证据强度而非直接等同。

## 四级目录定位 / Library Position

**四级编码** `3.6.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 06 中药药理学 / 01 检索与数据 / 01 中药药理学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U4–U5 按 MM-06 教材学习
- 中药新药研发的药理设计
- 科研选题的功效—靶点定位

## 不适合 / Not For

- 把功效与现代药理直接划等号
- 在无实验证据时断言作用机制

## 使用前请准备 / Inputs

- 中药或有效成分
- 待对照的功效
- 关注的药理系统
- 现有证据类型

## 推荐工作流 / Recommended Workflow

1. 列出中药功效表述
2. 对照现代药理实验结果
3. 标注对应的靶点与通路（有证据者）
4. 给出证据强度分级
5. 标注尚未证实的功效假设

## 产出 / Outputs

- 功效—药理对照表
- 靶点与通路（带证据）
- 证据强度分级与待证假设

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-06（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
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
