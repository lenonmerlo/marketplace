
import type { Product } from "../data/products";
import { formatBRL } from "../utils/formatBRL";
import { normalizeImageUrl } from "../utils/normalizeImageUrl";
import BadgeStatus from "./BadgeStatus";

export default function ProductCard({ product }: { product: Product }) {
  const normalized = normalizeImageUrl(product.imageUrl);
  const img =
    normalized && normalized.length > 0
      ? normalized
      : "https://placehold.co/640x360?text=Produto";

 return (
    <article className="rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="relative">
        <img
          src={img}
          alt={product.title}
          className="w-full h-[144px] object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <BadgeStatus status={product.status} />
          {product.isMobile && (
            <span className="inline-flex items-center rounded-full px-2.5 py-[2px] text-[10px] font-semibold leading-none bg-[#534c4c]/80 text-white ">
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
        <p className="mt-2 text-[13px] text-[#6b7280] line-clamp-2">
          {product.description}
        </p>
      </div>
    </article>
  );
}