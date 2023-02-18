import React from "react";

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-1">
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isFirstPage
            ? "bg-gray-300 text-dark cursor-not-allowed"
            : "bg-primary-500 text-white hover:bg-primary-700 cursor-pointer"
        }`}
      >
        Primero
      </button>
      <button
        onClick={() => onPageChange(prevPage)}
        disabled={isFirstPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isFirstPage
            ? "bg-gray-300 text-dark cursor-not-allowed"
            : "bg-primary-500 text-white hover:bg-primary-700 cursor-pointer"
        }`}
      >
        Anterior
      </button>
      <span className="px-3 py-1">{`${currentPage} de ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(nextPage)}
        disabled={isLastPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isLastPage
            ? "bg-gray-300 text-dark cursor-not-allowed"
            : "bg-primary-500 text-white hover:bg-primary-700 cursor-pointer"
        }`}
      >
        Siguiente
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isLastPage
            ? "bg-gray-300 text-dark cursor-not-allowed"
            : "bg-primary-500 text-white hover:bg-primary-700 cursor-pointer"
        }`}
      >
        Último
      </button>
    </div>
  );
};

export default Paginacion;