# LEADERSHIP.md — Plano de Escala & Liderança (Marketplace)

Este documento apresenta o **diagnóstico**, **prioridades**, **planejamento de 3 sprints**, um **modelo de project report** e um **roadmap trimestral** para escalar o Marketplace para **10k usuários ativos** no próximo trimestre, além da resposta ao **case de cultura e engajamento**.

---

## 1) Diagnóstico & Frentes Críticas (priorizadas)

### Contexto técnico atual (resumo)

- **Stack**: React + Vite + Tailwind (FE) / Node + Express + Prisma + PostgreSQL (BE), JWT (Bearer), upload local com Multer.
- **Estado**: MVP funcional — login, rotas privadas, listagem/filtragem, cadastro com upload, imagens servidas em `/uploads`.
- **Riscos**: uploads locais, observabilidade mínima, queries sem _tuning_ e endpoints sem _rate limiting_.

### Frentes Críticas (Top 3)

1. **Confiabilidade & Performance** (Fundação)
   - **Por quê**: 10k usuários ativos ⇒ picos de tráfego em listar/criar produtos e servir imagens.
   - **Riscos**: latência p95 alta, _timeouts_, bloqueio por I/O de imagens, _cold starts_ de consultas não indexadas.
   - **Métricas alvo**: p95 < 300ms (API), erro 5xx < 0.5%, disponibilidade ≥ 99.9%.

2. **Arquitetura de Arquivos & CDN**
   - **Por quê**: Servir imagens pelo Node local é gargalo e risco de perda de arquivo.
   - **Ação**: migrar uploads para **S3** (ou GCS), servir via **CDN** e assinar URLs, com _lifecycle_ e _resize on-the-fly_ (thumbs).

3. **Observabilidade, Qualidade & Fluxo de Entrega**
   - **Por quê**: Sem telemetria não há detecção precoce; sem testes básicos o risco de regressão cresce.
   - **Ação**: logging estruturado, métricas (Prometheus/OpenTelemetry), traços; testes (API/UI), _CI_, _feature flags_.

> **Nota**: Crescimento/ativação (marketing/UX) aparece como 4ª frente (fora do escopo infra), mas será refletida no **Roadmap**.

---

## 2) Planejamento de 3 Sprints (2 semanas cada)

### Sprint 1 — Fundação de Confiabilidade & Imagens (Infra crítica)

**Objetivo:** tirar _hotspot_ do Node e estabilizar latência/erros básicos.

**Entregáveis:**

- Upload no **S3** (ou GCS) com _bucket_ privado e **URL assinada**; imagens públicas via **CDN** (CloudFront/Cloudflare).
- Job assíncrono para **thumbs** (lambda/queue) + normalização de `imageUrl` no FE (fallback).
- Índices SQL e **paginação cursor-based** em `/products`.
- **Rate limiting** & **compression** (gzip/br) no BE; Helmet/CORS revisados para prod.
- **Health-check** + **/metrics** (Prometheus) + logs estruturados (pino) com correlação _request id_.

**Métricas de sucesso:**

- p95 de `GET /products` < **300ms** (em seed 50k rows).
- 5xx < **0.5%**; TTFB imagens via CDN < **150ms** (região BR).
- 100% dos novos uploads servidos via CDN (não mais `/uploads`).

---

### Sprint 2 — Observabilidade, Testes & CI/CD

**Objetivo:** tornar mudanças seguras e visíveis; reduzir MTTR.

**Entregáveis:**

- **Tracing** (OpenTelemetry) + painel Grafana: latência por rota, taxa de erro, throughput.
- **Alerts** (p95, 5xx, fila de uploads estourando, falha em job de thumbs).
- Testes **API** (supertest) para Auth/Products e **UI** (Vitest + RTL) para `ProductCard`, `ProductForm`, rotas privadas.
- **CI** (GitHub Actions): lint + build + testes + _preview environment_ (Vercel/Render).
- **Backup/Restore** de banco com _retention_ e DR básico (snapshot diário + teste de restore semanal).

**Métricas de sucesso:**

- Cobertura mínima **20–30%** (linhas) nas áreas críticas.
- Pipeline CI < **8 min**; _rollback_ em < **10 min**.
- Alertas ruidosos (< 2 falsos positivos/semana).

---

### Sprint 3 — UX de Catálogo, Status & Hardening

**Objetivo:** melhorar _throughput_ de fluxo principal (listar/criar/editar) e robustez de dados.

**Entregáveis:**

- **Categorias** integradas na UI (select via `/categories` com cache no FE/HTTP).
- **Editar Produto** (GET/PUT), alteração de **status** (PATCH).
- Estados de **loading/empty/error** visíveis; _skeletons_.
- Controle de acesso simples (ex.: **RBAC** ADMIN/SELLER) e _guards_ de endpoints.
- _Feature flags_ para _rollout_ seguro (ex.: `S3_UPLOADS`, `NEW_PRODUCTS_QUERY`).

**Métricas de sucesso:**

- Conversão de **criar produto** ≥ **70%** (completa upload) no ambiente de teste.
- Queda de **erro de validação** < **2%** por release.
- Zero endpoints críticos expostos sem auth/guard.

---

## 3) Project Report (modelo) & Roadmap Trimestral

### 3.1 Project Report — Template (quinzenal/executivo)

**Resumo executivo (1 slide/texto)**

