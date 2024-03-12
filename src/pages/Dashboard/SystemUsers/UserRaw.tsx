import { FaEye, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DeleteUserModal from "../DashboardModals/DeleteUserModal";
import { useState } from "react";
import { useSuspendAccountMutation } from "../../../features/api/apiSlice";

interface UserRawProps {
  name: string;
  email: string;
  role: string;
  status: boolean;
  phone: string;
  lastLogged: string;
  id: string;
}

const UserRaw: React.FC<UserRawProps> = ({
  name,
  email,
  role,
  status,
  phone,
  lastLogged,
  id,
}: UserRawProps) => {
  const user_status = status === false ? "Suspended" : "Active";
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const toggleConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(!showConfirmDeleteModal);
  };

  const [suspendAccount] = useSuspendAccountMutation();

  const handleCheckboxChange = async () => {
    await suspendAccount({ id: id, active: status === true ? false : true });
    window.location.reload();
  };

  return (
    <>
      {showConfirmDeleteModal && (
        <DeleteUserModal
          toggleModal={toggleConfirmDeleteModal}
          user_id={id}
          client_name={name}
        />
      )}
      <tr className="bg-white border-b  overflow-auto w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="pl-3">
            <div className="text-base font-medium">{name}</div>
          </div>
        </th>
        <td className="">
          <div className="flex items-center">{email}</div>
        </td>
        <td className=" py-4">{phone}</td>

        <td className=" py-4 px-4">
          <div className="flex items-center">{role}</div>
        </td>
        <td className=" py-4 px-4">
          <div className="flex items-center text-xs ">{lastLogged}</div>
        </td>
        <td className=" py-4 px-4">
          <div className="flex items-center  text-center">
            <span
              className={`${
                user_status === "Active"
                  ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
                  : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
              }`}
            >
              {user_status}
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
              className={` mr-3 flex h-[20px] w-[45px] items-center rounded-full p-1 duration-200 ${
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
                {status ? "Suspend Account" : "Activate Account"}
              </span>
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </label>

          <Link
            to={`/dashboard/system-users/user-details/${id}`}
            className="text-gray-500 group relative  bg-gray-50 p-2 rounded-md hover:text-blue-500"
          >
            <FaEye />
            <div className="text-white text-xs rounded-md w-24 px-0.5 text-center  py-2 absolute -top-8 -left-6 bg-black hidden  group-hover:flex transition duration-500 ease-in-out">
              <span className=" w-full">View Details</span>
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </Link>
          <button
            onClick={toggleConfirmDeleteModal}
            className="text-gray-600 group relative bg-gray-50 p-2 rounded-md hover:text-red-500 "
          >
            <FaTrash />
            <div className="text-white text-xs rounded-md w-24 px-0.5 text-center  py-2 absolute -top-8 -left-6 bg-black hidden  group-hover:flex transition duration-500 ease-in-out">
              <span className=" w-full">Delete user</span>
              <span className="bg-black absolute w-3 h-3 -bottom-1 left-8 rotate-45"></span>
            </div>
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserRaw;
