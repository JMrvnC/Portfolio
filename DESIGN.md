# Design System — Case File No. 2025-JMC-001

The visual concept behind the portfolio, and the rules to follow when extending it.

## The concept

The site is presented as a **declassified intelligence dossier**: an off-white paper document, typed in black, stamped in red, with sensitive passages blacked out. Visitors do not "browse a portfolio", they open a case file — sections are numbered exhibits, projects are case files with folder tabs, screenshots are logged evidence, and the contact form is a transmission request.

The metaphor is carried entirely by typography, rule lines, and CSS. **No background images or texture files are shipped.** Everything on the page is generated: the grain is an SVG turbulence filter, the grid is a repeating gradient, and the watermark is rotated SVG text.

Three constraints hold the whole thing together:

1. **Three colours only.** Black ink, off-white paper, stamp red. No gradients, no accent hues, no coloured status badges.
2. **Nothing looks rendered.** Square corners everywhere (`border-radius: 0`), hard offset shadows instead of soft blurs, hairline rules instead of dividers with padding.
3. **Every flourish degrades.** Redactions, stamps, and the folder animation are decoration over content that works without them.

## Palette

Defined once as Tailwind v4 theme tokens in `src/styles/global.css`, mirrored into `src/styles/animations.css` for the older keyframe variables.

| Token | Value | Used for |
| --- | --- | --- |
| `--color-ink` | `#0b0b0b` | Body text, redaction bars, filled chips, borders |
| `--color-paper` | `#f2f0ea` | The page ground; text on ink surfaces |
| `--color-paper-raw` | `#ffffff` | Document sheets and cards, so they lift off the ground |
| `--color-stamp` | `#b31111` | Stamps, rules, focus rings, active nav, hover states |
| `--color-rule` | `#cfcabd` | Hairline borders and link underlines |

`#4a4741` is used for muted metadata and body copy inside sheets. The `--color-primary`/`secondary`/`accent`/`light` tokens are legacy aliases kept so pre-existing utility classes keep resolving; prefer the named tokens above in new work.

Measured contrast against the paper ground, all passing WCAG AA:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Ink on paper | 17.3:1 | AAA |
| Muted `#4a4741` on paper | 8.1:1 | AAA |
| White on stamp red | 7.0:1 | AAA (borderline) |
| Stamp red on paper | 6.1:1 | AA |

Red is never the only signal for meaning. A red chip always carries a word ("IN PROGRESS"), never a bare dot.

## Typography

Three families, each with exactly one job. Loaded from Google Fonts in `BaseLayout.astro`.

| Family | Token | Job |
| --- | --- | --- |
| **Inter** | `--font-sans` | Body copy and paragraphs. The only comfortable-reading face. |
| **Oswald** | `--font-stencil` / `--font-display` | Condensed uppercase headings and stamps. Stands in for stencil lettering. |
| **IBM Plex Mono** | `--font-mono` | All metadata, labels, chips, tags, buttons, and form fields. Carries the "typed on a form" feel. |

The mono face does most of the theming work. Anything that is not a heading or a paragraph — a label, a status, a file number, a button — is uppercase mono with wide letter-spacing (`0.12em`–`0.24em`) at 10–11px.

## The paper ground

Built in three stacked layers in `src/styles/dossier.css`:

1. **`html`** holds the background colour, a rotated `CLASSIFIED` watermark (SVG data URI, 5% ink opacity), and a 32px graph-paper grid from two repeating linear gradients. `background-attachment: fixed` keeps it still while the page scrolls.
2. **`body`** must stay `background: transparent`, or it covers layer 1.
3. **`body::after`** is a fixed, click-through grain overlay — an `feTurbulence` fractal noise SVG at `opacity: 0.14` with `mix-blend-mode: multiply`, so it darkens into the page rather than washing over it.

Sections alternate using `.band-tint`, which is a 3% black wash rather than a solid colour, so the grid and watermark still read through it.

## Component vocabulary

All of these live in `@layer components` so Tailwind utilities written in the markup still win on specificity.

**Surfaces**

- `.doc-sheet` — a white sheet with a 1px ink border and a hard `6px 6px` offset shadow. On hover the shadow turns red and the sheet lifts 3px.
- `.corner-marks` — red registration crops in opposing corners, like a print proof.
- `.file-tab` — the folder tab above a project card, angled with `clip-path`. Needs `self-start` in a flex column or it stretches.

**Labels**

- `.file-meta` — the default mono metadata line, with `--ink` and `--stamp` colour variants.
- `.chip-ink` / `.chip-stamp` — filled status chips. Ink means settled, red means active or in progress.
- `.tag-code` — outlined technology tag that inverts to solid ink on hover.

