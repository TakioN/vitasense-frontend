import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">아이디</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              로그인
            </button>
            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={goToSignUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
