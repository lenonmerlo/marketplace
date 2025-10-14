const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatBRL(cents: number | null | undefined) {
    if (cents == null || Number.isNaN(cents as number)) return brl.format(0);
    return brl.format((cents as number) / 100);
}