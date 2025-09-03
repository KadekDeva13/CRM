import { Outlet } from "react-router-dom";
import AppFooter from "../../components/AppFooter";

export default function AuthLayout(): React.ReactElement {
  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 relative">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-gradient-to-br from-indigo-600 to-blue-600" />
          <div className="bg-[color:var(--bg,#0b1220)]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
          <aside className="hidden lg:flex items-center justify-center text-white p-12">
            <div className="max-w-md w-full">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/15 ring-1 ring-white/20 grid place-content-center">
                  <span className="text-2xl font-black">C</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">CRM Portal</h1>
                  <p className="text-white/80 text-sm">Customer Relationship Management</p>
                </div>
              </div>

              <h2 className="text-5xl font-semibold tracking-tight leading-tight">
                Welcome<span className="text-white/80">.</span>
              </h2>

              <p className="mt-12 text-sm text-white/70">
                © {new Date().getFullYear()} CRM — All rights reserved.
              </p>
            </div>
          </aside>

          <main className="flex items-center justify-center p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>

      <AppFooter variant="auth" />
    </div>
  );
}
