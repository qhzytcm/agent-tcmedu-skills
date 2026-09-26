---
name: "tcm-learning-habit"
description: "把「每天学一点」变成有触发条件、有打卡判据、有连续记录的固定习惯。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["习惯","打卡","日课"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.1.3"
    stages: ["本科","规培","继续教育"]
    subjects: ["学习能力"]
    abilities: ["习惯培养","持续学习"]
    scenarios: ["每日打卡"]
    upstream_source: "hermes-edu-skills/agent-learning-habit@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["可固定的时段与触发条件","每天可投入的最小时间","希望固化的学习内容"]
---

# 中医学习习惯 Skill

中医学习周期以年计，靠意志力维持必然掉线。本 Skill 用触发条件 + 最小任务 + 连续记录把习惯固定下来。

## 四级目录定位 / Library Position

**四级编码** `13.1.1.3`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 01 综合能力 / 03 中医学习习惯 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 长期自主学习者建立日课
- 师承人员的日常积累打卡
- 规培期间的碎片时间利用

## 不适合 / Not For

- 替代有明确截止日期的冲刺计划
- 把打卡次数当成学习质量的证明

## 使用前请准备 / Inputs

- 可固定的时段与触发条件
- 每天可投入的最小时间
- 希望固化的学习内容

## 推荐工作流 / Recommended Workflow

1. 选定触发条件（时间 / 场景 / 前置动作）
2. 把任务压到「再累也能完成」的最小量
3. 定义可勾选的完成判据
4. 记录连续天数与中断原因
5. 每两周按完成率调整任务量

## 产出 / Outputs

- 习惯契约（触发条件 / 最小任务 / 判据）
- 连续记录表
- 两周调整建议

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-learning-habit@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
