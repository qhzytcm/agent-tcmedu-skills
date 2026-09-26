---
name: "tcm-schools"
description: "把历代学术流派的主张、代表方与分歧点做成可对比的流派矩阵。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["各家学说","金元四大家","流派"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    library_code: "1.8.1.1"
    stages: ["本科","硕士"]
    subjects: ["各家学说"]
    abilities: ["流派对比","学术辨析"]
    scenarios: ["经典研读","继续教育"]
    textbook_codes: ["CM-25"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["专题或问题（如「火热论争」「脾胃论争」）","涉及流派与代表人物","需要对比的维度"]
---

# 各家学说 Skill

各家学说易学成人物罗列。本 Skill 以「同一问题不同答案」为核心，用流派矩阵呈现分歧。

## 四级目录定位 / Library Position

**四级编码** `1.8.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 01 中医基础与经典 / 08 各家学说 / 01 经典研读 / 01 各家学说 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U8 / 硕士M1 按 CM-25 教材学习
- 金元四大家与温病学派的对比
- 临床选方时的流派视角参照

## 不适合 / Not For

- 替代原著的直接研读
- 把流派主张简化为标签

## 使用前请准备 / Inputs

- 专题或问题（如「火热论争」「脾胃论争」）
- 涉及流派与代表人物
- 需要对比的维度

## 推荐工作流 / Recommended Workflow

1. 锚定争议问题
2. 列出各流派的核心主张与依据
3. 对比同一问题的不同答案
4. 标注代表方剂与适用边界
5. 给出当代临床的取舍建议

## 产出 / Outputs

- 流派对比矩阵
- 同一问题的多元答案
- 临床应用取舍建议

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-25（见 tcmP `domain-specs/`）
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
