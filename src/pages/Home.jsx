import { useRef } from "react";
import Header from "../components/common/header";

import pdfImg from "@/assets/images/pdf.svg";

function Home() {
  const fileInputRef = useRef();

  const handleFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Header />
      <main className="px-3">
        <p className="text-start font-bold text-xl py-10">
          이정빈님 안녕하세요
        </p>
        <div className="flex flex-col justify-center items-center border border-[#EB757B] bg-[#eeeeee] aspect-square rounded-md mb-20">
          <img src={pdfImg} alt="pdf" className="size-25 mb-10" />
          <div>
            <input type="file" ref={fileInputRef} className="hidden" />
            <button
              className="text-2xl border border-black p-2 rounded-md"
              onClick={handleFileSelector}
            >
              파일 찾아보기
            </button>
          </div>
        </div>
        <button className="w-4/5 rounded-md h-15 text-2xl font-bold text-white bg-[#275D7A] mb-10">
          마이페이지
        </button>
      </main>
    </div>
  );
}

export default Home;
