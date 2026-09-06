# Architecture Reference

A field guide to how this hotel website is built. Use it to understand the
existing site **and** as a reference pattern for building the next Next.js
property site to the same SEO / AEO / performance / accessibility standard.

> Companion doc: **[DEPLOYMENT.md](./DEPLOYMENT.md)** — clone → launch a new
> hotel, plus the pre-launch checklist and audit findings.

---

## 1. Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, RSC, Turbopack) |
| Language | TypeScript 5, React 19 |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | `next/font` — Cormorant Garamond (headings) + Poppins (body), both Google |
| Data | Headless PHP/MySQL CMS over REST (`NEXT_PUBLIC_API_URL`) |
| Forms | `react-hook-form` + `zod` + Google reCAPTCHA |
| Carousels | `embla-carousel`, `swiper` |
| Hosting | Any Node host / Vercel (ISR-friendly) |

There is **no `tailwind.config.js`** — Tailwind v4 reads design tokens from the
`@theme` block in [`src/app/globals.css`](../src/app/globals.css).

---

## 2. Directory map

```
src/
├── app/                      # App Router routes (each folder = a URL)
│   ├── layout.tsx            # Root shell: fonts, <head>, global JSON-LD, Nav/Footer
│   ├── page.tsx              # Home
│   ├── robots.ts             # /robots.txt   (reads SITE_URL)
│   ├── sitemap.ts            # /sitemap.xml  (static + CMS-driven URLs)
│   ├── [slug]/               # Catch-all package/article pages
│   ├── rooms/[slug]/         # Room detail (+ HotelRoom/Product JSON-LD)
│   ├── events/[slug]/        # Event/venue detail
│   ├── blog/[slug]/          # Blog post (+ BlogPosting JSON-LD)
│   └── api/revalidate/       # Webhook: CMS → on-demand ISR revalidation
├── components/
│   ├── home/                 # Home page sections
│   ├── ui/                   # Navbar, Footer, Breadcrumb, Booking, Floating…
│   ├── seo/                  # JsonLd, PageSchemas, SiteScripts
│   └── <feature>/            # contact, gallery, rooms, events, package, faq…
├── config/
│   └── site.ts               # ★ SINGLE SOURCE OF TRUTH for hotel identity
├── lib/
│   ├── api.ts                # fetchAPI() — cached fetch wrapper (ISR + tags)
│   ├── metadata.ts           # buildMetadata(), org/website/CMS JSON-LD builders
│   └── parser.ts             # tolerant API-response parsing
├── data/data.ts              # Fallback CONTENT (copy, images, landmarks, FAQs…)
└── types/                    # Shared TS types
```

---

## 3. Data flow

```
Browser ─▶ Route (RSC) ─▶ fetchAPI(endpoint) ─▶ CMS REST API
                              │
                              ├─ next.revalidate = 3600  (ISR: re-fetch hourly)
                              └─ next.tags = [endpoint, "all"]  (on-demand purge)
```

* **[`lib/api.ts`](../src/lib/api.ts)** is the only place that talks to the CMS.
  Every call is cached with `revalidate: 3600` and tagged, and **fails soft**
  (returns `null`/`[]`) so a CMS hiccup never white-screens a page.
* **On-demand freshness:** the CMS calls
  [`/api/revalidate`](../src/app/api/revalidate/route.ts) with an HMAC-signed
  body; matching tags are purged instantly via `revalidateTag`. So content is
  fresh on edit, yet served as static HTML the rest of the time.
* **Fallback content** lives in [`data/data.ts`](../src/data/data.ts) and is used
  for local/demo rendering and as the shape reference for the API.

### Rendering model (important)

The root layout is **statically renderable** — it does *not* read `headers()`
or `cookies()`. As a result most routes are prerendered as **static HTML with
ISR** (`○`), and only true per-slug routes are server-rendered on demand (`ƒ`):

```
○  /  /about  /blog  /contact-us  /events  /facilities  /faq
   /gallery  /offers  /reviews  /rooms  /virtual-tour      (Static + ISR 1h)
ƒ  /[slug]  /rooms/[slug]  /events/[slug]  /blog/[slug]
   /restaurant/[slug]  /service/[slug]                     (Dynamic)
```

