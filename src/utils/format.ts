export const fmtMoney = (n: number, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);

function toDate(input: string | number | Date): Date {
  const d = input instanceof Date ? input : new Date(input);
  return d;
}

function isValid(d: Date) {
  return !Number.isNaN(d.getTime());
}

export const fmtDate = (
  input: string | number | Date,
  locale = "en-US"
): string => {
  const d = toDate(input);
  if (!isValid(d)) return "";
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export function fmtDateReviews(input: string | number | Date): string {
  const d = toDate(input);
  if (!isValid(d)) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const fmtDateTime = (
  input: string | number | Date,
  locale = "en-US"
): string => {
  const d = toDate(input);
  if (!isValid(d)) return "";
  return d.toLocaleString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
