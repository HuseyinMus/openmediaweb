"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

type Line = { text: string; className?: string };

/**
 * Editorial heading entrance: each word rises from behind a mask.
 * The full sentence is also rendered as visually hidden text so screen
 * readers and crawlers read it naturally.
 */
export function SplitWords({
  lines,
  className,
  delay = 0,
  as = "h2",
  inView = true,
  id,
}: {
  lines: Line[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  inView?: boolean;
  id?: string;
}) {
  const Comp = motion[as];
  let wordIndex = 0;

  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
    : { animate: "show" };

  return (
    <Comp id={id} className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{lines.map((l) => l.text).join(" ")}</span>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.text.split(" ").map((word, wi, arr) => {
            const i = wordIndex++;
            return (
              <Fragment key={wi}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className={`inline-block will-change-transform ${line.className ?? ""}`}
                    variants={{
                      hidden: { y: "110%", rotate: 4 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.055 },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < arr.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Comp>
  );
}
