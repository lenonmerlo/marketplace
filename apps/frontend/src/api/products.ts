import { api } from "./client";

export type ProductStatus = "ANUNCIADO" | "VENDIDO" | "DESATIVADO";

export type ListParams = { search?: string; status?: ProductStatus | "TODOS" };

function normalizePriceToCents(price: unknown): number {
  if (typeof price === "number") {
    // pode ser cents ou decimal; se for inteiro grande, assuma que já é cents
    return price % 1 === 0 && price > 1000 ? price : Math.round(price * 100);
  }
  if (typeof price === "string") {
    const v = parseFloat(price.replace(",", "."));
    return Math.round(v * 100);
  }
  return 0;
}

export async function listProducts(params: ListParams = {}) {
  const { data } = await api.get("/products", { params });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr = (data.items ?? data) as any[];
  return arr.map((p) => ({
    ...p,
    price: normalizePriceToCents(p.price),
  }));
}

export async function listCategories() {
  const { data } = await api.get("/categories");
  return (data.items ?? data) as Array<{ id: string; name: string }>;
}

export async function createProduct(payload: {
  title: string;
  description: string;
  priceCents: number;
  categoryId: string;
  imageFile?: File | null;
}) {
  const fd = new FormData();
  fd.append("title", payload.title);
  fd.append("description", payload.description);
  // back espera DECIMAL com ponto, não cents:
  fd.append("price", String(payload.priceCents / 100).replace(",", "."));
  fd.append("categoryId", payload.categoryId);
  if (payload.imageFile) fd.append("image", payload.imageFile);
  const { data } = await api.post("/products", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateProduct(
  id: string,
  payload: {
    title?: string;
    description?: string;
    priceCents?: number;
    categoryId?: string;
    imageFile?: File | null;
    imageUrl?: string | null;
  }
) {
  const fd = new FormData();
  if (payload.title != null) fd.append("title", payload.title);
  if (payload.description != null) fd.append("description", payload.description);
  if (payload.priceCents != null)
    fd.append("price", String(payload.priceCents / 100).replace(",", "."));
  if (payload.categoryId != null) fd.append("categoryId", payload.categoryId);
  if (payload.imageFile) fd.append("image", payload.imageFile);
  if (payload.imageUrl != null) fd.append("imageUrl", payload.imageUrl);
  const { data } = await api.put(`/products/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
