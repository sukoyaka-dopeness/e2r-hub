# E2R Hub

E2R Hub is a lightweight entry point to the E2R application ecosystem.

Status: First Distribution preparation; public rollout remains subject to
separate release approval.

Expected GitHub Pages URL:

```text
https://sukoyaka-dopeness.github.io/e2r-hub/
```

Related applications and resources:

- NarrativeLine — timeline editor
- LiaisonScape — relationship editor
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
showcase candidate. The Cedar Gallery entry hands off the NarrativeLine-owned
EN/JA source files; it does not make Cedar a canonical cross-app sample or a
Hub-owned content copy. It does not modify or persist Dataset files.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
