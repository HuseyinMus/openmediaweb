import "server-only";
import { labelFor, type ContactData } from "@/lib/validation/contact";

/**
 * Sends a notification e-mail for a new contact request through the Resend
 * REST API (no SDK dependency). Runs on the server only; the API key never
 * reaches the browser. CONTACT_FROM_EMAIL must use a domain verified in Resend.
 */

export type EmailResult = { sent: true } | { sent: false; reason: "not_configured" | "error" };

function readConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return null;
  return {
    apiKey,
    from,
    to: to
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

export function isEmailConfigured() {
  return readConfig() !== null;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(data: ContactData, id?: string) {
  return [
    ["Ad Soyad", data.name],
    ["İşletme", data.businessName],
    ["E-posta", data.email],
    ["Telefon", data.phone || "Belirtilmedi"],
    ["İşletme türü", labelFor.businessType(data.businessType)],
    ["Hizmet", labelFor.service(data.service)],
    ["Bütçe", labelFor.budget(data.budget)],
    ["Kayıt ID", id ?? "Firestore'a kaydedilmedi"],
  ] as const;
}

export async function sendContactNotification(data: ContactData, id?: string): Promise<EmailResult> {
  const config = readConfig();
  if (!config) return { sent: false, reason: "not_configured" };

  const list = rows(data, id);
  const html = `<!doctype html><html lang="tr"><body style="font-family:Inter,Arial,sans-serif;color:#10182B;background:#F7F8FC;padding:24px">
  <div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;padding:28px">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#245BFF">Open Media</p>
    <h1 style="margin:0 0 20px;font-size:22px">Yeni proje talebi</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${list
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:#5a6272;width:130px;vertical-align:top">${k}</td><td style="padding:8px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h2 style="font-size:15px;margin:24px 0 8px">Proje açıklaması</h2>
    <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(data.projectDescription)}</p>
  </div></body></html>`;

  const text = [
    "Yeni proje talebi — Open Media",
    "",
    ...list.map(([k, v]) => `${k}: ${v}`),
    "",
    "Proje açıklaması:",
    data.projectDescription,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: data.email,
        subject: `Yeni proje talebi: ${data.businessName}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend responded", res.status, await res.text().catch(() => ""));
      return { sent: false, reason: "error" };
    }
    return { sent: true };
  } catch (err) {
    console.error("[contact] Resend request failed:", err instanceof Error ? err.message : err);
    return { sent: false, reason: "error" };
  }
}
