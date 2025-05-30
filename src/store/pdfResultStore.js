import { create } from "zustand";

const pdfResultStore = create((set) => ({
  pdfData: {
    체질량지수: "90",
    고혈압_수축기: "200",
    고혈압_이완기: "120",
    혈색소: "13",
    공복혈당: "100",
    "혈청 크레아티닌": "1.5",
    신사구체여과율: "60",
    "에이에스티(AST)": "40",
    "에이엘티(ALT)": "35",
    "감마지티피(γ-GTP)": "63",
  },
  setData: (newData) =>
    set((state) => ({ pdfData: { ...state.pdfData, ...newData } })),
}));

export default pdfResultStore;
