---
name: "tcm-daily-herb-drill"
description: "每天 8–12 道方药速练：药性功效、方剂组成、配伍禁忌的高频短时训练。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["速练","方药","每日","配伍禁忌"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.3.1.1"
    stages: ["本科","规培"]
    subjects: ["中药学","方剂学"]
    abilities: ["药性功效","方剂组成"]
    scenarios: ["每日打卡","同步巩固"]
    textbook_codes: ["MM-01","MM-02"]
    upstream_source: "hermes-edu-skills/junior-chemistry-quick-practice@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["今日训练范围（药性 / 组成 / 配伍）","可用时间与题量","最近错项"]
---

# 中医方药速练 Skill

方药是「一天不练就手生」的内容。本 Skill 用 10 分钟高频短练维持熟练度，并只补当天错项。

## 四级目录定位 / Library Position

**四级编码** `13.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 03 中药学 / 01 方药应用 / 01 中医方药速练 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中药学与方剂学的日常维持训练
- 执业医师方药部分的持续覆盖
- 规培期间的方药手感保持

## 不适合 / Not For

- 替代系统的中药方剂课程学习
- 在无错项记录时的盲目刷题

## 使用前请准备 / Inputs

- 今日训练范围（药性 / 组成 / 配伍）
- 可用时间与题量
- 最近错项

## 推荐工作流 / Recommended Workflow

1. 按范围生成 8–12 道速练题
2. 限时完成并即时判分
3. 错项归因到最小知识块
4. 只对错项做一次定点复述
5. 把错项滚入次日队列

## 产出 / Outputs

- 速练题与判分
- 错项归因
- 次日滚动队列

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-01、MM-02（见 tcmP `domain-specs/`）
- **上游来源**：`hermes-edu-skills/junior-chemistry-quick-practice@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
