# Portfolio Deployment Guide

This site is an **Astro** static project. Build output goes to `dist/` and is what you deploy.

## Local development

```bash
npm install
npm run dev
```

Dev server serves the site with base path `/Portfolio/` (same as GitHub Pages).

```bash
npm run build
npm run preview
```

## Project layout (Astro)

### Source (edit these)

- `src/data/projects.ts` — every project, card and modal alike. The single source of truth.
- `src/components/ProjectCard.astro` — one case-file card, rendered from that data
- `src/pages/index.astro` — main page body
- `src/layouts/BaseLayout.astro` — document shell, meta, fonts
- `src/styles/global.css` — Tailwind import, `@theme` design tokens, modal and gallery styles
- `src/styles/dossier.css` — classified theme: paper ground, stamps, redactions, folder modal
- `src/styles/animations.css` — animation library
- `public/Assets/` — images and resume
- `public/script.js` — client interactions (modals, nav, redactions, form)

## Build output

`npm run build` produces:

- `dist/index.html`
- `dist/script.js`
- `dist/Assets/`
- `dist/_astro/` (bundled CSS)

Config in `astro.config.mjs`:

- `site`: `https://jmrvnc.github.io`
- `base`: `/Portfolio/`

## Hosting

### Option 1: GitHub Pages (recommended for this repo)

Do **not** use “Deploy from a branch” / `pages-build-deployment` (that runs Jekyll on raw source and breaks Astro).

Use the workflow in `.github/workflows/deploy.yml` instead:

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**
2. Commit and push this repo (branch `portfolio` or `main`)
3. Open the **Actions** tab and confirm **Deploy to GitHub Pages** succeeds
4. Site URL: `https://jmrvnc.github.io/Portfolio/`

The workflow builds with Astro and deploys `dist/`. `public/.nojekyll` is included so Pages won’t re-run Jekyll on the built site.

### Option 2: Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. If the site is at the domain root (not `/Portfolio/`), set `base: '/'` in `astro.config.mjs` before building

### Option 3: Hostinger / static FTP

1. Run `npm run build` locally
2. Upload everything inside `dist/` to the web root (or subdirectory matching `base`)

## Browser compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Pre-deploy checklist

1. **Functionality**
   - Navigation links work
   - Mobile menu toggles
   - Redaction bars reveal on click and by keyboard; `DECLASSIFY ALL` toggles every bar
   - Project modal plays the folder sequence and resets cleanly on close
   - Image lightbox opens from an exhibit and closes without unlocking the page scroll underneath
   - Contact form blocks invalid input, and a valid submit opens a mail draft
   - Smooth scrolling and scroll-to-top work

2. **Assets**
   - Images under `Assets/` load (including filenames with spaces)
   - Resume download opens `Assets/Resume.pdf`

3. **Base path**
   - CSS loads from `/Portfolio/_astro/...`
   - Script loads from `/Portfolio/script.js`

4. **Accessibility**
   - Skip link, keyboard nav, focus states still work
   - With `prefers-reduced-motion: reduce`, the modal presents the document immediately instead of stalling on the folder cover

## Contact form

Handled entirely client-side in `public/script.js`, because none of the hosts above run server code.

**Default:** after validating, the form composes a pre-filled `mailto:` draft and opens it in the visitor's mail client. The recipient comes from `data-contact-email` on the form in `index.astro`. Nothing to configure, and nothing to break.

**Direct delivery:** set `WEB3FORMS_ACCESS_KEY` at the top of `public/script.js` to a free key from [web3forms.com](https://web3forms.com) and submissions POST straight to your inbox instead, with automatic fallback to the draft if the request fails. A hidden `botcheck` honeypot field is already wired up for it.

If you move to Netlify, its native Forms feature is an alternative — but it needs `data-netlify` attributes and a real `action`, which the current handler does not use.

## Maintenance notes

- Add projects by appending to the `projects` array in `src/data/projects.ts`. Nothing else needs editing — the card, its file number, and the hero record counts are all derived.
- Update resume at `public/Assets/Resume.pdf`
- See [DESIGN.md](DESIGN.md) before changing the visual language

---

**Deployment status**: live at <https://jmrvnc.github.io/Portfolio/> via GitHub Actions.
