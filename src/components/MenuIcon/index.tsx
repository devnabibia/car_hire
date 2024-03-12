import React from "react";
interface MenuProps {
  variant?: "close" | "open";

  setActiveMenu: React.Dispatch<React.SetStateAction<Boolean>>;
}

const MenuIcon: React.FC<MenuProps> = ({ setActiveMenu, variant }) => {
  const handleOnclickMenu = () => {
    setActiveMenu((prev) => !prev);
  };
  const Menu =
    variant === "open" ? (
      <div
        onClick={handleOnclickMenu}
        className=" w-9 flex flex-col gap-1 items-center justify-center ease-in-out transition-all duration-300"
      >
        <span className="w-full py-0.5 bg-gray-900 rounded-full"></span>
        <span className="w-full py-0.5 bg-gray-900 rounded-full"></span>
        <span className="w-full py-0.5 bg-gray-900 rounded-full"></span>
      </div>
    ) : (
      <div
        onClick={handleOnclickMenu}
        className=" w-9 h-9  absolute right-4 top-8 flex flex-col items-center justify-center   ease-in-out transition-all duration-300"
      >
        <span className="w-full py-0.5 rotate-45 absolute bg-gray-900 rounded-full"></span>

        <span className="w-full py-0.5 bg-gray-900 -rotate-45 absolute rounded-full"></span>
      </div>
    );

  return Menu;
};

export default MenuIcon;
