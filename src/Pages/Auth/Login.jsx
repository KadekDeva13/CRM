import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/button";
import { Field, inputCls } from "../../components/UI/field";
import PasswordField from "../../components/UI/passwordField";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: nanti ganti dengan call API, validasi credential, dst.
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 900);
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

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className={inputCls}
              disabled={loading}
            />
          </Field>

          <PasswordField disabled={loading} />

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-3 select-none">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900"
                disabled={loading}
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Remember Me
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
            By login, you agree{" "}
            <a className="underline hover:text-neutral-700" href="#">Terms & Condition</a> and{" "}
            <a className="underline hover:text-neutral-700" href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-2xl bg-neutral-900/80 text-white px-6 py-4 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4"></path>
              </svg>
              <span className="text-sm">Authenticating…</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
