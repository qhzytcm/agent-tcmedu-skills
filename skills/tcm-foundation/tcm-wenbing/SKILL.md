---
name: "tcm-wenbing"
description: "卫气营血与三焦两条辨证主线并行，配合四大家学说与温病方剂的情境化应用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["温病","卫气营血","三焦","湿热"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    stages: ["本科"]
    subjects: ["温病学"]
    abilities: ["卫气营血辨证","三焦辨证"]
    scenarios: ["同步巩固","病案讨论"]
    textbook_codes: ["CM-12"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["病例或条文（症状 + 病程 + 舌脉）","希望使用的辨证主线（卫气营血 / 三焦）","学习目标"]
---

# 温病学 Skill

温病学的辨证框架（卫气营血 / 三焦）与伤寒的六经框架容易混淆，学习者常在两条线之间来回漂移。本 Skill 强制选定主线并在另一条线上做交叉校验。

## 最适合 / Best For

- 本科U6 按 CM-12 教材学习
- 湿热类温病的辨证训练
- 伤寒—温病辨证框架对比复习

## 不适合 / Not For

- 替代《温热论》《温病条辨》原典研读
- 在病因不明时套用温病方

## 使用前请准备 / Inputs

- 病例或条文（症状 + 病程 + 舌脉）
- 希望使用的辨证主线（卫气营血 / 三焦）
- 学习目标

## 推荐工作流 / Recommended Workflow

1. 判定新感 / 伏邪与病邪性质（温热 / 湿热）
2. 沿主线定位病位层次
3. 在另一条主线上交叉校验
4. 给出治法与代表方（银翘散 / 清营汤 / 三仁汤等）
5. 提示传变风险与观察要点

## 产出 / Outputs

- 双主线辨证定位
- 治法方药
- 传变与观察要点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-12（见 tcmP `domain-specs/`）
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
