---
name: "tcm-oncology"
description: "按治疗阶段（术前 / 化疗中 / 康复期）给出扶正祛邪的差异化中医方案。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["肿瘤","扶正祛邪","化疗配合","生活质量"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.9.1.1"
    stages: ["硕士","继续教育"]
    subjects: ["中医肿瘤学"]
    abilities: ["分阶段论治","扶正祛邪"]
    scenarios: ["病案讨论","继续教育"]
    roles: ["healer"]
    textbook_codes: ["CM-22"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["肿瘤类型与分期","当前西医治疗阶段与方案","主要不适症状","体质与舌脉"]
---

# 中医肿瘤学 Skill

肿瘤中医治疗的用方强依赖西医治疗阶段，不分阶段谈「抗癌」是常见错误。本 Skill 以阶段为第一变量。

## 四级目录定位 / Library Position

**四级编码** `2.9.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 09 中医肿瘤学 / 01 综合能力 / 01 中医肿瘤学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 硕士M1 按 CM-22 教材学习
- 肿瘤科中西医结合会诊准备
- 不良反应（乏力 / 纳差 / 骨髓抑制）的中医处理

## 不适合 / Not For

- 宣称中医可替代手术 / 放化疗
- 对患者给出疗效承诺

## 使用前请准备 / Inputs

- 肿瘤类型与分期
- 当前西医治疗阶段与方案
- 主要不适症状
- 体质与舌脉

## 推荐工作流 / Recommended Workflow

1. 定位当前西医治疗阶段
2. 判定该阶段扶正与祛邪的配比
3. 给出对症处理方案（乏力 / 纳差 / 骨髓抑制等）
4. 标注与西药的相互作用风险
5. 给出生活质量评估节点

## 产出 / Outputs

- 阶段—配比对照
- 对症处理方案
- 相互作用风险与评估节点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-22（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医临床各科）
- **六者角色**：healer
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
