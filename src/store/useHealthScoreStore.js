import { create } from "zustand";
import { getScore } from "../apis/mypageApis";
import usePdfResultStore from "./usePdfResultStore";

const useHealthScoreStore = create((set) => ({
  healthScore: -1,
  individualScores: {},

  setScore: (score) => set({ healthScore: score }),
  setIndividualScore: (scores) => set({ individualScores: scores }),

  fetchScore: async () => {
    const pdfData = usePdfResultStore.getState().pdfData;

    try {
      const data = await getScore(pdfData);
      set({ healthScore: data.total_score });
      set({ individualScores: data.individual_scores });
    } catch (e) {
      console.error("건강 점수 요청 중 오류 발생: " + e);
    }
  },
}));

export default useHealthScoreStore;
