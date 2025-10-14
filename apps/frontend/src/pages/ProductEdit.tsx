import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import PageTitleBar from "../components/PageTitleBar";
import ProductForm, { type ProductFormValues } from "../components/ProductForm";
import Sofa from "../assets/product-sofa.png";

export default function ProductEdit() {
  const nav = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSubmit(_values: ProductFormValues) {
    alert("Produto atualizado (mock) ✅");
    nav("/products");
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <AppHeader active="products" />
      <section className="mx-auto w-full max-w-none px-4 lg:px-[168px] pt-[64px] pb-12">
        <PageTitleBar backTo="/products" title="Editar produto" subtitle="Gerencie as informações do produto cadastrado" />
        <ProductForm
          initial={{
            title: "Sofá",
            description: "Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.",
            price: "1200,90",
            category: "Móvel",
            imageUrl: Sofa,
          }}
          submitLabel="Salvar e atualizar"
          onCancel={() => nav("/products")}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}
