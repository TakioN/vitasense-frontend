import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import SignInHeader from "../components/common/SignInHeader";
import request from "../apis/api";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuthStore();

  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");

  const goToOnBoarding = () => {
    navigate("/");
  };

  const signInHandler = async () => {
    if (!userId || !pwd) {
      alert("아이디와 패스워드를 입력해주세요");
      return;
    }
    try {
      const res = await request.post("/func/login_process", {
        username: userId,
        pwd,
      });
      console.log(res);
      login(res.data.userName);
      const from = location.state?.from?.pathname || "/";
      console.log(from);
      navigate(from, { replace: true });
    } catch (e) {
      console.error(e);
      if (e.response.data.code === 1001) {
        alert("존재하지 않는 ID입니다.");
      }
      if (e.response.data.code === 1002) {
        alert("비밀번호가 일치하지 않습니다");
      }
    }
  };

  return (
    <div>
      <SignInHeader title="로그인" backFn={goToOnBoarding} />
      <main className="mx-3">
        <div className="mt-10 text-start flex flex-col gap-2">
          <p className="font-bold text-3xl">안녕하세요!</p>
          <p className="text-xl">비타센스 입니다.</p>
        </div>

        <div className="mt-10 text-start">
          <div className="flex flex-col mb-5">
            <span className="text-gray-500">아이디</span>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="border-b h-10 focus:outline-none text-xl px-3 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="border-b h-10 focus:outline-none text-xl px-3 placeholder:text-sm"
            />
          </div>
        </div>

        <button
          className={`fixed bottom-5 left-0 right-0 mx-[10%] h-12 rounded-md font-bold text-lg ${
            userId && pwd ? "bg-[orange]" : "bg-[gray]"
          }`}
          onClick={signInHandler}
        >
          로그인
        </button>
      </main>
    </div>
  );
}

export default SignIn;
