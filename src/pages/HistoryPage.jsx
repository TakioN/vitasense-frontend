import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import usePdfResultStore from "../store/usePdfResultStore";
import { useNavigate } from "react-router-dom";
import request from "../apis/api";

function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const { setPdfData } = usePdfResultStore();
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = request.get(
          `${import.meta.env.VITE_API_URL}/results/history`,
          {
            withCredentials: true,
          }
        );
        setHistories(res.data.history);
      } catch (e) {
        console.error(e);
      }
    };

    getHistory();
  }, []);
  const renderHistory = () =>
    histories.map((his, idx) => (
      <div
        className="border border-[#EB757B] rounded-3xl py-3"
        onClick={() => {
          handleHistory(his);
        }}
        key={idx}
      >
        {localizedDate(his.created_at)}
      </div>
    ));

  const handleHistory = (history) => {
    setPdfData(history.result_json);
    navigate("/result", { state: { fromHistory: true } });
  };

  const localizedDate = (date) => {
    const zdate = new Date(date);
    const kstDate = new Date(zdate.getTime() + 9 * 60 * 60 * 1000);

    const y = kstDate.getFullYear();
    const m = String(kstDate.getMonth() + 1).padStart(2, "0");
    const d = String(kstDate.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
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
