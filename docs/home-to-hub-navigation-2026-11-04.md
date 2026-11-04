# Home-to-Hub navigation and Hub locale URL synchronization

Date: 2026-11-04 JST

Status: BOUNDED HUMAN ACCEPTANCE RECORDED / SEQUENTIAL PUBLICATION AUTHORIZED / PUBLICATION AND HUMAN CLOSURE PENDING

## Receiver behavior

Hub reads one valid `#locale=en` or `#locale=ja` during initial React state
creation. Decoding and exact-value/duplicate checks follow the existing
[Cross-App Locale URL contract](../../e2r-spec/docs/cross-app/cross-app-locale-startup-v0-design.md).
Missing, duplicate, malformed or unsupported values retain Hub's existing `en`
default. Query aliases are not added; unrelated fragment fields are ignored,
not consumed or rewritten. No Dataset is fetched from an incoming fragment.

Hub has no saved locale preference, so this adds no storage, cross-app preference
reads, persistence system or conflict dialog. Following the Human's subsequent
URL synchronization direction, a manual toggle updates the UI and replaces only
the locale fields with one valid value using `history.replaceState`. Unrelated
raw fragment fields, path, query and `history.state` remain intact; invalid or
duplicate locale fields are repaired. No history entry is added.

Incoming locale remains startup-only: hash changes and Back/Forward do not
re-resolve current language. Reload reads the URL then present, so it preserves
the latest manually selected locale. A legacy bare `#top` still uses the default
on initial load; choosing a language there adds `locale` without removing `top`.
The Header brand remains a native anchor whose href includes current locale.
Ordinary pointer/Enter activation retains locale via `replaceState` and scrolls
to the existing `main#top` element, without adding history. Modified activation
keeps native link behavior and opens/copies a locale-bearing URL. No new route
or hash listener is introduced.
Existing outgoing locale-only and Sample Dataset Handoff builders are unchanged.

## Home links and responsibility

Each of NarrativeLine, LiaisonScape and ParameterPlotter adds a separate
`home-ecosystem` navigation group after its Guide and before Sponsors/Ko-fi.
Visible labels are exactly `E2R Hubでほかのアプリを見る` and
`Explore other E2R apps on E2R Hub`. The public destination is
`https://sukoyaka-dopeness.github.io/e2r-hub/#locale=<current UI locale>`.
Each native anchor has `target="_blank"`, `rel="noopener noreferrer"`, and a
localized accessible name/title explaining the new tab. It sends no Dataset,
current screen URL, state, save, Export, replacement or Handoff instruction.

Typography matches each app's neighboring secondary links, rather than imposing
one pixel size across apps. Existing Header/Footer/Credits and Dataset controls
remain intact. ParameterPlotter's non-owner screen receives no link.

## Verification and limits

- Hub: 11 tests PASS; lint and configured production build PASS. Pure tests cover
  valid, encoded, duplicate, empty, unsupported and malformed locale values and
  `#top`, locale-field repair and raw unrelated-field preservation. DOM integration
  covers startup JA, later `#top`, manual URL synchronization without history
  growth, top activation, outgoing links and absence of storage writes.
- NarrativeLine: 409 tests, lint and build PASS.
- LiaisonScape: 679 tests, lint and build PASS. The full suite emitted the
  previously documented non-failing React/jsdom `attachEvent`/`detachEvent`
  diagnostics; these were not observed as native-browser exceptions. See its
  existing `docs/liaisonscape-0.2.4-release-candidate-preparation-2026-10-28.md`.
  Its missing local build tools were restored by `npm ci`; no manifest or
  lockfile changed.
- ParameterPlotter: syntax checks for 42 modules, 242 tests and build PASS.
- Isolated headless Edge checked 18 combinations: three app Homes, EN/JA, and
  1280x900 / 390x844 / 320x640 effective viewport sizes. Link text, URL,
  new-tab attributes, ordering, equal computed font size/weight relative to
  Guide and support, and horizontal overflow checks passed. Desktop and 390px
  screenshots in both languages, plus the 320px EN layouts, were inspected.
- All 18 clicks opened the exact public Hub URL with the requested locale and
  `window.opener === null`. The source Home URL, visible content and stored
  Dataset snapshot keys were unchanged. A second ParameterPlotter tab showed
  non-owner guidance without the new navigation group.
