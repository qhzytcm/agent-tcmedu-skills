---
name: "tcm-tuina"
description: "按「力度—频率—着力部位—操作要领」解析推拿手法，并给出可自练的分解动作。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["推拿","手法","量化特征","禁忌症"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.3.1.1"
    stages: ["本科","继续教育"]
    subjects: ["推拿手法学"]
    abilities: ["手法操作","量化参数"]
    scenarios: ["实操训练","家庭保健"]
    roles: ["healer","patient"]
    textbook_codes: ["TU-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["手法名（㨰 / 揉 / 推 / 拿 / 按 / 摩等）","作用部位与治疗目的","训练阶段"]
---

# 推拿手法学 Skill

推拿手法的评价依赖触感，自学难以判断是否达标。本 Skill 把手法的量化特征（力度、频率、幅度）显式化，并给出可自练的分级动作。

## 四级目录定位 / Library Position

**四级编码** `4.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 03 推拿手法学 / 01 实操与技法 / 01 推拿手法学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 推拿专业本科按 TU-01 教材学习
- 家庭保健推拿的规范入门
- 临床推拿前的手法选择

## 不适合 / Not For

- 替代专业手法带教的触感纠正
- 对骨折、肿瘤等禁忌症给出推拿建议

## 使用前请准备 / Inputs

- 手法名（㨰 / 揉 / 推 / 拿 / 按 / 摩等）
- 作用部位与治疗目的
- 训练阶段

## 推荐工作流 / Recommended Workflow

1. 说明手法的动作结构与发力方式
2. 给出力度、频率、幅度等量化特征
3. 列出操作要领与常见错误
4. 设计分级自练方案（镜子 / 米袋练习）
5. 标注禁忌症与终止指征

## 产出 / Outputs

- 手法量化卡
- 常见错误对照
- 分级自练方案与禁忌

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：TU-01（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
- **六者角色**：healer、patient
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
