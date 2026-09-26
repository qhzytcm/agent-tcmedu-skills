---
name: "role-healer"
description: "医者临床辅助与带教一体：病证推理、方剂推荐、师带徒教学与医圣成长路径规划。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["医者","师带徒","六者","医圣成长"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    library_code: "10.1.1.1"
    stages: ["规培","继续教育"]
    subjects: ["中医临床综合"]
    abilities: ["辨证论治","师带徒教学"]
    scenarios: ["临床辅助","师带徒","成长评估"]
    roles: ["healer"]
    level_gate: "住院医-1 起，随病证覆盖数解锁"
    platform_apis: ["/consult/{sage_id}","/teach/{sage_id}","/analyze-case/{sage_id}","/kg/query","/diag","/bianzheng"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["主诉与四诊信息","患者既往史与用药","当前职称 / 成长阶段","（带教场景）学员层级与学习目标"]
---

# 医者 Agent Skill（含师带徒）

医者是六者的核心枢纽，既要服务临床又要带教。若两者割裂，带教就会退化成脱离病例的讲授。本 Skill 强制「以病例为教学载体」。

## 四级目录定位 / Library Position

**四级编码** `10.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 10 六者角色 / 01 中医临床综合 / 01 平台与角色 / 01 医者 Agent Skill（含师带徒）

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 临床医师的辨证论治辅助
- 年长医师带教年轻医生
- 医圣成长路径的进度规划

## 不适合 / Not For

- 替代医师本人的临床决策与签字
- 对急危重症给出门诊式处理

## 使用前请准备 / Inputs

- 主诉与四诊信息
- 患者既往史与用药
- 当前职称 / 成长阶段
- （带教场景）学员层级与学习目标

## 推荐工作流 / Recommended Workflow

1. 调用 /consult/{sage_id} 取医圣辨证建议
2. 调用 /kg/query 核对病证单位依据
3. 输出治法方药并标注证据来源
4. （带教）把病例改造成教学问题链并布置作业
5. 更新病证覆盖数与成长进度

## 产出 / Outputs

- 辨证论治建议与依据
- 带教问题链与作业
- 成长进度更新

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/consult/{sage_id}` | 医圣咨询：主诉 + 症状 + 舌脉 → 辨证建议 |
| `/teach/{sage_id}` | 医圣授课：主题 + 学员层级 → 讲解 |
| `/analyze-case/{sage_id}` | 医圣病案分析 |
| `/kg/query` | 病证知识图谱检索 |
| `/diag` | 病证单元推理（v3.0 新增） |
| `/bianzheng` | 辨证推理（v3.0 新增） |

- **所属领域**：平台（六者角色）
- **六者角色**：healer
- **成长阶段门禁**：住院医-1 起，随病证覆盖数解锁
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
