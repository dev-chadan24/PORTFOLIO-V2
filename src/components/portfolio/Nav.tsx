import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../lib/theme";

const links = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#research", label: "Research", id: "research" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
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

          <ul className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-1.5">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
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

          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="p-2 rounded-full hover:bg-elevated/60 transition-colors text-text-muted hover:text-text"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
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
            <div className="glass-nav rounded-3xl p-3">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] text-text hover:bg-elevated/70 transition-colors"
                    >
                      <span>{l.label}</span>
                      <span className="text-eyebrow">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
