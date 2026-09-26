---
name: "tcm-tendon-injury"
description: "围绕软组织损伤的分期（急性 / 亚急性 / 慢性）给出理筋手法与康复节奏。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["筋伤","分期","理筋","康复"]
    source: agent-tcmedu-skills
    category: "tcm-orthopedics"
    domain: "D05,D06"
    library_code: "5.4.1.1"
    stages: ["本科","规培"]
    subjects: ["筋伤学"]
    abilities: ["分期论治","理筋手法"]
    scenarios: ["病案讨论","实操训练"]
    roles: ["healer"]
    textbook_codes: ["OR-03"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["损伤部位与时间","疼痛性质与活动受限程度","肿胀 / 瘀斑情况","既往发作史"]
---

# 筋伤学 Skill

筋伤的关键变量是「时间」——同一部位不同分期处理方式相反。本 Skill 以分期为第一判断，避免急性期用重手法。

## 四级目录定位 / Library Position

**四级编码** `5.4.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 05 骨伤与五官口腔 / 04 筋伤学 / 01 实操与技法 / 01 筋伤学 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 本科按 OR-03 教材学习
- 颈肩腰腿痛的手法分期处理
- 运动损伤康复的中医思路

## 不适合 / Not For

- 急性期在未排除骨折时施行手法
- 替代运动医学的专业评估

## 使用前请准备 / Inputs

- 损伤部位与时间
- 疼痛性质与活动受限程度
- 肿胀 / 瘀斑情况
- 既往发作史

## 推荐工作流 / Recommended Workflow

1. 判断分期（急性 / 亚急性 / 慢性）
2. 筛查需排除的骨折与神经损伤
3. 按分期选择理筋手法与强度
4. 给出固定 / 制动与活动建议
5. 排定康复进阶节奏

## 产出 / Outputs

- 分期判断
- 手法选择与强度
- 康复进阶节奏

## 与 tcmP 平台的对接 / Platform Binding

本 Skill 不依赖平台接口，可离线独立使用。

- **关联教材**：OR-03（见 tcmP `domain-specs/`）
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
