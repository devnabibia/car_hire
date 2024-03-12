import { DashboardCarsSkeleton } from "../../../components/Loaders";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import VihicleCard from "./VihicleCard";
import { CarProps } from "../../../Types";
import AddVihicleModal from "../DashboardModals/AddVihicleModal";
import { useContext } from "react";
import { AddVihicleContext } from "../../../Context/AddVihicleModal";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useGetVihiclesByParamsQuery } from "../../../features/api/apiSlice";
import DashboardError from "../DashboardErrorComponent";

const Vihicles = () => {
  const { isLoading, error, data } = useGetVihiclesByParamsQuery({
    car_name: "",
    car_type: "",
    transmission_type: "",
    max_price: "",
    min_price: "",
    limit: "",
    page: "",
  });

  const { toggleAddVihicleModal }: any = useContext(AddVihicleContext);

  const reloadPage = () => {
    window.location.reload();
  };

  const renderUI = () => {
    if (isLoading)
      return (
        <div className="grid grid-flow-cols sm:grid-cols-2 md:grid-cols-4 gap-8  mt-16     w-full   mx-auto max-w-6xl  ">
          <DashboardCarsSkeleton skeletonList={11} />
        </div>
      );

    if (error) return <DashboardError error={error} />;

    if (!error && !isLoading && data)
      return (
        <>
          {data[0]?.data.length >= 1 ? (
            <div className="grid grid-flow-cols sm:grid-cols-2 md:grid-cols-5 gap-8 w-full overflow-hidden max-w-7xl mx-auto pt-8">
              {data &&
                data[0]?.data?.map((v: CarProps, _: any) => {
                  return (
                    <VihicleCard
                      key={_}
                      _id={v._id}
                      vihicle_name={v.vihicle_name}
                      createdAt={v.createdAt}
                      vihicle_image={v.vihicle_images[0]}
                      owner={v.owner}
                      vihicle_type={v.vihicle_type}
                    />
                  );
                })}
            </div>
          ) : (
            <p className="flex justify-center items-center my-12 font-light">
              <span className="inline-block mr-1">
                <BsFillInfoCircleFill />
              </span>{" "}
              There are no vihicles.
            </p>
          )}
        </>
      );
  };

  return (
    <>
      <AddVihicleModal />
      <div className="flex flex-row  items-start  justify-between mx-2 w-full max-w-6xl   ">
        <div className="flex flex-col ">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleAddVihicleModal}
              className="px-4 text-center  py-4 mb-2 border-4 border-gray-400 border-dotted text-gray-500 rounded-xl "
            >
              <span className="">
                {" "}
                <FaPlus />
              </span>{" "}
            </button>
          </div>
          <span className="text-sm pb-8 text-gray-600">New Vehicle</span>
        </div>
      </div>
      <div className="px-4">{renderUI()}</div>
    </>
  );
};

export default Vihicles;
