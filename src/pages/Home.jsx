import { useEffect } from "react";

import Header from "../components/common/Header";
import Button from "../components/common/Button";
import useAuthStore from "../store/useAuthStore";

import PdfUploader from "../components/home/PdfUploader";
import request from "../apis/api";

function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (isLoggedIn) return;
    else {
      getUser();
    }
  }, [isLoggedIn]);

  const getUser = async () => {
    const res = await request.get("/auth/profile");
    login(res.data.userName);
  };

  return (
    <>
      <Header />
      <main className="px-3">
        <p className="font-bold text-2xl md:text-3xl my-10">
          건강검진 결과를 업로드하세요
        </p>
        <p className="md:text-xl text-gray-500 font-semibold">
          pdf파일을 업로드하면 분석 후에
        </p>
        <p className="md:text-xl text-gray-500 font-semibold mb-10">
          맞춤 영양제를 추천해드립니다
        </p>

        <PdfUploader />
      </main>
    </>
  );
}

export default Home;
