import logo from "@/assets/images/logo.png";

const Profile = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-2">
      <p className="flex items-center font-semibold text-lg">UserName</p>
      <div className="bg-[#a1a1a1] size-10 rounded-[50%]"></div>
    </div>
  );
};

function Header({ className }) {
  return (
    <header
      className={`w-full p-2 relative border-b border-[#cecece] ${className}`}
    >
      <img src={logo} alt="logo" className="h-[3rem]" />
      <Profile className="bg-[#446133]" />
    </header>
  );
}

export default Header;
