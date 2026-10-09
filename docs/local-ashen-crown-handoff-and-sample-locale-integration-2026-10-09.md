# Local Ashen Crown Handoff and Sample Locale Integration

Status: **IMPLEMENTED / AUTOMATED CHECKS PASS / HUMAN BROWSER ACCEPTANCE PENDING**

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

## Human Browser Review procedure

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
