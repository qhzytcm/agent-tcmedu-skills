---
name: "tcm-postgraduate-exam"
description: "面向考研中医综合（中基 / 中诊 / 中药 / 方剂 / 内科 / 针灸），做长周期分段备考。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["考研","中医综合","分段备考"]
    source: agent-tcmedu-skills
    category: "tcm-exam-prep"
    domain: "-"
    library_code: "9.1.2.1"
    stages: ["本科"]
    subjects: ["中医综合"]
    abilities: ["长周期规划","全科模考"]
    scenarios: ["考前规划","寒暑假提升"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["目标院校与专业方向","考试日期","六门课当前水平自评","每日可用时间（含公共课分配）"]
---

# 考研中医综合 Skill

考研中医综合六门课互相牵连，且专业课与公共课抢时间。本 Skill 用前置链分段排期，避免「后期发现基础没打牢」。

## 四级目录定位 / Library Position

**四级编码** `9.1.2.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 09 考试备考 / 01 中医综合 / 02 教学与学习 / 01 考研中医综合 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 考研中医综合（学硕 / 专硕）全程备考
- 在校生的两年长周期规划
- 二战考生的薄弱环节补偿

## 不适合 / Not For

- 替代目标院校的招生简章与命题范围
- 对录取结果做任何承诺

## 使用前请准备 / Inputs

- 目标院校与专业方向
- 考试日期
- 六门课当前水平自评
- 每日可用时间（含公共课分配）

## 推荐工作流 / Recommended Workflow

1. 按前置链排出六门课的先后次序
2. 划分基础 / 强化 / 冲刺三段并配比时间
3. 按段生成周任务与验收标准
4. 每段结束做一次全科模考
5. 根据模考结果动态调整下一段优先级

## 产出 / Outputs

- 六门课分段排期表
- 每周任务与验收标准
- 模考结果与动态调整建议

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
