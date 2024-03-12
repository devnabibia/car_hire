import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { PackagesProps } from "../../../Types";
import UpdatePackageModal from "../DashboardModals/UpdatePackageModal";
import DeletePackageModal from "../DashboardModals/DeletePackageModal";

const PackageCard = ({
  _id,
  limit,
  price,
  leads,
  promoted,
  title,
}: PackagesProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [deletePackageModalOpen, setDeletePackageModalOpen] =
    useState<boolean>(false);
  const [updatePackageModalOpen, setUpdatePackageModalOpen] =
    useState<boolean>(false);
  const toggleDeletePackageModalOpen = () => {
    setDeletePackageModalOpen((prev) => !prev);
  };
  const toggleUpdatePackageModalOpen = () => {
    setUpdatePackageModalOpen((prev) => !prev);
  };
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  return (
    <>
      <div className="relative bg-white border rounded-lg group shadow-md  p-4 pt-0 px-0 max-w-xl">
        <span
          onClick={toggleMenu}
          className="absolute right-2 top-2 text-xl p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {showMenu ? <CgClose /> : <BsThreeDotsVertical />}
        </span>
        {showMenu && (
          <>
            <div className=" absolute top-12 shadow-md right-4 z-10 bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700">
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <div
                    onClick={toggleUpdatePackageModalOpen}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Update Package{" "}
                    <span className="inline-block px-2">
                      <FaEdit />
                    </span>
                  </div>
                </li>
                <li>
                  <span
                    onClick={toggleDeletePackageModalOpen}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete Package
                    <span className="inline-block px-2">
                      <BsTrash />
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </>
        )}
        <div className=" flex flex-col  justify-center w-full gap-4 ">
          <div className="bg-primary/15 py-8 rounded-b-[50%] rounded-t-lg group-hover:bg-orange-500 duration-500">
            <p className="font-light text-2xl mb-4 uppercase">{title}</p>
            <div>
              <p className="font-bold text-xl">
                KSH <span> {price}</span>
                <span className="text-sm font-light"> / Month</span>
              </p>
            </div>
          </div>
          <table className="flex flex-col p-4  mx-auto ">
            <tbody>
              <tr>
                <td className="border px-16 py-2.5">
                  <p>Vehicle Listing Limit</p>
                </td>
                <td className="border px-8 py-2.5">
                  <p className="text-left">{limit}</p>
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2.5 ">
                  <p>View lead contact details </p>
                </td>
                <td className="border px-8 py-2.5">
                  {leads ? (
                    <span className="text-left text-green-500 ">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                  ) : (
                    <span className="text-left text-red-500 ">
                      <MdOutlineCancel />
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-8 py-2.5 ">
                  <p>1 FREE promoted listing</p>
                </td>
                <td className="border px-8 py-2.5">
                  {promoted ? (
                    <span className="text-left text-green-500 ">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                  ) : (
                    <span className="text-left text-red-500 ">
                      <MdOutlineCancel />
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {deletePackageModalOpen && (
          <DeletePackageModal
            _id={_id}
            toggleDeletePackageModalOpen={toggleDeletePackageModalOpen}
          />
        )}

        {updatePackageModalOpen && (
          <UpdatePackageModal
            _id={_id}
            updatePackageModalOpen={updatePackageModalOpen}
            toggleUpdatePackageModalOpen={toggleUpdatePackageModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default PackageCard;
