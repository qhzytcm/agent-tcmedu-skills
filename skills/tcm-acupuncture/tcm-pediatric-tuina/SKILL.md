---
name: "tcm-pediatric-tuina"
description: "按小儿特定穴与专用手法组织方案，并强制家长可执行的操作与安全提示。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["小儿推拿","特定穴","家长操作","禁忌"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.7.1.1"
    stages: ["本科","继续教育"]
    subjects: ["小儿推拿学"]
    abilities: ["小儿特定穴","家庭指导"]
    scenarios: ["实操训练","家长沟通"]
    roles: ["healer","patient"]
    textbook_codes: ["TU-03"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["患儿年龄与主诉","症状与病程","家长可执行条件","禁忌情形筛查"]
---

# 小儿推拿学 Skill

小儿推拿的穴位体系与成人不同，且操作由家长执行，必须极度简化并带安全边界。本 Skill 输出家长能照做的动作卡。

## 四级目录定位 / Library Position

**四级编码** `4.7.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 07 小儿推拿学 / 01 实操与技法 / 01 小儿推拿学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 TU-03 教材学习
- 儿科常见病（食积 / 便秘 / 咳嗽）家庭推拿
- 家长培训与科普

## 不适合 / Not For

- 对急症 / 高热 / 外伤给出推拿处理
- 替代儿科诊疗

## 使用前请准备 / Inputs

- 患儿年龄与主诉
- 症状与病程
- 家长可执行条件
- 禁忌情形筛查

## 推荐工作流 / Recommended Workflow

1. 筛查推拿禁忌（皮肤 / 发热 / 外伤）
2. 选小儿特定穴与手法
3. 给出操作顺序与次数
4. 输出家长可照做的动作卡
5. 标注需立即就医的信号

## 产出 / Outputs

- 小儿推拿方案
- 家长操作动作卡
- 禁忌与就医信号

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：TU-03（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
- **六者角色**：healer、patient
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
