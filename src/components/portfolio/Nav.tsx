import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { useActiveSection } from "../../lib/motion";

const links = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#research", label: "Research", id: "research" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const sectionIds = links.map((l) => l.id);

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94vw,860px)]"
        aria-label="Primary"
      >
        <div
          className={`glass-nav flex items-center gap-3 rounded-full pl-5 pr-2 py-1.5 transition-all duration-500 ${
            scrolled ? "shadow-[0_28px_70px_-30px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <a
            href="#top"
            className="font-display text-[14px] tracking-[-0.02em] text-text hover:text-accent transition-colors whitespace-nowrap"
            aria-label="Chandan Mahapatra — home"
          >
            Chandan<span className="italic text-text-muted"> Mahapatra</span>
          </a>

          <ul className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-1.5" role="list">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] whitespace-nowrap transition-colors duration-300 nav-liquid-item ${
                      isActive ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-liquid-pill"
                        className="absolute inset-0 rounded-full nav-liquid-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.6 }}
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex-1 md:hidden" />

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <button
            className="md:hidden p-2 rounded-full hover:bg-elevated/60 text-text-muted hover:text-text"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,820px)] md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <div className="glass-nav rounded-3xl p-3">
                <ul className="flex flex-col" role="list">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] text-text hover:bg-elevated/70 transition-colors"
                      >
                        <span>{l.label}</span>
                        <span className="text-eyebrow" aria-hidden>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (t: "dark" | "light") => void;
}) {
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Neutral placeholder during SSR to avoid hydration mismatch
    return (
      <button
        aria-label="Toggle theme"
        className="relative w-8 h-8 rounded-full flex items-center justify-center text-text-muted"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-elevated/60 transition-colors text-text-muted hover:text-text"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-auto"
            aria-hidden
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-auto"
            aria-hidden
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}


