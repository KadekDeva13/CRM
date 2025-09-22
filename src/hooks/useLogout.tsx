import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type AfterLogout = () => Promise<void> | void;

export function useLogout(onAfter?: AfterLogout) {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    const t = toast.loading("Signing you out…");
    try {
      localStorage.removeItem("token");
      await onAfter?.();
      await new Promise((res) => setTimeout(res, 800));

      toast.success("Logout berhasil 👋");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Gagal logout. Coba lagi.");
    } finally {
      toast.dismiss(t);
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  }, [loggingOut, navigate, onAfter]);

  return { loggingOut, logout };
}
