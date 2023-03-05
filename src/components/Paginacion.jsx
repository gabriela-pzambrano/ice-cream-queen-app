import React, { useEffect, useState } from 'react';

const Paginacion = ({ currentPage, totalPages, onPageChange, component }) => {
  const isFirstPage = currentPage[component] === 1;
  const isLastPage = currentPage[component] === totalPages;
  const prevPage = currentPage[component] - 1;
  const nextPage = currentPage[component] + 1;
  const [width, setWidth] = useState(window.innerWidth);
  const [icons, setIcons] = useState(false);
  const handleResize = () => {
    setWidth(window.innerWidth);
    if (width < 460) {
      setIcons(true);
    } else {
      setIcons(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div className="flex items-center justify-center mt-4 gap-1">
      <button
        onClick={() =>
          onPageChange({
            ...currentPage,
            [component]: 1,
          })
        }
        disabled={isFirstPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isFirstPage
            ? 'bg-gray-300 text-dark cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-700 cursor-pointer'
        }`}
      >
        {icons ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        ) : (
          'Primero'
        )}
      </button>
      <button
        onClick={() =>
          onPageChange({
            ...currentPage,
            [component]: prevPage,
          })
        }
        disabled={isFirstPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isFirstPage
            ? 'bg-gray-300 text-dark cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-700 cursor-pointer'
        }`}
      >
        {icons ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        ) : (
          'Anterior'
        )}
      </button>
      <span className="px-3 py-1">{`${currentPage[component]} de ${totalPages}`}</span>
      <button
        onClick={() =>
          onPageChange({
            ...currentPage,
            [component]: nextPage,
          })
        }
        disabled={isLastPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isLastPage
            ? 'bg-gray-300 text-dark cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-700 cursor-pointer'
        }`}
      >
        {icons ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        ) : (
          'Siguiente'
        )}
      </button>
      <button
        onClick={() =>
          onPageChange({
            ...currentPage,
            [component]: totalPages,
          })
        }
        disabled={isLastPage}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold ${
          isLastPage
            ? 'bg-gray-300 text-dark cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-700 cursor-pointer'
        }`}
      >
        {icons ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        ) : (
          'Último'
        )}
      </button>
    </div>
  );
};

export default Paginacion;
