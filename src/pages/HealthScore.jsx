import Header from "../components/common/Header";

import bmi from "@/assets/images/bmi.svg";
import bloodPressure from "@/assets/images/blood_pressure.svg";
import bloodType from "@/assets/images/bloodtype.svg";
import glucose from "@/assets/images/glucose.svg";
import nephrology from "@/assets/images/nephrology.svg";
import pulmonology from "@/assets/images/pulmonology.svg";
import ScoreForIndex from "../components/healthScore/ScoreForIndex";

const SCOREPERINDEX = {
  체질량지수: 85,
  혈압: 65,
  혈색소: 90,
  공복혈당: 90,
  신장질환: 88,
  간장질환: 70,
};
const IMAGESRCS = [
  bmi,
  bloodPressure,
  bloodType,
  glucose,
  nephrology,
  pulmonology,
];

function HealthScore() {
  const renderScores = () =>
    Object.entries(SCOREPERINDEX).map(([name, val], idx) => (
      // <div className="border rounded-md p-4">
      //   <div className="flex items-center relative mb-5">
      //     <div className="rounded-full border aspect-square size-10 flex items-center justify-center mr-3 md:mr-10">
      //       <img src={IMAGESRCS[idx]} className="" />
      //     </div>

      //     <span className="font-bold">{name}</span>
      //     <span className="font-bold text-3xl absolute right-0">{val}</span>
      //   </div>

      //   <div className="bg-gray-300 h-3 rounded-md w-full">
      //     <div className={`h-full bg-white`} style={{ width: `${val}%` }} />
      //   </div>
      // </div>
      <ScoreForIndex imageSrc={IMAGESRCS[idx]} name={name} value={val} />
    ));

  return (
    <>
      <Header />
      <main className="bg-[var(--default-bg)] px-3">
        <div className="text-start pt-7">
          <span className="font-bold text-2xl">건강 점수</span>
          <p className="text-xs mt-1 sm:text-base">
            최근 건강검진 결과를 기반으로 산출된 종합 건강 점수입니다.
          </p>
        </div>

        <div className="border rounded-md mt-10 flex text-start p-4 bg-white flex-col justify-between md:flex-row gap-2">
          <div className="flex flex-col items-center">
            <span>종합 건강 점수</span>
            <span>
              <span className="font-bold text-[50px] text-amber-600">78</span> /
              100
            </span>
          </div>
          <div className="w-full md:w-7/10 flex flex-col justify-center">
            <div className="flex justify-between mb-4">
              <span>건강 수준</span>
              <span>양호</span>
            </div>
            <div className="rounded-md h-3 w-full bg-gray-300">
              <div className="bg-[orange] w-7/10 h-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="border rounded-md mt-5 p-4">
          <div className="flex flex-col text-start mb-5">
            <span className="font-bold">항목별 점수</span>
            <span>각 건강 지표별 세부 점수</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">{renderScores()}</div>
        </div>
      </main>
    </>
  );
}

export default HealthScore;
