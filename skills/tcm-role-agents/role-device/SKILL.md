---
name: "role-device"
description: "中医诊疗设备的维护、影像辅助、采购论证与质控追溯，打通设备全生命周期。 依赖 tcmP 平台接口，离线不可用。"
version: "0.1.0"
author: qhzytcm
license: MIT
platforms: [windows, linux, macos]
metadata:
  hermes:
    tags: ["械者","设备","影像","采购论证"]
    source: agent-tcmedu-skills
    category: "tcm-role-agents"
    domain: "平台"
    stages: ["继续教育"]
    subjects: ["医疗设备管理"]
    abilities: ["设备维护","采购论证"]
    scenarios: ["设备管理","继续教育"]
    roles: ["device"]
    platform_apis: ["/devices/maintenance","/devices/imaging","/devices/procurement","/devices/qc","/devices/trace","/devices/emergency"]
    quality_tier: "curated"
    standalone_support: "needs_platform"
    public_release: "recommended"
    export_mode: "installable"
    release_channel: "recommended"
    requires_tools: ["context.load","entitlement.check","platform.api_call","workflow.create","memory.write"]
    requires_data: ["设备名称与型号","故障或需求描述","科室与使用场景","（采购）预算与临床需求"]
---

# 械者 Agent Skill

中医医院的设备管理常与临床脱节，采购论证缺临床视角。本 Skill 把四个环节串成一条可追溯链。

## 最适合 / Best For

- 设备科日常维护与质控
- 影像与诊疗设备的辅助判读
- 设备采购论证材料准备

## 不适合 / Not For

- 替代设备厂商的维修资质与责任
- 对影像做最终诊断结论

## 使用前请准备 / Inputs

- 设备名称与型号
- 故障或需求描述
- 科室与使用场景
- （采购）预算与临床需求

## 推荐工作流 / Recommended Workflow

1. 调用 /devices/maintenance 生成维护方案
2. 调用 /devices/imaging 做影像辅助描述
3. 调用 /devices/procurement 生成采购论证
4. 调用 /devices/qc 输出质控指标
5. 调用 /devices/trace 记录全生命周期台账

## 产出 / Outputs

- 维护方案
- 影像辅助描述（非诊断）
- 采购论证与质控台账

## 与 tcmP 平台的对接 / Platform Binding

| 平台接口 | 用途 |
| --- | --- |
| `/devices/maintenance` | 械者设备维护 |
| `/devices/imaging` | 械者影像辅助 |
| `/devices/procurement` | 械者采购论证 |
| `/devices/qc` | 械者设备质控 |
| `/devices/trace` | 械者器械追溯 |
| `/devices/emergency` | 械者应急调度 |

- **所属领域**：平台（六者角色）
- **六者角色**：device
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
