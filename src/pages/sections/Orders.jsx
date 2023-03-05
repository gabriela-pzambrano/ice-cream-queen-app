import { useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { getOrders } from '../../api/getOrders';
import GridCardsOrders from '../../components/GridCardsOrders';

const Orders = ({ orders, setOrders, token, limit, page, setPage, paginacion, setPaginacion }) => {

  const dataOrders = (response) => {
    setPaginacion(response);
    setOrders(response);
  };

  useEffect(() => {
    getOrders(token, limit, page.orders).then((response) => dataOrders(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page.orders]);

  return (
    <>
      <div className="flex flex-1 flex-col items-stretch overflow-hidden bg-background">
        {!orders ? (
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
            <GridCardsOrders orders={orders} page={page} setPage={setPage} paginacion={paginacion} />
          </main>
        )}
      </div>
    </>
  );
};

export default Orders;