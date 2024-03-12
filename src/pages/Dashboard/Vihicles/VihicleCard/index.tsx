import { CgCalendar, CgUser } from "react-icons/cg";
import { CarProps } from "../../../../Types";
import { useGetUserByIdQuery } from "../../../../features/api/apiSlice";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const VihicleCard = ({
  vihicle_name,
  vihicle_image,
  createdAt,
  vihicle_type,
  _id,
  owner,
}: CarProps) => {
  const { data } = useGetUserByIdQuery(owner && owner);

  return (
    <Link
      to={`/dashboard/vihicles/${_id}`}
      className="bg-white borde w-full mb-2 max-w-96 max-h-96 rounded-md shadow-md flex flex-col justify-center items-center gap-4 p-4 "
    >
      <div className="flex flex-row w-full justify-between items-start gap-4">
        <p className="text-left">{vihicle_name}</p>
        <Link to={`/dashboard/vihicles/${_id}`} className="relative group ">
          <FaEye />
          <div className="text-white text-xs rounded-md w-24 px-0.5 text-center   py-2 absolute -top-9 -left-8 bg-black hidden  group-hover:flex transition duration-500 ease-in-out">
            <span className=" w-full">View Details</span>
            <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <h2 className="text-gray-400 text-left text-xs">
          {vihicle_type?.toLocaleUpperCase()}
        </h2>
      </div>

      <div className="max-w-32 max-h-32 over-flow-hidden">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/images/${vihicle_image}`}
          className="w-full h-full object-contain  hover:scale-125 duration-500 transition ease-in-out"
        />
      </div>
      <div className="flex flex-col gap-2 items-start justify-between   w-full">
        <div className="flex flex-row gap-1 bg">
          <span className="text-zinc-500 text-xl ">
            {" "}
            <CgUser />
          </span>
          <p className=" text-sm text-black text-left">{data?.data.name}</p>
        </div>
        <div className="flex flex-row gap-1 items-center justify-between">
          <span className="text-zinc-500 text-xl ">
            {" "}
            <CgCalendar />
          </span>
          <p className=" text-xs">{createdAt}</p>
        </div>
      </div>
    </Link>
  );
};

export default VihicleCard;
