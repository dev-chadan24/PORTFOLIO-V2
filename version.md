# Portfolio v2 — Improvement Roadmap

> A portfolio-expert audit of **Chandan Mahapatra — Portfolio v1** (currently live on Vercel).
> This document captures every gap, missed opportunity, and upgrade idea, organized by priority.
> Version 2 is not about redesigning — it`s about leveling up what`s already working.

---

## Quick Summary of v1

| Strength | Gap |
|---|---|
| Editorial aesthetic with Fraunces + Inter Tight is distinctive | Intro animation plays every session (sessionStorage resets on new tab) |
| Glassmorphism nav with liquid-glass pill is premium | `/notes` and `/uses` pages are placeholder stubs — no content |
| Solar-system skills orbit is a conversation starter | No real project screenshots — fallback placeholders in Work section |
| Cinematic intro with signature draw is memorable | Contact section has no form — email-only is a friction point |
| OKLCH color system + dark/light tokens are production-quality | NowPlaying is hardcoded static data, not a real Spotify integration |
| Scroll-based parallax and reveal animations feel alive | Case study pages: `keyLearning` and `highlights` data not rendered |
| Responsive mobile layout dissolves portrait cleanly | No Open Graph image — social share previews are blank |
| TanStack Router SSR-ready structure is future-proof | `nowGrid` data is marked deprecated but still in `data.ts` — dead code |
| Research paper section is unique and differentiating | Experience timeline has no "internship" entries despite type existing |
| Full theme system (dark + warm light) is rare | No analytics or Vercel Speed Insights integration |

---

## Section-by-Section Audit

---

### 1. Intro Animation (`Intro.tsx`)

**What works:** The 4-scene cinematic (name > tagline > signature > dissolve) is a strong first impression.

**What to improve:**

- **Session vs localStorage:** Currently uses `sessionStorage`, so the intro replays on every new browser tab. Switch to `localStorage` so returning visitors skip it regardless of tab.
- **Skip button discoverability:** The "skip ->" button is `white/35` opacity in the bottom-right corner. Consider making it appear after 1.5s to reduce initial clutter while still being usable.
- **Mobile intro timing:** The 6.1s sequence feels long on mobile. Add a mobile-specific condensed version (2.5s): name > signature > dissolve.
- **Prefers-reduced-motion:** Exit still uses `filter: blur(10px)` which can trigger jank on low-end devices. Replace with `opacity: 0` only for reduced-motion users.

---

### 2. Hero Section (`Hero.tsx`)

**What works:** Parallax cursor aurora, name reveal slide-up, signature watermark.

**What to improve:**

- **Tagline is redundant:** `profile.tagline` and the italic span in the hero say nearly the same thing. Swap the italic subtitle for something concrete: a current status badge like *"Open to roles — July 2026"*.
- **Hero intro text is generic:** "I`m a developer who enjoys building the whole thing..." — for v2, make it more pointed. Mention DoseLoop and HarvestIQ by name in one sentence.
- **Magnetic resume button:** The magnetic effect only works on desktop. On mobile, make it full-width with a stronger visual treatment.
- **Scroll indicator is desktop-only:** `hidden md:flex` — on mobile, there is no affordance to scroll past the portrait. Add a subtle chevron on mobile.
- **Portrait variable naming:** `profileVideo` is used for both desktop and mobile. If it is an actual video file, confirm autoplay/loop attributes are set inside `Portrait.tsx`.

---

### 3. Work Section (`Work.tsx`)

**What works:** Featured + archive layout, sticky image column on desktop, smooth reveal animations.

**What to improve:**

- **No real screenshots:** All projects fall back to a placeholder gradient. For v2, add at least one real WebP screenshot per featured project.
- **Hover scale is too subtle:** `group-hover:scale-[1.02]` is barely perceptible. Increase to `1.035` and add a `rotate-1` micro-tilt for a more dynamic feel.
- **Archive thesis on hover:** The archive rows only show name, subtitle, tags, and year. Add a one-line `thesis` excerpt that fades in on hover.
- **Plan for a `/work` page:** With only 4 projects this is fine now, but v2 should plan a dedicated `/work` listing page with filtering by status.
- **Consolidate status pills:** `"completed"` and `"shipped"` mean the same thing. Use: `live`, `in-progress`, `archived`. Add a pulsing green dot for `live` projects.

---

### 4. About Section (`About.tsx`)

**What works:** Long-form prose reads authentically. Snapshot aside with grouped tags is clean.

**What to improve:**

