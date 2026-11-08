"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BeforeAfter } from "@/components/primitives/before-after";
import { ConceptBadge } from "@/components/primitives/eyebrow";
import { CtaLink } from "@/components/primitives/cta-link";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

const sizeClass: Record<Project["size"], string> = {
  tall: "md:col-span-4 md:row-span-2 aspect-[4/5] md:aspect-auto",
  wide: "md:col-span-8 aspect-[4/3] md:aspect-auto",
  square: "md:col-span-4 aspect-square md:aspect-auto",
};

const categoryLabel = (id: ProjectCategory) => projectCategories.find((c) => c.id === id)?.label ?? id;

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"gallery" | "compare">("gallery");

  return (
    <Dialog
      open={!!project}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setActive(0);
          setMode("gallery");
        }
      }}
    >
      <DialogContent className="max-h-[92svh] w-[calc(100%-1.5rem)] overflow-y-auto rounded-[1.75rem] border-none bg-white p-0 sm:max-w-5xl">
        {project && (
          <div className="grid lg:grid-cols-5">
            <div className="bg-om-navy p-3 sm:p-4 lg:col-span-3">
              {mode === "compare" && project.beforeAfter ? (
                <BeforeAfter
                  image={project.beforeAfter}
                  productLabel={project.title.split(" ")[0]}
                  chips={[project.sector, "Konsept"]}
                  className="sm:aspect-[4/5]"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={project.gallery[active].src}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={project.gallery[active].src}
                        alt={project.gallery[active].alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
              {mode === "gallery" && project.gallery.length > 1 && (
                <ul className="mt-3 flex gap-2" aria-label="Galeri görselleri">
                  {project.gallery.map((img, i) => (
                    <li key={img.src}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Görsel ${i + 1}: ${img.alt}`}
                        aria-current={i === active}
                        className={cn(
                          "relative block size-16 overflow-hidden rounded-xl ring-2 transition sm:size-20",
                          i === active ? "ring-om-yellow" : "opacity-60 ring-transparent hover:opacity-100",
                        )}
                      >
                        <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col p-6 sm:p-8 lg:col-span-2">
              <ConceptBadge className="self-start" />
              <p className="mt-6 text-eyebrow text-[0.7rem] text-om-blue">
                {categoryLabel(project.category)} · {project.sector}
              </p>
              <DialogTitle className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-om-navy">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-4 text-base leading-relaxed text-om-navy/70">{project.summary}</DialogDescription>

              {project.beforeAfter && (
                <div className="mt-6 inline-flex self-start rounded-full bg-om-warm p-1 text-sm" role="group" aria-label="Görünüm">
                  {(["gallery", "compare"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      aria-pressed={mode === m}
                      className={cn(
                        "rounded-full px-4 py-2 font-medium transition-colors",
                        mode === m ? "bg-om-navy text-white" : "text-om-navy/70 hover:text-om-navy",
                      )}
                    >
                      {m === "gallery" ? "Galeri" : "Önce / Sonra"}
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-6 rounded-2xl bg-om-warm p-4 text-sm text-om-navy/65">
                Bu bir konsept çalışmadır; gerçek bir müşteri projesi değildir. Görseller temsilidir.
              </p>
              <div className="mt-auto pt-8">
                <CtaLink href="/contact" magnetic={false}>
                  Benzer bir proje başlatın
                </CtaLink>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="bg-om-warm pb-24 md:pb-36" aria-label="Portfolyo">
      <div className="container-om">
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div role="toolbar" aria-label="Kategoriye göre filtrele" className="inline-flex gap-1 rounded-full border border-om-navy/10 bg-white p-1">
            {[{ id: "all" as const, label: "Tümü" }, ...projectCategories].map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "text-white" : "text-om-navy/70 hover:text-om-navy",
                  )}
                >
                  {active && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-om-blue" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} proje gösteriliyor
        </p>

        <motion.ul layout className="mt-10 grid grid-flow-dense gap-4 md:auto-rows-[15rem] md:grid-cols-12 lg:auto-rows-[17rem]">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn("relative", sizeClass[p.size])}
              >
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] bg-om-navy text-left"
                  aria-label={`${p.title} — ayrıntıları aç`}
                >
                  <Image
                    src={p.cover.src}
                    alt={p.cover.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-om group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-om-navy/85 via-om-navy/0 to-transparent transition-opacity duration-500 group-hover:from-om-navy/90" />
                  <ConceptBadge className="absolute top-4 left-4" />
                  <span className="absolute top-4 right-4 grid size-10 scale-75 place-items-center rounded-full bg-om-yellow text-om-navy opacity-0 transition-all duration-500 ease-om group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                    <Plus className="size-4" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-5 md:p-6">
                    <span className="text-eyebrow block text-[0.65rem] text-om-soft">
                      {categoryLabel(p.category)} · {p.sector}
                    </span>
                    <span className="mt-2 flex items-end justify-between gap-4">
                      <span className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">{p.title}</span>
                      <ArrowUpRight className="size-5 shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
