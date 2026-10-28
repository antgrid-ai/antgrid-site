# Contributing to the Antgrid site

Typo fixes, dead links and copy corrections go straight to a PR. For anything
larger, open an issue first.

Changes to the product belong in
[antgrid-ai/antgrid](https://github.com/antgrid-ai/antgrid), which has its own
[CONTRIBUTING.md](https://github.com/antgrid-ai/antgrid/blob/HEAD/CONTRIBUTING.md).

## Before you open a PR

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run test:unit
bun run test:scripts
bun run test        # Playwright; not run in CI, so please run it yourself
```

Say which of these you ran.

Blog posts follow [BLOG.md](BLOG.md). Changelog notes and roadmap entries follow
[CONTENT.md](CONTENT.md).

## Contracts no test here catches

- **Pricing** in `src/data/pricing.ts` mirrors the web service's plans in
  antgrid (`web/src/billing/plans.ts`, `web/src/models/plan.ts`). Change both.
- **The privacy policy** (`src/pages/privacy.md`) must agree with the iOS
  privacy manifest, `app/ios/Runner/PrivacyInfo.xcprivacy` in antgrid.
- **The logo files** in `public/logo/` are generated in antgrid; see
  `public/logo/README.md`. Don't edit them by hand.

## Contribution terms

You contribute under **the licence [LICENSING.md](LICENSING.md) assigns to each
path you touch**, and you confirm you may license it under those terms. It goes
by path, not by what the content looks like: copy inside an `.astro` file is
MPL-2.0, and `src/data/changelog-notes.ts` is CC BY 4.0. The brand assets and
`src/icons/` aren't open-licensed, so don't add to or change them. That is
ordinary inbound-equals-outbound, per
[GitHub ToS §D.6](https://docs.github.com/site-policy/github-terms/github-terms-of-service#6-contributions-under-repository-license).
