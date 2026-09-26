---
name: "tcm-pediatrics"
description: "按小儿生理特点调整问诊重心与用药剂量，把儿科病种转成家长可执行的照护任务。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["儿科","剂量","家长沟通","红旗症状"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.3.1.1"
    stages: ["本科","规培"]
    subjects: ["中医儿科学"]
    abilities: ["儿科问诊","剂量阶梯"]
    scenarios: ["病案讨论","家长沟通"]
    roles: ["healer","patient"]
    textbook_codes: ["CM-17"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["患儿年龄 / 体重","家长主诉与现病史","喂养与二便情况","舌象（可留空）"]
---

# 中医儿科学 Skill

儿科问诊依赖家长转述、用药剂量随年龄体重变化，通用内科思路直接套用会出错。本 Skill 内置儿科问诊模板与剂量阶梯。

## 四级目录定位 / Library Position

**四级编码** `2.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 03 中医儿科学 / 01 方药应用 / 01 中医儿科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U8 按 CM-17 教材学习
- 儿科门诊前的信息准备
- 家长照护要点讲解

## 不适合 / Not For

- 替代儿科急诊判断
- 对高热惊厥等急症给居家处理建议

## 使用前请准备 / Inputs

- 患儿年龄 / 体重
- 家长主诉与现病史
- 喂养与二便情况
- 舌象（可留空）

## 推荐工作流 / Recommended Workflow

1. 按儿科问诊模板补全信息
2. 归入儿科病种与证型
3. 按年龄体重给出剂量区间
4. 输出家长可执行的照护与观察要点
5. 标注需立即就医的红旗症状

## 产出 / Outputs

- 儿科结构化问诊记录
- 证型与剂量区间
- 照护要点与就医红旗

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-17（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医临床各科）
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
