import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import PageTitleBar from "../components/PageTitleBar";
import ProductForm, { type ProductFormValues } from "../components/ProductForm";

export default function ProductNew() {
  const nav = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSubmit(_values: ProductFormValues) {
    // TODO: integrar com backend (FormData)
    alert("Produto cadastrado (mock) ✅");
    nav("/products");
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <AppHeader active="products" showNewButton={false} />
      <section className="mx-auto w-full max-w-none px-4 lg:px-[168px] pt-[64px] pb-12">
        <PageTitleBar backTo="/products" title="Novo produto" subtitle="Preencha as informações para cadastrar" />
        <ProductForm onSubmit={handleSubmit} onCancel={() => nav("/products")} submitLabel="Salvar e publicar" />
      </section>
    </main>
  );
}
