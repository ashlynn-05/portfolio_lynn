# Lynn Le Portfolio

Lynn Le's portfolio: a soft pink desktop of folders, windows and stickers for a Business Analytics student who likes sidequests. Every number on the site comes from her CV (`public/bdr_lynnn.pdf`).

Built on the same stack as the quin frontend (Astro 5, Tailwind v4, React islands, Vercel), with the Payload CMS layer removed: content is static and typed in `src/data/content.ts`.

## Tech stack

- **Framework:** Astro 5, static output (`build.format: "file"`, every internal link relative)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`; tokens in the `@theme` block of `src/styles/global.css`, components as plain CSS below it
- **Motion:** GSAP 3.15 (ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip), all free plugins
- **Islands:** React 19 for the command palette (Cmd+K) and the media lightbox (`yet-another-react-lightbox`), both ported from quin
- **Icons:** Phosphor (`@phosphor-icons/core`), inlined at build time by `src/components/Icon.astro`
- **Fonts:** Bricolage Grotesque + Space Grotesk, self-hosted through Fontsource
- **Hosting:** Vercel (the adapter switches on automatically when `VERCEL` is set) or any static host

## Routes

| Path | What it is |
|------|-----------|
| `/` | Home: hero, CV numbers, manifesto, work folders, experience, skill beams, life story teaser, contact |
| `/works` | The work folder: draggable desk plus a list view |
| `/works/[slug]` | Case study with a pinned scroll story (`sidekick`, `codrops`, `elite-talks`, `kim-beauty`, `muse-crochet`, `hackathons`) |
| `/life-story` | Pinned timeline of chapters, character sheet, sticker board (drag, then "tidy up") |
| `/404` | Not on the desk |

## Commands

Package manager: **bun** (`bun.lock` committed). `npm` works too.

```bash
bun install        # install deps
bun dev            # dev server at http://localhost:4321
bun run build      # static build to ./dist (paths made relative afterwards)
bun run preview    # preview the build
bun run check      # type-check .astro files
bun run test       # content guard rails (vitest)
```

Set `SITE_URL` (or deploy on Vercel) so canonical URLs, OG tags and the sitemap use the real domain.

## Motion, by data attribute

Pages opt in with attributes; `src/scripts/site.ts` does the rest.

| Attribute | Effect |
|-----------|--------|
| `data-intro` | fades up once on load |
| `data-rise` | fades up when scrolled into view |
| `data-row` | slides in from the left |
| `data-count="50" data-suffix="+"` | counts up to the CV number |
| `data-parallax="0.3"` | drifts against the scroll |
| `data-split-lines` | reveals line by line from under a mask |
| `data-scrub-words` | lights up word by word as you scroll |
| `data-pin` | pinned story: `.step` items swap the `.frame` in the sticky `.stage` |
| `data-drag` | draggable desktop object (wide screens) |

The HTML is always the final state, so the site reads fine with JS off, and `prefers-reduced-motion` turns every animation off.

## Editing content

Everything lives in `src/data/content.ts`: contact details, the six case studies, jobs, skills, life story chapters and stickers. Bracketed text like `[what you built]` is a placeholder for Lynn to fill in. Run `bun run test` after edits: it checks slugs, links, captions, and that no em or en dashes slipped in.

Still to add: a photo of Lynn (replace the `[photo of Lynn, 4:5]` slot in `src/pages/index.astro`) and what was built at each hackathon.

## Design system

`DESIGN.md` is the canonical spec (tokens, type, components, motion, copy rules). Read it before changing the look.
