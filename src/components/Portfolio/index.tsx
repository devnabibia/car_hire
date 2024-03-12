import React from "react";
import SingleRide from "./SingleRide";
import { CarProps } from "../../Types";
import CarTypes from "../CarTypes";
import { useGetVihiclesQuery } from "../../features/api/apiSlice";
import { CardSkeleton } from "../Loaders";

const Portifolio: React.FC = () => {
  const { data, error, isLoading } = useGetVihiclesQuery({ page: 1 });

  var errorMsg = "";
  if (error) {
    if ("status" in error) {
      "error" in error
        ? (errorMsg = error.error)
        : (errorMsg = JSON.parse(JSON.stringify(error.data)).msg);
    }
  }

  return (
    <section className=" relative  py-24 max-w-7xl lg:mx-auto px-4 flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4   w-full mx-auto  ">
        <p className="text-center font-bold text-primary">Choose Your Ride</p>
        <h2 className="text-3xl text-gray-950 font-bold g:text-5xl">
          Explore Our Rides By Type
        </h2>
        {/* list of available car types  */}
        <CarTypes />
        <div className="mt-32">
          <p className="text-center font-bold text-primary mb-12">Featured</p>
          {error && !isLoading && (
            <div
              className=" flex items-center justify-center  text-center  mt-16 mx-auto w-full 
            "
            >
              <div> {errorMsg}</div>
            </div>
          )}
        </div>
        <div className="  mx-auto grid grid-cols-1  gap-8 sm:grid-cols-2 md:grid-cols-4     max-w-7xl w-full overflow-hidden  ">
          <>
            {isLoading && <CardSkeleton skeletonList={4} />}
            {data &&
              data[0]?.data.slice(0, 4).map((vihicle: CarProps) => {
                return (
                  <>
                    <SingleRide
                      _id={vihicle._id}
                      key={vihicle._id}
                      description={vihicle.description}
                      features={vihicle.features}
                      vihicle_images={vihicle.vihicle_images}
                      vihicle_type={vihicle.vihicle_type}
                      vihicle_name={vihicle.vihicle_name}
                      transmission_type={vihicle.transmission_type}
                      badge={vihicle.badge}
                      hire_price={vihicle.hire_price}
                      no_of_passengers={vihicle.no_of_passengers}
                      fuel_consumption={vihicle.fuel_consumption}
                    />
                  </>
                );
              })}{" "}
          </>
        </div>
        {data?.length < 1 && (
          <p className="mx-auto text-center">There are no vihicles</p>
        )}
      </div>
    </section>
  );
};

export default Portifolio;
