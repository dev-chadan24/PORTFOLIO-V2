// Chandan Mahapatra — single source of truth. Written like a human.

export const profile = {
  name: "Chandan Mahapatra",
  location: "Jeypore, Odisha · India",
  email: "cmahapatra2400@gmail.com",
  linkedin: "https://www.linkedin.com/in/chandan-mahapatra",
  github: "https://github.com/dev-chandan24",
  githubHandle: "dev-chandan24",
  resume: "/Chandan_Mahapatra_Resume.pdf",
  researchPaper: "/Chandan_Mahapatra_Research_Paper.pdf",
  tagline: "Turning ideas into products people actually use.",
  intro:
    "I'm a developer who enjoys building the whole thing — from the interface people click to the database that keeps their work safe.",
} as const;

// Snapshot — grouped information cards for the About aside.
export const snapshot: { label: string; items: string[] }[] = [
  {
    label: "Currently Building",
    items: ["DoseLoop", "Portfolio V2", "HarvestIQ"],
  },
  {
    label: "Current Focus",
    items: ["Product Engineering", "React Ecosystem", "AI-assisted Workflows"],
  },
  {
    label: "Learning",
    items: [
      "LLMs",
      "Agentic AI",
      "RAG",
      "LoRA",
      "MCP",
      "Prompt Engineering",
      "AI Workflows",
    ],
  },
  {
    label: "Working With",
    items: ["React", "FastAPI", "Supabase", "PostgreSQL", "Figma", "GitHub"],
  },
  {
    label: "Location",
    items: ["Jeypore, Odisha", "Open to Remote Opportunities"],
  },
];

// Deprecated but kept for any legacy consumers.
export const nowGrid = [
  { label: "Now", value: "Shipping DoseLoop and polishing the parts nobody asks about." },
  { label: "Building", value: "HarvestIQ — a portfolio dashboard with live market data." },
  { label: "Reading", value: "Designing Data-Intensive Applications and Rauno Freiberg's notes." },
  { label: "Based in", value: "Jeypore, Odisha. Working across timezones." },
] as const;

export const nowPlaying = {
  track: "Enna Sona",
  artist: "Arijit Singh",
  album: "OK Jaanu",
  href: "https://open.spotify.com/",
} as const;

export interface TimelineEntry {
  year: string;
  kind: "Project" | "Internship" | "Learning" | "Research Paper";
  title: string;
  where?: string;
  note?: string;
  href?: string;
}

// Experience — projects, internships, learning, research. One folded timeline.
export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    kind: "Project",
    title: "DoseLoop — medication companion",
    note: "Design and build. Adherence, gentle reminders, calm defaults.",
  },
  {
    year: "2026",
    kind: "Project",
    title: "HarvestIQ — tax-loss dashboard",
    note: "Real-time portfolio analytics with a dense, production frontend.",
  },
  {
    year: "April 2026",
    kind: "Research Paper",
    title:
      "Cracking the Transmission Curve: Flattening Time into Tabular Tree Architectures to Defeat the Sequence Illusion and Escape the Tensor Trap",
    where: "Srusti Academy of Management & Technology",
    href: "#research",
  },
  {
    year: "2025 – Present",
    kind: "Learning",
    title: "Master of Computer Applications",
    where: "Srusti Academy of Management & Technology",
  },
  {
    year: "2024",
    kind: "Project",
    title: "Expense Tracker & One Stop",
    note: "First real work with the DOM, layout, and data on a page.",
  },
  {
    year: "2022 – 2025",
    kind: "Learning",
    title: "Bachelor of Computer Applications",
    where: "Kalam Institute of Management Studies · CGPA 8.5 / 10",
  },
];


export const education = [
  {
    year: "2022 – 2025",
    degree: "Bachelor of Computer Applications",
    school: "Kalam Institute of Management Studies",
    note: "CGPA 8.5 / 10",
  },
  {
    year: "2025 – Present",
    degree: "Master of Computer Applications",
    school: "Srusti Academy of Management & Technology",
    note: "In progress",
  },
] as const;

export type ProjectStatus = "shipped" | "in-progress" | "case-study" | "concept" | "completed";

