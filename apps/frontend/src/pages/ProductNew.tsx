// apps/frontend/src/pages/ProductNew.tsx
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import PageTitleBar from "../components/PageTitleBar";
import ProductForm from "../components/ProductForm";

export default function ProductNew() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <AppHeader active="products" />
      <section className="mx-auto w-full px-4 lg:px-[168px] pt-[64px] pb-10">
        <PageTitleBar title="Novo produto" onBack={() => navigate(-1)} />
        <div className="mt-6 rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
          <ProductForm onSuccess={() => navigate("/products")} />
        </div>
      </section>
    </main>
  );
}
