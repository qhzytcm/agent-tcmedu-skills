---
name: "tcm-acupuncture-technique"
description: "把毫针刺法、灸法、拔罐与电针的操作规范拆成可检查的步骤序列与安全边界。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["刺法","灸法","得气","晕针处置"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.2.1.1"
    stages: ["本科","规培"]
    subjects: ["刺法灸法学"]
    abilities: ["操作规范","安全边界"]
    scenarios: ["实操训练","实习复核"]
    roles: ["healer"]
    textbook_codes: ["AT-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["术式（毫针刺法 / 灸法 / 拔罐 / 电针）","训练阶段（初学 / 实习）","是否存在禁忌情形"]
---

# 刺法灸法学 Skill

刺灸操作是手法性的，书面学习容易跳过关键步骤（如消毒、得气判断）。本 Skill 把操作拆成可勾选的步骤序列并强制安全边界。

## 四级目录定位 / Library Position

**四级编码** `4.2.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 02 刺法灸法学 / 01 实操与技法 / 01 刺法灸法学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 针灸推拿专业本科按 AT-02 教材学习
- 针灸科实习生操作前复核
- 不良反应处置复习

## 不适合 / Not For

- 替代真人实操带教
- 对无资质者给出侵入性操作指导

## 使用前请准备 / Inputs

- 术式（毫针刺法 / 灸法 / 拔罐 / 电针）
- 训练阶段（初学 / 实习）
- 是否存在禁忌情形

## 推荐工作流 / Recommended Workflow

1. 列出术前准备与消毒步骤清单
2. 逐步说明进针、得气、行针、留针、出针
3. 标注禁忌部位与禁忌情形
4. 给出晕针 / 滞针 / 血肿的识别与处置
5. 生成步骤排序题与安全判断题

## 产出 / Outputs

- 术式操作步骤清单
- 禁忌与不良反应处置表
- 步骤排序与安全判分

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：AT-02（见 tcmP `domain-specs/`）
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
