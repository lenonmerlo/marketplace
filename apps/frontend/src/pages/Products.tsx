import { useMemo, useState } from "react";
import { PRODUCTS, type ProductStatus } from "../data/products";

import Logo from "../assets/Logo.png";
import Avatar from "../assets/avatar.png";
import IconPlus from "../assets/icons/icon-plus.svg";
import IconDash from "../assets/icons/chart-histogram.svg";
import IconBox from "../assets/icons/package.svg";

import IconSearch from "../assets/icons/search-01.svg";
import IconArrowDown from "../assets/icons/arrow-down-01.svg";

import NavTab from "../components/NavTab";
import ProductCard from "../components/ProductCard";

const STATUS_OPTS: { label: string; value: ProductStatus | "TODOS" }[] = [
  { label: "Todos", value: "TODOS" },
  { label: "Anunciado", value: "ANUNCIADO" },
  { label: "Vendido", value: "VENDIDO" },
  { label: "Desativado", value: "DESATIVADO" },
];

export default function Products() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ProductStatus | "TODOS">("TODOS");

  const list = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const qMatch =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      const sMatch = status === "TODOS" ? true : p.status === status;
      return qMatch && sMatch;
    });
  }, [q, status]);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* HEADER – igual ao Dashboard */}
      <header className="h-20 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-4 flex items-center justify-between">
          <img src={Logo} alt="Marketplace" className="h-10 w-auto" />

          <nav className="hidden md:flex items-center gap-6">
            <NavTab to="/dashboard" icon={<img src={IconDash} className="w-4 h-4" />}>
              Dashboard
            </NavTab>
            <NavTab active icon={<img src={IconBox} className="w-4 h-4" />}>
              Produtos
            </NavTab>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/products/new"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[12px]
                         bg-[var(--color-orange-base)] text-white hover:bg-[var(--color-orange-dark)]"
            >
              <img src={IconPlus} className="w-4 h-4 brightness-0 invert" />
              <span>Novo produto</span>
            </a>
            <img src={Avatar} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
          </div>
        </div>
      </header>

      {/* CONTEÚDO – 168px laterais, 238px de topo (Figma) */}
      <section className="mx-auto w-full max-w-none px-4 lg:px-[168px] pt-[64px] pb-10">
        <header className="mb-6">
          <h1 className="text-[24px] font-bold leading-[120%]">Seus produtos</h1>
          <p className="text-[14px] text-[#7a7a7a]">
            Acesse e gerencie a sua lista de produtos à venda
          </p>
        </header>

        {/* grid: filtro fixo 327px + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[327px_minmax(0,1fr)] gap-x-6">
          {/* FILTRO */}
          <aside className="mb-6 lg:mb-0">
            <h2 className="text-[14px] font-semibold mb-4">Filtrar</h2>

            <div className="space-y-6">{/* 24px entre campos  */}
              {/* Pesquisar */}
              <div>
                <label className="sr-only">Pesquisar</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                    <img src={IconSearch} className="w-5 h-5" />
                  </span>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Pesquisar"
                    className="input pl-10"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="sr-only">Status</label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus | "TODOS")}
                    className="select appearance-none pr-10"
                  >
                    {STATUS_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70">
                    <img src={IconArrowDown} className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <button className="btn btn-primary w-full">Aplicar filtro</button>
            </div>
          </aside>

          {/* CARDS – 16px entre cards  */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {list.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
