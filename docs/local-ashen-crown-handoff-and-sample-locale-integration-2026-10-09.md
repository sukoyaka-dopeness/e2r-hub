# Local Ashen Crown Handoff and Sample Locale Integration

Status: **IMPLEMENTED / AUTOMATED CHECKS PASS / HUMAN BROWSER ACCEPTANCE PENDING**

The setup and publication assumptions below describe the 2026-10-09
checkpoint. For the current three-app/Gallery review environment and Human
procedure, use [HUB-3APP-REVIEW1](#hub-3app-review1).

This local integration checkpoint connects the Hub's existing Ashen Crown
card to ParameterPlotter using the existing Startup Handoff v0 fragment. It
also makes the existing ParameterPlotter Home sample action choose the
E2R-SPEC-owned Ashen Crown Dataset matching its current UI language. It does
not change the general Handoff contract, public source URLs, app deployment,
or Dataset ownership.

## Local fixture and URLs

The optional `scripts/serve-local-ashen-fixture.mjs` serves only the EN and JA
Ashen Crown JSON files from the sibling E2R-SPEC `examples` directory. It
defaults to loopback port `4192`, reads current local canonical files, sends
no-store and `nosniff` headers, and grants CORS only to the configured
ParameterPlotter origin (`http://localhost:4185` by default). It is a
development fixture, not a production server or publication path.

For this setup, run the fixture on `http://127.0.0.1:4192`, Hub/Vite on
`http://127.0.0.1:4191/e2r-hub/`, and use the existing ParameterPlotter local
server at `http://localhost:4185/`. Configure the Hub development process
with:

```text
VITE_PARAMETER_PLOTTER_URL=http://localhost:4185/
VITE_ASHEN_CROWN_DATASET_EN_URL=http://127.0.0.1:4192/ashen-crown.en.e2r.json
VITE_ASHEN_CROWN_DATASET_JA_URL=http://127.0.0.1:4192/ashen-crown.ja.e2r.json
```

In a fixture terminal from the Hub repository, run:

```powershell
node scripts/serve-local-ashen-fixture.mjs
```

In a separate Hub terminal, configure and run:

```powershell
$env:VITE_PARAMETER_PLOTTER_URL='http://localhost:4185/'
$env:VITE_ASHEN_CROWN_DATASET_EN_URL='http://127.0.0.1:4192/ashen-crown.en.e2r.json'
$env:VITE_ASHEN_CROWN_DATASET_JA_URL='http://127.0.0.1:4192/ashen-crown.ja.e2r.json'
npm.cmd run dev -- --host 127.0.0.1 --port 4191 --strictPort
```

The EN/JA public raw E2R-SPEC URLs remain unchanged and may not yet contain
the locally committed Candidate 0.2.0 update. The Hub continues to suppress
the Ashen Crown ParameterPlotter action when explicit local sources are not
configured. Existing NarrativeLine and LiaisonScape actions remain available.

## Human Browser Review procedure at 2026-10-09 checkpoint (historical)

Use an Edge InPrivate window and disposable browser-local state. Start the
local fixture and the Hub with the configuration above; confirm the
ParameterPlotter server responds at `http://localhost:4185/`, the Hub at
`http://127.0.0.1:4191/e2r-hub/`, and both fixture JSON paths return the local
canonical EN/JA files.

1. In Hub English, open the Ashen Crown card in ParameterPlotter. Confirm the
   English Dataset title, Candidate 0.2.0, 7 Dimensions, and 70 Assessments.
2. Switch Hub to Japanese and use the card again. Confirm the Japanese title
   and Dimension text, with the same IDs, ranges, and assessment values.
3. In two fresh InPrivate contexts, open ParameterPlotter with `#locale=ja`
   and `#locale=en` respectively. On Home, use “Open Sample Dataset · The
   Ashen Crown”; confirm that Japanese UI opens the JA Dataset and English UI
   opens the EN Dataset.
4. For a fetch failure, open
   `http://localhost:4185/#datasetUrl=http%3A%2F%2F127.0.0.1%3A4199%2Fmissing.json&locale=en`
   in a disposable context and confirm the error is shown without replacing
   any existing Dataset. Then repeat from a disposable active Dataset and
   confirm it remains available after the failed request.
5. To check Cancel and unsaved-work protection, export a disposable baseline,
   make a visible edit without accepting loss, and open a configured Hub
   Handoff. Cancel the replacement prompt and confirm the active unsaved
   Dataset remains. Do not choose a discard action unless the disposable copy
   is recoverable.
6. If a locale conflict prompt appears because a preference was already
   saved, follow the existing Recipient-Preference behavior and verify that
   the selected UI language and Dataset content language remain independent.

Do not treat local fixture success as evidence for public HTTPS, deployed
ParameterPlotter availability, or production CORS. Handoff failure, Cancel,
unsaved-work replacement protection, and public deployment remain pending
Human Browser Acceptance items. The previous direct four-route display
review is historical evidence and need not be repeated solely for this
checkpoint; the new Hub-originated Ashen Crown route and Home locale choice
are the newly changed interactions.

<a id="hub-3app-review1"></a>

## HUB-3APP-REVIEW1 — 2026-10-21 local Human Review preparation

**Status: HUMAN BROWSER REVIEW READY / HUMAN ACCEPTANCE PENDING.** The reviewed
Hub source is local `main` at `157968cdf7709052007c08d5380dc1f0fa4da7c1`, six
commits ahead of public tracking ref `a588cb9342064ec21d1de21cab466bcaac97beab`
before this documentation checkpoint. This local review is separate from Hub
publication and Release Candidate selection. The linked public applications
are NarrativeLine `0.2.1` (`54bc709b695b98de382c75e90459fd53cd85caff`),
LiaisonScape `0.2.1` (`54202255df0c34e26c2e1b2d2654ba782e4c4d5e`), and
ParameterPlotter `0.1.0` (`e058a5b0e32febe916c825868405c4bd87567913`).

### Prepared local environment

The dedicated Hub Vite process serves <http://127.0.0.1:4191/e2r-hub/>. It
uses the public ParameterPlotter application and E2R-SPEC canonical Ashen
Crown Raw EN/JA URLs. These are **local process inputs**, not GitHub Actions
variables or deployed Hub configuration. Use a fresh Edge InPrivate window or
another disposable browser profile for Handoff; do not use an existing
saved Workspace. If the process has stopped, start it from the Hub repository:

```powershell
$env:VITE_PARAMETER_PLOTTER_URL='https://sukoyaka-dopeness.github.io/e2r-parameter-plotter/'
$env:VITE_ASHEN_CROWN_DATASET_EN_URL='https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/ashen-crown.en.e2r.json'
$env:VITE_ASHEN_CROWN_DATASET_JA_URL='https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/ashen-crown.ja.e2r.json'
npm.cmd run dev -- --host 127.0.0.1 --port 4191 --strictPort
```

The previously running `5518` Hub process was not used: its inherited
build-time configuration was not established for this checkpoint.

### Current evidence

- **Source / ownership:** the three application cards request the Hub locale;
  ParameterPlotter's EN/JA guides link to published GitHub Markdown. Gallery
  order is Berlin Wall, Apollo 11, Titanic, Lighthouse, Ashen Crown, Cedar.
  The first three offer NarrativeLine/LiaisonScape; the latter three also
  offer ParameterPlotter. Berlin/Cedar Raw are NarrativeLine-owned,
  Apollo/Titanic/Ashen are E2R-SPEC-owned, and Lighthouse uses LiaisonScape's
  distribution mirror of the E2R-SPEC canonical sample. Hub passes the
  selected `datasetUrl` and `locale` in the receiving app's fragment; it
  does not copy, edit or persist the Dataset.
- **Automated:** Hub `npm.cmd test` **7/7 PASS**, lint **PASS**, and local
  production build **PASS** (18 transformed modules). Tests cover conditional
  Ashen visibility, exact EN/JA fragment generation, URL safety, Gallery
  ordering and guide links. This build is not a deployed Hub build.
- **Public source checks:** Ashen EN/JA Raw matched E2R-SPEC canonical files
  byte for byte; Lighthouse EN/JA Raw matched its distribution mirror, which
  matched E2R-SPEC canonical files; Cedar EN/JA Raw matched NarrativeLine's
  public `origin/main` Git blobs. All six returned HTTP 200 and
  `Access-Control-Allow-Origin: *`. The NarrativeLine checkout's working-tree
  Cedar bytes differ in line endings from its public Git blobs; this is not
  a public-content mismatch. All three public application URLs and
  ParameterPlotter's EN/JA guide pages returned HTTP 200.
- **Codex Browser, isolated Edge:** EN/JA at 1200px and 390px showed all
  three application cards, six Gallery samples in order, action counts
  2/2/2/3/3/3, locale-specific targets, and both ParameterPlotter guides.
  There was no horizontal overflow. At 1200px the lower Gallery cards shared
  one row and height. Actual Hub-generated Handoffs opened Berlin EN in
  NarrativeLine (15 Events), Lighthouse JA in LiaisonScape (10 Entities),
  and Ashen EN/JA in ParameterPlotter (10 Entities, 7 Dimensions, 70
  Assessments). LiaisonScape showed warnings for unsupported Dimension
  Assessment and its Specification declaration; the Lighthouse Dataset was
  still acquired. In a disposable ParameterPlotter Workspace, a missing Raw
  URL produced an acquisition error without replacing saved Ashen; the
  stored Workspace value was byte-identical before/after, and Continue
  Editing resumed it. The expected 404 was the only logged resource error
  during that failure probe.

These source, automated, HTTP and Codex Browser checks do **not** establish
Human Browser Acceptance or verify a deployed Hub. Previously Human-accepted
ParameterPlotter local Handoff replacement/failure cases and application
Workspace operations retain their separate bounds. This review concerns
Hub-originated navigation, Gallery presentation and selected Dataset identity.

### Minimum Human Browser Review packet

Use the prepared URL in a fresh disposable browser context. Record PASS/FAIL
by action, locale and viewport. Avoid existing saved Workspaces.

| Check | Action and expected result |
| --- | --- |
| Three apps, EN/JA | At about 1200px and 390px, switch English/Japanese. NarrativeLine, LiaisonScape and ParameterPlotter cards remain readable, have the correct public targets and request the chosen locale; no horizontal clipping. ParameterPlotter EN/JA User Guide links reach the correct pages. |
| Gallery, EN/JA | Confirm the six-sample order above. The top three have two application actions; Lighthouse, Ashen and Cedar have three. Names, Dataset-language labels and source/license links follow the chosen locale; desktop lower-row alignment and narrow stacking remain usable. |
| Representative Handoff | In fresh disposable receiving-app contexts, open Berlin EN in NarrativeLine and Lighthouse JA in LiaisonScape, then Ashen EN and JA in ParameterPlotter. The destination app, Dataset content language and requested UI locale agree with the Hub action. Ashen shows 10 Entities, 7 Dimensions and 70 Assessments. A saved explicit receiving-app locale preference may override the UI request without changing Dataset language. |
| Other ParameterPlotter samples | Check Lighthouse and Cedar ParameterPlotter action targets in both Hub locales; if exercising them, use fresh disposable contexts and confirm the intended owner Raw Dataset opens. This is Hub route review, not editor re-acceptance. |
| Failed acquisition | With a disposable saved Ashen Workspace, request a nonexistent Raw Dataset URL in ParameterPlotter; expect an error, no replacement, and the original Dataset after Continue Editing. Do not discard real work. |

The Human decision requested is bounded Hub three-app/Gallery and
Hub-originated Handoff acceptance. A FAIL report should include the action,
locale, viewport, destination URL and observed Dataset. This packet does not
accept every sample/app/locale route, all receiving-app editing flows, or
production Hub HTTPS behavior.

### Independent production gates

The Hub workflow points to the published ParameterPlotter URL. GitHub reported
**zero repository-level Actions variables** on 2026-10-21; the `github-pages`
environment exists, but its variables could not be conclusively inspected
because later API requests were blocked by the connection environment.
The effective values of `E2R_ASHEN_CROWN_DATASET_EN_URL` and `_JA_URL` at build
time therefore remain **unverified**. If both are absent, a Hub production
build with the current workflow hides the Ashen-to-ParameterPlotter action.
Before Hub publication, verify the effective Actions values and obtain Human
approval for any required configuration, then separately approve the exact
Hub publication SHA/range and ordinary push with automatic Pages deployment
and review public Gallery and HTTPS/CORS Handoff results. The current public
Hub remains `0.2.0`; this local readiness result does not update it.
