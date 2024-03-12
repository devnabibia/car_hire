import generateNavItems from "./NavItems";
import { useState, useEffect } from "react";
import { Item } from "./NavItems";
import Logo from "../Logo";
import MenuIcon from "../MenuIcon";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../utils/responsive";
import MobileMenu from "./MobileMenu";
import Button from "../Button";
import { NavLink } from "react-router-dom";
import { AuthModalContext } from "../../Context/AuthModalToggleContext";
import { useContext } from "react";
const NavBar = () => {
  const [nav_items, setNavItems] = useState<Item[]>([]);
  const [activeMenu, setActiveMenu] = useState<Boolean>(false);
  const [scrollThreshold, setScrollThreshold] = useState<Boolean>(false);

  const { toggleAuthModal }: any = useContext(AuthModalContext);

  //checks for when scrolled 100px on y-axis

  const handleThresholdChange = () => {
    if (window.scrollY > 20) {
      setScrollThreshold(true);
    } else {
      setScrollThreshold(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleThresholdChange);
  }, [handleThresholdChange]);

  useEffect(() => {
    setNavItems(generateNavItems());
  }, []);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  return (
    <>
      {activeMenu && isMobile && <MobileMenu setActiveMenu={setActiveMenu} />}
      <nav
        className={` ${
          scrollThreshold ? "border bg-white  " : ""
        } w-full fixed   px-4  top-0  z-40 transition duration-700 ease-in-out border `}
      >
        <div className="flex flex-row   py-8  mx-auto justify-between items-center  max-w-7xl  ">
          <Logo theme="dark" />
          {isMobile ? (
            <>
              <MenuIcon variant="open" setActiveMenu={setActiveMenu} />
            </>
          ) : (
            <ul className="flex flex-row gap-9  items-center justify-center ">
              {nav_items.map((item: Item) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      [item.styles, isActive ? "bg-primary/10" : null]
                        .filter(Boolean)
                        .join(" ")
                    }
                    to={item.href}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </ul>
          )}
          <div className=" hidden  md:flex gap-4 flex-col md:flex-row">
            <Button
              theme="filled"
              text="SigIn"
              onClick={toggleAuthModal}
            ></Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
