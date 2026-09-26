---
name: "tcm-diagnostics"
description: "把望闻问切四诊信息规范成可复用的采集表单，并训练「四诊合参→辨证要素」的推理链。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["四诊","舌诊","脉诊","辨证要素"]
    source: agent-tcmedu-skills
    category: "tcm-foundation"
    domain: "D01"
    stages: ["本科"]
    subjects: ["中医诊断学"]
    abilities: ["四诊合参","辨证要素"]
    scenarios: ["同步巩固","病案讨论"]
    textbook_codes: ["CM-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["主诉与现病史","望闻问切四诊信息（舌象 / 脉象可留空）","既往史与用药史"]
---

# 中医诊断学 Skill

诊断学的难点不在记症状，而在把杂乱的四诊信息收敛成证候要素。本 Skill 强制结构化采集，再把信息逐层收敛，避免「一症一证」的跳跃式结论。

## 最适合 / Best For

- 本科U3–U4 按 CM-02 教材同步学习
- 病案讨论前的四诊信息整理
- 执业医师实践技能的四诊训练

## 不适合 / Not For

- 替代真实患者的面诊
- 在缺舌脉信息时给出确诊式结论

## 使用前请准备 / Inputs

- 主诉与现病史
- 望闻问切四诊信息（舌象 / 脉象可留空）
- 既往史与用药史

## 推荐工作流 / Recommended Workflow

1. 按四诊表单结构化采集
2. 逐项标注异常与阳性体征
3. 归纳病位（脏腑 / 经络）与病性（寒热虚实）
4. 形成证候要素清单并给出并列候选项
5. 提示需要补充的关键信息

## 产出 / Outputs

- 四诊结构化记录
- 病位病性归纳表
- 证候要素候选与补充信息提示

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：CM-02（见 tcmP `domain-specs/`）
- **所属领域**：D01（中医基础与经典）
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
