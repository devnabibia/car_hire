import React from "react";
import { AiOutlineReload } from "react-icons/ai";

import ReactApexChart from "react-apexcharts";
import options from "../../lib/apexChartIOptions";
import { Spinner } from "../../../../components/Loaders";

const ChartStatistics = () => {
  const data: any = [];
  const loading = false;
  const error = false;
  const series: any = [];
  const reloadPage = () => {
    window.location.reload();
  };
  const renderUI = () => {
    if (error)
      return (
        <div className="mx-auto flex flex-col space-y-4  items-center justify-center ">
          <p>An error ocurred while loading stats. </p>
          <button
            onClick={reloadPage}
            className=" flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg "
          >
            <span className="inline pr-2">
              <AiOutlineReload />
            </span>
            Reload
          </button>
        </div>
      );

    if (loading)
      return (
        <div className="flex flex-row items-center justify-center my-32">
          <Spinner />
        </div>
      );

    if (!error && !loading && data)
      return (
        <div>
          <div className="mb-2">
            <div id="chartThree" className="mx-auto flex justify-center">
              <ReactApexChart
                options={options as any}
                series={series}
                type="donut"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-between max-w-xl mx-auto">
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                Complete:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {4}%
              </span>
            </div>
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                Not Started:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {4}%
              </span>
            </div>
            <div className="flex flex-row space-x-2">
              <span className="text-xs md:text-base font-medium text-gray-500 dark:text-white">
                {" "}
                In Progress:{" "}
              </span>
              <span className="text-gray-900 font-bold text-sm md:text-base ">
                {" "}
                {4}%
              </span>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className=" rounded-lg hover:shadow-lg  max-w-6xl mx-auto  mt-4  border border-stroke bg-white px-5 pt-12 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-12 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Data Analytics
          </h5>
        </div>
        <div></div>
      </div>
      {data?.length > 0 ? (
        renderUI()
      ) : (
        <div className="flex items-center justify-center font-light py-12">
          No enough data for statistics.
        </div>
      )}
    </div>
  );
};

export default ChartStatistics;
