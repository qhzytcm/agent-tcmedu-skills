# agent-tcmedu-skills

**An Agent Skill Pack for TCM online education — a sub-project of the tcmP platform.**

Turn Traditional Chinese Medicine education scenarios into discoverable, callable, installable, and exportable capabilities for Hermes Agent and other AI agent runtimes.

`v0.2.0` · `72 Skills` · `12 Categories` · `Four-level catalog (part·chapter·section·item)` · `120 subjects aligned` · MIT

[中文说明](README.md)

---

## What is this

`agent-tcmedu-skills` is the **education capability layer** of the **tcmP Traditional Chinese Medicine online education platform**.

The platform already provides 120 textbooks across 8 domains, a disease–syndrome knowledge graph (60,000+ units), historical physician personas (SOUL), the `sage-api` service, and a six-role agent directory. This sub-project translates those platform capabilities into **agent-executable skills**.

| Question | Answer |
| --- | --- |
| What is it | An open Agent Skill Pack for TCM education, and a tcmP sub-project. |
| Why | Generic agents don't understand TCM textbook systems, syndrome-differentiation paradigms, six-role hospital jobs, or the sage growth path. |
| How | 72 structured `SKILL.md` files encoding textbook sync, syndrome reasoning, platform retrieval, and growth assessment, organized as a four-level catalog. |
| Default runtime | Hermes Agent (via `skills.external_dirs`). |
| Exportable to | Generic flat skill packs (`export generic`). |
| Relation to platform | Read-only consumption of platform APIs and textbook codes. No data, no secrets in this repo. |

