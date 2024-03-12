import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { RequestCallBackContext } from "../../../../Context/RequestCallBackContext";
import { Transition } from "@headlessui/react";
import { useCreateRequestCallBackMutation } from "../../../../features/api/apiSlice";
import { RequestCallBackProps } from "../../../../components/VihicleAgent/RequestCallBack";
import { Spinner } from "../../../../components/Loaders";
import useRtkErrors from "../../../../CustomHooks/RtkErrors";

const RequestCallBackModal = ({
  vihicle_id,
  agent_id,
}: RequestCallBackProps) => {
  const { toggleRCModal, isOpen }: any = useContext(RequestCallBackContext);
  const [sendRC, { data, isLoading, error, isSuccess }] =
    useCreateRequestCallBackMutation();
  //   console.log("data", data);
  //   console.log("error", error);

  let errorMsg = useRtkErrors(error);

  console.log(errorMsg);

  if (isSuccess && data) {
    toast.success("Request sent successfully");
    window.location.replace(`/car-details/${vihicle_id}`);
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/70  w-full p-4   h-screen">
      <Transition
        show={isOpen}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-1"
        leaveTo="opacity-0"
      >
        <div className=" w-full h-full max-h-[25rem] max-w-[20rem] p-4 pt-16 overflow-auto absolute   flex flex-col bg-white my-auto md:mx-auto inset-0 mx-2 px-2 md:px-6   rounded-md ">
          {error && <p className="text-red-500 text-xs mb-4">{errorMsg}</p>}
          <div className="flex items-start">
            <h2 className="font-bold mb-2">Request Callback</h2>
          </div>
          <hr className=" mb-8"></hr>
          <button
            onClick={toggleRCModal}
            type="button"
            className="absolute  top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <Formik
            initialValues={{
              name: "",
              phone_number: "",
            }}
            validationSchema={yup.object({
              name: yup
                .string()

                .required("Name is required"),
              phone_number: yup.number().required("Phone is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const rc_body = {
                client_name: values.name,
                client_phone: values.phone_number,
                vihicle_id,
                agent_id,
              };

              sendRC(rc_body);
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="flex items-start flex-col">
                <label htmlFor="name" className="text-left text-sm">
                  Full Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="John Dau"
                ></Field>
                <p className="text-red-400 font-light text-xs">
                  <ErrorMessage name="name" />
                </p>
              </div>

              <div className="flex items-start flex-col mt-4">
                <label htmlFor="phone_number" className="text-left text-sm">
                  Phone Number
                </label>
                <Field
                  name="phone_number"
                  type="number"
                  className="bg-gray-50 border  border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="071234567"
                ></Field>
                <p className="text-red-400 font-light text-xs">
                  <ErrorMessage name="phone_number" />
                </p>
              </div>

              <div className="flex mt-4 w-full justify-end">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="  bg-primary px-6 py-2 rounded-md border-2 border-solid
   text-white border-transparent transition-all duration-300 w-full
     ease-in-out hover:bg-black "
                >
                  {isLoading ? (
                    <Spinner height={14} width={2} color="white" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Transition>
    </div>
  );
};

export default RequestCallBackModal;
