import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

const variants = {
  primary:
    "bg-om-blue text-white shadow-[0_10px_30px_-10px_rgb(36_91_255/0.7)] hover:bg-om-cobalt [--icon-bg:var(--om-yellow)] [--icon-fg:var(--om-navy)]",
  accent:
    "bg-om-yellow text-om-navy shadow-[0_10px_30px_-12px_rgb(233_255_87/0.8)] hover:bg-white [--icon-bg:var(--om-navy)] [--icon-fg:var(--om-yellow)]",
  light: "bg-white text-om-navy hover:bg-om-warm [--icon-bg:var(--om-blue)] [--icon-fg:white]",
  ghost:
    "border border-om-navy/15 bg-white/40 text-om-navy backdrop-blur hover:border-om-navy/30 hover:bg-white/70 [--icon-bg:var(--om-navy)] [--icon-fg:white]",
  "ghost-dark":
    "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40 hover:bg-white/10 [--icon-bg:white] [--icon-fg:var(--om-navy)]",
} as const;

export type CtaVariant = keyof typeof variants;

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  magnetic = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  size?: "md" | "lg";
  magnetic?: boolean;
  className?: string;
}) {
  const link = (
    <Link
      href={href}
      className={cn(
        "group/cta relative inline-flex items-center gap-3 rounded-full font-medium transition-[background-color,border-color,color] duration-300 focus-visible:outline-offset-4",
        size === "lg" ? "h-14 pr-2 pl-7 text-base" : "h-12 pr-1.5 pl-5 text-[0.95rem]",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-full bg-[var(--icon-bg)] text-[var(--icon-fg)]",
          size === "lg" ? "size-10" : "size-9",
        )}
      >
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-om group-hover/cta:translate-x-5 group-hover/cta:-translate-y-5" />
        <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-om group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
      </span>
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
