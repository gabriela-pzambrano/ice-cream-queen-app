import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { deleteProduct } from '../../api/deleteProduct';
import { getProducts } from '../../api/getProducts';
import { searchProducts } from '../../api/searchProducts';
import TableProducts from '../../components/TableProducts';

const Products = ({products, token, limit, page, setPage, paginacion,  dataProducts, type, setType}) => {
  const [search, setSearch] = useState();
  const [refresh, setRefresh] = useState();
  const handleSubmit = async () => {
    const searchData = await searchProducts(token, search, limit, 1, 'search');
    dataProducts(searchData);
    setType('search');
  };

  const refreshProducts = () => {
    setRefresh(true);
    setPage({
      ...page,
      products: 1,
    });
  };

  const productDelete = (id) => {
    deleteProduct(token, id);
    setRefresh(true);
    setPage({
      ...page,
      products: 1,
    });
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    getProducts(token, limit, page.products, type).then((response) => dataProducts(response));
    setRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page.products, refresh]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
            <TableProducts products={products} page={page} setPage={setPage} paginacion={paginacion} handleChange={handleChange} refresh={refreshProducts} deleteProduct={productDelete} />
          </main>
        )}
      </div>
    </>
  );
};

export default Products;