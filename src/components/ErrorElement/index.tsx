import { useRouteError, useNavigate } from "react-router-dom";
import Button from "../Button";

type routerError = any;
const ErrorElement = () => {
  const error: routerError = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <p>Sorry, an unexpected error has occurred. Try again</p>
      <p>
        <i className="text-lg font-bold">{error.statusText || error.message}</i>
      </p>

      <div className="max-w-sm">
        {" "}
        <Button
          theme="filled"
          onClick={() => navigate(-1)}
          text="Back Home"
        ></Button>
      </div>
    </div>
  );
};

export default ErrorElement;
