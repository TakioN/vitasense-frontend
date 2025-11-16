import request from "../apis/api";

import logo from "../assets/images/logo_t.png";
import kakaoLogin from "@/assets/images/kakao_login.png";

function OnBoarding() {
  const signInHandler = async () => {
    try {
      const res = await request.get("/");
      console.log(res.data.redirect);
      window.location.href = res.data.redirect;
    } catch (e) {
      console.error(e);
      if (e.response.data.code === 1001) {
        alert("로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-300 via-orange-200 to-pink-300 h-[60dvh] w-full">
      <div className="flex justify-center flex-col items-center pt-20">
        <img src={logo} className="w-4/5" />
        <p className="text-2xl mt-8">간편하게 로그인하고</p>
        <p className="font-bold text-2xl mt-1">영양제 조합을 확인해보세요</p>
      </div>

      <div className="h-[50dvh] bg-white fixed bottom-0 rounded-t-3xl w-full max-w-[1280px] px-4 mt-3">
        <img
          src={kakaoLogin}
          onClick={signInHandler}
          className="absolute top-1/2 left-1/2 -translate-1/2 w-4/5 md:w-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default OnBoarding;
