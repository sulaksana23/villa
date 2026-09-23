# VillaNusantara — Luxury Villa Booking Platform

> Private pool villa di Bali, Lombok & Yogyakarta. Foto real, harga owner langsung, konfirmasi instan &lt;3 menit via WhatsApp.

[![Vercel](https://img.shields.io/badge/Vercel-Live-black?logo=vercel)](https://villafrontend-6jebv9q9q-sulaksana23s-projects.vercel.app/) ![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38BDF8?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript) ![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?logo=prisma) ![License](https://img.shields.io/badge/License-MIT-green)

**🚀 Live Preview:** **https://villafrontend-6jebv9q9q-sulaksana23s-projects.vercel.app/**  
**Live Demo (dev):** `http://localhost:3045` → `http://localhost:3045/villas` → `http://localhost:3045/villas/1`  
**GitHub:** https://github.com/sulaksana23/villa

> **Deploy di Vercel:** Auto deploy dari `main` — setiap push ke GitHub langsung live di preview di atas.

![Preview](https://villafrontend-6jebv9q9q-sulaksana23s-projects.vercel.app/og-image.png)

---

## ✨ Fitur

### Public (Booking)
- **Home** — Hero parallax + floating villa card, SearchBar, categories (Bali/Lombok/Jogja/Beachfront), featured 6 villa stagger, trust 4 stats, testimonials 4.9/5, why 3, CTA gradient
- **Villas** — Filter search/lokasi/harga/amenitas, sort populer/rating/harga, grid/list toggle, badge quick filter, map sticky (soon), 6 villa mock + API fallback
- **Detail `[id]`** — Gallery 4 foto + thumb lightbox, sticky booking widget (date/nights/guests, cleaning fee, diskon 10% ≥3 malam, WA link), amenities, reviews, kebijakan, similar 3
- **Booking** — 3 step (Data Tamu → Pembayaran → Konfirmasi), transfer/WA/COD, DP 10%, invoice WA
- **Lain:** About timeline 2018→2026, Contact form + map, FAQ 6, Gallery 12, Favorites, 404, loading skeleton

### Animations
- `framer-motion` + Tailwind keyframes (`fadeInUp`, `float`, `shimmer`)
- `AnimatedSection` (viewport once), `StaggerGrid` (0.08s), hover `scale-[1.01]` `shadow-2xl`

### Dashboard (Admin)
- Auth JWT + RBAC (`view_villas`, `create_villas`...)
- Villa CRUD + Room CRUD + VillaType/Facility
- Prisma MySQL + Redis + ioredis
- Layout sidebar + topbar search + metrics

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 15.5 (App Router, Turbopack), React 19, TypeScript 5.7, Tailwind 4, shadcn/ui, Radix, Zustand, React Hook Form + Zod, Sonner, Framer Motion 12 |
| **Backend** | Express 4, Prisma 6, MySQL 8, Redis 7, JWT, Bcrypt, Multer, Zod |
| **Infra** | Docker Compose (villa-db:13306, villa-redis:16379, backend:4000, frontend:10080), Node 20 Alpine |

---

## 📁 Struktur

```
projectvilla/
├── backend/
│   ├── prisma/schema.prisma (Villa, VillaType, Facility, Room, User, Role...)
│   ├── src/server.ts, routes/villa.routes.ts, services/, middleware/auth.ts
│   └── package.json
├── frontend/
│   ├── src/app/
│   │   ├── (public)/page.tsx (home), villas/page.tsx, villas/[id]/page.tsx
│   │   │         booking/page.tsx, faq/page.tsx, gallery/page.tsx, about/page.tsx, contact/page.tsx
│   │   ├── (dashboard)/dashboard/page.tsx, villas/[id]/page.tsx, rooms/...
│   │   ├── layout.tsx, not-found.tsx, loading.tsx, globals.css
│   │   ├── components/public/navbar.tsx, footer.tsx, villa-card.tsx, search-bar.tsx, animated-section.tsx
│   │   ├── components/ui/*, lib/mock-villas.ts, lib/villa-api.ts, store/auth.ts
│   │   └── next.config.mjs, tailwind.config.ts, postcss.config.mjs
│   └── package.json (next 15.5, tailwind 4, framer-motion)
└── docker-compose.yml
```

---

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/sulaksana23/villa.git
cd villa
```

### 2. Env
```bash
cp .env.example .env
# edit DB_PASSWORD, JWT_SECRET, NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 3. Docker (recommended)
```bash
docker compose up -d villa-db villa-redis
# backend
cd backend && npm install && npx prisma migrate dev && npx prisma db seed && npm run dev
# frontend (di terminal lain)
cd frontend && npm install && npm run dev -- --port 3045 --hostname 0.0.0.0
# open http://localhost:3045
```

### 4. Tanpa Docker
```bash
# MySQL 8 + Redis 7 harus jalan lokal
cd backend && npm install && npx prisma generate && npm run dev # :4000
cd frontend && npm install && npm run dev -- --port 3045
```

### Production Build
```bash
cd frontend && npm run build # ✓ 17 pages (6.73kB /)
npm run start -- --port 3045
# atau docker: docker compose up --build villa-frontend # :10080
```

---

## 🔌 API

Backend `http://localhost:4000/api`

| Method | Endpoint | Auth | Desc |
|--------|----------|------|------|
| POST | `/auth/login` | - | Login JWT |
| POST | `/auth/register` | - | Register |
| GET | `/auth/me` | Bearer | Profile |
| GET | `/villas` | `view_villas` | List + page, search, is_active |
| GET | `/villas/:id` | `view_villas` | Detail |
| POST | `/villas` | `create_villas` | Create |
| PUT | `/villas/:id` | `edit_villas` | Update |
| DELETE | `/villas/:id` | `delete_villas` | Delete |
| GET | `/villas/villa-types` | auth | Types |
| GET | `/villas/facilities` | auth | Facilities |
| GET | `/rooms` | `view_rooms` | List rooms |

Frontend fallback `lib/villa-api.ts` → jika `/villas/public` 401 → pakai `mockVillas` 6 data Unsplash.

---

## 🎨 Frontend Routes

| Route | File | Desc |
|-------|------|------|
| `/` | `(public)/page.tsx` | Hero + SearchBar + trust + categories + featured + testimonials |
| `/villas` | `(public)/villas/page.tsx` | Filter + map |
| `/villas/[id]` | `(public)/villas/[id]/page.tsx` | Gallery + booking widget |
| `/booking?villa=1` | `(public)/booking/page.tsx` | 3 step |
| `/about` | `(public)/about/page.tsx` | Timeline + values |
| `/contact` | `(public)/contact/page.tsx` | Form + map |
| `/faq` | `(public)/faq/page.tsx` | 6 Q&A |
| `/gallery` | `(public)/gallery/page.tsx` | 12 foto |
| `/favorites` | `(public)/favorites/page.tsx` | Wishlist |
| `/login`, `/register` | `app/login/page.tsx` | Auth |
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Overview |
| `/dashboard/villas`, `/dashboard/rooms` | `(dashboard)/...` | CRUD |

---

## 🛠️ Scripts

```bash
# root
npm run dev              # concurrently backend:4000 + frontend:3000
npm run build            # build both
# backend
npm run dev              # tsx watch src/server.ts
npx prisma studio        # GUI DB
npx prisma migrate dev   # migrate
# frontend
npm run dev -- --port 3045
npm run build
npm run lint
```

---

## 🐳 Docker

```yaml
villa-db: mysql:8.0, 13306:3306, villa_management
villa-redis: redis:7-alpine, 16379:6379
villa-backend: node:20-alpine, 4000:4000
villa-frontend: node:20-alpine, 10080:3000 (standalone)
```

---

## 📸 Screenshots

> Ganti dengan screenshot asli setelah `npm run build`

- Home hero + SearchBar floating
- Villas grid 3 + filter + map sticky
- Detail gallery 420px + thumb + sticky booking gradient

---

## 🤝 Contributing

1. Fork, branch `feat/nama-fitur`
2. `npm run build` harus `✓` 17 pages
3. PR ke `main` — describe + screenshot

---

## 📄 License

MIT — bebas pakai untuk villa pribadi/komersial.

---

**Built with ♥ by VillaNusantara Team — Bali 2018→2026 • 500+ villa verified • 12k+ tamu • 4.9/5**
