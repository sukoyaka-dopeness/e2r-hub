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

## Production configuration checkpoint — 2026-10-21

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

## HUB-RC-PREP1 configuration and release boundary — 2026-10-22

The 2026-10-21 unverified-variable statement above is a historical checkpoint.
Authenticated GitHub read-back now confirms that the Hub **repository-level**
Actions variables `E2R_ASHEN_CROWN_DATASET_EN_URL` and
`E2R_ASHEN_CROWN_DATASET_JA_URL` each contain the corresponding published
E2R-SPEC `main/examples/ashen-crown.{en,ja}.e2r.json` HTTPS Raw URL. The
`github-pages` environment has zero environment-level variables. The existing
Pages workflow maps both repository values into the Vite build for its
`github-pages` deployment job. The separate HUB-PROD-CONFIG3 checkpoint
authorized and verified their creation; no variable was changed here.

Hub `0.2.0` remains the published application. The local three-app/Gallery
candidate has bounded formal Human acceptance, and HUB-RC-PREP1 sets its
user-facing Credits Application Version to `0.3.0`. The private package and
lockfile stay at internal version `0.0.0`. Credits First release remains
`2026-08-18`. Its current `Updated: 2026-10-01` is the prior published date,
**not** a claim about a future `0.3.0` deployment. Before final release
approval, set Updated to the actual planned deployment date in JST, verify
the resulting source and new commit SHA, and obtain Human approval of the
exact publication range and ordinary push. A push to `main` automatically
starts the existing Pages workflow; the workflow runs lint and build but
does not run the test suite.

HUB-RC-PREP1 local verification passed: 7/7 tests (including EN/JA Credits
version/date and modal operation assertions), lint, ordinary build, and a
production-shaped build with the exact published ParameterPlotter and Ashen
EN/JA URLs. The built JS contains `E2R Hub 0.3.0` and all three configured
HTTPS URLs. These are local automated and build results, not new Human Browser
acceptance or proof of a GitHub-hosted production build. No new GitHub Pages
deployment or public Hub-origin HTTPS Handoff has occurred. The configured
build inputs alone do not prove that the next deployed Gallery action or
Handoff works over public HTTPS. Publication, post-deployment verification,
and formal closure remain separate gates.

## HUB-RC-FINAL1 local date checkpoint — 2026-10-22

Human selected `2026-10-22` JST as the planned Hub `0.3.0` deployment date.
The local candidate now displays Credits Application `E2R Hub 0.3.0`, First
release `2026-08-18`, and Updated `2026-10-22` in EN and JA. Updated is planned
release metadata, **not** evidence that deployment has succeeded. If the
deployment moves to `2026-10-23` JST or later, its date and candidate SHA
require a separate Human decision before publication.

Only the two localized Updated values, their two Credits test expectations,
and this record changed after HUB-RC-PREP1. Local verification passed: 7/7
tests, lint, ordinary build, and a production-shaped build using the exact
published ParameterPlotter URL and repository-configured Ashen Crown EN/JA
Raw URLs. The resulting JS contains Hub `0.3.0`, both Credits dates, and all
three HTTPS URLs. The private package and lockfile remain at `0.0.0`. The
existing bounded Human acceptance of Credits focus and the three-app/Gallery
review is unchanged; these automated results do not create new Human Browser
acceptance.

This local checkpoint is a **candidate for Human Go/No-Go**, not publication
authorization. Human must approve the final full SHA and remote-to-candidate
commit range, confirm the planned JST date, and separately authorize the
ordinary `main` push with its automatic Pages deployment and subsequent
public HTTPS verification. The workflow runs lint and build but no tests.
No push, GitHub-hosted production build, Pages deployment, or public
Hub-origin HTTPS Handoff verification was performed in this checkpoint.
