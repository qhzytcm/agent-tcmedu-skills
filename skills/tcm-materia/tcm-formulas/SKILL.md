---
name: "tcm-formulas"
description: "从君臣佐使拆方义，把「方—证—法」绑定，并训练加减变化对功效的迁移。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["方剂","君臣佐使","类方","方证对应"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.2.1.1"
    stages: ["本科"]
    subjects: ["方剂学"]
    abilities: ["方义配伍","类方比较"]
    scenarios: ["同步巩固","考前背诵"]
    textbook_codes: ["MM-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["方名或方类","学习目标（拆方义 / 类方比较 / 加减推演）","待匹配的证型（可选）"]
---

# 方剂学 Skill

背方歌能记住组成，但说不清「为什么这么配」。本 Skill 强制拆君臣佐使并做加减推演，把方剂学成可推理的结构。

## 四级目录定位 / Library Position

**四级编码** `3.2.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 02 方剂学 / 01 方药应用 / 01 方剂学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科二年级按 MM-02 教材学习
- 类方（如四君子汤类方）比较
- 临床用方前的方义复核

## 不适合 / Not For

- 替代原方剂量与煎服法的权威依据
- 在无证型依据时推荐成方

## 使用前请准备 / Inputs

- 方名或方类
- 学习目标（拆方义 / 类方比较 / 加减推演）
- 待匹配的证型（可选）

## 推荐工作流 / Recommended Workflow

1. 列出组成、剂量与煎服法
2. 拆解君臣佐使与配伍意义
3. 绑定「方—证—法」三角
4. 做类方比较或加减推演（加一味 / 减一味对功效的影响）
5. 生成方证匹配题并判分

## 产出 / Outputs

- 方义拆解表
- 方—证—法绑定
- 类方比较 / 加减推演

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-02（见 tcmP `domain-specs/`）
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
