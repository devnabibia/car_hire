import { FaPeopleGroup } from "react-icons/fa6";
import { Spinner } from "../../../../components/Loaders";
import { CgArrowUpR } from "react-icons/cg";
import { useGetAllUsersQuery } from "../../../../features/api/apiSlice";
import { useEffect, useState } from "react";
import { rtkErrors } from "../../../../utils/rtkErrors";
import { Link } from "react-router-dom";

const SystemUsers = () => {
  const [allUsersCount, setAllUsersCount] = useState<number>(0);

  const { data, error, isLoading } = useGetAllUsersQuery({
    status: "",
    role: "",
    q: "",
    limit: "",
    page: "",
  });

  useEffect(() => {
    if (!data) return;
    setAllUsersCount(data?.data[0].tatalDocs);
  }, [data]);

  return (
    <Link
      to="/dashboard/system-users"
      className=" flex flex-col justify-center w-full hover:shadow-lg  bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col  h-full justify-center gap-4  p-4 ">
        <div className="flex justify-start items-start ">
          {" "}
          <div className="  bg-primary bg-opacity-10 p-3  text-center text-xl rounded-full text-primary ">
            {" "}
            <FaPeopleGroup className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end ">
          <div className="flex items-start flex-col  w-full">
            <div className="font-bold text-4xl">
              <div className="font-semibold text-4xl text-left">
                {data ? (
                  allUsersCount
                ) : error ? (
                  <div className="text-sm font-medium text-gray-700">
                    {rtkErrors(error)}
                  </div>
                ) : isLoading ? (
                  <Spinner width={4} height={10} />
                ) : (
                  ""
                )}
              </div>
              <div className="text-gray-400 text-left text-sm font-medium">
                System Users
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-end text-green-500 opacity-80 ">
            <div className="flex flex-row justify-end gap-1">
              {" "}
              <p> 0.45%</p>
              <span className="text-center text-xl">
                <CgArrowUpR />
              </span>
            </div>
            <div className="text-gray-500 text-xs text-right">
              Since last month
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SystemUsers;
