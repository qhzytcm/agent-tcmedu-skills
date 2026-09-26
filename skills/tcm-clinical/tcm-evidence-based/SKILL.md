---
name: "tcm-evidence-based"
description: "把中医临床问题转成可检索的 PICO，评估证据等级并给出推荐强度。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["循证","PICO","证据分级","推荐强度"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.10.1.1"
    stages: ["硕士","博士"]
    subjects: ["中医循证医学"]
    abilities: ["循证检索","证据分级"]
    scenarios: ["科研训练","继续教育"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["临床问题","目标人群与干预措施","可获得的证据类型","关注的结局指标"]
---

# 中医循证医学 Skill

中医临床研究证据形态特殊（个案、名医经验、RCT 混杂），直接套用西医证据分级会失真。本 Skill 采用适配中医的证据评估框架。

## 四级目录定位 / Library Position

**四级编码** `2.10.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 10 中医循证医学 / 01 检索与数据 / 01 中医循证医学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 硕士M1 按 CM-23 教材学习
- 临床问题的循证检索与评价
- 中医临床研究设计与论文写作

## 不适合 / Not For

- 替代系统评价 / Meta 分析的规范流程
- 在证据不足时给出强推荐

## 使用前请准备 / Inputs

- 临床问题
- 目标人群与干预措施
- 可获得的证据类型
- 关注的结局指标

## 推荐工作流 / Recommended Workflow

1. 把问题转成 PICO 结构
2. 制定检索策略与数据库选择
3. 评估证据等级（含中医特色证据）
4. 给出推荐强度与理由
5. 标注证据缺口与待研究方向

## 产出 / Outputs

- PICO 结构
- 证据分级表
- 推荐强度与证据缺口

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **所属领域**：D01（中医临床各科）
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
