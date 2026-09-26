---
name: "tcm-licensed-physician-exam"
description: "按实践技能与医学综合两阶段拆解考纲，做诊断、提分优先级与限时训练闭环。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["执业医师","实践技能","综合笔试","提分优先级"]
    source: agent-tcmedu-skills
    category: "tcm-exam-prep"
    domain: "-"
    library_code: "9.1.1.1"
    stages: ["本科","继续教育"]
    subjects: ["中医综合"]
    abilities: ["诊断提分","限时训练"]
    scenarios: ["考前冲刺","专项训练"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["考试阶段（实践技能 / 综合笔试）与日期","当前正确率或模考分数","薄弱模块或最近错题","每天可用时间"]
---

# 中医执业医师考试 Skill

执业医师考试范围极广，考生常在没有诊断的情况下盲目刷题。本 Skill 先做分数诊断，再定提分优先级。

## 四级目录定位 / Library Position

**四级编码** `9.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 09 考试备考 / 01 中医综合 / 01 综合能力 / 01 中医执业医师考试 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中医执业医师（含助理）备考
- 实践技能三站式的专项训练
- 毕业后首次参加考试者

## 不适合 / Not For

- 替代官方考试大纲与报考政策
- 对考试结果做任何承诺

## 使用前请准备 / Inputs

- 考试阶段（实践技能 / 综合笔试）与日期
- 当前正确率或模考分数
- 薄弱模块或最近错题
- 每天可用时间

## 推荐工作流 / Recommended Workflow

1. 按考纲做模块分数诊断
2. 排定提分优先级（性价比排序）
3. 生成限时训练与整卷模拟
4. 错题复盘并回填薄弱模块
5. 排定下次复测时间

## 产出 / Outputs

- 模块诊断表
- 提分优先级清单
- 限时训练与复测计划

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

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
