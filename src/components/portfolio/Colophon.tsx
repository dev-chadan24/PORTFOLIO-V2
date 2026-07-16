import { Github, Linkedin, Mail } from "lucide-react";
import { NowPlaying } from "./NowPlaying";
import { profile } from "./data";

export function Colophon() {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 pt-16 pb-14 max-w-7xl mx-auto">
      <div className="rule mb-10" aria-hidden />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
        <p className="text-eyebrow">
          Designed &amp; Built by{" "}
          <span className="text-text tracking-normal normal-case font-display text-[14px] italic">
            Chandan Mahapatra
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <FooterLink href={profile.github} icon={<Github className="w-3.5 h-3.5" />} label="GitHub" external />
          <FooterLink href={profile.linkedin} icon={<Linkedin className="w-3.5 h-3.5" />} label="LinkedIn" external />
          <FooterLink href={`mailto:${profile.email}`} icon={<Mail className="w-3.5 h-3.5" />} label="Email" />
        </div>

        <div className="max-w-full overflow-x-auto no-scrollbar -mx-1 px-1">
          <NowPlaying />
        </div>
      </div>
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
      className="quick-pill inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-3.5 py-1.5 text-[12px] text-text-muted"
    >
      <span className="opacity-80">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
