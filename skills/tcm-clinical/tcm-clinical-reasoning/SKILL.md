---
name: "tcm-clinical-reasoning"
description: "显式化中医临床决策过程：假设生成、鉴别、权重分配与动态修正。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["临床思维","假设鉴别","决策"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    library_code: "2.11.1.1"
    stages: ["硕士","规培"]
    subjects: ["中医临床思维"]
    abilities: ["临床推理","决策复盘"]
    scenarios: ["病案讨论","师带徒"]
    roles: ["healer"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["病案信息","决策节点（首诊 / 复诊 / 转方）","困惑点或分歧点"]
---

# 中医临床思维与决策 Skill

中医临床思维高度内隐，师徒之间只能靠「悟」。本 Skill 把决策过程拆成可训练、可复盘的显式步骤。

## 四级目录定位 / Library Position

**四级编码** `2.11.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 02 中医临床各科 / 11 中医临床思维 / 01 教学与学习 / 01 中医临床思维与决策 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 硕士M2 按 CM-24 教材学习
- 规培病例的思维过程复盘
- 带教时的思维训练设计

## 不适合 / Not For

- 替代真实接诊的经验积累
- 把决策路径当成固定算法

## 使用前请准备 / Inputs

- 病案信息
- 决策节点（首诊 / 复诊 / 转方）
- 困惑点或分歧点

## 推荐工作流 / Recommended Workflow

1. 列出初始假设集合并排序
2. 为每个假设指定支持与反对证据
3. 分配证据权重并解释理由
4. 给出决策与预期效应
5. 设计反馈点用于动态修正

## 产出 / Outputs

- 假设—证据矩阵
- 权重分配与理由
- 决策与修正反馈点

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

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
