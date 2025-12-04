import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  RadarChart,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import Header from "../components/common/Header";
import ScoreForIndex from "../components/healthScore/ScoreForIndex";
import useHealthScoreStore from "../store/useHealthScoreStore";

import bmi from "@/assets/images/bmi.svg";
import bloodPressure from "@/assets/images/blood_pressure.svg";
import bloodType from "@/assets/images/bloodtype.svg";
import glucose from "@/assets/images/glucose.svg";
import nephrology from "@/assets/images/nephrology.svg";
import pulmonology from "@/assets/images/pulmonology.svg";

const SCORENAME = [
  "체질량지수",
  "혈압",
  "혈색소",
  "공복혈당",
  "신장질환",
  "간장질환",
];
const IMAGESRCS = [
  bmi,
  bloodPressure,
  bloodType,
  glucose,
  nephrology,
  pulmonology,
];
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

function HealthScore() {
  const healthScore = useHealthScoreStore((state) => state.healthScore);
  const individualScores = useHealthScoreStore(
    (state) => state.individualScores
  );
  const fetchScore = useHealthScoreStore((state) => state.fetchScore);

  const [radarData, setRadarData] = useState([]);

  useEffect(() => {
    fetchScore();
  }, []);

  useEffect(() => {
    setRadarData(
      Object.values(individualScores).map((val, idx) => ({
        name: SCORENAME[idx],
        value: val,
      }))
    );
  }, [individualScores]);

  const renderScores = () =>
    Object.entries(individualScores).map(([_, val], idx) => (
      <ScoreForIndex
        key={idx}
        imageSrc={IMAGESRCS[idx]}
        name={SCORENAME[idx]}
        value={val}
      />
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

        {/* 종합 건강 점수 */}
        <div className="border rounded-md mt-10 flex text-start p-4 bg-white flex-col justify-between md:flex-row gap-2">
          <div className="flex flex-col items-center">
            <span>종합 건강 점수</span>
            <span>
              <span
                className="font-bold text-[50px]"
                style={{ color: barColor(healthScore) }}
              >
                {healthScore}
              </span>{" "}
              / 100
            </span>
          </div>
          <div className="w-full md:w-7/10 flex flex-col justify-center">
            <div className="flex justify-between mb-4">
              <span>건강 수준</span>
              <span className="font-bold">{getJudge(healthScore)}</span>
            </div>
            <div className="rounded-md h-3 w-full bg-gray-300">
              <div
                className="h-full rounded-md"
                style={{
                  backgroundColor: barColor(healthScore),
                  width: `${healthScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 항목별 점수 */}
        <div className="border rounded-md mt-5 p-4">
          <div className="flex flex-col text-start mb-5">
            <span className="font-bold">항목별 점수</span>
            <span>각 건강 지표별 세부 점수</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">{renderScores()}</div>
        </div>

        {/* Radar chart */}
        <RadarChart
          className="w-full h-[500px] no-recharts-outline overflow-auto"
          outerRadius="80%"
          data={radarData}
          responsive
          margin={{ left: 70 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar
            name="score"
            dataKey="value"
            stroke="var(--main-1)"
            fill="var(--main-1)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </main>
    </>
  );
}

export default HealthScore;
