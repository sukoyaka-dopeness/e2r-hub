# Cross-App Dataset Workflow Visualization

Date: 2026-11-04 JST

Status: **FORMAL HUMAN ACCEPTANCE RECORDED (BOUNDED) / COMMIT, MAIN PUSH AND EXISTING PAGES DEPLOYMENT AUTHORIZED / PUBLICATION PENDING**

Earlier pending-acceptance and no-publication statements below preserve the
implementation and pre-publication snapshots. The Human acceptance section at
the end records the subsequent decision and its publication boundary.

## Scope and meaning

Added an informational figure immediately before the application chooser. One
E2R Dataset connects through bidirectional arrows to NarrativeLine (Event and
timeline), LiaisonScape (Relation diagram), ParameterPlotter (Dimensions and
comparison), and a generic future-app placeholder. EN/JA captions explain
explicit Dataset export/import and distinguish it from automatic synchronization.
The invitation to build compatible apps follows the Hub's existing explanation
of the shared E2R format and the [Core specification](../../e2r-spec/spec/core.md).
No named future product, release date, universal Extension interpretation, or
lossless round-trip guarantee is promised.

The [2026-11-04 Research checkpoint](../../e2r-spec/research/exploratory/motifmosaic-vocabulary-cross-app-dataset-workflow-checkpoint-2026-11-04.md)
records the preceding research. The Human's subsequent implementation request
selected this Hub explanation UI and explicitly preferred the positive experience
of growing one Dataset over emphasizing separate-Dataset merge difficulties.
The Research checkpoint remains its dated snapshot; no Core, Extension, storage,
Handoff, or other application responsibility changes follow.

`DatasetWorkflow` owns its localized explanatory copy and responsive figure.
Desktop places the Dataset between the apps with bidirectional arrows. Narrow
layouts use one Dataset and a shared branch: arrowheads point toward the apps,
and a separate arrow points back toward the Dataset. Text remains HTML; decorative
SVGs are hidden from assistive technology. A labeled section and figure caption
provide reading order without adding links or keyboard stops. Existing app launch,
Sample Gallery, Dataset URL/locale Handoff, and Credits code paths are unchanged.

## Verification

- `npm.cmd run lint` and `npm.cmd run build`: PASS.
- `npm.cmd test`: 7/7 PASS, including existing localized app links, conditional
  Sample Gallery Handoffs, scoped fixtures, and Credits dismissal/focus behavior.
- Isolated headless Edge rendered EN/JA at 1280, 700, 390, and 320px viewport
  widths. DOM measurements found no page horizontal overflow or overflow within
  the five diagram nodes. No Runtime exception was reported during that check.
- Codex inspected rendered screenshots for desktop and narrow layouts, including
  the transition to the existing application chooser. Labels and connectors were
  readable; Japanese heading wrapping was adjusted after inspection.
- The figure adds no interactive controls. SVGs are decorative, and captions
  remain accessible text. Screen-reader operation was not manually tested.

Local browser script, measurements, and screenshots are retained under
`C:\Users\extra\E2R\workspace\diagnostics\hub-dataset-workflow-2026-11-04\`.
The browser uses a separate profile; personal browser data was not used.

These are automated and Codex browser observations, not Human acceptance or a
new live cross-app preservation test. Human review of the refined UI remains pending.
No push or deployment was performed.

## Human visual follow-up and refinement

Human reviewed the initial Desktop/Narrow and JA/EN views and found the basic
composition broadly good, while identifying narrow arrowhead collisions and
requesting clearer iconography and more concise copy. This was feedback, not
formal acceptance of the whole UI.

The follow-up removes only the narrow app-branch arrowheads at the vertical
trunk. App-side arrowheads and the return arrow toward the Dataset remain;
desktop arrows are unchanged. A rounded collection/list icon replaces the
folded document and graph icon, avoiding a specific file format or database
metaphor. The adjacent Dataset label supplies its meaning; the icon is decorative.

Short JA labels now use 年表・出来事, 相関図・関係, and 評価軸・比較. EN uses
Timeline & Events, Relationships, and Dimensions & Comparison. Captions retain
explicit export/import, user-controlled transfer, absence of automatic sync,
and the invitation to build compatible apps. The dashed future-app card remains;
its extra plus symbol and repetitive invitation text were removed. Narrow rows
have a smaller minimum height and equal sizing to align branch endpoints with
card centers; caption spacing is tighter.

After refinement, lint/build and all seven existing tests passed. The isolated
Edge check again passed in both locales at 1280, 700, 390, and 320px, without
horizontal/node overflow or observed Runtime exceptions. Codex inspected the
rendered desktop and narrow screenshots, including EN at 320px and JA at 390px:
the unwanted trunk arrowheads are absent and copy remains readable. Screen-reader
operation and Human re-review of this refined candidate remain pending.

## ParameterPlotter launch-card investigation

Human reported a dashed card and the unconfigured-URL message in both locales.
The local review server supplied by Codex had been started with plain `npm run
dev`, without `VITE_PARAMETER_PLOTTER_URL`. No local env file or inherited Vite
URL variable supplied it. `src/App.tsx` passes that value to `resolveHandoffUrl`;
an absent value returns `undefined` and selects the existing non-link, dashed
unavailable card. The workflow UI diff adds only a component import and render
to App; it changes neither this resolution nor the card's availability logic.

The canonical public destination is independently recorded in the Hub's
`.github/workflows/deploy-pages.yml` Build environment and the adjacent
ParameterPlotter README:
`https://sukoyaka-dopeness.github.io/e2r-parameter-plotter/`.
The public workflow already supplies the variable; a locally started Vite server
does not inherit GitHub Actions environment variables. This was a local review
setup omission by Codex, not evidence of a new source-level availability defect.
The initial tests and browser check passed the deliberately unconfigured branch
and therefore did not establish parity with the published launch-card setup.

