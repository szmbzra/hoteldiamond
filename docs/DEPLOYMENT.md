# New-Hotel Deployment Guide

How to take this codebase and launch it for a **different** property, plus the
pre-launch checklist and the current audit findings.

Read **[ARCHITECTURE.md](./ARCHITECTURE.md)** first for the mental model.

---

## TL;DR — what you actually edit

| # | File | What changes |
|---|------|--------------|
| 1 | `.env.local` | domain, CMS API URL, reCAPTCHA keys, webhook secret |
| 2 | `src/config/site.ts` | name, contact, address, geo, ratings, amenities, booking URL, social |
| 3 | `src/app/globals.css` | brand colours (`--luxury-*` variables) |
| 4 | `src/data/data.ts` | fallback copy, images, landmarks, testimonials, FAQs |
| 5 | `public/` + `src/assets/` | logo, favicon, fonts, hero video, placeholder images |
| 6 | `next.config.ts` | image CDN `remotePatterns` (the new CMS host) |
| 7 | `src/config/site.ts` → `CATEGORY_IDS` | CMS `subpackage` parent IDs for rooms/events |

Everything else (metadata, JSON-LD, robots, sitemap, footer, WhatsApp/booking
buttons) reads from the above — you should not need to touch it.

---

## Step by step

### 1. Clone & install
```bash
git clone <repo> my-new-hotel && cd my-new-hotel
npm install
cp .env.example .env.local
```

### 2. Environment (`.env.local`)
```ini
NEXT_PUBLIC_API_URL=https://cms.example.com/<property>/api/v1
NEXT_PUBLIC_SITE_URL=https://www.my-new-hotel.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...      # fresh pair per property
RECAPTCHA_SECRET_KEY=...
WEBHOOK_SECRET=...                      # openssl rand -hex 32
```
`NEXT_PUBLIC_SITE_URL` drives canonical URLs, sitemap, robots, OG and JSON-LD —
get it right (with/without `www` must match your real domain).

### 3. Identity (`src/config/site.ts`)
Update `site`, `contact`, `address`, `business`, `links`, `CATEGORY_IDS`.
Watch the formats:
* `contact.phoneE164` → `tel:` links (digits + leading `+`, no spaces).
* `contact.whatsapp` → `wa.me` (digits only).
* `business.checkinTime/checkoutTime` must match the policy in `data/data.ts`.
* `business.aggregateRating` → **set to `null` unless you have real, on-page,
  verifiable reviews** (see Audit findings).
* `links.social` → fill in for stronger `sameAs` entity signals.

### 4. Brand colours (`src/app/globals.css`)
Change the `--luxury-*` variables in `:root`. The whole site re-skins because
every component uses the `gold`/`gold-dim`/`gold-light` Tailwind tokens that map
to these variables. Keep `--luxury-gold-text` dark enough to pass WCAG AA on
white.

### 5. Content (`src/data/data.ts`) & assets
Replace copy, landmark list, testimonials, FAQs, and the images under
`public/` and `src/assets/` (logo, favicon, fonts, `public/video/hero.webm`,
placeholder images). Live content comes from the CMS; this file is the
fallback/demo + the API shape reference.

### 6. Image CDN (`next.config.ts`)
Add the new CMS image host to `images.remotePatterns`, e.g.:
```ts
remotePatterns: [
  { protocol: "https", hostname: "cms.example.com" },
  { protocol: "https", hostname: "www.cms.example.com" },
],
```
`next/image` rejects un-listed remote hosts — miss this and images 404.

### 7. Verify
```bash
npm run build      # must pass; check the route table for ○ (static) vs ƒ
npm start          # smoke-test locally
```

---

## ⚠ CMS bot-protection (launch-critical)

The CMS API is fronted by **Imunify360 bot-protection**, which blocks server
requests from non-whitelisted IPs:

- a plain server `fetch` returns **415**;
- with `Accept: application/json` it returns **200 but a denial body**
  (`{ "message": "Access denied by Imunify360 bot-protection…" }`), not the data.

Next.js fetches data **server-side** at build time (prerender) *and* at runtime
(ISR/SSR). So **every** environment that renders the site must be allowed by the
CMS, or pages render empty. Before launch:

- [ ] Whitelist the **production host's egress IP(s)** (and any CI/build IPs)
      with the CMS provider — or exempt the `/api/*` path from Imunify360, or
      switch to an allowed auth method (API key/token).
- [ ] Verify from the deploy environment:
      `curl -H "Accept: application/json" $NEXT_PUBLIC_API_URL/siteregulars`
      returns real JSON, not the denial message.

