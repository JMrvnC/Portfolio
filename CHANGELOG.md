# Changelog

Notable changes to this portfolio, newest first. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

This repository has never been tagged, so the versions below are a retroactive summary grouped by the dates the work actually landed. Dates come from the commit history.

## [Unreleased]

### Added

- `src/data/projects.ts` as the single typed source of truth for all six projects, covering both the card summary and the full modal detail.
- `src/components/ProjectCard.astro`, rendering each case-file card from that data.
- Working contact delivery. The transmission request now composes a pre-filled `mailto:` draft — subject, sender name, return address, and message body — and opens it in the visitor's mail client. A single `WEB3FORMS_ACCESS_KEY` constant in `public/script.js` switches it to direct inbox delivery, with automatic fallback to the draft if that request fails.
- A hidden `botcheck` honeypot field and a live status line on the contact form.
- Case folder choreography on the project modal: the cover rotates away, an `ACCESSING FILE` beat flashes, the document rises, and the `DECLASSIFIED` stamp lands. Reverses on close, and is replaced by an immediate presentation under `prefers-reduced-motion`.
- `DESIGN.md` documenting the visual concept, palette, component vocabulary, and motion rules.
- `CHANGELOG.md` and `LICENSE`.

### Changed

- Project cards, the file numbers on their tabs, and the "files on record" and "files closed" counts in the hero record table are now all derived from the project data instead of being hand-maintained.
- Gallery exhibits are real `<button>` elements, making them keyboard-reachable.
- Card and modal open actions use delegated event listeners instead of inline `onclick` attributes.
- The `DECLASSIFIED` stamp on the modal moved clear of the close button, and is hidden below 640px where the header has no room for it.
- `DEPLOYMENT.md` refreshed for the current file layout and contact form behaviour.

### Fixed

- Closing the image lightbox no longer releases the page scroll lock while the project modal is still open underneath it.
- Values interpolated into modal markup are HTML-escaped, so an apostrophe or ampersand in project copy can no longer break the markup.

### Removed

- The duplicated `projectData` object in `public/script.js`, which had to be kept in sync with the cards by hand.

## [1.0.0] — 2026-08-11

Rebuilt the site on Astro and gave it the classified dossier identity.

### Added

- Astro 7 and Tailwind CSS 4 via `@tailwindcss/vite`, replacing the hand-written HTML page.
- The classified dossier theme in `src/styles/dossier.css`: paper ground, stamps, document sheets, and interactive redaction bars with a `DECLASSIFY ALL` switch.
- A project README covering the tech stack, structure, and setup, with the previous GitHub profile README preserved as `PROFILE-README.md`.

### Changed

- Base path corrected from `/Ifou/` to `/Portfolio/`, and the site URL and metadata updated for the current GitHub username.
- Navigation, layout, and accessibility passes across `BaseLayout.astro` and `index.astro`.

### Removed

- Legacy standalone CSS, HTML, JavaScript, and image files left over from the pre-Astro site.

## [0.3.0] — 2025-12-23

### Added

- Mobile responsiveness improvements with dedicated media queries and larger touch targets.

## [0.2.0] — 2025-07-02

### Added

- Project and image modals with per-project detail data.
- Initial deployment guide and README.

### Changed

- Reorganised image paths under `Assets/`, and a performance, accessibility, and SEO pass over the site.

## [0.1.0] — 2025-02-20

### Added

- Initial portfolio site.
