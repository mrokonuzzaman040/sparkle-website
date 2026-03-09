"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Wand2, Palette, Type } from "lucide-react";

type ThemePreset = "signature" | "sunset" | "emerald";
type FontStyle = "creative" | "classic";

const themePresets: Record<
  ThemePreset,
  { label: string; primary: string; accent: string }
> = {
  signature: {
    label: "Sparkle Signature",
    primary: "oklch(0.43 0.06 182)",
    accent: "oklch(0.97 0 0)",
  },
  sunset: {
    label: "Golden Sunset",
    primary: "oklch(0.72 0.18 55)",
    accent: "oklch(0.9 0.12 35)",
  },
  emerald: {
    label: "Emerald Glow",
    primary: "oklch(0.68 0.18 150)",
    accent: "oklch(0.9 0.08 145)",
  },
};

export function ExperienceAssistant() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemePreset>("signature");
  const [fontStyle, setFontStyle] = useState<FontStyle>("creative");

  // Back to top visibility
  useEffect(() => {
    const handler = () => {
      setShowTop(window.scrollY > 300);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Apply theme + font styles to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const currentTheme = themePresets[theme];
    root.style.setProperty("--primary", currentTheme.primary);
    root.style.setProperty("--accent", currentTheme.accent);

    body.dataset.fontStyle = fontStyle;
  }, [theme, fontStyle]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Assistant toggle button */}
      <div className="fixed right-4 bottom-4 z-[90] flex flex-col items-end gap-3 md:right-6 md:bottom-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-lg backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 items-center gap-2 rounded-full border border-primary/40 bg-background/90 px-4 text-sm font-medium text-primary shadow-xl backdrop-blur hover:bg-primary hover:text-primary-foreground"
          aria-expanded={open}
          aria-label="Open design assistant"
        >
          <Wand2 className="h-4 w-4" />
          Design Assistant
        </button>
      </div>

      {/* Assistant panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="fixed right-4 bottom-20 z-[95] w-[280px] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur md:right-6 md:bottom-24"
          >
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Live Experience Controls
              </p>
            </div>

            <div className="space-y-4 text-sm">
              {/* Color theme */}
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Palette className="h-3 w-3" />
                  Color Mood
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(themePresets) as ThemePreset[]).map((key) => {
                    const preset = themePresets[key];
                    const isActive = theme === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTheme(key)}
                        className={`flex-1 min-w-[80px] rounded-xl border px-2 py-2 text-xs text-left transition ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/60 hover:bg-muted"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: preset.accent }}
                          />
                        </div>
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font style */}
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Type className="h-3 w-3" />
                  Typography
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFontStyle("creative")}
                    className={`rounded-xl border px-2 py-2 text-xs transition ${
                      fontStyle === "creative"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/60 hover:bg-muted"
                    }`}
                  >
                    Creative
                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      Syne + Outfit
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontStyle("classic")}
                    className={`rounded-xl border px-2 py-2 text-xs transition ${
                      fontStyle === "classic"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/60 hover:bg-muted"
                    }`}
                  >
                    Classic
                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      Elegant serif feel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

