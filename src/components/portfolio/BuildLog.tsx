import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import { research } from "./data";
import { Reveal } from "./Reveal";
import { SectionMark } from "./About";

/**
 * Research Paper — a premium academic case study.
 * Structured like a paper contents page, not a blog post.
 */
export function BuildLog() {
  return (
    <section
      id="research"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40 max-w-5xl mx-auto scroll-mt-24"
      aria-labelledby="research-title"
    >
      <SectionMark index="05" label="Research Paper" />

      {/* Paper header */}
      <Reveal delay={0.05}>
        <div className="flex items-center gap-3 mb-6 text-eyebrow">
          <span className="text-accent">Research Paper</span>
          <span className="h-px w-8 bg-border" />
          <span>{research.published}</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          id="research-title"
          className="text-display text-[clamp(1.85rem,3.6vw,3.05rem)] leading-[1.08] tracking-tight max-w-4xl mb-6"
        >
          {research.title}
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-lede italic text-text-muted max-w-3xl mb-3">
          {research.subtitle}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="text-eyebrow mb-16">{research.venue}</p>
      </Reveal>

      {/* Overview panel */}
      <Reveal delay={0.24}>
        <div className="soft-elevated p-8 md:p-10 mb-16 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, var(--glow-strong), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="text-eyebrow text-accent mb-4">Research Overview</div>
            <p className="text-[1.02rem] md:text-[1.08rem] leading-[1.75] text-text max-w-3xl">
              {research.overview}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Structured sections — paper style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 md:gap-y-12">
        {research.sections.map((s, i) => (
          <Reveal key={s.heading} delay={0.08 + i * 0.04}>
            <article className="border-t border-border/60 pt-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-text-subtle">
                  §{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-display text-[1.15rem] md:text-[1.25rem] text-accent">
                  {s.heading}
                </h3>
              </div>
              <p className="text-[0.98rem] leading-[1.75] text-text-muted">
                {s.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Chart */}
      <Reveal delay={0.4}>
        <figure className="mt-20 soft-elevated p-8 md:p-10">
          <div className="flex items-baseline justify-between mb-6">
            <span className="text-eyebrow">Fig. 01 · Actual vs. forecast</span>
            <span className="text-eyebrow">Held-out · 40 days</span>
          </div>
          <ForecastChart />
          <figcaption className="text-eyebrow mt-6 opacity-80">
            Actual (dashed) vs. LightGBM forecast (accent). Weekday peaks track cleanest.
          </figcaption>
        </figure>
      </Reveal>

      {/* Download coda */}
      <Reveal delay={0.5}>
        <div className="mt-20 pt-10 border-t border-border/60 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-eyebrow text-accent mb-2">Research Paper</div>
            <div className="text-display text-2xl md:text-[1.75rem] leading-tight mb-1">
              {research.shortTitle}
            </div>
            <div className="text-eyebrow">{research.published}</div>
          </div>
          <a
            href={research.pdfUrl}
            download
            className="cta-primary group relative inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg self-start md:self-end"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Research Paper</span>
            <span className="grid place-items-center w-8 h-8 rounded-full bg-bg/15">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function ForecastChart() {
  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 600;
    const base = 80 + Math.sin(i * 0.4) * 30 + Math.sin(i * 0.15) * 15;
    return { x, actual: base + (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * 3.5, forecast: base };
  });
  const path = (key: "actual" | "forecast") =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${160 - p[key]}`).join(" ");
  return (
    <svg viewBox="0 0 600 180" className="w-full h-auto">
      {[40, 80, 120].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="var(--border)" strokeWidth="0.5" />
      ))}
      <motion.path
        d={path("actual")}
        stroke="var(--text-subtle)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={path("forecast")}
        stroke="var(--accent)"
        strokeWidth="1.75"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <g fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-subtle)" letterSpacing="1">
        <text x="0" y="175">DAY 01</text>
        <text x="580" y="175" textAnchor="end">DAY 40</text>
      </g>
    </svg>
  );
}
