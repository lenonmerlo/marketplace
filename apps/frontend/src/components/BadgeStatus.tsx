type Props = {
  status: "ANUNCIADO" | "VENDIDO" | "DESATIVADO";
  className?: string;
};

export default function BadgeStatus({ status, className = "" }: Props) {
  const tone = {
    ANUNCIADO: "bg-[var(--color-blue-dark)]",
    VENDIDO: "bg-[var(--color-success)]",
    DESATIVADO: "bg-[#6b6b6b]",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-[2px] text-[10px] font-semibold leading-none text-white ${tone[status]} ${className}`}
    >
      {status}
    </span>
  );
}
