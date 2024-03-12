import { Outlet } from "react-router";
import BreadCrumb from "./BreadCrumb";
import Layout from "./Layout";
import Statistics from "./Statistics";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Dashboard = () => {
  const pathname: any = useLocation();

  return (
    <Layout>
      <div className="fixed top-0 w-full">
        <NavBar />
      </div>
      <BreadCrumb />

      <div className="pb-44 mb-44 h-screen">
        <div>
          {" "}
          {(pathname.pathname === "/dashboard" ||
            pathname.pathname === "/dashboard/") && <Statistics />}
        </div>{" "}
        <Outlet />
      </div>
    </Layout>
  );
};

export default Dashboard;
