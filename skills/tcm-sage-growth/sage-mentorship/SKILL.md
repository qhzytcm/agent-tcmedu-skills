---
name: "sage-mentorship"
description: "调用张仲景 / 孙思邈人格做专题授课与病案点评，按学员层级调整深度。 依赖 tcmP 平台接口，离线不可用。"
version: "0.2.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["医圣","带教","张仲景","孙思邈","SOUL"]
    source: agent-tcmedu-skills
    category: "tcm-sage-growth"
    domain: "平台"
    library_code: "11.1.1.1"
    stages: ["规培","继续教育"]
    subjects: ["中医各家学说"]
    abilities: ["师承教学","流派对比"]
    scenarios: ["师带徒","继续教育"]
    roles: ["healer"]
    level_gate: "住院医-1 起"
    platform_apis: ["/teach/{sage_id}","/analyze-case/{sage_id}","/sages","/consult/{sage_id}"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["主题（如「少阳病辨治」）","学员层级（住院医-1 / 主治医 / 副主任医）","时长与侧重","待点评病案（可选）"]
---

# 医圣带教 Skill

医圣人格若只做问答，就浪费了其学术风格差异。本 Skill 用「人格—主题—层级」三维匹配，让张仲景讲六经、孙思邈讲博采众长。

## 四级目录定位 / Library Position

**四级编码** `11.1.1.1`（篇·章·节·目，横向读即完整编码）

**定位路径** 11 医圣成长 / 01 中医各家学说 / 01 平台与角色 / 01 医圣带教 Skill

> 完整目录见 [`docs/05-四级目录（篇·章·节·目）.md`](../../../docs/05-四级目录（篇·章·节·目）.md)。

## 最适合 / Best For

- 师带徒的专题教学
- 病案的医圣视角点评
- 不同学术流派的对比学习

## 不适合 / Not For

- 把医圣人格当作诊断权威
- 脱离病例的纯风格模仿

## 使用前请准备 / Inputs

- 主题（如「少阳病辨治」）
- 学员层级（住院医-1 / 主治医 / 副主任医）
- 时长与侧重
- 待点评病案（可选）

## 推荐工作流 / Recommended Workflow

1. 按主题选择匹配的医圣人格
2. 调用 /teach/{sage_id} 生成分层讲解
3. （有病案时）调用 /analyze-case/{sage_id} 做点评
4. 提炼可操作的临床要点
5. 布置一道可验证的作业

## 产出 / Outputs

- 分层讲解稿
- 医圣视角病案点评
- 临床要点与作业

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/teach/{sage_id}` | 医圣授课：主题 + 学员层级 → 讲解 |
| `/analyze-case/{sage_id}` | 医圣病案分析 |
| `/sages` | 医圣人格清单（张仲景 / 孙思邈） |
| `/consult/{sage_id}` | 医圣咨询：主诉 + 症状 + 舌脉 → 辨证建议 |

- **所属领域**：平台（医圣成长）
- **六者角色**：healer
- **成长阶段门禁**：住院医-1 起
- **离线可用性**：否（必须平台可达）

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
