import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/UI/button";
import ContactForm from "../../components/Contacts/ContactForm";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  type Contact,
  type GetContactsParams,
  type PaginatedResponse,
} from "../../api/contact.mock";

export default function ContactsPage(): React.ReactElement {
  const [params, setParams] = useState<GetContactsParams>({
    search: "",
    page: 1,
    perPage: 8,
    sort: "updated_at:desc",
  });

  const [rows, setRows] = useState<Contact[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Contact>["meta"]>({
    total: 0,
    page: 1,
    perPage: params.perPage ?? 8,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await getContacts(params);
      setRows(res.data);
      setMeta(res.meta);
    } catch {
      toast.error("Gagal memuat contacts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  const onCreate = async (payload: Partial<Contact>) => {
    setSubmitting(true);
    try {
      await createContact(payload);
      toast.success("Contact created");
      setOpenForm(false);
      await fetchData();
    } catch {
      toast.error("Gagal membuat contact");
    } finally {
      setSubmitting(false);
    }
  };

  const onUpdate = async (payload: Partial<Contact>) => {
    if (!editing?.id) return;
    setSubmitting(true);
    try {
      await updateContact(editing.id, payload);
      toast.success("Contact updated");
      setEditing(null);
      setOpenForm(false);
      await fetchData();
    } catch {
      toast.error("Gagal mengubah contact");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (row: Contact) => {
    if (!window.confirm(`Hapus ${row.first_name} ${row.last_name ?? ""}?`)) return;
    try {
      await deleteContact(row.id);
      toast.success("Contact deleted");
      await fetchData();
    } catch {
      toast.error("Gagal menghapus contact");
    }
  };

  const nextPage = () =>
    setParams((p) => ({ ...p, page: Math.min((p.page ?? 1) + 1, meta.totalPages) }));
  const prevPage = () =>
    setParams((p) => ({ ...p, page: Math.max((p.page ?? 1) - 1, 1) }));

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Contacts</h1>
        <div className="flex items-center gap-2">
          <input
            className="rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2 text-white placeholder-white/60"
            placeholder="Search name, email, company…"
            value={params.search ?? ""}
            onChange={(e) =>
              setParams((p) => ({ ...p, search: e.target.value, page: 1 }))
            }
          />
          <Button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
          >
            + New Contact
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 overflow-hidden">
        <table className="min-w-full text-sm text-white/90">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/60">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/60">
                  No contacts yet
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-white/10">
                  <td className="px-4 py-2">
                    {row.first_name} {row.last_name}
                  </td>
                  <td className="px-4 py-2">{row.company || "-"}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.phone || "-"}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 ring-1 ring-white/10">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="px-2 py-1 rounded hover:bg-white/10"
                      onClick={() => {
                        setEditing(row);
                        setOpenForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-2 py-1 rounded hover:bg-white/10 text-red-300"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-white/70">
        <div>
          Page {meta.page} / {meta.totalPages} — {meta.total} contacts
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={prevPage} disabled={(params.page ?? 1) <= 1}>
            Prev
          </Button>
          <Button
            variant="ghost"
            onClick={nextPage}
            disabled={(params.page ?? 1) >= meta.totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur">
          <div className="w-full max-w-lg rounded-xl bg-neutral-900 ring-1 ring-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg">
                {editing ? "Edit Contact" : "New Contact"}
              </h3>
              <button
                className="text-white/70 hover:text-white"
                onClick={() => {
                  setEditing(null);
                  setOpenForm(false);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <ContactForm
              initialValue={editing ?? undefined}
              submitting={submitting}
              onCancel={() => {
                setEditing(null);
                setOpenForm(false);
              }}
              onSubmit={editing ? onUpdate : onCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
