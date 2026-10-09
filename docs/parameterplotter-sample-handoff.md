# Hub → ParameterPlotter sample Handoff

Status: **IMPLEMENTED / AUTOMATED CHECKS PASS / HUMAN BROWSER ACCEPTANCE PENDING**

The Lighthouse Restoration Project and Cedar Observatory cards add an
`Open ParameterPlotter` action when `VITE_PARAMETER_PLOTTER_URL` is configured.
The Hub uses its current EN/JA UI locale to select the corresponding
owner-linked Dataset URL and passes that URL plus `locale` through the existing
`datasetUrl` startup fragment convention. The Hub does not proxy, copy, edit,
or persist the Dataset.

Lighthouse continues to use the existing LiaisonScape distribution mirror
URLs; Cedar continues to use NarrativeLine-owned source files. No new source
of truth or bundled sample is introduced. Production builds must configure a
deployed HTTPS ParameterPlotter URL before those actions appear. If no
ParameterPlotter URL is configured, the existing NarrativeLine and
LiaisonScape actions remain unchanged.

## Build-time configuration

- `VITE_PARAMETER_PLOTTER_URL`: absolute HTTPS receiving-app URL.
- `VITE_LIGHTHOUSE_DATASET_EN_URL`, `VITE_LIGHTHOUSE_DATASET_JA_URL`:
  optional source overrides for Lighthouse local integration review.
- `VITE_CEDAR_DATASET_EN_URL`, `VITE_CEDAR_DATASET_JA_URL`: optional source
  overrides for Cedar local integration review.

HTTPS is required for configured sources except that Vite development builds
may use HTTP loopback URLs. Credentials and non-HTTP(S) schemes are rejected.
The optional Dataset source overrides support local CORS-enabled fixture
servers for unpublished owner revisions; the public defaults remain the
existing Hub sources. A Hub link does not prove that an unpublished app or
Dataset revision is reachable from a public URL.

## Verification boundary

Automated Hub tests verify route omission when unconfigured, exact selected
Dataset/locale fragment generation when configured, URL safety, and EN/JA
card behavior. ParameterPlotter tests verify parsing, credential omission,
failure handling, fragment preservation, and reuse of the existing Home and
replacement surfaces. The local four-route browser review is a separate
checkpoint. Human Browser Acceptance remains pending; no public deployment or
release is implied.
