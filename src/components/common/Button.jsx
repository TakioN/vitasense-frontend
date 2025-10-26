import { cn } from "@/utils/cn";

function Button({ children, onClick, className }) {
  return (
    <button
      className={cn(
        "w-4/5 rounded-md h-15 text-2xl font-bold text-white bg-[#275D7A] mb-10 max-w-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
