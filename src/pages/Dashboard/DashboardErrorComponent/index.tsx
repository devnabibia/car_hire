import { FaInfoCircle } from "react-icons/fa";
import { rtkErrors } from "../../../utils/rtkErrors";
import { AiOutlineReload } from "react-icons/ai";

interface DashboardErrorComponentProps {
  error: any;
}

const DashboardError = ({ error }: DashboardErrorComponentProps) => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <div className="mx-auto flex flex-col space-y-4  items-center justify-center my-auto pt-32 ">
      <p className="max-w-[20rem] mx-auto text-center">
        <span className="mr-2 inline-block">
          <FaInfoCircle />
        </span>
        {rtkErrors(error)}
      </p>
      <button
        onClick={reloadPage}
        className=" flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg "
      >
        <span className="inline pr-2">
          <AiOutlineReload />
        </span>
        Reload
      </button>
    </div>
  );
};

export default DashboardError;
