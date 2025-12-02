import { create } from "zustand";

const usePdfResultStore = create((set) => ({
  pdfData: {
    체질량지수: "10",
    고혈압_수축기: "100",
    고혈압_이완기: "100",
    혈색소: "10",
    공복혈당: "100",
    "혈청 크레아티닌": "1.5",
    신사구체여과율: "60",
    "에이에스티(AST)": "40",
    "에이엘티(ALT)": "35",
    "감마지티피(γ-GTP)": null,
  },
  judgeResult: {
    체질량지수: "정상",
    고혈압: "고혈압 전단계",
    혈색소: "빈혈 의심",
    공복혈당: "정상",
    신장질환: "정상",
    간장질환: "정상",
  },
  abNormalIndices: [],

  setPdfData: (newData) =>
    set((state) => ({ pdfData: { ...state.pdfData, ...newData } })),
  setJudgeResult: (newData) =>
    set((state) => ({ judgeResult: { ...state.judgeResult, ...newData } })),
  addAbnormal: (data) =>
    set((state) => ({ abNormalIndices: [...state.abNormalIndices, data] })),
}));

export default usePdfResultStore;
