---
name: "tcm-learning-report"
description: "把学习行为与考核结果汇总成带证据的学情报告，供学生、教师、师承导师共用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["学情","掌握度","师承评估"]
    source: agent-tcmedu-skills
    category: "tcm-learning-core"
    domain: "-"
    library_code: "8.1.1.5"
    stages: ["本科","硕士","规培","继续教育"]
    subjects: ["学习能力"]
    abilities: ["学情分析","数据证据"]
    scenarios: ["学习报告","家长沟通","师承评估"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["统计周期","学习行为记录（时长 / 完成率）","考核成绩与错题分布","受众（学生 / 教师 / 师承导师）"]
---

# 中医学情报告 Skill

学情报告常停留在「态度端正、继续努力」。本 Skill 要求每条结论都带证据，并区分「已掌握 / 需巩固 / 未覆盖」。

## 四级目录定位 / Library Position

**四级编码** `8.1.1.5`（篇·章·节·目，横向读即完整编码）

**定位路径** 08 学习核心 / 01 学习能力 / 01 教学与学习 / 05 中医学情报告 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 阶段考核后的学情分析
- 师承导师了解学员进度
- 教师做班级整体诊断

## 不适合 / Not For

- 替代正式考试成绩认定
- 在无学习数据时生成结论

## 使用前请准备 / Inputs

- 统计周期
- 学习行为记录（时长 / 完成率）
- 考核成绩与错题分布
- 受众（学生 / 教师 / 师承导师）

## 推荐工作流 / Recommended Workflow

1. 汇总行为与成绩数据
2. 按学科主题算出掌握度分布
3. 区分已掌握 / 需巩固 / 未覆盖三档
4. 每条结论附数据证据
5. 给出下一周期的三条具体行动

## 产出 / Outputs

- 学情报告（分受众版本）
- 掌握度分布表
- 下一周期行动建议

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
