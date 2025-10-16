import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SignInHeader from "@/components/common/SignInHeader";
import request from "../apis/api";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [isCheckedId, setIsCheckedId] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    // id, 비밀번호 빈 값 체크
    if (!userId) return;
    if (!pwd) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/func/signup_process`,
        {
          username: userId,
          pwd,
        }
      );
      navigate("/sign-in");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const goToOnBoarding = () => {
    navigate("/");
  };

  const idCheck = () => {
    if (!userId) return;
    request
      .post("/func/check-id", {
        userName: userId,
      })
      .then(() => {
        alert("사용 가능한 ID입니다.");
        setIsCheckedId(true);
      })
      .catch((e) => {
        console.error(e);
        if (e.response.data.code === 2001) {
          alert("이미 존재하는 아이디입니다.");
        }
      });
  };

  // 패스워드 확인에 따른 문구 출력
  const isSamePwdCheck = () => {
    // 패스워드 확인을 하지 않은 경우 문구 출력 X
    if (!pwdCheck) return;

    return (
      <p
        className={`mt-1 text-sm font-bold ${
          pwd === pwdCheck ? "text-[limegreen]" : "text-[red]"
        }`}
      >
        {pwd === pwdCheck
          ? "✅비밀번호가 일치합니다."
          : "❌비밀번호가 일치하지 않습니다."}
      </p>
    );
  };

  return (
    <div>
      <SignInHeader title="회원가입" backFn={goToOnBoarding} />
      <main className="mx-3">
        <div className="mt-10 text-start flex flex-col gap-2">
          <p className="font-bold text-3xl">안녕하세요!</p>
          <p className="text-xl">비타센스 입니다.</p>
        </div>

        <div className="mt-10 text-start">
          <div className="flex flex-col mb-5">
            <span className="text-gray-500">아이디</span>
            <div className="border-b h-10 relative">
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력해주세요"
                className="h-full w-full focus:outline-none text-xl px-3 placeholder:text-sm"
              />

              <button
                className="bg-gray-500 absolute right-4 h-full rounded-md px-2 text-white cursor-pointer hover:bg-gray-700"
                onClick={idCheck}
              >
                중복확인
              </button>
            </div>
            {isCheckedId && (
              <p className="mt-1 text-sm font-bold text-[limegreen]">
                사용가능한 ID입니다.
              </p>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <span className="text-gray-500">비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="border-b h-10 focus:outline-none text-xl px-3 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={pwdCheck}
              onChange={(e) => setPwdCheck(e.target.value)}
              className="border-b h-10 focus:outline-none text-xl px-3 placeholder:text-sm"
            />
            {isSamePwdCheck()}
          </div>
        </div>

        <button
          className={`fixed bottom-5 left-0 right-0 mx-[10%] h-12 rounded-md font-bold text-lg ${
            userId && pwd && pwd === pwdCheck && isCheckedId
              ? "bg-[orange]"
              : "bg-[gray]"
          }`}
        >
          로그인
        </button>
      </main>
    </div>
  );
}

export default SignUp;
