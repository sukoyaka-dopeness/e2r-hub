# Public Sample Source Consistency and Release Readiness

Date: 2026-10-09

Status: **LOCAL SOURCE AUDIT PASS / PUBLIC REVISION AND DEPLOYMENT CHECK PENDING**

This audit compares current owner files, the existing Lighthouse distribution
mirror, the ParameterPlotter bundled Ashen Crown sample, and the URLs configured
in Hub. It does not change Dataset content or claim that current local files
are already published.

## Owner, distribution, and Hub acquisition paths

| Dataset | Owner source (EN / JA) | Distribution copy | Hub Raw URL source | Current local content |
| --- | --- | --- | --- | --- |
| Lighthouse Restoration Project | `e2r-spec/examples/lighthouse-restoration-demo.{en,ja}.e2r.json` | `e2r-liaison-scape/public/lighthouse-restoration-demo.{en,ja}.e2r.json` | LiaisonScape `public/` mirror | 10 Entities, 11 Events, 28 Relations, 5 Dimensions, 31 Assessments |
| Cedar Observatory: An Open Night | `e2r-narrative-line/src/sample/cedar-observatory-showcase.{en,ja}.e2r.json` | None; NarrativeLine owns the served files | NarrativeLine `src/sample/` files | 6 Entities, 12 Events, 28 Relations, 4 Dimensions, 15 Assessments |
| The Ashen Crown | `e2r-spec/examples/ashen-crown.{en,ja}.e2r.json` | ParameterPlotter `samples/ashen-crown.{en,ja}.e2r.json` is a byte-identical bundled copy | E2R-SPEC `examples/` Raw URLs, enabled for ParameterPlotter only when both explicit EN/JA source overrides are supplied | 10 Entities, 12 Events, 57 Relations, 7 Dimensions, 70 Assessments |

All six owner-language files contain Dimension Assessment `specVersion`
`0.2.0`, and the corresponding Specification Extension `uses` entry is also
`0.2.0`. EN/JA pairs share Core object IDs, Dimension IDs, scale constraints,
and Assessment tuples; localized labels and Dataset IDs remain language
specific. Lighthouse E2R-SPEC and LiaisonScape mirror files are byte-identical
for each language. Ashen Crown E2R-SPEC and ParameterPlotter bundled files are
also byte-identical for each language. These checks establish local source and
copy consistency, not public deployment state.

Local SHA-256 evidence:

| File | SHA-256 |
| --- | --- |
| E2R-SPEC Lighthouse EN / LiaisonScape mirror EN | `5bea5e0c7801d37a67d1ae2a2486f3d2123b21df01b9f679bb374c767d2b3d5c` |
| E2R-SPEC Lighthouse JA / LiaisonScape mirror JA | `0dd2b56a65a7e0d6aca1e9cd3866d1aa16d388c16313b51b1a7a8d706efcb4df` |
| NarrativeLine Cedar EN | `f5b6a281ab63f19d8194e4502cc4e46f734de22c1ab4dd855b054d234e817ffd` |
| NarrativeLine Cedar JA | `e0823a721b2778222ea5343bcfc69debb653706242e11e67d9b6052dff5f41c9` |
| E2R-SPEC Ashen Crown EN / ParameterPlotter bundle EN | `044187116106ce27178eb2457df8f0dad3ee68d6bb656800bede68900e306552` |
| E2R-SPEC Ashen Crown JA / ParameterPlotter bundle JA | `745d3d293cc07cd84e076090d8f152deea69c5818f535f2cf9e9cbc51c65ec2f` |

Hub's configured owner paths remain unchanged:

- Lighthouse EN/JA: `raw.githubusercontent.com/.../e2r-liaison-scape/main/public/lighthouse-restoration-demo.{en,ja}.e2r.json`.
- Cedar EN/JA: `raw.githubusercontent.com/.../e2r-narrative-line/main/src/sample/cedar-observatory-showcase.{en,ja}.e2r.json`.
- Ashen Crown EN/JA: `raw.githubusercontent.com/.../e2r-spec/main/examples/ashen-crown.{en,ja}.e2r.json`.

Ashen Crown's ParameterPlotter card still requires explicit source overrides
until the owner-published EN/JA files are confirmed to contain the adopted
Candidate 0.2.0 payload. The existing guard prevents opening a stale public
file by default. No sample URL or owner was changed in this audit.

## Public evidence and release order

The configured Raw paths are the expected publication paths, but current
public content could not be reliably checked in this environment. Direct
network requests to `raw.githubusercontent.com` were blocked. The browser
lookup returned cache misses for most owner URLs and an older cached
Lighthouse EN mirror without the current Dimension Assessment payload. That
old cached response is not evidence of the current live origin; it does
reinforce why local file consistency and public revision checks must remain
separate.

The checked-out owner repositories have local commits ahead of their recorded
`origin/main` refs: E2R-SPEC 28, NarrativeLine 5, LiaisonScape 4, and
ParameterPlotter 64. Hub is 4 commits ahead. These local branches are not
proof of GitHub content. No push, deploy, or publication was performed.

After the relevant source changes are separately authorized and pushed:

1. Fetch each unchanged owner Raw URL and verify its exact expected content
   and Candidate/Specification version. Confirm the Lighthouse Raw URLs serve
   the mirror copy that matches E2R-SPEC, and Cedar URLs serve the
   NarrativeLine owner files.
2. Verify the six EN/JA public Dataset variants by the recorded structural
   counts, language-specific Dataset IDs, shared object and Dimension IDs,
   Assessment values, and `0.2.0` declaration/uses pair.
3. Verify Ashen Crown public EN/JA content matches the canonical E2R-SPEC
   files before enabling the Hub ParameterPlotter action; do not use an older
   Raw revision as fallback.
4. Verify the ParameterPlotter GitHub Markdown guide links after the guide
   files are pushed.
5. ParameterPlotter's Pages workflow/build and the Hub's
   `VITE_PARAMETER_PLOTTER_URL` are prepared locally; Pages settings and live
   availability remain unverified. The Hub build reads the Ashen Crown EN/JA
   sources from explicit Actions variables, which must not be populated until
   the owner URLs are checked against the adopted revision.
6. Once a deployed HTTPS app and Dataset origins are configured, verify
   browser CORS, Handoff v0, EN/JA selection, locale preference, error and
   replacement-safety flows in the public environment.

## Acceptance boundary

The existing bounded Human Browser Acceptance for Lighthouse and Cedar
ParameterPlotter sample integration remains accepted only for its documented
views and evidence. It does not accept the complete Hub startup flow, public
sources, all browsers, all editing and export operations, or deployment.
Hub-to-ParameterPlotter Handoff safety, unapplied draft protection, public
HTTPS/CORS, current public Dataset revisions, and Human Browser Acceptance
remain pending. Dimension Assessment Candidate 0.2.0 remains non-Stable.

No publication, deployment, release, or push is authorized by this readiness
audit.

## Deployment-preparation addendum (2026-10-09)

After this audit snapshot, local deployment preparation added the
ParameterPlotter Pages workflow and Hub production build inputs. See
[`parameterplotter-production-handoff-configuration-2026-10-09.md`](./parameterplotter-production-handoff-configuration-2026-10-09.md)
and [`deployment-preparation-push-range-audit-2026-10-09.md`](./deployment-preparation-push-range-audit-2026-10-09.md).
These files supersede the earlier statement above that those configurations
were absent, while preserving its original snapshot and public-evidence
limitations. The configurations remain local and no deployment or public
source verification has occurred.
