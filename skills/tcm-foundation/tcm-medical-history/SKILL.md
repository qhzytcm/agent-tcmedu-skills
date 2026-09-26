---
name: "tcm-medical-history"
description: "把医史从年代记忆变成「学术演变脉络」：流派、人物、著作、事件互为因果。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["医学史","学术流派","金元四大家"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    library_code: "1.7.1.1"
    stages: ["本科"]
    subjects: ["中国医学史"]
    abilities: ["学术脉络","史料关联"]
    scenarios: ["同步巩固","通识讲座"]
    textbook_codes: ["CM-04"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["朝代或专题（如「金元四大家」「温病学派兴起」）","学习目标（脉络 / 人物 / 著作）","需要联动的学科（可选）"]
---

# 中国医学史 Skill

医史课容易退化成背诵年代与人名。本 Skill 用「时代—社会背景—医学命题—代表人物著作—对后世影响」的因果链组织内容。

## 四级目录定位 / Library Position

**四级编码** `1.7.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 01 中医基础与经典 / 07 中国医学史 / 01 经典研读 / 01 中国医学史 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U1 按 CM-04 教材学习
- 各家学说课程的史学前置
- 中医文化通识讲座准备

## 不适合 / Not For

- 替代史学研究的史料考据
- 在史料存疑处给出确定结论

## 使用前请准备 / Inputs

- 朝代或专题（如「金元四大家」「温病学派兴起」）
- 学习目标（脉络 / 人物 / 著作）
- 需要联动的学科（可选）

## 推荐工作流 / Recommended Workflow

1. 定位时代与医学命题
2. 梳理社会背景对医学的推动
3. 列出代表人物与代表著作
4. 串出思想演变因果链
5. 标注对后世学科的直接影响

## 产出 / Outputs

- 学术演变脉络图
- 人物—著作—思想对照表
- 对后世学科的影响链

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-04（见 tcmP `domain-specs/`）
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
