import React from 'react';
import purpleBottom from '../assets/purple-bottom.svg';
import greenBottom from '../assets/green-bottom.svg';
import blueBottom from '../assets/blue-bottom.svg';
import pinkBottom from '../assets/pink-bottom.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const types = {
  conos: {
    bg: 'bg-[#FE7493]',
    border: 'border-[#FE7493]',
    hover:
      'hover:bg-[#e95474] focus:outline-none focus:ring-2 focus:bg-[#e95474]',
    bottom: pinkBottom,
  },
  copas: {
    bg: 'bg-secondary-500',
    border: 'border-secondary-500',
    hover:
      'hover:bg-[#5DC0B5] focus:outline-none focus:ring-2 focus:bg-[#5DC0B5]',
    bottom: greenBottom,
  },
  paletas: {
    bg: 'bg-primary-500',
    border: 'border-primary-500',
    hover:
      'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:bg-primary-700',
    bottom: purpleBottom,
  },
  postres: {
    bg: 'bg-[#FBB147]',
    border: 'border-[#FBB147]',
    hover:
      'hover:bg-[#e3972c] focus:outline-none focus:ring-2 focus:bg-[#e3972c]',
    bottom: blueBottom,
  },
  'milk shakes': {
    bg: 'bg-[#4FABF5]',
    border: 'border-[#4FABF5]',
    hover:
      'hover:bg-[#3892dc] focus:outline-none focus:ring-2 focus:bg-[#3892dc]',
    bottom: blueBottom,
  },
};

const CardProduct = ({ keyProduct, name, type, image, price, product, addOrders }) => {
  return (
    <section
      key={keyProduct}
      className={classNames(
        types[type].border,
        'flex flex-col gap-2 border-b-2 bg-white rounded-2xl w-72 p-2 shadow-md sm:w-[230px] relative overflow-hidden'
      )}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover rounded-[10px] sm:h-[140px]"
        />

        <span
          className={classNames(
            types[type].bg,
            'absolute top-2 right-2 py-1 px-4 rounded-md text-white sm:text-xs capitalize'
          )}
        >
          {type}
        </span>
      </div>
      <section className="flex flex-col items-center justify-center gap-2 relative pb-6 z-10">
        <h3 className="text-dark capitalize font-bold text-md sm:text-[15px]">
          {name}
        </h3>
        <p
          className={classNames(
            types[type].bg,
            'py-1 px-6 rounded-md text-white text-md font-semibold'
          )}
        >
          S/.{price.toFixed(2)}
        </p>
      </section>
      <img
        src={types[type].bottom}
        alt={'bottom-vector-card'}
        className="absolute bottom-0 left-0 w-full opacity-10"
      />
      <button
        onClick={() => addOrders(product)}
        className={classNames(
          types[type].bg,
          types[type].hover,
          'rounded-full p-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 absolute bottom-1.5 right-1.5 z-10'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </section>
  );
};

export default CardProduct;