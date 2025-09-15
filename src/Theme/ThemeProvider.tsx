import { useEffect, useState } from "react";
import { ThemeCtx, type Theme, type ThemeResolved } from "./ThemeContext";

const getSystem = (): ThemeResolved =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("theme") as Theme) || "system";
    } catch {
      return "system";
    }
  });

  const [resolved, setResolved] = useState<ThemeResolved>(() => (theme === "system" ? getSystem() : theme));

  // Selalu sinkronkan resolved ketika theme berubah
  useEffect(() => {
    setResolved(theme === "system" ? getSystem() : theme);
  }, [theme]);

  // Update kelas pada <html> + persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.classList.toggle("light", resolved === "light");
    root.setAttribute("data-theme", resolved);
    try {
      localStorage.setItem("theme", theme);
    } catch { /* empty */ }
  }, [resolved, theme]);

  // Dengarkan perubahan system ketika theme=system, dan update resolved (bukan DOM langsung)
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const toggle = () => setTheme(resolved === "dark" ? "light" : "dark");

  return <ThemeCtx.Provider value={{ theme, resolved, setTheme, toggle }}>{children}</ThemeCtx.Provider>;
}