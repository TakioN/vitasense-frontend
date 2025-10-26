import Button from "../common/Button";
import usePdfResultStore from "../../store/usePdfResultStore";

export const ModifyingButtons = (setIsModifying, setModified) => {
  const { pdfData, setPdfData } = usePdfResultStore();
  const getJudges = async (modified) => {
    const body = modified ? modifiedResult : pdfData;
    try {
      // Fetch a judge results
      const res = await request.post("/report/evaluate", body);
      console.log(res.data);
      setJudges(res.data);

      // uploadResultToDb(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const modifyComplete = async () => {
    setPdfData(modifiedResult);
    setIsModifying(false);
    setModified(true);
    await getJudges(modifiedResult);
  };

  return (
    <div>
      <Button
        onClick={async () => {
          await modifyComplete();
        }}
      >
        수정완료
      </Button>
    </div>
  );
};

export const NotModifyingButtons = () => {
  return (
    <div>
      <Button
        onClick={() => {
          setIsModifying(true);
        }}
      >
        수정하기
      </Button>
      <Button onClick={sendData}>영양제 추천</Button>
    </div>
  );
};
