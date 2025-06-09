import { create } from "zustand";

const recommendStore = create((set) => ({
  recData: [],
  setRecData: (newData) => set(() => ({ recData: newData })),
}));

export default recommendStore;
