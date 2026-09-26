---
name: "tcm-orthopedics-trauma"
description: "把正骨理筋手法的适应证、复位标准与固定康复方案串成完整的骨伤处理链。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["骨伤","正骨","复位标准","康复"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    stages: ["本科","硕士"]
    subjects: ["中医骨伤科学"]
    abilities: ["正骨理筋","固定康复"]
    scenarios: ["病案讨论","实操训练"]
    roles: ["healer"]
    textbook_codes: ["OR-01"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["损伤部位与机制","症状体征与影像描述（可留空）","训练目标（手法 / 复位标准 / 康复）"]
---

# 中医骨伤科学 Skill

骨伤科易出现「手法选择随意、复位标准模糊」的问题。本 Skill 强制先给适应证与禁忌，再谈手法，最后落固定与康复。

## 最适合 / Best For

- 骨伤专业本科与研究生课程
- 正骨手法适应证判断训练
- 创伤急救流程复习

## 不适合 / Not For

- 替代影像学检查与手术评估
- 对开放骨折、血管神经损伤给出非手术建议

## 使用前请准备 / Inputs

- 损伤部位与机制
- 症状体征与影像描述（可留空）
- 训练目标（手法 / 复位标准 / 康复）

## 推荐工作流 / Recommended Workflow

1. 判定损伤类型与是否需手术转诊
2. 列出手法适应证与禁忌证
3. 说明手法操作与复位标准（X 线评估）
4. 给出固定方式与固定时长
5. 输出分阶段康复方案与复诊节点

## 产出 / Outputs

- 损伤判定与转诊提示
- 手法适应证与复位标准
- 固定与分阶段康复方案

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：OR-01（见 tcmP `domain-specs/`）
- **所属领域**：D05,D06（骨伤与五官口腔）
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
