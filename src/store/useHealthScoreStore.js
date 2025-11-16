import { create } from "zustand";

const useHealthScoreStore = create((set) => ({
  healthScore: -1,
  individualScores: {},

  setScore: (score) => set({ healthScore: score }),
  setIndividualScore: (scores) => set({ individualScores: scores }),
}));

export default useHealthScoreStore;
