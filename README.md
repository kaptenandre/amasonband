# Amason — official site

A fast, SEO-focused landing page for the Swedish band **Amason**, built with
**Next.js (App Router)** and **Sanity** as the headless CMS.

The page is content-driven: everything you see — the hero, the bio, the band
members, the discography, the listen links and the newsletter copy — is edited
in Sanity Studio and rendered here. The design is intentionally typographic and
gradient-led, so it looks finished even before photography and cover art are
uploaded.

## Editing content

- **Studio:** https://amason-year0001.sanity.studio/
- **Sanity project:** `p718lxdg` · dataset `production` (org: YEAR0001)

Open the Studio, edit **Landing page** / **Site settings** / **Members** /
**Releases**, hit **Publish**, and the site updates within an hour (ISR).

### What an editor can change

| Document | Controls |
| --- | --- |
| **Landing page** | Hero headline & buttons, and the ordered list of sections (about, featured release, members, discography, listen, newsletter, press). Per-page SEO. |
| **Site settings** | Band name, tagline, social links, contacts (booking/management/press), footer, default SEO & social-share image. |
| **Members** | Name, role, "also known for", photo, order. |
| **Releases** | Title, type, date, cover art, description, listen links, and an **Upcoming** toggle for the 2027 album. |

## Local development

```bash
cp .env.example .env.local   # values already point at the right project
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project (`p718lxdg`) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API date, e.g. `2024-10-01` |
| `NEXT_PUBLIC_SITE_URL` | Public URL — used for canonical links, sitemap and OG tags |
| `SANITY_READ_TOKEN` | Optional. Only needed if the dataset is switched to private. |

The `production` dataset is **public-read**, so no token is required to serve
published content.

## SEO

- Per-page metadata (`generateMetadata`) with title, description, keywords and
  canonical URL, sourced from the SEO fields in Sanity.
- Open Graph + Twitter cards, with a generated 1200×630 share image
  (`/opengraph-image`) used when no custom image is set.
- `schema.org` **MusicGroup** JSON-LD (members, albums, social profiles) for
  rich results.
- `sitemap.xml`, `robots.txt` and a generated favicon.
- Semantic landmarks, a single `<h1>`, alt text and reduced-motion support.

## Newsletter

The signup posts to `/api/subscribe`, which validates the address and accepts
it. Wire it to your ESP by forwarding from that route (or set an `actionUrl` on
the Newsletter section in Sanity).

## Deploying

Deploy anywhere that runs Next.js (Vercel recommended). Set the environment
variables above, point `NEXT_PUBLIC_SITE_URL` at the production domain, and add
that domain as a CORS origin in Sanity if you later use authenticated requests.

## Tech

- Next.js 15 · React 19 · TypeScript
- `@sanity/client`, `@sanity/image-url`, `@portabletext/react`
- Hand-written CSS design system (`src/app/globals.css`) — no UI framework
