const STORAGE_KEY = "crm_contracts_v1";

function now() { return new Date().toISOString(); }
function uid() { return "ct_" + Math.random().toString(36).slice(2, 9); }

function pad(n, l = 4) { return String(n).padStart(l, "0"); }
function genNumber(seq) {
  const y = new Date().getFullYear();
  return `CTR-${y}-${pad(seq)}`;
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = makeSeed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try { return JSON.parse(raw) || []; } catch { return []; }
}
function save(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

function makeSeed() {
  const base = [
    { title: "Maintenance Service Agreement", counterparty: "PT Nusantara Teknik", value: 120_000_000, currency: "IDR", status: "Signed",       effective_date: "2025-07-01", end_date: "2026-06-30", owner_name: "Ayu",   tags: ["priority"], description: "Kontrak perawatan tahunan." },
    { title: "Software License Renewal",      counterparty: "Acme Software Ltd",    value: 8_500,       currency: "USD", status: "Under Review", effective_date: "2025-09-10", end_date: "2026-09-09", owner_name: "Budi",  tags: ["renewal"],  description: "Renewal 100 seats." },
    { title: "Distribution Agreement",        counterparty: "PT Sinar Jaya",        value: 350_000_000, currency: "IDR", status: "Draft",        effective_date: "2025-10-01", end_date: "2026-09-30", owner_name: "Citra", tags: [],           description: "Perjanjian distribusi wilayah Jawa." },
    { title: "NDA with Beta Corp",            counterparty: "Beta Corp",            value: 0,           currency: "USD", status: "Signed",       effective_date: "2025-08-01", end_date: "2027-07-31", owner_name: "Dedi",  tags: ["legal"],    description: "Mutual NDA." },
    { title: "Marketing Services",            counterparty: "Gamma IO",             value: 55_000_000,  currency: "IDR", status: "Sent",          effective_date: "2025-09-05", end_date: "2026-03-04", owner_name: "Eka",   tags: ["campaign"], description: "Jasa campaign Q4." },
    { title: "Cloud Hosting",                 counterparty: "Cloudy Pte Ltd",       value: 18_200,      currency: "USD", status: "Declined",      effective_date: "2025-06-01", end_date: "2026-05-31", owner_name: "Fajar", tags: [],           description: "Hosting 12 bulan." },
    { title: "Equipment Lease",               counterparty: "PT Mitra Alat",        value: 210_000_000, currency: "IDR", status: "Expired",       effective_date: "2024-07-01", end_date: "2025-06-30", owner_name: "Gina",  tags: ["ops"],      description: "Sewa alat produksi." },
    { title: "Support Retainer",              counterparty: "Delta IO",             value: 95_000_000,  currency: "IDR", status: "Prospect",      effective_date: "2025-09-15", end_date: "2026-09-14", owner_name: "Hadi",  tags: ["support"],  description: "Retainer bulanan." },
  ];
  return base.map((b, i) => ({
    id: uid(),
    number: genNumber(i + 1),
    ...b,
    notice_period_days: 30,
    auto_renew: false,
    created_at: now(),
    updated_at: now(),
  }));
}

const sleep = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function getContracts({ search = "", page = 1, perPage = 10, sort = "updated_at:desc", status, owner, tags = [] } = {}) {
  await sleep(250);
  let rows = load();

  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(r =>
      [r.number, r.title, r.counterparty, r.owner_name]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    );
  }
  if (status) rows = rows.filter(r => r.status === status);
  if (owner) rows = rows.filter(r => r.owner_name === owner);
  if (tags?.length) rows = rows.filter(r => (r.tags || []).some(t => tags.includes(t)));

  const [field = "updated_at", dir = "desc"] = String(sort).split(":");
  rows.sort((a, b) => {
    const va = a[field], vb = b[field];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });

  const total = rows.length;
  const start = (page - 1) * perPage;
  const data = rows.slice(start, start + perPage);

  return { data, meta: { total, page, perPage, totalPages: Math.ceil(total / perPage) } };
}

export async function createContract(payload) {
  await sleep(300);
  const list = load();
  const seq = list.length + 1;

  const row = {
    id: uid(),
    number: payload.number?.trim() || genNumber(seq),
    title: String(payload.title || "").trim(),
    counterparty: String(payload.counterparty || "").trim(),
    value: Number(payload.value || 0),
    currency: payload.currency || "IDR",
    status: payload.status || "Draft",
    effective_date: payload.effective_date || "",
    end_date: payload.end_date || "",
    auto_renew: !!payload.auto_renew,
    notice_period_days: Number(payload.notice_period_days || 30),
    owner_name: payload.owner_name?.trim() || "Unassigned",
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    description: payload.description || "",
    created_at: now(),
    updated_at: now(),
  };

  list.unshift(row);
  save(list);
  return row;
}

export async function updateContract(id, payload) {
  await sleep(300);
  const list = load();
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) throw new Error("Contract not found");

  const cur = list[idx];
  const next = {
    ...cur,
    ...payload,
    value: payload.value != null ? Number(payload.value) : cur.value,
    notice_period_days: payload.notice_period_days != null ? Number(payload.notice_period_days) : cur.notice_period_days,
    updated_at: now(),
  };

  list[idx] = next;
  save(list);
  return next;
}

export async function deleteContract(id) {
  await sleep(250);
  const next = load().filter(r => r.id !== id);
  save(next);
  return { ok: true };
}