- **Wall of text:** The 10-paragraph block has no visual breaks. Pull 2-3 key sentences out as pull-quotes (larger italic text, accent left border) to create hierarchy.
- **Static "Updated" label:** "Updated · 2026" is hardcoded. Wire it to a `lastUpdated` field in `data.ts` and format it with `Intl.RelativeTimeFormat`.
- **No personality anchors:** The section is professional but has no humanity. Add one "when I`m not coding" line.
- **Missing link to research:** The prose mentions the LightGBM/Prophet paper but has no link. Add an anchor pointing to `#research`.

---

### 5. Skills Section (`Skills.tsx`)

**What works:** Solar system orbital visualization is genuinely unique and premium on desktop.

**What to improve:**

- **Mobile fallback is basic:** Category cards are functional but don't match the drama of the orbit. Consider a horizontal scroll track of skill capsules grouped by cluster.
- **Empty notebook panel on load:** The note panel only shows when a skill is hovered. Pre-select the first `focus: true` skill so the panel isn't empty on first render.
- **Learning badge on mobile:** The dashed border on `skill-capsule--learning` is invisible to non-hover users. Add a small learning icon next to the text on mobile.
- **Orbit performance:** 15+ animated nodes can stress low-end devices. Add `will-change: transform` on ring containers and `contain: layout style` on the parent.
- **Surface total count:** The `{total}` variable is calculated but never shown. Add an eyebrow label: *"27 tools across 3 clusters"*.

---

### 6. Experience / Timeline (`Experience.tsx`)

**What works:** Mixed timeline (projects + research + learning) is honest and distinctive.

**What to improve:**

- **Unused "Internship" kind:** The type definition includes it but no entry uses it. Either remove it or add any freelance/contract work.
- **No kind-specific colors:** All kinds use `text-accent`. For v2: Research Paper → cyan, Project → muted green, Learning → muted warm. Faster to scan.
- **No expandable detail:** Clicking a timeline entry does nothing. Add a click-to-expand accordion for the `note` field.
- **No "Present" cap:** The timeline line just ends. Add a pulsing dot at the top labeled "Now" to anchor the reader.

---

### 7. Research Paper (`BuildLog.tsx`)

**What works:** Academic paper structure with numbered sections (S01, S02...) feels scholarly.

**What to improve:**

- **Synthetic chart:** `ForecastChart` uses `Math.sin` to generate fake data. Replace with even approximate real data points from the actual paper.
- **No key takeaway callout:** Add a highlighted callout above the sections: *"LightGBM outperformed Prophet on MAPE, especially on weekday peaks."*
- **PDF download has no preview:** Add a one-line abstract excerpt next to the download CTA so users know what they are downloading.
- **Misleading component name:** Rename `BuildLog.tsx` -> `ResearchPaper.tsx` for code clarity.

---

### 8. Contact Section (`Contact.tsx`)

**What works:** Email + copy-to-clipboard is clean and low-friction.

**What to improve:**

- **No contact form:** Non-technical recruiters won`t compose an email directly. Add a lightweight form (name, email, message) via Formspree or Resend — keep it below the email block.
- **Add availability indicator:** A subtle pill saying *"Currently available"* sets expectations visually without cluttering the layout.
- **Expand social links:** Add X (Twitter) if active, and consider a "what I`m reading" link to make the section feel alive.
- **Add status to profile data:** Add a `status: "open" | "not-looking"` field to `profile` in `data.ts` and surface it in both Hero and Contact.

---

### 9. Placeholder Pages — CRITICAL

**`/notes` and `/uses` are stubs** with "coming soon" text. These are indexed and undermine credibility.

- **`/notes`:** Write 2-3 short notes (250-400 words each). Topics: "What I learned building DoseLoop", "Why I prefer TypeScript interfaces over types".
- **`/uses`:** List your editor, theme, font, terminal, hardware, and 3-4 tools. 200 words is enough.
- **If not ready:** Remove links from the nav entirely until pages have real content.

---

### 10. Case Study Pages (`work.$slug.tsx`)

**What works:** Full-page case study structure is thorough.

**What to improve:**

