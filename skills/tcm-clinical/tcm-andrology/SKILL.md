---
name: "tcm-andrology"
description: "以肾—肝—脾三脏为主线处理男科病证，兼顾情志因素与生活方式干预。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["男科","肾肝脾","情志","调护"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.7.1.1"
    stages: ["本科","规培"]
    subjects: ["中医男科学"]
    abilities: ["脏腑辨证","调护指导"]
    scenarios: ["病案讨论","患者沟通"]
    roles: ["healer"]
    textbook_codes: ["CM-20"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["主诉与病程","伴随情志与睡眠状况","生活方式（作息 / 饮食 / 劳逸）","舌脉"]
---

# 中医男科学 Skill

男科病证常受情志与生活方式强影响，单纯脏腑辨证会漏掉关键变量。本 Skill 把情志与生活方式纳入辨证变量。

## 四级目录定位 / Library Position

**四级编码** `2.7.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 07 中医男科学 / 01 辨证推理 / 01 中医男科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U9 按 CM-20 教材学习
- 男科病案讨论
- 患者沟通与调护指导

## 不适合 / Not For

- 替代泌尿外科检查
- 对生育相关问题给出确定性承诺

## 使用前请准备 / Inputs

- 主诉与病程
- 伴随情志与睡眠状况
- 生活方式（作息 / 饮食 / 劳逸）
- 舌脉

## 推荐工作流 / Recommended Workflow

1. 归入男科病种与证型
2. 沿肾—肝—脾三脏定位病机
3. 纳入情志与生活方式变量
4. 给出治法方药与调护建议
5. 标注需西医核查的指标

## 产出 / Outputs

- 病机定位表
- 治法方药与调护
- 西医核查建议

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-20（见 tcmP `domain-specs/`）
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
