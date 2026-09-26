# 与 tcmP 平台对接契约

> 版本 v0.1.0 ｜ **本文件是 agent-tcmedu-skills 与 tcmP 平台之间的唯一接口契约。**
> 任何一侧的接口变更都必须同步本文件，并使本亚项目小版本号 +1。

---

## 一、契约总则

| 项 | 约定 |
| --- | --- |
| 依赖方向 | 本亚项目 **只读消费** 平台；平台不依赖本亚项目 |
| 数据下沉 | 平台数据（图谱 / 教材 / 患者 / 密钥）**不得**进入本仓 |
| 契约载体 | 本文件 + `scripts/skills.spec.mjs` 的 `PLATFORM_APIS` 登记表 |
| 强制校验 | 技能声明的 `platform_apis` 必须是 `PLATFORM_APIS` 中已登记的键，否则 `npm run build` 直接失败 |
| 平台地址 | `https://www.zyyywaccn.com.cn`（SSL 至 2026-09-01）；服务入口 `sage-api`，监听 8300 |
| 平台实现 | `~/textbook-project/sage-api/main.py` |

---

## 二、接口清单

### 2.1 基础与医圣人格（v2.0 实测路由）

| 端点 | 方法 | 用途 | 使用技能 |
| --- | :-: | --- | --- |
| `/health` | GET | 服务健康检查、已加载人格数、版本 | `doctor` 体检 |
| `/sages` | GET | 医圣人格清单（张仲景 / 孙思邈） | `sage-mentorship`、`sage-growth-path` |
| `/consult/{sage_id}` | POST | 医圣咨询：主诉 + 症状 + 舌脉 → 辨证建议 | `role-healer` |
| `/teach/{sage_id}` | POST | 医圣授课：主题 + 学员层级 + 时长 → 分层讲解 | `sage-mentorship`、`role-healer` |
| `/analyze-case/{sage_id}` | POST | 医圣视角病案分析 | `sage-mentorship`、`role-healer` |

**`/consult` 请求体（实测）**

```json
{
  "user_role": "healer",
  "sage_id": "sage-zhang-zhongjing",
  "user_level": "住院医-1",
  "chief_complaint": "…",
  "key_symptoms": ["…"],
  "tongue": "…",
  "pulse": "…",
  "context": "…"
}
```

**`/teach` 请求体（实测）**

```json
{
  "sage_id": "sage-zhang-zhongjing",
  "topic": "少阳病辨治",
  "student_level": "住院医-1",
  "duration_minutes": 30,
  "focus": "…"
}
```

### 2.2 病证知识图谱

| 端点 | 方法 | 用途 | 使用技能 |
| --- | :-: | --- | --- |
| `/kg/query` | GET | 病证知识图谱检索（以病索证 / 以证溯病） | `tcm-kg-query`、`tcm-case-dialectics`、`role-healer`、`tcm-residency-training`、`sage-growth-path` |
| `/kg/detail/{dsu_id}` | GET | 病证单位（DSU）详情 | `tcm-kg-query`、`tcm-case-dialectics` |
| `/kg/stats` | GET | 图谱规模统计 | `tcm-kg-query`、`sage-growth-path`、`tcm-residency-training` |

### 2.3 六者端点组

| 角色 | 端点 | 使用技能 |
| --- | --- | --- |
| 患者 | `/patients/symptom-check`、`/patients/triage`、`/patients/medication` | `role-patient` |
| 药者 | `/pharmacists/review`、`/pharmacists/interaction`、`/pharmacists/substitute`、`/pharmacists/inventory`、`/pharmacists/trace` | `role-pharmacist`、`tcm-herb-processing` |
| 械者 | `/devices/maintenance`、`/devices/imaging`、`/devices/procurement`、`/devices/qc`、`/devices/trace`、`/devices/emergency` | `role-device` |
| 规者 | `/regulators/quality`、`/regulators/scheduling`、`/regulators/utilization`、`/regulators/dispatch`、`/regulators/dashboard` | `role-regulator`、`tcm-quality-control` |
| 法者 | `/legals/risk`、`/legals/consent`、`/legals/regulation`、`/legals/cases`、`/legals/prevention`、`/legals/insurance/coverage`、`/legals/insurance/drug`、`/legals/insurance/estimate` | `role-legal`、`tcm-medical-insurance` |

> 医者（核心枢纽）不单设端点组，而是复用 `/consult` `/teach` `/analyze-case` + `/kg/*`。

### 2.4 v3.0 平台新增

