import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Briefcase, User, Code, Mail, Github, Linkedin, FileText, Moon, Sun, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from "../ThemeProvider";
import { profile } from "../portfolio/data";

type Command = {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
  section: "Navigation" | "Links" | "Preferences";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands: Command[] = [
    { id: "home", name: "Home", icon: <Home className="w-4 h-4" />, section: "Navigation", action: () => { navigate({ to: "/" }); window.scrollTo(0,0); setOpen(false); } },
    { id: "work", name: "Work", icon: <Briefcase className="w-4 h-4" />, section: "Navigation", action: () => { navigate({ to: "/" }); setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 100); setOpen(false); } },
    { id: "about", name: "About", icon: <User className="w-4 h-4" />, section: "Navigation", action: () => { navigate({ to: "/" }); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100); setOpen(false); } },
    { id: "contact", name: "Contact", icon: <Mail className="w-4 h-4" />, section: "Navigation", action: () => { navigate({ to: "/" }); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); setOpen(false); } },
    { id: "github", name: "GitHub", icon: <Github className="w-4 h-4" />, section: "Links", action: () => { window.open(profile.github, "_blank"); setOpen(false); } },
    { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, section: "Links", action: () => { window.open(profile.linkedin, "_blank"); setOpen(false); } },
    { id: "resume", name: "Resume", icon: <FileText className="w-4 h-4" />, section: "Links", action: () => { window.open(profile.resume, "_blank"); setOpen(false); } },
    { id: "theme", name: `Toggle Theme (${theme})`, icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, section: "Preferences", action: () => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); } },
  ];

  const filteredCommands = commands.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const sections = ["Navigation", "Links", "Preferences"] as const;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-2xl"
          >
            <div className="flex items-center border-b border-border/40 px-4">
              <Search className="w-5 h-5 text-text-muted mr-3" />
              <input
                ref={inputRef}
                autoFocus
                className="w-full bg-transparent py-5 outline-none placeholder:text-text-muted text-text text-lg"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="text-[10px] text-text-muted font-mono uppercase tracking-wider border border-border/60 rounded px-1.5 py-0.5 ml-3">
                ESC
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {filteredCommands.length === 0 ? (
                <div className="py-14 text-center text-text-muted">
                  No results found.
                </div>
              ) : (
                sections.map((section) => {
                  const items = filteredCommands.filter((c) => c.section === section);
                  if (items.length === 0) return null;
                  
                  return (
                    <div key={section} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-medium text-text-subtle uppercase tracking-wider">
                        {section}
                      </div>
                      <div className="space-y-1">
                        {items.map((command) => (
                          <button
                            key={command.id}
                            onClick={command.action}
                            className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-text hover:bg-elevated/70 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-text-muted group-hover:text-accent transition-colors">
                                {command.icon}
                              </span>
                              <span>{command.name}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
