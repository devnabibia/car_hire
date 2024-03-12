import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Spinner } from "../Loaders";
import toast from "react-hot-toast";
import { useSubscribeMutation } from "../../features/api/apiSlice";
const SubscribeForm = () => {
  const [subscribeUser, { error, isLoading, isSuccess, data }] =
    useSubscribeMutation();

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error
          ? error.error
          : JSON.parse(JSON.stringify(error.data)).msg;
      toast.error(errMsg);
    }
  }

  if (isSuccess && data) {
    toast.success(data.msg);
  }

  return (
    <Formik
      className="relative h-16 w-96 "
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required."),
      })}
      onSubmit={async (value, { setSubmitting, resetForm }) => {
        await subscribeUser(value);

        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className="relative h-16 w-96 ">
        <div>
          <Field
            type="email"
            name="email"
            id="email"
            className="bg-white px-2 py-5  h-full  border pr-44  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />{" "}
        </div>

        <div className="absolute top-2.5 right-2">
          <button
            disabled={isLoading}
            type="submit"
            className="  bg-primary px-8 py-2  rounded-md border-2 border-solid
   text-white border-transparent transition-all duration-300 w-44 
     ease-in-out hover:bg-black "
          >
            {isLoading ? (
              <Spinner height={14} width={2} color="white" />
            ) : (
              "Subscribe Now"
            )}
          </button>
        </div>
        <div className="text-xs text-left text-red-500">
          <ErrorMessage name="email" />
        </div>
      </Form>
    </Formik>
  );
};

export default SubscribeForm;
