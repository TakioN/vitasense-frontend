import Header from "../components/common/header";

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
  const renderDiseases = () =>
    DISEASES.map((disease) => (
      <label className="flex items-center ml-5 h-18">
        <input type="checkbox" className="size-5" />
        <span className="ml-2 text-2xl">{disease}</span>
      </label>
    ));

  const renderTakenDrugs = () =>
    TAKENDRUG.map((drug) => (
      <label className="flex items-center ml-5 h-18">
        <input type="checkbox" className="size-5" />
        <span className="ml-2 text-2xl">{drug}</span>
      </label>
    ));

  return (
    <div>
      <Header />
      <main className="px-3 pt-20 mb-30">
        <div className="border border-[#EB757B] grid grid-cols-2 rounded-md mb-10">
          {renderDiseases()}
        </div>
        <div className="border border-[#EB757B] grid grid-cols-2 rounded-md">
          {renderTakenDrugs()}
        </div>
      </main>
      {/* <button className="bg-[yellow]">업데이트</button> */}
      <button className="w-4/5 rounded-md h-15 text-2xl font-bold text-white bg-[#275D7A] mb-10">
        마이페이지
      </button>
    </div>
  );
}

export default UserSetting;
