import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import request from "../../apis/api";
import usePdfResultStore from "../../store/usePdfResultStore";

import upload from "@/assets/images/upload.svg";

function PdfUploader() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const { setPdfData } = usePdfResultStore();
  const [pdfFile, setPdfFile] = useState(null);

  const sendPdfFile = async () => {
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await request.post("/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setPdfData(res.data);

      navigate("/user-setting");
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileSelector = (e) => {
    console.log(e.target.files[0]);
    setPdfFile(e.target.files[0]);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 bg-[#eeeeee] aspect-square md:aspect-3/2 rounded-md mb-20">
      <div className="bg-white rounded-full size-20 xs:size-30 flex items-center justify-center mb-10">
        <img src={upload} alt="pdf" className="size-15 xs:size-25" />
      </div>

      <div className="flex flex-col gap-4 mb-10">
        <p className="font-bold text-xl">pdf 파일을 업로드하세요</p>
        <p className="text-gray-500">건강검진 결과서 pdf만 업로드 가능합니다</p>
      </div>

      <div>
        <input
          type="file"
          name="pdfFile"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelector}
          accept="application/pdf"
        />
        {pdfFile ? (
          <>
            <p className="mb-5">{pdfFile.name}</p>
            <div className="flex gap-3">
              <button
                className="text-xl px-4 py-2 rounded-md cursor-pointer bg-[var(--main-1)] font-semibold hover:bg-[#c69a44]"
                onClick={openFileSelector}
              >
                파일 찾아보기
              </button>
              <button
                className="text-xl px-4 py-2 rounded-md cursor-pointer bg-[var(--main-1)] font-semibold hover:bg-[#c69a44]"
                onClick={sendPdfFile}
              >
                파일 업로드
              </button>
            </div>
          </>
        ) : (
          <button
            className="text-xl px-4 py-2 rounded-md cursor-pointer bg-[var(--main-1)] font-semibold hover:bg-[#c69a44]"
            onClick={openFileSelector}
          >
            파일 찾아보기
          </button>
        )}
      </div>
    </div>
  );
}

export default PdfUploader;
