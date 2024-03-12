import { FiExternalLink } from "react-icons/fi";
import { useGetVihicleByIdQuery } from "../../../features/api/apiSlice";
import { Link } from "react-router-dom";
import useRtkErrors from "../../../CustomHooks/RtkErrors";

interface NotificationRawProps {
  client_name: string;
  vihicle_id: string;
  created: string;
  client_phone: boolean;
}

const NotificationRaw = ({
  client_name,
  vihicle_id,
  created,
  client_phone,
}: NotificationRawProps) => {
  const { data, error, isLoading } = useGetVihicleByIdQuery(vihicle_id);

  const errMsg = useRtkErrors(error);

  return (
    <>
      <tr className="bg-white border-b overflow-auto  w-full dark:border-gray-700 hover:bg-gray-50 ">
        <th
          scope="row"
          className="flex items-start py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className=" flex flex-row gap-2 pl-3 hover:underline">
            <Link
              to={`/dashboard/vihicles/${data?.data._id}`}
              className=" font-medium "
            >
              {data?.data.vihicle_name}
            </Link>

            {isLoading && <div>...</div>}
            {error && <p>{errMsg}</p>}
            <FiExternalLink />
          </div>
        </th>
        <td className="">
          <div className="flex items-center">{created}</div>
        </td>
        <td className=" py-4 text-left">{client_name}</td>

        <td className=" py-4 ">
          <Link
            to={`tel:${client_phone}`}
            className="flex items-center hover:underline"
          >
            {client_phone}
          </Link>
        </td>
      </tr>
    </>
  );
};

export default NotificationRaw;
