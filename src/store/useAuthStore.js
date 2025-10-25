import { create } from "zustand";
import { persist } from "zustand/middleware";
import request from "../apis/api";

const useAuthStore = create(
  persist((set) => ({
    isLoggedIn: false,
    isLoading: false,
    userName: "",

    init: async () => {
      console.log("initializing");
      try {
        await request.get("/main", {
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
      set({ isLoggedIn: false, userName: "" });
    },
  }))
);

export default useAuthStore;
