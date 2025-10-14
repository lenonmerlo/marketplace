# Marketplace — Front-end (Vite + React + Tailwind v4)

Interface do **Marketplace** (painel do vendedor) construída em React + Vite + Tailwind v4.

## ⚙️ Requisitos

- Node 18+
- npm/pnpm (usamos **pnpm** no monorepo, mas o front funciona com npm também)
- Backend rodando em `http://localhost:3000` (ver README da raiz)

## 🌱 Setup rápido

Crie o `.env` do front:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Conteúdo sugerido:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

> Dica: após alterar o `.env`, reinicie o Vite.

## ▶️ Rodar em desenvolvimento

```bash
# via pnpm (recomendado no monorepo)
pnpm --filter @apps/frontend dev

# ou via npm dentro de apps/frontend
cd apps/frontend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 🧩 Funcionalidades entregues

- **Autenticação** (Login) com validação (zod + RHF)
- **Rotas privadas** (Dashboard, Products, Product New/Edit)
- **Listagem de produtos** com filtro por **texto** e **status**
- **Cadastro de produto** com **upload de imagem**
- **Cards e formatação de preço (BRL)**
- **Mensagem secreta**: mantenha o mouse por **7s** no botão **“Novo produto”** e aparece o tooltip especial
- Layout e componentes de acordo com o Figma (AppHeader, NavTab, ProductCard, ProductForm etc.)

## 🔌 Integração com API

- Base URL configurada por `VITE_API_BASE_URL` (ex.: `http://localhost:3000/api`)
- Interceptor do Axios injeta `Authorization: Bearer <token>` lido do `localStorage` (`authToken`)
- Upload é feito via `FormData` no campo **`image`**
- API responde `imageUrl` **absoluta** (ex.: `http://localhost:3000/uploads/<arquivo>.jpg`)

## 🖼️ Imagens

O back serve as imagens em `/uploads` e o Helmet está configurado para permitir **cross-origin**:

```ts
helmet({ crossOriginResourcePolicy: false });
```

No front, há normalização de `imageUrl` para lidar com dados legados (placeholder quando necessário).

## 🧪 Como testar rápido

1. Faça login (ou use usuário seed, ver README raiz)
2. Vá em **Produtos**
3. Crie um novo produto em **Novo produto**, selecione uma imagem e salve
4. A imagem deve aparecer no card; preços formatados em BRL

## 🗂️ Estrutura principal

```
apps/frontend/
  src/
    api/
      client.ts
      products.ts
    assets/
    components/
      AppHeader.tsx
      NavTab.tsx
      ProductCard.tsx
      ProductForm.tsx
      ...
    hooks/
    pages/
      Login.tsx
      Dashboard.tsx
      Products.tsx
      ProductNew.tsx
      ProductEdit.tsx
    styles/
      globals.css
    utils/
      formatBRL.ts
      normalizeImageUrl.ts
  index.html
  package.json
  tailwind.config.js (v4)
```

## 🧱 Build

```bash
pnpm --filter @apps/frontend build
# ou
cd apps/frontend && npm run build
```

Saída em `apps/frontend/dist`.

## 🚀 Deploy (resumo)

- Vercel/Netlify servindo `dist`
- Configure `VITE_API_BASE_URL` apontando para o back em produção (ex.: Render)
- Se usar cookies no futuro, ajustar CORS/credentials no back

## 📝 Decisões

- Token no header (Bearer) via LocalStorage (sem cookies)
- Preço decimal vindo do back; formatado em BRL no front
- Upload com `FormData` → back retorna `imageUrl` absoluta

## 📌 Roadmap curto

- Estados de loading/empty/error
- Edição de produto (GET/:id + PUT/:id com upload opcional)
- Popular categorias via `GET /categories`
- Testes de componentes (vitest + RTL)
