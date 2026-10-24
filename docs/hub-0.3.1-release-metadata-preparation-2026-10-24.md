# Hub 0.3.1 release metadata preparation

Recorded: 2026-10-24 JST

Current status: **LOCAL 0.3.1 RELEASE CANDIDATE / 2026-10-24 JST DATE SELECTED / PUBLICATION APPROVAL PENDING**. The earlier metadata-only checkpoint and its then-pending date are preserved below. No Commit, Push, or Deployment is authorized by this readiness update.

## Earlier metadata preparation — date pending at that checkpoint

Human selected E2R Hub `0.3.1` for the next small update containing the separately accepted [HUB-KOFI-HOME1](hub-kofi-home-human-acceptance-decision-preparation-2026-10-24.md). Credits `First release` stays `2026-08-18`; Credits `Updated` must match the actual JST publication date. At this earlier checkpoint, that date had not been selected.

The currently published application remains Hub `0.3.0`, with its separate [bounded Formal Publication Closure](hub-0.3.0-public-https-handoff-bounded-acceptance-2026-10-22.md). Its accepted application source and later documentation history are not redefined by this candidate. The Ko-fi implementation and Human acceptance were recorded in local commit `2926b0ee639bd807879cd80dcc92eaa3fa3eba24`; this metadata preparation does not alter that accepted behavior.

## Earlier local candidate metadata

| Field | Local candidate | Meaning |
| --- | --- | --- |
| Credits Application, EN/JA | `E2R Hub 0.3.1` | Human-selected next application version; not yet published. |
| Credits First release, EN/JA | `2026-08-18` | Historical first publication date, unchanged. |
| Credits Updated, EN/JA | `2026-10-22` | Existing last confirmed Hub `0.3.0` publication date, retained temporarily; **not** a claim that `0.3.1` was published then. |
| Private package and lockfile version | `0.0.0` | Internal tooling version; existing release practice keeps it distinct from the user-facing application version. |

The local change sets only the Credits Application version in `src/App.tsx` and its EN/JA assertions in `tests/appUiIntegration.test.ts`. The published-status wording in `README.md` remains accurate for Hub `0.3.0` and is not changed in this preparation. No placeholder date is introduced into runtime.

The current local build is a review candidate, **not ready for Push**: its `0.3.1` version and retained `2026-10-22` Updated value must not be presented as a finished `0.3.1` publication.

## Earlier publication date and authorization gate

1. Human confirms the intended JST publication date in a later release transaction. Before authorizing Push, set both localized Credits Updated values and both test expectations to that date, then rerun relevant tests, lint, and build. If the actual publication date changes, reconcile the metadata and candidate SHA before Push rather than publishing a stale date.
2. The exact three-file metadata Local Commit was separately authorized in HUB-0.3.1-METADATA-LOCAL-COMMIT1 while Updated remains at the prior publication date. Before publication, verify the finalized source, documentation, exact Commit range, and Remote main, then obtain separate authorization for the ordinary Push that triggers the existing Pages workflow.
3. After deployment, confirm the Actions/Pages result, actual JST completion date, published Version and Credits, and the bounded public Ko-fi behavior. Deployment and public verification are not established by this local preparation.

HUB-KOFI-HOME1's bounded Human Acceptance remains separate from release authorization. No new Gallery, Handoff, Dataset-safety, cross-application, or Hub-wide acceptance is claimed.

## Publication readiness checkpoint - 2026-10-24 JST

Human selected `2026-10-24 JST` as the planned Hub `0.3.1` publication date. The current **local, unpublished** candidate now shows `E2R Hub 0.3.1`, `First release: 2026-08-18`, and `Updated: 2026-10-24` in EN and JA Credits. The Updated value remains conditional on deployment occurring on that JST date; it is not publication evidence. The private package and lockfile remain at their internal `0.0.0` version.

This checkpoint changes the two localized Updated values in `src/App.tsx` and their matching assertions in `tests/appUiIntegration.test.ts`. `README.md` now presents the Hub `0.3.0` publication and its bounded closure as history while leaving the Pages URL version-neutral. The accepted Ko-fi implementation, its Human acceptance, and the Hub `0.3.0` closure are unchanged.

Local verification for this candidate: **7/7 tests PASS**, **lint PASS**, **build PASS**, and **`git diff --check` PASS**. These are local checks, not CI, Pages deployment, public HTTPS verification, or new Human Browser acceptance.

At this checkpoint, `origin/main` is `cdcd75ff812f15ea2bdf4a9a0bdc6803bd340c65`, local HEAD is `00dadf23b8bdd3c5117e1ed910eb43c230cab357`, and the local branch is two commits ahead. The only tracked working-tree changes for this readiness step are `src/App.tsx`, `tests/appUiIntegration.test.ts`, `README.md`, and this document. No file is staged. Local Commit is not authorized by this step, so a final publication endpoint SHA does not yet exist. After separately authorized commitment, the proposed Push transaction would start at the verified Remote base and include the existing Ko-fi acceptance commit, the earlier metadata preparation commit, and the new date-finalization commit. The exact terminal SHA, files, worktree state, and live Remote must be checked before requesting Push authorization.

A Push to `main` triggers the existing GitHub Actions Pages workflow. It performs `npm ci`, lint, build, artifact upload, and Pages deployment; it does not run the local test suite. A future publication decision must authorize the exact commit range and automatic deployment, confirm that the actual JST publication date is still `2026-10-24`, and then verify Actions, deployed Credits, and the public application. If the date changes before Push or the deployment will occur on a later JST date, return the Updated value to Human decision before publishing. No Commit, Push, or Deployment is performed by this checkpoint.
