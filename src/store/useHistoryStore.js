import { create } from "zustand";
import { getHistories } from "../apis/mypageApis";

const useHistoryStore = create((set) => ({
  history: null,

  fetchHistory: async () => {
    try {
      const data = await getHistories();
      console.log(data.history);
      set({ history: data.history });
    } catch (e) {
      console.error("이전 이력을 조회하던 중 에러 발생: " + e);
    }
  },
}));

export default useHistoryStore;
