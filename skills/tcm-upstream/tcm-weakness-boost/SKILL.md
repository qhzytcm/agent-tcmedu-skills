---
name: "tcm-weakness-boost"
description: "定位薄弱环节的最小知识块，做定点突破而不是整章重学。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["薄弱项","最小知识块","前置链"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.1.1.2"
    stages: ["本科","硕士","规培"]
    subjects: ["学习能力"]
    abilities: ["查漏补缺","定点突破"]
    scenarios: ["专项训练","单元复习"]
    upstream_source: "hermes-edu-skills/agent-weakness-boost@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["薄弱表现（科目 / 题型 / 场景）","最近的错题或得分数据","可投入的时间"]
---

# 中医薄弱项提升 Skill

「哪科差」是粗粒度判断，真正要补的是某个最小知识块。本 Skill 强制把薄弱项收敛到可一次补完的粒度。

## 四级目录定位 / Library Position

**四级编码** `13.1.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 01 学习能力 / 01 综合能力 / 02 中医薄弱项提升 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 模考或考试后的定点补强
- 长期卡在某一类题型的突破
- 跨学科知识链断裂的修补

## 不适合 / Not For

- 替代完整的课程学习
- 在无错题或考核数据时的凭空定位

## 使用前请准备 / Inputs

- 薄弱表现（科目 / 题型 / 场景）
- 最近的错题或得分数据
- 可投入的时间

## 推荐工作流 / Recommended Workflow

1. 把薄弱表现归因到具体知识块
2. 沿前置链向上检查是否基础缺失
3. 确定最小可补单元
4. 设计 30 分钟内的定点突破任务
5. 用同型题验证是否补上

## 产出 / Outputs

- 薄弱点的最小知识块定位
- 前置链缺口
- 定点任务与验证题

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/agent-weakness-boost@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
