---
name: "sage-growth-path"
description: "把职称阶段映射为病证数门槛与能力清单，给出可追踪、可考核的成长路径。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["医圣成长","职称","病证数","梯度"]
    source: agent-tcmedu-skills
    category: "tcm-sage-growth"
    domain: "平台"
    library_code: "11.1.1.2"
    stages: ["规培","继续教育"]
    subjects: ["中医各家学说"]
    abilities: ["成长规划","能力评估"]
    scenarios: ["成长评估","师带徒"]
    roles: ["healer"]
    level_gate: "住院医-1 → 学科带头人（六阶）"
    platform_apis: ["/kg/stats","/kg/query","/sages","/teach/{sage_id}"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["当前职称 / 成长阶段","已覆盖病证数与清单","目标阶段与时间窗"]
---

# 医圣成长路径 Skill

年轻医师常不清楚「到什么阶段该会什么」。本 Skill 把病证覆盖数、能力项与职称阶段绑定，让成长看得见。

## 四级目录定位 / Library Position

**四级编码** `11.1.1.2`（篇·章·节·目，横向读即完整编码）

**定位路径** 11 医圣成长 / 01 中医各家学说 / 01 平台与角色 / 02 医圣成长路径 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 住院医至主治医的成长规划
- 科室对青年医师的培养管理
- 师承出师的能力评估

## 不适合 / Not For

- 替代医院人事与职称评审制度
- 把病证数量当作能力的唯一标准

## 使用前请准备 / Inputs

- 当前职称 / 成长阶段
- 已覆盖病证数与清单
- 目标阶段与时间窗

## 推荐工作流 / Recommended Workflow

1. 读取当前阶段的病证数门槛与能力清单
2. 比对已覆盖与缺口（调用 /kg/stats 与 /kg/query 统计）
3. 生成补齐缺口的月度计划
4. 设定阶段考核方式（模拟 / 病案 / 带教）
5. 更新成长进度并标记解锁的医圣人格

## 产出 / Outputs

- 成长阶段对照表（门槛 / 现状 / 缺口）
- 月度补齐计划
- 考核方式与进度更新

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/kg/stats` | 图谱规模统计 |
| `/kg/query` | 病证知识图谱检索 |
| `/sages` | 医圣人格清单（张仲景 / 孙思邈） |
| `/teach/{sage_id}` | 医圣授课：主题 + 学员层级 → 讲解 |

- **所属领域**：平台（医圣成长）
- **六者角色**：healer
- **成长阶段门禁**：住院医-1 → 学科带头人（六阶）
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
