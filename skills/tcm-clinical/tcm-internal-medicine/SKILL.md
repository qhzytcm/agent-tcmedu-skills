---
name: "tcm-internal-medicine"
description: "按「病—证—法—方—药」五级落点，把内科各病种的辨证分型训练成可判分的诊疗路径。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["内科","辨证分型","治法方药"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    stages: ["本科","规培"]
    subjects: ["中医内科学"]
    abilities: ["辨证分型","治法方药"]
    scenarios: ["病案讨论","规培演练"]
    roles: ["healer"]
    textbook_codes: ["CM-13","CM-14"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["主诉与现病史","四诊信息（舌脉）","既往治疗与疗效","病种（可留空由系统推断）"]
---

# 中医内科学 Skill

内科病种的辨证分型表背下来容易，但遇到真实主诉就选不准证型。本 Skill 用五级落点强制每一步都有依据，暴露「跳步选方」的错误。

## 最适合 / Best For

- 本科U6–U7 按 CM-13/CM-14 教材学习
- 规培病案的辨证论治演练
- 执业医师病例题训练

## 不适合 / Not For

- 替代临床带教与真实接诊
- 对急危重症给出门诊式处理建议

## 使用前请准备 / Inputs

- 主诉与现病史
- 四诊信息（舌脉）
- 既往治疗与疗效
- 病种（可留空由系统推断）

## 推荐工作流 / Recommended Workflow

1. 定位病种与诊断依据
2. 列出该病常见证型并逐项比对
3. 确定证型并给出鉴别理由（为何不是相邻证型）
4. 沿证型给出治法—主方—加减
5. 标注疗效判定节点与复诊时机

## 产出 / Outputs

- 病—证—法—方—药五级路径表
- 相邻证型鉴别
- 疗效判定与复诊节点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-13、CM-14（见 tcmP `domain-specs/`）
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
