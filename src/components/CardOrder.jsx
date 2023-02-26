import React from 'react';
import iceCream from "../assets/ice-cream-top.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CardOrder = ({ client, dateEntry, products, status }) => {
  return (
    <section
      key={client}
      className="flex flex-col gap-2 border-b-2 bg-white rounded-2xl w-72 shadow-md sm:w-[280px] relative overflow-hidden"
    >
      <img
        src={iceCream}
        alt='ice-cream top'
        className="w-full h-44 object-cover rounded-[10px] sm:h-[140px] absolute top-0 opacity-40"
      />

      <section className="flex flex-col items-center justify-center gap-2 relative pb-6 z-10">
        <h3 className="text-dark capitalize font-bold text-md sm:text-[15px] py-3">
          {new Date(dateEntry).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </h3>
        
        <h3 className="font-semibold text-primary-500" >Cantidad de pedidos: <span className=
            'bg-[#FE7493] rounded-md text-white text-sm font-semibold p-1 px-2'>{ products.length}</span> </h3>
        <section /* className='h-[240px] overflow-y-auto' */>
        {products.map((product) => (
          <div className="group relative flex items-center py-4 px-5 ">
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
        </section>
        
        <h2 className="font-semibold text-primary-500">Cliente: <span className='font-medium text-gray-900'> {client} </span> </h2>
        <p
          className={classNames(
            'py-1 px-6 rounded-md text-dark text-md font-semibold'
          )}
        >
          {'Estado actual: ' + status}
        </p>
      </section>
    </section>
  );
};

export default CardOrder;
