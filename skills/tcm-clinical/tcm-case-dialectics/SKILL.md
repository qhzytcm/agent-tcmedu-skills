---
name: "tcm-case-dialectics"
description: "拉取平台病证单位（DSU）真实病案，做「以病索证 / 以证溯病」的双向辨证对抗训练。 依赖 tcmP 平台接口，离线不可用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["病案","DSU","以病索证","以证溯病"]
    source: agent-tcmedu-skills
    category: "tcm-clinical"
    domain: "D01"
    stages: ["本科","规培"]
    subjects: ["中医临床综合"]
    abilities: ["双向辨证","病证检索"]
    scenarios: ["综合演练","规培演练"]
    platform_apis: ["/kg/query","/kg/detail/{dsu_id}","/diag","/bianzheng"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["训练方向（以病索证 / 以证溯病）","病种或证型关键词","难度与题量"]
---

# 病案辨证实训 Skill

课堂病案经过简化，真实病案信息冗余且干扰项多。本 Skill 直接调用 tcmP 图谱的病证单位，做带评分标准的双向检索训练。

## 最适合 / Best For

- 临床课程后的综合演练
- 规培阶段的高频病证覆盖
- 中医智能方向的数据理解实训

## 不适合 / Not For

- 替代真实接诊
- 在离线环境下使用（需平台可达）

## 使用前请准备 / Inputs

- 训练方向（以病索证 / 以证溯病）
- 病种或证型关键词
- 难度与题量

## 推荐工作流 / Recommended Workflow

1. 调用 /kg/query 检索病证单位
2. 隐藏标准答案后给出病案描述
3. 学习者提交辨证结论
4. 对照 DSU 标准答案逐项评分
5. 生成错题并建议下一轮病证范围

## 产出 / Outputs

- 病案题面
- 逐项评分表
- 错题清单与下一轮范围

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/kg/query` | 病证知识图谱检索 |
| `/kg/detail/{dsu_id}` | 病证单位（DSU）详情 |
| `/diag` | 病证单元推理（v3.0 新增） |
| `/bianzheng` | 辨证推理（v3.0 新增） |

- **所属领域**：D01（中医临床各科）
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
