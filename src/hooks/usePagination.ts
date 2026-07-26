import { useMemo, useState, useEffect } from "react";

interface PaginationOptions<T> {
  data: T[];
  itemsPerPage: number;
}

export function usePagination<T>({
  data,
  itemsPerPage,
}: PaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / itemsPerPage)
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  }, [
    data,
    currentPage,
    itemsPerPage,
  ]);

  const nextPage = () =>
    setCurrentPage((p) =>
      Math.min(totalPages, p + 1)
    );

  const previousPage = () =>
    setCurrentPage((p) =>
      Math.max(1, p - 1)
    );

  return {
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
    nextPage,
    previousPage,
  };
}