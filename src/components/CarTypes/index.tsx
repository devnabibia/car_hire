import { useNavigate } from "react-router";
import {
  coupe,
  hatchback,
  pickup,
  sedan,
  station_wagon,
  suv,
  van,
} from "../../assets/images";
import { CarTypeProps } from "../../Types";

type HandleClickProps = (carType: string) => void;

const CarTypes: React.FC = () => {
  const navigate = useNavigate();

  const car_types: CarTypeProps[] = [
    {
      type: "Suv",
      image: suv,
    },
    {
      type: "Sedan",
      image: sedan,
    },

    {
      type: "Hatchback",
      image: hatchback,
    },

    {
      type: "StationWagon",
      image: station_wagon,
    },
    {
      type: "Pickup",
      image: pickup,
    },
    {
      type: "Van",
      image: van,
    },
    {
      type: "Coupe",
      image: coupe,
    },
  ];

  const handleClick: HandleClickProps = (car_type: string) => {
    navigate({
      pathname: "/cars",
      search: `?car_name=&car_type=${car_type}&transmission_type=&min_price=&max_price=`,
    });
  };

  return (
    <div
      className="grid grid-flow-col grid-rows-2 pb-3 overflow-x-auto overflow-y-hidden  py-4   lg:w-[90%]  w-full  md:grid-rows-1 gap-x-4 gap-y-8
    hover:scrollbar-thumb-primary/80 scrollbar-thumb-rounded-lg scrollbar-track-gray-50  scrollbar-thumb-primary 
  scrollbar-thin"
    >
      {car_types?.map((carType, index) => {
        return (
          <a
            key={index}
            onClick={() => handleClick(carType.type)}
            className="flex pb-4 w-44 flex-col h-36  items-center duration-200 ease-in-out border-[0.5px] hover:border-[1px] border-gray-300 rounded-md cursor-pointer hover:scale-105 "
          >
            <img
              alt={carType.type}
              loading="lazy"
              width="150"
              height="150"
              decoding="async"
              data-nimg="1"
              src={carType.image}
            ></img>
            <span className="relative font-semibold capitalize -top-8 ">
              {carType.type}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default CarTypes;
