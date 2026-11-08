import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
  tone = "dark",
  index,
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  index?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow inline-flex items-center gap-3",
        tone === "light" ? "text-white/70" : "text-om-navy/60",
        className,
      )}
    >
      {index ? (
        <span className={cn("tabular-nums", tone === "light" ? "text-om-yellow" : "text-om-blue")}>{index}</span>
      ) : (
        <span aria-hidden="true" className={cn("h-px w-6", tone === "light" ? "bg-om-yellow" : "bg-om-blue")} />
      )}
      <span>{children}</span>
    </p>
  );
}

/** Honest label for concept / demonstration work. */
export function ConceptBadge({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-medium tracking-wide uppercase",
        tone === "light" ? "glass text-om-navy" : "glass-dark text-white",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-om-yellow ring-1 ring-om-navy/20" />
      Konsept çalışma
    </span>
  );
}
