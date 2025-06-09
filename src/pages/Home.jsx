import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/common/Header";
import pdfImg from "@/assets/images/pdf.svg";
import Button from "../components/common/Button";
import pdfResultStore from "../store/pdfResultStore";

function Home() {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { setpdfData } = pdfResultStore();

  const [pdfFile, setPdfFile] = useState(null);

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelector = (e) => {
    console.log(e.target.files[0]);
    setPdfFile(e.target.files[0]);
  };

  const sendPdfFile = async () => {
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/result`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(res.data);
      setpdfData(res.data);

      navigate("/user-setting");
    } catch (e) {
      console.log(e);
    }
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
            <input
              type="file"
              name="pdfFile"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelector}
            />
            {pdfFile ? (
              <>
                <p className="mb-5">{pdfFile.name}</p>
                <div className="flex gap-3">
                  <button
                    className="text-2xl border border-black p-2 rounded-md"
                    onClick={openFileSelector}
                  >
                    파일 찾아보기
                  </button>
                  <button
                    className="text-2xl border border-black p-2 rounded-md"
                    onClick={sendPdfFile}
                  >
                    파일 업로드
                  </button>
                </div>
              </>
            ) : (
              <button
                className="text-2xl border border-black p-2 rounded-md"
                onClick={openFileSelector}
              >
                파일 찾아보기
              </button>
            )}
          </div>
        </div>
        <Button>마이페이지</Button>
      </main>
    </>
  );
}

export default Home;
