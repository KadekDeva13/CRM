import { createContext } from "react";
export type Theme = "light" | "dark" | "system";
export type ThemeResolved = "light" | "dark";
export const ThemeCtx = createContext<{
  theme: Theme;
  resolved: ThemeResolved;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}>({ theme: "system", resolved: "light", setTheme: () => {}, toggle: () => {} });