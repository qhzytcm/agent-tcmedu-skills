---
name: "tcm-medicinal-botany"
description: "从植物形态与分类学到药材基原鉴定，把「认得植物」与「认对药材」串起来。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["药用植物","分类","基原","鉴别"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.4.1.1"
    stages: ["本科"]
    subjects: ["药用植物学"]
    abilities: ["植物分类","基原鉴定"]
    scenarios: ["实操训练","同步巩固"]
    textbook_codes: ["MM-04"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["植物或药材名","可见形态特征（根 / 茎 / 叶 / 花 / 果）","训练目标（分类 / 基原 / 鉴别）"]
---

# 药用植物学 Skill

药用植物学的形态描述术语多，且与药材基原的对应关系容易断链。本 Skill 强制「形态特征 → 科属 → 基原药材」三向对应。

## 四级目录定位 / Library Position

**四级编码** `3.4.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 04 药用植物学 / 01 实操与技法 / 01 药用植物学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U2–U3 按 MM-04 教材学习
- 野外识药实训准备
- 药材基原鉴定的植物学基础

## 不适合 / Not For

- 替代实物标本与野外实践
- 仅凭图片给出物种鉴定结论

## 使用前请准备 / Inputs

- 植物或药材名
- 可见形态特征（根 / 茎 / 叶 / 花 / 果）
- 训练目标（分类 / 基原 / 鉴别）

## 推荐工作流 / Recommended Workflow

1. 按形态特征逐步检索到科属
2. 给出该科属的关键识别点
3. 对应到药用部位与基原药材
4. 列出易混淆种与鉴别要点
5. 生成性状检索表并做判分

## 产出 / Outputs

- 形态—科属检索路径
- 基原对应表
- 易混淆种鉴别与判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-04（见 tcmP `domain-specs/`）
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
