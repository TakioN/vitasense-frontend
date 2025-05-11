import Header from "../components/common/header";
import Divider from "../components/common/Divider";
import Button from "../components/common/Button";

const DISEASES = [
  {
    name: "공복 혈당",
    value: 89,
  },
  {
    name: "혈압",
    value: 117,
  },
  {
    name: "혈압",
    value: 117,
  },
  {
    name: "혈압",
    value: 117,
  },
  {
    name: "혈압",
    value: 117,
  },
];

function Result() {
  const renderPdfResult = () =>
    DISEASES.map((disease, idx) => (
      <div className={`${idx % 2 == 0 ? "bg-[#a52a2a8c]" : "bg-[orange]"}`}>
        <p key={idx} className="flex justify-between py-1 mb-1 w-3/5 mx-auto">
          <span className="text-xl">{disease.name}</span>
          <span className="text-xl">{disease.value}</span>
        </p>
      </div>
    ));

  return (
    <>
      <Header />
      <main className="px-3">
        <div className="mt-3 border border-[#EB757B] p-3 rounded-md">
          <p className="mb-5 text-2xl">검사 결과</p>
          <div>
            <ul className="list-disc list-inside grid grid-cols-2">
              <li className="text-start font-bold h-10">체질량 지수 - 정상</li>
              <li className="text-start text-lg font-bold h-10">
                혈색소 - 비정상
              </li>
              <li className="text-start text-lg font-bold h-10">혈압 - 정상</li>
              <li className="text-start font-bold h-10">공복혈당 - 비정상</li>
            </ul>
          </div>
        </div>

        <Divider />

        <div>
          <div className="max-w-3xl mx-auto mb-20">{renderPdfResult()}</div>
          <Button>수정하기</Button>
        </div>
        <Button>영양제 추천</Button>
      </main>
    </>
  );
}
export default Result;
