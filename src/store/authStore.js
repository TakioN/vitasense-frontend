import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isLoading: true,

  init: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/main`, {
        withCredentials: true,
      });

      set({
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ isLoggedIn: false, isLoading: false });
    }
  },

  logout: () => {
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
