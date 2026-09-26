---
name: "tcm-experimental-acupuncture"
description: "把针灸效应转成可验证的实验命题：穴位特异性、量效关系与机制研究设计。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["实验针灸","穴位特异性","量效","假针刺"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.5.1.1"
    stages: ["本科","硕士"]
    subjects: ["实验针灸学"]
    abilities: ["实验设计","机制研究"]
    scenarios: ["科研训练","课程实验"]
    textbook_codes: ["AT-04"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["研究问题（穴位 / 参数 / 效应）","实验对象与模型","可测指标","条件限制"]
---

# 实验针灸学 Skill

针灸机制研究常陷入「设计粗糙、结论过强」。本 Skill 强制给出可证伪的假设与对照设计。

## 四级目录定位 / Library Position

**四级编码** `4.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 05 实验针灸学 / 01 实操与技法 / 01 实验针灸学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科 / 硕士按 AT-04 教材学习
- 针灸效应机制的研究设计
- 针刺量效关系的实验方案

## 不适合 / Not For

- 把动物实验结果直接外推到临床
- 在样本不足时给出机制结论

## 使用前请准备 / Inputs

- 研究问题（穴位 / 参数 / 效应）
- 实验对象与模型
- 可测指标
- 条件限制

## 推荐工作流 / Recommended Workflow

1. 把问题转成可证伪的假设
2. 设计对照组（假针刺 / 非穴位）
3. 确定针刺参数与量效梯度
4. 选择客观观测指标
5. 标注统计方法与结论边界

## 产出 / Outputs

- 可证伪假设
- 对照设计与量效梯度
- 指标与统计方案

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：AT-04（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
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
