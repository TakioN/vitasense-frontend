import useRecommendStore from "../store/useRecommendStore";
import Header from "../components/common/Header";

import pill from "@/assets/images/pill.svg";
import warning from "@/assets/images/warning.svg";

function Recommend() {
  const { recData } = useRecommendStore();

  // const [recDataState, setRecDataState] = useState(recData);

  const renderRecommend = () =>
    recData.map((re, idx) => (
      // RECOMMEND.map((re, idx) => (
      <div key={idx} className="border rounded-md px-3 py-5 mb-10">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-5">
          {re.image_url && (
            <img
              src={re.image_url}
              className="inline-block text-center md:max-w-[20vw] rounded-md"
            />
          )}
          <div className="text-start">
            <p className="font-bold text-xl text-start mb-2">{re.item_name}</p>
            <span className="font-bold">효능</span>
            <p className="text-start mb-5 mt-1">{re.efficacy}</p>
            <span className="font-bold">복용법</span>
            <p className="text-start mt-1">{re.how_to_use}</p>
          </div>
        </div>

        <div className="bg-[yellow] border border-[#fee685] bg-amber-50 rounded-md text-start p-4 mb-3">
          <div className="flex gap-3">
            <img src={warning} />
            <span className="font-bold text-amber-800">주의사항</span>
          </div>
          <p className="text-amber-700 font-medium ml-9">{re.warning}</p>
        </div>

        <div className="border border-gray-200 bg-gray-50 rounded-md text-start p-4">
          <span className="font-bold">부작용</span>
          <p>{re.side_effect}</p>
        </div>

        {/* <p className="font-bold text-xl text-start mb-5">{re.item_name}</p>
        <p className="text-start mb-5">효능 : {re.efficacy}</p>
        <p className="text-start mb-5">복용법 : {re.how_to_use}</p> */}
        {/* <p className="text-start mb-5">주의사항 : {re.warning}</p> */}
        {/* <p className="text-start mb-5">부작용 : </p> */}
      </div>
    ));
  return (
    <>
      <Header />
      <main className="px-3">
        <div className="mb-8">
          <p className="text-start mt-7 font-bold text-2xl flex gap-2 mb-1">
            <img src={pill} />
            맞춤 영양제 추천
          </p>
          <p className="text-start text-sm text-gray-700">
            건강검진 결과를 기반으로 추천된 영양제입니다
          </p>
        </div>

        <div>{renderRecommend()}</div>
      </main>
    </>
  );
}

export default Recommend;
