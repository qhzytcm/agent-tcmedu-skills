---
name: "tcm-ophthalmology"
description: "以「五轮学说」为纲，把眼部局部体征对应到脏腑，并与视力警戒阈值绑定。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["眼科","五轮学说","转诊","内障外障","青光眼","眼压","视力下降","目痛","内障"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.2.1.2"
    stages: ["本科","规培"]
    subjects: ["中医眼科学"]
    abilities: ["五轮辨证","急症筛查"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["ENT-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["眼部症状（视力 / 疼痛 / 充血 / 分泌物）","病程与诱因","全身症状与舌脉","既往眼病史"]
---

# 中医眼科学 Skill

眼科急症（如急性闭角型青光眼）会致盲，局部辨证若不成体系易延误。本 Skill 强制五轮定位 + 视力警戒阈值前置。

## 四级目录定位 / Library Position

**四级编码** `5.2.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 02 中医眼科学 / 01 辨证推理 / 02 中医眼科学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 ENT-02 教材学习
- 内障 / 外障类眼病辨证训练
- 眼科门诊的转诊判断

## 不适合 / Not For

- 替代眼科裂隙灯与眼压检查
- 对急性视力下降给出居家观察建议

## 使用前请准备 / Inputs

- 眼部症状（视力 / 疼痛 / 充血 / 分泌物）
- 病程与诱因
- 全身症状与舌脉
- 既往眼病史

## 推荐工作流 / Recommended Workflow

1. 按五轮学说定位病位
2. 筛查视力警戒阈值与急症信号
3. 关联脏腑与证型
4. 给出内治与外治方案
5. 标注必须转诊眼科的情形

## 产出 / Outputs

- 五轮定位与证型
- 内外治方案
- 转诊阈值清单

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：ENT-02（见 tcmP `domain-specs/`）
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
