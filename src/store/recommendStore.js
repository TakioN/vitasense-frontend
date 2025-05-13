import { create } from "zustand";

const recommendStore = create((set) => ({
  recData: [],
  setData: (newData) => set(() => ({ recData: newData })),
}));

export default recommendStore;
