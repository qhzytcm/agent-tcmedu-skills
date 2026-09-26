---
name: "tcm-daily-recitation"
description: "每天 10–15 分钟的经典条文与方歌背诵闭环：给线索回忆 → 核对 → 补漏。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["背诵","条文","方歌","每日"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.2.1.1"
    stages: ["本科","继续教育"]
    subjects: ["经典背诵"]
    abilities: ["背诵","主动回忆"]
    scenarios: ["每日打卡"]
    textbook_codes: ["CM-10"]
    upstream_source: "hermes-edu-skills/primary-chinese-recitation-daily@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["今日背诵范围（条文 / 方歌）","可用时间","昨日未通过项"]
---

# 中医每日背诵 Skill

背诵若不设「不给线索的回忆」环节，就会变成反复朗读的假学习。本 Skill 固定「线索回忆—核对—补漏」三步。

## 四级目录定位 / Library Position

**四级编码** `13.2.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 02 经典背诵 / 01 经典研读 / 01 中医每日背诵 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 《伤寒论》《内经》条文的日常背诵
- 方歌与药性的日积月累
- 执业医师考试条文的长期覆盖

## 不适合 / Not For

- 替代对条文义理的理解
- 把背诵量当作学习进度指标

## 使用前请准备 / Inputs

- 今日背诵范围（条文 / 方歌）
- 可用时间
- 昨日未通过项

## 推荐工作流 / Recommended Workflow

1. 先做不给线索的主动回忆并记录
2. 对照原文核对，标出错处
3. 只补漏处，不重背已通项
4. 把未通过项滚入明日队列
5. 更新连续通过天数

## 产出 / Outputs

- 今日背诵记录（通过 / 未通过）
- 错处清单
- 明日滚动队列

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-10（见 tcmP `domain-specs/`）
- **上游来源**：`hermes-edu-skills/primary-chinese-recitation-daily@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
