---
name: "tcm-quality-control"
description: "把中医病历质量、辨证规范性与优势病种管理转成可抽查、可量化的质控指标。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["质控","病历","优势病种"]
    source: agent-tcmedu-skills
    category: "tcm-management"
    domain: "D08"
    library_code: "7.1.1.1"
    stages: ["继续教育","本科"]
    subjects: ["中医医院管理"]
    abilities: ["质控指标","病历评价"]
    scenarios: ["医院管理","继续教育"]
    roles: ["regulator"]
    platform_apis: ["/regulators/quality","/regulators/utilization","/regulators/dashboard"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["科室与抽查周期","病历样本或质控维度选择","现行质控指标（可选）"]
---

# 中医医疗质控 Skill

中医质控难点在于「辨证」难以标准化评分。本 Skill 把辨证要素完整性、治法方药一致性拆成可抽查的评分项。

## 四级目录定位 / Library Position

**四级编码** `7.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 07 中医管理 / 01 中医医院管理 / 01 管理与决策 / 01 中医医疗质控 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医医院质控科日常抽查
- 中医病案质量评价培训
- 科室质控指标体系建设

## 不适合 / Not For

- 替代卫生行政部门的法定检查
- 对具体医疗纠纷做责任认定

## 使用前请准备 / Inputs

- 科室与抽查周期
- 病历样本或质控维度选择
- 现行质控指标（可选）

## 推荐工作流 / Recommended Workflow

1. 确定质控维度（病历书写 / 辨证规范 / 用药合理 / 优势病种）
2. 按维度生成抽查清单
3. 给出可量化的评分规则
4. 调用 /regulators/quality 生成评估
5. 输出问题清单与改进建议

## 产出 / Outputs

- 质控抽查清单与评分规则
- 问题清单
- 改进建议

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/regulators/quality` | 规者质控管理 |
| `/regulators/utilization` | 规者资源利用 |
| `/regulators/dashboard` | 规者驾驶舱 |

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
