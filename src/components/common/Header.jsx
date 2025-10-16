import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/images/logo.png";

const Profile = () => {
  const { userName, logout } = useAuthStore();

  const logOut = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/func/logout`);
      logout();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-2">
      <p className="flex items-center font-semibold text-lg">{userName}</p>
      <div
        className="bg-[#a1a1a1] size-10 rounded-[50%]"
        onClick={logOut}
      ></div>
    </div>
  );
};

function Header({ className }) {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <header
      className={`w-full p-2 relative border-b border-[#cecece] ${className}`}
    >
      <img src={logo} alt="logo" className="h-[3rem]" onClick={gotoHome} />
      <Profile className="bg-[#446133]" />
    </header>
  );
}

export default Header;
