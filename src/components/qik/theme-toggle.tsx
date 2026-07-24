"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="relative flex h-8 w-14 items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-0.5 transition-colors hover:border-white/[0.15] dark:border-white/[0.08] dark:bg-white/[0.03] [.light_&]:border-black/10 [.light_&]:bg-black/[0.04]"
    >
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          theme === "dark"
            ? "ml-auto bg-gradient-to-br from-emerald-400 to-cyan-500 text-black"
            : "ml-0 bg-gradient-to-br from-amber-300 to-orange-400 text-black"
        }`}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-3.5 w-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
