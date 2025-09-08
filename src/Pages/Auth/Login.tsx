import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/button";
import { Field, inputCls } from "../../components/UI/field";
import { loginSuccessToast, loginErrorToast } from "../../components/Toast/LoginToast";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = form.email.trim() !== "" && form.password.trim() !== "";
      await new Promise((r) => setTimeout(r, 600));
      if (!ok) throw new Error("Mohon isi email & password");
      loginSuccessToast();
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      loginErrorToast(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white font-helvetica">
      <div className="mb-10 flex items-center gap-3">
        <img src="/image/Guirez.png" alt="guirez" className="h-7 w-auto" />
        <span className="text-sm/none text-white/70">|</span>
        <span className="text-sm tracking-[0.18em]">CRM</span>
      </div>

      <h1 className="mb-8 text-4xl font-semibold tracking-wide">Sign In.</h1>

      <form onSubmit={onSubmit} className="space-y-6 max-w-sm">
        <Field label={<span className="text-white/70 text-[13px]">User Name</span>} htmlFor="email">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-300/90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={onChange}
              className={[
                inputCls,
                "bg-transparent text-white placeholder-white/40",
                "h-12 rounded-xl border-[1.5px] pl-10",
                "border-white/60 focus:border-white focus:ring-white/10",
              ].join(" ")}
            />
          </div>
        </Field>

        <Field label={<span className="text-white/60 text-[13px]">Password</span>} htmlFor="password">
          <div className="relative font-helectiva">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-300/70">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className={[
                inputCls,
                "bg-transparent text-white placeholder-white/40",
                "h-12 rounded-xl border border-white/20 pl-10",
                "focus:border-white focus:ring-white/10",
              ].join(" ")}
            />
          </div>
        </Field>

        <div className="pt-4 font-helectiva">
          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-12 rounded-xl bg-[#112D30]/90 hover:bg-[#0E3F3A] text-white tracking-[0.2em]"
          >
            SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
}
