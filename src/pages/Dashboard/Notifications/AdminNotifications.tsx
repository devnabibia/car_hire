import { useGetRequestCallBackByIdQuery } from "../../../features/api/apiSlice";
import { Spinner } from "../../../components/Loaders";
import { AiOutlineReload } from "react-icons/ai";
import NotificationRaw from "./NofitificationRaw";
import useRtkErrors from "../../../CustomHooks/RtkErrors";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PaginationFooter from "../PaginationFooter";

const AdminNotifications = () => {
  const agent_id: any = Cookies.get("user_id");
  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const limit: any = 6;

  const { isLoading, error, data } = useGetRequestCallBackByIdQuery({
    agent_id: agent_id,
    page: page,
    q: q,
    limit: limit,
  });

  const [pageCount, setPageCount] = useState<any>(
    Math.ceil(data?.msg[0].totalDocs / limit)
  );

  useEffect(() => {
    data && setPageCount(Math.ceil(data?.msg[0].totalDocs / limit));
  }, [data]);

  const reloadPage = () => {
    window.location.reload();
  };

  const handlePageClick = (data: any) => {
    setPage(data.selected + 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
    setPage("");
  };

  const errMsg = useRtkErrors(error);

  const renderUI = () => {
    if (isLoading)
      return (
        <>
          <div className="mx-auto flex items-center justify-center  pt-32 my-auto">
            <Spinner />
          </div>
        </>
      );

    if (error)
      return (
        <>
          <div className="mx-auto flex flex-col space-y-4  items-center justify-center my-auto pt-32 ">
            <p>{errMsg} </p>
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
        </>
      );

    if (!error && !isLoading && data) {
      return (
        <>
          <div className="flex flex-col overflow-auto ">
            <div className=" shadow-md  rounded-t-md  overflow-auto  w-full    ">
              <div className="flex flex-row   w-full items-end justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full max-w-xs  ">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        onChange={handleSearch}
                        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type client name"
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div>
              <div>
                {data && data?.msg[0].data.map.length > 0 ? (
                  <div className="overflow-x-auto border pb-12 h-full max-h-[35rem] ">
                    <table className="w-full text-sm text-center  text-gray-600 ">
                      <thead className="text-xs text-gray-700 text-left bg-primary/30 border uppercase bg-gray-00 ">
                        <tr>
                          <th className=" py-3 pl-4">Vihicle</th>
                          <th className=" py-3">Created</th>
                          <th className=" py-3">client_Name</th>
                          <th className=" py-3">Client_Phone</th>
                        </tr>
                      </thead>
                      <tbody className="rounded-b-md">
                        {data?.msg[0].data.map((notification: any) => {
                          return (
                            <NotificationRaw
                              client_name={notification.client_name}
                              vihicle_id={notification.vihicle_id}
                              created={notification.createdAt}
                              client_phone={notification.client_phone}
                            />
                          );
                        })}
                      </tbody>
                    </table>

                    <PaginationFooter
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                      totalDocs={data?.msg[0].totalDocs}
                      docsLength={data?.msg[0].data.length}
                    />
                  </div>
                ) : (
                  <p className="flex justify-center items-center my-12 font-light">
                    There are no clients.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="mx-4">{renderUI()}</div>;
};

export default AdminNotifications;
