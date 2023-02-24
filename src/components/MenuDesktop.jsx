import React from 'react';
import logo from '../assets/logo-ice-cream-queen.svg';
import bottomIceCream from '../assets/bottom-ice-cream.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MenuDesktop = ({sidebarNavigation, selectedTab, setSelectedTab}) => {
  const handleActive = (link) => {
    //console.log(link)
    link.current = true;
    setSelectedTab(link);
  };
  return (
    <div className="hidden w-36 overflow-y-auto bg-primary-700 md:block">
      <div className="flex w-full flex-col items-center py-6">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-12 w-auto" src={logo} alt="ice-cream-queen" />
        </div>
        <div className="mt-6 w-full flex-1 space-y-1 px-2">
          {sidebarNavigation.map((link) => (
            <span
              key={link.name}

              className={classNames(
                selectedTab.name === link.name
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
              )}
              aria-current={link.current ? 'page' : undefined}
              onClick={() => handleActive(link)}
            >
              <link.icon
                className={classNames(
                  selectedTab.name === link.name
                    ? 'text-white'
                    : 'text-primary-300 group-hover:text-white',
                  'h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{link.name}</span>
            </span>
          ))}
        </div>
      </div>
      <img
        className="w-36 absolute bottom-0"
        src={bottomIceCream}
        alt="Ice Cream Queen"
      />
    </div>
  );
};

export default MenuDesktop;
