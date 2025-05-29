import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/common/header";
import Divider from "../components/common/Divider";
import Button from "../components/common/Button";
import recommendStore from "../store/RecommendStore";
import pdfResultStore from "../store/pdfResultStore";

const DISEASES = [
  {
    name: "체질량 지수",
    value: 90,
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
  const navigate = useNavigate();
  const [judges, setJudges] = useState({});

  const { setData } = recommendStore();
  const { pdfData } = pdfResultStore();
  const TEMPPDF = {
    체질량지수: "90",
    고혈압_수축기: "200",
    고혈압_이완기: "120",
    혈색소: "13",
    공복혈당: "100",
    "혈청 크레아티닌": "1.5",
    신사구체여과율: "60",
    "에이에스티(AST)": "40",
    "에이엘티(ALT)": "35",
    "감마지티피(γ-GTP)": "63",
  };

  useEffect(() => {
    const getJudges = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/judge`,
          TEMPPDF
        );
        console.log(res);
        setJudges(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    getJudges();
  }, []);

  const renderPdfResult = () =>
    Object.entries(pdfData).map(([key, value], idx) => (
      <div
        key={idx}
        className={`${idx % 2 == 0 ? "bg-[#a52a2a8c]" : "bg-[orange]"}`}
      >
        <p key={idx} className="flex justify-between py-1 mb-1 w-3/5 mx-auto">
          <span className="text-xl">{key}</span>
          <span className="text-xl">{value}</span>
        </p>
      </div>
    ));

  const sendData = () => {
    axios
      .post("http://localhost:4000/result", {})
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        navigate("/recommend");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const renderJudge = () =>
    judges &&
    Object.entries(judges).map(([jgIdx, jgValue], idx) => (
      <li key={idx} className="text-start font-bold h-10">
        {jgIdx} - {jgValue}
      </li>
    ));

  return (
    <>
      <Header />
      {console.log(pdfData)}
      <main className="px-3">
        <div className="mt-3 border border-[#EB757B] p-3 rounded-md">
          <p className="mb-5 text-2xl">검사 결과</p>
          <div>
            <ul className="list-disc list-inside grid grid-cols-2">
              {renderJudge()}
              {/* <li className="text-start font-bold h-10">체질량 지수 - 정상</li>
              <li className="text-start text-lg font-bold h-10">
                혈색소 - 비정상
              </li>
              <li className="text-start text-lg font-bold h-10">혈압 - 정상</li>
              <li className="text-start font-bold h-10">공복혈당 - 비정상</li>
              <li className="text-start text-lg font-bold h-10">혈압 - 정상</li>
              <li className="text-start font-bold h-10">공복혈당 - 비정상</li> */}
            </ul>
          </div>
        </div>

        <Divider />

        <div>
          <div className="max-w-3xl mx-auto mb-20">{renderPdfResult()}</div>
          <Button>수정하기</Button>
        </div>
        <Button onClick={sendData}>영양제 추천</Button>
      </main>
    </>
  );
}
export default Result;
