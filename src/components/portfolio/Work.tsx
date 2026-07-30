import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects, type Project } from "./data";
import { projectImages } from "./media";
import { Reveal } from "../ui/Reveal";
import { SectionMark } from "../ui/SectionMark";
import { ImageWithSkeleton } from "../ui/ImageWithSkeleton";

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24"
      aria-labelledby="work-title"
    >
      <SectionMark index="01" label="Selected Work" />

      <Reveal>
        <h2
          id="work-title"
          className="text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-6"
        >
          Work I'm proud of.
          <span className="block italic text-text-muted mt-2">A few, done properly.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-lede max-w-2xl mb-24">
          A short shelf. Each featured piece is one I'd defend line by line —
          the problem, what I tried, what I'd do differently. Older studies sit
          in the archive below.
        </p>
      </Reveal>

      <div className="space-y-40">
        {featured.map((p, i) => (
          <CaseStudyPreview key={p.slug} project={p} reverse={i % 2 === 1} />
        ))}
      </div>

      {archive.length > 0 && (
        <div className="mt-40">
          <Reveal>
            <div className="flex items-baseline justify-between mb-10">
              <p className="text-eyebrow">Archive · earlier work</p>
              <p className="text-eyebrow hidden md:block">{archive.length} studies</p>
            </div>
          </Reveal>
          <ul className="border-t border-border/60">
            {archive.map((p, i) => (
              <ArchiveRow key={p.slug} project={p} index={i} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function StatusPill({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; tone: string }> = {
    shipped: { label: "Shipped", tone: "text-accent border-accent/40 bg-accent/8" },
    completed: {
      label: "Completed",
      tone: "text-[oklch(0.65_0.14_155)] border-[oklch(0.65_0.14_155)]/40 bg-[oklch(0.65_0.14_155)]/8",
    },
    "in-progress": {
      label: "In progress",
      tone: "text-text border-border-strong bg-elevated/60",
    },
    "case-study": { label: "Case study", tone: "text-text-muted border-border" },
    concept: { label: "Concept", tone: "text-text-muted border-border" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full border ${s.tone}`}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

function CaseStudyPreview({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <article className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
        <Reveal>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-display italic text-text-muted text-2xl">
              {project.number}
            </span>
            <span className="text-eyebrow">{project.subtitle}</span>
            <span className="ml-auto">
              <StatusPill status={project.status} />
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mb-6">
            {project.name}
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <blockquote className="relative pl-6 mb-8 max-w-xl">
            <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-accent/60" />
            <p className="text-display italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-text">
              {project.thesis}
            </p>
          </blockquote>
        </Reveal>

        {project.overview && (
          <Reveal delay={0.22}>
            <p className="text-[15px] leading-relaxed text-text-muted mb-8 max-w-xl">
              {project.overview}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.28}>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="cta-primary group relative inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg"
          >
            <span>Read the case study</span>
            <span className="grid place-items-center w-8 h-8 rounded-full bg-bg/15">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""} lg:sticky lg:top-28`}>
        <Reveal delay={0.15}>
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            aria-label={`Open ${project.name} case study`}
            className="block group"
          >
            <ScreenshotSlot project={project} />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

/**
 * ScreenshotSlot — premium project artwork presentation.
 * Uses actual images from assets/Images when available.
 */
function ScreenshotSlot({ project }: { project: Project }) {
  const heroImage = projectImages[project.slug];
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { stiffness: 400, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div 
      className="relative [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[36px] opacity-40 group-hover:opacity-70 blur-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, var(--glow-strong), transparent 60%)",
        }}
      />
      <motion.div 
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        className="relative aspect-[16/10] rounded-[28px] overflow-hidden soft-elevated transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[var(--shadow-lift)] will-change-transform"
      >
        {heroImage ? (
          <ImageWithSkeleton
            src={heroImage}
            alt={`${project.name} — project preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 70% 20%, var(--glow-strong) 0%, transparent 55%), linear-gradient(160deg, var(--elevated-2), var(--surface))",
              }}
            />
            <div className="absolute inset-8 flex flex-col justify-between">
              <div className="flex justify-between text-eyebrow">
                <span>/{project.slug}</span>
                <span>Fig. {project.number}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-display italic text-text-muted text-lg">
                  {project.name}
                </span>
                <span className="text-eyebrow">{project.year}</span>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function ArchiveRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group border-b border-border/60"
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="archive-row grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_1fr_auto] items-center gap-6 py-6 md:py-7 px-2 -mx-2 rounded-lg"
      >
        <span className="text-display italic text-text-muted text-lg">
          {project.number}
        </span>
        <div>
          <div className="text-display text-xl md:text-2xl group-hover:text-accent transition-colors">
            {project.name}
          </div>
          <div className="text-eyebrow mt-1">{project.subtitle}</div>
        </div>
        <div className="hidden md:flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono text-text-subtle uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-eyebrow">{project.year}</span>
          <ArrowUpRight className="w-4 h-4 text-text-subtle group-hover:text-accent transition-colors" />
        </div>
      </Link>
    </motion.li>
  );
}

