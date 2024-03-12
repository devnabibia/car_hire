import { IoCarSportSharp } from "react-icons/io5";

import { Spinner } from "../../../../components/Loaders";
import { CgArrowUpR } from "react-icons/cg";
import { useGetVihiclesByParamsQuery } from "../../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import { rtkErrors } from "../../../../utils/rtkErrors";

const AvailableVihicles = () => {
  const { isLoading, error, data } = useGetVihiclesByParamsQuery({
    car_name: "",
    car_type: "",
    transmission_type: "",
    max_price: "",
    min_price: "",
    limit: "",
    page: "",
  });

  return (
    <Link
      to="/dashboard/vihicles"
      className=" flex flex-col justify-center w-full hover:shadow-lg  bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex flex-col  h-full justify-center gap-4  p-4 ">
        <div className="flex justify-start items-start ">
          {" "}
          <div className="  bg-primary bg-opacity-10 p-3  text-center text-xl rounded-full text-primary ">
            {" "}
            <IoCarSportSharp className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row items-center w-full justify-end ">
          <div className="flex items-start flex-col  w-full">
            <div className="font-bold text-4xl">
              <div className="font-semibold text-4xl text-left">
                {data ? (
                  data && data[0]?.tatalDocs
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
                Vehicles
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

export default AvailableVihicles;
