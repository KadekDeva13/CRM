import toast from "react-hot-toast";

export const loginSuccessToast = () => {
  toast.success("Login berhasil! Selamat datang 👋", {
    duration: 3000,
    position: "top-right",
  });
};

export const loginErrorToast = (msg = "Email atau password salah.") => {
  toast.error(msg, {
    duration: 3000,
    position: "top-right",
  });
};
