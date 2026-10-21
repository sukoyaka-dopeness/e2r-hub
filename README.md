# E2R Hub

E2R Hub is a lightweight entry point to the E2R application ecosystem.

Status: Hub 0.2.0 is published. The local three-app integration and Sample
Gallery update is a Human-accepted (bounded) local 0.3.0 candidate. Its final
Release Candidate, GitHub Pages deployment, and public HTTPS Handoff remain
pending separate approval and verification.

Published GitHub Pages URL (currently Hub 0.2.0):

```text
https://sukoyaka-dopeness.github.io/e2r-hub/
```

Related applications and resources:

- NarrativeLine — timeline editor
- LiaisonScape — relationship editor
- ParameterPlotter — Dimension assessment comparison
- E2R Validator
- E2R Specification

## Development

```text
npm install
npm run dev
npm run lint
npm run build
```

The Hub is a lightweight entry point to the E2R ecosystem. It links to
independent E2R applications, the specification, the Validator, canonical
sample Dataset sources, and NarrativeLine's application-owned Cedar Observatory
showcase candidate. The Cedar Gallery entry and Documentation source link follow
the existing five samples in the same order. Its card hands off the
NarrativeLine-owned EN/JA source files to NarrativeLine
or LiaisonScape. Lighthouse and Cedar also offer ParameterPlotter when its
receiving URL is configured. See the [ParameterPlotter sample Handoff
checkpoint](docs/parameterplotter-sample-handoff.md) for build-time
configuration and local review boundaries. Its ordinary card metadata names the Dataset language;
ownership and licensing remain in the provenance record. This entry does not
make Cedar a canonical cross-app sample or a Hub-owned content copy. Hub does
not modify or persist Dataset files.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
