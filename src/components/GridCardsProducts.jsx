import React from 'react';
import CardProduct from './CardProduct';
import Paginacion from './Paginacion';
import './carousel.css';
const GridCardsProducts = ({
  products,
  paginacion,
  setPage,
  page,
  addOrders,
}) => {
  return (
    <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-6xl lg:px-8 xl:max-w-[80rem] xl:px-8">
      <div className="flex justify-center sm:justify-start items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 hidden sm:block"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>

        <h3 className="text-md sm:text-lg font-bold text-dark">
          Se encontraron{' '}
          <span className="text-primary-500">{paginacion.count}</span> de
          productos
        </h3>
      </div>
      <section className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
        {products.map((product) => {
          return (
            <div key={product._id}>
              <CardProduct
                name={product.name}
                type={product.type}
                image={product.image}
                price={product.price}
                product={product}
                addOrders={addOrders}
              />
            </div>
          );
        })}
      </section>
      <Paginacion
        currentPage={page}
        totalPages={paginacion.pages}
        onPageChange={setPage}
        component={'pos'}
      />
    </div>
  );
};

export default GridCardsProducts;