**Rules**

- `.rule-double` — a heavy 3px/1px pair for section breaks.
- `.rule-stamp` — a 2px red underline used beneath headings and above content blocks.

**Stamps**

`.stamp` is red, outlined, rotated `-6deg`, and set in `mix-blend-mode: multiply` so it sinks into whatever it sits on. Variants: `--ink` (black), `--flat` (no rotation), `--lg`, plus `.stamp-overlay` for the hero portrait and `.folder-stamp` for the modal. The two overlay variants opt out of `multiply` and carry their own translucent paper backing, because multiply over a dark backdrop turns the stamp invisible.

**Controls**

- `.field-dossier` — no box, just a bottom rule that thickens to red on focus with a faint red wash. Placeholders are uppercase mono.
- `.btn-dossier` — solid ink block that flips to red on hover; `--ghost` variant is the outline version.
- `.link-dossier` — ink text on a `--color-rule` underline that reddens on hover.

**Imagery**

`.evidence img` renders screenshots at `grayscale(1) contrast(1.08)` and restores full colour on hover. This is what keeps six colourful project screenshots from breaking the three-colour rule — they read as filed evidence at rest and only "come alive" on interaction.

## The redaction mechanic

The signature interaction. Selected phrases — the hero tagline, the contact email, the location — are covered by black bars that wipe away when clicked.

Each `.redact` is a real `<button>`, which buys keyboard support, Enter/Space activation, and focus styling for free. The bar itself is a `linear-gradient` background sized to `100% 1.15em`; revealing animates `background-size` to `0%`, so the bar wipes left-to-right rather than fading. Text colour transitions in on a 140ms delay so the words appear as the bar clears. A revealed bar keeps a faint red underline as a trace of what was hidden.

Two rules matter here:

- **The text is always in the DOM.** It is `color: transparent`, not `display: none`. Screen readers, search engines, and Ctrl+F all see it normally; `user-select` is disabled only while hidden so it cannot be trivially swiped.
- **`DECLASSIFY ALL`** in the nav toggles every bar at once via `aria-pressed`, and relabels itself to `RECLASSIFY ALL`. Individual bars report state through `aria-expanded`.

## The case folder modal

Opening a project runs a staged sequence rather than a fade, so it reads as physically opening a folder:

| Time | Beat |
| --- | --- |
| 0–440ms | The folder cover rotates away on the X axis from its top edge (`rotateX(-116deg)`), fading out over the last 180ms |
| 100–800ms | `> ACCESSING FILE` / `> AUTHORIZING CLEARANCE` flashes underneath with a scanning bar |
| 340–680ms | The document sheet rises and scales up into place |
| 620–880ms | The red `DECLASSIFIED` stamp lands with an overshoot easing |

Closing replays it compressed to ~460ms: stamp out, sheet down, cover drops back.

The choreography is entirely CSS transitions with staggered `transition-delay`. Closing works by re-ordering those delays through an `.is-closing` class rather than by writing a second set of animations. `public/script.js` therefore only toggles two classes and holds one timer, which it clears on re-open so rapid clicking cannot desynchronise the sequence.

`perspective: 1400px` sits on `.dossier-folder` rather than the overlay, so only the cover renders in 3D and the document text stays crisp.

## Motion

Motion is mechanical, never bouncy — things slide, rotate, and wipe like paper and machinery. The one exception is the stamp, which uses an overshoot curve so it lands with impact.

Everything is disabled under `prefers-reduced-motion: reduce`. For the folder that means more than freezing the animation: the cover and terminal beat are removed with `display: none` and the document is presented immediately, so a reduced-motion visitor never sees a stalled cover. The JS close timer collapses to `0ms` to match.

## Accessibility rules

- Interactive theming is built on real semantic elements. Redaction bars and gallery exhibits are `<button>`s, not clickable `<div>`s.
- Focus is always visible: a 2px red outline with 2px offset.
- The modal is `role="dialog"` with `aria-modal` and is labelled by its title. Escape closes the topmost layer first, so the lightbox closes before the folder beneath it.
- Decorative theming — the folder cover, the terminal beat, the stamps — is `aria-hidden`.
- Colour is never the sole carrier of meaning.

## Extending the design

**Do**

- Reach for an existing primitive before writing CSS; most new UI is a `.doc-sheet` plus mono labels.
- Put new custom CSS inside `@layer components` so utilities keep winning.
- Frame new copy in the file metaphor — sections are numbered, actions are operations.

**Don't**

- Introduce a fourth colour, including "success green" or "warning amber". Status is ink or red.
- Add `border-radius` or soft shadows.
- Use colour alone to convey state.
- Animate anything without a `prefers-reduced-motion` escape hatch.
