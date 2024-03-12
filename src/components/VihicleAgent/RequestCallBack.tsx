import { useContext } from "react";
import Button from "../Button";
import { RequestCallBackContext } from "../../Context/RequestCallBackContext";
import RequestCallBackModal from "../../pages/Dashboard/Modals/RequestCallBackModal";

export interface RequestCallBackProps {
  vihicle_id: string;
  agent_id: string;
}

const RequestCallBack = ({ vihicle_id, agent_id }: RequestCallBackProps) => {
  const { toggleRCModal, isOpen }: any = useContext(RequestCallBackContext);

  return (
    <>
      {isOpen && (
        <RequestCallBackModal vihicle_id={vihicle_id} agent_id={agent_id} />
      )}
      <div className="border rounded-md w-full bg-white mt-2 p-4">
        <div className="flex flex-col items-start gap-4 mb-8">
          <h2 className="font-semibold text-lg">Request Call Back</h2>
          <p className="text-left max-w-sm">
            Unable to reach the agent? Simply request a call back to alert them
            to contact you
          </p>
        </div>
        <Button
          theme="outlined"
          text="Request Call Back"
          onClick={toggleRCModal}
        />
      </div>
    </>
  );
};

export default RequestCallBack;
