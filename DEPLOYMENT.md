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

- `src/pages/index.astro` — main page body
- `src/layouts/BaseLayout.astro` — document shell, meta, fonts
- `src/styles/global.css` — Tailwind + page styles
- `src/styles/animations.css` — animation library
- `public/Assets/` — images and resume
- `public/script.js` — client interactions (modals, nav, form)

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
   - Contact form validation works
   - Project and image modals open/close
   - Smooth scrolling and scroll-to-top work

2. **Assets**
   - Images under `Assets/` load (including filenames with spaces)
   - Resume download opens `Assets/Resume.pdf`

3. **Base path**
   - CSS loads from `/Portfolio/_astro/...`
   - Script loads from `/Portfolio/script.js`

4. **Accessibility**
   - Skip link, keyboard nav, focus states still work

## Contact form

Client-side validation only (`#contactForm` in `public/script.js`). For production delivery:

1. Netlify Forms (if on Netlify)
2. Formspree or similar
3. A small backend (PHP/Node)

## Maintenance notes

- Add projects in `src/pages/index.astro` and matching data in `public/script.js`
- Update resume at `public/Assets/Resume.pdf`
---

**Deployment status**: Astro build ready — deploy `dist/` after local preview check
