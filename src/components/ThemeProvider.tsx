import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * ThemeProvider — central theme management.
 * Uses a "theme-switching" class during transitions to enable smooth
 * color interpolation without polluting every element with transitions.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  // Phase 1: Always start with defaultTheme (SSR + client both use "system")
  // This guarantees identical HTML on server and client, eliminating hydration mismatch.
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Phase 2: After hydration, read stored preference and apply
    const stored = localStorage.getItem(storageKey) as Theme | null;
    const resolved = stored || defaultTheme;
    setThemeState(resolved);
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    // Enable smooth transitions for all elements during the switch
    const root = document.documentElement;
    root.classList.add("theme-switching");

    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);

    // Remove the transitioning class after 500ms (luxury feel)
    const timer = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 500);

    return () => clearTimeout(timer);
  };


  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
