---
name: "tcm-emergency"
description: "按「先辨危重、再辨寒热虚实」的顺序处理急症，并强制给出转诊与西医协同判断。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["急诊","红旗征","转诊","中西医协同"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.5.1.1"
    stages: ["本科","规培"]
    subjects: ["中医急诊学"]
    abilities: ["危重筛查","应急辨证"]
    scenarios: ["病案讨论","规培演练"]
    roles: ["healer"]
    textbook_codes: ["CM-18"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["主症与起病急缓","生命体征（可留空）","既往史与用药","现场可用条件"]
---

# 中医急诊学 Skill

急诊场景最危险的错误是顺序颠倒——先细辨证型而延误抢救。本 Skill 强制「危重筛查」前置，且所有结论必须标注转诊阈值。

## 四级目录定位 / Library Position

**四级编码** `2.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 05 中医急诊学 / 01 辨证推理 / 01 中医急诊学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U8 按 CM-18 教材学习
- 急诊科规培的辨证思路训练
- 中西医协同处置复习

## 不适合 / Not For

- 替代急诊科的现场抢救决策
- 对危重患者给出居家观察建议

## 使用前请准备 / Inputs

- 主症与起病急缓
- 生命体征（可留空）
- 既往史与用药
- 现场可用条件

## 推荐工作流 / Recommended Workflow

1. 第一步：按红旗征筛查是否危及生命
2. 给出立即转诊 / 抢救阈值
3. 第二步：辨急症的寒热虚实与病位
4. 给出中医应急处理与代表方
5. 标注中西医协同要点与观察窗

## 产出 / Outputs

- 危重筛查结论与转诊阈值
- 应急辨证与方药
- 中西医协同要点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-18（见 tcmP `domain-specs/`）
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
