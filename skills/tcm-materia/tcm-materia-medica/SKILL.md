---
name: "tcm-materia-medica"
description: "按「性味归经—功效—主治—用法用量—使用注意」五要素记忆中药，并做同类药横向比较。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["中药","性味归经","功效","使用注意"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.1.1.1"
    stages: ["本科"]
    subjects: ["中药学"]
    abilities: ["药性功效","同类药辨析"]
    scenarios: ["同步巩固","考前背诵"]
    textbook_codes: ["MM-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["中药名或药类（如「解表药」）","学习目标（记功效 / 辨同类 / 记剂量）","临床场景（可选）"]
---

# 中药学 Skill

中药数量多且功效高度相似，单味背记极易混淆。本 Skill 强制五要素结构 + 同类药横向对比表，把「记住」变成「分得清」。

## 四级目录定位 / Library Position

**四级编码** `3.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 01 中药学 / 01 方药应用 / 01 中药学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科二年级按 MM-01 教材学习
- 同类药（如清热解毒药群）横向辨析
- 执业医师中药部分复习

## 不适合 / Not For

- 替代《中国药典》的法定标准
- 给出个体化处方（须医师）

## 使用前请准备 / Inputs

- 中药名或药类（如「解表药」）
- 学习目标（记功效 / 辨同类 / 记剂量）
- 临床场景（可选）

## 推荐工作流 / Recommended Workflow

1. 给出五要素结构化卡片
2. 列出同类药并做横向对比表
3. 标注易混淆点与鉴别口诀
4. 提示用法用量与使用注意（含妊娠禁忌）
5. 生成辨析题并判分

## 产出 / Outputs

- 五要素药卡
- 同类药对比表
- 辨析题与判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-01（见 tcmP `domain-specs/`）
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
