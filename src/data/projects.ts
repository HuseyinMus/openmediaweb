import { images, type SiteImage } from "./images";

/**
 * Portfolio data.
 *
 * Every entry below is a CONCEPT project: an internal demonstration of the
 * kind of work Open Media produces. None of them represents a real client.
 * When you add real work, set `type: "client"` and fill `client` — the UI
 * labels each card according to this field.
 */

export const projectCategories = [
  { id: "urun", label: "Ürün Görselleri", labelEn: "Product Visuals" },
  { id: "reklam", label: "Reklam Kreatifleri", labelEn: "Advertising Creatives" },
  { id: "sosyal", label: "Sosyal Medya", labelEn: "Social Media" },
  { id: "marka", label: "Marka İçeriği", labelEn: "Brand Content" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  sector: string;
  type: "concept" | "client";
  client?: string;
  summary: string;
  cover: SiteImage;
  gallery: SiteImage[];
  /** Product shown in a conceptual before/after demonstration */
  beforeAfter?: SiteImage;
  /** Visual weight in the editorial grid */
  size: "tall" | "wide" | "square";
};

export const projects: Project[] = [
  {
    slug: "serum-lansman",
    title: "Serum lansman görselleri",
    category: "urun",
    sector: "Kozmetik",
    type: "concept",
    summary:
      "Damlalıklı bir serum için sade pazaryeri görselinden, sıcak ışıklı premium bir lansman setine uzanan konsept seri.",
    cover: images.serum,
    gallery: [images.serum, images.bottleLeaves, images.makeupFlatlay],
    beforeAfter: images.serum,
    size: "tall",
  },
  {
    slug: "ses-kampanyasi",
    title: "Kulaklık kampanya kreatifleri",
    category: "reklam",
    sector: "Elektronik",
    type: "concept",
    summary: "Marka sarısıyla güçlü kontrast kuran, feed ve story formatlarında kampanya kreatifleri.",
    cover: images.headphonesYellow,
    gallery: [images.headphonesYellow, images.headphonesGrey, images.watchWhite],
    size: "wide",
  },
  {
    slug: "kapsul-koleksiyon",
    title: "Kapsül koleksiyon içerikleri",
    category: "sosyal",
    sector: "Moda & Tekstil",
    type: "concept",
    summary: "Yeni sezon kapsül koleksiyonu için editoryal tonda sosyal medya serisi.",
    cover: images.fashionYellow,
    gallery: [images.fashionYellow, images.rackNeutral, images.rackWhite],
    size: "tall",
  },
  {
    slug: "ev-yasam",
    title: "Ev & yaşam lifestyle sahneleri",
    category: "urun",
    sector: "Ev Ürünleri",
    type: "concept",
    summary: "Mobilya ve dekorasyon ürünleri için gerçek bir yaşam alanı hissi veren sahne kurguları.",
    cover: images.sofaGreen,
    gallery: [images.sofaGreen, images.interiorChair, images.livingRoom],
    size: "wide",
  },
  {
    slug: "kahve-kimligi",
    title: "Kahve markası içerik dili",
    category: "marka",
    sector: "Gıda & İçecek",
    type: "concept",
    summary: "Butik bir kahve markası için ambalaj, ürün ve atmosfer görsellerinden oluşan tutarlı bir içerik dili.",
    cover: images.coffeeCups,
    gallery: [images.coffeeCups, images.coffeeLatte, images.ceramics],
    size: "square",
  },
  {
    slug: "akilli-saat-lansman",
    title: "Akıllı saat lansman reklamı",
    category: "reklam",
    sector: "Giyilebilir Teknoloji",
    type: "concept",
    summary: "Yeni bir akıllı saat için sade, teknolojik ve ürün odaklı reklam varyasyonları.",
    cover: images.watchWhite,
    gallery: [images.watchWhite, images.watchHand],
    size: "square",
  },
  {
    slug: "mum-atolyesi",
    title: "El yapımı mum atölyesi",
    category: "sosyal",
    sector: "Yerel İşletme",
    type: "concept",
    summary: "Küçük bir atölye için sıcak ve samimi bir sosyal medya görsel seti.",
    cover: images.candle,
    gallery: [images.candle, images.ceramics],
    size: "tall",
  },
  {
    slug: "makyaj-seti",
    title: "Makyaj seti infografikleri",
    category: "urun",
    sector: "Kozmetik",
    type: "concept",
    summary: "Ürün içeriklerini ve kullanım adımlarını sade bir dille anlatan pazaryeri infografikleri.",
    cover: images.makeupFlatlay,
    gallery: [images.makeupFlatlay, images.bottleLeaves],
    beforeAfter: images.bottleLeaves,
    size: "wide",
  },
  {
    slug: "taze-mutfak",
    title: "Restoran menü görselleri",
    category: "marka",
    sector: "Gıda",
    type: "concept",
    summary: "Bir restoranın menüsü ve dijital kanalları için iştah açıcı, tutarlı yemek görselleri.",
    cover: images.foodTable,
    gallery: [images.foodTable, images.bruschetta, images.coffeeLatte],
    size: "square",
  },
];
