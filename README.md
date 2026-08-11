# Case File No. 2025-JMC-001 — Mervin Caballero Portfolio

<div align="center">

`CLASSIFICATION: PUBLIC` · `STATUS: ACTIVE` · `CLEARANCE: OPEN SOURCE`

[![Astro](https://img.shields.io/badge/Astro-7.2-0b0b0b?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-0b0b0b?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-b31111?style=flat-square&logo=javascript&logoColor=white)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-0b0b0b?style=flat-square&logo=githubpages&logoColor=white)](https://jmrvnc.github.io/Portfolio/)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-b31111?style=flat-square&logo=githubactions&logoColor=white)](.github/workflows/deploy.yml)

[View the live site &rarr;](https://jmrvnc.github.io/Portfolio/)

</div>

---

A single-page developer portfolio built as a fully static Astro site, themed as a declassified intelligence dossier: off-white paper, black ink, red stamps, and redaction bars you can click to reveal.

## Tech stack

| Technology | Version | Why it is here |
| --- | --- | --- |
| [Astro](https://astro.build) | 7.2 | Static site generator. Ships **zero JavaScript by default**, so the whole page is HTML and CSS plus one small hand-written script. |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 | Utility-first styling. v4 is **CSS-first** — there is no `tailwind.config.js`; design tokens live in an `@theme` block in `src/styles/global.css`. |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | 4.3 | Wires Tailwind into Astro's Vite pipeline directly, with no Astro integration package in between. |
| Vanilla JavaScript | ES6 | All interactivity — modals, lightbox, scroll spy, redaction reveal, form validation — in one dependency-free file. No React, Vue, or Svelte runtime. |
| [Inter](https://fonts.google.com/specimen/Inter) / [Oswald](https://fonts.google.com/specimen/Oswald) / [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | — | Body copy, stencil headings and stamps, and typewriter metadata respectively. Loaded from Google Fonts. |
| [Font Awesome](https://fontawesome.com) | 6.4 | A handful of UI icons, via CDN. |
| GitHub Actions + GitHub Pages | — | `withastro/action@v6` on Node 24 builds and publishes `dist/` on every push. |

Total runtime dependencies: **three** (`astro`, `tailwindcss`, `@tailwindcss/vite`). There are no devDependencies and no build plugins beyond Tailwind.

## Project structure

```text
.
├── src/
│   ├── components/
│   │   └── ProjectCard.astro    One case-file card, rendered from project data
│   ├── data/
│   │   └── projects.ts          Single source of truth for all six projects
│   ├── layouts/
│   │   └── BaseLayout.astro     Document shell: meta tags, fonts, global CSS
│   ├── pages/
│   │   └── index.astro          The entire single-page site
│   └── styles/
│       ├── global.css           Tailwind import + @theme design tokens
│       ├── dossier.css          Classified theme: paper, stamps, folder modal
│       └── animations.css       Keyframes and motion utilities
├── public/
│   ├── script.js                All client-side interactivity
│   ├── Assets/                  Images and resume (copied verbatim to dist/)
│   └── .nojekyll                Stops GitHub Pages from re-running Jekyll
├── .github/workflows/deploy.yml GitHub Pages build and deploy
└── astro.config.mjs             site + base path, Tailwind Vite plugin
```

## Getting started

Requires Node 18.20.8+, 20.3+, or 22+ (Astro 7). CI builds on Node 24.

```bash
npm install
npm run dev        # http://localhost:4321/Portfolio/
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run astro` | Run the Astro CLI directly |

### Base path gotcha

The site is served from a subdirectory on GitHub Pages, so `astro.config.mjs` sets:

```js
site: 'https://jmrvnc.github.io',
base: '/Portfolio/',
```

Everything is served under `/Portfolio/`, including in dev. Asset URLs written by hand must be **relative** (`Assets/ME.jpg`, not `/Assets/ME.jpg`), and anything referencing the root needs `import.meta.env.BASE_URL` — which is how `public/script.js` is loaded in `index.astro`.

## Design system

Strictly three colours. No gradients, no accent hues.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#0b0b0b` | Text, redaction bars, filled labels |
| `--color-paper` | `#f2f0ea` | Off-white document ground |
| `--color-paper-raw` | `#ffffff` | Card and sheet surfaces |
| `--color-stamp` | `#b31111` | Stamps, rules, focus states |
| `--color-rule` | `#cfcabd` | Hairline borders |

The classified look is pure CSS in `src/styles/dossier.css` — no background images. The paper grain is an inline SVG turbulence filter, the grid is a repeating gradient, and the `CLASSIFIED` watermark is rotated text on a pseudo-element.

**Redactions** are real `<button>` elements carrying `.redact`, so a black bar covers the text until it is clicked or focused and activated with Enter or Space. `DECLASSIFY ALL` in the nav toggles every bar at once. The underlying text always stays in the DOM, so screen readers and search engines read it normally, and all reveal animations are disabled under `prefers-reduced-motion`.

**The case folder modal.** Opening a project runs a staged sequence rather than a plain fade: the folder cover rotates away on the X axis, an `ACCESSING FILE / AUTHORIZING CLEARANCE` terminal beat flashes underneath, the document sheet rises out of the folder, and a red `DECLASSIFIED` stamp lands on the corner. Closing replays it in reverse. The choreography is entirely CSS transitions whose delays are re-ordered by an `.is-closing` class, so `script.js` only toggles classes and one timer. Under `prefers-reduced-motion` the cover and terminal beat are removed and the document is presented immediately.

[DESIGN.md](DESIGN.md) documents the full system — palette contrast ratios, the component vocabulary, the motion timings, and the rules for extending it.

## Contact form

GitHub Pages serves static files only, so there is no server to post a form to. The Transmission Request therefore works in two modes, switched by one constant at the top of `public/script.js`:

```js
const WEB3FORMS_ACCESS_KEY = '';
```

- **Empty (the default).** After validating, the form builds a pre-filled `mailto:` draft — subject, sender name, return address, and message body — and opens it in the visitor's own mail client. Nothing leaves the browser, there is no third-party account, and it cannot break or hit a quota. The recipient address comes from `data-contact-email` on the form in `index.astro`.
- **Key set.** The form instead POSTs JSON to [Web3Forms](https://web3forms.com) and the message is delivered straight to the inbox without the visitor needing a mail client. Get a free key by entering an email at web3forms.com — no account, 250 submissions/month — and paste it between the quotes. If the request fails for any reason, the code falls back to the `mailto:` draft automatically.

A hidden `botcheck` honeypot field is submitted either way; Web3Forms uses it to drop bot traffic.

## Deployment

Pushing to `main` or `portfolio` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds with Astro and publishes `dist/` to GitHub Pages. GitHub Pages must be set to **Settings → Pages → Source → GitHub Actions**; the "Deploy from a branch" option runs Jekyll against the raw source and will break the build.

See [DEPLOYMENT.md](DEPLOYMENT.md) for Netlify and static FTP options plus the pre-deploy checklist.

## Adding a project

Append one entry to the `projects` array in [`src/data/projects.ts`](src/data/projects.ts). That is the only edit required — the card, the file number on its tab, the counts in the hero record table, and the full modal are all derived from it.

The array is typed, so the editor will flag a missing field. Two things worth knowing:

- `cardTech` is the short list shown on the card; `technologies` is the full stack listed in the modal.
- The card thumbnail is `images[0]` unless the entry sets `thumbnail`.

At build time `index.astro` serialises the array into the page as a `<script type="application/json">` block. `public/script.js` is a plain static file that cannot `import` from `src/`, so it reads the modal detail from there instead of keeping its own copy.

## Documentation

| File | Covers |
| --- | --- |
| [DESIGN.md](DESIGN.md) | The dossier concept, palette, typography, components, and motion rules |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Hosting options, the contact form setup, and the pre-deploy checklist |
| [CHANGELOG.md](CHANGELOG.md) | What changed and when |
| [PROFILE-README.md](PROFILE-README.md) | The GitHub profile README that previously lived here |

## License

The **source code** is released under the [MIT License](LICENSE) — take the Astro setup, the dossier CSS, or the redaction mechanic and use them freely.

The **personal content is not**. All rights are reserved in the portrait, résumé, biography, project write-ups, and client screenshots under `public/Assets/` and `src/data/projects.ts`. Several of those screenshots depict client work and are not mine to relicense. If you fork this, swap in your own content.

## Contact

Mervin Caballero — [jmq.caballero@gmail.com](mailto:jmq.caballero@gmail.com) · [LinkedIn](https://www.linkedin.com/in/john-mervin-caballero-105230314) · [GitHub](https://github.com/JMrvnC)
