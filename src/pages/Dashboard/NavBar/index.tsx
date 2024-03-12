import { SlMenu } from "react-icons/sl";
import { useContext } from "react";
import { SideDrawerContext } from "../../../Context/DashboardContext";
import { useGetUserByIdQuery } from "../../../features/api/apiSlice";
import Cookies from "js-cookie";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../../../Context/UserProfileContext";

const NavBar = () => {
  const { toggleSideBar, show_sidebar }: any = useContext(SideDrawerContext);
  const { toggleUserProfile }: any = useContext(UserProfileContext);
  const { data } = useGetUserByIdQuery(Cookies.get("user_id"));

  let greeting;

  let time: any = new Date();
  let hour: any = time.getHours();

  if (hour < 12) {
    greeting = "GoodMorning";
  } else if (hour < 18) {
    greeting = "GoodAfternoon";
  } else {
    greeting = "GoodEvening";
  }

  let user_name = data?.data.name.replace(/\b\w/g, function (l: any) {
    return l.toUpperCase();
  });

  return (
    <div
      className={
        show_sidebar
          ? "top-0 border px-12 pb-12 pt-8 bg-white fixed right-0 w-[40vw] md:w-[85vw] transition duration-500 ease-in-out"
          : "border w-full px-12 pb-12 pt-8  bg-white transition duration-500 ease-in-out "
      }
    >
      <div className="inset-0  w-full h-full absolute flex items-center justify-center">
        <div className="  absolute  left-4 ">
          {!show_sidebar && (
            <span onClick={toggleSideBar} className="text-xl">
              <SlMenu />
            </span>
          )}
        </div>
        <p className="font-semibold">
          {greeting}, <span className="text-xl">{user_name}</span>!
        </p>

        <div className=" flex flex-row justify-center items-center absolute right-4  gap-6 text-xl ">
          <Link
            to="/dashboard/notifications?activeTab=all"
            className="text-gray-600 hover:text-gray-800 relative"
          >
            <FaBell />
            <div className=" absolute top-0 right-0  h-2.5 w-2.5 rounded-full bg-orange-500"></div>
          </Link>
          <div
            onClick={toggleUserProfile}
            className="flex bg-gray-100 rounded-full shadow-md  w-8 h-8 items-center justify-center cursor-pointer hover:bg-gray-300 transition duration-500 ease-in-out"
          >
            <p className="text-sm font-semibold">
              {user_name?.charAt(0).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
