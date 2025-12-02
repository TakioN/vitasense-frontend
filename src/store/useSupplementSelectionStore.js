import { create } from "zustand";

const useSupplementSelectionStore = create((set) => ({
  selectedIds: [],
  dailyCounts: new Map(),
  toggleId: (id) =>
    set((prev) => {
      if (prev.selectedIds.includes(id)) {
        return { selectedIds: prev.selectedIds.filter((x) => x !== id) };
      } else {
        return { selectedIds: [...prev.selectedIds, id] };
      }
    }),
  saveDailyCounts: (id, count) =>
    set((state) => {
      const newMap = new Map(state.dailyCounts);

      //   if (state.dailyCounts.has(id)) newMap.delete(id);
      //   else newMap.set(id, count);
      if (!state.dailyCounts.has(id)) newMap.set(id, count);

      return { dailyCounts: newMap };
    }),
}));

export default useSupplementSelectionStore;
