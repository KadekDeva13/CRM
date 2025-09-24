// src/utils/campaignStorage.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export type PersistedCampaign = {
  id: string;
  name: string;
  tag: string;                  // "Email Marketing" | "Holiday Campaign" | ...
  delivery: string;             // "One-Time" | "When Check-In" | etc (bebas, untuk filter tampilan)
  status: "Active" | "Pending" | "Completed" | "Draft";
  scheduledAt?: string | null;  // ISO, kalau scheduled
  templateId?: string | null;   // id template yang dipakai
  templateSnapshot?: any;       // snapshot blok & metadata email saat disave
  createdAt: string;            // ISO
  updatedAt: string;            // ISO
};

const KEY = "campaigns";

export function loadCampaigns(): PersistedCampaign[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCampaigns(rows: PersistedCampaign[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

export function generateId(prefix = "cmp"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function nowISO() {
  return new Date().toISOString();
}

/**
 * upsert campaign:
 * - jika payload.id ada & match -> update
 * - kalau tidak -> insert (generate id kalau kosong)
 */
export function upsertCampaign(payload: Partial<PersistedCampaign>): PersistedCampaign {
  const rows = loadCampaigns();

  // cari existing
  const item: PersistedCampaign | undefined =
    payload.id ? rows.find((r) => r.id === payload.id) : undefined;

  const base: PersistedCampaign = {
    id: payload.id || generateId(),
    name: payload.name || "Untitled Campaign",
    tag: payload.tag || "Other",
    delivery: payload.delivery || "One-Time",
    status: (payload.status as any) || "Draft",
    scheduledAt: payload.scheduledAt ?? null,
    templateId: payload.templateId ?? null,
    templateSnapshot: payload.templateSnapshot ?? null,
    createdAt: payload.createdAt || nowISO(),
    updatedAt: nowISO(),
  };

  const merged: PersistedCampaign = item ? { ...item, ...base, updatedAt: nowISO() } : base;

  if (item) {
    const idx = rows.findIndex((r) => r.id === item!.id);
    rows[idx] = merged;
  } else {
    rows.push(merged);
  }

  saveCampaigns(rows);
  return merged;
}