Codex restarted the review server at port 4194 with that exact URL explicitly
set in its process environment. No URL fallback, availability rule, workflow,
or Dataset-source override was changed. README now documents how to launch and
build locally with the existing public destination and why plain local startup
can show the unavailable state.

With that configuration, isolated Edge verified solid link cards at 1280 and
390px in EN/JA. All four actual card clicks opened the official public URL
with the requested `#locale=en` or `#locale=ja`; the public Home rendered in
that locale with its New/Open/Sample actions. Test-created public app tabs were
closed between runs to respect Single Active Editor. No Dataset was opened,
created, imported, or edited. NarrativeLine and LiaisonScape hrefs remained
unchanged. Screenshots were inspected for desktop and narrow card appearance.
The separate diagram check again passed both locales at 1280/700/390/320px.

Lint, the seven existing tests, and a production build with the workflow's
ParameterPlotter URL passed. Local evidence is `launch-review.mjs`,
`launch-review-results.json`, and `launch-{locale}-{width}.png` in the diagnostic
directory above. This verifies local Hub-to-public-Home navigation, not a new
public Hub deployment or Dataset Handoff acceptance. No push/deployment occurred.

## Final copy and pre-publication verification

The Human reported that the refined composition, icon, arrows, and Desktop/Narrow
layout were generally good and requested one final copy change. This feedback
is recorded separately from formal acceptance, which has not been granted.

The final JA text is exactly:
「引き継ぎはユーザー自身が行います。自動同期ではありません。」
The EN text is:
“You transfer the Dataset yourself. It does not sync automatically.”
Both describe deliberate transfer and exclude automatic synchronization. No
layout, arrow, icon, link, Dataset operation, or locale handling changed in this
final copy pass.

Final verification:

- Lint and build passed after the copy change. The build explicitly supplied
  the same `VITE_PARAMETER_PLOTTER_URL` as the Pages workflow.
- Reused the seven passing existing tests from the immediately preceding
  investigation; they cover unchanged runtime paths. No tests were modified.
- The running review server retained the explicit public ParameterPlotter URL.
  Isolated Edge checked the exact new JA/EN text, all three locale-specific app
  launch URLs, diagram-node overflow, and the narrow return/app arrow markers
  at 1280/700/390/320px. All eight combinations passed with no observed Runtime
  exceptions. Codex visually inspected final JA/EN desktop and 390px screenshots.
- The earlier four successful public ParameterPlotter Home navigation checks
  remain evidence for the unchanged links; public navigation was not repeated
  for this text-only change. No new functional regression was found.
- `git diff --check` passed. The Index remained empty.

At this check, local `main`, its tracking ref, and read-only `git ls-remote`
for public `main` all identify `9f19d276d9469489ac3b3b2be0e361d21ab8bccb`.
There are no existing unpushed Hub commits. The bounded future commit candidate
is exactly these five files:

- `src/App.tsx`: import and placement of the figure.
- `src/components/DatasetWorkflow.tsx`: localized figure and final copy (new).
- `src/components/DatasetWorkflow.css`: responsive figure styles (new).
- `README.md`: existing-config local review instructions.
- `docs/dataset-workflow-visualization-2026-11-04.md`: evidence and boundaries (new).

No unrelated dirty or untracked Hub file was found. Existing work outside this
repository is outside the candidate. No files were staged and no commit was
created. The deployment workflow is unchanged: a push to `main` automatically
starts lint/build and GitHub Pages deployment, including for documentation-only
commits, because it has no path filter. A future push therefore requires approval
that includes its automatic deployment effect and review of the exact commit.
Formal Human Acceptance of the final candidate and explicit publication approval
remain pending. This task performed no Commit, Push, or Deployment.

## Formal Human Acceptance and publication authorization — 2026-11-04 JST

Human explicitly accepted the final Dataset Workflow Visualization: one Dataset
across applications, desktop bidirectional and narrow branch arrows, three-app
descriptions, generic future-app extensibility, EN/JA copy, and the local
ParameterPlotter URL-configuration investigation record. The accepted final copy
is exactly the JA and EN text in the final-copy section above. This accepts the
bounded candidate and its documented evidence; it does not claim a new
Human-operated public browser test or broader Dataset interoperability guarantee.

Human separately authorized a bounded commit of the five listed candidate files,
a normal push to `main`, and the existing automatic GitHub Pages deployment.
Current Git, implementation and validation must still agree with that scope.
No workflow, destination, application version metadata, Dataset operation, or
other repository change is included.

At the time this acceptance record is prepared, publication has not completed.
Workflow completion and public JA/EN Desktop/Narrow checks remain required.
Publication Closure is **PENDING**. Post-deployment results may be recorded
locally in this same document, but publishing that later documentation is a
separate public write and is not authorized by the present push approval.
