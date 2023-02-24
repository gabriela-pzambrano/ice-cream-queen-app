import { useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { getProducts } from '../../api/getProducts';
import TableProducts from '../../components/TableProducts';

const Products = ({products, token, limit, page, setProducts}) => {
  const dataProducts = (response) => {
    setProducts(response.products);
  };

  useEffect(() => {
    getProducts(token, limit, page).then((response) => dataProducts(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  return (
    <>
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
            <TableProducts products={products} />
          </main>
        )}
      </div>
    </>
  );
};

export default Products;