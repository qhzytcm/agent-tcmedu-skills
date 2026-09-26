---
name: "tcm-photo-question"
description: "上传舌象、方剂或教材截图，先识别可见信息再讲解，不臆测不可见内容。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["拍照答疑","舌象","方剂识别"]
    source: agent-tcmedu-skills
    category: "tcm-learning-core"
    domain: "-"
    library_code: "8.1.1.3"
    stages: ["本科","规培"]
    subjects: ["学习能力"]
    abilities: ["图像识题","分步讲解"]
    scenarios: ["课后作业","现场答疑"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","workflow.create","memory.write"]
    requires_data: ["图片（题目 / 舌象 / 方剂 / 教材页）","希望得到的帮助（讲解 / 判分 / 特征描述）","已知条件补充"]
---

# 中医拍照答疑 Skill

拍照答疑最大的风险是「看了模糊的图就断言」，在中医舌诊场景尤其危险。本 Skill 强制先声明可辨识信息、再作答，并列出不可判定项。

## 四级目录定位 / Library Position

**四级编码** `8.1.1.3`（篇·章·节·目，横向读即完整编码）

**定位路径** 08 学习核心 / 01 学习能力 / 01 教学与学习 / 03 中医拍照答疑 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 教材题目与方剂组成的现场答疑
- 舌象照片的初步特征描述
- 课后作业的逐题讲解

## 不适合 / Not For

- 对照片做诊断结论
- 在图像不可辨识时强行作答

## 使用前请准备 / Inputs

- 图片（题目 / 舌象 / 方剂 / 教材页）
- 希望得到的帮助（讲解 / 判分 / 特征描述）
- 已知条件补充

## 推荐工作流 / Recommended Workflow

1. 声明图片中可辨识与不可辨识的信息
2. 定位题型或场景（题目 / 舌象 / 方剂）
3. 给出分步讲解或特征描述
4. 标注不可判定项与需补充信息
5. 附一条同类变式题

## 产出 / Outputs

- 可辨识信息声明
- 分步讲解
- 不可判定项与变式题

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
