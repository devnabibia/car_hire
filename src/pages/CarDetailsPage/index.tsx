import { useEffect, useState } from "react";
import { useParams } from "react-router";

import CarCarousel from "./CarCarousel";
import CustomLink from "../../components/CustomLink";
import { FaAngleRight } from "react-icons/fa6";
import { CiLocationOn, CiShoppingTag } from "react-icons/ci";
import Main from "../../components/Layouts/Main";
import { useLocation } from "react-router-dom";
import SingleRide from "../../components/Portfolio/SingleRide";
import {
  useGetVihicleByIdQuery,
  useGetVihiclesDefaultQuery,
} from "../../features/api/apiSlice";
import { CardSkeleton, Spinner } from "../../components/Loaders";
import VihicleAgent from "../../components/VihicleAgent";
import { GrShareOption } from "react-icons/gr";

const CarDetails = () => {
  const router = useParams();
  const { pathname } = useLocation();
  const { data, error, isLoading } = useGetVihiclesDefaultQuery(null);
  const {
    data: vihicle,
    error: vihicleError,
    isLoading: isVihicleLoading,
  } = useGetVihicleByIdQuery(router.Id);

  var errorMsg = "";
  if (error) {
    if ("status" in error) {
      "error" in error
        ? (errorMsg = error.error)
        : (errorMsg = JSON.parse(JSON.stringify(error.data)).msg);
    }
  }
  var vihicleErrMsg = "";
  if (error) {
    if ("status" in error) {
      "error" in error
        ? (vihicleErrMsg = error.error)
        : (vihicleErrMsg = JSON.parse(JSON.stringify(error.data)).msg);
    }
  }

  const [isCopied, setIsCopied] = useState<boolean>(false);

  //copies to clipboard
  const copyLink = () => {
    setIsCopied(true);
    setTimeout(() => {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(false);
    }, 1500);
  };

  //ensures content centered in the initial mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <Main>
        {" "}
        {error && !isLoading && (
          <div className="py-56 mx-auto text-center ">{errorMsg}</div>
        )}
        {isLoading && (
          <div className="py-56 flex items-center justify-center">
            <Spinner color="black" />
          </div>
        )}
        {data && !error && (
          <>
            <div className="flex mt-[6.5rem]  max-w-7xl mx-auto">
              <div className="flex flex-row mx-4 items-center gap-2 justify-between my-4  w-full  ">
                <span>
                  <FaAngleRight />
                </span>

                <p className="text-md w-full text-left">
                  {vihicle?.data?.vihicle_name}
                </p>
                <div
                  onClick={copyLink}
                  className="flex items-center justify-center text-sm text-center border  rounded-lg   py-2 cursor-pointer w-full max-w-36   hover:bg-slate-100 "
                >
                  <span className="inline-block  pr-1.5 text-lg">
                    <GrShareOption />
                  </span>{" "}
                  {!isCopied ? "Share" : "Link Copied!"}
                </div>
              </div>
            </div>
            <hr className="mb-2"></hr>
            <section className="flex flex-col items-center md:mx-auto max-w-7xl   overflow-hidden justify-center md:flex-row">
              <div className="flex flex-col  justify-center mx-4">
                {vihicle && (
                  <div className="flex items-center justify-center  flex-col lg:flex-row  max-w-7xl mx-auto w-full  mb-4  ">
                    <div className=" h-full">
                      {" "}
                      <CarCarousel images={vihicle?.data?.vihicle_images} />
                    </div>
                    <div className="w-full h-full md:max-w-md ">
                      <VihicleAgent
                        owner_id={vihicle?.data.owner}
                        vihicle={vihicle?.data}
                      />
                    </div>
                  </div>
                )}
                {isVihicleLoading && (
                  <div className="py-56 flex items-center justify-center">
                    <Spinner color="black" />
                  </div>
                )}
                {vihicleError && !isVihicleLoading && (
                  <div className="py-56 mx-auto text-center ">
                    {vihicleErrMsg}
                  </div>
                )}

                <hr></hr>
                <div className="flex flex-col md:flex-row  md:gap-32 gap-12  justify-between items-center mt-16 ">
                  <div className="flex flex-col items-start gap-16  ">
                    <div>
                      {" "}
                      <h1 className="font-semibold text-start mb-4">
                        Features
                      </h1>
                      <div className="grid grid-flow-col gap-8 place-content-center text-left items-center grid-rows-2">
                        {vihicle?.data?.features[0]
                          .split(",")
                          .map((feature: any, idx: any) => {
                            return (
                              <div className="flex flex-row gap-1  items-start justify-start">
                                {" "}
                                <CiShoppingTag /> <p key={idx}>
                                  {feature}
                                </p>{" "}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="font-semibold">Location</h1>
                      <div className="flex flex-row gap-1  items-center justify-center">
                        {" "}
                        <CiLocationOn /> <p>{vihicle?.data.location}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4 max-w-xl mx-4 md:mx-auto ">
                      <h1 className="font-semibold text-left">
                        About {`${vihicle?.data.vihicle_name}`}
                      </h1>
                      <p className="text-left">{vihicle?.data.description}</p>
                    </div>
                  </div>
                </div>
                <hr className="w-full md:mr-0 mr-4 mt-8"></hr>
              </div>
            </section>
            {data?.length > 0 && (
              <div className="mt-24">
                <div className="flex flex-col items-center justify-center gap-2   ">
                  <h2 className="text-center text-2xl  font-bold text-primary">
                    Similar Vihicles
                  </h2>
                  <p className=" text-gray-950 ">
                    People who viewed {vihicle?.vihicle_name} also consider
                  </p>
                  <div className="grid grid-flow-cols sm:grid-cols-2 md:grid-cols-4 gap-8  mt-16 pr-4   max-w-7xl w-full overflow-hidden ">
                    {isLoading ? (
                      <CardSkeleton skeletonList={3} />
                    ) : (
                      <>
                        {" "}
                        {data
                          ?.filter(
                            (vc: any) =>
                              vc.car_type === vihicle?.data.car_type &&
                              vc._id !== vihicle?.data._id
                          )
                          .slice(0, 4)
                          .map((vihicle: any) => {
                            return (
                              <SingleRide
                                _id={vihicle?._id}
                                key={vihicle?._id}
                                description={vihicle?.description}
                                features={vihicle?.features}
                                vihicle_images={vihicle?.vihicle_images}
                                vihicle_type={vihicle?.vihicle_type}
                                vihicle_name={vihicle?.vihicle_name}
                                transmission_type={vihicle?.transmission_type}
                                badge={vihicle?.badge}
                                hire_price={vihicle?.hiire_price}
                                no_of_passengers={vihicle?.no_of_passengers}
                                fuel_consumption={vihicle?.fuel_consumption}
                              />
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Main>
    </>
  );
};

export default CarDetails;
