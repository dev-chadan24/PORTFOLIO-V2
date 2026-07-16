import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ThemeProvider } from "../lib/theme";
import { projects } from "../components/portfolio/data";
import { projectImages } from "../components/portfolio/projectImages";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Chandan Mahapatra" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — Chandan Mahapatra`;
    const desc = project.thesis;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <ThemeProvider>
      <main className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-display text-4xl mb-4">Case study not found.</h1>
          <Link to="/" className="text-accent hover:underline">
            ← Back to work
          </Link>
        </div>
      </main>
    </ThemeProvider>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const heroImage = projectImages[project.slug];

  return (
    <ThemeProvider>
      <div className="grain-overlay" aria-hidden />
      <main className="min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-32 max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-eyebrow inline-flex items-center gap-2 mb-16 hover:text-text transition-colors"
        >
          ← Selected work
        </Link>

        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-display italic text-2xl text-text-muted">
            {project.number}
          </span>
          <span className="text-eyebrow">{project.subtitle}</span>
        </div>

        <h1 className="text-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] mb-10">
          {project.name}
        </h1>

        <blockquote className="relative pl-6 mb-14 max-w-2xl">
          <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-accent/60" />
          <p className="text-display italic text-[clamp(1.35rem,2.2vw,1.85rem)] leading-snug text-text">
            {project.thesis}
          </p>
        </blockquote>

        {/* Hero artwork — premium product showcase */}
        <figure className="mb-16 relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[36px] opacity-30 blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 40% 30%, var(--glow-strong), transparent 60%)",
            }}
          />
          <div className="relative rounded-[24px] overflow-hidden soft-elevated">
            {heroImage ? (
              <img
                src={heroImage}
                alt={`${project.name} — project showcase`}
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="aspect-[16/9] relative">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, var(--glow-strong), transparent 60%), linear-gradient(160deg, var(--elevated-2), var(--surface))",
                  }}
                />
                <div className="absolute inset-8 flex flex-col justify-between text-eyebrow">
                  <div className="flex justify-between">
                    <span>/{project.slug}</span>
                    <span>Fig. {project.number}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-display italic text-text-muted text-lg">
                      {project.name}
                    </span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </figure>

        <div className="space-y-10 mb-14 max-w-2xl">
          {project.overview && <JournalField label="Overview" body={project.overview} />}

          {/* Key Learning — editorial quote */}
          {project.keyLearning && (
            <div className="py-12 my-4">
              <div className="text-eyebrow text-accent mb-8">Key Learning</div>
              <blockquote className="max-w-xl mx-auto text-center">
                <p className="text-display italic text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.15] text-text mb-8">
                  "{project.keyLearning.quote}"
                </p>
                <p className="text-[15px] leading-[1.8] text-text-muted max-w-lg mx-auto">
                  {project.keyLearning.description}
                </p>
              </blockquote>
            </div>
          )}

          {project.problem && <JournalField label="Problem" body={project.problem} />}
          {project.whyBuilt && <JournalField label="Why I built it" body={project.whyBuilt} />}
          {project.role && <JournalField label="My role" body={project.role} />}
          <div>
            <div className="text-eyebrow text-accent mb-3">Technology used</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t: string) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {project.challenges && <JournalField label="Challenges" body={project.challenges} />}
          {project.solutions && <JournalField label="Solutions" body={project.solutions} />}
          {project.deployment && <JournalField label="Deployment" body={project.deployment} />}
          {project.learnings && <JournalField label="Key learnings" body={project.learnings} />}
          {project.future && <JournalField label="Future improvements" body={project.future} />}
        </div>

        {project.highlights && (
          <div className="mb-14">
            <div className="text-eyebrow mb-6">Highlights</div>
            <ul className="space-y-3 max-w-2xl">
              {project.highlights.map((h: string, i: number) => (
                <li
                  key={h}
                  className="grid grid-cols-[24px_1fr] gap-3 text-text-muted leading-relaxed"
                >
                  <span className="text-eyebrow text-accent pt-1">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="quick-pill inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[13px] text-text"
            >
              Live demo <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links?.map((l: { label: string; href: string }) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted"
            >
              {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
}

function JournalField({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-border/50 pt-6">
      <div className="text-eyebrow text-accent mb-3">{label}</div>
      <p className="text-[15.5px] leading-[1.75] text-text-muted">{body}</p>
    </div>
  );
}

