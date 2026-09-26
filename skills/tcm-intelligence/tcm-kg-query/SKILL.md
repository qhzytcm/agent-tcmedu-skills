---
name: "tcm-kg-query"
description: "查询病证知识图谱的节点与关系，支持以病索证、以证溯病双向遍历与规模统计。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["知识图谱","DSU","以病索证","以证溯病"]
    source: agent-tcmedu-skills
    category: "tcm-intelligence"
    domain: "D07"
    library_code: "6.1.1.2"
    stages: ["本科","硕士"]
    subjects: ["中医智能","知识图谱"]
    abilities: ["图谱查询","双向遍历"]
    scenarios: ["应用开发","数据核查"]
    platform_apis: ["/kg/query","/kg/detail/{dsu_id}","/kg/stats"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["查询词（病名 / 证型 / 方剂 / 症状）","查询类型（检索 / 详情 / 统计）","DSU 编号（可选）"]
---

# 病证知识图谱查询 Skill

图谱数据在平台里，学习者看不到结构，也难以验证「教材知识如何进入图谱」。本 Skill 把图谱查询变成可练习、可讲解的任务。

## 四级目录定位 / Library Position

**四级编码** `6.1.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 06 中医智能 / 01 中医智能 / 01 检索与数据 / 02 病证知识图谱查询 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医智能方向的数据结构学习
- 教材知识点与图谱节点的对照核查
- 图谱质量抽查

## 不适合 / Not For

- 替代图谱构建工程本身
- 在无权限时读取受限节点

## 使用前请准备 / Inputs

- 查询词（病名 / 证型 / 方剂 / 症状）
- 查询类型（检索 / 详情 / 统计）
- DSU 编号（可选）

## 推荐工作流 / Recommended Workflow

1. 调用 /kg/query 做检索并展示命中节点
2. 按需调用 /kg/detail/{dsu_id} 取详情
3. 展示节点间关系（病—证—方—药）
4. 调用 /kg/stats 说明图谱规模
5. 输出教材知识点到图谱节点的映射表

## 产出 / Outputs

- 命中节点列表
- 节点关系图（表格化）
- 知识点—节点映射表

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/kg/query` | 病证知识图谱检索 |
| `/kg/detail/{dsu_id}` | 病证单位（DSU）详情 |
| `/kg/stats` | 图谱规模统计 |

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
