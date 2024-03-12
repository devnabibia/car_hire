import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../../features/api/apiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Spinner } from "../../Loaders";
import Cookies from "js-cookie";

const SignIn = () => {
  const [loginUser, { data, isLoading, isSuccess, error }] =
    useLoginUserMutation();
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
    toast.success("Login successfull.");
    Cookies.set("token", data && data.token);
    Cookies.set("user_id", data && data._id);
    window.location.replace("/dashboard");
  }

  return (
    <div className="mx-4 ">
      <Formik
        enableReinitialize={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await loginUser(values);
          setSubmitting(false);
        }}
      >
        <Form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />{" "}
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />{" "}
              <span
                onClick={toggleShowPassword}
                className="absolute right-4 top-4"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="password" />
            </div>
          </div>

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
              "Sign In"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
