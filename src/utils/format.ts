export const fmtMoney = (n: number, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);

export const fmtDate = (iso: string, locale = "en-US") =>
  new Date(iso).toLocaleDateString(locale, { month: "short", day: "2-digit", year: "numeric" });

export function fmtDateReviews(input: string | number | Date): string {
  const d = new Date(input);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}