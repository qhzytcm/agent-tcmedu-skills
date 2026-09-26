---
name: "tcm-analysis"
description: "按指标成分选择分析方法，设计含量测定与指纹图谱方案并做方法学验证。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["分析","HPLC","指纹图谱","方法学验证"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.9.1.1"
    stages: ["本科","硕士"]
    subjects: ["中药分析学"]
    abilities: ["含量测定","方法学验证"]
    scenarios: ["科研训练","企业培训"]
    textbook_codes: ["MM-12"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["待测药材或制剂","分析目的（含量 / 鉴别 / 指纹图谱）","可用仪器与对照品"]
---

# 中药分析学 Skill

中药成分复杂，选择哪个指标成分、用什么方法，是分析工作的核心难点。本 Skill 强制给出选择依据而非直接套方法。

## 四级目录定位 / Library Position

**四级编码** `3.9.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 09 中药分析学 / 01 检索与数据 / 01 中药分析学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U6 按 MM-12 教材学习
- 中药质量标准研究
- 含量测定方法的方法学验证

## 不适合 / Not For

- 替代法定药检机构的检验结论
- 在无对照品时给出定量结论

## 使用前请准备 / Inputs

- 待测药材或制剂
- 分析目的（含量 / 鉴别 / 指纹图谱）
- 可用仪器与对照品

## 推荐工作流 / Recommended Workflow

1. 确定指标成分并说明选择依据
2. 选择分析方法（HPLC / GC / LC-MS 等）
3. 设计色谱条件与样品前处理
4. 列出方法学验证项目（精密度 / 回收率 / 线性）
5. 给出结果判定与限度建议

## 产出 / Outputs

- 指标成分选择依据
- 分析方法与色谱条件
- 方法学验证方案与限度建议

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-12（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
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
