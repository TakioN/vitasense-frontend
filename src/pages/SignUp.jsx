import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          회원가입
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          이미 계정이 있으신가요?{" "}
          <a href="/sign-in" className="text-blue-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
