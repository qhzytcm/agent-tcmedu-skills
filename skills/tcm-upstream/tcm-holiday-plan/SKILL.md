---
name: "tcm-holiday-plan"
description: "把寒暑假的整块时间投到学期内做不了的事：经典通读、跟诊积累、专项补强。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["假期","寒暑假","阶段产出"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.1.4"
    stages: ["本科","硕士"]
    subjects: ["学习能力"]
    abilities: ["假期计划","阶段产出"]
    scenarios: ["寒暑假提升"]
    upstream_source: "hermes-edu-skills/agent-holiday-plan@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["假期起止时间与可投入天数","希望完成的 2–3 件大事","当前基础与薄弱项"]
---

# 中医假期提升 Skill

假期最容易「计划满满、执行零碎」。本 Skill 只选 2–3 件学期内做不了的事，并配可验收的阶段产出。

## 四级目录定位 / Library Position

**四级编码** `13.1.1.4`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 01 综合能力 / 04 中医假期提升 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 寒暑假的经典通读计划
- 假期跟诊与病案积累
- 学期遗留下来的薄弱项集中补强

## 不适合 / Not For

- 替代学校的正式教学安排
- 在无明确目标时的填满式计划

## 使用前请准备 / Inputs

- 假期起止时间与可投入天数
- 希望完成的 2–3 件大事
- 当前基础与薄弱项

## 推荐工作流 / Recommended Workflow

1. 筛选出「学期内做不了」的 2–3 件事
2. 为每件事设阶段产出（非时间投入）
3. 排出周节奏并预留机动周
4. 设中途检查点与放弃判据
5. 假期末做一次成品验收

## 产出 / Outputs

- 假期目标与阶段产出
- 周节奏表与检查点
- 期末验收方式

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-holiday-plan@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
