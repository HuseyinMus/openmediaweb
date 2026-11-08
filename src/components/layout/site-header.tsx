"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/primitives/logo";
import { CtaLink } from "@/components/primitives/cta-link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide on fast downward scroll deep in the page, reveal on scroll up.
    setHidden(y > 480 && y > prev + 4);
  });

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-om-yellow px-4 py-2 text-sm font-medium text-om-navy focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        İçeriğe geç
      </a>
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 rounded-full pr-2 pl-5 transition-[background-color,box-shadow,border-color] duration-500",
          scrolled ? "glass" : "border border-transparent",
        )}
      >
        <Link href="/" aria-label="Open Media ana sayfa" className="shrink-0 rounded-full">
          <Logo />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full p-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active ? "text-white" : "text-om-navy/75 hover:text-om-navy",
                    )}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-om-navy"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CtaLink href="/contact" variant="primary" magnetic={false}>
              Projenizi Başlatın
            </CtaLink>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid size-12 place-items-center rounded-full bg-om-navy text-white lg:hidden"
              aria-label="Menüyü aç"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="mesh-night w-full max-w-none border-none bg-om-navy-2 p-0 text-white data-[side=right]:w-full data-[side=right]:sm:max-w-md [&_[data-slot=sheet-close]]:top-6 [&_[data-slot=sheet-close]]:right-6 [&_[data-slot=sheet-close]]:size-11 [&_[data-slot=sheet-close]]:rounded-full [&_[data-slot=sheet-close]]:bg-white/10 [&_[data-slot=sheet-close]]:text-white"
            >
              <div className="flex h-full flex-col px-6 pt-7 pb-8">
                <Logo tone="light" />
                <SheetTitle className="sr-only">Site menüsü</SheetTitle>
                <SheetDescription className="sr-only">Sayfalar arasında gezinin</SheetDescription>
                <nav aria-label="Mobil menü" className="mt-14">
                  <ul className="space-y-1">
                    {[...mainNav, { href: "/contact", label: "İletişim" }].map((item, i) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className="group flex items-baseline justify-between border-b border-white/10 py-4"
                          >
                            <span className={cn("font-display text-4xl font-medium tracking-tight", active ? "text-om-yellow" : "text-white")}>
                              {item.label}
                            </span>
                            <span className="font-display text-xs text-white/40 tabular-nums">0{i + 1}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex h-14 items-center justify-between rounded-full bg-om-yellow pr-2 pl-6 font-medium text-om-navy"
                  >
                    Projenizi Başlatın
                    <span className="grid size-10 place-items-center rounded-full bg-om-navy text-om-yellow">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
