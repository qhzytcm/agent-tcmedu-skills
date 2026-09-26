---
name: "tcm-homework-generation"
description: "按学时与教学目标生成分层作业，配答案、解析与批改要点。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["作业","分层","批改要点"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.5.1.1"
    stages: ["继续教育"]
    subjects: ["教师发展"]
    abilities: ["作业设计","分层教学"]
    scenarios: ["作业布置","教研"]
    upstream_source: "hermes-edu-skills/teacher-geography-homework-generation@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["课程与章节","学时与教学目标","学员层次分布","作业量约束"]
---

# 中医疗效作业生成 Skill

作业若只按题量布置，就会「尖子吃不饱、后进跟不上」。本 Skill 按教学目标分层布置并给教师批改要点。

## 四级目录定位 / Library Position

**四级编码** `13.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 05 教师发展 / 01 教学与学习 / 01 中医疗效作业生成 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 课程作业的分层布置
- 师承带教的课后练习设计
- 继续教育培训的结课作业

## 不适合 / Not For

- 替代教师对作业难度与量的最终把关
- 生成超纲或因材施教的个性化判定

## 使用前请准备 / Inputs

- 课程与章节
- 学时与教学目标
- 学员层次分布
- 作业量约束

## 推荐工作流 / Recommended Workflow

1. 把教学目标转成可检验的题目目标
2. 按基础 / 提高 / 综合三层配比出题
3. 为每题附答案、解析与评分标准
4. 标注批改时的关注点与常见错误
5. 输出预计完成时间

## 产出 / Outputs

- 分层作业
- 答案与评分标准
- 批改要点与常见错误

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **上游来源**：`hermes-edu-skills/teacher-geography-homework-generation@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
