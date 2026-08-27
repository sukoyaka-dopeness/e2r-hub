# E2R Hub Development Guidance

## Reusable knowledge

The central workspace knowledge base is `C:\Users\extra\E2R\ai-knowledge`.
Search its `INDEX.md` before Handoff, routing, Dataset replacement, or
cross-application work. Apply entries only when their explicit scope matches;
hypotheses must not be treated as accepted behavior.

E2R Hub is the lightweight ecosystem entry point and navigation/distribution
surface for E2R applications.

## Application modularization policy

Apply the workspace Decision in
`ai-knowledge/decisions/application-modularization-and-incremental-extraction.md`.
Keep Hub's entry-point responsibilities lightweight and separate. Use
incremental, responsibility-based extraction when new behavior would enlarge
its root component; do not introduce a fixed file layout, premature
abstractions, or application/Dataset semantics that belong elsewhere.

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
