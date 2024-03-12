import { FaUserCircle } from "react-icons/fa";
import Logo from "../../../components/Logo";
import { SlArrowLeft } from "react-icons/sl";
import { FaGear, FaMoneyBill, FaUserPlus } from "react-icons/fa6";
import { IoCarSport, IoPeople } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SideDrawerContext } from "../../../Context/DashboardContext";
import { FcStatistics } from "react-icons/fc";
import {
  useGetUserByIdQuery,
  useLoginUserMutation,
} from "../../../features/api/apiSlice";
import Cookies from "js-cookie";
import { Spinner } from "../../../components/Loaders";
import { NavItems } from "./SideDrawerNavItems";

const SideDrawer = () => {
  const { show_sidebar, toggleSideBar }: any = useContext(SideDrawerContext);
  const [logoutUser] = useLoginUserMutation();
  const { data, isLoading } = useGetUserByIdQuery(Cookies.get("user_id"));

  const logout = () => {
    logoutUser;
    Cookies.remove("token");
  };

  let user_name = data?.data.name.replace(/\b\w/g, function (l: any) {
    return l.toUpperCase();
  });

  console.log(NavItems);
  return (
    <>
      {show_sidebar && (
        <section className="bg-primary h-screen left-0 top-0 fixed -z-10 w-[60vw] md:w-[15vw] transition-all duration-700 ease-in-out">
          <div className="flex flex-col gap-8 py-12 ">
            <div className="flex flex-row justify-between items-center mx-6">
              <Logo theme="white" />
              <span onClick={toggleSideBar} className="text-gray-500">
                <SlArrowLeft />
              </span>
            </div>
            <hr className="border-gray-700"></hr>
            <div className="flex flex-col gap-2  items-center">
              <span className="text-gray-500 text-5xl">
                <FaUserCircle />
              </span>
              {data?.data && !isLoading && (
                <div className="">
                  <div className="text-gray-200 ">
                    <h2>{user_name}</h2>
                    <p className="text-sm ">{data?.data.email}</p>
                  </div>
                </div>
              )}
              {isLoading && <Spinner color="white" height={10} width={3} />}
            </div>
            <hr className="border-gray-700"></hr>

            <div className="flex flex-col mx-6 justify-between gap-6 ">
              {NavItems.map((nav_item: any) => {
                return (
                  <NavLink to={nav_item.href} className={nav_item.className}>
                    <span className="text-gray-200 text-xl">
                      <nav_item.linkIcon />
                    </span>{" "}
                    {nav_item.name}
                  </NavLink>
                );
              })}
            </div>
            <hr className="border-gray-700"></hr>
            <div className="flex flex-col mx-6 justify-between gap-6 ">
              <div
                onClick={logout}
                className="flex cursor-pointer flex-row items-center gap-4 text-gray-200"
              >
                <span className="text-gray-200">
                  <CiLogout />
                </span>
                <h2>Logout</h2>
              </div>
              <div className="flex flex-row items-center gap-4 text-gray-200">
                <NavLink to="/">Back To HomePage</NavLink>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SideDrawer;
