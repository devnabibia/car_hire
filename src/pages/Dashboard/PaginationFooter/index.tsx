import Pagination from "../../../components/Pagination";

interface PaginationFooterProps {
  totalDocs: number;
  docsLength: number;
  pageCount: number;
  handlePageClick: (data: any) => void;
}

const PaginationFooter = ({
  totalDocs,
  docsLength,
  pageCount,
  handlePageClick,
}: PaginationFooterProps) => {
  return (
    <div className="flex items-center justify-between">
      {docsLength > 0 && (
        <div className=" text-left text-sm  w-full">
          <div>
            Showing <span>{docsLength}</span> of{" "}
            <span className="inline-block">{totalDocs} results</span>
          </div>
        </div>
      )}

      <div className=" flex items-center justify-end w-full my-8 px-4">
        {" "}
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default PaginationFooter;
