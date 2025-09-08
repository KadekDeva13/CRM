import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/UI/button";
import PasswordField from "../../components/UI/passwordField";
import EmailField from "../../components/UI/emailField";

const isValidEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isValidPassword = (v: unknown): v is string =>
  typeof v === "string" && v.length >= 6;

export default function Login(): React.ReactElement  {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = form.get("password");

    if (!isValidEmail(email)) {
      setLoading(false);
      toast.error("Format email tidak valid");
      return;
    }
    if (!isValidPassword(password)) {
      setLoading(false);
      toast.error("Password minimal 6 karakter");
      return;
    }

    toast.success("Login berhasil! 👋");
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 lg:hidden flex items-center gap-3 text-white">
        <div className="h-10 w-10 rounded-2xl bg-white/15 ring-1 ring-white/20 grid place-content-center">
          <span className="text-xl font-black">C</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold">CRM Portal</h1>
          <p className="text-white/80 text-xs">Sign in to continue</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white/90 dark:bg-neutral-900/80 shadow-xl ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <form className="px-6 py-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
            Login with your Account
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Use company email for login to CRM.
          </p>

          <EmailField name="email" disabled={loading} required />

          <PasswordField name="password" disabled={loading} required />

          <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
            By login, you are agree{" "}
            <a className="underline hover:text-neutral-700" href="#">
              Terms &amp; Condition
            </a>{" "}
            and{" "}
            <a className="underline hover:text-neutral-700" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-2xl bg-neutral-900/80 text-white px-6 py-4 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
              </svg>
              <span className="text-sm">Authenticating…</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
