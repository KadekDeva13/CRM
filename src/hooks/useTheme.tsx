import { useContext } from "react";
import { ThemeCtx } from "../Theme/ThemeContext";
export const useTheme = () => useContext(ThemeCtx);