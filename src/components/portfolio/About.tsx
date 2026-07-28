import { snapshot } from "./data";
import { Reveal } from "../ui/Reveal";
import { motion } from "framer-motion";

/**
 * About — completely redesigned.
 * Editorial hierarchy: role → philosophy → two products → research note.
 * Premium layout: large left column, tight info panel right.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-44 max-w-7xl mx-auto scroll-mt-24"
      aria-labelledby="about-title"
    >
      <SectionMark index="02" label="About" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left: storytelling column */}
        <div className="lg:col-span-7 space-y-14">
          {/* Headline */}
          <Reveal>
            <h2
              id="about-title"
              className="text-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-tight"
            >
              I build things
              <br />
              <span className="italic text-text-muted">people trust.</span>
            </h2>
          </Reveal>

          {/* Bio — three clear paragraphs */}
          <Reveal delay={0.08}>
            <div className="space-y-6 max-w-[640px]">
              <p className="text-[17px] leading-[1.8] text-text-muted">
                I'm{" "}
                <span className="text-text font-medium">Chandan Mahapatra</span>,{" "}
                a full-stack engineer currently finishing up my MCA. I love being involved in the entire lifecycle of a product—whether it's architecting the database or tweaking an animation curve until it feels just right.
              </p>
              <p className="text-[17px] leading-[1.8] text-text-muted">
                I've always believed that understanding the full stack makes you better at every part of it. Knowing how data is structured helps me build more intuitive interfaces, and understanding user behavior helps me design better schemas.
              </p>
            </div>
          </Reveal>

          {/* Philosophy statement — editorial pull quote */}
          <Reveal delay={0.14}>
            <div
              className="relative pl-7 py-1"
              style={{
                borderLeft: "2px solid color-mix(in oklab, var(--accent) 55%, transparent)",
              }}
            >
              <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.6] text-text font-display italic tracking-[-0.02em]">
                "At the end of the day, I just want to build software that works reliably, long after the launch hype fades."
              </p>
            </div>
          </Reveal>

          {/* Two products */}
          <Reveal delay={0.18}>
            <div className="space-y-5 max-w-[640px]">
              <p className="text-eyebrow">Currently building</p>
              <div className="space-y-4">
                <ProductLine
                  name="HarvestIQ"
                  tagline="Tax-loss harvesting dashboard"
                  description="Turns volatile live crypto portfolio data into a single, legible surface — gains, losses, and what to do ranked by dollar impact."
                  delay={0.22}
                />
                <ProductLine
                  name="DoseLoop"
                  tagline="Medication companion"
                  description="A calm alternative to alarm-driven reminder apps. Built around the thesis that quieter interfaces create better habits."
                  delay={0.28}
                />
              </div>
            </div>
          </Reveal>

          {/* Research note */}
          <Reveal delay={0.32}>
            <div
              className="rounded-2xl px-6 py-5"
              style={{
                background: "color-mix(in oklab, var(--surface) 60%, transparent)",
                border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
              }}
            >
              <span className="text-eyebrow block mb-2">Research</span>
              <p className="text-[15px] leading-[1.7] text-text-muted">
                My recent comparative study found that a gradient-boosted{" "}
                <span className="text-text">LightGBM</span> model with
                hand-crafted lag features consistently outperformed{" "}
                <span className="text-text">Prophet</span> on electricity load
                forecasting — including on high-variance peak days. The lesson:
                feature engineering matters more than model complexity.
              </p>
            </div>
          </Reveal>

          {/* Animated signature */}
          <Reveal delay={0.38}>
            <AnimatedSignature />
          </Reveal>
        </div>

        {/* Right: Snapshot panel */}
        <div className="lg:col-span-5">
          <Reveal delay={0.12}>
            <div
              className="soft-elevated surface-lift p-8 md:p-10 relative overflow-hidden"
              style={{ position: "sticky", top: "7rem" }}
            >
              {/* Ambient glow */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, var(--glow-strong), transparent 70%)",
                  opacity: 0.5,
                }}
              />

              <div className="relative flex items-center justify-between mb-8">
                <span className="text-eyebrow">Snapshot</span>
                <span className="text-eyebrow">2026</span>
              </div>

              <ul className="relative space-y-6">
                {snapshot.map((group, i) => (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b pb-6 last:border-0 last:pb-0"
                    style={{ borderColor: "color-mix(in oklab, var(--border) 40%, transparent)" }}
                  >
                    <div className="text-eyebrow text-accent mb-3">
                      {group.label}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] text-text"
                          style={{
                            borderColor: "color-mix(in oklab, var(--border) 70%, transparent)",
                            background: "color-mix(in oklab, var(--surface) 50%, transparent)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProductLine({
  name,
  tagline,
  description,
  delay,
}: {
  name: string;
  tagline: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 items-start group"
    >
      <div
        className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150"
        style={{ background: "var(--accent)" }}
      />
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[15px] font-medium text-text">{name}</span>
          <span
            className="text-[11px] font-mono uppercase tracking-[0.14em]"
            style={{ color: "var(--text-subtle)" }}
          >
            {tagline}
          </span>
        </div>
        <p className="text-[14px] leading-[1.65]" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function SectionMark({ index, label }: { index: string; label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-14">
        <span className="text-display italic text-3xl text-text-muted">{index}</span>
        <span className="hairline h-px bg-border flex-1 max-w-[80px]" />
        <span className="text-eyebrow">{label}</span>
      </div>
    </Reveal>
  );
}

function AnimatedSignature() {
  return (
    <div
      className="relative w-44 h-14"
      aria-label="Chandan Mahapatra — signature"
    >
      <motion.svg
        viewBox="0 0 300 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ color: "var(--text-subtle)" }}
      >
        <motion.path
          d="M10,55 C18,35 30,28 38,40 C46,52 42,65 32,68 C22,71 16,62 20,52 C26,38 38,30 52,35 C62,38 58,58 62,65 C66,72 74,60 78,50 C84,36 86,24 82,34 C78,44 72,62 76,70 C80,76 90,64 96,54 C106,38 114,30 122,34 C130,38 126,58 130,62 C138,68 148,52 158,44 C168,36 178,40 182,52 C186,62 178,72 170,70 C160,66 162,50 170,44 C182,36 198,42 210,48 C222,54 218,68 228,66 C238,64 248,48 262,42 C274,36 288,44 294,52"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}
