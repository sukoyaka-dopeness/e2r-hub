# E2R Hub Development Guidance

E2R Hub is the lightweight ecosystem entry point and navigation/distribution
surface for E2R applications.

## Boundaries

- E2R specification semantics are owned by `e2r-spec`.
- Hub must not redefine E2R Core or Extension semantics.
- NarrativeLine and LiaisonScape remain independent applications.
- Hub must not silently modify or persist E2R Datasets.
- Unknown future application capabilities must not be guessed.
- Keep the implementation lightweight and avoid premature product systems.

## Working method

- Make one logical change at a time.
- Change files one at a time where practical.
- Keep the project compiling after each completed file change.
- Run lint and build before completing a checkpoint.
- Do not modify unrelated files.

## Git checkpoint policy

Local commits are allowed for a bounded, verified checkpoint. Before
committing, inspect `git status --short`, stage only exact paths, inspect
`git diff --cached --name-status`, run `git diff --cached --check`, and run
the relevant lint and build checks.

Do not push, deploy, release, amend, rewrite history, force push, or broadly
stage files without explicit authorization. Do not use `git add .`,
`git add -A`, or `git commit -a`. Prefer exact-path staging.
