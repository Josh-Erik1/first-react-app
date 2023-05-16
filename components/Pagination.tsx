import React from "react";

interface PaginationProps {
  totalPosts: number | any;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (page: (prev: number) => number) => void | number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  currentPage,
  postPerPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <span
        className="pagination__nav"
        onClick={() => {
          setCurrentPage((prev) => {
            if (prev === 1) {
              return prev;
            } else {
              return prev - 1;
            }
          });
          window.scrollTo(0, 0);
        }}
      >
        Prev
      </span>
      {pages.map((page, index) => {
        return (
          <button
            className={`pagination__button ${
              page == currentPage ? "active" : ""
            }`}
            key={index}
            onClick={() => {
              setCurrentPage((prev) => (prev = page));
              window.scrollTo(0, 0);
            }}
          >
            {page}
          </button>
        );
      })}
      <span
        className="pagination__nav"
        onClick={() => {
          setCurrentPage((prev) => {
            if (prev === 9) {
              return prev;
            } else {
              return prev + 1;
            }
          });
          window.scrollTo(0, 0);
        }}
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
