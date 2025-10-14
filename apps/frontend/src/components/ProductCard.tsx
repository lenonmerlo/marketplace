import BadgeStatus from "./BadgeStatus";
import { formatBRL } from "../utils/formatBRL";


type ProductStatus = "ANUNCIADO" | "VENDIDO" | "DESATIVADO";

export type Product = {
  id: string;
  title: string;
  price: number; 
  description: string;
  imageUrl?: string | null;
  status: ProductStatus;
  isMobile?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const img = product.imageUrl || "https://placehold.co/640x360?text=Produto";

  return (
    <article className="rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="relative">
        <img src={img} alt={product.title} className="w-full h-[144px] object-cover" />
        <div className="absolute right-3 top-3 flex gap-2">
          <BadgeStatus status={product.status} />
          {product.isMobile && (
            <span className="inline-flex items-center rounded-full px-2.5 py-[2px] text-[10px] font-semibold leading-none bg-[#534c4c]/80 text-white">
              MÓVEL
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <header className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{product.title}</h3>
          <span className="text-sm font-semibold">{formatBRL(product.price)}</span>
        </header>
        <p className="mt-2 text-[13px] text-[#6b7280] line-clamp-2">{product.description}</p>
      </div>
    </article>
  );
}
