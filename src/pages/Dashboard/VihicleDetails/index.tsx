import { Link, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useGetVihicleByIdQuery,
} from "../../../features/api/apiSlice";
import { Spinner } from "../../../components/Loaders";
import { rtkErrors } from "../../../utils/rtkErrors";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { useState } from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import DeleteVihicleModal from "../DashboardModals/DeleteVihicleModal";
import EditVihicleModal from "../DashboardModals/EditVihicleModal";

const VihicleDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error, isSuccess } = useGetVihicleByIdQuery(
    id && id
  );
  const {
    data: owner_data,
    error: owner_error,
    isLoading: owner_isloading,
  } = useGetUserByIdQuery(data && data?.data.owner);

  let owner_name =
    owner_data &&
    owner_data?.data?.name.charAt(0).toUpperCase() +
      owner_data?.data?.name.slice(1);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showDeleteVihicleModal, setShowDeleteVihicleModal] =
    useState<boolean>(false);
  const [showEditVihicleModal, setShowEditVihicleModal] =
    useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setShowDeleteVihicleModal((prev) => !prev);
  };
  const toggleEditVihicleModal = () => {
    setShowEditVihicleModal((prev) => !prev);
  };

  const renderUI = () => {
    if (error) {
      return <div>{rtkErrors(error)}</div>;
    }
    if (isLoading) {
      return <Spinner />;
    }

    if (data && isSuccess) {
      return (
        <div className="flex flex-col relative items-center justify-center bg-white w-full h-full max-w-6xl mx-auto">
          <span
            onClick={toggleMenu}
            className="absolute right-2 top-2 text-xl p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <BsThreeDotsVertical />
          </span>
          {showMenu && (
            <div className=" absolute top-12 shadow-md right-4 z-10 bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700">
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <div
                    onClick={toggleEditVihicleModal}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit Vihicle{" "}
                    <span className="inline-block px-2">
                      <FaEdit />
                    </span>
                  </div>
                </li>
                <li>
                  <span
                    onClick={toggleDeleteModal}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete Vihicle
                    <span className="inline-block px-2">
                      <BsTrash />
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          )}
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <div className="w-full h-full  max-w-56 mx-h-56 md:max-w-72 md:max-h-72 overflow-hidden rounded-full ">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/images/${
                  data?.data?.vihicle_images[0]
                }`}
                className="object-contain w-full h-full rounded-full shadow-lg hover:scale-110 duration-500 transition-all ease-in-out "
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">
                {data?.data?.vihicle_name}
              </p>
              <p className=" bg-blue-100 text-blue-600 text-sm max-w-12 px-2 rounded-lg ml-2">
                {data?.data?.badge}
              </p>
            </div>
          </div>

          <div className=" flex flex-col md:flex-row  justify-between w-full  p-12 ">
            <div className="flex flex-col items-start justify-start gap-6">
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Type:</label>
                <p className="text-gray-500 text-sm ml-2">
                  {data?.data?.vihicle_type}
                </p>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Hire Price (KES):</label>
                <p className="text-gray-500 text-sm ml-2">
                  {data?.data?.hire_price}
                </p>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">CreatedAt:</label>
                <p className="text-gray-500 text-sm ml-2">
                  {data?.data?.createdAt}
                </p>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Transmission Type: </label>
                <p className="text-gray-500 text-sm ml-2">
                  {data?.data?.transmission_type}
                </p>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">No of Passengers: </label>
                <p className="text-gray-500 text-sm ml-2">
                  {data?.data?.no_of_passengers}
                </p>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Post Status: </label>
                <p
                  className={`${
                    data?.data.postStatus === "pending"
                      ? " bg-blue-100 text-blue-600 text-sm  px-2.5  rounded-lg flex items-center justify-center  text-center ml-2"
                      : ""
                  } ${
                    data?.data.postStatus === "successful"
                      ? " bg-green-100 text-green-600 text-sm  px-2.5  rounded-lg flex items-center justify-center  text-center ml-2"
                      : ""
                  }${
                    data?.data.postStatus === "declined"
                      ? " bg-red-100 text-red-600 text-sm  px-2.5  rounded-lg flex items-center justify-center  text-center ml-2"
                      : ""
                  }`}
                >
                  {data?.data?.postStatus}
                </p>
              </div>

              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Badge:</label>
                <div
                  className={`${
                    data?.data.badge === "hire"
                      ? " bg-orange-100 text-orange-600 text-sm max-w-12 px-2 py-0.5  rounded-lg  text-center"
                      : " bg-pink-100 text-pink-600 text-sm max-w-12 px-2 rounded-lg"
                  }`}
                >
                  {data?.data?.badge}
                </div>
              </div>
              <div className="flex flex-row">
                {" "}
                <label className=" font-medium">Owned By:</label>
                <Link
                  to={`/dashboard/system-users/user-details/${owner_data?.data._id}`}
                  className="text-gray-500 underline ml-2 hover:text-gray-800"
                >
                  {owner_name}
                  <span className="inline-block text-xs ml-1">
                    <FaExternalLinkAlt />
                  </span>
                </Link>
              </div>
              <div className="flex flex-row ">
                {" "}
                <label className=" font-medium">Features:</label>{" "}
                <div className="">
                  {data?.data?.features.map((f: any) => (
                    <p className="text-gray-500 text-sm text-left ml-2">{f}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-row pt-8 md:pt-0">
              {" "}
              <label className=" font-medium">Description</label>
              <p className="text-gray-500 max-w-7xl  w-full h-[20rem] p-1.5 md:p-4 overflow-y-scroll shadow-inner text-sm leading-normal ">
                {data?.data?.description}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className=" relative w-full ">
      {showDeleteVihicleModal && (
        <DeleteVihicleModal toggleModal={toggleDeleteModal} data={data?.data} />
      )}
      {showEditVihicleModal && (
        <EditVihicleModal
          _id={id}
          toggleModal={toggleEditVihicleModal}
          isOpen={showEditVihicleModal}
        />
      )}
      {renderUI()}
    </div>
  );
};

export default VihicleDetails;
