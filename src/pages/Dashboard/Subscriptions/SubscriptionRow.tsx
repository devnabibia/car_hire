import toast from "react-hot-toast";
import { useUnsubscribeMutation } from "../../../features/api/apiSlice";
import { rtkErrors } from "../../../utils/rtkErrors";

interface SubscriptionRowProps {
  email: string;
  status: boolean;
  created: string;
}

const SubscriptionRow = ({ email, status, created }: SubscriptionRowProps) => {
  const subscription_status = status === false ? "Unsubscribed" : "Active";

  const [unsubscribe, { data, error }] = useUnsubscribeMutation();

  const errMsg = rtkErrors(error);

  if (error) {
    toast.error(errMsg);
  }

  if (data) {
    toast.success(data?.msg);
  }

  const handleCheckboxChange = () => {
    unsubscribe({
      email: email,
      isActive: status === true ? false : true,
    });
    window.location.reload();
  };

  return (
    <>
      <tr className="bg-white border-b overflow-auto w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="pl-3">
            <div className="text-base font-medium ">{email}</div>
          </div>
        </th>
        <td className="">
          <div className="flex items-center">{created}</div>
        </td>

        <td className=" py-4 px-4">
          <div className="flex items-center  text-center">
            <span
              className={`${
                subscription_status === "Active"
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
              }`}
            >
              {subscription_status}
            </span>
          </div>
        </td>
        <td className=" py-4 flex flex-row space-x-4">
          <label className=" relative group  inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              name="autoSaver"
              className="sr-only"
              checked={status}
              onChange={handleCheckboxChange}
            />
            <span
              className={` mr-3 flex h-[18px] w-[48px] items-center rounded-full p-1 duration-200 ${
                !status ? "bg-red-800" : "bg-green-800"
              }`}
            >
              <span
                className={`dot h-[16px] w-[16px] rounded-full bg-white duration-200 ${
                  status ? "translate-x-6" : ""
                }`}
              ></span>
            </span>
            <div className="text-white text-xs rounded-md w-24 px-0.5 text-center  py-2 absolute -top-9 -left-4 bg-black hidden  group-hover:flex transition duration-500 ease-in-out">
              <span className=" w-full">
                {status ? "Unsubscribe" : "Subscribe email"}
              </span>
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </label>
        </td>
      </tr>
    </>
  );
};

export default SubscriptionRow;
