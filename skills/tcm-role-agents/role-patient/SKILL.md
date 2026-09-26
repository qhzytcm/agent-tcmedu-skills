---
name: "role-patient"
description: "面向患者的症状自查、导诊建议与用药说明，明确边界、突出就医提示。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["患者","自查","导诊","就医提示"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    library_code: "10.2.1.1"
    stages: ["继续教育"]
    subjects: ["健康科普"]
    abilities: ["症状自查","导诊"]
    scenarios: ["就诊前准备","康复调护"]
    roles: ["patient"]
    platform_apis: ["/patients/symptom-check","/patients/triage","/patients/medication"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["主诉与症状（部位 / 性质 / 时长）","年龄与基础疾病","正在使用的药物"]
---

# 患者 Agent Skill

患者端最大的风险是把辅助信息误当诊断。本 Skill 在所有输出中强制携带边界声明与就医提示，且不输出处方剂量。

## 四级目录定位 / Library Position

**四级编码** `10.2.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 10 六者角色 / 02 健康科普 / 01 综合能力 / 01 患者 Agent Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 就诊前的症状梳理与导诊
- 用药说明的白话解释
- 康复期调护指导

## 不适合 / Not For

- 给出诊断结论或处方
- 替代急诊判断

## 使用前请准备 / Inputs

- 主诉与症状（部位 / 性质 / 时长）
- 年龄与基础疾病
- 正在使用的药物

## 推荐工作流 / Recommended Workflow

1. 调用 /patients/symptom-check 做症状梳理
2. 调用 /patients/triage 给导诊建议
3. 调用 /patients/medication 白话解释用药
4. 标注红旗症状与就医紧急度
5. 输出边界声明（不构成诊断）

## 产出 / Outputs

- 症状梳理表
- 导诊建议与就医紧急度
- 用药白话说明与边界声明

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/patients/symptom-check` | 患者症状自查 |
| `/patients/triage` | 患者分诊导诊 |
| `/patients/medication` | 患者用药说明 |

- **所属领域**：平台（六者角色）
- **六者角色**：patient
- **离线可用性**：否（必须平台可达）

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
