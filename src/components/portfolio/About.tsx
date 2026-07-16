import { snapshot } from "./data";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40 max-w-7xl mx-auto scroll-mt-24"
      aria-labelledby="about-title"
    >
      <SectionMark index="02" label="About" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <h2
              id="about-title"
              className="text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]"
            >
              I don't chase technologies.
              <br />
              <span className="italic text-text-muted">I chase better products.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-[720px] space-y-7">
              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                I'm Chandan.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                I build full-stack products with React, TypeScript, and Python,
                and I'm currently completing my MCA.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                I enjoy working across the entire stack—from designing PostgreSQL
                schemas to refining animation timing—because even the best
                backend feels incomplete behind a frustrating interface.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                Right now I'm focused on two products.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                <span className="text-text font-medium">HarvestIQ</span>{" "}
                transforms volatile live crypto WebSocket data into a dashboard
                people can trust for tax-loss harvesting.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                <span className="text-text font-medium">DoseLoop</span> is a
                modern medication companion designed for people managing multiple
                prescriptions, built around a simple belief:
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text italic">
                Less noise.<br />
                More trust.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                I also enjoy applied research. One of my recent projects compared
                LightGBM against Prophet for electricity load forecasting, where
                the simpler tabular model consistently outperformed the
                sequence-aware approach.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                That experience shaped how I approach engineering today.
              </p>

              <p className="text-[16.5px] leading-[1.85] text-text-muted">
                I don't chase frameworks. I choose technologies based on the
                problem, and I know I've done my job when something that used to
                feel complicated simply feels effortless.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="soft-elevated surface-lift p-8 md:p-10 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, var(--glow-strong), transparent 70%)",
                }}
              />
              <div className="relative flex items-center justify-between mb-8">
                <span className="text-eyebrow">Snapshot</span>
                <span className="text-eyebrow">Updated · 2026</span>
              </div>

              <ul className="relative space-y-6">
                {snapshot.map((group, i) => (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.6 }}
                    className="border-b border-border/40 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="text-eyebrow text-accent mb-3">
                      {group.label}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-border/70 bg-surface/50 px-2.5 py-1 text-[12.5px] text-text"
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
