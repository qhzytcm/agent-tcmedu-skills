---
name: "tcm-daily-acupoint-drill"
description: "每天 8–12 道腧穴速练：定位、归经、主治与危险穴位的短时高频训练。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["速练","腧穴","每日","危险穴位"]
    source: agent-tcmedu-skills
    category: "tcm-upstream"
    domain: "-"
    library_code: "13.4.1.1"
    stages: ["本科","规培"]
    subjects: ["经络腧穴学"]
    abilities: ["腧穴定位","归经主治"]
    scenarios: ["每日打卡","实操训练"]
    textbook_codes: ["AT-01"]
    upstream_source: "hermes-edu-skills/senior-biology-quick-practice@0.15.0"
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["今日训练范围（经脉 / 部位）","可用时间与题量","最近错项"]
---

# 中医腧穴速练 Skill

腧穴定位靠反复提取才牢固，且危险穴位必须形成条件反射式警觉。本 Skill 把安全提示固定进每道题。

## 四级目录定位 / Library Position

**四级编码** `13.4.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 13 上游技能移植 / 04 经络腧穴学 / 01 实操与技法 / 01 中医腧穴速练 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 经络腧穴学的日常维持训练
- 针灸科实习前的手感恢复
- 执业医师针灸部分覆盖

## 不适合 / Not For

- 替代人体实训标本操作
- 在无图谱辅助时的精确定位判定

## 使用前请准备 / Inputs

- 今日训练范围（经脉 / 部位）
- 可用时间与题量
- 最近错项

## 推荐工作流 / Recommended Workflow

1. 按范围生成定位 / 归经 / 主治题
2. 每题附危险穴位与刺灸安全提示
3. 限时完成并判分
4. 错项回到「体表标志 + 骨度分寸」重述
5. 错项滚入次日队列

## 产出 / Outputs

- 速练题与判分
- 安全提示清单
- 次日滚动队列

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：AT-01（见 tcmP `domain-specs/`）
- **上游来源**：`hermes-edu-skills/senior-biology-quick-practice@0.15.0`（提取与改造依据见 [docs/07-上游技能提取报告.md](../../../docs/07-上游技能提取报告.md)）
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
