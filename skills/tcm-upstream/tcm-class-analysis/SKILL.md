---
name: "tcm-class-analysis"
description: "从成绩与作业数据算出班级的掌握度分布，定位集体性缺口与个别短板。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["学情","掌握度","班级分析"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.5.1.3"
    stages: ["继续教育"]
    subjects: ["教师发展"]
    abilities: ["学情分析","数据诊断"]
    scenarios: ["教研","学习报告"]
    upstream_source: "hermes-edu-skills/teacher-class-analysis-lite@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["测验或作业的逐题得分数据","班级 / 学员规模","关注的学科模块"]
---

# 中医班级学情分析 Skill

班级学情常停留在平均分。本 Skill 用掌握度分布区分「集体缺口」与「个别短板」，指导分头补救。

## 四级目录定位 / Library Position

**四级编码** `13.5.1.3`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 05 教师发展 / 01 教学与学习 / 03 中医班级学情分析 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 单元测验后的班级诊断
- 规培基地对学员群体的评估
- 师承导师掌握多个学员的进度

## 不适合 / Not For

- 替代个别化的深度学情访谈
- 在样本过少时给出分布结论

## 使用前请准备 / Inputs

- 测验或作业的逐题得分数据
- 班级 / 学员规模
- 关注的学科模块

## 推荐工作流 / Recommended Workflow

1. 按知识点统计正确率
2. 区分集体缺口（通过率 < 60%）与个别短板
3. 对集体缺口给出统一的再教学方案
4. 对个别短板给出名单与定点任务
5. 输出下一阶段的教学优先级

## 产出 / Outputs

- 知识点掌握度分布
- 集体缺口与个别短板清单
- 再教学方案与优先级

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/teacher-class-analysis-lite@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