- Because the new receiver is not published, the newly opened tab was then
  explicitly navigated to the local production Hub preview with the same
  fragment. Requested locale, actual `#top` activation and manual language
  switching passed there. This is a split local-candidate check, not a claim
  that the public Hub already implements reception or that a fully published
  cross-app route was verified.

Diagnostics: `C:\Users\extra\E2R\workspace\diagnostics\home-to-hub-2026-11-04\`
contains `review.mjs`, `results.json` and app/locale/width screenshots. Local
review servers are NarrativeLine 4195, LiaisonScape 4196, ParameterPlotter 4197,
and the configured Hub production preview 4198. The runtime links intentionally
retain the public destination.

## Knowledge, preservation and acceptance

### Hub URL synchronization follow-up — 2026-11-04

Human adopted synchronization of manual locale selection with the URL, reload
continuity, no additional history, and coexistence with top navigation. The
implementation is limited to Hub App, its existing candidate parser/helper,
the two candidate test files and this record. The other three app repositories
and their link candidates were not edited in this follow-up.

The previous startup-only-URL behavior (manual changes did not rewrite the URL)
is superseded by this explicit Human direction. The browser observations of
the three Home links above remain earlier-stage evidence. Current Hub evidence
is `locale-url-review.mjs` and `locale-url-results.json` in the same diagnostic
directory. It checks four full sequences: EN/JA starts at effective 1280 and
390px widths, plus plain URLs, legacy `#top`, duplicate and malformed locale
starts in each sequence. Manual changes in both directions, reloads, history
length, query/fragment/state preservation, actual top scrolling and Enter
activation, Back/Forward without UI re-resolution, and reload re-resolution
all passed. Three-app outgoing locale hrefs and Sample Dataset Handoff URL shape
were retained. No storage was written and no incoming Dataset URL was fetched.

All 11 Hub tests, lint and the public-URL-configured build passed. This remains
Codex evidence for a local candidate; Human Acceptance and publication are pending.

The initial browser-script attempts stopped on an incorrect fresh-start expectation
after fragment-only navigation and a transient CDP active-page error during
navigation. The final harness waits through context changes and requires a new
per-Document marker before treating a reload as complete. Its final four sequences
and additional legacy/invalid starts passed. These diagnostic attempts are not
classified as application regressions or Human acceptance.

Owned file inventory (each repository also adds its own
`docs/home-to-hub-navigation-2026-11-04.md`):

- Hub: `src/App.tsx`, new `src/services/startupLocale.ts`, new
  `tests/startupLocale.test.ts`, new `tests/startupLocaleIntegration.test.ts`.
- NarrativeLine: `src/screens/HomeScreen.tsx`, `src/index.css`,
  `tests/localePresentationCompletenessIntegration.test.js`.
- LiaisonScape: `src/App.tsx`, `src/styles.css`,
  `tests/appUiIntegration.test.ts`.
- ParameterPlotter: `home-screen.js`, `home-screen.css`, `home-screen.test.mjs`.

The Hub candidate preview was also measured at each requested viewport width,
checked for horizontal overflow, and its initial EN/JA desktop and 390px figure
screenshots were inspected after the new startup-locale behavior was added.

The accepted workspace [incremental modularization Decision](../../ai-knowledge/decisions/application-modularization-and-incremental-extraction.md)
is applied to presentation responsibilities: one small Hub parser and local
Home markup/styles, without shared packages or Dataset ownership changes.
The accepted workspace placement policy is applied only to diagnostic evidence
and the isolated browser profile. The release-evidence reconciliation playbook
is used to distinguish source/tests, Codex browser observations and Human
acceptance, not to claim a release or introduce additional release gates.

Hub's existing local post-publication addendum in
`docs/dataset-workflow-visualization-2026-11-04.md` is preserved and excluded
from this change's ownership. LiaisonScape's three pre-existing untracked
diagnostic paths are preserved. Nothing is staged or committed.

Human acceptance of this implementation remains pending, including visual and
keyboard/new-tab review in each app. Manual screen-reader use, every Home
warning/degraded state and an actively edited Dataset browser scenario were
not exercised by this browser check; existing regression suites support their
unchanged paths. Publication and a fresh public receiving-route check require
separate authorization. No Commit, Push or Deployment was performed.

## Final Human Acceptance preparation — 2026-11-04

Assessment: **READY FOR A BOUNDED HUMAN ACCEPTANCE DECISION / NO MATERIAL
IMPLEMENTATION BLOCKER FOUND IN THE REVIEWED SCOPE / NOT FORMALLY ACCEPTED**.
This assessment is not authorization to commit, publish or close publication.

