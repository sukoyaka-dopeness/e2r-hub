# ParameterPlotter Production Handoff Configuration

Date: 2026-10-09

Status: **LOCAL CONFIGURATION PREPARED / PUBLIC HANDOFF ACCEPTANCE PENDING**

This is the 2026-10-09 production-preparation snapshot. The currently
published application and Dataset state, local Human Review setup, and
remaining Hub production gate are recorded in the
[HUB-3APP-REVIEW1 checkpoint](./local-ashen-crown-handoff-and-sample-locale-integration-2026-10-09.md#hub-3app-review1).

## Production build inputs

The Hub Pages workflow now builds the ParameterPlotter application link with
the expected project URL
`https://sukoyaka-dopeness.github.io/e2r-parameter-plotter/`. This URL follows
the repository's owner/name; GitHub Pages settings and live availability have
not been inspected or changed. The ParameterPlotter deployment must be
authorized and verified before a Hub build is published with the link enabled.

The Ashen Crown ParameterPlotter action continues to require explicit
EN/JA source URLs. The Pages build maps the repository Actions variables
`E2R_ASHEN_CROWN_DATASET_EN_URL` and
`E2R_ASHEN_CROWN_DATASET_JA_URL` to the Vite build variables. Both must be set
to verified HTTPS owner URLs containing the adopted Candidate 0.2.0 Dataset
revision. Empty, missing, or invalid values resolve to no usable source, so the
Ashen Crown ParameterPlotter action remains hidden. Do not point these values
at a stale Raw revision or at an application-specific copy.

The owner URLs remain E2R-SPEC's canonical EN/JA files. This configuration
does not change Dataset ownership, Hub's other sample sources, the locale
request, Recipient-Preference, or replacement safety. The UI locale selects
the corresponding language source and is passed as a request; the receiving
ParameterPlotter may honor a saved explicit locale preference.

Lighthouse and Cedar retain their existing owner-linked URLs and current
build-time defaults. The source-consistency audit records their local owner
content and the public-revision verification gate. Do not interpret this
local workflow configuration as evidence that owner commits have been
published.

## Required publication order (not authorized in this checkpoint)

1. Human separately authorizes and configures GitHub Pages for the
   ParameterPlotter repository, then the app is deployed and its exact HTTPS
   URL is verified.
2. The updated E2R-SPEC EN/JA owner files are published through their
   separately authorized owner-repository change. Fetch both unchanged Raw
   URLs and verify their Candidate 0.2.0 payloads and Specification Extension
   declarations against local canonical files.
3. Set the two Ashen Crown Actions variables only after that source check.
4. Separately authorize and deploy the Hub; verify its built links and all
   production HTTPS/CORS handoffs.

No push, Pages settings change, workflow dispatch, deployment, or publication
was performed for this preparation. The direct four-language handoff review
and local Hub-originated routes do not accept failure, Cancel, unsaved-work
replacement, public CORS, or current public source revisions. Those Human
Browser Acceptance items remain pending.

## Current production configuration boundary — 2026-10-21

ParameterPlotter `0.1.0` is now published at the workflow's configured HTTPS
URL; E2R-SPEC Ashen Crown EN/JA Raw files are published and byte-verified
against their canonical local candidates. The earlier 404 and unpublished Raw
warnings above describe the 2026-10-09 snapshot, not current availability.
GitHub reported zero **repository-level** Actions variables; effective
`github-pages` environment values could not be conclusively inspected because
later API requests were blocked. The current workflow has the ParameterPlotter
application URL, but whether its production build receives explicit Ashen
EN/JA sources is **unverified**. Without both values, the production build
suppresses Ashen's ParameterPlotter action. Confirm the effective values and
obtain separate Human authorization for any needed configuration change.
Local Hub review uses explicit process-only values and does not establish
the deployed Hub's Gallery or production HTTPS/CORS Handoff acceptance.
