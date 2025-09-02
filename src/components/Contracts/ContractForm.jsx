import { useState } from "react";
import toast from "react-hot-toast";
import { Field, inputCls } from "../../components/UI/field";
import Button from "../../components/UI/button";

const STATUSES = ["Draft", "Sent", "Under Review", "Signed", "Declined", "Expired", "Prospect"];
const CURRENCIES = ["IDR", "USD"];

export default function ContractForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    number:               initialValue?.number || "",
    title:                initialValue?.title || "",
    counterparty:         initialValue?.counterparty || "",
    value:                initialValue?.value ?? 0,
    currency:             initialValue?.currency || "IDR",
    status:               initialValue?.status || "Draft",
    effective_date:       initialValue?.effective_date || "",
    end_date:             initialValue?.end_date || "",
    auto_renew:           initialValue?.auto_renew || false,
    notice_period_days:   initialValue?.notice_period_days ?? 30,
    owner_name:           initialValue?.owner_name || "",
    tags:                 (initialValue?.tags || []).join(", "),
    description:          initialValue?.description || "",
  });

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title wajib diisi");
    if (!form.counterparty.trim()) return toast.error("Counterparty wajib diisi");
    if (Number(form.value) < 0) return toast.error("Value tidak boleh negatif");
    if (form.effective_date && form.end_date && new Date(form.effective_date) > new Date(form.end_date)) {
      return toast.error("End date harus >= Effective date");
    }
    const payload = {
      ...form,
      value: Number(form.value),
      notice_period_days: Number(form.notice_period_days || 0),
      tags: String(form.tags || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Contract Number (optional)">
          <input name="number" className={inputCls} value={form.number} onChange={change} placeholder="Auto-generate if empty" />
        </Field>
        <Field label="Title">
          <input name="title" className={inputCls} value={form.title} onChange={change} required />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Counterparty">
          <input name="counterparty" className={inputCls} value={form.counterparty} onChange={change} required />
        </Field>
        <Field label="Owner">
          <input name="owner_name" className={inputCls} value={form.owner_name} onChange={change} placeholder="Unassigned" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Value">
          <input name="value" type="number" min="0" step="1" className={inputCls} value={form.value} onChange={change} />
        </Field>
        <Field label="Currency">
          <select name="currency" className={inputCls} value={form.currency} onChange={change}>
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select name="status" className={inputCls} value={form.status} onChange={change}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Effective Date">
          <input name="effective_date" type="date" className={inputCls} value={form.effective_date} onChange={change} />
        </Field>
        <Field label="End Date">
          <input name="end_date" type="date" className={inputCls} value={form.end_date} onChange={change} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Auto Renew">
          <div className="h-10 flex items-center">
            <input name="auto_renew" type="checkbox" checked={form.auto_renew} onChange={change} />
            <span className="ml-3 text-white/80 text-sm">Enable</span>
          </div>
        </Field>
        <Field label="Notice Period (days)">
          <input name="notice_period_days" type="number" min="0" className={inputCls} value={form.notice_period_days} onChange={change} />
        </Field>
        <Field label="Tags (comma separated)">
          <input name="tags" className={inputCls} value={form.tags} onChange={change} placeholder="priority, renewal" />
        </Field>
      </div>

      <Field label="Description / Scope">
        <textarea name="description" className={inputCls} rows={3} value={form.description} onChange={change} />
      </Field>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
