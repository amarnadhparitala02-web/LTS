# LTS Digital Solutions

Marketing site with a working lead-capture backend.

| Part | Stack |
|---|---|
| `frontend/` | React 19, TypeScript, Vite 7, Tailwind CSS 4, Vitest |
| `backend/` | Node 20+, Express 5, Zod, Helmet, rate limiting, Nodemailer |

## Run locally

```bash
cd backend && npm install && cp .env.example .env && npm run dev
cd frontend && npm install && npm run dev
```

Open http://localhost:5173. In dev, Vite proxies `/api` to the backend on port 4000.

## Before going live (checklist)

1. **Contact details**: set the `VITE_CONTACT_*`, `VITE_WHATSAPP`, `VITE_LOCATION` and social variables (see `frontend/.env.example`). Empty ones are hidden.
2. **Domain**: replace `https://your-domain.example` in `frontend/index.html`, `public/robots.txt` and `public/sitemap.xml`. Add a 1200x630 `og-image.png` and reference it with `og:image`.
3. **Backend**: set `ALLOWED_ORIGINS` to your site origin, a long random `ADMIN_TOKEN`, and SMTP or `WEBHOOK_URL` so you are notified of each lead. Put `DATA_FILE` on a persistent volume.
4. **Frontend**: set `VITE_API_URL` to the deployed API origin, then `npm run build` and deploy `dist/`.
5. **Privacy notice**: `frontend/src/components/Privacy.tsx` is a starter, so have it reviewed.
6. **Content**: add real case studies and testimonials when you have them (the work section is clearly labelled as concepts).

## API

- `POST /api/leads`: validated (Zod), rate-limited (default 5 per 15 min per IP), honeypot-protected. Returns 201, or 422 with per-field messages.
- `GET /api/leads`: needs `Authorization: Bearer <ADMIN_TOKEN>`. Returns stored leads, newest first.
- `GET /api/health`

## Quality gates

`npm run lint`, `npm test` and `npm run build` in `frontend/`, and `npm test` in `backend/`. CI runs all of them (`.github/workflows/ci.yml`).
