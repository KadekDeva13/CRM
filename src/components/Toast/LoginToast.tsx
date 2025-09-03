import toast from "react-hot-toast";

export const loginSuccessToast = (): void => {
  toast.success("Login berhasil! Selamat datang 👋", {
    duration: 3000,
    position: "top-right",
  });
};

export const loginErrorToast = (msg: string = "Email atau password salah."): void => {
  toast.error(msg, {
    duration: 3000,
    position: "top-right",
  });
};
