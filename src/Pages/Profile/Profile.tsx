import React, { useEffect, useMemo, useRef, useState } from "react";
import { Field, inputCls } from "../../components/UI/field";
import Button from "../../components/UI/button";

type Profile = {
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
  avatarUrl?: string | null; 
};

type EditOrViewProps = {
  name: keyof Profile;
  value: string;
  editing: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
};

function EditOrView({
  name,
  value,
  editing,
  onChange,
  type = "text",
  placeholder = "",
}: EditOrViewProps): React.ReactElement {
  if (editing) {
    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputCls}
      />
    );
  }
  return (
    <div className="px-3 py-2.5 rounded-xl bg-white/5 text-white">
      {value || <span className="text-neutral-400">—</span>}
    </div>
  );
}

export default function ProfilePage(): React.ReactElement {
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Sales Manager",
    phone: "+62 812 3456 7890",
    company: "PT Nusantara Teknik",
    avatarUrl: "", 
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [form, setForm] = useState<Profile>(profile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(profile);
    setAvatarFile(null);
    setAvatarPreview(null);
    setPhotoError(null);
  }, [editing, profile]);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const initialLetter = useMemo(
    () => String(profile.name || "?").charAt(0).toUpperCase(),
    [profile.name]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value } as Profile));
  };

  function validateAndPreview(file: File) {
    setPhotoError(null);
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      setPhotoError("Format gambar harus PNG, JPG/JPEG, atau WEBP.");
      return;
    }

    const MAX_BYTES = 2 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      setPhotoError("Ukuran gambar maksimal 2MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(url);
  }

  const onPickFile = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    validateAndPreview(file);
  };

  const handleRemovePhoto = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setForm((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const handleSave = async () => {
    const newAvatarUrl = avatarPreview ?? form.avatarUrl ?? profile.avatarUrl ?? "";
    setProfile({ ...form, avatarUrl: newAvatarUrl });
    setEditing(false);
  };

  const displayAvatar = editing ? avatarPreview || form.avatarUrl || "" : profile.avatarUrl || "";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700 overflow-hidden">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            initialLetter
          )}

          {editing && (
            <button
              type="button"
              onClick={onPickFile}
              className="absolute inset-0 bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-sm font-medium"
              title="Ubah foto"
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.651 1.651m-1.651-1.651L9 12.999V15h2.001l7.862-7.861m-2.001-2.001l.943-.943a2.329 2.329 0 113.294 3.294l-.943.943M19 20H5a2 2 0 01-2-2V9a2 2 0 012-2h2l1-2h6l1 2h2a2 2 0 012 2v9a2 2 0 01-2 2z"
                />
              </svg>
              Ganti
            </button>
          )}
        </div>

        <div>
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          <p className="text-sm text-gray-400">{profile.role}</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={onFileChange}
        className="hidden"
      />

      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 space-y-4">
        {editing && (
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-gray-300">
              {avatarFile
                ? `File: ${avatarFile.name} (${Math.round(avatarFile.size / 1024)} KB)`
                : "Klik foto untuk mengganti gambar (PNG/JPG/WEBP, maks 2MB)."}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={onPickFile}
                className="px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                Pilih Foto
              </Button>
              {(avatarFile || displayAvatar) && (
                <Button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                >
                  Hapus Foto
                </Button>
              )}
            </div>
          </div>
        )}
        {photoError && (
          <p className="text-sm text-red-400 -mt-2">{photoError}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" htmlFor="name">
            <EditOrView
              name="name"
              value={form.name}
              editing={editing}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <EditOrView
              name="email"
              type="email"
              value={form.email}
              editing={editing}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </Field>

          <Field label="Phone" htmlFor="phone">
            <EditOrView
              name="phone"
              type="tel"
              value={form.phone}
              editing={editing}
              onChange={handleChange}
              placeholder="+62 ..."
            />
          </Field>

          <Field label="Company" htmlFor="company">
            <EditOrView
              name="company"
              value={form.company}
              editing={editing}
              onChange={handleChange}
              placeholder="Company name"
            />
          </Field>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          {editing ? (
            <>
              <Button
                onClick={() => {
                  setForm(profile);
                  setAvatarFile(null);
                  setAvatarPreview(null);
                  setPhotoError(null);
                  setEditing(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
