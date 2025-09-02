import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DropdownProfile({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Tutup saat klik di luar
  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogout = async () => {
    setOpen(false);
    try {
      // contoh lokal: bersihkan token
      localStorage.removeItem("token");
      await onLogout?.(); // jika kamu punya handler, akan dipanggil
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm ring-1 ring-white/10 hover:bg-white/15"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-block h-6 w-6 rounded-full bg-white/20" />
        <span className="hidden sm:inline">Account</span>
        <svg className="h-4 w-4 opacity-80" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg bg-white text-gray-800 shadow-xl ring-1 ring-black/5 z-[60]"
        >
          <button
            onClick={() => go("/profile")}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
            role="menuitem"
          >
            Profile
          </button>

          <div className="h-px bg-gray-100" />
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
