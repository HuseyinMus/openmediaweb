# OPEN MEDIA — Website

Marketing website for **Open Media**, an AI-powered creative & digital growth studio based in Turkey.
*Better Content. Better Sales. — Daha iyi içerik. Daha güçlü satış.*

| | |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 · shadcn/ui (Radix primitives) · CSS design tokens |
| Motion | Motion for React (`motion/react`) for UI motion · GSAP + ScrollTrigger for scroll choreography |
| Icons | Lucide React |
| Backend | Route Handler `/api/contact` · Firebase JS SDK (Firestore + Auth) · Resend REST API |
| Validation | Zod (shared client/server schema) |
| Hosting | Vercel |

---

## 1. Getting started

**Requirements:** Node.js **22 LTS** (or ≥ 20.19) and npm.

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for UI work
npm run dev                  # http://localhost:3000
```

> **Node 20.18 or older is not supported.** Tailwind's Node tooling loads an ES-module-only dependency
> (`magic-string` 1.x) that those versions cannot `require()`, so `next build` fails. Use Node 22 LTS.
> For `npm run dev` only, `NODE_OPTIONS=--experimental-require-module` works as a temporary stopgap.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |

---

## 2. Project structure

```
src/
  app/                      Routes (App Router)
    page.tsx                Home
    services/ work/ about/ contact/ privacy/ kvkk/
    api/contact/route.ts    Contact form endpoint (server)
    sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
    globals.css             Design tokens, utilities (glass, mesh gradients, grain…)
  components/
    ui/                     shadcn/ui components (Radix)
    layout/                 Header, footer, intro loader
    motion/                 Reveal, SplitWords, Magnetic, Parallax, MotionProvider
    primitives/             Logo, CtaLink, Eyebrow/ConceptBadge, BeforeAfter slider
    sections/               Page sections (home/, services/, work/, contact/, shared)
  data/                     ALL editable content: site, services, projects, process, images
  lib/
    validation/contact.ts   Zod schema shared by form and API
    firebase/               Server-side Firebase app + contact_requests repository
    email/                  Resend notification
    rate-limit.ts           In-memory IP rate limiter
