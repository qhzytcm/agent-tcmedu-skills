---
name: "tcm-soul-agent-forge"
description: "按六段式 SOUL 规范锻造角色人格，并注册到平台 /agents 端点完成上线。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["SOUL","六者","智能体","人格"]
    source: agent-tcmedu-skills
    category: "tcm-intelligence"
    domain: "D07"
    library_code: "6.1.2.1"
    stages: ["本科","硕士","继续教育"]
    subjects: ["中医智能","Agent 工程"]
    abilities: ["人格设计","智能体注册"]
    scenarios: ["应用开发","平台扩展"]
    platform_apis: ["/sages","/agents/*"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["角色（healer / patient / pharmacist / device / regulator / legal）","人格来源（历史医圣 / 岗位角色）","知识边界与工具集清单"]
---

# 六者 SOUL 智能体锻造 Skill

角色智能体若无统一 SOUL 规范，会退化成换皮 prompt。本 Skill 固化六段式结构与注册流程，保证人格、知识边界、工具集三者一致。

## 四级目录定位 / Library Position

**四级编码** `6.1.2.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 06 中医智能 / 01 中医智能 / 02 平台与角色 / 01 六者 SOUL 智能体锻造 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 六者角色的新增与迭代
- 医圣人格（张仲景 / 孙思邈）的扩展
- 平台 Agent 注册与联调

## 不适合 / Not For

- 替代平台侧的安全与权限设计
- 在无审核时直接上线生产人格

## 使用前请准备 / Inputs

- 角色（healer / patient / pharmacist / device / regulator / legal）
- 人格来源（历史医圣 / 岗位角色）
- 知识边界与工具集清单

## 推荐工作流 / Recommended Workflow

1. 按六段式撰写 SOUL.md（身份 / 记忆 / 使命 / 规则 / 工具 / 边界）
2. 声明知识边界（可回答 / 必须转介）
3. 绑定工具集与平台 API
4. 本地一致性自检（自称、口吻、禁用词）
5. 走 /agents 三端点注册并做连通性验证

## 产出 / Outputs

- SOUL.md
- 知识边界与工具绑定表
- 注册与连通性验证结果

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/sages` | 医圣人格清单（张仲景 / 孙思邈） |
| `/agents/*` | 六者 SOUL 智能体注册与查询（v3.0 新增，三端点） |

- **所属领域**：D07（中医智能）
- **离线可用性**：否（必须平台可达）

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
