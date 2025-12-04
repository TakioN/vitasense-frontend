import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import Button from "../components/common/Button";
import useRecommendStore from "../store/useRecommendStore";
import usePdfResultStore from "../store/usePdfResultStore";
import request from "../apis/api";
import { DETAIL_UNITS, NORMAL_RANGE } from "../../constants/unit";

import exclamation from "@/assets/images/exclamation.svg";
import check from "@/assets/images/check.svg";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromHistory, date } = location.state || {};

  const [isModifying, setIsModifying] = useState(false); // 수정 중 체크
  const [modified, setModified] = useState(false); // 데이터 수정 여부
  const [modifiedResult, setModifiedResult] = useState({});

  const setRecData = useRecommendStore((state) => state.setRecData);
  const setAbnormal = usePdfResultStore((state) => state.setAbnormal);
  const abNormalIndices = usePdfResultStore((state) => state.abNormalIndices);
  const pdfData = usePdfResultStore((state) => state.pdfData);
  const setPdfData = usePdfResultStore((state) => state.setPdfData);
  const setJudgeResult = usePdfResultStore((state) => state.setJudgeResult);
  const judgeResult = usePdfResultStore((state) => state.judgeResult);

  useEffect(() => {
    setModifiedResult(pdfData);
    getJudges();
  }, []);

  const getJudges = async (modified) => {
    const body = modified ? modifiedResult : pdfData;
    try {
      const res = await request.post("/pdf/judge", body);
      setJudgeResult(res.data.judgements);
      // keyword를 가지고 있는 것은 abnormal
      setAbnormal(
        Object.entries(res.data.keywords)
          .filter(([_, val]) => Object.keys(val).length !== 0)
          .map(([key]) => key)
      );
      console.log(res.data.keywords);
      console.log(
        Object.entries(res.data.keywords).filter(
          ([_, val]) => Object.keys(val).length !== 0
        )
      );
      console.log(
        Object.entries(res.data.keywords)
          .filter(([_, val]) => Object.keys(val).length !== 0)
          .map(([key]) => key)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const renderPdfResult = () =>
    Object.entries(pdfData).map(([key, value], idx) => (
      <div
        key={idx}
        className={`${
          idx !== Object.entries(pdfData).length - 1 &&
          "border-b border-gray-300"
        }`}
      >
        <div
          key={idx}
          className="flex justify-between py-1 mb-1 mx-auto items-center"
        >
          <div className="flex flex-col text-start">
            <span className="font-semibold">{key}</span>
            <span className="text-xs text-gray-500">{NORMAL_RANGE[key]}</span>
          </div>
          {isModifying ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="w-15 border border-black rounded-md text-center"
                value={modifiedResult[key]}
                onChange={(e) => {
                  setModifiedResult((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }));
                }}
              />
              <span className="font-normal text-xs text-black">
                {DETAIL_UNITS[key]}
              </span>
            </div>
          ) : (
            <span
              className={`text-xl font-bold ${
                !checkIsInRange(key, Number(value)) && "text-[orange]"
              }`}
            >
              {value}{" "}
              <span className="font-normal text-xs text-black">
                {DETAIL_UNITS[key]}
              </span>
            </span>
          )}
        </div>
      </div>
    ));

  // 각 수치들이 정상 범위에 있는지 판단
  const checkIsInRange = (name, val) => {
    if (name === "체질량지수") return val >= 18.5 && val <= 24.9;
    else if (name === "고혈압_수축기") return val < 120;
    else if (name === "고혈압_이완기") return val < 80;
    else if (name === "혈색소") return val >= 13 && val <= 16.5;
    else if (name === "공복혈당") return val < 100;
    else if (name === "혈청 크레아티닌") return val < 1.1;
    else if (name === "신사구체여과율") return val > 60;
    else if (name === "에이에스티(AST)") return val < 38;
    else if (name === "에이엘티(ALT)") return val < 44;
    else if (name === "감마지티피(γ-GTP)") return val < 73;
  };

  const uploadResultToDb = async () => {
    if (fromHistory && !modified) return;
    const db_res = await request.post("/results/submit", {
      result: pdfData,
      judge: judgeResult,
    });
    console.log(db_res);
  };

  const sendData = async () => {
    if (!judgeResult) return;

    await uploadResultToDb();

    const params = new URLSearchParams();
    for (let ab of abNormalIndices) params.append("condition", ab);

    console.log(abNormalIndices);
    console.log(params.toString());

    request
      .get(`/supplements?${params.toString()}`)
      .then((res) => {
        console.log(res);
        setRecData(res.data);
        navigate("/recommend");
      })
      .catch((e) => {
        console.error(e);
      });
    // navigate("/recommend");
  };

  const renderJudge = () =>
    judgeResult &&
    Object.entries(judgeResult).map(([jgIdx, jgValue], idx) => {
      const [icon, badge] = getBadgeAndIcon(jgValue);
      return (
        <li
          key={idx}
          className="text-start border border-gray-300 flex rounded-md py-4 px-2 items-center relative"
        >
          <img src={icon} className="size-6 mr-2" />
          <div className="flex flex-col">
            <span className="font-bold">{jgIdx}</span>
            <span className="text-gray-500 text-sm">
              {getDetailValue(jgIdx) ?? jgValue}
            </span>
          </div>

          {badge}
        </li>
      );
    });

  // 정상, 비정상 여부에 따라서 뱃지, 아이콘 부여
  const getBadgeAndIcon = (val) => {
    if (val === "정상" || (Array.isArray(val) && val[0] === "정상")) {
      const badge = (
        <span className="absolute right-2 text-xs bg-green-100 text-green-800 font-bold py-1 rounded-full px-2">
          정상
        </span>
      );
      return [check, badge];
    } else {
      const badge = (
        <span className="absolute right-2 text-xs bg-amber-100 text-amber-800 font-bold py-1 px-2  rounded-full">
          비정상
        </span>
      );
      return [exclamation, badge];
    }
  };

  // 각 부분의 수치 얻기
  const getDetailValue = (name) => {
    if (name === "체질량지수") return `${pdfData["체질량지수"]}kg/m²`;
    else if (name === "고혈압")
      return `수축기 ${pdfData["고혈압_수축기"]} / 이완기 ${pdfData["고혈압_이완기"]}`;
    else if (name === "혈색소") return `${pdfData["혈색소"]}g/dL`;
    else if (name === "공복혈당") return `${pdfData["공복혈당"]}mg/dL`;
    return null;
  };

  const modifyComplete = async () => {
    setPdfData(modifiedResult);
    setIsModifying(false);
    setModified(true);
    await getJudges(modifiedResult);
  };

  const goToScore = () => {
    setPdfData();
    navigate("/health-score");
  };

  return (
    <>
      <Header />
      <main
        className="px-3 bg-[#f6f9fb] pt-10"
        style={{ minHeight: "calc(100dvh - 66px)" }}
      >
        <div className="flex flex-col gap-1 mb-8">
          <p className="font-bold text-xl md:text-3xl">건강검진 결과</p>
          <p className="text-gray-700 text-xs md:text-base">
            {fromHistory ? date : new Date().toLocaleDateString()} 검진
          </p>
        </div>

        <div className="p-4 border-2 border-gray-300 p-3 rounded-xl bg-white">
          <p className="font-bold text-start">종합 건강 상태</p>
          <p className="mb-5 text-start text-gray-500 text-sm">
            주요 건강 지표의 정상/비정상 여부
          </p>
          <div>
            <ul className="list-disc list-inside grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderJudge()}
            </ul>
          </div>
        </div>

        <div className="bg-white mt-8 border-2 border-gray-300 rounded-xl p-4 mb-10">
          <p className="font-bold text-start">상세 수치</p>
          <p className="mb-5 text-start text-gray-500 text-sm">
            각 항복별 측정값과 정상 범위
          </p>
          <div>{renderPdfResult()}</div>
        </div>

        {/* {isModifying ? (
          <div>
            <Button
              onClick={async () => {
                await modifyComplete();
              }}
              className="bg-[var(--main-1)]"
            >
              수정완료
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => {
                setIsModifying(true);
              }}
              className="bg-[var(--main-1)]"
            >
              수정하기
            </Button>
            <Button onClick={sendData} className="bg-[var(--main-1)]">
              영양제 추천
            </Button>
          </div>
        )} */}

        <div className="flex gap-3 justify-center">
          <Button onClick={goToScore} className="bg-[var(--main-1)]">
            점수 확인
          </Button>
          <Button onClick={sendData} className="bg-[var(--main-1)]">
            영양제 추천
          </Button>
        </div>
      </main>
    </>
  );
}
export default Result;
