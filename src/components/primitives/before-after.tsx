"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after comparison. The "before" side simulates a typical
 * unedited phone photo (dull colour, flat light, awkward crop) and the "after"
 * side shows an art-directed presentation. It is a conceptual demonstration.
 */
export function BeforeAfter({
  image,
  productLabel = "Konsept ürün",
  chips = [],
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  image: SiteImage;
  productLabel?: string;
  chips?: string[];
  sizes?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(97, Math.max(3, p)));
  }, []);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragging.current) update(e.clientX);
  }
  function onPointerUp() {
    dragging.current = false;
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(3, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(97, p + step));
    else if (e.key === "Home") setPos(3);
    else if (e.key === "End") setPos(97);
    else return;
    e.preventDefault();
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[1.75rem] select-none sm:aspect-[5/4]",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER — art-directed */}
      <div className="absolute inset-0">
        <Image src={image.src} alt={`Sonra: ${image.alt}, profesyonel ışık ve sahne düzeni`} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-om-navy/70 via-om-navy/5 to-om-blue/10" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_20%,rgb(233_255_87/0.18),transparent_70%)] mix-blend-screen" />
        <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-end justify-between gap-3 sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-[45%] sm:flex-col sm:items-end">
          <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{productLabel}</p>
          <ul className="flex flex-wrap justify-end gap-2">
            {chips.map((c) => (
              <li key={c} className="glass-dark rounded-full px-3 py-1.5 text-xs font-medium text-white">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BEFORE — unedited look */}
      <div
        className="absolute inset-0 bg-[#cdccc7]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 origin-[30%_75%] scale-[1.5] -rotate-3 [filter:saturate(0.25)_contrast(0.68)_brightness(0.82)_sepia(0.4)_blur(1.2px)]">
          <Image src={image.src} alt="" fill sizes={sizes} className="object-cover object-[25%_80%]" />
        </div>
        {/* yellow indoor colour cast + harsh on-camera flash hotspot */}
        <div className="absolute inset-0 bg-[#9a8640]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(28%_24%_at_38%_42%,rgb(255_255_240/0.75),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_45%,rgb(40_36_20/0.45)_100%)]" />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-om-navy uppercase">
        Önce
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-om-yellow px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-om-navy uppercase">
        Sonra
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_20px_rgb(0_0_0/0.3)]" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Önce ve sonra karşılaştırması"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`Görselin yüzde ${Math.round(pos)} kadarı “önce” hâlini gösteriyor`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-om-navy shadow-[var(--om-shadow-lift)] ring-4 ring-white/30 transition-transform hover:scale-105 focus-visible:outline-om-yellow active:scale-95"
        >
          <MoveHorizontal className="size-5" />
        </div>
      </div>
    </div>
  );
}
