import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import usePdfResultStore from "../store/usePdfResultStore";
import useHistoryStore from "../store/useHistoryStore";

function HistoryPage() {
  const navigate = useNavigate();
  const { setPdfData } = usePdfResultStore();
  const fetchHistory = useHistoryStore((state) => state.fetchHistory);
  const history = useHistoryStore((state) => state.history);

  useEffect(() => {
    if (history === null) fetchHistory();
  }, []);

  const renderHistory = () =>
    history?.map((his, idx) => (
      <div
        className="border border-[#EB757B] rounded-3xl py-3 cursor-pointer"
        onClick={() => {
          handleHistory(his);
        }}
        key={idx}
      >
        {getDate(his.created_at)}
      </div>
    ));

  const handleHistory = (history) => {
    console.log(history.result_json);
    setPdfData(history.result_json);
    navigate("/result", {
      state: { fromHistory: true, date: getDate(history.created_at) },
    });
  };

  const getDate = (isoString) => {
    const date = new Date(isoString);

    const formatted = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    return formatted;
  };

  return (
    <>
      <Header />

      <main className="px-3">
        <p className="text-start font-bold text-xl py-10">
          조회할 기록을 선택하세요
        </p>
        <div className="flex flex-col gap-4">{renderHistory()}</div>
      </main>
    </>
  );
}

export default HistoryPage;
