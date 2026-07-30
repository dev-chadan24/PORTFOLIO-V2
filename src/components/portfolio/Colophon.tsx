import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "./data";

export function Colophon() {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 pt-24 pb-12 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top subtle gradient border */}
      <div 
        className="absolute top-0 left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 h-px bg-gradient-to-r from-transparent via-border-strong/30 to-transparent" 
        aria-hidden 
      />

      {/* Main Music Block */}
      <motion.div 
        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center mb-20 md:mb-24"
      >
        {/* Premium Typography Animation */}
        <div className="mb-8 flex flex-wrap justify-center items-center gap-x-[0.4rem] gap-y-1 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-text-subtle">
          {["Chai.", "Code.", "Music.", "Repeat."].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hover:text-text transition-colors duration-500 cursor-default"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -45, filter: "blur(2px)" }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 + 4 * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="ml-0.5 text-[14px] text-text inline-block"
            style={{ textShadow: "0 0 16px var(--accent)" }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ∞
            </motion.span>
          </motion.span>
        </div>
        
        {/* Custom Premium Player Container */}
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-[340px] p-3 rounded-[20px] bg-surface/30 backdrop-blur-xl border border-border/40 hover:border-border/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 mx-auto"
        >
          {/* Subtle inner highlight for glass effect */}
          <div className="absolute inset-0 rounded-[20px] border border-white/5 pointer-events-none" aria-hidden />
          
          <iframe 
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/6WlARP6h4CDVOcY386wW0W?utm_source=generator&si=8f163d58fa5844f7" 
            width="100%" 
            height="152" 
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Footer Composition */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4"
      >
        {/* Left: Branding */}
        <div className="shrink-0 flex items-center justify-center md:justify-start gap-3 flex-wrap">
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-text-subtle font-medium">
            Designed & Built by
          </span>
          <span className="font-serif text-[15px] tracking-[-0.01em] italic text-text">
            Chandan Mahapatra
          </span>
        </div>

        {/* Center: Social pills */}
        <div className="flex items-center justify-center md:justify-end gap-2.5">
          <FooterLink href={profile.github} icon={<Github className="w-[14px] h-[14px]" />} label="GitHub" external />
          <FooterLink href={profile.linkedin} icon={<Linkedin className="w-[14px] h-[14px]" />} label="LinkedIn" external />
          <FooterLink href={`mailto:${profile.email}`} icon={<Mail className="w-[14px] h-[14px]" />} label="Email" />
        </div>
      </motion.div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border/40 bg-surface/20 px-4 py-2 text-[12px] text-text-muted hover:text-text hover:border-border/70 hover:bg-surface/40 hover:shadow-sm transition-all duration-300"
    >
      <span className="opacity-70">{icon}</span>
      <span className="font-medium tracking-wide">{label}</span>
    </a>
  );
}
