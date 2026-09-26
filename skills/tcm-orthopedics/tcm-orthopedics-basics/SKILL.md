---
name: "tcm-orthopedics-basics"
description: "打牢骨伤解剖、损伤机制与检查法基础，为手法与固定提供判断依据。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["骨伤基础","解剖","损伤机制","检查法"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.3.1.1"
    stages: ["本科"]
    subjects: ["中医骨伤科基础"]
    abilities: ["损伤机制","专科检查"]
    scenarios: ["同步巩固","实操训练"]
    roles: ["healer"]
    textbook_codes: ["OR-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["损伤部位与机制","局部体征","影像描述（可留空）","训练目标（解剖 / 机制 / 检查）"]
---

# 骨伤科基础 Skill

骨伤处理的第一步是「看得懂损伤」，基础不牢会导致手法选择失当。本 Skill 以解剖—机制—检查三段式打基础。

## 四级目录定位 / Library Position

**四级编码** `5.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 03 中医骨伤科基础 / 01 概念与记忆 / 01 骨伤科基础 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 OR-02 教材学习
- 骨伤科实习前的基础补强
- 损伤机制分析训练

## 不适合 / Not For

- 替代影像学与解剖标本实训
- 在缺乏影像时给出确定性损伤分级

## 使用前请准备 / Inputs

- 损伤部位与机制
- 局部体征
- 影像描述（可留空）
- 训练目标（解剖 / 机制 / 检查）

## 推荐工作流 / Recommended Workflow

1. 回顾该部位解剖结构与稳定结构
2. 推演损伤机制与可能伤及的组织
3. 按望 / 触 / 量 / 动做专科检查
4. 整合判断损伤类型
5. 标注需影像确认的项目

## 产出 / Outputs

- 解剖—机制推演
- 专科检查清单与结果解读
- 需影像确认项

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：OR-02（见 tcmP `domain-specs/`）
- **所属领域**：D05,D06（骨伤与五官口腔）
- **六者角色**：healer
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