| 端点 | 用途 | 使用技能 | 备注 |
| --- | --- | --- | --- |
| `/icd/*`（三端点） | ICD-11 编码桥接 | `tcm-icd11-coding` | 走内网镜像 `192.168.0.111:8080`，零外网依赖 |
| `/diag` | 病证单元推理 | `tcm-dsu-retrieval`、`tcm-case-dialectics`、`role-healer` | v3.0 新增 |
| `/bianzheng` | 辨证推理 | 同上 | v3.0 新增 |
| `/semantic-search` | 语义检索（TF-IDF + FTS5 + RRF） | `tcm-dsu-retrieval` | 内网零 token |
| `/rag` | RAG 精修问答 | `tcm-dsu-retrieval` | 需检索出处 |
| `/agents/*`（三端点） | 六者 SOUL 智能体注册与查询 | `tcm-soul-agent-forge` | v3.0 新增 |

> 线上版本为 **v3.0（45 端点）**；主仓内 `sage-api/main.py` 为 **v2.0（35 路由）**。本契约以线上 v3.0 为准，v2.0 路由为已验证基线。

---

## 三、教材与领域编码映射

| 领域 | 院系 | 教材前缀 | 规范文件（主仓） |
| :-: | --- | :-: | --- |
| D01 | 中医学院 | `CM-` | `domain-specs/DOMAIN_SPEC_D01.md`（28 学科 / 32 教材） |
| D02 | 中药学院 | `MM-` | `DOMAIN_SPEC_D02.md`（20 学科 / 24 教材） |
| D03 | 针灸学院 | `AT-` | `DOMAIN_SPEC_D03.md`（12 学科 / 14 教材） |
| D04 | 推拿学院 | `TU-` | `DOMAIN_SPEC_D04.md`（10 学科） |
| D05 | 骨伤学院 | `OR-` | `DOMAIN_SPEC_D05.md` |
| D06 | 五官口腔学院 | `ENT-` | `DOMAIN_SPEC_D06.md`（10 学科 / 10 教材） |
| D07 | 中医智能学院 | `AI-` | `DOMAIN_SPEC_D07.md` + `ai-curriculum/` |
| D08 | 中医管理学院 | `MG-` | `DOMAIN_SPEC_D08.md`（14 学科 / 14 教材） |

学科编号格式：`D{NN}-S{NN}`（如 `D01-S01` 中医基础理论）。

---

## 四、离线降级策略

平台可达性是运行时约束，技能必须在**不可达**时保持诚实：

| 情形 | 行为 |
| --- | --- |
| `platform_apis` 为空的技能 | 完全离线可跑，无需任何降级 |
| `standalone_support: needs_platform` | 平台不可达时**拒绝给出平台相关结论**，明确告知需要平台，不得凭记忆补齐 |
| 平台部分可达 | 逐端点降级：可用端点照常调用，不可用端点在结论中标注「未能核实（端点 /xxx 不可达）」 |
| ICD-11 端点 | 内网镜像不可达时，只输出候选病名，不输出编码 |

**前端实现建议**：调用前先打 `/health`，失败则进入降级模式并提示用户。

---

## 五、安全与合规边界

| 规则 | 说明 |
| --- | --- |
| 不输出处方剂量 | 所有面向患者的输出（`role-patient`、`tcm-photo-question`）一律不给出具体剂量 |
| 携带边界声明 | 患者端输出必须声明「不构成诊断」并给出就医紧急度 |
| 红旗症状 | 涉及急症的技能（`tcm-pediatrics`、`tcm-acupuncture-technique`、`role-patient`）必须列出需立即就医的信号 |
| 不替代责任人 | 医者 / 药者 / 法者 / 械者 / 规者的输出一律标注「不替代医师/药师/律师/工程师/管理者本人的决策与签字」 |
| 无密钥入库 | 本仓不含任何平台密钥；调用凭据由运行时环境提供 |

---

## 六、接口变更流程

```
平台侧接口变更
      │
      ▼
① 更新本文件（docs/02-与tcmP平台对接契约.md）
      │
      ▼
② 若新增端点 → 在 scripts/skills.spec.mjs 的 PLATFORM_APIS 登记
      │
      ▼
③ 更新受影响技能的 platform_apis
      │
      ▼
④ npm run verify   （未登记的端点会被 build 直接拦截）
      │
      ▼
⑤ 本亚项目版本号 +1（patch 或 minor），更新 CHANGELOG.md
```

**反向流程**：本亚项目**不**向平台提需求变更之外的动作；若技能实现发现平台缺端点，写进 `04-路线图.md` 的「平台侧待办」，由主仓决策。
