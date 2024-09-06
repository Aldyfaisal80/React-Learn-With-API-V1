import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  className?: string;
};

export default function Pagination({ page, totalPages, setPage}: PaginationProps) {
  const { pathname } = useLocation();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
      <div className="">
        <Link
          to={`${pathname}?page=${page - 1}`}
          onClick={() => handlePageChange(page - 1)}
          className={`px-4 py-2 mx-3 bg-blue-500 text-white ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
          style={{ pointerEvents: page === 1 ? "none" : "auto" }}
        >
          «
        </Link>
        <button className="join-item btn">
          Page {page} of {totalPages}
        </button>
        <Link
          to={`${pathname}?page=${page + 1}`}
          onClick={() => handlePageChange(page + 1)}
          className={`px-4 py-2 mx-3 bg-blue-500 text-white ${page === totalPages ? "pointer-events-none opacity-50 disabled" : ""}`}
        >
          »
        </Link>
      </div>

  );
}
