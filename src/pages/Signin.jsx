import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import SignInHeader from "../components/common/SignInHeader";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuthStore();

  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  const signInHandler = async () => {
    if (!userId || !pwd) {
      alert("아이디와 패스워드를 입력해주세요");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/func/login_process`,
        { username: userId, pwd },
        {
          withCredentials: true,
        }
      );
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
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    //     <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
    //     <form>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 mb-2">아이디</label>
    //         <input
    //           type="text"
    //           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           placeholder="아이디를 입력하세요"
    //           value={userId}
    //           onChange={(e) => {
    //             setUserId(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label className="block text-gray-700 mb-2">비밀번호</label>
    //         <input
    //           type="password"
    //           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           placeholder="비밀번호를 입력하세요"
    //           value={pwd}
    //           onChange={(e) => {
    //             setPwd(e.target.value);
    //           }}
    //         />
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <button
    //           type="button"
    //           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
    //           onClick={signInHandler}
    //         >
    //           로그인
    //         </button>
    //         <button
    //           type="button"
    //           className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
    //           onClick={goToSignUp}
    //         >
    //           회원가입
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div>
      <SignInHeader title="로그인" />
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
