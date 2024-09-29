import { useState } from "react";

const useFilter = (initialPage = 1, initialRowsPerPage = 10) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
  };

  return {
    page,
    rowsPerPage,
    updatePage,
    updateRowsPerPage,
  };
};

export default useFilter;
