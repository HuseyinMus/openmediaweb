import { antiSpamSchema, contactSchema, fieldErrorsFrom } from "@/lib/validation/contact";
import { saveContactRequest } from "@/lib/firebase/contact-requests";
import { sendContactNotification } from "@/lib/email/contact-notification";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact
 *
 * Response contract (always JSON):
 *  200 { ok: true,  stored: boolean, emailed: boolean }   at least one channel succeeded
 *  400 { ok: false, error }                               malformed / suspicious request
 *  403 { ok: false, error }                               cross-site request
 *  413 { ok: false, error }                               body too large
 *  422 { ok: false, error, fieldErrors }                  validation failed
 *  429 { ok: false, error }                               rate limited
 *  503 { ok: false, error }                               neither storage nor e-mail worked
 */

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3000;

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  // 1. Same-origin only: browsers always send Origin on cross-site POSTs.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: "Bu istek kabul edilmedi." }, 403);
  }

  // 2. Rate limit per IP: 5 submissions per 10 minutes.
  const limited = rateLimit(`contact:${clientIp(request.headers)}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!limited.ok) {
    return json(
      { ok: false, error: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin." },
      429,
      { "Retry-After": String(limited.retryAfter) },
    );
  }

  // 3. Size-limited JSON body.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Gönderilen içerik çok uzun." }, 413);
  }
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed;
  } catch {
    return json({ ok: false, error: "Geçersiz istek." }, 400);
  }

  // 4. Anti-spam: honeypot + minimum time on page.
  const spam = antiSpamSchema.safeParse({ website: body.website, startedAt: body.startedAt });
  if (!spam.success) {
    return json({ ok: false, error: "Geçersiz istek. Lütfen sayfayı yenileyip tekrar deneyin." }, 400);
  }
  if (spam.data.website.trim() !== "") {
    // Bots fill hidden fields. Respond neutrally and store nothing.
    return json({ ok: true, stored: false, emailed: false });
  }
  if (Date.now() - spam.data.startedAt < MIN_FILL_MS) {
    return json({ ok: false, error: "Form çok hızlı gönderildi. Lütfen birkaç saniye sonra tekrar deneyin." }, 400);
  }

  // 5. Authoritative validation.
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return json(
      { ok: false, error: "Lütfen işaretli alanları kontrol edin.", fieldErrors: fieldErrorsFrom(result.error) },
      422,
    );
  }

  // 6. Store, then notify. Each channel reports its real outcome.
  const saved = await saveContactRequest(result.data);
  const mail = await sendContactNotification(result.data, saved.stored ? saved.id : undefined);

  if (!saved.stored && !mail.sent) {
    const notConfigured = !saved.stored && saved.reason === "not_configured" && !mail.sent && mail.reason === "not_configured";
    if (notConfigured) console.warn("[contact] Neither Firestore nor Resend is configured; submission was not delivered.");
    return json(
      {
        ok: false,
        error: notConfigured
          ? "İletişim formu henüz yapılandırılmadı, bu yüzden talebiniz iletilemedi. Lütfen daha sonra tekrar deneyin."
          : "Talebiniz şu anda iletilemedi. Lütfen biraz sonra tekrar deneyin.",
      },
      503,
    );
  }

  return json({ ok: true, stored: saved.stored, emailed: mail.sent });
}
