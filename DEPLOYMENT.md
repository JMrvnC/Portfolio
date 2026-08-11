# Portfolio Deployment Guide

This site is an **Astro** static project. Build output goes to `dist/` and is what you deploy.

## Local development

```bash
npm install
npm run dev
```

Dev server serves the site with base path `/Ifou/` (same as GitHub Pages).

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

### Legacy root files (temporary rollback)

These remain during migration and are **not** used by the Astro build:

- `index.html`
- `script.js`
- `animations.css`
- `Assets/`

Prefer editing `src/` and `public/` going forward.

## Build output

`npm run build` produces:

- `dist/index.html`
- `dist/script.js`
- `dist/Assets/`
- `dist/_astro/` (bundled CSS)

Config in `astro.config.mjs`:

- `site`: `https://ifou.github.io`
- `base`: `/Ifou/`

## Hosting

### Option 1: GitHub Pages (recommended for this repo)

1. Run `npm run build`
2. Publish the contents of `dist/` to the branch/folder GitHub Pages uses
   - Common pattern: deploy `dist` to `gh-pages`, or use a GitHub Action that builds and deploys
3. Ensure Pages is served from that deploy target
4. Site URL: `https://ifou.github.io/Ifou/`

If you use a GitHub Action, the workflow should:

1. `npm ci`
2. `npm run build`
3. Upload `dist/` as the Pages artifact / publish directory

### Option 2: Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. If the site is at the domain root (not `/Ifou/`), set `base: '/'` in `astro.config.mjs` before building

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
   - CSS loads from `/Ifou/_astro/...`
   - Script loads from `/Ifou/script.js`

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
- Keep root legacy files until you confirm Astro parity, then remove them

---

**Deployment status**: Astro build ready — deploy `dist/` after local preview check
