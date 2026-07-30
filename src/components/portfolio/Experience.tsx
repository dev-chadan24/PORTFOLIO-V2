import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { timeline } from "./data";
import { Reveal } from "../ui/Reveal";
import { SectionMark } from "../ui/SectionMark";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked animation for the main timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springConfig = { stiffness: 400, damping: 60, mass: 0.8 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const lineHeight = useTransform(
    shouldReduceMotion ? scrollYProgress : smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="experience"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-48 max-w-5xl mx-auto scroll-mt-24"
      aria-labelledby="experience-title"
    >
      <SectionMark index="04" label="Building Experience" />

      <Reveal>
        <h2
          id="experience-title"
          className="text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mb-6"
        >
          Career progression.
          <span className="block italic text-text-muted mt-2">
            The work, the research, and the build.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-lede max-w-2xl mb-24 md:mb-32">
          A timeline of my growth as an engineer. From early academic foundations
          to published research and production-grade product development.
        </p>
      </Reveal>

      <div className="relative" ref={containerRef}>
        {/* Background track line */}
        <div 
          className="absolute left-[15px] md:left-[23px] top-4 bottom-4 w-px bg-border/40" 
          aria-hidden 
        />
        
        {/* Animated fill line */}
        <motion.div
          className="absolute left-[15px] md:left-[23px] top-4 w-px bg-accent origin-top"
          style={{ height: lineHeight }}
          aria-hidden
        />

        <div className="space-y-12 md:space-y-16">
          {timeline.map((entry, index) => (
            <TimelineItem key={`${entry.year}-${entry.title}`} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: typeof timeline[0]; index: number }) {
  const isResearch = entry.kind === "Research Paper";
  const isInternship = entry.kind === "Internship";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group pl-12 md:pl-20"
    >
      {/* Node indicator */}
      <div 
        className="absolute left-[11px] md:left-[19px] top-2 w-[9px] h-[9px] rounded-full bg-bg border-2 border-border/80 group-hover:border-accent group-hover:bg-accent/20 transition-colors duration-300 z-10" 
        aria-hidden 
      />

      <div className="group/card relative rounded-[24px] p-6 md:p-8 border border-transparent hover:border-border/60 hover:bg-surface/30 transition-all duration-300 ease-out hover:shadow-[var(--shadow-lift)]">
        
        {/* Optional glowing effect for the top item or hover */}
        {isInternship && (
          <div 
            className="absolute -inset-px rounded-[24px] bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" 
            aria-hidden 
          />
        )}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 items-start">
          {/* Left Column: Date & Kind */}
          <div className="pt-1 md:pt-1.5 flex md:flex-col gap-3 md:gap-2 items-baseline md:items-start">
            <time className="text-eyebrow text-text-muted font-medium">{entry.year}</time>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border ${
                isInternship
                  ? "text-accent border-accent/30 bg-accent/5"
                  : isResearch
                  ? "text-[oklch(0.65_0.14_155)] border-[oklch(0.65_0.14_155)]/30 bg-[oklch(0.65_0.14_155)]/5"
                  : "text-text-subtle border-border/60"
              }`}
            >
              {entry.kind}
            </span>
          </div>

          {/* Right Column: Content */}
          <div>
            <h3 className="text-display text-2xl md:text-[1.75rem] leading-[1.2] text-text group-hover/card:text-accent transition-colors duration-300">
              {entry.title}
            </h3>
            
            {(entry.where || entry.subtitle) && (
              <div className="mt-2 text-[15px] font-medium text-text">
                {entry.where && <span>{entry.where}</span>}
                {entry.where && entry.subtitle && <span className="mx-2 text-text-muted">·</span>}
                {entry.subtitle && <span className="text-text-muted">{entry.subtitle}</span>}
              </div>
            )}

            {entry.note && (
              <p className="mt-4 text-[15px] leading-[1.7] text-text-muted max-w-2xl">
                {entry.note}
              </p>
            )}

            {entry.href && (
              <a
                href={entry.href}
                className="inline-flex items-center gap-2 mt-6 text-[13px] font-medium text-text hover:text-accent transition-colors"
              >
                <span>Read the paper</span>
                <span className="text-[10px] leading-none">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}


