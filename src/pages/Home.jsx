import { useRef } from "react";
import Header from "../components/common/header";

import pdfImg from "@/assets/images/pdf.svg";
import Button from "../components/common/Button";

function Home() {
  const fileInputRef = useRef();

  const handleFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
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
        <Button>마이페이지</Button>
      </main>
    </>
  );
}

export default Home;
