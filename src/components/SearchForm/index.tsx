import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { make } from "../../Types";
import { Spinner } from "../Loaders";
import { useNavigate } from "react-router";

const SearchForm = ({ isLoading }: any) => {
  const navigate = useNavigate();

  const goToVihicles = (values: any) =>
    navigate({
      pathname: "/cars",
      search: `?car_name=${values.car_name}&car_type=${values.car_type}&transmission_type=${values.transmission_type}&min_price=${values.min_price}&max_price=${values.max_price}&page=&limit=`,
    });

  return (
    <div className="border rounded-md w-full py-8 px-4  shadow-l  h-full">
      <Formik
        initialValues={{
          car_name: "",
          car_type: "",
          transmission_type: "",
          min_price: "",
          max_price: "",
        }}
        validationSchema={Yup.object({
          car_name: Yup.string().lowercase(),
          transmission_type: Yup.string().oneOf(["manual", "automatic"]),
          min_price: Yup.number().min(2000, "Price must be 2000 or more."),
          max_price: Yup.number(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          goToVihicles(values);

          setSubmitting(false);
        }}
      >
        {({ resetForm }) => (
          <Form className="max-w-sm mx-auto  ">
            <div className="mb-5">
              <label
                htmlFor="vihicle_name"
                className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <Field
                name="car_name"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Toyota premio"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="vihicle_type"
                className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <Field
                as="select"
                name="car_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/10 accent-blacks focus:border-primary block w-full p-2.5 "
                defaultValue=""
              >
                <option value="" selected>
                  Choose type of Car
                </option>
                {make?.map((car_make, index) => {
                  return <option key={index}>{car_make}</option>;
                })}
              </Field>
            </div>
            <div className="mb-5">
              <label
                htmlFor="transmission_type"
                className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Transmission
              </label>
              <Field
                as="select"
                name="transmission_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/10 accent-blacks focus:border-primary block w-full p-2.5 "
                defaultValue=""
              >
                <option value="" selected>
                  Transmission Type
                </option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </Field>
              <div>
                <ErrorMessage name="transmission_type" />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className="block text-start mb-2 text-sm font-medium text-gray-900 "
              >
                Price
              </label>

              <div className="flex flex-row gap-6 justify-between">
                <Field
                  type="number"
                  name="min_price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary  block w-full p-2.5"
                  placeholder="min_price"
                />
                <div>
                  <ErrorMessage name="min_price" />
                </div>

                <Field
                  type="number"
                  name="max_price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary  block w-full p-2.5"
                  placeholder="max_price"
                ></Field>
              </div>
              <div></div>
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
                "Apply"
              )}
            </button>

            <button
              className="mt-2.5 px-6 py-2 rounded-md border-2 border-solid border-primary w-full"
              onClick={() => resetForm()}
            >
              Clear filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