Current HEADs are Hub `a8a89fb8f942bf78303608e2e7ebac345bdb219f`, NarrativeLine
`91fca6c18a10f97710bbc7e7c2b8e8b39999cbb0`, LiaisonScape
`5e010a77b3a1bc4f390559e30880588633f1a125`, and ParameterPlotter
`0f54693cad15d18d51710fa1a69876b0ce9f1198`. The candidate is HEAD plus the
owned worktree paths listed above, not those HEADs alone. Implementation, tests,
package manifests and available lockfiles have SHA-256 fingerprints in
`final-candidate-fingerprints.json` in the diagnostic directory. Final preparation
changed documentation and diagnostics only; no runtime or repository test source
was edited. Git's ownership exception for the fingerprint subprocess was limited
to each exact repository for that read-only command; no Git config was written.

### Fresh checks and reused evidence

| Repository | Fresh selected tests | Retained full-suite/build evidence |
| --- | --- | --- |
| Hub | 11/11 PASS | Latest URL-sync candidate lint and configured production build PASS |
| NarrativeLine | 4/4 Home link/support/Credits tests PASS | 409/409, lint and build PASS at the unchanged candidate |
| LiaisonScape | 4/4 Home/link, local Import failure, EN/JA Credits tests PASS | 679/679, lint and build PASS at the unchanged candidate; known non-failing React/jsdom diagnostics remain documented |
| ParameterPlotter | 33/33 Home/acquisition/peer-warning/recovery/shell tests PASS | 42 module syntax checks, 242/242 tests and build PASS at the unchanged candidate |

The previous 18 locale/width checks and measured typography parity were reviewed
against the current scoped source diffs. Full suites and builds were not repeated
without a runtime change; their evidence is retained separately from fresh checks.
`git diff --check` passed and all four Indexes remain empty.

Fresh isolated Edge keyboard checks cover three app Homes in EN/JA at 1280x900
and 390x844 (12 combinations). Native Tab reaches Hub immediately after Guide;
Shift+Tab returns to Guide, the next Tab after Hub reaches Sponsors, and Enter
opens the exact public URL/locale in a new tab with null opener. Focus rings
were visible and screenshots recorded. Browser accessibility-tree inspection
reports an exposed link whose name includes the visible copy and localized
new-tab notice. This checks exposed semantics, not actual screen-reader speech.
Credits opened by Enter, kept Tab/Shift+Tab inside the dialog, closed by Escape,
and returned focus to its opener in all 12 combinations. The source Home and
stored Dataset snapshot keys stayed unchanged. No native-browser exception was
observed. Initial harness attempts lacked Enter's character event for button
activation and checked focus before asynchronous restoration; corrected native
key events and eventual-focus waits passed without application changes.

Fresh Hub checks again passed the four EN/JA and 1280/390px URL-sync sequences,
including reload, top/Enter, history length/state, Back/Forward and legacy/invalid
starts. Hub Credits keyboard trapping, Escape and focus return also passed in
those four sequences. These use the local production preview, not public Hub.

An additional clean-Dataset check imported only the diagnostic
`final-disposable.e2r.json` (one synthetic Entity, Event and Relation) through
each local Home's existing file input. Each app returned Home, opened Hub, and
continued back to its Workspace. Home text and stored Dataset snapshot keys
were unchanged by Hub navigation; the continued Workspace text exactly matched
the pre-navigation Workspace. All three checks passed with no native-browser
exceptions. This is evidence for a clean loaded synthetic Dataset, not byte-level
Export parity, pending authoring drafts, degraded saving or every Extension.
No personal browser or user Dataset was used.

Fresh evidence files: `final-keyboard-review.mjs`, `final-keyboard-results.json`,
`final-focus-{app}-{locale}-{width}.png`, `final-dataset-review.mjs`,
`final-dataset-results.json`, `final-disposable.e2r.json`, and the refreshed
`locale-url-results.json`. The loaded synthetic data is confined to the isolated
diagnostic browser profile. No production Dataset was changed.

### Human review handoff

Use a separate test profile and disposable data. Current local review addresses:

