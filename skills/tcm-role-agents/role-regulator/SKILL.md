---
name: "role-regulator"
description: "质控管理、排班优化、资源利用与应急调度：用指标驱动医院运行。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["规者","质控","排班","应急调度"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    library_code: "10.5.1.1"
    stages: ["继续教育"]
    subjects: ["中医医院管理"]
    abilities: ["质控管理","排班调度"]
    scenarios: ["医院管理","继续教育"]
    roles: ["regulator"]
    platform_apis: ["/regulators/quality","/regulators/scheduling","/regulators/utilization","/regulators/dispatch","/regulators/dashboard"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["管理场景（质控 / 排班 / 利用 / 应急）","当前指标数据","约束条件（人力 / 场地 / 时段）"]
---

# 规者 Agent Skill

医院运行管理依赖直觉排班与事后统计。本 Skill 用指标先行的方法，让调度决策先看数据再看经验。

## 四级目录定位 / Library Position

**四级编码** `10.5.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 10 六者角色 / 05 中医医院管理 / 01 管理与决策 / 01 规者 Agent Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 院办 / 质控 / 后勤的日常运行管理
- 门诊与病房排班优化
- 应急事件的分级调度

## 不适合 / Not For

- 替代院领导的最终管理决策
- 对人事与薪酬做具体安排

## 使用前请准备 / Inputs

- 管理场景（质控 / 排班 / 利用 / 应急）
- 当前指标数据
- 约束条件（人力 / 场地 / 时段）

## 推荐工作流 / Recommended Workflow

1. 调用 /regulators/quality 取质控指标
2. 调用 /regulators/utilization 看资源利用
3. 调用 /regulators/scheduling 生成排班方案
4. 对冲突场景调用 /regulators/dispatch 做分级调度
5. 汇总到 /regulators/dashboard 呈现

## 产出 / Outputs

- 质控指标与问题清单
- 排班方案与利用率分析
- 应急调度分级方案与驾驶舱数据

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/regulators/quality` | 规者质控管理 |
| `/regulators/scheduling` | 规者排班优化 |
| `/regulators/utilization` | 规者资源利用 |
| `/regulators/dispatch` | 规者应急调度 |
| `/regulators/dashboard` | 规者驾驶舱 |

- **所属领域**：平台（六者角色）
- **六者角色**：regulator
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
