import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import useHealthScoreStore from "../store/useHealthScoreStore";

import heart from "@/assets/images/heart.svg";
import historyImg from "@/assets/images/history.svg";
import useHistoryStore from "../store/useHistoryStore";
import { getMostRecentHistory, getScore } from "../apis/mypageApis";

const barColor = (value) => {
  if (value >= 90) return "green";
  else if (value >= 80) return "yellow";
  else if (value >= 70) return "orange";
  else return "red";
};
const getJudge = (value) => {
  if (value >= 90) return "우수";
  else if (value >= 80) return "양호";
  else if (value >= 70) return "주의";
  else return "건강 나쁨";
};

function MyPage() {
  const navigate = useNavigate();
  const healthScore = useHealthScoreStore((state) => state.healthScore);
  const fetchScore = useHealthScoreStore((state) => state.fetchScore);
  const history = useHistoryStore((state) => state.history);
  const fetchHistory = useHistoryStore((state) => state.fetchHistory);

  const [score, setScore] = useState();

  useEffect(() => {
    if (healthScore < 0) fetchScore();
    if (history === null) fetchHistory();
  }, []);

  // 가장 최근의 건강 정보 가져오기
  useEffect(() => {
    const fetchRecentScore = async () => {
      const data = await getMostRecentHistory();
      const score = await getScore(data.result_json);
      console.log(score);
      setScore(score.total_score);
    };

    fetchRecentScore();
  }, []);

  const renderHistory = () =>
    history?.map((h) => (
      <div
        key={h.id}
        className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg py-2 font-bold cursor-pointer"
      >
        {getDate(h.created_at)}
      </div>
    ));

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
      <main
        className="px-3 py-10 bg-[#f6f9fb]"
        style={{ minHeight: "calc(100dvh - 66px)" }}
      >
        <div className="flex flex-col gap-4 mb-10">
          <p className="font-bold text-xl md:text-3xl">마이페이지</p>
          <p className="text-gray-500 text-xs md:text-lg">
            이전 결과를 확인하고 건강 상태를 관리할 수 있습니다.
          </p>
        </div>

        {/* 종합 건강 점수 */}
        <div className="border rounded-md my-10 flex text-start p-4 bg-white flex-col justify-between md:flex-row gap-2 border border-gray-300">
          <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center">
              <div className="size-10 bg-[red] rounded-full flex items-center justify-center">
                <img src={heart} />
              </div>

              <span className="font-bold">종합 건강 점수</span>
            </div>
            <span>
              <span
                className="font-bold text-[50px]"
                style={{ color: barColor(score) }}
              >
                {score}
              </span>{" "}
              / 100
            </span>
          </div>
          <div className="w-full md:w-7/10 flex flex-col justify-center">
            <div className="flex justify-between mb-4">
              <span>
                건강 수준
                <span className="text-gray-500 text-xs ml-1">
                  (최근 검진 기준)
                </span>
              </span>
              <span className="font-bold">{getJudge(healthScore)}</span>
            </div>
            <div className="rounded-md h-3 w-full bg-gray-300">
              <div
                className="h-full rounded-md"
                style={{
                  backgroundColor: barColor(score),
                  width: `${score}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 과거 분석 기록 */}
        <div className="rounded-md my-10 p-4 bg-white border border-gray-300">
          <div className="flex gap-1 items-center mb-5">
            <div className="size-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <img src={historyImg} />
            </div>
            <span className="font-bold">과거 건강검진 기록</span>
          </div>

          <div className="flex flex-col space-y-3 mb-5">{renderHistory()}</div>

          <button
            className="rounded-lg border border-emerald-200 w-full py-2 cursor-pointer"
            onClick={() => navigate("/history")}
          >
            전체 기록 보기
          </button>
        </div>

        {/* 알림 설정 */}
        <div className="rounded-md my-10 p-4 bg-white border border-gray-300">
          <div className="flex gap-1 items-center mb-5">
            <div className="size-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <img src={historyImg} />
            </div>
            <span className="font-bold">알람 설정</span>
          </div>

          <button
            className="rounded-lg border border-amber-200 w-full py-2 cursor-pointer"
            onClick={() => navigate("/my/tracker")}
          >
            알람 설정 가기
          </button>
        </div>
      </main>
    </>
  );
}

export default MyPage;