- [NarrativeLine EN](http://127.0.0.1:4195/e2r-narrative-line/#locale=en) / [JA](http://127.0.0.1:4195/e2r-narrative-line/#locale=ja)
- [LiaisonScape EN](http://127.0.0.1:4196/e2r-liaison-scape/#locale=en) / [JA](http://127.0.0.1:4196/e2r-liaison-scape/#locale=ja)
- [ParameterPlotter EN](http://127.0.0.1:4197/#locale=en) / [JA](http://127.0.0.1:4197/#locale=ja)
- [Hub Candidate EN](http://127.0.0.1:4198/e2r-hub/#locale=en) / [JA](http://127.0.0.1:4198/e2r-hub/#locale=ja)

Human can review these observations or explicitly accept their bounded Codex
evidence; none is already recorded as Human PASS:

1. In each Home, judge the new link's copy, placement, spacing and equal secondary
   hierarchy in EN/JA at Desktop and Narrow. Review Tab/Shift+Tab focus and Enter.
2. In the Human's screen reader, check whether the link name and new-tab notice
   are understandable. No screen reader was operated by Codex; the accessible
   name/title exist, but actual speech and usability remain unverified.
3. In local Hub Candidate, change language, reload, scroll down and activate the
   brand with pointer/Enter. Confirm top navigation and chosen language persist.
   Back/Forward intentionally can show a URL requesting a different language
   without changing current UI; reload then interprets that URL.
4. Review ParameterPlotter's second-tab non-owner guidance without a Hub link.
   The earlier bounded check passed; no takeover or acquisition is proposed.
5. Decide whether the clean-Fixture and regression-suite evidence is sufficient
   for Dataset preservation, or request a bounded pending-edit/failure-state
   browser review. Exhaustive warnings, saving failures and other browser engines
   remain outside these checks.

The Home links intentionally open the public Hub. That published receiver still
has the old locale behavior. Review local Hub Candidate separately for reception;
do not treat a public Hub language mismatch as a failure of the unpublished
receiver, or call the split checks a published four-app end-to-end PASS.

### Commit and deployment boundary

The candidate remains exactly 17 owned paths: Hub's four implementation/test
paths plus its new record (5); each app's two implementation paths, one test
path and its new record (4 each). Hub's separate modified publication addendum
and LiaisonScape's three pre-existing untracked paths remain excluded. No files
are staged. All four current Pages workflows trigger on `main` pushes without
a path filter, so even a documentation-only main push can deploy. If publication
is later authorized, publishing/validating Hub reception before the sender apps
would avoid an interim locale-reception gap; the Human must decide the exact
commits, order and automatic-deployment scope.

Formal UI Acceptance, acceptance of residual verification limits, commit scope,
push/deployment approval and Publication Closure all remain explicit Human
decisions. There is no new material issue requiring a design change in this
reviewed scope. No Commit, Push or Deployment was performed.

## Bounded Human Acceptance and sequential publication authorization — 2026-11-04

The Human explicitly accepted this bounded Home-to-Hub candidate using the
recorded automated tests, lint/build and Codex-operated isolated Edge evidence.
This does not claim that the Human performed every browser operation, nor does
it expand acceptance or release decisions for other features. Earlier pending
acceptance statements above describe the preparation snapshot and are superseded
only within this bounded scope.

Accepted: normal-Home link placement after Guide and before support, secondary
link typography, EN/JA, safe new-tab navigation, locale-only transfer with no
Dataset transfer/change, and ParameterPlotter's non-owner boundary; Hub startup
locale reception, manual UI/URL synchronization, reload persistence, no history
growth, top navigation and startup-only Back/Forward behavior.

NOT VERIFIED at acceptance: actual screen-reader speech, all pending-edit and
save-failure states, exhaustive browser engines, and public four-app end-to-end.
These are accepted evidence limits, not PASS results. Public evidence must be
measured separately after deployment. Publication Closure remains a separate,
explicit Human decision even if technical public checks pass.

The Human authorized exactly 17 candidate paths: Hub 5 and each app 4, including
this existing record. Exclude Hub's separate Dataset Workflow publication
addendum, LiaisonScape's three pre-existing untracked diagnostic paths, and all
unrelated work. Each repository receives an independent commit and ordinary
main push using the existing Pages workflow. Order: Hub, NarrativeLine,
LiaisonScape, ParameterPlotter. Each preceding deployment and public check must
PASS before the next push. Stop for unexpected scope, history, gate, deployment
or public regression; no force push or history rewrite is authorized.

Publication has not yet been verified at this checkpoint. Later measured
publication results will be recorded locally without an automatic extra push.