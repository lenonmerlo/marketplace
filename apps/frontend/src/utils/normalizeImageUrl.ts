const API_BASE = import.meta.env.VITE_API_BASE_URL; 
const API_ORIGIN = API_BASE?.replace(/\/api\/?$/, "") || "";

export function normalizeImageUrl(u?: string | null): string | null {
  if (!u) return null;
  const url = u.trim();
 
  if (/^https?:\/\//i.test(url)) return url;

  if (url.startsWith("/uploads/")) return `${API_ORIGIN}${url}`;

  return null;
}
