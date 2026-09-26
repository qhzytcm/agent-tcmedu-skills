---
name: "tcm-ent-stomatology"
description: "按「局部辨证 + 脏腑经络关联」处理眼、耳鼻喉、口腔疾病，避免只见局部不见整体。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["五官","口腔","局部辨证","内外合治"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    stages: ["本科","规培"]
    subjects: ["中医眼科学","中医耳鼻喉科学","中医口腔科学"]
    abilities: ["局部辨证","内外合治"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["ENT-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["局部症状描述（部位 / 性质 / 病程）","全身伴随症状与舌脉","既往病史"]
---

# 中医五官口腔科学 Skill

五官科疾病的局部症状突出，容易脱离整体辨证而只做局部处理。本 Skill 强制局部与脏腑经络双向对照。

## 最适合 / Best For

- 五官口腔专业本科按 ENT-01 教材学习
- 口疮、耳鸣、鼻渊等常见病的辨证训练
- 局部用药与内服方的配合

## 不适合 / Not For

- 替代专科器械检查
- 对视功能 / 听力急性下降等急症给出居家处置

## 使用前请准备 / Inputs

- 局部症状描述（部位 / 性质 / 病程）
- 全身伴随症状与舌脉
- 既往病史

## 推荐工作流 / Recommended Workflow

1. 按局部辨证要点归纳主症
2. 关联相应脏腑经络（肝胆 / 脾胃 / 肾 / 肺）
3. 给出证型与内服治法方药
4. 给出局部外治或含漱、滴耳等方案
5. 标注需转诊的急症信号

## 产出 / Outputs

- 局部辨证表
- 脏腑经络关联
- 内外合治方案与转诊信号

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：ENT-01（见 tcmP `domain-specs/`）
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
