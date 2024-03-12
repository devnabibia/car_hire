import { FaGears } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";
import { CarProps } from "../../Types";
import { IoMdSpeedometer } from "react-icons/io";
import Badge from "../Badge";

import CustomLink from "../CustomLink";

const SingleRide = ({
  vihicle_images,
  _id,
  vihicle_name,
  transmission_type,
  badge,
  hire_price,
  no_of_passengers,
  fuel_consumption,
}: CarProps) => {
  return (
    <div className="shadow-lg  relative  rounded-lg border bg-white max-w-lg mx-auto  w-full  ">
      <div className="h-[16rem] md:h-[14rem]  p-1 rounded-md ">
        <div className="absolute right-0">
          <Badge variant={badge} />
        </div>
        <div className=" overflow-hidden rounded-md h-full w-full">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/images/${
              vihicle_images[0]
            }`}
            decoding="async"
            loading="lazy"
            className="rounded-t-lg h-full w-full object-cover border   transition duration-500 ease-in-out  hover:scale-110"
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 mt-4 p-4">
        <h4 className="font-semibold text-xl text-left">{vihicle_name}</h4>
        <div className="flex flex-row items-start justify-start px-2 w-full gap-4">
          <div className="group relative">
            <div className="p-3 text-xl border rounded-lg">
              <SlPeople />
            </div>
            <span className="">{no_of_passengers}</span>
            <div className="text-white text-xs rounded-md px-1.5 py-2 absolute -top-10 bg-black hidden group-hover:flex transition duration-500 ease-in-out">
              Capacity
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-5 rotate-45"></span>
            </div>
          </div>
          <div className="group relative">
            <div className="p-3 text-xl border rounded-lg">
              <FaGears />
            </div>
            <span className="">{transmission_type}</span>
            <div className="text-white text-xs rounded-md px-1.5 py-2 absolute -top-10 -left-3.5 bg-black hidden group-hover:flex transition duration-500 ease-in-out">
              Transmission
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </div>

          <div className="group relative">
            <div className="p-3 text-xl border rounded-lg">
              <IoMdSpeedometer />
            </div>
            <span className="">{`${fuel_consumption}km/ltr`}</span>
            <div className="  text-white text-xs rounded-md px-1.5 py-2 absolute -top-10 -left-3.5 bg-black hidden group-hover:flex transition duration-500 ease-in-out z-10 mb-3">
              Consumption
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </div>
        </div>
        <hr className="w-full"></hr>

        <p>
          <span className="font-bold text-primary">KSH {hire_price}</span> /day
        </p>
        <div className="w-full flex justify-center">
          {" "}
          <CustomLink
            to={`/car-details/${_id}`}
            text="Book Now"
            variant="filled"
          ></CustomLink>
        </div>
      </div>
    </div>
  );
};

export default SingleRide;
