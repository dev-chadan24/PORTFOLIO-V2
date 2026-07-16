import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import { profile } from "./data";
import { Reveal } from "./Reveal";
import { SectionMark } from "./About";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <SectionMark index="06" label="Let's Connect" />

      <Reveal delay={0.05}>
        <h2
          id="contact-title"
          className="text-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] mb-8 max-w-5xl"
        >
          Let's build{" "}
          <span className="italic text-text-muted">something worth shipping.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-lede max-w-2xl mb-16">
          Email is the fastest way in. I usually reply within a day.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Reveal delay={0.2} className="lg:col-span-8">
          <button
            onClick={copy}
            aria-label="Copy email address"
            className="surface-lift group w-full text-left soft-elevated p-8 md:p-12 relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 50%, var(--glow), transparent 60%)",
              }}
            />
            <div className="relative flex items-baseline justify-between mb-6">
              <span className="text-eyebrow inline-flex items-center gap-2">
                <Mail className="w-3 h-3" /> Primary channel · tap to copy
              </span>
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 text-eyebrow text-accent"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </motion.span>
            </div>
            <div className="relative text-display text-[clamp(1.5rem,3.5vw,2.75rem)] leading-tight group-hover:text-accent transition-colors break-all">
              {profile.email}
            </div>
          </button>
        </Reveal>

        <Reveal delay={0.28} className="lg:col-span-4">
          <div className="flat-card p-8 h-full flex flex-col justify-between">
            <div>
              <div className="text-eyebrow mb-4">Also here</div>
              <ChannelLink
                href={profile.linkedin}
                label="LinkedIn"
                hint="chandan-mahapatra"
                icon={<Linkedin className="w-3.5 h-3.5" />}
                external
              />
              <ChannelLink
                href={profile.github}
                label="GitHub"
                hint={profile.githubHandle}
                icon={<Github className="w-3.5 h-3.5" />}
                external
              />
              <ChannelLink
                href={`mailto:${profile.email}`}
                label="Mail app"
                hint="open compose"
                icon={<Mail className="w-3.5 h-3.5" />}
              />
            </div>
            <div className="mt-8 pt-6 border-t border-border/60 text-eyebrow">
              {profile.location}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChannelLink({
  href,
  label,
  hint,
  icon,
  external,
}: {
  href: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between py-4 border-b border-border/40 last:border-0 hover:pl-2 transition-all duration-300"
    >
      <div>
        <div className="text-eyebrow mb-1 inline-flex items-center gap-2">
          <span className="opacity-70">{icon}</span> {label}
        </div>
        <div className="text-text group-hover:text-accent transition-colors">{hint}</div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </a>
  );
}
