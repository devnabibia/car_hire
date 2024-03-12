import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Spinner } from "../../../../components/Loaders";
import {
  useGetAllRequestCallBackQuery,
  useGetRequestCallBackByIdQuery,
} from "../../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import { rtkErrors } from "../../../../utils/rtkErrors";
import Cookies from "js-cookie";

const DashboardNotifications = () => {
  const agent_id: any = Cookies.get("user_id");
  const [allNotifications, setAllNotifications] = useState<number>(0);
  const [partnersNotifications, setPartnersNotifications] = useState<number>(0);
  const [adminNotifications, setAdminNotifications] = useState<number>(0);

  const { isLoading, error, data } = useGetAllRequestCallBackQuery({
    page: "",
    q: "",
    limit: "",
  });

  const { data: admin_data } = useGetRequestCallBackByIdQuery({
    agent_id: agent_id,
    page: "",
    q: "",
    limit: "",
  });

  useEffect(() => {
    if (!data && !admin_data) return;
    setAllNotifications(data?.msg[0].totalDocs);
    setAdminNotifications(admin_data?.msg[0].totalDocs);
    setPartnersNotifications(
      data?.msg[0].totalDocs - admin_data?.msg[0].totalDocs
    );
  }, [data, admin_data]);

  return (
    <Link
      to="/dashboard/notifications?activeTab=all"
      className=" flex flex-col justify-center w-full hover:shadow-lg  bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col  h-full justify-center gap-4  p-4 ">
        <div className="flex justify-start items-start ">
          {" "}
          <div className="  bg-primary bg-opacity-10 p-3  text-center text-xl rounded-full text-primary ">
            {" "}
            <FaBell className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end ">
          <div className="flex items-start flex-col  w-full">
            <div className="font-bold text-4xl">
              <div className="font-semibold text-4xl text-left">
                {data ? (
                  data && allNotifications
                ) : error ? (
                  <div className="text-sm font-medium text-gray-700">
                    {rtkErrors(error)}
                  </div>
                ) : isLoading ? (
                  <Spinner height={10} width={4} />
                ) : (
                  ""
                )}
              </div>
              <div className="text-gray-400 text-left text-sm font-medium">
                Notifications
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-end w-full  ">
            <div>
              <label className="text-sm mr-2 text-gray-500">
                Partners Ntfns:
              </label>
              <span className="font-medium">{partnersNotifications}</span>
            </div>
            <div>
              <label className="text-sm mr-2 text-gray-500">
                Admin Ntfns::
              </label>
              <span className="font-medium">{adminNotifications}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardNotifications;
