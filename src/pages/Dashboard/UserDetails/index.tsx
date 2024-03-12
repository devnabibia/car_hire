import { CgMail, CgPhone } from "react-icons/cg";
import { IoCarSport } from "react-icons/io5";
import { dashbanner } from "../../../assets/images";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useGetVihiclesByOwnerQuery,
} from "../../../features/api/apiSlice";
import { CarProps } from "../../../Types";
import VihicleRow from "./VihicleRow";
import { Spinner } from "../../../components/Loaders";
import { rtkErrors } from "../../../utils/rtkErrors";
import { useEffect } from "react";

const UserDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { isLoading, data, error, isSuccess } = useGetUserByIdQuery(id);

  const { isLoading: vihicleLoading, data: vihicleData } =
    useGetVihiclesByOwnerQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <section className=" flex   flex-col  pb-8 px-4  w-full right-0 gap-2    max-w-7xl  mx-auto">
        <div className="border bg-white w-full rounded-md">
          <img
            src={`${
              vihicleData?.data.length > 0
                ? `${import.meta.env.VITE_IMAGE_URL}/images/${
                    vihicleData?.data[0]?.vihicle_images[0]
                  }`
                : `${dashbanner}`
            }`}
            className=" object-contain relative w-full rounded-t-lg h-36 bg-gradient-to-r from-primary via-gray-400 to-primary "
          ></img>
          <div className="mx-auto relative bg-gradient-to-tr from-gray-600  via-gray-400 to-gray-500 rounded-full flex items-center justify-center text-2xl w-24 h-24 font-semibold -top-8  p-3 ">
            <span className="bg-white w-full rounded-full h-full flex items-center justify-center">
              {data?.data.name.charAt(0).toUpperCase()}
            </span>
            <span
              className={`absolute rounded-full  w-4 h-4 ${
                data?.data.active ? "bg-green-500" : "bg-red-500"
              } right-2  bottom-2`}
            ></span>
          </div>

          {error && <p>{rtkErrors(error)}</p>}
          {isLoading && !data && <Spinner />}

          {data && isSuccess && (
            <div className="flex flex-col items-center justify-center gap-1 pb-8 px-2">
              <h2 className="font-semibold text-xl">{data?.data.name}</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <CgPhone></CgPhone>
                  <h3 className="text-gray-600 text-sm">
                    {data?.data.phone_number}
                  </h3>
                </div>{" "}
                <div className="flex flex-row gap-2 ">
                  <CgMail />
                  <h3 className="text-gray-600 text-sm ">{data?.data.email}</h3>
                </div>
              </div>
              <div className=" flex flex-row itmes-center justify-center">
                <span>
                  <IoCarSport />
                </span>{" "}
                <span className="font-semibold mx-1">
                  {vihicleData?.data.length}
                </span>{" "}
                Post(s)
              </div>
            </div>
          )}
        </div>
        <div className=" relative border bg-white rounded-lg overflow-y-scroll max-h-[35rem]  p-2">
          <div className="overflow-x-auto border   ">
            {vihicleLoading && (
              <div className="w-full absolute z-10  h-full flex items-center justify-center inset-0">
                <Spinner />
              </div>
            )}
            {vihicleData?.data.length === 0 && (
              <div className="w-full absolute z-10  h-full flex items-center justify-center inset-0">{`No posts for ${data?.data.name}`}</div>
            )}

            <table className="  w-full text-sm text-left   text-gray-600  p">
              <thead className="text-xs text-gray-700 uppercase bg-gray-00 bg-gray-100  ">
                <tr>
                  <th className=" py-3 pl-3">Vihicle</th>
                  <th className=" py-3">Vihicle_Name</th>
                  <th className=" py-3">Post_Status</th>
                  <th className=" py-3">Post_Date</th>
                  <th className=" py-3">Availability</th>

                  <th className=" py-3">Action</th>
                </tr>{" "}
              </thead>

              <tbody>
                {vihicleData?.data.map((v: CarProps, _: any) => {
                  return (
                    <VihicleRow
                      key={v._id}
                      _id={v._id}
                      isAvailable={v.isAvailable}
                      postStatus={v.postStatus}
                      vihicle_name={v.vihicle_name}
                      createdAt={v.createdAt}
                      vihicle_image={v.vihicle_images[0]}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDetails;
