
import BadgeStatus from "./BadgeStatus";

type Props = {
  title: string;
  price: number;
  description: string;
  imageUrl?: string; // pode vir vazio/null do back
  status: "ANUNCIADO" | "VENDIDO" | "DESATIVADO";
  categoryLabel?: string;
};

export default function ProductCard({
  title,
  price,
  description,
  imageUrl,
  status,
  categoryLabel,
}: Props) {

  const src =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "https://placehold.co/640x360?text=Produto";

  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex gap-2">
          <BadgeStatus status={status} />
          {categoryLabel && (
            <span className="badge bg-[var(--color-gray-500)] text-white opacity-80">
              {categoryLabel}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-gray-500)]">
            {title}
          </h3>
          <span className="font-semibold">
            R${" "}
            {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--color-gray-300)] line-clamp-2">
          {description}
        </p>
      </div>
    </article>
  );
}
