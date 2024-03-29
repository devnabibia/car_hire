import { CgDanger } from "react-icons/cg";
import { Spinner } from "../../../../components/Loaders";
import { rtkErrors } from "../../../../utils/rtkErrors";
import { useRemoveVihicleMutation } from "../../../../features/api/apiSlice";
import toast from "react-hot-toast";

interface DeleteVihicleProps {
  data: any;
  toggleModal: any;
}

const DeleteVihicleModal = ({ toggleModal, data }: DeleteVihicleProps) => {
  const { vihicle_name, _id } = data;

  const [removeVihicle, { isLoading, error, isSuccess }] =
    useRemoveVihicleMutation();

  if (isSuccess) {
    toggleModal();
    toast.success("Vihicle removed successfully.");
    window.location.replace(
      "/dashboard/vihicles?car_name=&car_type=&transmission_type=&min_price=&max_price=&page="
    );
  }

  return (
    <div>
      {" "}
      <div
        id="deleteModal"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed h-screen top-0 right-0 left-0 z-50 justify-center bg-gray-700/35   items-center w-full inset-0 "
      >
        <div className="relative p-4 w-screen  bg-gray-900 bg-opacity-40 h-screen">
          <div className="relative  z-40 p-4 text-center bg-white rounded-lg max-w-lg  mx-auto shadow  sm:p-5">
            <button
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            {error && <p className="text-red-500">{rtkErrors(error)}</p>}
            <p className="mt-12 text-gray-900 text-lg font-light mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{vihicle_name}</span>
            </p>
            <div className=" bg-red-50 text-red-800 rounded-md mb-4 px-2 py-6">
              <div className="flex flex-row items-center justify-start space-x-2 ">
                <span>
                  <CgDanger />
                </span>
                <p className="font-semibold text-sm">Warning</p>
              </div>
              <p className="text-start mt-2">
                This action is irreversible. Vihicle will be permanently reoved
                from the system.
              </p>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={toggleModal}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                type="submit"
                onClick={() => removeVihicle(_id)}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                {isLoading ? (
                  <Spinner color="white" height={12} width={2} />
                ) : (
                  " Yes, I'm sure"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteVihicleModal;
