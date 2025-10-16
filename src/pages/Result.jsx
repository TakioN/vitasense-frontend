import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import Divider from "../components/common/Divider";
import Button from "../components/common/Button";
import useRecommendStore from "../store/useRecommendStore";
import usePdfResultStore from "../store/usePdfResultStore";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromHistory } = location.state || {};

  const [judges, setJudges] = useState({});
  const [isModifying, setIsModifying] = useState(false); // 수정 중 체크
  const [modified, setModified] = useState(false); // 데이터 수정 여부
  const [modifiedResult, setModifiedResult] = useState({});

  const { setRecData } = useRecommendStore();
  const { pdfData, setPdfData } = usePdfResultStore();

  useEffect(() => {
    setModifiedResult(pdfData);
    getJudges();
  }, []);

  const getJudges = async (modified) => {
    const body = modified ? modifiedResult : pdfData;
    try {
      // Fetch a judge results
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/judge`,
        body
      );
      console.log(res.data);
      setJudges(res.data);

      // uploadResultToDb(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const renderPdfResult = () =>
    Object.entries(pdfData).map(([key, value], idx) => (
      <div
        key={idx}
        className={`${idx % 2 == 0 ? "bg-[#a52a2a8c]" : "bg-[orange]"}`}
      >
        <p key={idx} className="flex justify-between py-1 mb-1 w-3/5 mx-auto">
          <span className="text-xl">{key}</span>
          {/* <span className="text-xl">{value}</span> */}
          {isModifying ? (
            <input
              type="text"
              className="w-15 border border-black"
              value={modifiedResult[key]}
              onChange={(e) => {
                setModifiedResult((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }));
              }}
            />
          ) : (
            <span className="text-xl">{value}</span>
          )}
        </p>
      </div>
    ));

  const uploadResultToDb = async () => {
    if (fromHistory && !modified) return;
    const db_res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/submitAll`,
      {
        result: pdfData,
        judge: judges,
      },
      {
        withCredentials: true,
      }
    );
    console.log(db_res);
  };

  const sendData = async () => {
    if (!judges) return;

    await uploadResultToDb();

    axios
      .post(`${import.meta.env.VITE_API_URL}/user/recommend`, {
        judges: { ...judges },
      })
      .then((res) => {
        console.log(res);
        setRecData(res.data.list);
        navigate("/recommend");
      })
      .catch((e) => {
        console.error(e);
      });
    // navigate("/recommend");
  };

  const renderJudge = () =>
    judges &&
    Object.entries(judges).map(([jgIdx, jgValue], idx) => (
      <li key={idx} className="text-start font-bold h-10">
        {jgIdx} - {jgValue}
      </li>
    ));

  const modifyComplete = async () => {
    setPdfData(modifiedResult);
    setIsModifying(false);
    setModified(true);
    await getJudges(modifiedResult);
  };

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
            </ul>
          </div>
        </div>

        <Divider />

        <div>
          <div className="max-w-3xl mx-auto mb-20">{renderPdfResult()}</div>
        </div>
        {isModifying ? (
          <Button
            onClick={async () => {
              await modifyComplete();
            }}
          >
            수정완료
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsModifying(true);
            }}
          >
            수정하기
          </Button>
        )}
        {!isModifying && <Button onClick={sendData}>영양제 추천</Button>}
      </main>
    </>
  );
}
export default Result;
