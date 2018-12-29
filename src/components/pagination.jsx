import React from "react";

const Pagination = props => {
  const {
    itemLength,
    currentPage,
    handleTablePaginationClick
  } = props;
  
  return (
    <ul className="pagination justify-content-end">
      {[...Array(itemLength).keys()].map((number, index) => {
          let displayNumber = index +1;
        return (
          <li
            key={displayNumber}
            id={displayNumber}
            onClick={handleTablePaginationClick}
            className={`page-item ${displayNumber === currentPage && "active" }`}
          >
            <span id={displayNumber} className="page-link">
              {displayNumber}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
export default Pagination;
