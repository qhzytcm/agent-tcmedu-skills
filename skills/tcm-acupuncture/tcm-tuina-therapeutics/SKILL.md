---
name: "tcm-tuina-therapeutics"
description: "按病种给出推拿治疗方案：手法组合、施术部位、力度层次与疗程节奏。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["推拿治疗","手法组合","疗程","禁忌"]
    source: agent-tcmedu-skills
    category: "tcm-acupuncture"
    domain: "D03,D04"
    library_code: "4.6.1.1"
    stages: ["本科","规培"]
    subjects: ["推拿治疗学"]
    abilities: ["手法组合","治疗方案"]
    scenarios: ["病案讨论","实操训练"]
    roles: ["healer"]
    textbook_codes: ["TU-02"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["病种与分期","施术部位与阳性反应点","患者耐受度","合并症与禁忌"]
---

# 推拿治疗学 Skill

推拿疗效依赖「手法组合 + 部位 + 力度 + 节奏」的整体处方，单背手法不足以施治。本 Skill 以病种为轴开处方。

## 四级目录定位 / Library Position

**四级编码** `4.6.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 04 针灸与推拿 / 06 推拿治疗学 / 01 实操与技法 / 01 推拿治疗学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 TU-02 教材学习
- 推拿科常见病治疗训练
- 康复科推拿方案设计

## 不适合 / Not For

- 替代真人手法带教
- 对骨折 / 肿瘤 / 感染等禁忌证给出推拿建议

## 使用前请准备 / Inputs

- 病种与分期
- 施术部位与阳性反应点
- 患者耐受度
- 合并症与禁忌

## 推荐工作流 / Recommended Workflow

1. 判断推拿适应证与禁忌证
2. 设计手法组合与顺序
3. 确定施术部位与力度层次
4. 排定疗程与节奏
5. 给出居家自我保健动作

## 产出 / Outputs

- 推拿治疗处方
- 力度层次与疗程
- 居家保健动作

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：TU-02（见 tcmP `domain-specs/`）
- **所属领域**：D03,D04（针灸与推拿）
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
