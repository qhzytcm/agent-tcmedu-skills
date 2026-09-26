---
name: "tcm-study-plan"
description: "把模糊目标拆成今天、本周与下一轮可执行的中医学习安排。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["学习计划","前置链","核心链"]
    source: agent-tcmedu-skills
    category: "tcm-learning-core"
    domain: "-"
    library_code: "8.1.1.1"
    stages: ["本科","硕士","规培","继续教育"]
    subjects: ["学习能力"]
    abilities: ["学习计划","目标管理"]
    scenarios: ["今日学习","考前规划","师承安排"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["学习目标（同步 / 备考 / 师承）","当前学段与基础","每天可用时间","截止日期与薄弱点"]
---

# 中医学习计划 Skill

中医学习周期长、门类多，目标一模糊就会陷入「今天看点啥都行」。本 Skill 用前置链与轮次编排给出确定性的每日任务。

## 四级目录定位 / Library Position

**四级编码** `8.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 08 学习核心 / 01 学习能力 / 01 教学与学习 / 01 中医学习计划 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 在校生的课程同步规划
- 考研 / 执业医师的长周期备考规划
- 师承人员的自主学习安排

## 不适合 / Not For

- 代替学校正式课程表
- 在无目标、无时间、无水平信息时的空泛规划

## 使用前请准备 / Inputs

- 学习目标（同步 / 备考 / 师承）
- 当前学段与基础
- 每天可用时间
- 截止日期与薄弱点

## 推荐工作流 / Recommended Workflow

1. 澄清目标与时间约束
2. 按前置依赖排出学习顺序（中基→诊断→中药→方剂→内科）
3. 拆成本周与今日任务
4. 为每天任务设定可验收的产出
5. 预留复习与机动时间

## 产出 / Outputs

- 学习路径图（含前置链）
- 周任务表与今日任务
- 每日验收标准

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

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
