import arrow from "../../assets/images/arrow.svg";

function SignInHeader({ title }) {
  return (
    <header className="border-b border-gray-500 flex items-center justify-center py-3 relative">
      <img src={arrow} className="absolute left-5 size-6" />
      <span className="font-bold text-lg">{title}</span>
    </header>
  );
}

export default SignInHeader;
