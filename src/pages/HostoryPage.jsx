import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/header";
import pdfResultStore from "../store/pdfResultStore";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const { setpdfData, setJudgeResult } = pdfResultStore();
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/history`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.history);
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
        {his.created_at.split("T")[0]}
      </div>
    ));

  const handleHistory = (history) => {
    // console.log(history);
    setpdfData(history.result_json);
    navigate("/result", { state: { submit: false } });
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
