import { useEffect, useMemo, useState } from "react";
import { type ProductStatus } from "../data/products";
import { api } from "../api/client";

import IconSearch from "../assets/icons/search-01.svg";
import IconArrowDown from "../assets/icons/arrow-down-01.svg";
import ProductCard from "../components/ProductCard";
import AppHeader from "../components/AppHeader";

const STATUS_OPTS: { label: string; value: ProductStatus | "TODOS" }[] = [
  { label: "Todos", value: "TODOS" },
  { label: "Anunciado", value: "ANUNCIADO" },
  { label: "Vendido", value: "VENDIDO" },
  { label: "Desativado", value: "DESATIVADO" },
];

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
  imageUrl?: string | null;
};

export default function Products() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ProductStatus | "TODOS">("TODOS");
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (q) params.search = q;
      if (status !== "TODOS") params.status = status;
      const { data } = await api.get("/products", { params });
      const raw = data.items ?? data;
      setItems(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        raw.map((p: any) => ({
          ...p,
          price: 
            typeof p.price === "string"
              ? Math.round(parseFloat(p.price) * 100)
              : p.price,
          categoryName: p.category?.name ?? p.category ?? "",
        }))
      );
    } catch {
      setError("Falha ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status]);

  const list = useMemo(() => items, [items]);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <AppHeader active="products" />
      <section className="mx-auto w-full max-w-none px-4 lg:px-[168px] pt-[64px] pb-10">
        <header className="mb-6">
          <h1 className="text-[24px] font-bold leading-[120%]">Seus produtos</h1>
          <p className="text-[14px] text-[#7a7a7a]">
            Acesse e gerencie a sua lista de produtos à venda
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[327px_minmax(0,1fr)] gap-x-6">
          <aside className="mb-6 lg:mb-0">
            <h2 className="text-[14px] font-semibold mb-4">Filtrar</h2>

            <div className="space-y-6">
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

              <button onClick={load} className="btn btn-primary w-full">Aplicar filtro</button>

              {loading && <p className="text-sm text-gray-600">Carregando...</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {!loading && !error && list.length === 0 && (
              <p className="text-sm text-gray-600">Nenhum produto encontrado.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
