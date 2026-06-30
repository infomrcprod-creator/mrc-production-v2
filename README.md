# MRC Production — Portfolio Website

Landing page for **MRC Production**, a ghost production, mixing & mastering studio specializing in techno subgenres (peak time, hard techno, acid techno, melodic techno) with additional offerings in trap and Brazilian phonk.

**Live site:** [mrcproduction.com](https://mrcproduction.com)

---

## Why this project

Built to give the studio a professional, conversion-focused home outside Fiverr — a single place to showcase the catalog, demonstrate mix/master quality, explain the workflow, and route serious leads into a structured intake process instead of cold DMs.

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no build step, fast load times
- **GitHub Pages** — static hosting
- **Porkbun** — domain registration & DNS
- Custom audio engine built directly on the native `Audio` / `HTMLAudioElement` API (no external player library)

## Key Features

- **Custom playlist player** — full track list with play/pause, prev/next, seekable progress bar, volume control, and an animated waveform indicator, all driven by a lightweight JS audio engine (`main.js`)
- **Before/After A-B comparison sliders** — per-track raw vs. mastered audio, with a draggable crossfade slider that swaps the active source while preserving playback position, plus its own mini progress bar and play state per track
- **Genre tab filtering** for the before/after showcase (Melodic Techno, Hard Bounce, etc.)
- **Reviews marquee** — auto-scrolling, seamlessly looped testimonial carousel pulled from verified Fiverr buyers
- **Responsive design** — dedicated mobile breakpoints (collapsible nav, hidden decorative elements, stacked layouts)
- **Dark / acid-yellow design system** — consistent visual identity shared across the site, the Stripe/Tally order funnel, and client email templates

## Site Sections

`Hero` → `Services` → `Portfolio (track player)` → `Before & After` → `How it Works` → `Bonus` → `Pricing` → `Why MRC` → `Reviews` → `FAQ` → `Contact`

## Project Structure

```
├── index.html      # Markup for all sections
├── style.css       # Design system, layout, responsive rules
├── main.js         # Playlist player, A/B comparison sliders, reviews marquee
└── img/, audio/     # Static assets (not included in this snapshot)
```

## Notes

This repo reflects the front-end of the site only. The client acquisition funnel (Tally intake form → Make automation → Stripe checkout → automated email sequence) runs as a separate backend flow and is not part of this codebase.

---

Built & maintained by Dario — [MRC Production](https://mrcproduction.com)