> ⚠️ **Do not call `headers()`, `cookies()`, or `draftMode()` in `layout.tsx`
> or any widely-shared layout.** Doing so opts the entire subtree into dynamic
> rendering and you lose static HTML for the whole site. This was the single
> biggest performance lever in this project — see §5.

---

## 4. SEO & AEO system

All structured data and `<meta>` generation funnels through
[`lib/metadata.ts`](../src/lib/metadata.ts):

| Function | Output |
|---|---|
| `buildMetadata(pageKey, overrides, path)` | Per-page `<title>`, description, canonical, OpenGraph, Twitter, robots. Called from every route's `generateMetadata()`. |
| `buildOrganizationSchema()` | `Resort` + `LodgingBusiness` + `WebSite`/`SearchAction` JSON-LD. Injected **once** in the layout (global). Sourced entirely from `config/site.ts`. |
| `buildCmsSchemas(path, scope)` | CMS-managed JSON-LD. `scope:"global"` → layout; `scope:"page"` → `<PageSchemas>`. |

**Where JSON-LD comes from**

```
layout.tsx ──▶ buildOrganizationSchema()      (every page: Resort + WebSite)
           └─▶ buildCmsSchemas("/","global")  (every page: slug-less CMS schema)

<PageSchemas path="/x" /> ──▶ buildCmsSchemas("/x","page")  (that page only)

Route-local JSON-LD (rendered directly in the page):
  rooms/[slug]  → BreadcrumbList + Product/HotelRoom (Offer only if real price)
  blog/[slug]   → BlogPosting
  [slug]        → BreadcrumbList
  faq           → FAQPage  +  <PageSchemas path="/faq" />
  <Breadcrumb>  → BreadcrumbList (for every page that uses the banner)
```

**Add page-specific CMS schema to any page** in one line:

```tsx
import PageSchemas from "@/components/seo/PageSchemas";
// …inside the returned JSX:
<PageSchemas path="/your-route" />
```

`canonical`, `sitemap`, and `robots` URLs all derive from
`SITE_URL` (env-driven) — never hard-code a domain.

---

## 5. Performance design

* **Images:** 100% `next/image` (zero raw `<img>`). AVIF/WebP, responsive
  `deviceSizes`/`imageSizes` configured in
  [`next.config.ts`](../next.config.ts). Hero/LCP images use `priority`.
* **Fonts:** `next/font` with `display: "swap"`; self-hosted local font avoids
  a render-blocking network request.
* **Static-first:** layout has no dynamic request APIs → static HTML + ISR.
* **Deferred third-parties:** Font Awesome, GA4 and the FB pixel load **after**
  hydration and only when real IDs exist in the CMS — they never block FCP/LCP.
* **Network hints:** `preconnect`/`dns-prefetch` for the image CDN, fonts, GTM
  and Facebook in the `<head>`.
* **Caching:** immutable `/_next/static` (Next default) + security headers via
  `next.config.ts headers()`.

---

## 6. Accessibility design

* Skip-to-content link (first focusable element in `<body>`).
* Exactly **one `<h1>` per page** — content pages via the
  [`Breadcrumb`](../src/components/ui/Breadcrumb.tsx) banner, the home page via
  the hero.
* `prefers-reduced-motion` disables animations (`globals.css`).
* `<html lang>` is config-driven (`site.locale`).
* Decorative images use `alt=""`; informative images carry real `alt`.
* Form inputs are associated to `<label htmlFor>` (see `ContactFrom`).
* **Known tension:** the brand gold `#e3c9a1` fails WCAG AA as text on light
  backgrounds. Use the `text-gold-text` utility (darker bronze, ~5:1) for gold
  copy on light surfaces; the brand gold is fine on dark surfaces. See
  DEPLOYMENT.md → "Audit findings" for the full list.

---

## 7. Configuration boundaries (what lives where)

| You want to change… | Edit |
|---|---|
| Hotel name, phone, email, address, geo, ratings, amenities, booking URL | `src/config/site.ts` |
| Domain, API URL, reCAPTCHA, webhook secret | `.env.local` (template: `.env.example`) |
| Brand colours | `src/app/globals.css` (`--luxury-*` variables) |
| Page copy / images / landmarks / testimonials / FAQs (demo fallback) | `src/data/data.ts` |
| Live content | the CMS (surfaces via `fetchAPI`) |

This separation is what makes the codebase reusable — see **DEPLOYMENT.md**.
