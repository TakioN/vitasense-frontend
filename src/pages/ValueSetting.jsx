import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import usePdfResultStore from "../store/usePdfResultStore";
import Button from "../components/common/Button";

import check from "@/assets/images/check.svg";
import exclamation from "@/assets/images/exclamation.svg";

function ValueSetting() {
  const navigate = useNavigate();

  const pdfData = usePdfResultStore((state) => state.pdfData);
  const setPdfData = usePdfResultStore((state) => state.setPdfData);

  const emptyState = useMemo(() => {
    return Object.values(pdfData).filter((x) => !x).length;
  }, [pdfData]);

  const renderIndices = () =>
    Object.entries(pdfData).map(([name, val], idx) => (
      <div key={idx}>
        <p className="flex gap-10 mb-3">
          <span className="text-xl">{name}</span>
          <span className="flex flex-1 justify-end">
            <img src={val ? check : exclamation} />
            <span className={`${val ? "text-green-500" : "text-amber-500"}`}>
              {val ? "입력 완료" : "필수 입력"}
            </span>
          </span>
        </p>
        <input
          type="number"
          className="border w-full h-10 rounded-md"
          placeholder="수치를 입력하세요"
          value={val ?? ""}
          onChange={(e) => setPdfData({ [name]: e.target.value })}
        />
      </div>
    ));

  const goToResult = () => {
    navigate("/result");
  };

  return (
    <>
      <Header />
      <main className="px-3 pt-10">
        <div className="flex flex-col gap-4 mb-10">
          <p className="font-bold text-xl md:text-3xl">검진 데이터 확인</p>
          <p className="text-gray-500 text-xs md:text-lg">
            PDF에서 일부 데이터가 누락되었습니다. 아래 빈 항목을 채워주세요.
          </p>
        </div>

        <section className="border border-blue-200 bg-blue-50 rounded-md flex justify-between px-3 py-5 mb-10">
          <div className="flex flex-col">
            <span>데이터 수집 현황</span>
            <span className="font-bold text-3xl">{`${
              10 - emptyState
            } / 10 항목`}</span>
          </div>
          <div className="flex flex-col">
            <span>남은 항목</span>
            <span className="font-bold text-3xl text-amber-600">
              {emptyState}
            </span>
          </div>
        </section>

        <section className="border border-gray-500 text-start px-3 py-4 rounded-md mb-10">
          <div className="mb-5">
            <span className="font-bold text-xl">건강검진 수치 입력</span>
            <p>
              <span className="text-amber-500 font-semibold">필수 입력</span>{" "}
              표시된 항목들을 모두 입력해주세요.
            </p>
          </div>
          <div className="flex flex-col gap-5">{renderIndices()}</div>
        </section>

        <div>
          <Button
            className="bg-[var(--main-1)] disabled:bg-[rgba(226,178,84,0.5)]"
            disabled={emptyState !== 0}
            onClick={goToResult}
          >
            완료
            {emptyState !== 0 && (
              <span className="text-sm">{` (${emptyState}개 남음)`}</span>
            )}
          </Button>
        </div>
      </main>
    </>
  );
}

export default ValueSetting;
