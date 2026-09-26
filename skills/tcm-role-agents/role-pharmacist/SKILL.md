---
name: "role-pharmacist"
description: "处方审核、相互作用核查、替代建议与饮片溯源一体化的药事服务能力。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["药者","处方审核","十八反","溯源"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    library_code: "10.3.1.1"
    stages: ["本科","继续教育"]
    subjects: ["临床中药学","药事管理"]
    abilities: ["处方审核","饮片溯源"]
    scenarios: ["药事服务","企业培训"]
    roles: ["pharmacist"]
    platform_apis: ["/pharmacists/review","/pharmacists/interaction","/pharmacists/substitute","/pharmacists/inventory","/pharmacists/trace"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["处方内容（药味与剂量）","患者信息（年龄 / 妊娠 / 基础病）","待核查类型"]
---

# 药者 Agent Skill

中药处方审核需要同时看配伍禁忌、剂量与饮片质量，人工易漏。本 Skill 把四项核查固化成必过清单。

## 四级目录定位 / Library Position

**四级编码** `10.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 10 六者角色 / 03 临床中药学 / 01 管理与决策 / 01 药者 Agent Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中药房处方审核
- 药物相互作用与妊娠禁忌核查
- 饮片质量与溯源核查

## 不适合 / Not For

- 替代药师签字与法定审核责任
- 在缺处方信息时给出发药结论

## 使用前请准备 / Inputs

- 处方内容（药味与剂量）
- 患者信息（年龄 / 妊娠 / 基础病）
- 待核查类型

## 推荐工作流 / Recommended Workflow

1. 调用 /pharmacists/review 做处方审核
2. 调用 /pharmacists/interaction 核查相互作用与十八反十九畏
3. 调用 /pharmacists/substitute 给替代建议
4. 调用 /pharmacists/trace 核查饮片溯源与库存
5. 输出审核结论与拦截项

## 产出 / Outputs

- 处方审核结论
- 相互作用与禁忌清单
- 替代建议与溯源信息

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/pharmacists/review` | 药者处方审核 |
| `/pharmacists/interaction` | 药者药物相互作用 |
| `/pharmacists/substitute` | 药者替代建议 |
| `/pharmacists/inventory` | 药者库存 |
| `/pharmacists/trace` | 药者饮片溯源 |

- **所属领域**：平台（六者角色）
- **六者角色**：pharmacist
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
