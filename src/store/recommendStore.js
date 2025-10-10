import { create } from "zustand";
import { persist } from "zustand/middleware";

const recommendStore = create(
  persist((set) => ({
    recData: [],
    setRecData: (newData) => set(() => ({ recData: newData })),
  }))
);

export default recommendStore;
