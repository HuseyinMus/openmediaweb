/**
 * Sample imagery.
 *
 * These are stock photographs (Unsplash) used ONLY as visual placeholders for
 * concept demonstrations. They are not Open Media client work. Replace them
 * with your own produced assets (e.g. in /public or Firebase Storage) as real
 * projects become available — every component reads from this file.
 */

export type SiteImage = {
  src: string;
  alt: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

export const images = {
  serum: { src: unsplash("1608571423902-eed4a5ad8108"), alt: "Bej kaide üzerinde amber renkli damlalıklı serum şişesi, yumuşak gölgeler" },
  makeupFlatlay: { src: unsplash("1596462502278-27bfdc403348"), alt: "Şeftali tonlu zeminde makyaj fırçaları ve ruj" },
  bottleLeaves: { src: unsplash("1617897903246-719242758050"), alt: "Yaprak gölgeleri arasında cam kozmetik şişesi" },

  fashionYellow: { src: unsplash("1515886657613-9f3515b0c78f"), alt: "Sarı takım elbiseli model, açık mavi gökyüzü önünde" },
  rackWhite: { src: unsplash("1490481651871-ab68de25d43d"), alt: "Beyaz duvar önünde askıda nötr tonlu giysiler" },
  boutique: { src: unsplash("1445205170230-053b83016050"), alt: "Sıcak ışıklı bir butikte giysi askıları" },
  rackNeutral: { src: unsplash("1558769132-cb1aea458c5e"), alt: "Toprak tonlarında askıda kıyafetler" },
  leatherBag: { src: unsplash("1600857062241-98e5dba7f214"), alt: "Beyaz zeminde kahverengi deri omuz çantası" },

  sofaGreen: { src: unsplash("1555041469-a586c61ea9bc"), alt: "Açık renk duvar önünde koyu yeşil kadife kanepe" },
  interiorChair: { src: unsplash("1586023492125-27b2c045efd7"), alt: "Sarı koltuk bulunan aydınlık modern iç mekan" },
  candle: { src: unsplash("1602874801007-bd458bb1b8b6"), alt: "Loş ışıkta yanan cam kavanozlu mum" },
  livingRoom: { src: unsplash("1513694203232-719a280e022f"), alt: "Sade ve aydınlık oturma odası" },
  ceramics: { src: unsplash("1610701596007-11502861dcfa"), alt: "Krem rengi seramik kupalar ve kaseler" },

  foodTable: { src: unsplash("1504674900247-0877df9cc836"), alt: "Ahşap masada servis edilmiş renkli yemek tabakları" },
  coffeeCups: { src: unsplash("1495474472287-4d71bcdd2085"), alt: "Üstten çekim latte art'lı kahve fincanları" },
  coffeeLatte: { src: unsplash("1509042239860-f550ce710b93"), alt: "Bitkilerle çevrili köpüklü kahve" },
  bruschetta: { src: unsplash("1505575967455-40e256f73376"), alt: "Domatesli bruschetta ve taze malzemeler" },

  watchWhite: { src: unsplash("1523275335684-37898b6baf30"), alt: "Beyaz zeminde beyaz kayışlı akıllı saat" },
  headphonesYellow: { src: unsplash("1505740420928-5e560c06d30e"), alt: "Canlı sarı zemin önünde siyah kulaküstü kulaklık" },
  headphonesGrey: { src: unsplash("1583394838336-acd977736f90"), alt: "Gri zeminde koyu renk kulaklık" },
  watchHand: { src: unsplash("1532667449560-72a95c8d381b"), alt: "Bilekte klasik saat, doğa arka planı" },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