The code already sends `Accept: application/json` **and a browser `User-Agent`**
(Imunify360 challenges non-browser UAs), and treats a bot-denial body as a soft
failure (`fetchAPI` → `null`), so a blocked endpoint degrades gracefully instead
of crashing. That clears most blocks — but bursty server fetches can still be
challenged, so allowlisting the IP is the durable fix.

**Local dev tip:** if you see `API blocked by bot-protection`, Next.js may have
cached an earlier denial. Stop the dev server, delete the cache, and restart:
`Remove-Item -Recurse -Force .next` then `npm run dev`.

## Pre-launch checklist

- [ ] CMS bot-protection cleared for the deploy/runtime IPs (see section above).
- [ ] `.env.local` has **production** values; secrets rotated (not the demo
      reCAPTCHA/webhook values).
- [ ] `NEXT_PUBLIC_SITE_URL` matches the real domain (www vs non-www).
- [ ] `git grep -i <old-hotel-name> src/` returns nothing unexpected.
- [ ] `git grep -nE "#[0-9a-fA-F]{6}" src/data` — no leftover brand hexes.
- [ ] `business.aggregateRating` is real or `null`.
- [ ] Logo, favicon, OG image (1200×630) set.
- [ ] `npm run build` is green; route table looks right.
- [ ] `/robots.txt` and `/sitemap.xml` show the correct domain.
- [ ] Test one of each: room, event, blog, service, restaurant detail page.
- [ ] Contact + enquiry forms submit (reCAPTCHA keys valid for the domain).
- [ ] CMS revalidation webhook points at `/api/revalidate` with the matching
      `WEBHOOK_SECRET`.
- [ ] Validate JSON-LD: <https://search.google.com/test/rich-results>.
- [ ] Run Lighthouse (mobile) on `/` and a detail page; record scores.

---

## Audit findings (state at 2026-06-10)

What was reviewed and improved in this pass, and what remains as a judgement
call for the owner.

### Fixed
* Domain is env-driven everywhere (was hard-coded in `robots.ts`, `sitemap.ts`,
  two page files, and inconsistent — `.com.np` vs `www.…com`).
* All hotel identity centralised in `src/config/site.ts`.
* Brand gold migrated from ~30 files of `[#e3c9a1]` arbitrary values to a single
  `gold` design token.
* `aggregateRating` is now config-gated (omit by setting it to `null`).
* Org-schema `checkinTime/checkoutTime` aligned with the guest policy
  (was 12:00/11:00 in schema vs 14:00/12:00 in content).
* **Static rendering:** removed `headers()` from the root layout → the main
  pages are now prerendered static HTML + ISR (were all dynamic). Removed the
  now-unused `proxy.ts` middleware.
* Security headers + `poweredByHeader:false` added in `next.config.ts`.
* `BreadcrumbList` JSON-LD now emitted by the shared banner; rooms get
  `Product`/`HotelRoom` (with `Offer` only when a real price exists).
* Accessibility: every banner page now has a single `<h1>`; `ContactFrom`
  inputs are label-associated; `<html lang>` is config-driven.
* `data/data.ts` fallback identity (title, keywords, description, canonical,
  email, phone, address, map) now references `config/site.ts` — no drift.

### Remaining recommendations (owner's call)
* **Gold contrast (WCAG AA).** Brand gold `#e3c9a1` as *text on light* scores
  ~1.6:1 and fails AA. A `text-gold-text` utility (~5:1) is available; applying
  it to gold copy on light backgrounds is a visual decision, so it was **not**
  mass-applied. Highest-impact spots: small uppercase section labels and the
  white-on-gold submit buttons (`bg-gold text-white` → prefer dark text, as the
  `.luxury-btn-solid` design token already does).
* **Label association in the other forms.** `ContactFrom` is fixed; apply the
  same `htmlFor`/`id` pattern to `EventEnquiryForm`, `OfferList` enquiry, and
  `Newsletter`.
* **Per-page OG images.** Detail pages set their own OG image; static marketing
  pages fall back to the global one. Consider bespoke OG images for key landing
  pages.
* **Dark UI surfaces.** Near-black backgrounds (`#231f20`, `#2d2d2d`) are still
  arbitrary Tailwind values in a few components. They rarely change between
  properties; tokenise to `bg-luxury-dark` if you want them in the theme too.

---

## Rollback / safety notes
* `.env*` is gitignored — never commit real secrets. `.env.example` is the
  template.
* The CMS fetch fails soft (`lib/api.ts`): an API outage degrades gracefully
  rather than crashing a route.
* `git grep` before launch is your friend; identity should resolve to
  `config/site.ts`, not literals.
