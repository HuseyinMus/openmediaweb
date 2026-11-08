import "server-only";

/**
 * Small sliding-window rate limiter kept in memory.
 *
 * On serverless platforms each instance has its own memory, so this is a
 * best-effort first line of defence. It is combined with a honeypot field, a
 * minimum fill time, an origin check and Firestore rules that only accept
 * well-formed documents from the server's writer account. For stronger
 * guarantees, add a Vercel Firewall rate-limit rule on /api/contact (see README).
 */

const hits = new Map<string, number[]>();

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false as const, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return { ok: true as const };
}

export function clientIp(headers: Headers) {
  return (
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
