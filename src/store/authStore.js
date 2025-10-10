import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist((set) => ({
    isLoggedIn: false,
    isLoading: true,
    userName: "",

    init: async () => {
      console.log("initializing");
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
    login: (userName) => {
      set({ isLoggedIn: true });
      set({ userName });
    },

    logout: () => {
      set({ isLoggedIn: false });
    },
  }))
);

export default useAuthStore;
