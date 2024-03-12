import { FaPlus } from "react-icons/fa6";
import PackageCard from "./PackageCard";
import { useContext } from "react";
import { AddPackageContext } from "../../../Context/AddPackageContext";

import { useGetAllPackagesQuery } from "../../../features/api/apiSlice";
import { PackagesProps } from "../../../Types";
import { PackageSkeleton } from "../../../components/Loaders";
import AddPackageModal from "../DashboardModals/AddPackageModal";
import DashboardError from "../DashboardErrorComponent";

const Billing = () => {
  const { data, isLoading, error } = useGetAllPackagesQuery();

  const { toggleAddPackageModal }: any = useContext(AddPackageContext);

  return (
    <div>
      <div className="flex flex-row  items-start  justify-between mx-2 w-full max-w-6xl   ">
        <div className="flex flex-col ">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleAddPackageModal}
              className="px-4 text-center  py-4 mb-2 border-4 border-gray-400 border-dotted text-gray-500 rounded-xl "
            >
              <span className="">
                {" "}
                <FaPlus />
              </span>{" "}
            </button>
          </div>
          <span className="text-sm pb-8 text-gray-600">New Package</span>
        </div>
      </div>
      {error && !isLoading && <DashboardError error={error} />}
      {data?.packages.length === 0 && (
        <p className="font-light">There are no package(s) at the moment.</p>
      )}

      <div className="w-full mx-auto grid gap-4 grid-flow-row sm:grid-cols-2 xs:grid-cols-1  lg:grid-cols-3   max-w-7xl  px-4 ">
        {isLoading && <PackageSkeleton skeletonList={6} />}
        {data?.packages.map((pkg: PackagesProps) => {
          return (
            <PackageCard
              key={pkg.title}
              _id={pkg._id}
              title={pkg.title}
              limit={pkg.limit}
              price={pkg.price}
              promoted={pkg.promoted}
              leads={pkg.leads}
            />
          );
        })}
      </div>

      <AddPackageModal />
    </div>
  );
};

export default Billing;
