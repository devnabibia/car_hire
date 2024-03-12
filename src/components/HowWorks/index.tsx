import { GrMapLocation } from "react-icons/gr";
import { FaCalendarDays } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";

const HowWorks = () => {
  return (
    <section className=" relative  mt-24 max-w-6xl lg:mx-auto mx-4 flex items-center justify-center">
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center gap-4   ">
          <p className="text-center font-bold text-primary">How It Works</p>
          <h2 className="text-3xl text-gray-950 font-bold md:text-5xl">
            Our Working Steps
          </h2>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-6 mt-16  lg:flex-row">
          <div className="flex flex-col items-center justify-center gap-4 mb-4 ">
            <div className="bg-white p-1 shadow-xl  rounded-md">
              <div className="text-center p-6 text-2xl rounded-md  text-primary bg-primary/10">
                <GrMapLocation />
              </div>
            </div>
            <h3 className=" font-bold text-2xl text-gray-950">
              Choose Location
            </h3>
            <p className="text-sm text-center max-w-lg">
              {" "}
              Easily click the drop down arrow in the picking up my ride
              section. Choose your location and proceed to selecting a preferred
              date to pick up your ride.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="bg-primary p-1 shadow-xl  rounded-md">
              <div className="text-center p-6 text-2xl rounded-md  text-white bg-primary/10">
                <FaCalendarDays />
              </div>
            </div>
            <h3 className=" font-bold text-2xl text-gray-950">Pick-Up Date</h3>
            <p className="text-sm text-center max-w-lg">
              {" "}
              Easily click the drop down arrow in the picking up my ride
              section. Choose your location and proceed to selecting a preferred
              date to pick up your ride.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="bg-white p-1 shadow-xl  rounded-md">
              <div className="text-center p-6 text-2xl rounded-md  text-primary bg-primary/10">
                <FaCarSide />
              </div>
            </div>
            <h3 className=" font-bold text-2xl text-gray-950">Book Your Car</h3>
            <p className="text-sm text-center max-w-lg">
              {" "}
              Easily click the drop down arrow in the picking up my ride
              section. Choose your location and proceed to selecting a preferred
              date to pick up your ride.
            </p>
          </div>
        </div>
      </div>

   
    </section>
  );
};

export default HowWorks;
