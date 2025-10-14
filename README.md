# Marketplace — Monorepo

Monorepo do **Marketplace** contendo:

## Demo em vídeo

[Assista ao demo (MP4)](./docs/demo.mp4)

- **apps/backend** — API Node/Express + Prisma + PostgreSQL (upload de imagens via Multer)
- **apps/frontend** — React + Vite + Tailwind v4

---

## 📦 Requisitos

- Node 18+
- pnpm (recomendado) ou npm (⚠️ backend atualmente usando **npm** nas máquinas do time)
- PostgreSQL

---

## 🔐 Variáveis de ambiente

### Backend (`apps/backend/.env`)

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/marketplace?schema=public"
JWT_SECRET="uma_chave_segura_aqui"
PORT=3000
# CORS_ORIGIN pode ser usado se quiser restringir explicitamente
# CORS_ORIGIN=http://localhost:5173
```

### Frontend (`apps/frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

> Após editar `.env`, reinicie os servidores.

---

## ▶️ Como rodar o projeto

### 1) Backend (API)

```bash
# opção A: usando pnpm no monorepo
pnpm --filter @apps/backend install
pnpm --filter @apps/backend prisma generate
pnpm --filter @apps/backend prisma migrate dev
pnpm --filter @apps/backend dev

# opção B: usando npm dentro do backend
cd apps/backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Health-check: `http://localhost:3000/health` → `{ "status": "ok" }`

**Uploads de imagens**: servidos em `http://localhost:3000/uploads/<arquivo>`  
Helmet ajustado para permitir cross-origin:

```ts
helmet({ crossOriginResourcePolicy: false });
```

**CORS** (dev): `http://localhost:5173` com `credentials` permitido.

### 2) Frontend (Web)

```bash
# via pnpm
pnpm --filter @apps/frontend install
pnpm --filter @apps/frontend dev

# ou via npm
cd apps/frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🔌 Endpoints principais (resumo)

### Auth

- `POST /api/auth/login` → `{ accessToken }`
- `POST /api/auth/register` (opcional no MVP)
- `GET /api/me` → dados do usuário (se aplicável)

### Produtos

- `GET /api/products?search=&status=` — lista do usuário
- `GET /api/products/:id`
- `POST /api/products` — **FormData** (`image`, `title`, `description`, `price`, `categoryId`)
- `PUT /api/products/:id` — **FormData** opcional (`image`) ou `imageUrl` absoluta
- `PATCH /api/products/:id/status` — altera status (ANUNCIADO/VENDIDO/DESATIVADO)
- `DELETE /api/products/:id`

### Categorias

- `GET /api/categories` — para popular select (quando ligado na UI)

### Métricas (exemplo)

- `GET /api/metrics/visitors?range=30d` — usado no Dashboard

**Auth**: JWT Bearer. O front armazena `authToken` (LocalStorage) e injeta no header:
`Authorization: Bearer <token>`

---

## 🖼️ Uploads e imagens

- Upload via `multer.single("image")`
- Arquivos salvos em `apps/backend/uploads/`
- Servidos por `app.use("/uploads", express.static(...))`
- Helmet com `crossOriginResourcePolicy: false` para permitir `<img src="http://localhost:3000/uploads/...">` no front.
- **Importante:** garantir `apps/backend/uploads/` no `.gitignore` (não versionar).

---

## 🧪 Postman (fluxo rápido)

1. **POST** `/api/auth/login` → copie `accessToken`
2. **POST** `/api/products` com **form-data**:
   - `title` (Text), `description` (Text), `price` (Text/decimal), `categoryId` (Text), `image` (File)
3. **GET** `/api/products` → verifique `imageUrl` absoluto
4. Abra a `imageUrl` no navegador → deve carregar (200)

---

## 🧱 Estrutura do monorepo

```
apps/
  backend/
    src/
      main.ts
      routes/
      modules/
        auth/
        products/
          product.controller.ts
          product.routes.ts
          product.service.ts
          product.schemas.ts
        categories/
      core/
      middlewares/
    prisma/
    uploads/        (ignorado no git)
    package.json
  frontend/
    src/
      api/
      components/
      pages/
      styles/
      utils/
    index.html
    package.json
pnpm-lock.yaml (ou package-lock.json)
package.json
```

---

## 📝 Decisões e Notas

- **Token no header (Bearer)** via LocalStorage no front (interceptor do Axios)
- **Preço**: decimal no back → formatado em BRL no front (util `formatBRL`)
- **Dados legados de imagens**: normalização no front para evitar `<img src="">` (fallback para placeholder)
- **CORS/Helmet** configurados para dev; em produção ajustar `origin` e CSP conforme domínio

---

## 🗺️ Roadmap (Sprints)

**Sprint 0 — MVP** (entregue)

- Login, rotas privadas, listagem com filtro, cadastro com upload, tooltip secreta, README

**Sprint 1 — Produtos & Categorias + Dashboard**

- GET `/categories` integrado ao select na UI
- Edição de produto (GET/PUT + troca de imagem)
- PATCH de status (ANUNCIADO/VENDIDO/DESATIVADO)
- Dashboard com endpoint real e estados de loading/error
- UX states (loading/empty/error) na listagem e form

**Sprint 2 — Qualidade e Deploy**

- Testes (API: supertest; UI: vitest + RTL)
- CI (lint/build/test) no GitHub Actions
- ERD no README (Prisma ERD/draw.io)
- Deploy: Backend (Render/Fly.io), Front (Vercel/Netlify); CORS/Helmet/CSP revisados

---

## 🚀 Deploy (resumo)

- **Backend**: Render/Fly + variável `DATABASE_URL` + volume/S3 para uploads
- **Frontend**: Vercel + `VITE_API_BASE_URL` apontando pro domínio do back
- **CORS/Helmet**: `origin` do front, `crossOriginResourcePolicy: "cross-origin"`
- **CSP** (se habilitar): `img-src 'self' data: blob: https:`

---

## ✅ Definition of Done (DoD)

- README atualizado e claro
- Rodando local com `login → create → list` OK
- Sem erros graves no console
- PR com prints e checklist
