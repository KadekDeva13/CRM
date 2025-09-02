import { useState } from "react";
import { Field, inputCls } from "../../components/UI/field";
import Button from "../../components/UI/button";
import toast from "react-hot-toast";

const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactForm({ initialValue, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    first_name: initialValue?.first_name || "",
    last_name:  initialValue?.last_name || "",
    email:      initialValue?.email || "",
    phone:      initialValue?.phone || "",
    company:    initialValue?.company || "",
    job_title:  initialValue?.job_title || "",
    status:     initialValue?.status || "Lead",
    tags:       initialValue?.tags?.join(", ") || "", 
  });

  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name.trim()) return toast.error("First name wajib diisi");
    if (!emailOK(form.email)) return toast.error("Email tidak valid");

    const payload = {
      ...form,
      tags: form.tags.split(",").map(s => s.trim()).filter(Boolean),
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name">
          <input name="first_name" className={inputCls} value={form.first_name} onChange={change} required />
        </Field>
        <Field label="Last Name">
          <input name="last_name" className={inputCls} value={form.last_name} onChange={change} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email">
          <input name="email" type="email" className={inputCls} value={form.email} onChange={change} required />
        </Field>
        <Field label="Phone">
          <input name="phone" className={inputCls} value={form.phone} onChange={change} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company">
          <input name="company" className={inputCls} value={form.company} onChange={change} />
        </Field>
        <Field label="Job Title">
          <input name="job_title" className={inputCls} value={form.job_title} onChange={change} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Status">
          <select name="status" className={inputCls} value={form.status} onChange={change}>
            <option>Lead</option>
            <option>Prospect</option>
            <option>Customer</option>
            <option>Inactive</option>
          </select>
        </Field>
        <Field label="Tags (comma separated)">
          <input name="tags" className={inputCls} value={form.tags} onChange={change} placeholder="priority, bali" />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
