import AllNotifications from "./AllNotifications";
import AdminNotifications from "./AdminNotifications";
import { useNavigate, useSearchParams } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const handleAdminNotificationsTab = () => {
    navigate(`/dashboard/notifications?activeTab=admin`);
  };
  const handleAllNotificationsTab = () => {
    navigate(`/dashboard/notifications?activeTab=all`);
  };

  return (
    <div>
      {" "}
      <div className="flex flex-row items-center justify-end w-full p-4 ">
        <div className="flex flex-row gap-4 cursor-pointer bg-primary/10 rounded-md pt-2 px-2">
          <p
            onClick={handleAllNotificationsTab}
            className={` ${
              searchParams.get("activeTab") === "all"
                ? "border-b-4 border-primary"
                : ""
            }`}
          >
            All
          </p>
          |
          <p
            onClick={handleAdminNotificationsTab}
            className={` ${
              searchParams.get("activeTab") === "admin"
                ? "border-b-4 border-primary"
                : ""
            }`}
          >
            Admin{" "}
          </p>
        </div>
      </div>
      {searchParams.get("activeTab") === "all" && <AllNotifications />}
      {searchParams.get("activeTab") === "admin" && <AdminNotifications />}
    </div>
  );
};

export default Notifications;
