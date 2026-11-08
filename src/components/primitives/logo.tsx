import { cn } from "@/lib/utils";

/**
 * OPEN MEDIA wordmark. The mark is an "open" aperture ring — a frame that is
 * never fully closed — with a yellow focal point.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <defs>
        <linearGradient id="om-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#245BFF" />
          <stop offset="1" stopColor="#1744D4" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5a12.5 12.5 0 1 0 12.5 12.5"
        fill="none"
        stroke="url(#om-mark)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="25.2" cy="6.8" r="3.6" fill="#E9FF57" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.02rem] font-semibold tracking-[0.14em]",
          tone === "light" ? "text-white" : "text-om-navy",
        )}
      >
        OPEN<span className="font-normal opacity-70"> MEDIA</span>
      </span>
    </span>
  );
}
