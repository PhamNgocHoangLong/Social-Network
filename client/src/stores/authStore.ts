
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  isLogging: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  login: (user: any) => Promise<void>;
  registerAuth: (user: object) => Promise<void>;
  logout: (refresh_token: string, access_token: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  isLogging: false,
  isRegistering: false,
  isLoggingOut: false,
  login: async (user: any) => {
    try {
      set({ isLogging: true });
      const res = await axios.post("http://localhost:4000/auth/login", user);

      localStorage.setItem("accessToken", res.data.result.access_token);
      localStorage.setItem("refreshToken", res.data.result.refresh_token);
      set({
        accessToken: res.data.result.access_token,
        refreshToken: res.data.result.refresh_token,
        isLogging: false,
        isAuthenticated: true,
      });

      toast.success(res.data.message);
    } catch (error: any) {
      set({ isLogging: false });
      toast.error(error.response.data.message);
    }
  },
  registerAuth: async (user: object) => {
    try {
      set({ isRegistering: true });
      const res = await axios.post("http://localhost:4000/auth/register", user);

      localStorage.setItem("accessToken", res.data.result.access_token);
      localStorage.setItem("refreshToken", res.data.result.refresh_token);

      set({
        accessToken: res.data.result.access_token,
        refreshToken: res.data.result.refresh_token,
        isRegistering: false,
        isAuthenticated: true,
      });

      toast.success(res.data.message);
    } catch (error: any) {
      set({ isRegistering: false });
      toast.error(
        error.response.data?.errors?.email?.msg || error.response?.message
      );
    }
  },
  logout: async (refresh_token: string, access_token: string) => {
    try {
      set({ isLoggingOut: true });
      const response = await axios.post(
        "http://localhost:4000/auth/logout",
        { refresh_token: refresh_token },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
        isLoggingOut: false,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message);
    }
  },
}));
