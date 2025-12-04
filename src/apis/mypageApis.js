import request from "./api";

export const getScore = async (pdfData) => {
  const res = await request.post("/pdf/score", pdfData);
  return res.data;
};

export const getHistories = async () => {
  const res = await request.get("/results/history");
  return res.data;
};

export const getMostRecentHistory = async () => {
  const res = await request.get("/results/history/recent");
  return res.data;
};
