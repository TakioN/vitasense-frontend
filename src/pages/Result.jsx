import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/common/header";
import Divider from "../components/common/Divider";
import Button from "../components/common/Button";
import recommendStore from "../store/RecommendStore";
import pdfResultStore from "../store/pdfResultStore";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { submit } = location.state || {};
  const [judges, setJudges] = useState({});

  const { setRecData } = recommendStore();
  const { pdfData } = pdfResultStore();
  // const TEMPPDF = {
  //   체질량지수: "90",
  //   고혈압_수축기: "200",
  //   고혈압_이완기: "120",
  //   혈색소: "13",
  //   공복혈당: "100",
  //   "혈청 크레아티닌": "1.5",
  //   신사구체여과율: "60",
  //   "에이에스티(AST)": "40",
  //   "에이엘티(ALT)": "35",
  //   "감마지티피(γ-GTP)": "63",
  // };

  useEffect(() => {
    const getJudges = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/judge`,
          pdfData
        );
        console.log(res);
        setJudges(res.data);
        if (!submit) {
          const db_res = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/submitAll`,
            {
              result: pdfData,
              judge: res.data,
            },
            {
              withCredentials: true,
            }
          );
          console.log(db_res);
        }
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
    // axios
    //   .post(`${import.meta.env.VITE_API_URL}/user/recommend`, {})
    //   .then((res) => {
    //     console.log(res);
    //     setRecData(res.data.data);
    //     navigate("/recommend");
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    navigate("/recommend");
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
