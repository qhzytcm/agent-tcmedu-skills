---
name: "tcm-residency-training"
description: "按轮转科室与出科考核组织规培学习，对接医圣成长的病证数门槛。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["规培","轮转","出科","病证数"]
    source: agent-tcmedu-skills
    category: "tcm-exam-prep"
    domain: "-"
    library_code: "9.1.3.1"
    stages: ["规培"]
    subjects: ["中医综合"]
    abilities: ["轮转管理","病证覆盖"]
    scenarios: ["规培演练","出科考核"]
    roles: ["healer"]
    platform_apis: ["/kg/query","/kg/stats"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["当前轮转科室与起止时间","本科室应掌握的病证清单","已覆盖病证数量","出科考核形式"]
---

# 住院医师规范化培训 Skill

规培的关键不是考试而是「病证覆盖量」与出科能力。本 Skill 把轮转计划与病证数门槛绑定，让进度可见。

## 四级目录定位 / Library Position

**四级编码** `9.1.3.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 09 考试备考 / 01 中医综合 / 03 管理与决策 / 01 住院医师规范化培训 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医住院医师规范化培训学员
- 轮转出科考核准备
- 带教老师管理学员进度

## 不适合 / Not For

- 替代基地的正式考核结论
- 在无轮转计划时的空泛安排

## 使用前请准备 / Inputs

- 当前轮转科室与起止时间
- 本科室应掌握的病证清单
- 已覆盖病证数量
- 出科考核形式

## 推荐工作流 / Recommended Workflow

1. 对齐轮转科室与出科要求
2. 拆出本科室必须覆盖的病证清单
3. 按周排定门诊 / 病房 / 查房学习任务
4. 统计病证覆盖数与缺口
5. 出科前做一次模拟考核

## 产出 / Outputs

- 轮转周计划
- 病证覆盖统计与缺口
- 出科模拟考核

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/kg/query` | 病证知识图谱检索 |
| `/kg/stats` | 图谱规模统计 |

- **六者角色**：healer
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