> Relationship to [`hermes-edu-skills`](https://gitee.com/devai/hermes-edu-skills): **same architecture, different domain** — the repository paradigm (catalog + `skills/` + validation/export toolchain + CI) is reused, the domain becomes Traditional Chinese Medicine, and a **platform binding layer** is added.

---

## Quick start

```bash
git clone <repo> && cd agent-tcmedu-skills

npm run verify                                       # build + validate (must be all green)
node scripts/agent-pack.mjs list                      # browse 42 skills
node scripts/agent-pack.mjs list tcm-role-agents      # browse by category
node scripts/agent-pack.mjs search 辨证                # keyword search
node scripts/agent-pack.mjs info role-healer          # skill details
node scripts/agent-pack.mjs match "少阳病的经方" --top 5 # natural-language routing
node scripts/agent-pack.mjs ask "制定复习计划"          # match + invoke Hermes

node scripts/agent-pack.mjs install hermes --apply    # wire into Hermes
node scripts/agent-pack.mjs prompt --target ./HERMES.md
node scripts/agent-pack.mjs doctor
node scripts/agent-pack.mjs export generic --target ./dist/agent-skills
```

---

## Categories

| Category | Selector | Domain | Skills |
| --- | --- | :-: | :-: |
| TCM Foundation & Classics | `tcm-foundation` | D01 | 8 |
| TCM Clinical | `tcm-clinical` | D01 | 11 |
| Materia Medica & Formulas | `tcm-materia` | D02 | 10 |
| Acupuncture & Tuina | `tcm-acupuncture` | D03,D04 | 7 |
| Orthopedics, ENT & Stomatology | `tcm-orthopedics` | D05,D06 | 8 |
| TCM Intelligence | `tcm-intelligence` | D07 | 5 |
| TCM Management | `tcm-management` | D08 | 5 |
| Learning Core | `tcm-learning-core` | - | 5 |
| Exam Prep | `tcm-exam-prep` | - | 3 |
| Six-Role Agents | `tcm-role-agents` | platform | 6 |
| Sage Growth | `tcm-sage-growth` | platform | 2 |
| Teacher Tools | `tcm-teacher-tools` | - | 2 |

22 skills are platform-bound; 50 work fully offline.

Full skill list: [`docs/05-四级目录（篇·章·节·目）.md`](docs/05-四级目录（篇·章·节·目）.md) · Machine-readable: [`catalog.json`](catalog.json)

---

## Four-level catalog (篇·章·节·目)

| Level | Name | Value | Scale |
| :-: | --- | --- | :-: |
| L1 篇 | Category | the 12 categories | **12** |
| L2 章 | Discipline | skill's primary subject | **57** |
| L3 节 | Capability family | 9 derived families | **61** |
| L4 目 | Skill | one skill = one executable teaching workflow | **72** |

Codes are plain numbers read horizontally, mirroring the tcmP textbook four-level code convention (e.g. `1.2.1.1`).

---

## Subject coverage (tcmP 120 subjects)

**55 / 120 (45.8%)** covered. Per-subject detail and gap list: [`docs/06-学科覆盖矩阵.md`](docs/06-学科覆盖矩阵.md).

Extension principle: **not one skill per subject** — uncovered subjects are first attached to existing skills via parameterization; a new skill is added only when the teaching workflow itself differs.

---

## Architecture

```
① tcmP platform (existing)       ② agent-tcmedu-skills (this repo)     ③ Agent runtime
   sage-api / knowledge graph /       skills/<cat>/<slug>/SKILL.md          Hermes Agent
   sage SOUL / 120 textbooks    ←read-only→  catalog.json / discovery idx   other agent tools
   ICD-11 intranet mirror / 6 roles  build · validate · install · export    mobile app
```

### Single source of truth

```
scripts/skills.spec.mjs      ← the only file you edit by hand
        │  npm run build
        ▼
skills/**/SKILL.md  +  catalog.json  +  .well-known/skills/index.json
        │  npm run validate
        ▼
consistency · frontmatter · secret scan · spec sync
```

Generated artefacts are never hand-edited; CI fails if they drift from the spec.

### Repository layout

```text
agent-tcmedu-skills/
├── scripts/skills.spec.mjs     ★ single source of truth
├── scripts/build-pack.mjs      generator
├── scripts/validate.mjs        validator
├── scripts/agent-pack.mjs      CLI (9 commands)
├── skills/<category>/<slug>/SKILL.md   ← generated
├── catalog.json                        ← generated
├── .well-known/skills/index.json       ← generated
├── docs/   00 overview · 01 capability map · 02 platform contract · 03 naming spec · 04 roadmap
├── .github/workflows/validate.yml      CI
└── HERMES.md                           ← generated startup prompt
```

---

## Platform binding

| Layer | Binding |
| --- | --- |
| Textbooks | `textbookCodes` (`CM-` `MM-` `AT-` `TU-` `OR-` `ENT-` `AI-` `MG-`) referencing tcmP `domain-specs/` |
| Disease–syndrome | `/kg/query`, `/kg/detail`, `/diag`, `/bianzheng` (DSU retrieval) |
| Retrieval | `/semantic-search` + `/rag` (TF-IDF + FTS5 + RRF, **zero token cost on intranet**) |
| Six roles | Six endpoint groups bound 1:1 to six role skills |
| Sage personas | `/sages`, `/consult/{sage_id}`, `/teach/{sage_id}`, `/analyze-case/{sage_id}` |
| Coding | `/icd/*` (intranet mirror, no external dependency) |
| Agents | `/agents/*` (six-role SOUL registration) |

**Offline degradation**: when the platform is unreachable, skills must mark conclusions as "unverified" rather than filling gaps from memory. See [`docs/02-与tcmP平台对接契约.md`](docs/02-与tcmP平台对接契约.md).

---

## Safety and boundaries

- Every conclusion must be traceable to a textbook chapter, a disease–syndrome unit, or a platform API response.
- Patient-facing outputs must carry a boundary statement and a care-seeking prompt, and must never include prescription dosages.
- All skills are **educational aids**; they do not replace the judgement and signature of physicians, pharmacists, lawyers, engineers, or administrators.
- `npm run validate` blocks secrets (keys, tokens, passwords, private keys) from entering public content.

See [`SECURITY.md`](SECURITY.md).

---

## Roadmap

| Milestone | Version | Goal |
| :-: | :-: | --- |
| M0 | **v0.1.0** ✅ | Working skeleton, closed toolchain (42 skills / 12 categories) |
| M1 | v0.2.0 | Wire into Hermes; routing Top-3 accuracy ≥ 80% |
| M2 | v0.5.0 | Complete the subject-sync layer (D01–D06); ≥ 60 skills |
| M3 | v0.8.0 | Two-way platform loop: call telemetry + feedback |
| M4 | v1.0.0 | Systematically support the tcmP platform (three complete layers + release channels) |

Details: [`docs/04-路线图.md`](docs/04-路线图.md)

---

## License

MIT — see [LICENSE](LICENSE).
