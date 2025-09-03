import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Field, inputCls } from "../../components/UI/field";
import Button from "../../components/UI/button";
import type { Contract, ContractStatus } from "../../api/contract.mock";

const STATUSES = [
  "Draft",
  "Sent",
  "Under Review",
  "Signed",
  "Declined",
  "Expired",
  "Prospect",
] as const;

const CURRENCIES = ["IDR", "USD"] as const;

type Props = {
  initialValue?: Partial<Contract>;
  onSubmit: (payload: Partial<Contract>) => Promise<void> | void;
  onCancel: () => void;
  submitting?: boolean;
};

type FormState = {
  number: string;
  title: string;
  counterparty: string;
  value: string;
  currency: (typeof CURRENCIES)[number] | string;
  status: ContractStatus;
  effective_date: string;
  end_date: string;
  auto_renew: boolean;
  notice_period_days: string;
  owner_name: string;
  tags: string;
  description: string;
};

export default function ContractForm({
  initialValue,
  onSubmit,
  onCancel,
  submitting,
}: Props): React.ReactElement {
  const [form, setForm] = useState<FormState>({
    number: initialValue?.number || "",
    title: initialValue?.title || "",
    counterparty: initialValue?.counterparty || "",
    value: initialValue?.value !== undefined ? String(initialValue.value) : "0",
    currency: (initialValue?.currency as FormState["currency"]) || "IDR",
    status: (initialValue?.status as ContractStatus) || "Draft",
    effective_date: initialValue?.effective_date || "",
    end_date: initialValue?.end_date || "",
    auto_renew: Boolean(initialValue?.auto_renew),
    notice_period_days:
      initialValue?.notice_period_days !== undefined
        ? String(initialValue.notice_period_days)
        : "30",
    owner_name: initialValue?.owner_name || "",
    tags: (initialValue?.tags || []).join(", "),
    description: initialValue?.description || "",
  });

  useEffect(() => {
    if (!initialValue) return;
    setForm((f) => ({
      ...f,
      number: initialValue.number ?? "",
      title: initialValue.title ?? "",
      counterparty: initialValue.counterparty ?? "",
      value:
        initialValue.value !== undefined ? String(initialValue.value) : f.value,
      currency: (initialValue.currency as FormState["currency"]) ?? f.currency,
      status: (initialValue.status as ContractStatus) ?? f.status,
      effective_date: initialValue.effective_date ?? "",
      end_date: initialValue.end_date ?? "",
      auto_renew:
        initialValue.auto_renew !== undefined
          ? Boolean(initialValue.auto_renew)
          : f.auto_renew,
      notice_period_days:
        initialValue.notice_period_days !== undefined
          ? String(initialValue.notice_period_days)
          : f.notice_period_days,
      owner_name: initialValue.owner_name ?? "",
      tags: Array.isArray(initialValue.tags)
        ? initialValue.tags.join(", ")
        : f.tags,
      description: initialValue.description ?? "",
    }));
  }, [initialValue]);

  const change: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const t = e.currentTarget;
    const name = t.name as keyof FormState;

    const isCheckbox =
      (t as HTMLInputElement).type === "checkbox" && "checked" in t;

    const next = isCheckbox ? (t as HTMLInputElement).checked : t.value;

    setForm((prev) => ({ ...prev, [name]: next as never }));
  };

  const submit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title wajib diisi");
    if (!form.counterparty.trim())
      return toast.error("Counterparty wajib diisi");

    const valueNum = Number(form.value);
    if (Number.isNaN(valueNum) || valueNum < 0)
      return toast.error("Value tidak boleh negatif");

    if (
      form.effective_date &&
      form.end_date &&
      new Date(form.effective_date) > new Date(form.end_date)
    ) {
      return toast.error("End date harus >= Effective date");
    }

    const payload: Partial<Contract> = {
      number: form.number.trim(),
      title: form.title.trim(),
      counterparty: form.counterparty.trim(),
      value: valueNum,
      currency: form.currency,
      status: form.status,
      effective_date: form.effective_date,
      end_date: form.end_date,
      auto_renew: form.auto_renew,
      notice_period_days: Number(form.notice_period_days || "0"),
      owner_name: form.owner_name.trim() || "Unassigned",
      tags: String(form.tags || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Contract Number (optional)">
          <input
            name="number"
            className={inputCls}
            value={form.number}
            onChange={change}
            placeholder="Auto-generate if empty"
          />
        </Field>
        <Field label="Title">
          <input
            name="title"
            className={inputCls}
            value={form.title}
            onChange={change}
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Counterparty">
          <input
            name="counterparty"
            className={inputCls}
            value={form.counterparty}
            onChange={change}
            required
          />
        </Field>
        <Field label="Owner">
          <input
            name="owner_name"
            className={inputCls}
            value={form.owner_name}
            onChange={change}
            placeholder="Unassigned"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Value">
          <input
            name="value"
            type="number"
            min="0"
            step="1"
            className={inputCls}
            value={form.value}
            onChange={change}
          />
        </Field>
        <Field label="Currency">
          <select
            name="currency"
            className={inputCls}
            value={form.currency}
            onChange={change}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            name="status"
            className={inputCls}
            value={form.status}
            onChange={change}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Effective Date">
          <input
            name="effective_date"
            type="date"
            className={inputCls}
            value={form.effective_date}
            onChange={change}
          />
        </Field>
        <Field label="End Date">
          <input
            name="end_date"
            type="date"
            className={inputCls}
            value={form.end_date}
            onChange={change}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Auto Renew">
          <div className="h-10 flex items-center">
            <input
              name="auto_renew"
              type="checkbox"
              checked={form.auto_renew}
              onChange={change}
            />
            <span className="ml-3 text-white/80 text-sm">Enable</span>
          </div>
        </Field>
        <Field label="Notice Period (days)">
          <input
            name="notice_period_days"
            type="number"
            min="0"
            className={inputCls}
            value={form.notice_period_days}
            onChange={change}
          />
        </Field>
        <Field label="Tags (comma separated)">
          <input
            name="tags"
            className={inputCls}
            value={form.tags}
            onChange={change}
            placeholder="priority, renewal"
          />
        </Field>
      </div>

      <Field label="Description / Scope">
        <textarea
          name="description"
          className={inputCls}
          rows={3}
          value={form.description}
          onChange={change}
        />
      </Field>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
