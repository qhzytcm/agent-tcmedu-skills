---
name: "tcm-meridians-acupoints"
description: "按「循行—定位—主治—配伍—禁忌」学习经络腧穴，并用体表标志法做定位自测。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["经络","腧穴","骨度分寸","危险穴位"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.1.1.1"
    stages: ["本科"]
    subjects: ["经络腧穴学"]
    abilities: ["腧穴定位","配穴"]
    scenarios: ["同步巩固","考前背诵"]
    roles: ["healer"]
    textbook_codes: ["AT-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["经脉名或腧穴名","训练目标（循行 / 定位 / 主治 / 配穴）","是否包含危险穴位提示"]
---

# 经络腧穴学 Skill

腧穴定位差之毫厘谬以千里，纯文字描述难以自检。本 Skill 强制用体表标志 + 骨度分寸描述定位，并生成可自测的定位题。

## 四级目录定位 / Library Position

**四级编码** `4.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 01 经络腧穴学 / 01 实操与技法 / 01 经络腧穴学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 针灸推拿专业本科按 AT-01 教材学习
- 执业医师针灸部分的定位复习
- 临床配穴前的穴位复核

## 不适合 / Not For

- 替代人体解剖实训标本操作
- 对危险穴位给出无防护的自行操作指导

## 使用前请准备 / Inputs

- 经脉名或腧穴名
- 训练目标（循行 / 定位 / 主治 / 配穴）
- 是否包含危险穴位提示

## 推荐工作流 / Recommended Workflow

1. 给出经脉循行路线与交接
2. 按体表标志 + 骨度分寸描述腧穴定位
3. 列出主治与常用配伍
4. 标注针刺深度与危险穴位提示
5. 生成定位自测题并判分

## 产出 / Outputs

- 经脉循行卡
- 腧穴定位与主治表
- 配穴方案与安全提示
- 定位自测判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：AT-01（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
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
