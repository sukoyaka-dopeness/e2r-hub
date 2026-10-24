# Hub Ko-fi Home — bounded Human acceptance and evidence

Recorded: 2026-10-24 JST

Current acceptance status: **HUB-KOFI-HOME1 HUMAN ACCEPTED / CLOSED (BOUNDED) / PUBLICATION NOT AUTHORIZED**. The earlier preparation checkpoint was **READY FOR FORMAL HUMAN ACCEPTANCE DECISION**; the later Human decision is recorded below. The local Commit was authorized separately in HUB-KOFI-HOME1-LOCAL-COMMIT1.

## Candidate and authority

HUB-KOFI-HOME1 implements the [Human-adopted Ko-fi Home direction](https://github.com/sukoyaka-dopeness/e2r-spec/blob/0da7f6abcc31e69f89fb884c911b8a7efffc462f/docs/roadmap.md#human-decision-ko-fi) within Hub only. The adopted destination is <https://ko-fi.com/sukoyaka_dopeness>. The link is a secondary support action at the bottom of Home, directly below GitHub Sponsors and below the application, Gallery, Dataset, and documentation actions.

The local base HEAD is `cdcd75ff812f15ea2bdf4a9a0bdc6803bd340c65`. HEAD alone does not identify this uncommitted candidate. The reviewed implementation consists of the following working-tree changes, with SHA-256 hashes recorded for the files at this checkpoint:

| File | Candidate change | Working-file SHA-256 |
| --- | --- | --- |
| `src/App.tsx` | Ko-fi URL; EN/JA copy; support link after GitHub Sponsors | `7D90527A85E9D50002275D54486BDBCC18DB5CFFF2066DE49EA559A5A849D461` |
| `src/App.css` | Vertical support-link grouping and visible keyboard focus | `B7634FE96756EABFFE0377CD0BF15C36D6E8DFE0BDE416C9DF70F9826E279771` |
| `tests/appUiIntegration.test.ts` | EN/JA copy, destination, order, and external-link attributes | `540D176421946D19E2BBAD1A512FF88165AD7A8BAA9F00CEEB58097B35C4CC5D` |

The existing `ExternalLink` component supplies `target="_blank"` and `rel="noreferrer"`. No Dataset, Handoff, storage, payment, Credits metadata, or application-version behavior changed.

## Separate evidence

| Evidence source | Result and scope |
| --- | --- |
| Source and local delivery | The diff is limited to the three files above. The local Vite URL `http://127.0.0.1:4185/e2r-hub/` returned HTTP 200; its served `App.tsx` contained the Ko-fi URL and both locale strings. These checks are not browser interaction evidence. |
| Automated verification | Re-run for this decision preparation: Tests **7/7 PASS**, Lint **PASS**, Build **PASS**, and `git diff --check` **PASS**. The Home integration test checks the EN/JA wording, URL, Sponsors-first order, and new-tab attributes. It does not prove responsive geometry or actual keyboard navigation. |
| Human Browser Review | Human reports **6/6 PASS** for the local candidate: (1) Ko-fi directly below Sponsors in EN/JA; (2) no clipped text or unnatural placement at reviewed ordinary and narrow widths; (3) lower visual priority than primary actions; (4) Tab reachability and visible focus; (5) Enter opening the correct Ko-fi page in a new tab; and (6) working locale switch and Credits. The browser name, profile, exact viewport widths, and other environment details were not supplied. |
| Codex Browser Review | **NOT PERFORMED.** The available Edge connection was labelled “プロファイル 1” and could not be established as an isolated review profile; a separate in-app Browser tab was unavailable. Codex did not operate the existing personal browser tabs or substitute HTTP/DOM results for browser evidence. |

The Human report is direct browser evidence for its six stated checks. It does not turn the automated checks into Human observations, or the unperformed Codex Browser check into a PASS.

## Preparation proposal and exclusions

At the preparation checkpoint, the evidence supported a **recommended bounded Formal Human Acceptance** of the local Hub Home Ko-fi presentation and interaction described by the six Human checks. Formal Acceptance was **PENDING** at that checkpoint. The subsequent Human decision below resolves that pending decision within the same scope.

This proposal does not establish all-browser or all-width compatibility; comprehensive Sample Gallery, Handoff, Dataset acquisition, storage, or replacement safety; continuing Ko-fi availability; donation or payment behavior; Hub-wide new Product Acceptance; a new application release; or Ko-fi implementation in LiaisonScape or another app.

The existing published Hub `0.3.0` [bounded Formal Publication Closure](hub-0.3.0-public-https-handoff-bounded-acceptance-2026-10-22.md) and earlier local Human acceptances remain separate and unchanged. At this preparation checkpoint, the Ko-fi candidate was not yet committed or published.

## Formal Human decision — 2026-10-24 JST

In **E2R — HUB-KOFI-HOME1-FORMAL-ACCEPTANCE1**, Human expressly accepted the six reported local Browser Review results above and decided **HUB-KOFI-HOME1 HUMAN ACCEPTED / CLOSED (BOUNDED)**. Before recording this decision, the local HEAD and the SHA-256 hashes of all three candidate files were rechecked and matched the preparation checkpoint. The accepted subject is this uncommitted local candidate, not every possible future change to these paths.

The decision covers EN/JA placement directly below GitHub Sponsors; the reviewed ordinary and narrow presentations; lower prominence than primary actions; Tab reachability and visible focus; Enter opening the correct Ko-fi URL in a new tab; and non-interference with the reviewed locale switch and Credits controls. Human reported these six PASS results. Codex did not perform a Browser check, and automated PASS remains separate evidence.

The exclusions above remain in force. This decision does not extend the published Hub `0.3.0` Closure, accept Gallery or Handoff behavior anew, authorize payment activity, accept another E2R app, establish a new release, or publish this candidate.

## Remaining Human gates

1. The exact four-file local Commit scope was separately authorized in HUB-KOFI-HOME1-LOCAL-COMMIT1. That authorization does not cover additional files or history changes.
2. Separately determine release metadata and approve an exact Push range and any resulting CI/Pages deployment and public verification. No publication is implied by this local Human Acceptance or Commit authorization.
