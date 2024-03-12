import { useEffect, useState } from "react";
import { Spinner } from "../../../../components/Loaders";
import { useGetAllUsersQuery } from "../../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import { rtkErrors } from "../../../../utils/rtkErrors";
import { FaHandshake } from "react-icons/fa";

const DashboardPartners = () => {
  const [activePartnersCount, setActivePartnersCount] = useState<number>(0);
  const [suspendedPartnersCount, setSuspendePartnersCount] =
    useState<number>(0);
  const [allPartnersCount, setAllartnersCount] = useState<number>(0);

  const { isLoading, error, data } = useGetAllUsersQuery({
    q: "",
    role: "partner",
    status: "",
    page: "",
    limit: "",
  });
  const { data: active_partners_data } = useGetAllUsersQuery({
    q: "",
    role: "partner",
    status: "Active",
    page: "",
    limit: "",
  });

  useEffect(() => {
    if (!data && active_partners_data) return;

    setAllartnersCount(data?.data[0].tatalDocs);
    setActivePartnersCount(active_partners_data?.data[0].tatalDocs);
    setSuspendePartnersCount(
      data?.data[0].tatalDocs - active_partners_data?.data[0].tatalDocs
    );
  }, [data, active_partners_data]);

  return (
    <Link
      to="/dashboard/partners"
      className=" flex flex-col justify-center w-full hover:shadow-lg  bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col  h-full justify-center gap-4  p-4 ">
        <div className="flex justify-start items-start ">
          {" "}
          <div className="  bg-primary bg-opacity-10 p-3  text-center text-xl rounded-full text-primary ">
            {" "}
            <FaHandshake className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end ">
          <div className="flex items-start flex-col  w-full">
            <div className="font-bold text-4xl">
              <div className="font-semibold text-4xl text-left">
                {data ? (
                  data && allPartnersCount
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
                Partners
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-end  ">
            <div>
              <label className="text-sm mr-2 text-gray-500">Active:</label>
              <span className="font-medium">{activePartnersCount}</span>
            </div>
            <div>
              <label className="text-sm mr-2 text-gray-500">Suspended:</label>
              <span className="font-medium">{suspendedPartnersCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardPartners;
