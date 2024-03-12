import Main from "../../components/Layouts/Main";
import { useEffect, useState } from "react";
import CustomLink from "../../components/CustomLink";
import { FaAngleRight } from "react-icons/fa";
import SingleRide from "../../components/Portfolio/SingleRide";
import { CardSkeleton } from "../../components/Loaders";
import SearchForm from "../../components/SearchForm";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetVihiclesByParamsQuery } from "../../features/api/apiSlice";
import { CarProps } from "../../Types";
import useRtkErrors from "../../CustomHooks/RtkErrors";
import PaginationFooter from "../Dashboard/PaginationFooter";

const Catalogue: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const [page, setPage] = useState<string>("");
  const [pageCount, setPageCount] = useState<any>("");
  const { pathname } = useLocation();
  const limit: any = 11;
  const { data, isLoading, error } = useGetVihiclesByParamsQuery({
    car_name: searchParams.get("car_name"),
    car_type: searchParams.get("car_type"),
    transmission_type: searchParams.get("transmission_type"),
    min_price: searchParams.get("min_price"),
    max_price: searchParams.get("max_price"),
    page: page,
    limit: limit,
  });

  let errorMsg = useRtkErrors(error);
  useEffect(() => {
    data && setPageCount(Math.ceil(data[0]?.tatalDocs / limit));
  }, [data]);

  console.log(data);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, searchParams]);

  const handlePageClick = (data: any) => {
    const current_page = data.selected + 1;
    setPage(current_page);
  };

  return (
    <Main>
      <section className="my-32 max-w-7xl   md:mx-auto mx-4">
        <div className="flex flex-row items-center gap-2 justify-between my-4  w-full ">
          <CustomLink to="/" text="Home" variant="unfilled" />
          <span>
            <FaAngleRight />
          </span>

          <p className="text-md w-full text-left hover:underline cursor-pointer">
            Availble
          </p>
        </div>

        <div className="grid grid-flow-cols sm:grid-cols-2 md:grid-cols-4 gap-8  mt-16     w-full overflow-hidden ">
          {/* search form */}
          <SearchForm isLoading={isLoading} />

          {data &&
            data[0]?.data.map((vihicle: CarProps) => {
              return (
                <SingleRide
                  _id={vihicle._id}
                  key={vihicle._id}
                  description={vihicle.description}
                  features={vihicle.features}
                  vihicle_images={vihicle.vihicle_images}
                  vihicle_type={vihicle.vihicle_type}
                  vihicle_name={vihicle.vihicle_name}
                  transmission_type={vihicle.transmission_type}
                  badge={vihicle.badge}
                  hire_price={vihicle.hire_price}
                  no_of_passengers={vihicle.no_of_passengers}
                  fuel_consumption={vihicle.fuel_consumption}
                />
              );
            })}

          {isLoading && <CardSkeleton skeletonList={11} />}
          {!isLoading && error && errorMsg && (
            <div className="py-12 text-center mx-auto  w-full md:col-span-3  sm:col-span-2">
              {errorMsg}
            </div>
          )}
          {data && data[0].data.length == 0 && (
            <div className="py-12 text-center mx-auto  w-full md:col-span-3  sm:col-span-2">
              No vihicles available
            </div>
          )}
        </div>

        <PaginationFooter
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          docsLength={data && data[0]?.data.length}
          totalDocs={data && data[0]?.tatalDocs}
        />
      </section>
    </Main>
  );
};

export default Catalogue;
