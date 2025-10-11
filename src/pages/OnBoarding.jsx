import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_t.png";

function OnBoarding() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/sign-in");
  };
  return (
    <div className="bg-gradient-to-b from-orange-300 via-orange-200 to-pink-300 h-[60dvh] w-full">
      <div className="flex justify-center flex-col items-center pt-20">
        <img src={logo} className="w-4/5" />
        <p className="text-2xl mt-8">간편하게 로그인하고</p>
        <p className="font-bold text-2xl mt-1">영양제 조합을 확인해보세요</p>
      </div>

      <div className="h-[50dvh] bg-white fixed bottom-0 w-full rounded-t-3xl">
        <div className="flex flex-col h-full items-center justify-center gap-7">
          <button className="bg-[#E2B254] w-4/5 max-w-[540px] py-2 rounded-3xl font-bold cursor-pointer">
            회원가입
          </button>
          <button
            className="bg-[#E2B254] w-4/5 max-w-[540px] py-2 rounded-3xl font-bold cursor-pointer"
            onClick={goToSignIn}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding;
