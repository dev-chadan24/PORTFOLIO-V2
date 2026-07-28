import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillEcosystem, type SkillNode } from "./data";
import { Reveal } from "../ui/Reveal";
import { SectionMark } from "./About";

/**
 * Skills — a calm solar system.
 *
 * A glass "sun" (IDEA → PRODUCT) anchors the scene. Each cluster rides on
 * its own concentric ring, rotating at a distinct pace. Capsules keep
 * their orientation via a nested counter-rotation. Hover lifts a capsule,
 * throws a soft accent glow, and dims its siblings — the notebook on the
 * right updates instantly with the node's honest note.
 *
 * Desktop only. Mobile falls back to expandable category cards.
 */

type RingSpec = {
  cluster: string;
  intent: string;
  items: SkillNode[];
  radius: number;
  duration: number; // seconds per full revolution
  reverse?: boolean;
  phase?: number; // initial angle offset in degrees
};

export function Skills() {
  const [active, setActive] = useState<{ node: SkillNode; cluster: string } | null>(null);

  // Three orbits — Core inside, Data next, Currently Learning outermost.
  const rings: RingSpec[] = useMemo(() => {
    const byName = Object.fromEntries(skillEcosystem.map((c) => [c.cluster, c]));
    const plan: Array<Pick<RingSpec, "cluster" | "radius" | "duration" | "reverse" | "phase">> = [
      { cluster: "Core", radius: 168, duration: 180, reverse: false, phase: 0 },
      { cluster: "Data", radius: 258, duration: 240, reverse: true, phase: 24 },
      { cluster: "Currently Learning", radius: 348, duration: 320, reverse: false, phase: 12 },
    ];
    return plan
      .filter((p) => byName[p.cluster])
      .map((p) => ({
        ...p,
        intent: byName[p.cluster].intent,
        items: byName[p.cluster].items,
      }));
  }, []);

  const total = rings.reduce((n, r) => n + r.items.length, 0);
  const dimOthers = Boolean(active);

  return (
    <section
      id="skills"
      className="relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24"
      aria-labelledby="skills-title"
    >
      <SectionMark index="03" label="Skills" />
      <Reveal>
        <h2
          id="skills-title"
          className="text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-6"
        >
          Skills that turn
          <span className="italic text-text-muted"> ideas into products.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="text-lede max-w-2xl mb-16">
          I don't collect technologies. Each one on this map is a tool I've
          reached for on a real project — sometimes for years, sometimes for a
          single stubborn afternoon. Hover any capsule for the honest note.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Solar system — desktop only. Floats naturally, no container. */}
        <div className="lg:col-span-8 hidden md:block">
          <div
            className="relative aspect-square w-full"
            style={{ containerType: "inline-size" }}
          >
            {/* deep ambient glow — the only "background" */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-90 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, var(--glow-strong) 0%, transparent 58%)",
              }}
            />
            {/* concentric guide rings — decorative */}
            <svg
              aria-hidden
              viewBox="-450 -450 900 900"
              className="absolute inset-0 w-full h-full opacity-[0.16]"
              preserveAspectRatio="xMidYMid slice"
            >
              {rings.map((r, i) => (
                <circle
                  key={r.cluster}
                  cx={0}
                  cy={0}
                  r={r.radius}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth={0.6}
                  strokeDasharray={i % 2 ? "1.5 8" : "1 12"}
                />
              ))}
            </svg>

            {/* Fixed 900x900 world scaled to fit any container width */}
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="relative"
                style={{
                  width: 900,
                  height: 900,
                  transform: "scale(calc(100cqw / 900))",
                  transformOrigin: "center",
                }}
              >
                <div className="absolute left-1/2 top-1/2 w-0 h-0">
                  {/* Sun */}
                  <Sun />

                  {/* Rings */}
                  {rings.map((ring) => (
                    <div
                      key={ring.cluster}
                      className="absolute left-0 top-0 w-0 h-0"
                      style={{
                        animation: `${ring.reverse ? "orbit-spin-rev" : "orbit-spin"} ${ring.duration}s linear infinite`,
                        willChange: "transform",
                      }}
                    >
                      {ring.items.map((node, i) => {
                        const angle = (ring.phase ?? 0) + (i * 360) / ring.items.length;
                        const isActive =
                          active?.node.name === node.name && active.cluster === ring.cluster;
                        return (
                          <div
                            key={node.name}
                            className="absolute left-0 top-0"
                            style={{
                              transform: `rotate(${angle}deg) translate(${ring.radius}px, 0) translateZ(0)`,
                            }}
                          >
                            <div style={{ transform: `rotate(${-angle}deg) translateZ(0)` }}>
                              <div
                                style={{
                                  animation: `${ring.reverse ? "orbit-spin" : "orbit-spin-rev"} ${ring.duration}s linear infinite`,
                                  willChange: "transform",
                                }}
                              >
                                <div
                                  style={{
                                    animation: `node-float ${6 + (i % 4)}s ease-in-out ${(i * 0.35).toFixed(2)}s infinite`,
                                    willChange: "transform",
                                  }}
                                >
                                  <Capsule
                                    node={node}
                                    cluster={ring.cluster}
                                    active={isActive}
                                    dimmed={dimOthers && !isActive}
                                    onEnter={() => setActive({ node, cluster: ring.cluster })}
                                    onLeave={() => setActive(null)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Orbit meta */}
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="text-eyebrow">
              {total} tools · {rings.length} orbits
            </div>
            <div className="text-eyebrow opacity-70">idea → product</div>
          </div>


          {/* Cluster tabs — reflect the currently hovered/focused cluster */}
          <div className="mt-6 -mx-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-5 lg:gap-7 px-1 border-b border-border/40">
              {rings.map((ring) => {
                const isActive = active?.cluster === ring.cluster;
                return (
                  <button
                    key={ring.cluster}
                    type="button"
                    onMouseEnter={() =>
                      setActive({ node: ring.items[0], cluster: ring.cluster })
                    }
                    onFocus={() =>
                      setActive({ node: ring.items[0], cluster: ring.cluster })
                    }
                    onMouseLeave={() => setActive(null)}
                    onBlur={() => setActive(null)}
                    className={`relative py-2.5 text-[12.5px] whitespace-nowrap transition-colors duration-300 ${
                      isActive ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {ring.cluster}
                    {isActive && (
                      <motion.span
                        layoutId="skill-tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky notebook */}
        <aside className="lg:col-span-4 hidden md:block">
          <div className="lg:sticky lg:top-28">
            <div className="soft-elevated p-8 min-h-[280px] relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, var(--glow-strong), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="text-eyebrow mb-6">Notebook</div>
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.node.name}
                      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="text-eyebrow text-accent mb-3">
                        {active.cluster}
                      </div>
                      <div className="text-display text-3xl md:text-4xl mb-4 leading-[0.95]">
                        {active.node.name}
                      </div>
                      <p className="text-[15px] text-text-muted leading-relaxed">
                        {active.node.note}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-display italic text-2xl md:text-3xl text-text-muted mb-4 leading-tight">
                        Hover any capsule.
                      </div>
                      <p className="text-[14px] text-text-subtle leading-relaxed">
                        Every tool exists to help transform an idea into
                        something you can actually open. Dots mark what I'm
                        actively focused on.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile: expandable cluster cards instead of the orbit. */}
      <div className="mt-8 space-y-3 md:hidden">
        {skillEcosystem.map((c) => (
          <details key={c.cluster} className="soft-elevated group open:pb-2">
            <summary className="cursor-pointer list-none flex items-center justify-between px-6 py-5">
              <div>
                <div className="text-eyebrow text-accent mb-1">{c.cluster}</div>
                <div className="text-[13px] text-text-muted">{c.intent}</div>
              </div>
              <span className="text-text-subtle text-lg transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <ul className="px-6 pb-5 space-y-3 border-t border-border/50 pt-4">
              {c.items.map((it) => (
                <li
                  key={it.name}
                  className="grid grid-cols-[auto_1fr] gap-3 items-baseline"
                >
                  <span
                    className={`text-[11px] font-mono uppercase tracking-[0.14em] ${
                      it.focus ? "text-accent" : "text-text"
                    }`}
                  >
                    {it.name}
                  </span>
                  <span className="text-[13px] text-text-muted leading-snug">
                    {it.note}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- Sun ---------- */

function Sun() {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ animation: "sun-breathe 7s ease-in-out infinite" }}
    >
      {/* outer glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 32%, transparent), transparent 65%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="relative grid place-items-center rounded-full skill-sun"
        style={{ width: 148, height: 148 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-text-muted">
            Idea
          </span>
          <span
            aria-hidden
            className="w-4 h-px bg-accent/70"
            style={{ boxShadow: "0 0 8px var(--accent)" }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-accent">
            Product
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Capsule ---------- */

function Capsule({
  node,
  cluster,
  active,
  dimmed,
  onEnter,
  onLeave,
}: {
  node: SkillNode;
  cluster: string;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isLearning = node.learning;
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      data-active={active || undefined}
      aria-label={`${node.name} — ${cluster}${isLearning ? " (currently learning)" : ""}`}
      className={`skill-capsule ${isLearning ? "skill-capsule--learning" : ""} relative -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[15px] px-3 py-1.5 text-[11.5px] font-mono tracking-[0.06em] text-text`}
      style={{
        opacity: dimmed ? 0.35 : 1,
        filter: dimmed ? "saturate(0.85)" : "none",
      }}
    >
      {node.focus && !isLearning && (
        <span
          aria-hidden
          className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px var(--accent)" }}
        />
      )}
      {isLearning && (
        <span
          aria-hidden
          className="inline-block w-1 h-1 rounded-full bg-accent/70 mr-1.5 align-middle"
        />
      )}
      {node.name}
    </button>
  );
}

