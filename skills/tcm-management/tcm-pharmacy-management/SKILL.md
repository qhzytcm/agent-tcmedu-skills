---
name: "tcm-pharmacy-management"
description: "覆盖中药采购、验收、调剂、煎药与不良反应监测的全流程合规管理。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["药事管理","GSP","调剂","ADR"]
    source: agent-tcmedu-skills
    category: "tcm-management"
    domain: "D08"
    library_code: "7.2.1.1"
    stages: ["继续教育"]
    subjects: ["药事管理"]
    abilities: ["药事法规","流程合规"]
    scenarios: ["医院管理","企业培训"]
    roles: ["pharmacist","regulator"]
    platform_apis: ["/pharmacists/inventory","/pharmacists/trace"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["药事管理场景（采购 / 验收 / 贮存 / 调剂 / 煎药 / ADR）","现行制度与流程","发现的问题"]
---

# 中药药事管理与法规 Skill

中药药事链条长（采购→验收→贮存→调剂→煎药→监测），任何一环不合规都会形成风险。本 Skill 把全链条拆成可检查的合规点。

## 四级目录定位 / Library Position

**四级编码** `7.2.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 07 中医管理 / 02 药事管理 / 01 管理与决策 / 01 中药药事管理与法规 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 药剂科管理岗位
- 中药房规范化建设
- 药事管理法规培训

## 不适合 / Not For

- 替代药监部门的法定检查
- 对具体违规行为做处罚裁量

## 使用前请准备 / Inputs

- 药事管理场景（采购 / 验收 / 贮存 / 调剂 / 煎药 / ADR）
- 现行制度与流程
- 发现的问题

## 推荐工作流 / Recommended Workflow

1. 列出该环节的法规依据
2. 梳理标准操作流程清单
3. 对照现状找出偏差项
4. 给出整改措施与优先级
5. 设计定期自查表

## 产出 / Outputs

- 法规依据与 SOP 清单
- 偏差项与整改措施
- 定期自查表

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/pharmacists/inventory` | 药者库存 |
| `/pharmacists/trace` | 药者饮片溯源 |

- **所属领域**：D08（中医管理）
- **六者角色**：pharmacist、regulator
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
