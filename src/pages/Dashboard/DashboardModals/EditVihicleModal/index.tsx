import { useState } from "react";
import { CarProps, features, make } from "../../../../Types";
import { Spinner } from "../../../../components/Loaders";
import {
  useGetVihicleByIdQuery,
  useUpdateVihicleMutation,
} from "../../../../features/api/apiSlice";
import { Transition } from "@headlessui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditVihicleSchema } from "../AddVihicleModal/validatonSchema";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { rtkErrors } from "../../../../utils/rtkErrors";
import ModalButton from "../../../../components/Modals/AuthModal/ModalButton";
import { useParams } from "react-router";

const EditVihicleModal = ({ toggleModal, isOpen }: any) => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetVihicleByIdQuery(id);
  const isEditModal = true;

  const [
    updateVihicle,
    { error: updateError, data: updateData, isLoading: isLoadingUpdate },
  ] = useUpdateVihicleMutation();
  const [no_of_images_error, setNumberOfImagesError] = useState<string>("");

  const initialValues = {
    vihicle_name: data?.data.vihicle_name,
    transmission_type: data?.data.transmission_type,
    vihicle_type: data?.data.vihicle_type,
    badge: data?.data.badge,
    no_of_passengers: data?.data.no_of_passengers,
    fuel_consumption: data?.data.fuel_consumption,
    hire_price: data?.data.hire_price,
    description: data?.data.description,
    location: data?.data.location,
    vihicle_images: data?.data.vihicle_images,
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<CarProps>({
    defaultValues: initialValues,
    resolver: yupResolver<Yup.AnyObject>(EditVihicleSchema),
  });

  const [vihicleImages, setVihicleImages] = useState<any>([]);

  const onSubmit = (data: any) => {
    if (vihicleImages?.length > 10) {
      setNumberOfImagesError("Minimum 10 images");

      return;
    }
    if (id) {
      const formData = new FormData();
      for (let i = 0; i < vihicleImages?.length; i++) {
        formData.append(`vihicle_images`, vihicleImages[i]);
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }

      updateVihicle({ body: formData, id: id });
    }
  };

  if (updateData) {
    toggleModal();
    toast.success("Vihicle updated successfully.");

    window.location.replace(
      `/dashboard/vihicles?car_name=&car_type=&transmission_type=&min_price=&max_price=&page=`
    );
  }

  //   Imgage preview
  const renderPreview = (vihicle_images: any) => {
    if (vihicleImages === undefined) {
      return;
    }
    return (
      <div
        className=" gap-2.5 p-2 overflow--x-hidden  my-2.5 grid grid-flow-col grid-rows-1 pb-3 overflow-x-auto overflow-y-hidden  py-4  mx-auto   w-auto max-w-xl   
      hover:scrollbar-thumb-primary/80 scrollbar-thumb-rounded-lg scrollbar-track-gray-50  scrollbar-thumb-primary 
    scrollbar-thin"
      >
        {Array.from(vihicle_images).map((file: any) => {
          return (
            <div key={file} className=" relative h-24 w-24 group rounded-md">
              <img
                // src={`${import.meta.env.VITE_IMAGE_URL}/images/${file}`}
                src={URL.createObjectURL(file)}
                alt=""
                className="object-contain w-full h-full rounded-md"
              ></img>
              <div className="absolute hidden group-hover:block bg-black/40 w-full h-full z-20 inset-0 rounded-md ">
                <span
                  onClick={() => removeFile(file)}
                  className=" absolute right-0 z-30 text-xl text-white"
                >
                  {" "}
                  <ImCancelCircle />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Remove selected file

  const removeFile = (file: any) => {
    const updated_files = Array.from(vihicleImages).filter(
      (f: any) => f !== file
    );

    clearErrors("vihicle_images");
    setNumberOfImagesError("");

    setVihicleImages(updated_files);
  };

  return (
    <div
      className={`${
        isOpen
          ? "fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/70  w-full p-4   h-screen"
          : "hidden"
      }`}
    >
      <Transition
        show={isOpen}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-1"
        leaveTo="opacity-0"
      >
        <div className="absolute  max-h-[95vh]  overflow-y-scroll flex flex-col bg-white max-w-4xl my-auto md:mx-auto inset-0 mx-2 px-2 md:px-6 pb-8   rounded-md  ">
          <div className="mb-16">
            {" "}
            <></>
            <ModalButton toggleModal={toggleModal} />
          </div>
          {error && (
            <p className="text-red-500 mb-2 text-sm">{rtkErrors(error)}</p>
          )}
          {updateError && (
            <p className="text-red-500 mb-2 text-sm">
              {rtkErrors(updateError)}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row w-full items-center gap-4">
              <div className="mb-2.5 w-full">
                <label
                  htmlFor="vihicle_name"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 "
                >
                  Vihicle Name
                </label>
                <input
                  type="text"
                  id="vihicle_name"
                  className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Toyota Ractis"
                  {...register("vihicle_name")}
                />
                <div className="text-xs text-left text-red-500">
                  {errors.vihicle_name && <p>{errors.vihicle_name.message}</p>}
                </div>
              </div>
              <div className="mb-2.5 w-full">
                <label
                  htmlFor="vihicle_type"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Vihicle Type
                </label>
                <select
                  {...register("vihicle_type")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    {" "}
                    Select Vihicle Type
                  </option>
                  {make.map((mk, idx) => {
                    return (
                      <>
                        {" "}
                        <option key={idx} value={mk}>
                          {mk}
                        </option>
                      </>
                    );
                  })}
                </select>
                <div className="text-xs text-left text-red-500">
                  {errors.vihicle_type && <p>{errors.vihicle_type.message}</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center gap-4">
              <div className="mb-2.5 w-full">
                <label
                  htmlFor="transmission_type"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transmission Type
                </label>
                <select
                  {...register("transmission_type")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Transmission
                  </option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
                <div className="text-xs text-left text-red-500">
                  {errors.transmission_type && (
                    <p>{errors.transmission_type.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-2.5 w-full">
                <label
                  htmlFor="badge"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Badge
                </label>
                <select
                  {...register("badge")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Bage
                  </option>
                  <option value="hire">Hire</option>
                  <option value="sale">Sale</option>
                </select>
                <div className="text-xs text-left text-red-500">
                  {errors.badge && <p>{errors.badge.message}</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center gap-4">
              <div className="my-2.5 w-full">
                <label
                  htmlFor="no_of_passengers"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                  No of Passengers
                </label>
                <input
                  type="number"
                  {...register("no_of_passengers")}
                  id="no_of_passengers"
                  className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="4"
                  required
                />
                <div className="text-xs text-left text-red-500">
                  {errors.no_of_passengers && (
                    <p>{errors.no_of_passengers.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-2.5 w-full">
                <label
                  htmlFor="location"
                  className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <select
                  {...register("location")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Location
                  </option>
                  <option value="nairobi">Nairobi</option>
                  <option value="nakuru">Nakuru</option>
                  <option value="mombasa">Mombasa</option>
                </select>
                <div className="text-xs text-left text-red-500">
                  {errors.location && <p>{errors.location.message}</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full items-center gap-4">
              <div className="my-2.5 w-full">
                <label
                  htmlFor="fuel_consumption"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fuel Consumption (KM/ltr)
                </label>
                <input
                  type="number"
                  {...register("fuel_consumption")}
                  id="fuel_consumption"
                  className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="10"
                  required
                />
                <div className="text-xs text-left text-red-500">
                  {errors.fuel_consumption && (
                    <p>{errors.fuel_consumption.message}</p>
                  )}
                </div>
              </div>
              <div className="my-2.5 w-full">
                <label
                  htmlFor="hire_price"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hire Price(KES)
                </label>
                <input
                  type="number"
                  {...register("hire_price")}
                  id="hire_price"
                  className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="2000"
                  required
                />
                <div className="text-xs text-left text-red-500">
                  {errors.hire_price && <p>{errors.hire_price.message}</p>}
                </div>
              </div>
            </div>

            <div className="my-2.5 w-full">
              <label
                htmlFor="vihicle_name"
                className="block mb-2 text-left text-sm  font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                className="bg-white border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32 "
                placeholder="Give a brief description here..."
              />
              <div className="text-xs text-left text-red-500">
                {errors.description && <p>{errors.description.message}</p>}
              </div>
            </div>
            <div className=" text-sm font-medium text-gray-900 bg-gray-50 rounded-lg border border-gray-200  my-2.5 pb-2">
              <ul className="w-full grid grid-flow-col md:grid-rows-2 grid-rows-3 my-2.5 p-2 ">
                {features.map((f, _) => {
                  return (
                    <li key={f} className="w-full p-2">
                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          {...register("features")}
                          value={f}
                          className="w-4 h-4 accent-black bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="features"
                          className=" py-3  text-sm font-medium "
                        >
                          {f}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="text-xs text-center text-red-500">
                {" "}
                {errors.features && <p>{errors.features.message}</p>}
              </div>
            </div>
            <div className="my-6 w-full flex flex-col items-start">
              <label
                htmlFor="vihicle_images"
                className="block text-left text-sm font-medium text-gray-900 "
              >
                Vihicle Images
              </label>
              <p className="text-xs text-gray-700 mb-2 ">
                First picture - is the title picture
              </p>
              <input
                type="file"
                className=" max-w-[6.45rem] overflow-clip"
                multiple
                {...register("vihicle_images")}
                onChange={(e: any) => {
                  setVihicleImages(Array.from(e.target.files));
                }}
              />
              {renderPreview(vihicleImages)}
              <div className="text-xs text-center text-red-500">
                {errors.vihicle_images && (
                  <p>{errors.vihicle_images.message?.toString()}</p>
                )}
                {no_of_images_error && <p>{no_of_images_error}</p>}
              </div>{" "}
            </div>
            <p>Supported formats are *.jpg and *.png</p>
            <button
              type="submit"
              disabled={!isDirty}
              className="  bg-primary px-6 py-2 rounded-md border-2 border-solid mt-8
   text-white border-transparent transition-all duration-300 w-full
     ease-in-out hover:bg-black "
            >
              {isLoadingUpdate ? (
                <Spinner height={14} width={2} color="white" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </Transition>
    </div>
  );
};

export default EditVihicleModal;
