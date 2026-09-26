---
name: "tcm-health-economics"
description: "用成本—效果视角评估中医诊疗方案，并解读医保支付政策对中医的影响。 依赖 tcmP 平台接口，离线不可用。"
version: "0.3.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["卫生经济","成本效果","医保支付","政策"]
    source: agent-tcmedu-skills
    category: "tcm-management"
    domain: "D08"
    library_code: "7.3.1.1"
    stages: ["继续教育","硕士"]
    subjects: ["卫生经济学"]
    abilities: ["成本效果分析","政策解读"]
    scenarios: ["医院管理","科研训练"]
    roles: ["regulator","legal"]
    platform_apis: ["/legals/insurance/coverage","/legals/insurance/estimate","/legals/insurance/drug"]
    quality_tier: "curated"
    standalone_support: "supported"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["评估对象（技术 / 项目 / 方案）","成本数据与效果指标","涉及医保政策类型","评估视角（医院 / 患者 / 医保）"]
---

# 卫生经济学与医保政策 Skill

中医诊疗的价值评估常缺经济性证据，在医保谈判与政策沟通中处于劣势。本 Skill 提供成本—效果分析框架与政策解读方法。

## 四级目录定位 / Library Position

**四级编码** `7.3.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 07 中医管理 / 03 卫生经济学 / 01 管理与决策 / 01 卫生经济学与医保政策 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 医院医保办与运营分析
- 中医适宜技术的经济性评估
- 医疗政策类课程与研究

## 不适合 / Not For

- 替代医保部门的政策解释
- 对具体支付标准做承诺

## 使用前请准备 / Inputs

- 评估对象（技术 / 项目 / 方案）
- 成本数据与效果指标
- 涉及医保政策类型
- 评估视角（医院 / 患者 / 医保）

## 推荐工作流 / Recommended Workflow

1. 确定分析视角与时间窗
2. 归集成本项（直接 / 间接）
3. 选择效果指标（含中医特色指标）
4. 计算成本—效果比并做敏感性分析
5. 给出政策解读与建议

## 产出 / Outputs

- 成本—效果分析
- 敏感性分析
- 政策解读与建议

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/legals/insurance/coverage` | 医保报销口径 |
| `/legals/insurance/estimate` | 费用估算 |
| `/legals/insurance/drug` | 医保药品分类 |

- **所属领域**：D08（中医管理）
- **六者角色**：regulator、legal
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
