const STORAGE_KEY = "crm_contacts_v1";

function now(): string {
  return new Date().toISOString();
}

function uid(): string {
  return "c_" + Math.random().toString(36).slice(2, 9);
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  status: "Lead" | "Prospect" | "Customer" | "Inactive" | string;
  tags: string[];
  created_at: string; 
  updated_at: string;
}

export interface GetContactsParams {
  search?: string;
  page?: number;
  perPage?: number;
  sort?: string;
  status?: string;
  tags?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

const seed: Contact[] = [
  { id: "c_1", first_name: "Ayu",   last_name: "Saraswati", email: "ayu@bali.co",   phone: "081234567890", company: "Bali Co",   job_title: "Sales",    status: "Lead",     tags: ["bali"],      created_at: now(), updated_at: now() },
  { id: "c_2", first_name: "Budi",  last_name: "Santoso",   email: "budi@alpha.id", phone: "081234001122", company: "Alpha ID", job_title: "Manager",  status: "Prospect",  tags: ["java"],      created_at: now(), updated_at: now() },
  { id: "c_3", first_name: "Citra", last_name: "Utami",     email: "citra@beta.id", phone: "081355667788", company: "Beta ID",  job_title: "Founder",  status: "Customer",  tags: ["priority"],  created_at: now(), updated_at: now() },
  { id: "c_4", first_name: "Dedi",  last_name: "Hartono",   email: "dedi@gamma.io", phone: "081299887766", company: "Gamma IO", job_title: "CTO",      status: "Inactive",  tags: [],            created_at: now(), updated_at: now() },
  { id: "c_5", first_name: "Eka",   last_name: "Wijaya",    email: "eka@delta.io",  phone: "081212345678", company: "Delta IO", job_title: "Analyst",  status: "Lead",     tags: ["new"],       created_at: now(), updated_at: now() },
  { id: "c_6", first_name: "Fajar", last_name: "Permadi",   email: "fajar@acme.id", phone: "081377712345", company: "ACME",     job_title: "BD",       status: "Prospect",  tags: ["hot"],       created_at: now(), updated_at: now() },
];

function load(): Contact[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return [...seed];
  }
  try {
    return (JSON.parse(raw) as Contact[]) || [];
  } catch {
    return [];
  }
}

function save(list: Contact[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const sleep = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function getContacts(params: GetContactsParams = {}): Promise<PaginatedResponse<Contact>> {
  const { search = "", page = 1, perPage = 10, sort = "updated_at:desc", status, tags = [] } = params;

  await sleep();
  let rows = load();

  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(r =>
      [r.first_name, r.last_name, r.email, r.company, r.phone]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
    );
  }

  if (status) rows = rows.filter(r => r.status === status);
  if (tags.length) rows = rows.filter(r => (r.tags || []).some(t => tags.includes(t)));

  const [field = "updated_at", dir = "desc"] = String(sort).split(":") as [keyof Contact, string];
  rows.sort((a, b) => {
    const va = a[field];
    const vb = b[field];
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

export async function createContact(payload: Partial<Contact>): Promise<Contact> {
  await sleep(300);
  const list = load();
  const row: Contact = {
    id: uid(),
    first_name: payload.first_name?.trim() || "",
    last_name: payload.last_name?.trim() || "",
    email: payload.email?.trim() || "",
    phone: payload.phone?.trim() || "",
    company: payload.company?.trim() || "",
    job_title: payload.job_title?.trim() || "",
    status: payload.status || "Lead",
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    created_at: now(),
    updated_at: now(),
  };
  list.unshift(row);
  save(list);
  return row;
}

export async function updateContact(id: string, payload: Partial<Contact>): Promise<Contact> {
  await sleep(300);
  const list = load();
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) throw new Error("Contact not found");
  const cur = list[idx];
  const next: Contact = { ...cur, ...payload, updated_at: now() };
  list[idx] = next;
  save(list);
  return next;
}

export async function deleteContact(id: string): Promise<{ ok: boolean }> {
  await sleep(250);
  const list = load().filter(r => r.id !== id);
  save(list);
  return { ok: true };
}
