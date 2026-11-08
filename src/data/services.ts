import { images, type SiteImage } from "./images";

export type Service = {
  slug: "ai-urun-gorselleri" | "ai-reklam-kreatifleri" | "sosyal-medya-icerikleri";
  index: string;
  title: string;
  titleEn: string;
  short: string;
  description: string;
  includes: string[];
  suitableFor: string[];
  deliverables: string[];
  gallery: SiteImage[];
};

export const services: Service[] = [
  {
    slug: "ai-urun-gorselleri",
    index: "01",
    title: "AI Ürün Görselleri",
    titleEn: "AI Product Visuals",
    short:
      "Profesyonel AI destekli ürün görselleri, lifestyle sahneler, ürün infografikleri ve pazaryerine hazır görseller.",
    description:
      "Ürününüzün elinizdeki fotoğraflarından yola çıkarak; temiz stüdyo çekimi görünümünde, markanıza uygun sahnelerde ve pazaryeri kurallarına uygun ölçülerde görseller hazırlıyoruz. Pahalı çekim organizasyonlarına gerek kalmadan ürününüzü daha anlaşılır ve daha çekici gösterin.",
    includes: [
      "Beyaz / sade zeminli ana ürün görselleri",
      "Ürünü kullanım anında gösteren lifestyle sahneler",
      "Özellikleri anlatan ürün infografikleri",
      "Trendyol, Hepsiburada ve web mağazası ölçüleri",
      "Renk ve ışık düzeltmesi, rötuş",
    ],
    suitableFor: [
      "Trendyol ve Hepsiburada satıcıları",
      "Kendi e-ticaret sitesi olan markalar",
      "Yeni ürün lansmanı hazırlayan işletmeler",
    ],
    deliverables: ["Ana ürün görseli seti", "Lifestyle sahne görselleri", "İnfografik kartları", "Pazaryeri ölçülerinde dışa aktarımlar"],
    gallery: [images.serum, images.bottleLeaves, images.leatherBag],
  },
  {
    slug: "ai-reklam-kreatifleri",
    index: "02",
    title: "AI Reklam Kreatifleri",
    titleEn: "AI Ad Creatives",
    short: "Meta, Instagram ve dijital kampanyalar için dikkat çeken reklam kreatifleri.",
    description:
      "Kampanya hedefinize göre farklı mesaj ve görsel varyasyonları hazırlıyoruz; böylece hangi kreatifin kitlenizde daha iyi çalıştığını test edebilirsiniz. Her format, yerleşim ve ekran oranı için ayrı düzenlenmiş, kullanıma hazır dosyalar teslim ediyoruz.",
    includes: [
      "Kampanya konsepti ve mesaj önerileri",
      "Feed, story ve reels oranlarında kreatifler",
      "A/B testi için görsel ve metin varyasyonları",
      "İndirim, lansman ve sezon kampanyası tasarımları",
    ],
    suitableFor: [
      "Meta / Instagram reklamı veren işletmeler",
      "Kampanya dönemine hazırlanan e-ticaret markaları",
      "Reklam ajansıyla çalışmadan hızlı üretim isteyen ekipler",
    ],
    deliverables: ["Statik reklam görselleri", "Kısa hareketli kreatifler", "Format bazlı dışa aktarımlar", "Metin önerileri"],
    gallery: [images.headphonesYellow, images.watchWhite, images.headphonesGrey],
  },
  {
    slug: "sosyal-medya-icerikleri",
    index: "03",
    title: "Sosyal Medya İçerikleri",
    titleEn: "Social Media Content",
    short: "Sosyal medya görselleri, kampanya tasarımları, markalı paylaşımlar ve içerik paketleri.",
    description:
      "Markanızın sosyal medyada tutarlı ve tanınır görünmesi için aylık içerik paketleri hazırlıyoruz. Görsel dilinizi bir kez belirliyor, ardından her ay planlı ve düzenli içerik üretiyoruz.",
    includes: [
      "Marka görsel dili ve şablon seti",
      "Aylık içerik planı",
      "Gönderi, carousel ve story tasarımları",
      "Özel gün ve kampanya paylaşımları",
    ],
    suitableFor: [
      "Sosyal medyada düzenli görünmek isteyen markalar",
      "Kafe, restoran, butik gibi yerel işletmeler",
      "Moda, kozmetik ve yaşam tarzı markaları",
    ],
    deliverables: ["Aylık gönderi paketi", "Carousel ve story setleri", "Düzenlenebilir şablonlar", "İçerik takvimi"],
    gallery: [images.coffeeLatte, images.fashionYellow, images.makeupFlatlay],
  },
];
