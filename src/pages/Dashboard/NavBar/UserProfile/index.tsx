import { Spinner } from "../../../../components/Loaders";
import { useGetUserByIdQuery } from "../../../../features/api/apiSlice";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserProfileContext } from "../../../../Context/UserProfileContext";
import { rtkErrors } from "../../../../utils/rtkErrors";

const UserProfile = () => {
  const { toggleUserProfile }: any = useContext(UserProfileContext);
  const { isLoading, data, error } = useGetUserByIdQuery(
    Cookies.get("user_id")
  );

  console.log(data?.data);

  return (
    <>
      <div
        onClick={toggleUserProfile}
        className="bg-transparent fixed w-screen h-screen"
      ></div>
      <div className="   bg-white py-4 border rounded-md w-56 max-h-  fixed top-16 right-2 z-50 ">
        {data && (
          <div className="flex items-start gap-4 p-2 flex-col divide-y-[1px]">
            <div>
              <p className="text-left">{data?.data.name}</p>
              <p className="font-semibold text-sm">{data?.data.email}</p>
            </div>
            <div className=" w-full hover:bg-gray-100">
              <button className="text-left w-full text-gray-500 text-sm">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-xs">{rtkErrors(error)}</p>}

        {isLoading && (
          <div className="flex w-full h-full items-center justify-center">
            <Spinner width={3} height={18} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
