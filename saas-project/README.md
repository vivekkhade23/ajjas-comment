# Multi-tenant SaaS Starter (Node + Angular + MongoDB)

Production-oriented SaaS starter with tenant isolation, JWT auth, role-based access, Razorpay subscriptions, and AI booking insights.

## Project Structure

```
saas-project/
  backend/
  frontend/
  .env.example
```

## Backend Setup

1. Copy environment file:
   ```bash
   cp .env.example backend/.env
   ```
2. Edit `backend/.env` values.
3. Install and run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
4. API base URL: `http://localhost:5000/api`

## Frontend Setup

1. Install and run:
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. App URL: `http://localhost:4200`

## Packaging Downloadable ZIP

Binary artifacts are intentionally not committed to Git. Generate the downloadable package locally:

```bash
cd saas-project
./scripts-package-zip.sh
```

This creates `saas-project.zip` in the repository root.

## MongoDB Atlas (Production)

1. Create cluster and DB user in Atlas.
2. Allow network access for deployment hosts.
3. Set `MONGO_URI` using SRV connection string.
4. Turn on backups and alerts.

## Deployment

### Backend on Render

1. Create a new Web Service from `saas-project/backend`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add all backend env vars from `.env.example`.
5. Set Render webhook endpoint in Razorpay: `https://<render-url>/api/billing/webhook`.

### Frontend on Vercel

1. Import `saas-project/frontend` project.
2. Build command: `npm run build`
3. Output directory: `dist/tenant-saas-frontend`
4. Set any client env if needed.

## Key API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET|POST /api/tenants`
- `GET|POST|PUT|DELETE /api/appointments`
- `GET /api/analytics`
- `GET /api/analytics/ai-insights`
- `POST /api/billing/subscriptions`
- `POST /api/billing/webhook`

## Notes

- Include `Authorization: Bearer <token>` header.
- Include `x-tenant-id: <tenantObjectId>` on tenant scoped endpoints.
- All CRUD queries are scoped by `tenantId`.

## Applying This to `vivekkhade23/HIMS_Client`

If you want this SaaS starter as a PR in `https://github.com/vivekkhade23/HIMS_Client`, run these commands in an environment with GitHub network access and push rights:

```bash
# 1) Clone target repo
git clone https://github.com/vivekkhade23/HIMS_Client.git
cd HIMS_Client

# 2) Create a feature branch
git checkout -b feat/multi-tenant-saas-starter

# 3) Copy this starter into the target repo
rsync -av --exclude node_modules --exclude dist /path/to/saas-project ./saas-project

# 4) Commit and push
git add saas-project
git commit -m "Add multi-tenant SaaS starter (Node/Express + Angular)"
git push -u origin feat/multi-tenant-saas-starter

# 5) Open PR on GitHub
```

> Note: In this execution environment, outbound GitHub clone access failed with HTTP 403, so direct PR creation against that remote could not be completed here.
