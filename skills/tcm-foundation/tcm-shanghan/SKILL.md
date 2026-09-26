---
name: "tcm-shanghan"
description: "按六经辨证把《伤寒论》条文整理成「方证—脉证—治法—禁忌」四栏可检索卡片。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["伤寒论","六经","经方","方证对应"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    stages: ["本科","硕士"]
    subjects: ["伤寒论讲义"]
    abilities: ["六经辨证","经方方证"]
    scenarios: ["经典研读","考前背诵"]
    textbook_codes: ["CM-10"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["条文号或方剂名（如「桂枝汤」「第 12 条」）","学习目标（记方 / 辨脉 / 类方比较）","当前学段"]
---

# 伤寒论讲义 Skill

伤寒论 398 条条文分散且互文性强，学习者记不住「哪条对哪方、哪方治哪证」。本 Skill 用四栏卡片把条文结构化，并建立方证索引。

## 最适合 / Best For

- 本科U5–U6 按 CM-10 教材学习
- 经方方证对应的专项记忆
- 临床用经方前的方证核对

## 不适合 / Not For

- 替代原书通读
- 跳过条文依据直接给方

## 使用前请准备 / Inputs

- 条文号或方剂名（如「桂枝汤」「第 12 条」）
- 学习目标（记方 / 辨脉 / 类方比较）
- 当前学段

## 推荐工作流 / Recommended Workflow

1. 定位条文与所属六经病篇
2. 拆解为方证 / 脉证 / 治法 / 禁忌四栏
3. 与同类方做鉴别（如桂枝汤类方）
4. 给出后世注家要点（成无己 / 柯琴等）
5. 生成方证对应默写与判分

## 产出 / Outputs

- 条文四栏卡
- 类方鉴别表
- 方证默写与判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-10（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医基础与经典）
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
