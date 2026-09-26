---
name: "tcm-phytochemistry"
description: "按成分类型（生物碱 / 黄酮 / 萜类…）梳理结构—性质—提取分离—活性链条。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["中药化学","提取分离","生物碱","黄酮"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.5.1.1"
    stages: ["本科","硕士"]
    subjects: ["中药化学"]
    abilities: ["成分分类","提取分离"]
    scenarios: ["实验设计","同步巩固"]
    textbook_codes: ["MM-05"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["药材或成分类型","目标（结构 / 性质 / 提取分离 / 活性）","实验条件限制"]
---

# 中药化学 Skill

中药化学的结构与理化性质记忆量大，且与药效的关系容易脱节。本 Skill 用「结构决定性质、性质决定提取、成分对应活性」串成一条链。

## 四级目录定位 / Library Position

**四级编码** `3.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 05 中药化学 / 01 实操与技法 / 01 中药化学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科U3–U4 按 MM-05 教材学习
- 提取分离工艺设计训练
- 中药药效物质基础研究入门

## 不适合 / Not For

- 替代实验课的实操训练
- 给出未经文献支持的活性结论

## 使用前请准备 / Inputs

- 药材或成分类型
- 目标（结构 / 性质 / 提取分离 / 活性）
- 实验条件限制

## 推荐工作流 / Recommended Workflow

1. 识别成分类型与结构特征
2. 推导理化性质
3. 据此选择提取与分离方法
4. 说明该成分对应的药理活性
5. 设计提取流程并标注关键控制点

## 产出 / Outputs

- 结构—性质—提取链条
- 分离方法选择依据
- 提取流程与关键控制点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：MM-05（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
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
