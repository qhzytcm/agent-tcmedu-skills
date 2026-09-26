---
name: "tcm-neijing"
description: "《黄帝内经》原文—注释—译文三层对照研读，并把经文落到现代生理与临床场景。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["内经","素问","灵枢","原文"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    stages: ["本科","硕士"]
    subjects: ["内经选读"]
    abilities: ["经典研读","医古文"]
    scenarios: ["经典研读","单元复习"]
    textbook_codes: ["CM-09"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["篇目名称（如《素问·阴阳应象大论》）","原文段落或教材页码","研读深度（本科 / 研究生）"]
---

# 内经选读 Skill

内经学习常卡在「文言读不懂」与「读懂了不知道有什么用」两端。本 Skill 用三层对照解决前者，用「经文—现代映射—临床场景」解决后者。

## 最适合 / Best For

- 本科U4–U5 按 CM-09 教材研读
- 素问 / 灵枢重点篇目的精读
- 研究生追溯中医理论源头

## 不适合 / Not For

- 把内经当纯古文翻译练习
- 脱离篇目主旨的断章取义

## 使用前请准备 / Inputs

- 篇目名称（如《素问·阴阳应象大论》）
- 原文段落或教材页码
- 研读深度（本科 / 研究生）

## 推荐工作流 / Recommended Workflow

1. 定位篇目主旨与该篇在全书的位置
2. 原文逐句分层：字词—句读—义理
3. 给出注释与白话译文
4. 做「经文→现代生理/病理」映射
5. 提炼可迁移的临床原则并给出后世医家印证

## 产出 / Outputs

- 三层对照研读卡
- 经文—现代映射表
- 临床原则提炼

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-09（见 tcmP `domain-specs/`）
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
