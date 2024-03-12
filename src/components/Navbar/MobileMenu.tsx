import generateNavItems from "./NavItems";
import { useState, useEffect } from "react";
import { Item } from "./NavItems";
import MenuIcon from "../MenuIcon";
import Button from "../Button";
import { AuthModalContext } from "../../Context/AuthModalToggleContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setActiveMenu: React.Dispatch<React.SetStateAction<Boolean>>;
}
const MobileMenu: React.FC<Props> = ({ setActiveMenu }) => {
  const { toggleAuthModal }: any = useContext(AuthModalContext);
  const [nav_items, setNavItems] = useState<Item[]>([]);

  useEffect(() => {
    setNavItems(generateNavItems());
  }, []);

  const navigate = useNavigate();

  const handleNavItemClick = (href: string) => {
    navigate({
      pathname: `${href}`,
      search: `${
        href === "/all-vihicles-by-params"
          ? "?car_name=&car_type=&transmission_type=&min_price=&max_price="
          : ""
      }`,
    });
  };

  return (
    <div className=" fixed top-0 flex items-center justify-center z-50 min-h-screen w-full   bg-primary/5 backdrop-blur-xl ">
      <MenuIcon variant="close" setActiveMenu={setActiveMenu} />

      <div className="flex flex-col gap-9  ">
        {nav_items.map((item: Item) => {
          return (
            <div
              className={item.styles}
              key={item.name}
              onClick={() => handleNavItemClick(item.href)}
            >
              {item.name}
            </div>
          );
        })}
        <div className=" flex flex-col gap-4 mt-12 w-full">
          <Button
            theme="filled"
            text="SignIn"
            onClick={toggleAuthModal}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
