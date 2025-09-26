/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const fmtDateTime = (iso: string, _p0: string) => {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { weekday: "short" });
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yy = String(d.getFullYear()).slice(-2);
  let hh = d.getHours(); const m = String(d.getMinutes()).padStart(2,"0");
  const pm = hh >= 12 ? "PM" : "AM"; hh = ((hh+11)%12)+1;
  return `${day}, ${dd}-${mm}-${yy} ${String(hh).padStart(2,"0")}.${m} ${pm}`;
};

export const paginate = <T,>(arr: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  return { data: arr.slice(start, start + perPage), total: arr.length };
};

export const fmtNum = (n: number) => n.toLocaleString("en-US");

export const fmtPct = (v: number, digits = 1) =>
  `${(v * 100).toFixed(digits)}%`;