export interface Project {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  year: string;
  status: ProjectStatus;
  featured: boolean;
  thesis: string;
  overview?: string;
  problem?: string;
  whyBuilt?: string;
  role?: string;
  challenges?: string;
  solutions?: string;
  deployment?: string;
  learnings?: string;
  future?: string;
  highlights?: string[];
  tech: string[];
  descriptors: string[];
  links?: { label: string; href: string }[];
  liveDemo?: string;
  github?: string;
  keyLearning?: {
    quote: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    slug: "doseloop",
    number: "01",
    name: "DoseLoop",
    subtitle: "Medication companion",
    year: "2026",
    status: "completed",
    featured: true,
    thesis:
      "Most medication apps yell. DoseLoop is trying to be the one that doesn't.",
    overview:
      "A calm medication companion for people who take multiple prescriptions daily. Focused on trust, adherence, and small moments of clarity.",
    problem:
      "Adherence apps treat reminders like alarms. That works once, then people mute them. The interface stops being useful and starts being noise.",
    whyBuilt:
      "A close family member kept missing doses despite three reminder apps. The apps were louder every day, not smarter. I wanted to see if a quieter interface could actually help.",
    role: "Full-stack. Product design, frontend, data model, auth.",
    challenges:
      "Scheduling logic across timezones, one-time and recurring doses, and skipped doses that shouldn't repeat. Also: making a healthcare-adjacent UI feel human, not clinical.",
    solutions:
      "A dose state machine (planned / taken / skipped / missed) that drives the UI. Reminders escalate quietly instead of louder. Weekly views prioritized over daily so patterns are visible.",
    deployment:
      "Deployed on Vercel with a Supabase backend. Auth, row-level security, and edge functions for the reminder scheduler.",
    learnings:
      "Health tooling lives or dies by trust. Every animation, every default, every empty state has to earn it. Motion here is a promise, not decoration.",
    future:
      "Caregiver mode (a second person can see adherence without editing it), refill predictions, and an offline-first PWA build.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Framer Motion", "Vercel"],
    descriptors: ["Featured product · 2026", "Case study in progress"],
    highlights: [
      "Dose state machine drives every screen — no ambiguous UI.",
      "Reminders escalate through calm channels, never alarm-style.",
      "Weekly-first views make adherence patterns obvious at a glance.",
    ],
    github: "https://github.com/dev-chandan24",
    keyLearning: {
      quote: "Friction breaks habits. Noise breaks trust.",
      description:
        "The biggest lesson from building DoseLoop wasn't technical—it was behavioral. Every unnecessary interaction increases the chance that users abandon healthy routines. Good healthcare products succeed by reducing cognitive load rather than adding more features.",
    },
  },
  {
    slug: "harvestiq",
    number: "02",
    name: "HarvestIQ",
    subtitle: "Tax-loss harvesting dashboard",
    year: "2026",
    status: "shipped",
    featured: true,
    thesis:
      "A noisy portfolio, made readable. One surface for gains, losses, and what to do about them.",
    overview:
      "A dashboard that turns a crypto portfolio into a single readable surface: live positions, cost basis, and harvestable losses ranked by dollar impact.",
    problem:
      "Retail investors sit on realized losses they never claim. Existing tools bury the opportunity across tabs, spreadsheets, and PDF statements.",
    whyBuilt:
      "A friend running a small fund kept exporting CSVs into Excel to figure out harvestable losses. It was clearly a UI problem, not a data problem.",
    role: "Design and frontend engineering. Visual system, motion, data-heavy layouts.",
    challenges:
      "Rendering thousands of positions without dropping frames. Making dense numbers legible for hours at a time. Explaining tax rules without turning the UI into a legal document.",
    solutions:
      "Virtualized tables with sticky context rows. A tokenized color system for gains, losses, and thresholds so meaning survives in dark and light modes. Inline explanations behind hover, never in the primary flow.",
    deployment:
      "Static frontend on Vercel. Market data through a WebSocket gateway with a REST fallback for slower connections.",
    learnings:
      "Fintech UI is a trust exercise. If numbers flicker or animate for style, users stop trusting the platform within seconds. Motion has to be functional or absent.",
    future:
      "Multi-account consolidation, exportable IRS-ready reports, and support for equities alongside crypto.",
    tech: ["React", "TypeScript", "WebSockets", "Recharts", "Design system"],
    descriptors: ["Featured product · 2026", "Fintech · analytics"],
    highlights: [
      "Real-time portfolio analytics in responsive, information-dense layouts.",
      "A custom visual language for gains, losses, and harvest opportunities.",
      "Micro-interactions tuned for long, focused sessions.",
      "Architecture ready for new asset classes and reporting flows.",
    ],
    github: "https://github.com/dev-chandan24",
    keyLearning: {
      quote: "When the data is volatile, the interface must be absolute.",
      description:
        "Building HarvestIQ reinforced that users don't make financial decisions from raw market data—they make decisions from confidence. The interface must stay calm, consistent, and predictable even when live market data changes every second.",
    },
  },
  {
    slug: "expense-tracker",
    number: "03",
    name: "Expense Tracker",
    subtitle: "Personal tool — earlier work",
    year: "2024",
    status: "shipped",
    featured: false,
    thesis: "A small tool for watching where the month goes.",
    overview:
      "A personal finance tracker I built while learning the fundamentals: DOM, layout, data storage, and simple visualization.",
    problem:
      "I wanted a spending log that didn't ask me to categorize every transaction upfront. Most apps do.",
    role: "Solo build. Frontend, database schema, charts.",
    challenges:
      "First real project with persistent data. Learning to think in tables and queries instead of arrays.",
    solutions:
      "MySQL for structured storage, Chart.js for visual summaries, and a form flow that made adding entries fast enough to actually do daily.",
    learnings:
      "The best way to learn a stack is to use it on something you actually want. I still open this app.",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "MySQL"],
    descriptors: ["Personal project", "Focus: DOM + data viz"],
    highlights: [
      "Frontend for logging daily spending.",
      "Chart.js visualisations for patterns.",
      "MySQL for structured storage.",
    ],
    github: "https://github.com/dev-chandan24",
  },
  {
    slug: "one-stop",
    number: "04",
    name: "One Stop",
    subtitle: "E-commerce study — earlier work",
    year: "2024",
    status: "case-study",
    featured: false,
    thesis: "A study of the anatomy of an online store.",
    overview:
      "An academic project reconstructing the essential surfaces of an e-commerce site: catalog, product detail, cart, checkout.",
    role: "Solo build. Frontend and data modeling.",
    challenges:
      "Making category navigation feel obvious at any depth, and keeping the visual language consistent across dense product grids and sparse detail pages.",
    learnings:
      "Layout systems save time. Naming components after their role, not their appearance, saves even more.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    descriptors: ["Academic project", "Focus: layout systems"],
    highlights: [
      "Product catalog and detail layouts.",
      "Category navigation and data display.",
      "Consistent visual language across the platform.",
    ],
    github: "https://github.com/dev-chandan24",
  },
];

