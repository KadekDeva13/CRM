export const fmtMoney = (n: number, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);

export const fmtDate = (iso: string, locale = "en-US") =>
  new Date(iso).toLocaleDateString(locale, { month: "short", day: "2-digit", year: "numeric" });