- **Objetivo do período** (ex.: “Fundação de confiabilidade e images CDN”)
- **Status**: ⚪️ Não iniciado | 🟡 Em andamento | 🟢 Concluído | 🔴 Risco
- **Principais resultados** (2–4 bullets)
- **Riscos/Impedimentos** + mitigação
- **Próximos passos** (próxima sprint)

**Métricas (dash resumido)**

- p95 API / erro 5xx / uptime
- Throughput de uploads / erro em jobs
- Taxa de conversão “criar produto”
- Tempo de build/CI / MTTR

**Decisões & mudanças de escopo**

- Registro de ADR (Architecture Decision Record) simplificado (link).

### 3.2 Roadmap Trimestral (3 épicos — 1 por mês)

**Mês 1 — Epic: Confiabilidade & CDN**

- **OKRs**
  - **KR1:** p95 API < **300ms**; 5xx < **0.5%**
  - **KR2:** 100% das imagens novas via CDN; TTFB < **150ms**
  - **KR3:** Uptime **≥ 99.9%**
- **Critérios de aceite**
  - S3/CDN no ar; paginar `/products`; rate limiting ativo
  - Dash com p95/5xx por rota e alertas básicos

**Mês 2 — Epic: Observabilidade & Entrega**

- **OKRs**
  - **KR1:** Cobertura de testes **≥ 30%** nas áreas críticas
  - **KR2:** CI < **8 min**, rollback < **10 min**
  - **KR3:** MTTR **< 45 min**
- **Critérios de aceite**
  - Tracing em produção; backups validados por restore semanal

**Mês 3 — Epic: Catálogo & Robustez**

- **OKRs**
  - **KR1:** Conversão “criar produto” **≥ 70%**
  - **KR2:** Erro de validação **< 2%**
  - **KR3:** 0 endpoints críticos sem auth
- **Critérios de aceite**
  - Categorias na UI; editar/status; feature flags habilitadas

---

## 4) Cultura & Engajamento — Case “Bora Moer”

**Problema:** burndown ignorado, atrasos, rituais esvaziados → desengajamento.

### Ações imediatas (2 semanas)

1. **Reset de cerimônias** (curtas, com propósito claro):
   - **Daily** 10–15 min: _plan for today_, bloqueios, **commitment check**.
   - **Weekly Ops** 30 min: incidentes, métricas (p95/5xx/MTTR), capacidade.
   - **Sprint Planning**: foco em **objetivo** e **3–5 itens** com DoR claro.
2. **Quadro visível de metas** (dashboard simples):
   - p95, 5xx, Throughput, Bugs Abertos, OKRs da sprint.
3. **Definition of Ready/Done**:
   - **DoR:** critério de aceite + plano de teste + impacto no usuário.
   - **DoD:** code review + testes + métricas sem regressão + release note.
4. **1:1s rápidos** (15 min) com quem mais está travado; remover impedimentos.
5. **Reconhecimento imediato** (“Chuva de Moer”): celebrar entregas e aprendizagens, não só “tarefas concluídas”.

### Medidas estruturais (contínuas)

- **WIP Limit**: evitar multitarefa; foco em finalizar.
- **Rotação de _owners_** por épico para ampliar senso de dono.
- **Pair/Mob** em áreas sensíveis (auth, uploads, queries críticas).
- **Rituais com hora marcada**, _timebox_ real, pauta publicada antes.
- **Feedbacks objetivos** (SBI) e **acordos do time** revisados na retro.
- **Trilhas de crescimento** (técnica & liderança) com objetivos trimestrais.

### “Bora Moer” na prática

- Clareza de **prioridade** e **foco** → menos tarefas, mais impacto.
- **Transparência** de impedimentos → líder remove, time comunica cedo.
- **Entrega incremental** → PRs pequenos, sucesso mensurável.
- **Celebrar** progresso + **aprendizado** de incidentes (post-mortem sem culpa).

---

## Apêndice — Itens técnicos de implementação (referência rápida)

- **S3/CDN**
  - Bucket privado, `putObject` com política mínima, **URL assinada**; imagens públicas via CDN (cache control).
  - _Lambda/Cloud Run_ para redimensionamento (thumbs), com fila (SQS/PubSub).
- **DB & API**
  - Índices: `(userId, status, createdAt)`, `LOWER(title)` para busca simples.
  - **Paginação cursor-based**; evitar `OFFSET` em grandes volumes.
  - **Cache** seletivo (HTTP `Cache-Control`, `ETag`; Redis — opcional).
- **Segurança**
  - **RBAC** (ADMIN/SELLER), **JWT expiração** curta + refresh (futuro).
  - **Rate limiting** por IP/rota; **Helmet** com CSP ajustada (img-src http/https).
  - **Validação** de `mimetype` em upload; tamanho máx.; antivírus opcional (clamav).
- **Observabilidade**
  - _Request ID_ em logs; **OpenTelemetry** (http/server + prisma); métricas (p95, RPS, 5xx).
  - **Alertas**: threshold adaptativos por horário (evitar ruído).

---

## Cadência de Comunicação

- **Daily** (engenharia): 10–15 min, foco em hoje/bloqueios.
- **Weekly** (com stakeholders): 30 min, _report_ executivo e riscos.
- **Retro** (fim da sprint): 45–60 min, 1–2 melhorias acionáveis pro próximo ciclo.
- **Quarter Kickoff**: 60 min, revisão de OKRs/épicos e riscos.

---

**Owner**: Tech Lead · **Stakeholders**: Produto, Engenharia, CX/Marketing, Operações.
