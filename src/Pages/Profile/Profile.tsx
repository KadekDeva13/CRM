import React, { useState } from "react";
import { Field, inputCls } from "../../components/UI/field";
import Button from "../../components/UI/button";

type Profile = {
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
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
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [form, setForm] = useState<Profile>(profile);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value } as Profile));
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
          {String(profile.name || "?").charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          <p className="text-sm text-gray-400">{profile.role}</p>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 space-y-4">
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
