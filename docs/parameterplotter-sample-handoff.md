# Hub → ParameterPlotter sample Handoff

Status: **IMPLEMENTED / AUTOMATED CHECKS PASS / HUMAN BROWSER ACCEPTANCE PENDING**

The Lighthouse Restoration Project, The Ashen Crown, and Cedar Observatory
cards add an `Open ParameterPlotter` action when `VITE_PARAMETER_PLOTTER_URL`
is configured and the card's source is eligible.
The Hub uses its current EN/JA UI locale to select the corresponding
owner-linked Dataset URL and passes that URL plus `locale` through the existing
`datasetUrl` startup fragment convention. The Hub does not proxy, copy, edit,
or persist the Dataset.

Lighthouse continues to use the existing LiaisonScape distribution mirror
URLs; Cedar continues to use NarrativeLine-owned source files. The Ashen Crown
source remains E2R-SPEC-owned. Its ParameterPlotter action requires explicit
EN and JA source overrides because the public E2R-SPEC raw files checked for
this checkpoint do not yet include the locally adopted Dimension Assessment
payload. This prevents the Hub from silently opening a stale revision. No new
source of truth or bundled sample is introduced. Production builds must
configure a deployed HTTPS ParameterPlotter URL before these actions appear.
If no ParameterPlotter URL is configured, the existing NarrativeLine and
LiaisonScape actions remain unchanged.

ParameterPlotter is listed in the Hub documentation section, but no public
EN/JA user-guide URLs were found in its repository. The Hub therefore shows
that the guides are not yet available instead of linking to nonexistent pages.

## Build-time configuration

- `VITE_PARAMETER_PLOTTER_URL`: absolute HTTPS receiving-app URL.
- `VITE_LIGHTHOUSE_DATASET_EN_URL`, `VITE_LIGHTHOUSE_DATASET_JA_URL`:
  optional source overrides for Lighthouse local integration review.
- `VITE_CEDAR_DATASET_EN_URL`, `VITE_CEDAR_DATASET_JA_URL`: optional source
  overrides for Cedar local integration review.
- `VITE_ASHEN_CROWN_DATASET_EN_URL`, `VITE_ASHEN_CROWN_DATASET_JA_URL`:
  explicit source overrides required to enable the Ashen Crown action. Set
  these only when both owner-published language files contain the intended
  Candidate 0.2.0 Dataset revision.

HTTPS is required for configured sources except that Vite development builds
may use HTTP loopback URLs. Credentials and non-HTTP(S) schemes are rejected.
The optional Dataset source overrides support local CORS-enabled fixture
servers for unpublished owner revisions; the public defaults remain the
existing Hub sources. A Hub link does not prove that an unpublished app or
Dataset revision is reachable from a public URL.

At this checkpoint, the Hub deployment workflow does not configure
`VITE_PARAMETER_PLOTTER_URL`; the public ParameterPlotter URL checked returned
404. Public app links therefore remain absent until a separately approved
deployment/configuration change is made. No deployment is part of this work.

## Verification boundary

Automated Hub tests verify route omission when unconfigured, exact selected
Dataset/locale fragment generation when configured, URL safety, and EN/JA
card behavior. ParameterPlotter tests verify parsing, credential omission,
failure handling, fragment preservation, and reuse of the existing Home and
replacement surfaces. The local four-route browser review is a separate
checkpoint. Human Browser Acceptance remains pending; no public deployment or
release is implied.

The local Ashen Crown EN/JA fixture, loopback setup, and focused Human Browser
Review procedure are documented in the [local integration checkpoint](./local-ashen-crown-handoff-and-sample-locale-integration-2026-10-09.md).
