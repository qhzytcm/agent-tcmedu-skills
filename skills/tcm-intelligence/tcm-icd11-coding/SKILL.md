---
name: "tcm-icd11-coding"
description: "把中医病证名称映射到 ICD-11（含传统医学章节）标准编码，走内网镜像零外网依赖。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["ICD-11","编码","术语映射","内网镜像"]
    source: agent-tcmedu-skills
    category: "tcm-intelligence"
    domain: "D07"
    library_code: "6.1.1.3"
    stages: ["本科","硕士"]
    subjects: ["中医智能","病案信息"]
    abilities: ["标准编码","术语映射"]
    scenarios: ["科研对齐","病案编码"]
    textbook_codes: ["CM-02","CM-13"]
    platform_apis: ["/icd/*"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["中医病名 / 证型名称","目标语言（zh / en）","是否需要记录 ID 与编码双输出"]
---

# ICD-11 编码桥接 Skill

中医病名与国际疾病分类之间存在多对多映射，人工查编码既慢又易错。本 Skill 固化三 header 调用规范与滑动窗口搜索策略。

## 四级目录定位 / Library Position

**四级编码** `6.1.1.3`（篇·章·节·目，横向读即完整编码）

**定位路径** 06 中医智能 / 01 中医智能 / 01 检索与数据 / 03 ICD-11 编码桥接 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医病案首页编码
- 科研数据的国际标准对齐
- 病证与 ICD-11 映射体系建设

## 不适合 / Not For

- 替代病案编码员的最终审核
- 对镜像缺失的线性化端点做臆测

## 使用前请准备 / Inputs

- 中医病名 / 证型名称
- 目标语言（zh / en）
- 是否需要记录 ID 与编码双输出

## 推荐工作流 / Recommended Workflow

1. 长词先做滑动窗口切分再检索
2. 按 API-Version / Accept / Accept-Language 三 header 调用
3. 命中后取实体 ID（如 BA00 / SF57）与标准编码
4. 对多候选做人工可判断的排序
5. 输出映射表并标注置信度

## 产出 / Outputs

- 病证—ICD-11 映射表
- 实体 ID 与标准编码
- 置信度与待确认项

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/icd/*` | ICD-11 编码桥接（内网 192.168.0.111:8080，v3.0 新增） |

- **关联教材**：CM-02、CM-13（见 tcmP `domain-specs/`）
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
