---
name: "tcm-jingui"
description: "按病脉证治体例拆解《金匮要略》，把杂病条文整理成「病—脉—证—治—方」五栏卡片。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["金匮","杂病","病脉证治","经方"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    library_code: "1.6.1.1"
    stages: ["本科","硕士"]
    subjects: ["金匮要略讲义"]
    abilities: ["杂病辨证","方证对应"]
    scenarios: ["经典研读","考前背诵"]
    textbook_codes: ["CM-11"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["篇目或病名（如「痉湿暍病」「胸痹」）","学习目标（记方 / 辨脉 / 类方比较）","当前学段"]
---

# 金匮要略讲义 Skill

金匮以「病脉证治」为体例，与伤寒的六经框架不同，学习者常把两套体例混用。本 Skill 固化五栏拆解，并标注与伤寒条文的体例差异。

## 四级目录定位 / Library Position

**四级编码** `1.6.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 01 中医基础与经典 / 06 金匮要略讲义 / 01 方药应用 / 01 金匮要略讲义 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U5 按 CM-11 教材学习
- 杂病辨证的条文溯源
- 经方杂病应用的方证核对

## 不适合 / Not For

- 替代《金匮要略》原书通读
- 跳过脉证直接给方

## 使用前请准备 / Inputs

- 篇目或病名（如「痉湿暍病」「胸痹」）
- 学习目标（记方 / 辨脉 / 类方比较）
- 当前学段

## 推荐工作流 / Recommended Workflow

1. 定位篇目与所属杂病范畴
2. 拆解为病 / 脉 / 证 / 治 / 方五栏
3. 与伤寒同类证做体例对照
4. 给出后世注家要点与临床引申
5. 生成病脉证治默写与判分

## 产出 / Outputs

- 条文五栏卡
- 伤寒—金匮体例对照表
- 默写与判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-11（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医基础与经典）
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
