# Sample Gallery card visual consistency — local candidate

Date: 2026-10-27 JST

Status at the 2026-10-27 review checkpoint: **LOCAL UI CORRECTION / HUMAN ACCEPTED / CLOSED (BOUNDED VISUAL SCOPE) / UNCOMMITTED**. The accepted correction and this record were later committed locally together; no Push or deployment is included.

Human observed that the lower Lighthouse, Ashen Crown, and Cedar cards in the published Sample Dataset list had a different tint and border from the upper Berlin, Apollo, and Titanic cards. All six belong to one Gallery; the color difference could suggest an unintended category or priority. The lower three have a ParameterPlotter action. The prior bounded Gallery acceptance covered their order and actions, but did not select a meaning for that tint.

`src/App.css` no longer assigns a separate background and border to `.sample-card-parameterplotter`. The class remains in `src/App.tsx` as the existing capability marker, and the available application links continue to convey the real difference. Dataset text, order, URLs, Handoff fragments, and conditional ParameterPlotter actions were not changed. This does not select a new color system or revise the prior Gallery/Publication Closure.

Validation: `npm.cmd test` **7/7 PASS**, `npm.cmd run lint` **PASS**, and `npm.cmd run build` **PASS**. In the isolated Edge profile, a local Hub Vite server configured with the three ParameterPlotter sample actions showed all six cards with computed transparent backgrounds and identical `rgb(217, 213, 223)` borders at 360 px EN, 1200 px EN, and 360/1200 px JA. Action counts remained `2/2/2/3/3/3`. A representative 1200 px screenshot showed the six-card Gallery in its normal three-column layout; a JA 360 px screenshot is retained in `workspace/n4-browser-20261026-codex/hub-gallery-ja-360-20261027.png`. The browser document width did not exceed the 360 px viewport. These are Codex-operated local-browser checks, not Human acceptance or a deployed/public verification.

## Subsequent Human visual review — 2026-10-27

Human inspected the local corrected Hub at `http://127.0.0.1:4190/e2r-hub/` in JA/EN ordinary width and JA/EN 390 px. Human reported **PASS**: all six Sample Dataset cards share one background and consistent borders, spacing, and information hierarchy; the narrow view forms one column without overflowing text or action buttons; and the lower three ParameterPlotter buttons remain visible. Human judged the prior upper/lower visual discrepancy resolved. This Human visual evidence is separate from the earlier Codex-operated browser and automated checks. It does not verify each Handoff destination/acquisition, exhaustive keyboard use, or other widths.

## Formal Human decision — 2026-10-27

Human formally accepted and closed the **visual correction at JA/EN ordinary width and 390 px** described above on Hub HEAD `15176dc9b1d5c5e928997e5efea5b59a5d1156f4` plus its uncommitted CSS correction, including retention of the lower three ParameterPlotter actions. Handoff link destinations, Dataset acquisition, exhaustive keyboard operation, and other widths were not accepted by this decision. Exact color and component redesign were not selected. At the time of that Human decision, no Commit, Push, or deployment had occurred.
