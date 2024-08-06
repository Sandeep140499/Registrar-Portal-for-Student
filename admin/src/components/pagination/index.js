import React from "react";
import style from "./pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className={style.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`btn btn-primary btn-round btn-sm`}
      >
        &lt; Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active btn-success btn-sm btn-round" : " btn-sm btn-round"}
        >
          {number}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`btn btn-primary btn-round btn-sm`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
