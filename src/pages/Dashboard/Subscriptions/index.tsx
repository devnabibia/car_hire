import { useGetAllsubscriptionsQuery } from "../../../features/api/apiSlice";
import { Spinner } from "../../../components/Loaders";
import { AiOutlineReload } from "react-icons/ai";
import useRtkErrors from "../../../CustomHooks/RtkErrors";
import SubscriptionRow from "./SubscriptionRow";
import PaginationFooter from "../PaginationFooter";
import { useEffect, useState } from "react";
import Filter, { subscriptions_status_data } from "../Filters";
import DashboardError from "../DashboardErrorComponent";

const Subscriptions = () => {
  const limit: any = 6;
  const [pageCount, setPageCount] = useState<any>("");
  const [page, setPage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [q, setQ] = useState<string>("");

  const { isLoading, error, data } = useGetAllsubscriptionsQuery({
    status: status,
    q: q,
    page: page,
    limit: limit,
  });

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    data && setPageCount(Math.ceil(data?.data[0].tatalDocs / limit));
  }, [data]);

  const handlePageClick = (data: any) => {
    setPage(data.selected + 1);
  };

  let errMsg = useRtkErrors(error);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
    setPage("");
  };

  const handleStatusSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    setPage("");
  };

  const renderUI = () => {
    if (isLoading)
      return (
        <>
          <div className="mx-auto flex items-center justify-center  pt-32 my-auto">
            <Spinner />
          </div>
        </>
      );

    if (error) return <DashboardError error={error} />;

    if (!error && !isLoading && data) {
      return (
        <>
          <div className="flex flex-col overflow-auto ">
            <div className=" shadow-md  rounded-t-md  overflow-auto  w-full    ">
              <div className="flex flex-col  w-full items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="">
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
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="flex w-full flex-row gap-2 md:max-w-[10rem]  justify-end ">
                  <Filter
                    handleOnSelect={handleStatusSelect}
                    data={subscriptions_status_data}
                    filter_name="Status"
                  />
                </div>
              </div>
            </div>

            {data && data?.data[0].data.length > 0 ? (
              <div className="overflow-x-auto border pb-12 ">
                <table className="w-full text-sm text-left  text-gray-600 ">
                  <thead className="text-xs text-gray-700 uppercase bg-primary/30 ">
                    <tr>
                      <th className=" py-3 pl-4">Email</th>
                      <th className=" py-3">Created</th>
                      <th className=" py-3">Status</th>
                      <th className=" py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="rounded-b-md">
                    {data?.data[0].data.map((subscription: any) => {
                      return (
                        <SubscriptionRow
                          email={subscription.email}
                          created={subscription.createdAt}
                          status={subscription.isActive}
                        />
                      );
                    })}
                  </tbody>
                </table>
                <PaginationFooter
                  docsLength={data?.data[0].data.length}
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                  totalDocs={data?.data[0].tatalDocs}
                />
              </div>
            ) : (
              <p className="flex justify-center items-center my-12 font-light">
                There are no clients.
              </p>
            )}
          </div>
        </>
      );
    }
  };

  return <div className="mx-4">{renderUI()}</div>;
};

export default Subscriptions;
