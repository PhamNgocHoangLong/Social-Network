import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  login: (user: any) => {
    if (user.email === "admin@gmail.com" && user.password === "123456789") {
      set({ user });
      toast.success("Logged in successfully");
    }
  },
}));
