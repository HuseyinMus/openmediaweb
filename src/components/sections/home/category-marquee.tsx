const items = ["Kozmetik", "Moda & Tekstil", "Ev & Yaşam", "Gıda & İçecek", "Elektronik", "Pazaryeri", "Kampanya", "Yerel İşletme"];

/** Slow-moving strip of sectors we create for. Pure CSS animation. */
export function CategoryMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-om-navy/10 bg-white py-5" aria-label="Çalıştığımız sektörler">
      <ul className="sr-only">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="animate-om-marquee flex w-max items-center gap-10 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium tracking-tight text-om-navy md:text-3xl">
            {item}
            <span className="size-2.5 rotate-45 bg-om-blue" />
          </span>
        ))}
      </div>
    </div>
  );
}
