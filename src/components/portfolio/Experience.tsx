import { motion } from "framer-motion";
import { timeline } from "./data";
import { Reveal } from "./Reveal";
import { SectionMark } from "./About";

/**
 * Experience — a single vertical timeline that folds together
 * internships, projects, research, and learning. No school-level noise.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40 max-w-4xl mx-auto scroll-mt-24"
      aria-labelledby="experience-title"
    >
      <SectionMark index="04" label="Building Experience" />

      <Reveal>
        <h2
          id="experience-title"
          className="text-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] mb-6"
        >
          Where the time went
          <span className="italic text-text-muted"> — projects, research, and the learning between.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-lede max-w-2xl mb-16">
          Not every entry is a job. Some are things I built alone, some are
          rooms I sat in, some are ideas I kept working on after class ended.
        </p>
      </Reveal>

      <ol className="relative border-l border-border/60 ml-2">
        {timeline.map((e, i) => {
          const isResearch = e.kind === "Research Paper";
          const content = (
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 items-baseline">
              <div className="text-eyebrow">{e.year}</div>
              <div>
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.18em] ${
                      isResearch ? "text-accent" : "text-accent"
                    }`}
                  >
                    {e.kind}
                  </span>
                  <span
                    className={`text-display ${
                      isResearch
                        ? "text-lg md:text-xl leading-snug max-w-2xl"
                        : "text-xl md:text-2xl"
                    }`}
                  >
                    {e.title}
                  </span>
                </div>
                {e.where && (
                  <div className="text-text-muted text-sm mb-1">{e.where}</div>
                )}
                {e.note && (
                  <div className="text-[14px] text-text-muted leading-relaxed">
                    {e.note}
                  </div>
                )}
              </div>
            </div>
          );
          return (
            <motion.li
              key={`${e.year}-${e.title}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative pl-8 md:pl-12 pb-12 last:pb-0"
            >
              <span className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-bg border-2 border-accent" />
              {e.href ? (
                <a
                  href={e.href}
                  className="block group hover:opacity-100 opacity-100 transition-opacity"
                >
                  {content}
                  <span className="mt-2 inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-text-subtle group-hover:text-accent transition-colors">
                    Read the paper →
                  </span>
                </a>
              ) : (
                content
              )}
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

