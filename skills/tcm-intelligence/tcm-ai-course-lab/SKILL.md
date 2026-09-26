---
name: "tcm-ai-course-lab"
description: "D07 中医智能学院的六阶实验线：TF-IDF 检索→倒排索引 RRF→RAG 对话→结构化输出→Agent SOUL→医院编排。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["AI课程","TF-IDF","RAG","Agent编排","D07"]
    source: agent-tcmedu-skills
    category: "tcm-intelligence"
    domain: "D07"
    library_code: "6.1.3.1"
    stages: ["本科","硕士","继续教育"]
    subjects: ["中医智能","软件工程"]
    abilities: ["工程实践","检索与 RAG"]
    scenarios: ["课程实验","自学路径"]
    quality_tier: "curated"
    standalone_support: "needs_user_input"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["当前所处的阶（01–06）","编程基础水平","实验环境（本地 Python / 平台）"]
---

# 中医 AI 课程实验 Skill

中医智能方向缺一条「从零到平台」的可跑实验线，学习者常在概念与工程之间断层。本 Skill 把 ai-curriculum 六阶实验串成可逐阶验收的课程。

## 四级目录定位 / Library Position

**四级编码** `6.1.3.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 06 中医智能 / 01 中医智能 / 03 教学与学习 / 01 中医 AI 课程实验 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医智能学院本科至研究生的实验课
- 跨专业转入 AI 工程的补课
- 平台二次开发者的上手路径

## 不适合 / Not For

- 替代机器学习与编程基础课
- 跳过前置阶直接做医院编排

## 使用前请准备 / Inputs

- 当前所处的阶（01–06）
- 编程基础水平
- 实验环境（本地 Python / 平台）

## 推荐工作流 / Recommended Workflow

1. 确认前置阶是否已通过验收
2. 给出本阶的目标、数据集与验收标准
3. 提供可运行代码骨架与测试
4. 跑通并核对输出
5. 记录到课程进度并进入下一阶

## 产出 / Outputs

- 单阶实验代码与测试
- 验收结果
- 课程进度记录

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **所属领域**：D07（中医智能）
- **离线可用性**：部分（需用户提供输入）

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
