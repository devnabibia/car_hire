import React from "react";
import SideDrawer from "../SideDrawer";
import { useContext } from "react";
import { SideDrawerContext } from "../../../Context/DashboardContext";
import UserProfile from "../NavBar/UserProfile";
import { UserProfileContext } from "../../../Context/UserProfileContext";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { show_sidebar }: any = useContext(SideDrawerContext);
  const { isUserProfileOpen }: any = useContext(UserProfileContext);
  return (
    <main>
      <SideDrawer />
      <section
        className={
          show_sidebar
            ? "mt-[5rem] py-24 bg-cream_bg  bg-repeat   h-screen overflow-y-scroll w-[40vw] md:w-[85vw] fixed right-0   "
            : "mt-[5rem] pt-24 bg-cream_bg  bg-repeat  w-full h-screen overflow-y-scroll"
        }
      >
        {children}
      </section>
      {isUserProfileOpen && <UserProfile />}
    </main>
  );
};

export default Layout;
