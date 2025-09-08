import React, { useEffect, useState } from "react";
import Button from "../UI/button";
import type { Contact } from "../../api/contact.mock";

type Props = {
  initialValue?: Partial<Contact>;
  submitting?: boolean;
  onCancel: () => void;
  onSubmit: (payload: Partial<Contact>) => void;
};

export default function ContactForm({
  initialValue,
  submitting,
  onCancel,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Partial<Contact>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    job_title: "",
    status: "Lead",     
    tags: [],
  });

  useEffect(() => {
    if (initialValue) setForm((f) => ({ ...f, ...initialValue }));
  }, [initialValue]);

  const set = (k: keyof Contact, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v as never }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="First name"
          value={form.first_name ?? ""}
          onChange={(e) => set("first_name", e.target.value)}
        />
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="Last name"
          value={form.last_name ?? ""}
          onChange={(e) => set("last_name", e.target.value)}
        />
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="Email"
          value={form.email ?? ""}
          onChange={(e) => set("email", e.target.value)}
        />
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="Phone"
          value={form.phone ?? ""}
          onChange={(e) => set("phone", e.target.value)}
        />
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="Company"
          value={form.company ?? ""}
          onChange={(e) => set("company", e.target.value)}
        />
        <input
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white"
          placeholder="Job title"
          value={form.job_title ?? ""}
          onChange={(e) => set("job_title", e.target.value)}
        />
        <select
          className="rounded-lg bg-gray-900 ring-1 ring-white/10 px-3 py-2 text-white/50"
          value={form.status ?? "Lead"}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="Lead">Lead</option>
          <option value="Prospect">Prospect</option>
          <option value="Customer">Customer</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
