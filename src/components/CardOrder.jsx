import React, { useState } from 'react';
import { changeStatusOrder } from '../api/changeStatusOrder';
/* import imgPending from '../assets/back-order.svg';
import imgDelivered from '../assets/back-order-del.svg'; */
import SelectOrder from './SelectOrder';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CardOrder = ({ id, client, dateEntry, products, status }) => {
  const [newStatus, setNewStatus] = useState(
    status === 'pending' ? false : true
  );
  const token = JSON.parse(localStorage.getItem('token'));
  const changeStatus = () => {
    setNewStatus(!newStatus);
    changeStatusOrder(token, newStatus ? 'pending' : 'delivered', id);
  };
  return (
    <section className="flex flex-col gap-2 border-b-2 bg-white rounded-2xl shadow-md relative overflow-hidden">
      <section
        className={`${
          newStatus ? 'bg-secondary-500' : 'bg-primary-500'
        } w-full flex items-center justify-around relative h-10`}
      >
        {/* {newStatus ? (
          <img
            src={imgDelivered}
            alt={'bottom-ice-cream'}
            className="w-full absolute bottom-[-1.8rem]"
          />
        ) : (
          <img
            src={imgPending}
            alt={'bottom-ice-cream'}
            className="w-full absolute bottom-[-1.8rem]"
          />
        )} */}
        <h3 className="text-background capitalize font-bold text-md sm:text-[15px] pt-3 pb-3">
          {new Date(dateEntry).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </h3>
        <h3 className="text-background capitalize font-bold text-md sm:text-[15px] pt-3 pb-3">
          {new Date(dateEntry).toLocaleString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </h3>
      </section>
      <section className="flex flex-col items-center justify-center gap-2 pb-2 pt-2 z-10">
        <h3
          className={`font-semibold ${
            newStatus ? 'text-secondary-500' : 'text-primary-500'
          }`}
        >
          Cantidad de productos:
          <span
            className={`${
              newStatus ? 'bg-primary-500' : 'bg-secondary-500'
            } rounded-md text-white text-sm font-semibold py-1 px-2 ml-2`}
          >
            {products.length}
          </span>
        </h3>
        <section className="overflow-y-auto items-stretch h-[200px] w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative flex items-center py-2 px-5 border border-b-gray-50 "
            >
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
      </section>
      <div className="w-full flex items-center justify-center">
        <SelectOrder status={newStatus} changeStatus={changeStatus} />
      </div>
      <section className={`${
          newStatus ? 'bg-secondary-500' : 'bg-primary-500'
        } w-full p-2 flex flex-col items-center justify-center`}>
        <h2 className="text-md font-semibold text-background">
          Cliente:
          <span className={`${
          newStatus ? 'text-primary-500' : 'text-secondary-500'
        } text-md font-bold pl-2`}>
            {client}
          </span>
        </h2>
        <p
          className={classNames(
            'py-1 px-6 rounded-md text-background text-sm font-semibold'
          )}
        >
          Estado actual:{' '}
          <b className={`${
          newStatus ? 'text-primary-500' : 'text-secondary-500'
        } font-semibold`}>
            {status === 'pending' ? 'Pendiente' : 'Entregado'}
          </b>
        </p>
      </section>
    </section>
  );
};

export default CardOrder;
