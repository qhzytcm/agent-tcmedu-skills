---
name: "tcm-basic-theory"
description: "把阴阳五行、藏象、气血津液、经络、病因病机转成可自检的概念网络学习任务。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["基础","藏象","阴阳五行","经络"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    library_code: "1.1.1.1"
    stages: ["本科"]
    subjects: ["中医基础理论"]
    abilities: ["概念网络","知识记忆"]
    scenarios: ["课前预习","同步巩固","单元复习"]
    textbook_codes: ["CM-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["教材版本与章节（默认 CM-01 中医基础理论）","当前学段与基础水平","每天可投入时间"]
---

# 中医基础理论 Skill

中医基础理论概念密集且相互定义，学习者容易「背得下名词、串不起关系」。本 Skill 把 S01 教材的章节骨架转成概念网络，让学习者每完成一次学习都能回答「这个概念和谁有关、靠什么证据成立」。

## 四级目录定位 / Library Position

**四级编码** `1.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 01 中医基础与经典 / 01 中医基础理论 / 01 概念与记忆 / 01 中医基础理论 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U2–U3 按 CM-01 教材同步学习
- 跨专业转中医者的补基础
- 考研中医综合的中基一轮复习

## 不适合 / Not For

- 代替临床课程与临床实习
- 在没有教材版本与章节信息时的凭空讲授

## 使用前请准备 / Inputs

- 教材版本与章节（默认 CM-01 中医基础理论）
- 当前学段与基础水平
- 每天可投入时间

## 推荐工作流 / Recommended Workflow

1. 锚定章节与核心概念清单
2. 构建概念关系网（属种 / 因果 / 对立制约）
3. 每概念给出「定义—原文依据—反例」三件套
4. 生成 5–8 道概念辨析题并当堂判分
5. 输出本次掌握度与下一步建议

## 产出 / Outputs

- 概念网络图（Markdown 表格）
- 辨析题与判分
- 掌握度与下一步

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-01（见 tcmP `domain-specs/`）
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
