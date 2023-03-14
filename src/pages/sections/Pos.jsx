import React, {useEffect} from 'react';
import { MutatingDots } from 'react-loader-spinner';
import Carousel from '../../components/Carousel';
import GridCardsProducts from '../../components/GridCardsProducts';
import SideBarOrders from '../../components/SideBarOrders';
import heladoSad from '../../assets/helado-sad.svg';
import { searchProducts } from '../../api/searchProducts';
import {getProducts} from "../../api/getProducts";

const Pos = ({
  products,
  limit,
  setType,
  setFilter,
  paginacion,
  setPage,
  addOrders,
  setOpen,
  actualOrders,
  removeOrder,
  clearOrders,
  changeQtyProduct,
  page,
  open,
  token,
  type,
  search,
  filter,
  dataProducts
}) => {

  useEffect(() => {
    if (type === 'search') {
      searchProducts(token, search, limit, page.pos, type).then((response) =>
        dataProducts(response)
      );
    } else if (type === 'types') {
      searchProducts(token, filter, limit, page.pos, type).then((response) =>
        dataProducts(response)
      );
    } else {
      getProducts(token, limit, page.pos).then((response) =>
        dataProducts(response)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  return (
    <div className="flex flex-1 flex-col items-stretch overflow-hidden bg-background">
      {!products ? (
        <section className="flex flex-col flex-1 overflow-y-auto justify-center items-center">
          <MutatingDots
            height="100"
            width="100"
            color="#7671D6"
            secondaryColor="#5751CD"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h2 className="font-bold text-primary-500 text-lg">Cargando...</h2>
        </section>
      ) : (
        <main className="flex-1 overflow-y-auto">
          {/* Primary column */}
          <Carousel
            handleFilter={dataProducts}
            limit={limit}
            setType={setType}
            setFilter={setFilter}
            setPage={setPage}
            page={page}
          />
          <section
            aria-labelledby="primary-heading"
            className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
          >
            {products?.length === 0 ? (
              <div className="flex flex-col flex-1 overflow-y-auto justify-start items-center pt-10">
                <img
                  src={heladoSad}
                  alt="helado-sad"
                  className="w-64 md:w-80"
                />
                <h2 className="mt-2 font-bold text-primary-500 text-lg md:text-xl text-center">
                  No hay resultados a su busqueda
                </h2>
              </div>
            ) : (
              <GridCardsProducts
                products={products}
                paginacion={paginacion}
                setPage={setPage}
                page={page}
                addOrders={addOrders}
              />
            )}
          </section>
        </main>
      )}

      <>
        <button
          type="button"
          className="absolute py-20 px-1 sm:px-2 top-[50%] right-0 rounded-l-xl shadow-lg bg-primary-500 text-white hover:text-gray-300 focus:ring-2 focus:ring-primary-600"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <SideBarOrders
          open={open}
          setOpen={setOpen}
          actualOrders={actualOrders}
          removeOrder={removeOrder}
          clearOrders={clearOrders}
          changeQtyProduct={changeQtyProduct}
        />
      </>
    </div>
  );
};

export default Pos;