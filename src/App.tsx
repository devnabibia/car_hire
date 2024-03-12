import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import ErrorElement from "./components/ErrorElement";

import CarDetailsPage from "./pages/CarDetailsPage";
import Catalogue from "./pages/AllVihicles";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Vihicles from "./pages/Dashboard/Vihicles";
import Statistics from "./pages/Dashboard/Statistics";
import Subscriptions from "./pages/Dashboard/Subscriptions";
import SystemUsers from "./pages/Dashboard/SystemUsers";
import Partners from "./pages/Dashboard/Partners";
import UserDetails from "./pages/Dashboard/UserDetails";
import Settings from "./pages/Dashboard/Settings";
import VihicleDetails from "./pages/Dashboard/VihicleDetails";
import Notifications from "./pages/Dashboard/Notifications";
import Billing from "./pages/Dashboard/Billing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/cars",
    element: <Catalogue />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/about-us",
    element: <About />,
    errorElement: <ErrorElement />,
  },

  {
    path: "/car-details/:Id",
    element: <CarDetailsPage />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/vihicles",
        element: <Vihicles />,
      },
      {
        path: "/dashboard/statistics",
        element: <Statistics />,
      },
      {
        path: "/dashboard/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/dashboard/partners",
        element: <Partners />,
      },
      {
        path: "/dashboard/system-users",
        element: <SystemUsers />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/system-users/user-details/:id",
        element: <UserDetails />,
      },
      {
        path: "/dashboard/vihicles/:id",
        element: <VihicleDetails />,
      },
      {
        path: "/dashboard/notifications",
        element: <Notifications />,
      },
      {
        path: "/dashboard/billing",
        element: <Billing />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
