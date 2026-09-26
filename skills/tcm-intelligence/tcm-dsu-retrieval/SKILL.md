---
name: "tcm-dsu-retrieval"
description: "用平台的病证单元引擎做检索增强问答：TF-IDF + FTS5 + RRF 融合，内网零 token。 依赖 tcmP 平台接口，离线不可用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["RAG","TF-IDF","FTS5","RRF","病证单元"]
    source: agent-tcmedu-skills
    category: "tcm-intelligence"
    domain: "D07"
    stages: ["本科","硕士","博士"]
    subjects: ["中医智能","信息检索"]
    abilities: ["检索增强生成","出处溯源"]
    scenarios: ["科研检索","应用开发"]
    platform_apis: ["/semantic-search","/rag","/diag","/bianzheng","/kg/query"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["自然语言问题或病证关键词","返回条数 Top-K","是否需要出处引用"]
---

# 病证单位检索 Skill（RAG）

大模型直接答中医问题会编造方剂与剂量。本 Skill 强制「先检索后生成」，所有结论必须落到检索到的病证单位上。

## 最适合 / Best For

- 中文医学文献 / 教材的问答检索
- 构建中医 RAG 应用的工程学习
- 离线低成本场景的知识问答

## 不适合 / Not For

- 替代临床决策
- 在平台不可达时的离线使用

## 使用前请准备 / Inputs

- 自然语言问题或病证关键词
- 返回条数 Top-K
- 是否需要出处引用

## 推荐工作流 / Recommended Workflow

1. 调用 /semantic-search 做语义检索
2. 对候选做 RRF 融合排序
3. 取 Top-K 病证单位原文
4. 调用 /rag 做精修问答与溯源
5. 输出答案 + 出处编号，无出处不输出

## 产出 / Outputs

- 检索候选列表
- 融合排序结果
- 带出处的精修答案

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/semantic-search` | 语义检索（TF-IDF + FTS5 + RRF，内网零 token） |
| `/rag` | RAG 精修问答 |
| `/diag` | 病证单元推理（v3.0 新增） |
| `/bianzheng` | 辨证推理（v3.0 新增） |
| `/kg/query` | 病证知识图谱检索 |

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
