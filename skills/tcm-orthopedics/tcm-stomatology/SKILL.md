---
name: "tcm-stomatology"
description: "口腔黏膜病与牙周病的中医辨证，重视全身病在口腔的表现与筛查。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["口腔","口疮","黏膜病","全身关联"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.7.1.1"
    stages: ["本科","规培"]
    subjects: ["中医口腔科学"]
    abilities: ["口腔辨证","全身筛查"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["ENT-04"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["口腔病损部位、形态、病程","全身症状与既往病史","舌脉","用药史（含诱发药物）"]
---

# 中医口腔科学 Skill

口腔表现常是全身疾病的第一信号，只按口腔局部处理会漏诊。本 Skill 强制全身筛查清单。

## 四级目录定位 / Library Position

**四级编码** `5.7.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 07 中医口腔科学 / 01 辨证推理 / 01 中医口腔科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 ENT-04 教材学习
- 复发性口疮 / 扁平苔藓等辨证
- 口腔黏膜病的全身关联筛查

## 不适合 / Not For

- 替代口腔科检查与活检
- 对久不愈合溃疡给出观察建议

## 使用前请准备 / Inputs

- 口腔病损部位、形态、病程
- 全身症状与既往病史
- 舌脉
- 用药史（含诱发药物）

## 推荐工作流 / Recommended Workflow

1. 描述并归入口腔病症范畴
2. 做全身关联筛查（消化 / 免疫 / 内分泌 / 营养）
3. 给出中医证型与治法
4. 给出局部用药与口腔护理
5. 标注需活检或转诊的情形

## 产出 / Outputs

- 口腔病症归类
- 全身关联筛查表
- 内外治方案与转诊

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：ENT-04（见 tcmP `domain-specs/`）
- **所属领域**：D05,D06（骨伤与五官口腔）
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
