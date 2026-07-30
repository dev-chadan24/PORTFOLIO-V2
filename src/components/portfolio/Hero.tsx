import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, ArrowDownRight, Download } from "lucide-react";
import { profile } from "./data";
import { Portrait } from "./Portrait";
import { profileVideo, signatureImg } from "./media";
import { ease, useScrollDissolve, useMagnetic } from "../../lib/motion";

/**
 * Hero — desktop pairs a text column with a portrait anchor.
 * Calm and confident: no particles, no orbit. Ambient cursor light only.
 */
export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const glowX = useTransform(sx, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(sy, [-1, 1], ["30%", "70%"]);

  const shouldReduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) return;
    let raf = 0;
    const handle = (e: MouseEvent | TouchEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);

      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      raf = requestAnimationFrame(() => {
        mx.set(((clientX - r.left) / r.width) * 2 - 1);
        my.set(((clientY - r.top) / r.height) * 2 - 1);
      });
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("touchmove", handle as EventListener, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("touchmove", handle as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [mx, my, shouldReduceMotion]);

  // Scroll-based dissolve for the mobile portrait — uses shared hook
  const { opacity: mobilePortraitOpacity, scale: mobilePortraitScale, filter: mobilePortraitFilter, y: mobilePortraitY } =
    useScrollDissolve([0, 260, 480]);

  // Desktop portrait — subtle parallax that follows the cursor.
  const portraitX = useTransform(sx, [-1, 1], [-6, 6]);
  const portraitY = useTransform(sy, [-1, 1], [-6, 6]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 pt-28 md:pt-32 pb-24 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Ambient cursor-following aurora — soft, reads as light not effect */}
      <motion.div
        aria-hidden
        style={{ left: shouldReduceMotion ? "50%" : glowX, top: shouldReduceMotion ? "50%" : glowY }}
        className="absolute w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full md:block"
      >
        <div
          className="w-full h-full opacity-[0.35]"
          style={{
            background:
              "radial-gradient(circle at center, var(--glow-strong) 0%, transparent 55%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      <div className="absolute inset-x-0 top-1/2 rule opacity-25 pointer-events-none hidden md:block" aria-hidden />

      {/* Signature background watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ delay: 1.5, duration: 2.5 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ mixBlendMode: "var(--signature-blend)" as any }}
      >
        <img
          src={signatureImg}
          alt=""
          className="w-[120vw] min-w-[800px] max-w-none select-none"
          style={{ filter: "var(--signature-filter)" }}
        />
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease }}
          className="text-eyebrow mb-10 md:mb-16"
        >
          Frontend Engineer &amp; Product Designer
        </motion.p>

        {/* Mobile portrait — first thing users see, dissolves on scroll */}
        <motion.div
          style={{
            opacity: mobilePortraitOpacity,
            scale: mobilePortraitScale,
            filter: mobilePortraitFilter,
            y: mobilePortraitY,
          }}
          className="md:hidden mb-10"
        >
          <Portrait src={profileVideo} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <h1
              id="hero-title"
              className="text-display text-[clamp(2.75rem,10vw,9.5rem)] leading-[0.84] mb-8 md:mb-12"
            >
              <NameReveal text="Chandan" delay={0.35} />
              <span className="block">
                <NameReveal text="Mahapatra" italic delay={0.5} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease }}
              className="text-display text-[clamp(1.15rem,2.2vw,1.85rem)] leading-tight mb-10 md:mb-14 max-w-2xl"
            >
              Turning ideas into{" "}
              <span className="italic text-text-muted">products people actually use.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.6, ease }}
              className="text-lede max-w-xl mb-12"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.55, ease }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4">
                <a
                  href="#work"
                  className="cta-primary group relative inline-flex w-full sm:w-auto justify-center sm:justify-between items-center gap-4 rounded-full pl-6 pr-2 py-2 text-[14px] font-medium bg-text text-bg hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <span>Selected work</span>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-bg/15 transition-colors group-hover:bg-bg/25">
                    <ArrowDownRight className="w-4 h-4" />
                  </span>
                </a>
                <ResumeButton />
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <QuickLink href={`mailto:${profile.email}`} icon={<Mail className="w-3.5 h-3.5" />} label="Email" primary />
                <QuickLink href={profile.linkedin} icon={<Linkedin className="w-3.5 h-3.5" />} label="LinkedIn" external />
                <QuickLink href={profile.github} icon={<Github className="w-3.5 h-3.5" />} label="GitHub" external />
              </div>
            </motion.div>
          </div>

          {/* Desktop portrait column — subtle parallax, no bob */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="hidden md:block lg:col-span-5"
          >
            <motion.div style={{ x: shouldReduceMotion ? 0 : portraitX, y: shouldReduceMotion ? 0 : portraitY }}>
              <Portrait src={profileVideo} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-subtle hidden md:flex"
        style={{ animation: "breathe 5s ease-in-out infinite" }}
        aria-hidden
      >
        <span className="text-eyebrow text-[0.62rem]">scroll</span>
        <span className="w-px h-8 bg-current opacity-60" />
      </div>
    </section>
  );
}

/* ---------- Resume CTA ---------- */

function ResumeButton() {
  return (
    <a
      href={profile.resume}
      download
      className="resume-cta group relative inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2.5 rounded-full px-6 py-3 sm:py-[13px] overflow-hidden"
      style={{
        border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
        background: "color-mix(in oklab, var(--surface) 55%, transparent)",
        backdropFilter: "blur(14px) saturate(160%)",
        color: "var(--text)",
        boxShadow: "inset 0 1px 0 color-mix(in oklab, white 8%, transparent)",
      }}
    >
      {/* Subtle surface shimmer */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 35%, color-mix(in oklab, white 4%, transparent) 50%, transparent 65%)",
        }}
      />
      <Download
        style={{ width: 15, height: 15, flexShrink: 0 }}
        className="relative z-10 text-text-muted group-hover:text-accent transition-colors duration-300"
        strokeWidth={2}
      />
      <span
        className="relative z-10"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        Resume
      </span>
    </a>
  );
}

function QuickLink({
  href,
  icon,
  label,
  external,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`quick-pill group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] border ${
        primary
          ? "border-accent/40 bg-accent/10 text-text"
          : "border-border bg-surface/60 text-text-muted"
      }`}
    >
      <span
        className={`opacity-80 group-hover:opacity-100 transition-opacity ${
          primary ? "text-accent" : ""
        }`}
        aria-hidden
      >
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}

function NameReveal({
  text,
  italic,
  delay = 0,
}: {
  text: string;
  italic?: boolean;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom pr-2 pb-2">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${italic ? "italic font-light text-text-muted" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
