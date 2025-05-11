import Header from "../components/common/header";

import omega3 from "@/assets/images/omega3.png";

const RECOMMEND = [
  {
    name: "오메가-3",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    name: "비타민-B12",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
];

function Recommend() {
  const renderRecommend = () =>
    RECOMMEND.map((re, idx) => (
      <div key={idx} className="bg-[#eeeeee] rounded-md px-3 py-5 mb-10">
        <p className="font-bold text-xl text-start mb-5">{re.name}</p>
        <p className="text-start mb-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
        <img src={omega3} alt="omega3" className="inline-block text-center" />
      </div>
    ));
  return (
    <>
      <Header />
      <main className="px-3">
        <p className="text-start my-7 font-bold text-2xl">영양제 추천</p>
        <div>{renderRecommend()}</div>
      </main>
    </>
  );
}

export default Recommend;
