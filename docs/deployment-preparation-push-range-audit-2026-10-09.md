# Deployment Preparation Push-Range Audit

Date: 2026-10-09

Status: **LOCAL READ-ONLY BRANCH AUDIT / NO PUSH AUTHORIZED**

The following snapshots compare each checked-out `main` with its locally
recorded `origin/main`. No fetch was performed, so those tracking refs may be
stale and are not asserted to match GitHub's current branch tips. A push of
each `main` would transmit the complete listed commit range, not only sample
files or the current deployment-preparation diff. Existing uncommitted and
untracked work is not included in an ordinary branch push.

| Repository | Local HEAD at audit | Recorded `origin/main` | Ahead | Full range content |
| --- | --- | --- | ---: | --- |
| ParameterPlotter | `38a1a6bdd731e2e16f3df825dabcb584689116ec` | `785e70177975d682ce0e97bb97636f978d6362f2` | 65 | 110 files, +11,212 / -163. Includes the app implementation history, vendored Validator, Candidate 0.2.0 support, Ashen Crown bundled data, multiple accepted and pending UI checkpoints, Startup Handoff, guides, and readiness evidence. The new Pages preparation commit is additional to this audited range. |
| Hub | `cc7db8c15eca3a0627755889c3f054393c9e5f0f` | `a588cb9342064ec21d1de21cab466bcaac97beab` | 5 | 11 files, +648 / -30. Includes ParameterPlotter app/sample links, local Ashen Handoff fixture and implementation, guide links, tests, and readiness documentation. The new production configuration/audit commit is additional to this range. |
| E2R-SPEC | `592df62d4b3adfdd03c05510caa3e807dab16e45` | `5239004330214c731edd6e96f17e9fd8bf514881` | 28 | 32 files, +5,522 / -25. Includes Candidate 0.2.0 specification/schema and validator scripts, canonical Ashen Crown and Lighthouse datasets, approvals/provenance, Roadmap, Research, and session evidence. This is a broad specification/content publication range, not a deployment-only change. |
| NarrativeLine | `f495810244a2f33d06d46fe984d15c1f74a7917f` | `eb583720df89797a1acf682b5cea747bc25e0cc6` | 5 | 17 files, +457 / -24. Includes Cedar EN/JA sample revisions and adoption records as well as More-menu/UI and documentation changes. |
| LiaisonScape | `02003efac11a4476c013d6c86adf7c8dacb6e6ce` | `b93e9762ca2baa7e29d0dac4b99bb27970f4b618` | 4 | 6 files, +527 / -2. Includes Lighthouse EN/JA distribution mirrors plus Cross-App More-menu styles, tests, and records. |
| ai-knowledge | `6837a4d9585524058a91371150de8ffd6a9ffcac` | `b060bbaeb0d9a49341663d45c56af23227ef8842` | 15 | 20 files, +724 / -8. Includes multiple decisions, hypotheses, playbooks, and index updates, not only deployment guidance. |

At the same snapshot, the worktrees also contained independent local changes:

- ParameterPlotter: untracked `.github/FUNDING.yml` (preserved).
- E2R-SPEC: staged Handoff-review documentation, modified Roadmap and
  Research files, and untracked decision/research/work material (preserved).
- LiaisonScape: two untracked temporary JSON files and an experimental
  spacing-inspection directory (preserved).
- ai-knowledge: staged and unstaged `INDEX.md` changes, a modified browser
  diagnostic playbook, and an untracked hypothesis (preserved).
- Hub and NarrativeLine were clean at that snapshot.

The deployment-preparation commits are local only. Before any future push,
refresh remote state through an authorized network operation and review the
entire then-current range. In particular, pushing E2R-SPEC, NarrativeLine,
LiaisonScape, or ai-knowledge would publish content beyond this Hub/Pages
preparation. This audit authorizes no push, tag, release, deployment, or
publication.
