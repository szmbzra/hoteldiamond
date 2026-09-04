# Hotel Diamond Pvt. Ltd

A high-performance, SEO/AEO-optimised hotel website built with **Next.js 16**
(App Router) and **Tailwind CSS v4**, driven by a headless CMS. Designed to be
reused as a template for other properties.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in API URL, domain, keys
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Documentation

| Doc | Read it to… |
|-----|-------------|
| **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** | understand the structure, data flow, rendering model, and the SEO/AEO/perf/a11y design — the reference pattern for building the next site. |
| **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** | launch this codebase for a **new hotel**, plus the pre-launch checklist and audit findings. |

## Reusing for another property

Identity is centralised. To re-skin for a new hotel you edit, in order:

1. `.env.local` — domain, CMS API URL, keys (template: `.env.example`)
2. `src/config/site.ts` — name, contact, address, geo, ratings, booking URL
3. `src/app/globals.css` — brand colours (`--luxury-*`)
4. `src/data/data.ts` — fallback copy / images / content arrays
5. `next.config.ts` — image CDN host

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for the full walkthrough.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
