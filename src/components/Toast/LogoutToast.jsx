import toast from "react-hot-toast";

export const logoutToast = () => {
  toast.success("Logout berhasil 👋", {
    duration: 3000,
    position: "top-right",
  });
};
