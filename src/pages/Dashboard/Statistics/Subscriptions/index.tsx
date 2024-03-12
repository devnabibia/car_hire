import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Spinner } from "../../../../components/Loaders";
import { useGetAllsubscriptionsQuery } from "../../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import { rtkErrors } from "../../../../utils/rtkErrors";

const Subscriptions = () => {
  const [activeSubs, setActiveSubs] = useState<number>(0);
  const [inactiveSubs, setInActiveSubs] = useState<number>(0);

  const { isLoading, error, data } = useGetAllsubscriptionsQuery({
    status: "",
    q: "",
    page: "",
    limit: "",
  });

  const { data: active_subs_data } = useGetAllsubscriptionsQuery({
    status: "Active",
    q: "",
    page: "",
    limit: "",
  });

  useEffect(() => {
    if (!data && !active_subs_data) return;
    setActiveSubs(active_subs_data?.data[0].tatalDocs);

    setInActiveSubs(
      data?.data[0].tatalDocs - active_subs_data?.data[0].tatalDocs
    );
  }, [data, active_subs_data]);

  return (
    <Link
      to="/dashboard/subscriptions"
      className=" flex flex-col justify-center w-full hover:shadow-lg  bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col  h-full justify-center gap-4  p-4 ">
        <div className="flex justify-start items-start ">
          {" "}
          <div className="  bg-primary bg-opacity-10 p-3  text-center text-xl rounded-full text-primary ">
            {" "}
            <FaUserPlus className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end ">
          <div className="flex items-start flex-col  w-full">
            <div className="font-bold text-4xl">
              <div className="font-semibold text-4xl text-left">
                {data ? (
                  data && data?.data[0].tatalDocs
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
                Subscriptions
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-end  ">
            <div>
              <label className="text-sm mr-2 text-gray-500">Active:</label>
              <span className="font-medium">{activeSubs}</span>
            </div>
            <div>
              <label className="text-sm mr-2 text-gray-500">InActive:</label>
              <span className="font-medium">{inactiveSubs}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Subscriptions;
