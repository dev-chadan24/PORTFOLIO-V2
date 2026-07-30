# Project Structure

```
chandan-portfolio/
│
├── public/                          # Static assets served at root
│   ├── Chandan_Mahapatra_Resume.pdf # Downloadable resume
│   ├── Chandan_Mahapatra_Research_Paper.pdf
│   ├── og-image.png                 # OpenGraph social preview
│   ├── manifest.webmanifest         # PWA manifest
│   ├── robots.txt                   # Search engine directives
│   ├── sitemap.xml                  # URL map for crawlers
│   └── humans.txt                   # Team and technology credits
│
├── src/
│   ├── assets/
│   │   └── Images/                  # Project screenshots and media
│   │       ├── DOSELOOP.png
│   │       ├── Harvest Iq.png
│   │       ├── Expense Tracker.png
│   │       ├── Trade Vault.png
│   │       ├── Signature.png        # Handwritten signature watermark
│   │       └── profile photo.mp4    # Portrait video (hero section)
│   │
│   ├── components/
│   │   ├── ThemeProvider.tsx         # SSR-safe two-phase theme management
│   │   │
│   │   ├── portfolio/               # Domain-specific components
│   │   │   ├── data.ts              # ⭐ Single source of truth
│   │   │   ├── media.ts             # Centralized Vite asset imports
│   │   │   ├── Hero.tsx             # Hero section with cursor parallax
│   │   │   ├── Intro.tsx            # Cinematic 3-scene intro sequence
│   │   │   ├── IntroSignature.tsx   # SVG signature animation
│   │   │   ├── Work.tsx             # Featured projects + archive list
│   │   │   ├── Skills.tsx           # Solar system orbital visualization
│   │   │   ├── About.tsx            # Editorial about with pull quote
│   │   │   ├── Experience.tsx       # Vertical timeline
│   │   │   ├── ResearchPaper.tsx    # Academic paper showcase + metrics
│   │   │   ├── Contact.tsx          # Zod-validated form + confetti
│   │   │   ├── Colophon.tsx         # Footer with Now Playing widget
│   │   │   ├── NowPlaying.tsx       # Glass music player widget
│   │   │   ├── Portrait.tsx         # Video portrait with glass frame
│   │   │   ├── Nav.tsx              # Sticky nav with liquid pill + theme toggle
│   │   │   ├── BackToTop.tsx        # Scroll-to-top button
│   │   │   └── motion/              # Motion primitives
│   │   │
│   │   └── ui/                      # Shared UI primitives
│   │       ├── Reveal.tsx           # Intersection-triggered fade-up
│   │       ├── SectionMark.tsx      # Editorial section divider
│   │       ├── ImageWithSkeleton.tsx # Lazy image with loading state
│   │       ├── GitHubWidget.tsx     # GitHub repo card via API
│   │       └── CommandPalette.tsx   # Cmd+K navigation overlay
│   │
│   ├── hooks/
│   │   └── usePlatformDetect.ts     # iOS/macOS/Windows/Android detection
│   │
│   ├── lib/
│   │   └── motion.ts               # Easing curves, scroll hooks, magnetic
│   │
│   ├── routes/
│   │   ├── __root.tsx               # HTML shell, fonts, JSON-LD, theme
│   │   ├── index.tsx                # Home page composition
│   │   └── work.$slug.tsx           # Dynamic case study pages
│   │
│   ├── server/
│   │   └── actions.ts               # Server-side contact email (Resend)
│   │
│   ├── styles.css                   # 🎨 Design system (OKLCH tokens, utilities)
│   ├── router.tsx                   # TanStack Router configuration
│   ├── server.ts                    # Server entry point
│   └── start.ts                     # Client entry point
│
├── app.config.ts                    # TanStack Start configuration
├── vite.config.ts                   # Vite plugins (TanStack, Nitro, React, Tailwind)
├── tsconfig.json                    # TypeScript strict configuration
├── vercel.json                      # Security headers + cache policies
├── package.json                     # Dependencies and scripts
├── .env.example                     # Environment variable template
├── .gitignore                       # Git exclusions
├── .prettierrc                      # Code formatting rules
└── README.md                        # Project documentation
```

## Key Architecture Decisions

### Single Source of Truth
All content (projects, profile, timeline, skills) lives in `src/components/portfolio/data.ts`. No CMS, no markdown files, no external data sources. This keeps the portfolio fast and self-contained.

### Media Pipeline
Images are imported through `src/components/portfolio/media.ts` so Vite can:
- Hash filenames for cache-busting
- Optimize and compress assets
- Tree-shake unused imports

### Two-Phase Theme Initialization
To avoid SSR hydration mismatches, the ThemeProvider uses a two-phase approach:
1. **Phase 1 (SSR):** Always renders with `defaultTheme` ("system")
2. **Phase 2 (Client):** `useEffect` reads `localStorage` and corrects the theme

A blocking `<script>` in `__root.tsx` prevents FOUC by setting the dark class before first paint.

### Platform-Adaptive Materials
The `usePlatformDetect` hook sets `data-platform` on `<html>`, enabling CSS-only material adjustments (blur radius, saturation, opacity) per OS.
