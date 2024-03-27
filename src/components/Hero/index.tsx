import { range } from "../../assets/images";
import Button from "../Button";
import CustomLink from "../CustomLink";
import { useContext } from "react";
import { AuthModalContext } from "../../Context/AuthModalToggleContext";

const Hero: React.FC = () => {
  const { toggleAuthModal }: any = useContext(AuthModalContext);

  return (
    <section className=" relative md:mt-44 mt-32  w-full  ">
      <div className="max-w-7xl md:mx-auto  flex md:flex-row justify-between mx-4 flex-col ">
        <div className="flex relative z-30 flex-col items-start md:gap-8 gap-4 ">
          <div className="flex flex-row items-center justify-center gap-1">
            <hr className="w-6 bg-gray-900 h-0.5"></hr>
            <p className="text-gray-900">Welcome to Car Hire</p>
          </div>
          <h1 className="text-gray-950 max-w-sm md:max-w-xl font-bold text-3xl md:text-5xl leading-normal text-start">
            {" "}
            Hire Your Ride Across Kenya 
          </h1>
          <p className="text-gray-700 lg:max-w-xl max-w-sm text-start text-sm lg:text-base">
            Drive your dreams with our hassle-free car rental service-Where
            every journey begins with convinience and ends with satisfaction.
          </p>
          <div className="flex flex-row gap-4 w-full max-w-sm">
            <CustomLink
              variant="filled"
              text="Hire Your Ride"
              to="all-vihicles-by-params?car_name=&car_type=&transmission_type=&min_price=&max_price="
            />
            <Button
              theme="outlined"
              text="Become A Partner"
              onClick={toggleAuthModal}
            />
          </div>
        </div>

        <div className=" ">
          <img alt="range" src={range} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
