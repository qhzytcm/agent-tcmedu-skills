# 发布说明

## 发布前检查

```bash
npm run verify        # build + validate，必须全绿（BUILD_EXIT=0 / VALIDATE_EXIT=0）
node scripts/agent-pack.mjs doctor
node scripts/agent-pack.mjs list | tail -5
git status --porcelain   # 必须为空（生成物已全部提交）
```

## 版本号规则

| 变更 | 版本位 | 示例 |
| --- | :-: | --- |
| 新增技能 / 新增分类 / 契约新增端点 | minor | 0.1.0 → 0.2.0 |
| 修正技能内容 / 文档 / 路由调优 | patch | 0.1.0 → 0.1.1 |
| 仓库结构不兼容变更（目录 / 字段重命名） | major | 0.x → 1.0.0 |

> **契约联动**：任何对 `docs/02-与tcmP平台对接契约.md` 的修改都必须使版本号 +1。

## 发布步骤

```bash
# 1. 更新版本号（三处必须一致）
#    - package.json 的 version
#    - scripts/skills.spec.mjs 的 PACK.version
#    - CHANGELOG.md 增加对应条目
npm run verify

# 2. 提交
git add -A
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z

# 3. 分发（三选一或全选）
npm publish                                      # 发布到 npm
git push origin main --tags                      # 推送源码

# 3b. 离线分发（内网部署场景）
node scripts/agent-pack.mjs export generic --target ./dist/agent-skills
#    压缩 dist/agent-skills 交付；目标机解压后接入其 Agent 的 Skill 目录
```

## 离线 / 内网发布

本亚项目的目标环境之一是**无外网的中医药内网**（平台 ICD-11 亦走内网镜像）。离线发布流程：

1. 在有网机器执行 `npm run export:generic`；
2. 打包 `dist/agent-skills/`（含 `AGENT_SKILL_PACK.json` 清单）；
3. 内网机器解压，将各 `<skill-name>/SKILL.md` 放入目标 Agent 的技能目录，或在本仓执行 `install hermes --apply` 指向本地路径。

## 分发点备忘

| 分发点 | 用途 |
| --- | --- |
| 本地开发机 `192.168.0.105` | 主开发与构建 |
| 内网服务器 | 离线技能包投放 |
| 云端 `www.zyyywaccn.com.cn` | 平台侧在线服务 |

> 具体凭据与地址由运维侧维护，**不写入本仓**。
