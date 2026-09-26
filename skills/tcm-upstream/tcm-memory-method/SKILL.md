---
name: "tcm-memory-method"
description: "针对方歌、条文、药性、腧穴四类高记忆负荷内容，匹配专门的记忆编码法。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["记忆","方歌","条文","腧穴"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.2.1"
    stages: ["本科","继续教育"]
    subjects: ["学习能力"]
    abilities: ["记忆","主动回忆"]
    scenarios: ["背诵记忆","考前冲刺"]
    upstream_source: "hermes-edu-skills/agent-memory-method@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["待记忆内容的类型与范围","当前记忆方式与困难点","可用的记忆时段"]
---

# 中医记忆方法 Skill

中医记忆负荷集中在方歌、经典条文、药性归经、腧穴定位四类，用同一种方法背会事倍功半。本 Skill 按内容类型匹配编码法。

## 四级目录定位 / Library Position

**四级编码** `13.1.2.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 02 实操与技法 / 01 中医记忆方法 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 方歌与经方组成的记忆
- 经典条文的分层背诵
- 药性与归经的横向辨析记忆
- 腧穴定位的体表标志记忆

## 不适合 / Not For

- 替代理解性的理论推演
- 把记忆量当成学习成果的唯一指标

## 使用前请准备 / Inputs

- 待记忆内容的类型与范围
- 当前记忆方式与困难点
- 可用的记忆时段

## 推荐工作流 / Recommended Workflow

1. 判定内容属于方歌 / 条文 / 药性 / 腧穴哪一类
2. 匹配对应的编码法（韵律 / 分层 / 对比 / 定位）
3. 生成记忆材料（口诀 / 结构图 / 对比表）
4. 设计回忆检索练习（不给线索的主动回忆）
5. 按间隔排复测

## 产出 / Outputs

- 记忆材料（口诀 / 对比表 / 结构图）
- 主动回忆练习
- 复测排程

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-memory-method@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