// Research Paper — academic write-up.
export const research = {
  title:
    "Cracking the Transmission Curve: Flattening Time into Tabular Tree Architectures to Defeat the Sequence Illusion and Escape the Tensor Trap",
  shortTitle: "Short-term Electricity Load Forecasting",
  subtitle: "A comparative study of LightGBM and Prophet",
  published: "Published April 2026",
  venue: "Srusti Academy of Management & Technology",
  pdfUrl: "/Chandan_Mahapatra_Research_Paper.pdf",
  overview:
    "A comparative study of two very different forecasting philosophies applied to hourly electricity demand: a decomposable additive baseline (Prophet) against a gradient-boosted tabular model (LightGBM) engineered with lag and calendar features and tuned with Bayesian optimization.",
  sections: [
    {
      heading: "Objective",
      body: "Benchmark short-term electricity load forecasting by reframing a temporal problem as a tabular one — testing whether flattened lag features and tree ensembles can outperform sequence-aware baselines on real utility data.",
    },
    {
      heading: "Problem Statement",
      body: "Demand is seasonal, weather-sensitive, and noisy. Over- or under-forecasting cascades into provisioning, pricing, and grid stability decisions. Most classical baselines lean on strong assumptions; deep sequence models are heavy for what is often a tabular problem in disguise.",
    },
    {
      heading: "Methodology",
      body: "Two lenses on the same series. Prophet as an interpretable additive baseline for trend and multi-seasonality. LightGBM with hand-crafted lag, rolling, and cyclical calendar features, then tuned with Bayesian optimization and rolling-origin validation to prevent leakage.",
    },
    {
      heading: "Dataset",
      body: "Hourly load records paired with matching temperature readings across multiple years. Cleaning was most of the work: gap filling, timezone alignment, and deciding which windows counted as valid observation periods.",
    },
    {
      heading: "Models Used",
      body: "Prophet for trend and seasonality decomposition. LightGBM with lag windows (1h, 24h, 168h), rolling means and standard deviations, and cyclical encodings of hour-of-day, day-of-week, and month.",
    },
    {
      heading: "Results",
      body: "LightGBM outperformed Prophet on MAPE and RMSE across the held-out weeks, especially on weekday peaks and high-variance days. Prophet remained the more interpretable read for long-horizon trend and holiday effects.",
    },
    {
      heading: "Key Learnings",
      body: "Feature engineering did more work than model choice. A boring baseline you actually trust is worth more than a fancy model you don't. Bayesian tuning helps only after the validation scheme is honest.",
    },
    {
      heading: "Future Work",
      body: "Extend to probabilistic forecasts with quantile regression, blend LightGBM residuals into Prophet's decomposition, and evaluate on cross-utility data to test how well the tabular framing generalizes.",
    },
  ],
} as const;



