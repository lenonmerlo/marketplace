export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")      // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")          // troca não-alfanum por hífen
    .replace(/^-+|-+$/g, "");             // trim
}
