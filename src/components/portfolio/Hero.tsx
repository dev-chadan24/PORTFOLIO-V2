import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, ArrowDownRight, Download } from "lucide-react";
import { profile } from "./data";
import { Portrait } from "./Portrait";
import { profileVideo, signatureImg } from "./projectImages";
import { ease, useMagnetic } from "../../lib/motion";

/**
 * Hero — desktop pairs a text column with a portrait anchor.
 * Calm and confident: no particles, no orbit. Ambient cursor light only.
 */
export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22 });
  const sy = useSpring(my, { stiffness: 55, damping: 22 });
  const glowX = useTransform(sx, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(sy, [-1, 1], ["30%", "70%"]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      });
    };
    window.addEventListener("mousemove", handle);
    return () => {
      window.removeEventListener("mousemove", handle);
      cancelAnimationFrame(raf);
    };
  }, [mx, my]);

  // Scroll-based dissolve for the mobile portrait
  const { scrollY } = useScroll();
  const mobilePortraitOpacity = useTransform(scrollY, [0, 260, 480], [1, 0.6, 0]);
  const mobilePortraitScale = useTransform(scrollY, [0, 480], [1, 0.92]);
  const mobilePortraitBlur = useTransform(scrollY, [0, 480], [0, 8]);
  const mobilePortraitFilter = useTransform(mobilePortraitBlur, (b) => `blur(${b}px)`);
  const mobilePortraitY = useTransform(scrollY, [0, 480], [0, -24]);

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
        style={{ left: glowX, top: glowY }}
        className="absolute w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full hidden md:block"
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
        animate={{ opacity: 0.08 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden mix-blend-screen"
      >
        <img 
          src={signatureImg} 
          alt="" 
          className="w-[120vw] min-w-[800px] max-w-none select-none"
          style={{ filter: "invert(1) brightness(1.08)" }}
        />
      </motion.div>

      <div className="relative w-full max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="text-eyebrow mb-10 md:mb-16"
        >
          Developer · building products end to end
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease }}
              className="text-display text-[clamp(1.15rem,2.2vw,1.85rem)] leading-tight mb-10 md:mb-14 max-w-2xl"
            >
              Turning ideas into{" "}
              <span className="italic text-text-muted">products people actually use.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease }}
              className="text-lede max-w-xl mb-12"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-1">
                <a
                  href="#work"
                  className="cta-primary group relative inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-3 rounded-full pl-5 pr-2 py-2.5 sm:py-2 text-sm bg-text text-bg"
                >
                  <span>Selected work</span>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-bg/15 transition-colors">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </span>
                </a>
                <ResumeButton />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <QuickLink href={`mailto:${profile.email}`} icon={<Mail className="w-3.5 h-3.5" />} label="Email" primary />
                <QuickLink href={profile.linkedin} icon={<Linkedin className="w-3.5 h-3.5" />} label="LinkedIn" external />
                <QuickLink href={profile.github} icon={<Github className="w-3.5 h-3.5" />} label="GitHub" external />
              </div>
            </motion.div>
          </div>

          {/* Desktop portrait column — subtle parallax, no bob */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 1.4, ease }}
            className="hidden md:block lg:col-span-5"
          >
            <motion.div style={{ x: portraitX, y: portraitY }}>
              <Portrait src={profileVideo} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-subtle hidden md:flex"
        style={{ animation: "breathe 5s ease-in-out infinite" }}
      >
        <span className="text-eyebrow text-[0.62rem]">scroll</span>
        <span className="w-px h-8 bg-current opacity-60" />
      </div>
    </section>
  );
}

/* ---------- Résumé CTA ---------- */

function ResumeButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const { x, y } = useMagnetic(ref, 0.25);

  return (
    <motion.a
      ref={ref}
      href={profile.resume}
      download
      style={{ x, y }}
      className="resume-cta group relative inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 rounded-full px-4 py-2 border border-border bg-surface/60 text-text"
    >
      <Download
        style={{ width: 15, height: 15, flexShrink: 0 }}
        className="text-accent transition-transform duration-500 group-hover:translate-y-px"
        strokeWidth={1.75}
      />
      <span
        style={{
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        Resume
      </span>
    </motion.a>
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
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.15, delay, ease }}
        className={`block ${italic ? "italic font-light text-text-muted" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
