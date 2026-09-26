---
name: "tcm-dermatology"
description: "皮损形态 → 局部辨证 → 脏腑气血归属，三步把皮肤病转成可判分的辨证路径。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["皮肤","皮损辨证","外治"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.6.1.1"
    stages: ["本科","规培"]
    subjects: ["中医皮肤科学"]
    abilities: ["局部辨证","皮损形态"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["CM-19"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["皮损部位、形态、色泽、病程","瘙痒 / 疼痛等自觉症状","全身症状与舌脉","既往治疗"]
---

# 中医皮肤科学 Skill

皮肤病「看得见」，反而容易只看皮损不看整体。本 Skill 强制把皮损形态与内在辨证双向对应，并要求配图位置描述。

## 四级目录定位 / Library Position

**四级编码** `2.6.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 06 中医皮肤科学 / 01 辨证推理 / 01 中医皮肤科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U8 按 CM-19 教材学习
- 常见皮肤病（湿疹 / 银屑病 / 痤疮）辨证训练
- 中西医结合皮肤科门诊准备

## 不适合 / Not For

- 对照片做皮损诊断结论
- 替代皮肤科器械与病理检查

## 使用前请准备 / Inputs

- 皮损部位、形态、色泽、病程
- 瘙痒 / 疼痛等自觉症状
- 全身症状与舌脉
- 既往治疗

## 推荐工作流 / Recommended Workflow

1. 按皮损形态做局部辨证（风 / 湿 / 热 / 瘀 / 虚）
2. 关联脏腑气血归属
3. 给出内治治法与代表方
4. 给出外治或调护方案
5. 标注需排查的西医疾病与转诊信号

## 产出 / Outputs

- 局部辨证表
- 脏腑气血归属
- 内外合治方案与转诊信号

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-19（见 tcmP `domain-specs/`）
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
