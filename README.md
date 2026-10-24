# antgrid site

The static site at [antgrid.ai](https://antgrid.ai): home, pricing, download,
security, changelog, roadmap and blog. The product lives in
[antgrid-ai/antgrid](https://github.com/antgrid-ai/antgrid).

## Develop
    bun install && bun run dev      # http://localhost:4321

## Build & test
    bun run build          # static output → dist/
    bun run check          # astro type/template check
    bun run test:unit      # bun unit suites (blog policy, roadmap, palette, theme)
    bun run test:scripts   # sync-changelog script
    bun run test           # Playwright (desktop + mobile); local only, not in CI
    bun run build:og       # regenerate the OG image (preview server must be up)

## Content
- **Changelog** — `bun run sync:changelog` rewrites `src/data/changelog-releases.ts`
  from antgrid's GitHub releases; hand-written notes go in
  `src/data/changelog-notes.ts`.
- **Roadmap** — `src/data/roadmap-entries.ts`. Writing rules for both are in
  [CONTENT.md](CONTENT.md).
- **Blog** — `src/content/blog/`; see [BLOG.md](BLOG.md).

## Config
- CTAs point at the web app via PUBLIC_APP_URL (default https://app.antgrid.ai):
  Start free / Sign in → /login, checkout → /checkout?planId=<id>.
- Prices/caps live in src/data/pricing.ts — keep in lockstep with antgrid's
  web/src/billing/plans.ts and web/src/models/plan.ts.

## Deploy
Azure Static Web Apps via .github/workflows/deploy.yml (builds with Bun,
uploads the prebuilt dist/). Custom domain antgrid.ai with free SSL; routing,
headers and the 404 come from public/staticwebapp.config.json. The web app stays
on Caddy at app.antgrid.ai.

## Licence
Code is MPL-2.0 and writing is CC BY 4.0; logos are reserved.
[LICENSING.md](LICENSING.md) maps which is which.
