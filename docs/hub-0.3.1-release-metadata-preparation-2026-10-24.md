# Hub 0.3.1 release metadata preparation

Recorded: 2026-10-24 JST

Status: **LOCAL RELEASE METADATA CANDIDATE / PUBLICATION DATE PENDING / LOCAL COMMIT AUTHORIZED / PUBLICATION BLOCKED**. The Commit authorization is limited to the three files named below; it does not authorize Push or Deployment.

## Decision and existing release boundary

Human selected E2R Hub `0.3.1` for the next small update containing the separately accepted [HUB-KOFI-HOME1](hub-kofi-home-human-acceptance-decision-preparation-2026-10-24.md). Credits `First release` stays `2026-08-18`; Credits `Updated` must match the actual JST publication date. That date has not been selected.

The currently published application remains Hub `0.3.0`, with its separate [bounded Formal Publication Closure](hub-0.3.0-public-https-handoff-bounded-acceptance-2026-10-22.md). Its accepted application source and later documentation history are not redefined by this candidate. The Ko-fi implementation and Human acceptance were recorded in local commit `2926b0ee639bd807879cd80dcc92eaa3fa3eba24`; this metadata preparation does not alter that accepted behavior.

## Local candidate metadata

| Field | Local candidate | Meaning |
| --- | --- | --- |
| Credits Application, EN/JA | `E2R Hub 0.3.1` | Human-selected next application version; not yet published. |
| Credits First release, EN/JA | `2026-08-18` | Historical first publication date, unchanged. |
| Credits Updated, EN/JA | `2026-10-22` | Existing last confirmed Hub `0.3.0` publication date, retained temporarily; **not** a claim that `0.3.1` was published then. |
| Private package and lockfile version | `0.0.0` | Internal tooling version; existing release practice keeps it distinct from the user-facing application version. |

The local change sets only the Credits Application version in `src/App.tsx` and its EN/JA assertions in `tests/appUiIntegration.test.ts`. The published-status wording in `README.md` remains accurate for Hub `0.3.0` and is not changed in this preparation. No placeholder date is introduced into runtime.

The current local build is a review candidate, **not ready for Push**: its `0.3.1` version and retained `2026-10-22` Updated value must not be presented as a finished `0.3.1` publication.

## Publication date and authorization gate

1. Human confirms the intended JST publication date in a later release transaction. Before authorizing Push, set both localized Credits Updated values and both test expectations to that date, then rerun relevant tests, lint, and build. If the actual publication date changes, reconcile the metadata and candidate SHA before Push rather than publishing a stale date.
2. The exact three-file metadata Local Commit was separately authorized in HUB-0.3.1-METADATA-LOCAL-COMMIT1 while Updated remains at the prior publication date. Before publication, verify the finalized source, documentation, exact Commit range, and Remote main, then obtain separate authorization for the ordinary Push that triggers the existing Pages workflow.
3. After deployment, confirm the Actions/Pages result, actual JST completion date, published Version and Credits, and the bounded public Ko-fi behavior. Deployment and public verification are not established by this local preparation.

HUB-KOFI-HOME1's bounded Human Acceptance remains separate from release authorization. No new Gallery, Handoff, Dataset-safety, cross-application, or Hub-wide acceptance is claimed.
