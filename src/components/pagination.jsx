import React from "react";

const Pagination = props => {
  const {
    itemLength,
    itemsPerPage,
    currentPage,
    handleTablePaginationClick
  } = props;
  
  return (
    <ul className="pagination justify-content-end">
      {[...Array(itemLength).keys()].map((number, index) => {
          let displaNumber = index +1;
        return (
          <li
            key={displaNumber}
            id={displaNumber}
            onClick={handleTablePaginationClick}
            className={`page-item ${displaNumber === currentPage && "active" }`}
          >
            <span id={displaNumber} className="page-link">
              {displaNumber}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
export default Pagination;