firestore.rules             Firestore security rules
firebase.json               Firebase CLI config (rules deployment)
```

### Editing content

Copy lives in `src/data/*` and in each page file, so you rarely need to touch components.

- **Colours / gradients / radii:** CSS variables at the top of `src/app/globals.css` (`--om-blue`, `--om-yellow`, …).
- **Portfolio:** `src/data/projects.ts`. Every current entry is `type: "concept"` and is labelled
  "Konsept çalışma" in the UI. When you publish real client work, add an entry with `type: "client"`
  (with the client's permission).
- **Images:** `src/data/images.ts`. The current photos are **Unsplash stock placeholders** chosen to avoid
  visible brands. They are not Open Media work. Replace them with your own produced visuals (put files in
  `/public` or Firebase Storage and update `next.config.ts → images.remotePatterns` if hosted remotely).
- **Contact channels:** set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`.
  Until then the footer shows "yakında" (coming soon) instead of invented accounts.

---

## 3. Contact form architecture

```
Browser form ──POST JSON──▶ /api/contact (Vercel, Node runtime)
                              1. same-origin check
                              2. IP rate limit (5 / 10 min)
                              3. body size limit (16 KB)
                              4. honeypot field + minimum fill time (3 s)
                              5. Zod validation (same schema as the form)
                              6. Firestore write  ──▶ contact_requests  (rules re-validate)
                              7. Resend e-mail notification
                              ◀── { ok, stored, emailed }  (real outcome of each channel)
```

- The browser **never** talks to Firebase. No Firebase config is sent to the client.
- If Firestore is not configured but e-mail is (or vice versa), the request still succeeds and the response
  says exactly which channel worked. If **neither** works, the API returns `503` and the form shows an honest
  error. It never pretends the message was delivered.

---

## 4. Firebase setup

1. Create a project at <https://console.firebase.google.com>.
2. **Firestore Database** → Create database (production mode, choose a region such as `europe-west`).
3. **Authentication** → Sign-in method → enable **Email/Password**.
4. **Authentication → Users → Add user**: create a dedicated account, e.g. `contact-writer@yourdomain.com`,
   with a long random password. This account is used only by the server to create submissions.
5. Copy that user's **UID** and replace `REPLACE_WITH_CONTACT_WRITER_UID` in `firestore.rules`.
6. **Project settings → General → Your apps → Add web app** and copy `apiKey`, `authDomain`, `projectId`,
   `appId` into the `FIREBASE_*` variables.
7. Deploy the rules:
   ```bash
   npx firebase-tools login
   npx firebase-tools use --add          # select your project
   npx firebase-tools deploy --only firestore:rules
   ```
8. Submit the form once and check **Firestore → contact_requests**.

### What the rules enforce

- Only the contact-writer UID can **create** documents in `contact_requests`.
- Documents must contain exactly the expected fields, with correct types, lengths and allowed enum values,
  `status == "new"`, `kvkkConsent == true`, and `createdAt == request.time` (server timestamp).
- **Nobody** can read, update or delete through the client SDKs. Review submissions in the Firebase
  console, or later build an admin tool using the Admin SDK on a server.
- Every other path in the database is closed.

### Document shape (`contact_requests`)

| Field | Type |
|---|---|
| `name`, `businessName`, `email`, `businessType`, `service`, `projectDescription` | string |
| `phone`, `budget` | string \| null |
| `kvkkConsent` | `true` |
| `createdAt` | timestamp (server) |
| `status` | `"new"` |

### About Firebase App Check

App Check proves that a request comes from *your client app*. Here the client never calls Firebase, and all
writes come from the server using the writer account, so App Check would add no protection. The rules
already lock writes to that single account. If you later add client-side Firebase features (e.g. Storage
uploads from the browser), enable App Check with reCAPTCHA Enterprise for those.

### Firebase Storage

Not required. Portfolio assets are referenced from `src/data/images.ts`. If you host them in Firebase Storage,
add your bucket host to `images.remotePatterns` in `next.config.ts`.

---

## 5. E-mail setup (Resend)

1. Create an account at <https://resend.com>.
2. **Domains → Add domain** (e.g. `yourdomain.com`) and add the SPF/DKIM DNS records it shows. Wait until
   the domain is **Verified**.
3. **API Keys → Create** (sending access only) → `RESEND_API_KEY`.
4. Set `CONTACT_FROM_EMAIL` to an address on the verified domain, e.g. `Open Media <form@yourdomain.com>`.
5. Set `CONTACT_TO_EMAIL` to the inbox(es) that should receive requests (comma-separated).

The notification uses `reply_to` = the submitter's e-mail, so you can answer directly from your inbox.

---

## 6. Environment variables

| Variable | Scope | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | yes (prod) | Canonical URLs, sitemap, OG |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | no | Shown in footer/contact page |
| `NEXT_PUBLIC_INSTAGRAM_URL` | public | no | Footer link |
| `NEXT_PUBLIC_LINKEDIN_URL` | public | no | Footer link |
| `FIREBASE_API_KEY` | server | for storage | Firebase web config |
| `FIREBASE_AUTH_DOMAIN` | server | for storage | Firebase web config |
| `FIREBASE_PROJECT_ID` | server | for storage | Firebase web config |
| `FIREBASE_APP_ID` | server | for storage | Firebase web config |
| `FIREBASE_CONTACT_WRITER_EMAIL` | server | for storage | Writer account |
| `FIREBASE_CONTACT_WRITER_PASSWORD` | server | for storage | Writer account |
| `RESEND_API_KEY` | server | for e-mail | Resend API key |
| `CONTACT_FROM_EMAIL` | server | for e-mail | Verified sender |
| `CONTACT_TO_EMAIL` | server | for e-mail | Recipient(s) |

`.env*` files are git-ignored (except `.env.example`). Never commit secrets.

---

## 7. Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: **Next.js** (auto-detected).
3. **Settings → Environment Variables:** add every variable from section 6 for *Production* (and *Preview* if
   you want the form to work on preview deployments).
4. **Settings → General → Node.js Version:** 22.x or newer.
5. Deploy, then add your custom domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.
6. Recommended: **Firewall → Rules → Rate limit** for `POST /api/contact` (e.g. 10 requests / 10 min per IP).
   The built-in limiter is per-instance memory, so the firewall rule gives a global guarantee.
7. After deploying, submit the form on the live site and confirm both the Firestore document and the e-mail.

---

## 8. Before going live (checklist)

- [ ] Replace sample photography in `src/data/images.ts` with your own work.
- [ ] Fill the bracketed placeholders in `/kvkk` and `/privacy` and have them reviewed by a legal advisor.
- [ ] Set real contact e-mail and social URLs (or leave them as "yakında").
- [ ] Configure Firebase + rules UID, and Resend with a verified domain.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Test the contact form in production.

## 9. Accessibility & motion

- All animations respect `prefers-reduced-motion` (Motion via `MotionConfig reducedMotion="user"`, GSAP via
  `gsap.matchMedia`, CSS via a global media query). The pinned horizontal gallery falls back to native
  horizontal scrolling on mobile and for reduced-motion users.
- Magnetic and pointer-parallax effects only run for mouse pointers.
- The before/after slider is a keyboard-operable `role="slider"` (← → Home End, Shift for bigger steps).
- Form fields have labels, `aria-invalid`/`aria-describedby` error wiring, a live status region, and focus moves
  to the first invalid field.
