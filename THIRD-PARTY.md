# Third-party material

The site builds to static files. Exact versions are in `bun.lock`; the licences
below are what each direct dependency declares.

## Shipped in the built site

| Package | Licence | What reaches `dist/` |
|---|---|---|
| `@fontsource-variable/archivo`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` | OFL-1.1 | The font files themselves |
| `@iconify-json/simple-icons` | CC0-1.0 | Agent brand glyphs, inlined as SVG |
| `@iconify-json/tabler` | MIT | UI icons, inlined as SVG |

CC0 waives copyright but not trademark: the Simple Icons glyphs are
third-party company and product logos and remain the marks of their owners.

## Build and test only

| Package | Licence |
|---|---|
| `astro`, `astro-icon`, `@astrojs/check`, `@astrojs/markdown-satteri`, `@astrojs/rss`, `@astrojs/sitemap` | MIT |
| `tailwindcss`, `@tailwindcss/vite` | MIT |
| `@types/bun` | MIT |
| `@playwright/test`, `typescript` | Apache-2.0 |

`sharp` (Apache-2.0) reaches the tree through Astro's image pipeline. Its
Windows platform binary, `@img/sharp-win32-x64`, is `Apache-2.0 AND
LGPL-3.0-or-later`; it runs at build time only and nothing from it is shipped.

## `src/icons/`

Agent marks kept as local files, added in antgrid #86. `kilocode.svg` is from
lobehub/lobe-icons (MIT) and `antigravity-color.svg` from thesvg.
`claudecode.svg` and `mistralai.svg` are the inlined glyphs re-cut with a
tighter viewBox so their landscape shapes stop letterboxing. All four are the
marks of their owners, used only to identify the agents Antgrid works with; no
licence to them is granted here (`LICENSES/LicenseRef-Third-Party-Trademark.txt`).
