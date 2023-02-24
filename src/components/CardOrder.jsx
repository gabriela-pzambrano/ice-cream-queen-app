import React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CardOrder = ({ client, dateEntry, products, status }) => {
  return (
    <section
      key={client}
      className="flex flex-col gap-2 border-b-2 bg-white rounded-2xl w-72 p-2 shadow-md sm:w-[280px] relative overflow-hidden"
    >
      <section className="flex flex-col items-center justify-center gap-2 relative pb-6 z-10">
        <h3 className="text-dark capitalize font-bold text-md sm:text-[15px]">
          {new Date(dateEntry).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </h3>
        <h2>{client}</h2>
        {products.map((product) => (     
          <div className="group relative flex items-center py-4 px-5">
          <div className="relative flex min-w-0 flex-1 items-center">    
            <img
              className="hidden sm:flex h-12 w-14 rounded-xl object-cover"
              src={product.productId.image}
              alt=""
            />
            <div className="ml-4 truncate">
              <p className="truncate text-sm font-medium text-gray-900 capitalize">
                {product.productId.name}
              </p>
              <p className="truncate text-sm text-gray-500">
                {'S/.' + product.productId.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        ))}
        <p
          className={classNames(
            'py-1 px-6 rounded-md text-dark text-md font-semibold'
          )}
        >
          {status}
        </p>
      </section>
    </section>
  );
};

export default CardOrder;
