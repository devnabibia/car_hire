import { BsThreeDotsVertical } from "react-icons/bs";
import { CgCalendar, CgUser } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { ScaleLoader } from "react-spinners";
interface SpinnerProps {
  color?: string;
  height?: number;
  width?: number;
}

interface CardSkeletonProps {
  skeletonList?: any;
}
export const CardSkeleton = ({ skeletonList }: CardSkeletonProps) => {
  return Array(skeletonList)
    .fill("s")
    .map((_, idx) => {
      return (
        <div
          key={idx}
          className=" bg-white border rounded-md shadow-md w-full h-full p-2 pb-6 "
        >
          <div className=" flex items-center justify-center bg-slate-200  w-full h-36 rounded-md animate-pulse ">
            <CiImageOn className="text-5xl text-slate-500" />
          </div>

          <div className="flex flex-col gap-4 mt-12 px-2">
            <div className="bg-slate-200  h-6  w-[90%] animate-pulse "></div>
            <div className="flex flex-row gap-4">
              <div className="w-12 h-12  animate-pulse bg-slate-200 rounded-lg"></div>
              <div className="w-12 h-12 animate-pulse bg-slate-200 rounded-lg"></div>
              <div className="w-12 h-12 animate-pulse bg-slate-200 rounded-lg"></div>
            </div>
            <div className="bg-slate-200  h-6  w-[90%] animate-pulse "></div>
          </div>
          <div className="w-full justify-center flex items-center mt-6">
            <div className="bg-slate-200  h-9  w-[90%] animate-pulse  rounded-md"></div>
          </div>
        </div>
      );
    });
};

export const DashboardCarsSkeleton = ({ skeletonList }: CardSkeletonProps) => {
  return Array.from({ length: skeletonList }).map((_, idx) => {
    return (
      <div
        key={idx}
        className="bg-white w-full max-w-72 max-h-64 rounded-md shadow-xl flex flex-col justify-center items-center gap-4 p-4 "
      >
        <div className="flex flex-row w-full justify-between items-start gap-4">
          <div className="w-32 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
          <div className="w-6 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
        </div>
        <div className="flex flex-col w-full items-start justify-start">
          <h2 className="text-gray-900 w-16 h-2.5   animate-pulse bg-slate-200 rounded-lg"></h2>
        </div>

        <div className="w-full">
          <div className=" flex items-center justify-center bg-slate-200  w-full max-w-32 mx-auto h-full py-8  max-h-36 rounded-md animate-pulse ">
            <CiImageOn className="text-5xl text-slate-500" />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-between   w-full">
          <div className="flex flex-row gap-1 bg">
            <span className="text-zinc-500 text-xl ">
              <div className="w-6 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
            </span>
            <div className="w-24 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
          </div>
          <div className="flex flex-row gap-1 bg">
            <span className="text-zinc-500 text-xl ">
              <div className="w-6 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
            </span>
            <div className="w-24 h-2.5  animate-pulse bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  });
};

export const PackageSkeleton = ({ skeletonList }: CardSkeletonProps) => {
  console.log("hello");
  return Array.from({ length: skeletonList }).map((_, idx) => {
    return (
      <div
        key={idx}
        className="relative bg-white border rounded-lg group shadow-md  p-4 pt-0 px-0 max-w-xl"
      >
        <span className="absolute right-2 top-2 text-xl p-4 rounded-full bg-gray-200 animate-pulse"></span>
        <div className=" flex flex-col  justify-center w-full gap-4 ">
          <div className="bg-primary/15 py-8 rounded-b-[50%] rounded-t-lg duration-500">
            <p className="font-light text-2xl mb-4 w-full max-w-44 bg-gray-200  mx-auto rounded-full animate-pulse h-4"></p>
            <div>
              <p className="font-light text-2xl mb-4 bg-gray-200 w-full max-w-56 mx-auto rounded-full animate-pulse h-4"></p>
            </div>
          </div>
          <table className="flex flex-col p-4  mx-autow-full  ">
            <tbody className="mx-auto ">
              <tr>
                <td className="border px-16 py-2.5">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4"></p>
                </td>
                <td className="border px-8 py-2.5">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4"></p>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2.5 ">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4"></p>
                </td>
                <td className="border px-8 py-2.5">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4"></p>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2.5 ">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4 text-transparent ">
                    1 FREE promoted listing
                  </p>
                </td>
                <td className="border px-8 py-2.5">
                  <p className="font-light text-2xl mb-4 bg-gray-200 max-w-xs mx-auto rounded-full animate-pulse h-4 p-2.5"></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  });
};

export const Spinner = ({ color, width, height }: SpinnerProps) => {
  return <ScaleLoader color={color} width={width} height={height} />;
};
