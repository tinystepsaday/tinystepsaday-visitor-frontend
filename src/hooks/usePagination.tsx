/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  pageSize?: number;
}

export function usePagination({ 
  totalItems,
  initialPage = 1,
  pageSize = 10
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const pageItems = (items: any[]) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  return {
    currentPage,
    totalPages,
    pageItems,
    goToPage,
    nextPage,
    prevPage
  };
}
