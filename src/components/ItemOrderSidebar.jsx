import React from 'react';

const ItemOrderSidebar = ({ 
  id,
  image,
  name,
  qty,
  price,
  removeOrder,
  changeQtyProduct
 }) => {
  const addQuantity = () => {
    qty < 9 && changeQtyProduct(id, qty + 1);
  };
  const lessQuantity = () => {
    qty > 1 && changeQtyProduct(id, qty - 1);
  };

  return (
    <div className="group relative flex items-center py-4 px-5">
      <div className="relative flex min-w-0 flex-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-[#FE7493] cursor-pointer"
          onClick={() => removeOrder(id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        <img
          className="hidden sm:flex h-12 w-14 rounded-xl object-cover"
          src={image}
          alt=""
        />
        <div className="ml-4 truncate">
          <p className="truncate text-sm font-medium text-gray-900 capitalize">
            {name}
          </p>
          <p className="truncate text-sm text-gray-500">
            <span className="text-primary-500 text-xs font-semibold">
              Precio Unitario:{' '}
            </span>
            {'S/.' + price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => lessQuantity()}
            className="bg-primary-500 text-background px-1.5 rounded-md"
          >
            -
          </button>
          <span className="text-center w-4">{qty}</span>
          <button
            onClick={() => addQuantity()}
            className="bg-primary-500 text-background px-1.5 rounded-md"
          >
            +
          </button>
        </div>
        <span className="text-xs font-medium text-primary-500">
          S/.{(price * qty).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ItemOrderSidebar;