# Marketplace — Backend

API do painel do vendedor para cadastro e gestão de produtos em um marketplace.

- **Stack**: Node.js + TypeScript + Express + Prisma + PostgreSQL (Docker)
- **Auth**: JWT (access/refresh) com `bcrypt` e validações com `zod`
- **Arquitetura**: controller / service / repository / schemas / middlewares / utils
- **Porta padrão**: `3000`

> Integração **Products ↔ Categories**: a API suporta `categoryId` (relacional) e mantém o campo textual `category` (compatibilidade com filtro atual). Ao criar com apenas `categoryId`, o backend preenche o texto `category` automaticamente; no update, `categoryId: null` faz o **disconnect** da relação.

---

## 📁 Estrutura (apps/backend)

```
src/
  core/           # prisma client, errors
  middlewares/    # authGuard, roleGuard, errorHandler
  modules/
    auth/         # register, login, refresh
    products/     # CRUD produtos + integração de categoria
    categories/   # CRUD categorias + list pública
    admin/        # dashboard (métricas) [ADMIN]
  routes/         # agregador de rotas
  app.ts          # instancia e configura o Express
  main.ts         # sobe o servidor
prisma/
  schema.prisma   # modelos
  seed.ts         # seed inicial (categorias)
```

---

## 🧰 Requisitos

- Node.js 18+
- Docker + Docker Compose
- PostgreSQL (via Docker Compose deste repo)
- `npm` (ou `pnpm`/`yarn` se preferir)

---

## 🔧 Setup rápido

1. **Subir Postgres via Docker Compose** (na raiz do monorepo):

   ```bash
   docker compose up -d
   ```

2. **Configurar `.env`** (em `apps/backend/.env`):

   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/marketplace?schema=public
   JWT_SECRET=change-me
   PORT=3000
   ```

3. **Instalar deps** e **migrar**:

   ```bash
   cd apps/backend
   npm i
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Seed inicial (categorias)**:

   ```bash
   npm run db:seed
   ```

5. **Rodar em dev**:
   ```bash
   npm run dev
   # Server is running on port 3000
   ```

Healthcheck: `GET http://localhost:3000/health` → `{ "status": "ok" }`

---

## 🔐 Autenticação

- JWT (Bearer): o `authGuard` exige header: `Authorization: Bearer <accessToken>`
- Roles:
  - `ADMIN`, `SELLER`, `BUYER`
  - `roleGuard` restringe rotas administrativas

---

## 📚 Endpoints

Base URL: `http://localhost:3000`

### Auth

- **POST** `/auth/register`
  - Body:
    ```json
    { "name": "Admin", "email": "admin@market.com", "password": "123456" }
    ```
- **POST** `/auth/login`
  - Body:
    ```json
    { "email": "admin@market.com", "password": "123456" }
    ```
  - Resposta:
    ```json
    {
      "accessToken": "...",
      "refreshToken": "...",
      "user": { "id": "...", "role": "ADMIN" }
    }
    ```
- **POST** `/auth/refresh`
  - Body: `{ "refreshToken": "..." }`

### Categories

- **GET** `/categories` (público) — suporta `?q=`
- **POST** `/categories` _(ADMIN/SELLER)_
  - Body: `{ "name": "Acessórios" }`
- **PUT** `/categories/:id` _(ADMIN/SELLER)_
  - Body: `{ "name": "Acessórios & Gadgets" }`
- **DELETE** `/categories/:id` _(ADMIN)_
  - Bloqueia se houver produtos vinculados

### Products

- **GET** `/products`
  - Query params: `q`, `status` (`ANUNCIADO|VENDIDO|DESATIVADO`), `category` (texto), `categoryId`, `page`, `pageSize`
- **GET** `/products/:id`
- **POST** `/products` _(auth)_
  - Body (exemplo com `categoryId`):
    ```json
    {
      "title": "Mouse Gamer",
      "description": "RGB, 6 botões",
      "price": 199.9,
      "imageUrl": "https://picsum.photos/seed/mousegamer/1200/800",
      "categoryId": "CAT_ID"
    }
    ```
  - Body (compat com `category` textual):
    ```json
    {
      "title": "Webcam Full HD",
      "description": "1080p",
      "price": 129.9,
      "imageUrl": "https://picsum.photos/seed/webcamfullhd/1200/800",
      "category": "Eletrônicos"
    }
    ```
- **PUT** `/products/:id` _(auth)_
  - Trocar categoria:
    ```json
    { "categoryId": "OUTRA_CAT_ID" }
    ```
  - Remover vínculo:
    ```json
    { "categoryId": null }
    ```
- **DELETE** `/products/:id` _(auth)_

### Admin

- **GET** `/admin/dashboard` _(ADMIN)_
  - Resposta:
    ```json
    { "users": 1, "products": 3, "categories": 6, "activeProducts": 2 }
    ```

### Misc

- **GET** `/health`

---

## 🧪 Testes manuais (Postman)

1. **Login**
   - `POST http://localhost:3000/api/auth/login`
   - Body: `{ "email": "admin@market.com", "password": "123456" }`
   - Copie `accessToken`

2. **Listar categorias**
   - `GET http://localhost:3000/api/categories`

3. **Criar produto (com categoryId)**
   - `POST http://localhost:3000/api/products` (Bearer token)
   - Body:
     ```json
     {
       "title": "Mouse Gamer",
       "description": "RGB, 6 botões",
       "price": 199.9,
       "imageUrl": "https://picsum.photos/seed/mousegamer/1200/800",
       "categoryId": "CAT_ID"
     }
     ```

4. **Editar produto (disconnect categoria)**
   - `PUT http://localhost:3000/api/products/PRODUCT_ID`
   - Body: `{ "categoryId": null }`

5. **Criar produto (apenas category textual)**
   - `POST http://localhost:3000/api/products` (Bearer token)
   - Body:
     ```json
     {
       "title": "Webcam Full HD",
       "description": "1080p",
       "price": 129.9,
       "imageUrl": "https://picsum.photos/seed/webcamfullhd/1200/800",
       "category": "Eletrônicos"
     }
     ```

---

## 🗄️ Banco de dados / Prisma

- Gerar client:
  ```bash
  npx prisma generate
  ```
- Criar/atualizar schema:
  ```bash
  npx prisma migrate dev --name init
  ```
- Seed:
  ```bash
  npm run db:seed
  ```
- Prisma Studio:
  ```bash
  npx prisma studio
  ```

---

## 🔒 Notas de segurança

- **JWT_SECRET** deve ser trocado em produção.
- Garanta HTTPS e storage seguro de tokens no front.
- O `roleGuard` restringe manipulação de categorias e dashboard administrativo.

---

## 🧭 Próximos passos (frontend)

- Implementar 3 telas do Figma:
  1. Login (validação + persistência do token)
  2. Listagem de produtos (filtro por texto/status, paginação)
  3. Cadastro/Edição de produto (título, descrição, preço, categoria via `/categories`, imagem)
- Tooltip “**Tá esperando o quê? Boraa moeer!! 🚀**” após 7s de hover no botão **Novo produto**.
- (Diferenciais) Deploy: back (Render/Fly) e front (Vercel).

---

## 📄 Licença

Projeto para fins de desafio técnico.
