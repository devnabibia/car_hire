import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa6";

interface LogoProps {
  theme: "dark" | "white";
}
const Logo: React.FC<LogoProps> = ({ theme }) => {
  return (
    <Link to="/" className="flex flex-row items-center justify-center gap-2">
      <span
        className={`${
          theme === "dark"
            ? "text-2xl p-2 rounded-full bg-black/10 "
            : "text-2xl p-2 rounded-full bg-gray-100 "
        }`}
      >
        <FaCar />
      </span>
      <p
        className={`${
          theme === "dark"
            ? "font-bold text-xl text-black"
            : "font-bold text-xl text-white"
        }`}
      >
        Car Hire™
      </p>
    </Link>
  );
};

export default Logo;
