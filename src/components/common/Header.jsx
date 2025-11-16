import { useNavigate } from "react-router-dom";
import { useState } from "react";

import request from "../../apis/api";
import useAuthStore from "../../store/useAuthStore";

import logo from "@/assets/images/logo.png";
import userProfile from "@/assets/images/user-profile.svg";
import person from "@/assets/images/person.svg";
import logoutImg from "@/assets/images/logout.svg";

const Profile = () => {
  const navigate = useNavigate();

  const { userName, logout } = useAuthStore();

  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);

  const logOut = async () => {
    try {
      await request.post("/auth/logout");
      logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-2 items-center cursor-pointer"
      onClick={() => setIsVisibleDropDown((prev) => !prev)}
    >
      <img className="size-10 rounded-[50%]" src={userProfile} />
      <p className="flex items-center font-semibold text-lg">{userName}</p>
      <span className="">▼</span>

      {isVisibleDropDown && (
        <div className="bg-white absolute right-0 top-1/1 border border-gray-400 rounded-md px-4 py-2 min-w-[145px]">
          <ul>
            <li
              className="flex items-center mb-2 gap-2 font-semibold"
              onClick={() => navigate("/health-score")}
            >
              <img src={person} />
              건강점수
            </li>
            <li
              className="flex items-center mb-2 gap-2 font-semibold text-[red]"
              onClick={logOut}
            >
              <img src={logoutImg} />
              로그아웃
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

function Header({ className }) {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/home");
  };

  return (
    <header
      className={`w-full p-2 relative border-b border-[#cecece] ${className}`}
    >
      <img
        src={logo}
        alt="logo"
        className="h-[3rem] cursor-pointer"
        onClick={gotoHome}
      />
      <Profile className="bg-[#446133]" />
    </header>
  );
}

export default Header;
