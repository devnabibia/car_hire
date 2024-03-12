import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TfiAngleRight } from "react-icons/tfi";

const BreadCrumb = () => {
  const pathname = useLocation();
  const segments = pathname.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumb = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return { text: segment.charAt(0).toUpperCase() + segment.slice(1), href };
  });

  return (
    <div className=" bg-white fixed top-[5rem] z-20 flex flex-row gap-4 text-start items-start justify-start border w-full py-6 px-4">
      <span className="inline-block mr-2">
        {" "}
        <FaHome />
      </span>
      {breadcrumb.map(({ text, href }, index) => {
        return (
          <div key={index}>
            <Link
              className="font-light text-sm hover:font-medium transition duration-500 ease-in-out"
              to={`${
                href === "/dashboard/vihicles"
                  ? "vihicles?car_name=&car_type=&transmission_type=&min_price=&max_price=&page="
                  : href
              }`}
            >
              {text}
            </Link>
            {index !== breadcrumb.length - 1 ? (
              <span className="mx-2 text-sm inline-block">
                <TfiAngleRight />
              </span>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