- **`keyLearning` is not rendered:** Both `keyLearning.quote` and `keyLearning.description` are defined in project data but not displayed anywhere on the case study page. Add a pull-quote block near the bottom.
- **No case-to-case navigation:** Add "Next Project" / "Previous Project" links at the bottom of each case study.
- **`highlights` array is unused:** Defined in `data.ts` but not rendered on the case study page. Add a "What shipped" section above the tech stack.
- **No fallback hero:** If `projectImages[slug]` doesn`t exist, the case study has no visual. Add a gradient fallback banner with large display text.
- **Breadcrumb navigation:** "Back to work" goes to `/`. In v2, it should go to a `/work` listing page.

---

### 11. NowPlaying (`NowPlaying.tsx`)

**What works:** The concept adds humanity.

**What to improve:**

- **Static hardcoded data:** `nowPlaying` in `data.ts` is completely static. Integrate the Spotify Web API via a `/api/now-playing` edge function to show what you are actually listening to.
- **Fallback:** If the API is too complex initially, at least cycle through 5-10 favorite tracks randomly on each page load.

---

### 12. Navigation (`Nav.tsx`)

**What works:** Liquid-glass pill for active item, glass blur backdrop.

**What to improve:**

- **No scroll-spy:** The active pill only reflects the route, not the current section as the user scrolls. Add an `IntersectionObserver` to update the active nav item dynamically.
- **"Notes" and "Uses" in nav:** These link to stub pages. Hide them from the nav until they have real content.
- **z-index audit:** Confirm the nav z-index doesn`t conflict with the intro`s `z-[200]` on mobile.

---

### 13. Open Graph and SEO

**What is missing:**

- **No `og:image`:** Portfolio shared on LinkedIn or X renders with no preview card. Add a static 1200x630 OG image to `public/og.png` and reference it in the head meta.
- **No `twitter:image`:** Same fix as above.
- **No canonical URL:** Add `<link rel="canonical">` in `__root.tsx`.
- **No structured data:** Add a `Person` JSON-LD schema to the homepage head for Google Knowledge Panel.
- **No sitemap:** Add `sitemap.xml` to `public/` with all routes.

---

### 14. Performance

| Issue | Fix |
|---|---|
| No `loading="eager"` on hero portrait | Add `loading="eager"` on hero, `lazy` on all below-fold images |
| No font preloading | Add `<link rel="preload">` for Fraunces and Inter Tight in `__root.tsx` |
| No Vercel Analytics | Add `@vercel/speed-insights` and `@vercel/analytics` (both free) |
| Framer Motion bundle | Import from `"framer-motion/client"` where possible |
| All project images load eagerly | Use dynamic `import()` or Vercel Image Optimization |

---

### 15. Code Quality

| Issue | Fix |
|---|---|
| `nowGrid` is dead code | Delete from `data.ts` |
| `BuildLog.tsx` is misnamed | Rename to `ResearchPaper.tsx` |
| `SectionMark` is exported from `About.tsx` | Move to its own `SectionMark.tsx` file |
| Hardcoded `font-family` inline in `Hero.tsx` line 221 | Move to a CSS utility class |
| No `.env.example` | Add one for Spotify API keys, contact form keys |
| No `CHANGELOG.md` | Start one to track v1 -> v2 progress |

---

## v2 Priority Matrix

### Must Do (Before Calling It v2)
1. Fill `/notes` with at least 2 real entries
2. Fill `/uses` with actual setup
3. Add `og:image` for social sharing
4. Add real project screenshots (WebP, under 500KB each)
5. Switch intro from `sessionStorage` to `localStorage`
6. Add scroll-spy to nav
7. Render `keyLearning` on case study pages
8. Replace synthetic forecast chart with real data

### Should Do (High Value)
9. Add availability badge in Hero and Contact
10. Spotify Now Playing API integration
11. Add contact form (Formspree / Resend)
12. Add `Person` JSON-LD schema
13. Add Vercel Speed Insights + Analytics
14. Add project-specific `og:image` for case studies
15. Add "Next Project" navigation on case study pages

### Nice to Have (Polish)
16. Mobile skills orbit -> horizontal scroll track
17. Pull-quotes in About prose
18. Expandable timeline entries
19. "Present" pulsing dot at top of Experience timeline
20. `/work` listing page with status filters
21. Delete dead code (`nowGrid`, deprecated exports)
22. Rename `BuildLog.tsx` -> `ResearchPaper.tsx`
23. Add `sitemap.xml` to `public/`
24. Custom cursor dot (extend existing motion values from Hero globally)

---

## Content Gaps

| Gap | Recommendation |
|---|---|
| Only 2 featured projects | Add HarvestIQ live demo link once deployed |
| About has no personal hooks | Add one hobby or interest sentence |
| No testimonials or social proof | A single LinkedIn recommendation quote adds credibility |
| Research is the only academic output | Link any essays or notes from the notes page |
| No live status | Add a `status.ts` and surface current project status in Hero |

---

## Design Evolution for v2

The v1 design is already strong. v2 should not redesign — it should deepen:

- **Page transitions:** Add a blur-fade between routes using TanStack Router. Currently navigating to a case study is an instant jump.
- **Cursor customization:** Extend the existing motion values from Hero into a global custom cursor dot.
- **Scroll parallax on section headings:** Subtle depth beyond the current reveal-only approach.
- **Print stylesheet:** Add `@media print` styles so the portfolio prints cleanly as a resume-adjacent document.
- **Theme persistence:** Persist the dark/light preference to `localStorage` so it survives page refresh.

---

*Generated: July 2026 — Based on full codebase review of Portfolio v1*
*Author: Chandan Mahapatra — dev-chandan24*
