import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Header from "../components/common/Header";

import pill from "@/assets/images/pill.svg";
import vital from "@/assets/images/vital.svg";

const DISEASES = ["당뇨병", "수술 예정", "신경질환", "임산부", "간질 환자"];
const TAKENDRUG = [
  "아스피린",
  "이부프로펜",
  "항생제",
  "벤조디아제핀",
  "고혈압 약",
  "스테로이드",
];

function UserSetting() {
  const navigate = useNavigate();

  const renderDiseases = () =>
    DISEASES.map((disease, idx) => (
      <label
        key={idx}
        className="flex items-center h-12 border border-gray-200 rounded-md px-2"
      >
        <input type="checkbox" className="size-4" />
        <span className="ml-2">{disease}</span>
      </label>
    ));

  const renderTakenDrugs = () =>
    TAKENDRUG.map((drug, idx) => (
      <label
        key={idx}
        className="flex items-center h-12 border border-gray-200 rounded-md px-2"
      >
        <input type="checkbox" className="size-4" />
        <span className="ml-2">{drug}</span>
      </label>
    ));

  return (
    <>
      <Header />
      <main
        className="px-3 pt-10 bg-[#f6f9fb]"
        style={{ minHeight: "calc(100dvh - 66px)" }}
      >
        <div className="flex flex-col gap-4 mb-10">
          <p className="font-bold text-xl md:text-3xl">건강 정보 입력</p>
          <p className="text-gray-500 text-xs md:text-lg">
            현재 복용 중인 약과 진단받은 질환을 선택해주세요
          </p>
        </div>

        <div className="border border-[#EB757B] rounded-md mb-10 bg-white border border-gray-300 p-4">
          <div className="flex gap-2">
            <div className="bg-[rgba(0,137,148,0.1)] size-10 flex items-center justify-center rounded-xl">
              <img src={pill} className="" />
            </div>
            <div className="text-start">
              <p className="font-bold">복용중인 약</p>
              <p className="text-xs">
                현재 복용하고 있는 약을 모두 선택해주세요
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            {renderTakenDrugs()}
          </div>
        </div>

        <div className="border border-[#EB757B] rounded-md mb-10 bg-white border border-gray-300 p-4">
          <div className="flex gap-2">
            <div className="bg-[rgba(0,137,148,0.1)] size-10 flex items-center justify-center rounded-xl">
              <img src={vital} className="" />
            </div>
            <div className="text-start">
              <p className="font-bold">진단받은 질환</p>
              <p className="text-xs">현재 앓고 있는 질환을 모두 선택해주세요</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">{renderDiseases()}</div>
        </div>
        <Button
          onClick={() => {
            navigate("/result");
          }}
        >
          결과 보기
        </Button>
      </main>
    </>
  );
}

export default UserSetting;
