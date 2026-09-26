---
name: "tcm-gynecology"
description: "以「经带胎产」四期为轴，把妇科病种的周期疗法与调周法落到具体方药与时机。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["妇科","月经病","周期疗法","妊娠禁忌"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    stages: ["本科","规培"]
    subjects: ["中医妇科学"]
    abilities: ["周期疗法","调周法"]
    scenarios: ["病案讨论","同步巩固"]
    roles: ["healer"]
    textbook_codes: ["CM-16"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["主诉（经 / 带 / 胎 / 产范畴）","月经史（周期 / 经量 / 色泽 / 伴随症状）","当前所处周期阶段","舌脉"]
---

# 中医妇科学 Skill

妇科用药强调「因时制宜」，同一病种在不同周期用方不同。本 Skill 把时间轴显式化，避免不分周期一律用同一方。

## 最适合 / Best For

- 本科U7 按 CM-16 教材学习
- 月经病周期疗法的专项训练
- 妇科病案讨论

## 不适合 / Not For

- 替代妇科专科检查与影像
- 妊娠期用药的自主建议（须强调就医）

## 使用前请准备 / Inputs

- 主诉（经 / 带 / 胎 / 产范畴）
- 月经史（周期 / 经量 / 色泽 / 伴随症状）
- 当前所处周期阶段
- 舌脉

## 推荐工作流 / Recommended Workflow

1. 归入经带胎产四期范畴
2. 明确病种与主要证型
3. 沿周期阶段给出分阶段用方
4. 标注妊娠禁忌与用药安全提示
5. 给出调护与复诊节点

## 产出 / Outputs

- 病种—证型—周期用方表
- 妊娠禁忌提示
- 调护与复诊节点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-16（见 tcmP `domain-specs/`）
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
