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

The variable status above is the earlier readiness snapshot. In the separate
HUB-PROD-CONFIG3 checkpoint, Human authorized and Codex reported creation and
read-back verification of both Ashen Crown URL Repository Actions variables for
a future production build. No Hub build, push, deployment or public Handoff was
performed by that configuration checkpoint.

<a id="hub-credits-focus1"></a>

## HUB-CREDITS-FOCUS1 — 2026-10-22 Credits follow-up to Human Review

**Implementation checkpoint status: LOCAL FIX IMPLEMENTED / CODEX BROWSER VERIFIED
(BOUNDED) / HUMAN BROWSER REVIEW PENDING.** This was the status before the
post-fix Human review recorded below. This is a Credits-only correction to the local
three-app Hub candidate. It does not close HUB-3APP-REVIEW2 or authorize a Hub
push or deployment.

In the 2026-10-21 HUB-3APP-REVIEW2 local Edge review, Human inspected EN/JA
at 1200px and 390px. The three app cards, six-sample Gallery, documentation
and responsive presentation were broadly satisfactory within the supplied
screenshots. Human found that Tab could move focus out of the open Credits
dialog, and that the Application, Creator, First release and Updated rows had
excessive vertical spacing. These observations take precedence over earlier
automated or Codex Browser results; the reviewed Credits behavior was not
accepted.

The existing `role="dialog"` and `aria-modal="true"` described a modal but did
not move focus inside it, make the background inert or wrap Tab at its ends.
The fix focuses Close when Credits opens, makes Hub header/main/footer inert
while it is open, keeps Tab and Shift+Tab between the repository link and
Close, and redirects unexpected document focus back inside. Escape, Close and
backdrop dismissal retain focus restoration to the Credits opener. No Dataset,
Handoff, locale, Gallery or application-link behavior changed.

For the visual correction, Credits metadata paragraphs now have zero default
paragraph margins and a compact line height. The heading uses a smaller
bottom gap, while the acknowledgement, repository link and Close retain
separate spacing. This follows the compact metadata grouping seen in the
current NarrativeLine, LiaisonScape and ParameterPlotter Credits without
requiring pixel-identical styling. The dialog can scroll within a short
viewport, and the link remains a text-sized target. Hub `0.2.0`, First release
`2026-08-18`, and Updated `2026-10-01` remain unchanged; Updated needs a
separate decision against the date of any later deployment.

Evidence for this local correction:

- **Source / DOM:** the background receives `inert` only while Credits is
  open; the dialog has an internal initial focus and Tab boundary handling.
  The focused Close/link outline remains visible. Existing dismissal paths
  return focus to the opener.
- **Automated:** `npm.cmd test` 7/7 PASS (including localized Credits,
  focus containment and restoration assertions); `npm.cmd run lint` PASS;
  `npm.cmd run build` PASS (18 transformed modules); `git diff --check` PASS.
- **Codex Browser:** an isolated headless Edge profile at the local
  `http://127.0.0.1:4191/e2r-hub/` confirmed EN/JA at 1200px and 390px.
  Actual keyboard Tab/Shift+Tab cycled between Close and the repository
  link, including both wrap boundaries; background elements were inert,
  the focus outline was visible, and Escape, Close and backdrop restored
  opener focus. Metadata paragraph margins computed to `0px`, the
  acknowledgement retained a `16px` preceding gap, no horizontal overflow
  occurred, and no runtime exception or console error was observed. This
  does not establish Human Browser Acceptance or public Pages behavior.

Minimum Human recheck: in the local Hub at both widths and locales, open
Credits, inspect the four compact identity rows and the distinct
acknowledgement/link/Close spacing, then use Tab and Shift+Tab repeatedly.
Focus should stay on the link or Close with a visible outline; the background
must not receive focus. Close by button, Escape and backdrop in separate
openings and confirm focus returns to the Credits trigger each time. Record
PASS/FAIL by locale, width and dismissal path. The broader Gallery/Handoff
Human decision and production HTTPS review remain separate.

Human's proposed Ko-fi Home support link alongside GitHub Sponsors is an
independent future implementation across the four applications. This
Credits-only checkpoint does not implement or accept that proposal.

### HUB-CREDITS-FOCUS1 formal Human acceptance (bounded)

**Current status: HUMAN ACCEPTED / CLOSED (BOUNDED).** Human formally approved
this limited Credits closure after reviewing the fix at source commit
`0372a52aaac4261e7c4e2ec34110a0a405e22a30`. The initial 2026-10-21
HUB-3APP-REVIEW2 focus escape and excessive metadata spacing above remain the
pre-fix Human Browser FAIL, not evidence of a passing implementation.

In the post-fix local Human Browser review, EN and JA at 1200px and 390px
**PASS** for the Credits information rows and spacing, Tab/Shift+Tab cycling
inside the modal, prevention of focus escape to the background, visible focus
outline, Close/Escape/backdrop dismissal, and focus restoration to the Credits
button. Human then explicitly approved HUB-CREDITS-FOCUS1 formal closure within
this scope. The Source/DOM, 7/7 automated tests, lint/build, and isolated Codex
Browser results above are separate supporting evidence; they are not the Human
Browser review.

This closure does not accept HUB-3APP-REVIEW2 as a whole, Hub-origin Dataset
Handoff, public HTTPS end-to-end behavior, or Hub publication/deployment. The
separately configured Ashen Crown EN/JA Repository Actions variables do not
prove a production build or public Handoff. Hub `0.2.0` and Credits First release
`2026-08-18` / Updated `2026-10-01` are unchanged; Updated requires a decision
against the actual future deployment date. The four-app Ko-fi support link
remains an independent, unimplemented follow-up.
