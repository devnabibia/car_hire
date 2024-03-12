import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../../../features/api/apiSlice";
import toast from "react-hot-toast";
import { Spinner } from "../../Loaders";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import Cookies from "js-cookie";

const SignUp = () => {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [registerUser, { isLoading, data, error, isSuccess }] =
    useRegisterUserMutation();

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
    toast.success("Account created successfully.");
    Cookies.set("token", data && data.token);
    Cookies.set("user_id", data && data._id);

    window.location.replace("/");
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const phone_reg_expr = /^(\+?254|0)[17]\d{8}$/;
  return (
    <div className="mx-4 ">
      <Formik
        enableReinitialize={false}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone_number: "",
          role: "normal",
          tnc: false,
        }}
        validationSchema={Yup.object({
          phone_number: Yup.string()
            .matches(phone_reg_expr, "Phone number is invalid")
            .required("Phone is required"),
          name: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), undefined],
            "Passwords must match"
          ),
          role: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          tnc: Yup.boolean().oneOf(
            [true],
            "You must accept the terms and conditions."
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await registerUser(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="John"
            />
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="my-2.5">
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
              className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="name@company.com"
              required
            />
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="my-2.5">
            <label
              htmlFor="email"
              className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <Field
              type="phone"
              name="phone_number"
              id="phone_number"
              className="bg-gray-50 border accent-primary border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              placeholder="+254700..."
              required
            />
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="phone_number" />
            </div>
          </div>
          <div className="mb-2.5">
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
          <div className="mb-2.5">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <div className="relative">
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              ></Field>
              <span
                onClick={toggleShowConfirmPassword}
                className="absolute right-4 top-4"
              >
                {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>

            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="confirmPassword" />
            </div>
          </div>

          <div className="mb-2.5">
            <label
              htmlFor="accountType"
              className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Account Type
            </label>
            <Field
              as="select"
              name="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
            >
              <option value="normal">Normal User</option>
              <option value="partner">Partner</option>
            </Field>
            <div className="text-xs text-left text-red-500">
              <ErrorMessage name="role" />
            </div>
          </div>

          <div className="flex items-start mt-5">
            <div className="flex items-center h-5">
              <Field
                name="tnc"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border accent-primary border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="text-xs text-left text-red-500 mb-5">
            <ErrorMessage name="tnc" />
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
              "SignUp"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
