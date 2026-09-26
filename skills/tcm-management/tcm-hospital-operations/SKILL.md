---
name: "tcm-hospital-operations"
description: "围绕门诊量、病床周转、药占比与人事排班做中医医院的运营指标管理。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["运营管理","指标","药占比","排班"]
    source: agent-tcmedu-skills
    category: "tcm-management"
    domain: "D08"
    library_code: "7.1.1.3"
    stages: ["继续教育"]
    subjects: ["中医医院管理"]
    abilities: ["运营指标","绩效设计"]
    scenarios: ["医院管理","继续教育"]
    roles: ["regulator"]
    platform_apis: ["/regulators/dashboard","/regulators/utilization"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["管理场景（门诊 / 病房 / 药事 / 人力）","当前指标数据","约束条件与政策限制","目标周期"]
---

# 中医医院运营管理 Skill

中医医院运营有其特殊性（门诊占比高、药占比敏感、专家依赖强），直接套西医院指标会失真。本 Skill 采用中医医院指标体系。

## 四级目录定位 / Library Position

**四级编码** `7.1.1.3`（篇·章·节·目，横向读即完整编码）

**定位路径** 07 中医管理 / 01 中医医院管理 / 01 管理与决策 / 03 中医医院运营管理 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 院办 / 运营办的日常管理
- 科室绩效考核方案设计
- 医院管理的继续教育课程

## 不适合 / Not For

- 替代院领导的最终经营决策
- 对人事薪酬做具体承诺

## 使用前请准备 / Inputs

- 管理场景（门诊 / 病房 / 药事 / 人力）
- 当前指标数据
- 约束条件与政策限制
- 目标周期

## 推荐工作流 / Recommended Workflow

1. 选定该场景的核心指标集
2. 计算现状与目标差距
3. 给出可执行的改进措施
4. 设计指标监控与反馈节奏
5. 标注政策合规红线

## 产出 / Outputs

- 核心指标集与差距分析
- 改进措施清单
- 监控节奏与合规提示

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/regulators/dashboard` | 规者驾驶舱 |
| `/regulators/utilization` | 规者资源利用 |

- **所属领域**：D08（中医管理）
- **六者角色**：regulator
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
