"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/primitives/logo";

const KEY = "om-intro-seen";

/**
 * Brief branded intro shown once per browser session on the first page load.
 * Skipped for reduced-motion users and on later navigations.
 */
export function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage unavailable — just play the intro */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setShow(false), seen || reduce ? 0 : 1150);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          aria-hidden="true"
          className="om-loader mesh-night fixed inset-0 z-[100] grid place-items-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <motion.span
              initial={{ rotate: -120, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoMark className="size-12" />
            </motion.span>
            <motion.span
              className="font-display text-3xl font-semibold tracking-[0.18em] text-white"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              OPEN MEDIA
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
