import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useContext } from "react";
import { Spinner } from "../../../../components/Loaders";
import { Transition } from "@headlessui/react";
import ModalButton from "../../../../components/Modals/AuthModal/ModalButton";
import { AddPackageContext } from "../../../../Context/AddPackageContext";
import { rtkErrors } from "../../../../utils/rtkErrors";
import { useCreatePackageMutation } from "../../../../features/api/apiSlice";

const AddPackageModal = () => {
  const [createPackage, { isLoading, error, data, isSuccess }] =
    useCreatePackageMutation();

  const { isOpen, toggleAddPackageModal }: any = useContext(AddPackageContext);

  if (data && isSuccess) {
    toast.success("Package created successfully");
    toggleAddPackageModal();
    window.location.reload();
  }

  return (
    <>
      {isOpen && (
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
            <div className="absolute  max-h-[80vh] overflow-y-scroll flex flex-col bg-white max-w-md my-auto md:mx-auto inset-0 mx-2 px-2 md:px-6 pb-8   rounded-md  scrollbar-thin scrollbar-thumb-primary/30  scrollbar-thumb-rounded-md scrollbar-track-primary/10   ">
              <div className="mb-16">
                <ModalButton toggleModal={toggleAddPackageModal} />
              </div>
              <Formik
                enableReinitialize={false}
                initialValues={{
                  title: "",
                  price: "",
                  limit: "",
                  leads: false,
                  promoted: false,
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Title is required"),
                  price: Yup.number()
                    .min(1000, "No package under KES 1000")
                    .required("Required"),
                  limit: Yup.number()
                    .min(5, "Must be 5 or more")
                    .required("Required"),
                  leads: Yup.boolean()
                    .oneOf([true, false], "")

                    .required("Required"),
                  promoted: Yup.boolean()
                    .oneOf([true, false], "")

                    .required("Required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  createPackage({ body: values });
                  setSubmitting(false);
                }}
              >
                {() => (
                  <Form>
                    <div className="pb-2">
                      {error && (
                        <p className="text-red-500 text-sm">
                          {rtkErrors(error)}
                        </p>
                      )}
                      <h1 className="text-center font-semibold ">
                        Create Package
                      </h1>
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>

                      <Field
                        type="text"
                        name="title"
                        className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Package title"
                      />
                      <div className="text-xs text-left text-red-500">
                        <ErrorMessage name="title" />
                      </div>
                    </div>
                    <div className="my-2.5">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <Field
                        type="number"
                        name="price"
                        className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="price"
                        required
                      />
                      <div className="text-xs text-left text-red-500">
                        <ErrorMessage name="price" />
                      </div>
                    </div>
                    <div className="my-2.5">
                      <label
                        htmlFor="limit"
                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Listing Limit
                      </label>
                      <Field
                        type="number"
                        name="limit"
                        className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="limit"
                        required
                      />
                      <div className="text-xs text-left text-red-500">
                        <ErrorMessage name="limit" />
                      </div>
                    </div>

                    <div className="mb-2.5">
                      <label
                        htmlFor="accountType"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        View Lead Contact
                      </label>
                      <Field
                        as="select"
                        name="leads"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Field>
                      <div className="text-xs text-left text-red-500">
                        <ErrorMessage name="leads" />
                      </div>
                    </div>
                    <div className="mb-2.5">
                      <label
                        htmlFor="accountType"
                        className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Free promoted listing
                      </label>
                      <Field
                        as="select"
                        name="promoted"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Field>
                      <div className="text-xs text-left text-red-500">
                        <ErrorMessage name="promoted" />
                      </div>
                    </div>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className="  bg-primary px-6 py-2 rounded-md border-2 border-solid mt-2
   text-white border-transparent transition-all duration-300 w-full
     ease-in-out hover:bg-black "
                    >
                      {isLoading ? (
                        <Spinner height={14} width={2} color="white" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition>
        </div>
      )}
    </>
  );
};

export default AddPackageModal;
