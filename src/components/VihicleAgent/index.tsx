import React from "react";
import CustomLink from "../CustomLink";
import { FaPhone, FaUser, FaWhatsapp } from "react-icons/fa6";
import { useGetUserByIdQuery } from "../../features/api/apiSlice";
import { Spinner } from "../Loaders";
import RequestCallBack from "./RequestCallBack";

interface UserIdProps {
  owner_id: any;
  vihicle: any;
}

const Owner: React.FC<UserIdProps> = ({ owner_id, vihicle }) => {
  const { data, error, isLoading } = useGetUserByIdQuery(owner_id && owner_id);
  var errorMsg = "";
  if (error) {
    if ("status" in error) {
      "error" in error
        ? (errorMsg = error.error)
        : (errorMsg = JSON.parse(JSON.stringify(error.data)).msg);
    }
  }

  const member_since: number = new Date(
    data ? data?.data?.createdAt : ""
  ).getFullYear();

  console.log(member_since);

  let user_name = data?.data?.name.replace(/\b\w/g, function (l: any) {
    return l.toUpperCase();
  });

  const listing_age = Math.ceil(
    (new Date().getTime() - new Date(vihicle?.createdAt).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  return (
    <div>
      <div className=" flex flex-col bg-white border rounded-md  mt-2 py-4 px-4 gap-8  ">
        <div className="relative w-full flex flex-row items-center  gap-4 justify-center ">
          <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full ">
            <p className="font-semibold text-2xl text-left">
              {user_name?.charAt(0)}
            </p>
          </div>

          {data && (
            <div className="flex justify-start flex-col">
              <h2 className="text-lg font-semibold text-left">{user_name}</h2>
              <div className="flex flex-row items-center justify-center gap-2 ">
                <span className="text-sm text-gray-300">
                  <FaUser />
                </span>
                <p className="text-sm">
                  Member since <>{member_since}</>
                </p>
              </div>
            </div>
          )}

          {<p>{error && errorMsg}</p>}

          {isLoading && <Spinner height={12} width={3}></Spinner>}
        </div>
        <hr></hr>
        <div className="text-left">
          <p>
            Listed{" "}
            <span className="font-semibold">
              <>{listing_age}</>day(s){" "}
            </span>
            Ago
          </p>
        </div>
        <div className="flex flex-row justify-between gap-4 ">
          <CustomLink
            to={`tel:${data?.data?.phone_number}`}
            Icon={<FaPhone />}
            variant="filled"
            isBlank={true}
            text="Call Agent"
          ></CustomLink>
          <CustomLink
            isBlank={true}
            Icon={<FaWhatsapp />}
            to={`https://wa.me/${data?.data?.phone_number}?text=Hello, Lets talk about ${vihicle.vihicle_name}!`}
            variant="outlined"
            text="Message Agent"
          ></CustomLink>
        </div>
      </div>
      <RequestCallBack agent_id={owner_id} vihicle_id={vihicle._id} />
      <div className="bg-white border rounded-md flex flex-col px-8 py-8 mt-2">
        <h2 className="font-semibold text-xl mb-4">Safety Tips</h2>
        <ul className="list-disc text-left">
          <li>Avoid paying in advance</li>
          <li>Meet with the agent at a safe public place</li>
          <li>
            Only pay if you're satisfied that the vihicle was the one requested
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Owner;
