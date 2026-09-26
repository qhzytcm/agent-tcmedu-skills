---
name: "tcm-herb-processing"
description: "讲清「炮制减毒增效」的原理，并接入平台饮片溯源做过关式鉴定训练。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["炮制","鉴定","饮片溯源","减毒增效"]
    source: agent-tcmedu-skills
    category: "tcm-materia"
    domain: "D02"
    library_code: "3.3.1.1"
    stages: ["本科","继续教育"]
    subjects: ["中药炮制学","中药鉴定学"]
    abilities: ["炮制原理","性状鉴别"]
    scenarios: ["实操训练","企业培训"]
    roles: ["pharmacist"]
    textbook_codes: ["MM-03"]
    platform_apis: ["/pharmacists/trace","/pharmacists/inventory"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["药材名与待鉴定饮片描述（性状 / 颜色 / 气味）","炮制方法（清炒 / 酒炙 / 醋炙等）","训练目标（原理 / 鉴别 / 溯源）"]
---

# 中药炮制与鉴定 Skill

炮制前后的药性与毒性与临床安全直接相关，但教材多以记忆表呈现。本 Skill 用「原理—变化—临床后果」串起来，并接溯源接口做实操感。

## 四级目录定位 / Library Position

**四级编码** `3.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 03 中药与方剂 / 03 中药炮制学 / 01 实操与技法 / 01 中药炮制与鉴定 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 中药学与炮制方向的本科课程
- 药房 / 药企新员工培训
- 饮片验收的性状鉴别训练

## 不适合 / Not For

- 替代药检机构出具的检验报告
- 给出自制饮片的非法操作规程

## 使用前请准备 / Inputs

- 药材名与待鉴定饮片描述（性状 / 颜色 / 气味）
- 炮制方法（清炒 / 酒炙 / 醋炙等）
- 训练目标（原理 / 鉴别 / 溯源）

## 推荐工作流 / Recommended Workflow

1. 说明该炮制法的目的与原理
2. 对比炮制前后的成分与药性变化
3. 给出临床后果（减毒 / 增效 / 改变归经）
4. 调用 /pharmacists/trace 走一遍溯源链路
5. 生成性状鉴别过关题并判分

## 产出 / Outputs

- 炮制原理卡
- 炮制前后对比
- 溯源实训与鉴别判分

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/pharmacists/trace` | 药者饮片溯源 |
| `/pharmacists/inventory` | 药者库存 |

- **关联教材**：MM-03（见 tcmP `domain-specs/`）
- **所属领域**：D02（中药与方剂）
- **六者角色**：pharmacist
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
