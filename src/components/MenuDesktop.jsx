import React from 'react';
import logo from '../assets/logo-ice-cream-queen.svg';
import bottomIceCream from '../assets/bottom-ice-cream.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MenuDesktop = ({sidebarNavigation}) => {
  return (
    <div className="hidden w-32 overflow-y-auto bg-primary-700 md:block">
      <div className="flex w-full flex-col items-center py-6">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-12 w-auto" src={logo} alt="Your Company" />
        </div>
        <div className="mt-6 w-full flex-1 space-y-1 px-2">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-white'
                    : 'text-primary-300 group-hover:text-white',
                  'h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
      <img
        className="w-32 absolute bottom-0"
        src={bottomIceCream}
        alt="Your Company"
      />
    </div>
  );
};

export default MenuDesktop;
