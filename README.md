# Patashala.Dev — Company Website

Production-ready marketing site for **Patashala.Dev** — a consulting, software development, and technology training company from Hyderabad, India.

**Learn. Build. Deliver.**

## Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript, Turbopack)        |
| Styling    | Tailwind CSS v4, shadcn-style component primitives    |
| Motion     | Framer Motion (scroll reveals, mobile menu, counters) |
| 3D         | Three.js + React Three Fiber (hero ecosystem visual)  |
| Forms      | React Hook Form + Zod validation                      |
| Database   | MongoDB (Atlas-compatible) + Mongoose ODM             |
| Email      | Resend (lead notifications)                           |
| Theming    | next-themes (dark / light, system-aware)              |
| Deployment | Docker (multi-stage, standalone output) or Vercel     |

## Project structure

```
src/
├── app/                  # Routes (App Router)
│   ├── api/              # contact + newsletter APIs
│   ├── blog/             # Insights index + [slug] posts
│   ├── solutions/        # Solutions hub, LMS, CRM, AgriTech
│   ├── services/ training/ portfolio/ about/ contact/
│   ├── sitemap.ts robots.ts og.png/   # SEO assets
│   └── layout.tsx        # Root layout + Organization JSON-LD
├── components/
│   ├── ui/               # Button, Card, Badge, Input, Section (design system)
│   ├── blocks/           # PageHeader, CtaSection, Faq, FeatureCard (reusable)
│   ├── motion/           # Reveal, Counter (animation presets, reduced-motion aware)
│   ├── three/            # 3D ecosystem scene + light fallback wrapper
│   ├── forms/            # ContactForm, NewsletterForm
│   └── layout/           # Navbar, Footer, ThemeToggle, Logo, Providers
├── config/               # ALL site content (copy, nav, services, blog…) — edit here
│   ├── lib/              # db, email, validations, rate-limit, seo, utils
│   └── lib/models/       # Mongoose schemas (Lead, BlogPost, BlogLike…)
scripts/                  # seed.ts (sample data)
```

**Content lives in `src/config/`** — services, solutions, training tracks, case studies, FAQs, blog posts, nav, and contact-form options are typed data files separated from UI. To go CMS-driven later, swap a config import for a CMS fetch; no component changes needed.

## Getting started

```bash
npm install
cp .env.example .env         # then fill in values (all optional for local dev)
npm run dev                  # http://localhost:3000
```

The site runs fully **without** a database or email key:

- No `MONGODB_URI` → contact API falls back to email-only (or returns a clear 503 if email is also unset); newsletter logs a warning.
- No `RESEND_API_KEY` → notification emails are skipped; leads are still stored when a DB is present.

### With a database

```bash
docker compose up mongo -d   # local MongoDB 7 (or use a MongoDB Atlas cluster)
npm run db:seed              # clearly-labeled sample data
```

Collections and indexes are created automatically by Mongoose on first write — no migration step.

Connection string format (MongoDB Atlas):

```
MONGODB_URI="mongodb+srv://USER:PASSWORD@HOST/patashala?retryWrites=true&w=majority"
```

URL-encode special characters in the password (e.g. `@` → `%40`).

## Environment variables

See [.env.example](.env.example).

| Variable                 | Required | Purpose                                |
| ------------------------ | -------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | prod     | Canonical URL for SEO/sitemap          |
| `MONGODB_URI`          | no       | MongoDB connection for lead storage    |
| `RESEND_API_KEY`       | no       | Lead notification emails               |
| `CONTACT_NOTIFY_EMAIL` | no       | Where lead notifications are delivered |
| `CONTACT_FROM_EMAIL`   | no       | Verified sender address                |

## Backend behavior (`/api/contact`)

- [ ] **Zod validation** with per-field errors (mirrored client-side via React Hook Form)
- [ ] **Honeypot** field — bots get a fake success and learn nothing
- [ ] **Rate limiting** — 5 requests/min/IP (in-memory; swap for Redis/Upstash when scaling horizontally)
- [ ] **Graceful degradation** — DB and email are independent; failure of one doesn't lose the lead
- [ ] Lead status workflow in the model: `NEW → CONTACTED → QUALIFIED → PROPOSAL_SENT → WON/LOST`

## Performance & accessibility

- All marketing pages statically prerendered (SSG); APIs and OG image are the only dynamic routes
- 3D hero is **dynamically imported**, desktop-only; mobile and `prefers-reduced-motion` users get a light CSS fallback
- All Framer Motion components respect `prefers-reduced-motion`
- Semantic HTML, labeled forms, `aria-*` on interactive elements, keyboard-visible focus rings
- Security headers (nosniff, frame-deny, referrer-policy) via `next.config.ts`
- JSON-LD: Organization (global), Services, FAQ, BlogPosting

## SEO

- Per-page `metadata` via `src/lib/seo.ts` helper (title, description, canonical, OG, Twitter)
- `sitemap.xml` and `robots.txt` generated from route + blog config
- Dynamic OG image at `/og.png` (edge runtime)

## Quality checks

```bash
npm run lint            # ESLint (zero warnings expected)
npm run format:check    # Prettier
npm run build           # type-checks + production build
```

## Deployment

### Vercel (simplest)

1. Import the repo, set env vars from `.env.example`.
2. Create a MongoDB Atlas cluster (or any reachable MongoDB) and set `MONGODB_URI`.
3. Optionally seed sample data with `npm run db:seed`. Collections/indexes are created on first write.

### Docker (self-hosted)

```bash
docker compose up --build        # web + MongoDB
# optional, in another shell, to seed sample data:
docker compose exec web npm run db:seed
```

The Dockerfile uses Next.js `standalone` output for a small runtime image and runs as a non-root user.

## Content honesty notes

- Case studies are **anonymized engagement snapshots**, labeled "Solution Snapshot" / "Sample Engagement" — no invented client names.
- Seeded testimonials are explicitly marked `[Placeholder]` and unpublished.
- Agri Rover copy uses "designed for / capabilities can include / innovation direction" — no invented specifications.

## Roadmap (not yet built)

- Admin dashboard (auth + lead status management) — schema already supports it
- CMS integration for blog (config layer is swap-ready)
- PostHog analytics + Sentry monitoring (structure is logging-ready)
