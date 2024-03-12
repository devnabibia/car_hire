import Revenue from "./Revenue";
import AvailableVihicles from "./AvailableVihicles";
import SystemUsers from "./SystemUsers";
import Subscriptions from "./Subscriptions";
import ChartStatistics from "./ChartStatistics";
import DashboardNotifications from "./Notifications";
import DashboardPartners from "./Partners";

const Statistics = () => {
  return (
    <>
      <div className="grid max-w-7xl mx-auto grid-cols-1  gap-12 md:grid-cols-3 md:gap-6 px-2    ">
        <Revenue />
        <AvailableVihicles />
        <SystemUsers />
        <Subscriptions />
        <DashboardNotifications />
        <DashboardPartners />
      </div>
      <div className="mt-6">
        <ChartStatistics />
      </div>
    </>
  );
};

export default Statistics;
