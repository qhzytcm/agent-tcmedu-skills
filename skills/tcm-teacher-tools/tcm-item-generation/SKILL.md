---
name: "tcm-item-generation"
description: "按知识点与难度分布命题组卷，自动配答案、解析、评分标准与双向细目表。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["命题","组卷","双向细目表","评分标准"]
    source: agent-tcmedu-skills
    category: "tcm-teacher-tools"
    domain: "-"
    stages: ["继续教育"]
    subjects: ["教师发展","中医综合"]
    abilities: ["命题","组卷"]
    scenarios: ["命题","教研"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["考查范围（教材号 / 章节 / 病证清单）","题型与题量","难度分布（基础 / 提高 / 综合）","是否需要双向细目表"]
---

# 中医命题与组卷 Skill

中医命题既要覆盖知识点又要控制难度分布，手工组卷极易偏斜。本 Skill 用双向细目表约束组卷。

## 最适合 / Best For

- 课程测验与期中期末组卷
- 规培出科考核卷
- 执业医师模拟卷组卷

## 不适合 / Not For

- 替代命题审核与保密管理
- 生成超出大纲范围的题目

## 使用前请准备 / Inputs

- 考查范围（教材号 / 章节 / 病证清单）
- 题型与题量
- 难度分布（基础 / 提高 / 综合）
- 是否需要双向细目表

## 推荐工作流 / Recommended Workflow

1. 按考查范围列出知识点清单
2. 编制双向细目表（知识点 × 难度 × 题型）
3. 按分布生成题目
4. 为每题配答案、解析与评分标准
5. 自检覆盖率与难度分布是否达标

## 产出 / Outputs

- 试卷与答案
- 逐题解析与评分标准
- 双向细目表

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
