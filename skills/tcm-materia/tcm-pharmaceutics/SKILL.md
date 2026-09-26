---
name: "tcm-pharmaceutics"
description: "按剂型（汤剂 / 丸散 / 颗粒 / 注射剂…）组织制备工艺、质量标准与生物利用度。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["药剂学","剂型","工艺","质量标准"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.8.1.1"
    stages: ["本科","继续教育"]
    subjects: ["中药药剂学"]
    abilities: ["剂型设计","制备工艺"]
    scenarios: ["实验设计","企业培训"]
    roles: ["pharmacist"]
    textbook_codes: ["MM-11"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["处方与目标剂型","生产或小试条件","质量标准要求"]
---

# 中药药剂学 Skill

同一处方不同剂型的工艺与质量标准差异很大，学习者容易只记剂型名称。本 Skill 以剂型为轴组织「工艺—标准—应用」三要素。

## 四级目录定位 / Library Position

**四级编码** `3.8.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 08 中药药剂学 / 01 实操与技法 / 01 中药药剂学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U5–U6 按 MM-11 教材学习
- 医院制剂室制备规范训练
- 剂型选择的临床考量

## 不适合 / Not For

- 替代《中国药典》制剂通则的法定要求
- 给出未经批准的院内制剂配制建议

## 使用前请准备 / Inputs

- 处方与目标剂型
- 生产或小试条件
- 质量标准要求

## 推荐工作流 / Recommended Workflow

1. 分析处方性质与剂型适配性
2. 给出制备工艺流程与关键步骤
3. 列出质量标准项目与限度
4. 说明影响生物利用度的因素
5. 给出贮藏与稳定性提示

## 产出 / Outputs

- 剂型适配性分析
- 工艺流程与关键控制点
- 质量标准与贮藏条件

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-11（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
- **六者角色**：pharmacist
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
