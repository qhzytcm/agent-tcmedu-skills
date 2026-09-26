---
name: "tcm-otolaryngology"
description: "耳鼻喉局部辨证关联肺脾胃肾，兼顾慢性病管理与急性症状的转诊判断。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["耳鼻喉","鼻渊","喉痹","转诊"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.6.1.1"
    stages: ["本科","规培"]
    subjects: ["中医耳鼻喉科学"]
    abilities: ["咽喉辨证","危险信号识别"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["ENT-03"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["局部症状（鼻塞 / 咽痛 / 耳鸣 / 声嘶）与病程","全身伴随症状与舌脉","既往治疗与过敏史"]
---

# 中医耳鼻喉科学 Skill

耳鼻喉症状常见但病因跨度大，从外感小恙到鼻咽肿瘤都可能。本 Skill 强制鉴别层次与转诊判断。

## 四级目录定位 / Library Position

**四级编码** `5.6.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 06 中医耳鼻喉科学 / 01 辨证推理 / 01 中医耳鼻喉科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 ENT-03 教材学习
- 鼻渊 / 喉痹 / 耳鸣的中医辨证
- 慢性咽炎与鼻炎的长期调治

## 不适合 / Not For

- 替代耳鼻喉内镜与听力检查
- 对单侧鼻塞 / 回吸血痰等信号给出观察建议

## 使用前请准备 / Inputs

- 局部症状（鼻塞 / 咽痛 / 耳鸣 / 声嘶）与病程
- 全身伴随症状与舌脉
- 既往治疗与过敏史

## 推荐工作流 / Recommended Workflow

1. 归纳局部主要症状
2. 关联脏腑（肺 / 脾 / 胃 / 肾 / 肝胆）
3. 给出证型与内治方药
4. 给出局部外治（滴鼻 / 含漱 / 吹喉）
5. 标注需转诊的危险信号

## 产出 / Outputs

- 局部—脏腑关联表
- 内外治方案
- 危险信号与转诊

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：ENT-03（见 tcmP `domain-specs/`）
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
