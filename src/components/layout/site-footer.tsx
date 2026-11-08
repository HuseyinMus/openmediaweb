import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/primitives/logo";
import { mainNav, site } from "@/data/site";
import { services } from "@/data/services";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-eyebrow mb-5 font-sans tracking-[0.16em] text-white/45">{children}</h2>;
}

function Channel({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    return (
      <span className="text-white/45">
        {label} <span className="text-xs text-white/30">· yakında</span>
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline text-white/80 hover:text-white">
      {label}
    </a>
  );
}

export function SiteFooter() {
  const { email, instagram, linkedin } = site.contact;

  return (
    <footer className="mesh-night grain relative overflow-hidden text-white">
      <div className="container-om relative z-10 pt-20 pb-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
              Yapay zekâ destekli yaratıcı üretimle işletmelerin ürünlerini dijitalde daha iyi sunmasına yardımcı olan
              bir yaratıcı teknoloji stüdyosu.
            </p>
            <p className="mt-6 font-display text-lg text-om-yellow">{site.slogan.tr}</p>
          </div>

          <nav aria-label="Alt menü" className="md:col-span-2">
            <FooterHeading>Sayfalar</FooterHeading>
            <ul className="space-y-3 text-[0.95rem]">
              {[...mainNav, { href: "/contact", label: "İletişim" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-white/80 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <FooterHeading>Hizmetler</FooterHeading>
            <ul className="space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="link-underline text-white/80 hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>İletişim</FooterHeading>
            <ul className="space-y-3 text-[0.95rem]">
              <li>
                {email ? (
                  <a href={`mailto:${email}`} className="link-underline text-white/80 hover:text-white">
                    {email}
                  </a>
                ) : (
                  <Link href="/contact" className="link-underline text-white/80 hover:text-white">
                    Proje formu ile yazın
                  </Link>
                )}
              </li>
              <li>
                <Channel label="Instagram" href={instagram} />
              </li>
              <li>
                <Channel label="LinkedIn" href={linkedin} />
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-20 font-display text-[min(15vw,13.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-white/[0.06] select-none md:mt-28"
        >
          OPEN MEDIA
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> Open Media. Tüm hakları saklıdır.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="link-underline hover:text-white">
                Gizlilik Politikası
              </Link>
            </li>
            <li>
              <Link href="/kvkk" className="link-underline hover:text-white">
                KVKK Aydınlatma Metni
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
