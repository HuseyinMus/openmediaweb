import { z } from "zod";

// Turkish fallback messages for any issue without a custom message.
z.config(z.locales.tr());

/**
 * Contact form schema — shared by the client (instant feedback) and the
 * server route (authoritative validation). Keep in sync with firestore.rules.
 */

export const businessTypeOptions = [
  { value: "pazaryeri", label: "Pazaryeri satıcısı (Trendyol, Hepsiburada vb.)" },
  { value: "e-ticaret", label: "E-ticaret markası / web mağazası" },
  { value: "moda-tekstil", label: "Moda & tekstil" },
  { value: "kozmetik-guzellik", label: "Kozmetik & güzellik" },
  { value: "yerel-isletme", label: "Yerel işletme (kafe, restoran, butik vb.)" },
  { value: "diger", label: "Diğer" },
] as const;

export const serviceOptions = [
  { value: "ai-urun-gorselleri", label: "AI Ürün Görselleri" },
  { value: "ai-reklam-kreatifleri", label: "AI Reklam Kreatifleri" },
  { value: "sosyal-medya-icerikleri", label: "Sosyal Medya İçerikleri" },
  { value: "birden-fazla", label: "Birden fazla hizmet / emin değilim" },
] as const;

export const budgetOptions = [
  { value: "belirsiz", label: "Henüz belirlemedim" },
  { value: "0-10k", label: "10.000 ₺ altı" },
  { value: "10k-25k", label: "10.000 – 25.000 ₺" },
  { value: "25k-50k", label: "25.000 – 50.000 ₺" },
  { value: "50k+", label: "50.000 ₺ üzeri" },
] as const;

type Opt = readonly { value: string }[];
const values = <T extends Opt>(opts: T) => opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const LIMITS = {
  name: 80,
  businessName: 120,
  email: 160,
  phone: 20,
  projectDescription: 2000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Lütfen adınızı ve soyadınızı yazın.")
    .max(LIMITS.name, `En fazla ${LIMITS.name} karakter olabilir.`),
  businessName: z
    .string()
    .trim()
    .min(2, "Lütfen işletmenizin adını yazın.")
    .max(LIMITS.businessName, `En fazla ${LIMITS.businessName} karakter olabilir.`),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(LIMITS.email, "E-posta adresi çok uzun.")
    .pipe(z.email("Geçerli bir e-posta adresi yazın.")),
  phone: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .regex(/^\+?[0-9\s()-]{7,20}$/, "Geçerli bir telefon numarası yazın veya boş bırakın."),
  ]),
  businessType: z.enum(values(businessTypeOptions), { error: "Lütfen işletme türünüzü seçin." }),
  service: z.enum(values(serviceOptions), { error: "Lütfen ilgilendiğiniz hizmeti seçin." }),
  projectDescription: z
    .string()
    .trim()
    .min(20, "Lütfen projenizi biraz daha ayrıntılı anlatın (en az 20 karakter).")
    .max(LIMITS.projectDescription, `En fazla ${LIMITS.projectDescription} karakter olabilir.`),
  budget: z.union([z.literal(""), z.enum(values(budgetOptions))]),
  kvkkConsent: z.literal(true, { error: "Devam etmek için aydınlatma metnini onaylamanız gerekiyor." }),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Anti-abuse fields sent alongside the form data. */
export const antiSpamSchema = z.object({
  /** Honeypot: hidden from humans, must stay empty. */
  website: z.string().max(200).optional().default(""),
  /** Epoch ms when the form was rendered. */
  startedAt: z.number().int().positive(),
});

export function fieldErrorsFrom(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export const labelFor = {
  businessType: (v: string) => businessTypeOptions.find((o) => o.value === v)?.label ?? v,
  service: (v: string) => serviceOptions.find((o) => o.value === v)?.label ?? v,
  budget: (v: string) => budgetOptions.find((o) => o.value === v)?.label ?? "Belirtilmedi",
};
