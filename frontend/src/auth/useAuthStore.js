import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { getUserFromToken } from "../utils/getUserFromToken";

export const useAuthStore = create((set, get) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  initFromToken: () => {
    const user = getUserFromToken();
    if (user && user.role === "admin") {
      set({ isAdmin: true });
    }
  },

  checkAdminStatus: async () => {
    console.log("[useAuthStore] checkAdminStatus start");
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      console.log("[useAuthStore] Admin check response:", response.data);
      set({ isAdmin: !!response.data.isAdmin, error: null });
    } catch (error) {
      console.error("[useAuthStore] checkAdminStatus error:", error);
      const errMsg =
        error?.response?.data?.message ?? error?.message ?? "Failed to check admin";
      set({ isAdmin: false, error: errMsg });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