// Skill ecosystem — three honest clusters for the orbital view.
export interface SkillNode {
  name: string;
  note: string;
  focus?: boolean;
  learning?: boolean;
}
export interface SkillCluster {
  cluster: string;
  intent: string;
  items: SkillNode[];
}

export const skillEcosystem: SkillCluster[] = [
  {
    cluster: "Core",
    intent: "Tools I reach for on real work.",
    items: [
      { name: "C", note: "Where I learned how memory actually behaves." },
      { name: "Python", note: "For notebooks, models, and small tools.", focus: true },
      { name: "TypeScript", note: "Default for anything past a script.", focus: true },
      { name: "JavaScript", note: "The language I first fell for." },
      { name: "HTML", note: "Semantic markup as a first pass, always." },
      { name: "CSS", note: "Tokens, layout, animation — no shortcuts." },
      { name: "React", note: "Component model I reach for by default.", focus: true },
      { name: "Tailwind CSS", note: "Design tokens as utility classes." },
      { name: "FastAPI", note: "Small, typed APIs where speed matters." },
      { name: "PostgreSQL", note: "Schema-first thinking, real queries." },
      { name: "Supabase", note: "Auth, storage, RLS — features end-to-end." },
      { name: "Google Cloud Console", note: "Where projects and keys actually live." },
      { name: "Git", note: "Version control, small diffs, clean history." },
      { name: "GitHub", note: "Where the work lives." },
      { name: "Figma", note: "Thinking in pixels before code." },
    ],
  },
  {
    cluster: "Data",
    intent: "The tabular half of my brain.",
    items: [
      { name: "NumPy", note: "Numerical foundation." },
      { name: "Pandas", note: "Tabular reasoning and cleaning." },
      { name: "LightGBM", note: "Used in the load-forecasting study.", focus: true },
      { name: "Prophet", note: "Baseline for temporal comparisons." },
      { name: "OpenCV", note: "Explored for assistive experiments." },
    ],
  },
  {
    cluster: "Currently Learning",
    intent: "Actively studying, not shipping yet.",
    items: [
      { name: "LLMs", note: "How they work, not just how to call them.", learning: true },
      { name: "Agentic AI", note: "Agents that plan, act, and recover.", learning: true },
      { name: "AI Workflows", note: "Wiring models into real product flows.", learning: true },
      { name: "RAG", note: "Grounding models in retrieved context.", learning: true },
      { name: "MCP", note: "Model Context Protocol — tools for agents.", learning: true },
      { name: "LoRA", note: "Fine-tuning without the full-model cost.", learning: true },
      { name: "Fine-tuning", note: "Teaching a base model a specific voice.", learning: true },
    ],
  },
];
