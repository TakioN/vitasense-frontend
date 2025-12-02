import { useNavigate } from "react-router-dom";

import useRecommendStore from "../store/useRecommendStore";
import useSupplementSelectionStore from "../store/useSupplementSelectionStore";
import Header from "../components/common/Header";

import pill from "@/assets/images/pill.svg";
import warning from "@/assets/images/warning.svg";
import request from "../apis/api";

function Recommend() {
  const navigate = useNavigate();

  const recData = useRecommendStore((state) => state.recData);
  const saveDailyCounts = useSupplementSelectionStore(
    (state) => state.saveDailyCounts
  );
  const dailyCounts = useSupplementSelectionStore((state) => state.dailyCounts);

  const renderRecommend = () =>
    recData.map((re) => (
      <div
        key={re.id}
        className={`box-border border rounded-md px-3 py-5 mb-10 ${
          dailyCounts.has(re.id) &&
          "outline outline-red-500 outline-3 border-transparent"
        }`}
        // onClick={() => saveDailyCounts(re.id, re.dailyConutMax)}
        onClick={() => {
          saveDailyCounts(re.id, re.dailyConutMax);
          enrollAlarm(re.id, re.dailyCountMax);
        }}
      >
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-5">
          {re.image_url && (
            <img
              src={re.image_url}
              className="inline-block text-center md:max-w-[20vw] rounded-md"
            />
          )}
          <div className="text-start">
            <p className="font-bold text-xl text-start mb-2">{re.itemName}</p>
            <span className="font-bold">효능</span>
            <p className="text-start mb-5 mt-1">{re.efficacy}</p>
            <span className="font-bold">복용법</span>
            <p className="text-start mt-1">{re.howToUse}</p>
          </div>
        </div>

        <div className="bg-[yellow] border border-[#fee685] bg-amber-50 rounded-md text-start p-4 mb-3">
          <div className="flex gap-3">
            <img src={warning} />
            <span className="font-bold text-amber-800">주의사항</span>
          </div>
          <p className="text-amber-700 font-medium ml-9">{re.warning}</p>
        </div>

        <div className="border border-gray-200 bg-gray-50 rounded-md text-start p-4">
          <span className="font-bold">부작용</span>
          <p>{re.sideEffect || "없음"}</p>
        </div>
      </div>
    ));

  const enrollAlarm = async (id, count) => {
    const isTaken = confirm("이 영양제를 복용하시겠습니까?");
    if (!isTaken) return;

    try {
      request.post("/alarms/setup", {
        supplementId: id,
        selectedDailyCount: count,
      });
    } catch (e) {
      console.error("알람 등록 중 에러 발생 : " + e);
    }
  };

  return (
    <>
      <Header />
      <main className="px-3">
        <div className="mb-8">
          <p className="text-start mt-7 font-bold text-2xl flex gap-2 mb-1">
            <img src={pill} />
            맞춤 영양제 추천
          </p>
          <p className="text-start text-sm text-gray-700">
            건강검진 결과를 기반으로 추천된 영양제입니다
          </p>
        </div>

        <div className="mb-30">{renderRecommend()}</div>

        <div className="flex fixed bottom-8 right-4 left-4 h-13 gap-5">
          <button
            className="flex-1 bg-[var(--main-1)] rounded-md font-bold"
            onClick={() => navigate("/home")}
          >
            확인
          </button>
          {/* <button
            className="flex-1 bg-[var(--main-1)] rounded-md font-bold disabled:opacity-50"
            disabled={selectedIds.length < 1}
            onClick={enrollAlarm}
          >
            알림 등록
          </button> */}
        </div>
      </main>
    </>
  );
}

export default Recommend;
