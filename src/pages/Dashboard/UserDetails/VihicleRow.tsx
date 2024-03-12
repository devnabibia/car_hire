import React from "react";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CarProps } from "../../../Types";
import { Button } from "react-scroll";

const VihicleRow: React.FC<CarProps> = ({
  vihicle_image,
  vihicle_name,
  postStatus,
  createdAt,
  isAvailable,
  _id,
}: CarProps) => {
  return (
    <tr className="border-b overflow-auto w-full  hover:bg-gray-50  ">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap bg-"
      >
        <div className="pl-3 relative flex flex-row">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/images/${vihicle_image}`}
            className="text-base w-10 h-10 object-cover rounded-full font-semibold bg-black "
          ></img>
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/images/${vihicle_image}`}
            className="absolute right-6 z-10 bg-black w-10 h-10 object-cover  rounded-full font-semibold "
          ></img>
        </div>
      </th>
      <td className=" font-medium">
        <div className="flex items-center">{vihicle_name}</div>
      </td>

      <td className=" py-4 px-4">
        <div className="flex items-center  text-center">
          <span
            className={`${
              postStatus === "Active"
                ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
                : "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
            }`}
          >
            {postStatus}
          </span>
        </div>
      </td>

      <td className=" font-light">
        <div className="flex items-center">{createdAt}</div>
      </td>

      <td>
        <td className=" py-4 px-4">
          <div className="flex items-center  text-center">
            <span
              className={`${
                isAvailable === true
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                  : "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
              }`}
            >
              {isAvailable === true ? "Available" : "Not Available"}
            </span>
          </div>
        </td>
      </td>
      <td className=" py-4 flex flex-row space-x-4">
        <Link
          to={`/dashboard/vihicles/${_id}`}
          className="text-gray-500 group relative  bg-gray-50 p-2 rounded-md hover:text-blue-500"
        >
          <FaEye />
          <div className="text-white text-xs rounded-md w-24 px-0.5 text-center  py-2 absolute -top-8 -left-6 bg-black hidden  group-hover:flex transition duration-500 ease-in-out">
            <span className=" w-full">View Details</span>
            <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default VihicleRow;
