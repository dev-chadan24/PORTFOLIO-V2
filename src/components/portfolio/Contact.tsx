import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, Mail, Linkedin, Github, Loader2, AlertCircle } from "lucide-react";
import { profile } from "./data";
import { Reveal } from "../ui/Reveal";
import { SectionMark } from "../ui/SectionMark";
import { sendContactEmail } from "../../server/actions";
import { z } from "zod";
import confetti from "canvas-confetti";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("honeypot") as string,
    };
    
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const schema = z.object({
        name: z.string().min(1, "Please provide your name"),
        email: z.string().email("Please provide a valid email"),
        message: z.string().min(10, "Please provide a slightly longer message"),
      });
      
      schema.parse(data);
      
      const res = await sendContactEmail({ data });
      if (res?.success) {
        setStatus("success");
        // Trigger a premium, restrained confetti burst
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 100 };
        
        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) { return clearInterval(interval); }
          const particleCount = 25 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: 0.5, y: 0.6 } });
        }, 250);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError && err.issues.length > 0) {
        setErrorMessage(err.issues[0].message);
      } else {
        setErrorMessage(err?.message || "Failed to send message. Please try again later.");
      }
      setStatus("error");
    }
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
          <div className="surface-lift soft-elevated p-8 md:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -inset-1 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 0%, var(--glow), transparent 60%)",
              }}
            />
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6"
                  >
                    <motion.svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.polyline
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        points="20 6 9 17 4 12"
                      />
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-display text-3xl mb-3">Message sent</h3>
                  <p className="text-text-muted max-w-md">
                    Thanks for reaching out. I'll get back to you within a day.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                  noValidate
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="text-eyebrow inline-flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Direct line
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-text-muted">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={status === "loading"}
                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        placeholder="Rahul Sharma"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-text-muted">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={status === "loading"}
                        className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        placeholder="rahul@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-text-muted">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      disabled={status === "loading"}
                      rows={5}
                      className="w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}

                  <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-[14px] font-medium transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={copy}
                      className="group inline-flex items-center justify-center gap-2 text-[13px] text-text-muted hover:text-text transition-colors"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />}
                      {copied ? "Copied to clipboard" : "or copy email address"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
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

