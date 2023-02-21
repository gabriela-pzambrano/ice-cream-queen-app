import React, { Fragment, useState, useEffect } from 'react';
import {
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import AdminAvatar from '../assets/admin.svg';
import ChefAvatar from '../assets/cocina.svg';
import MeseroAvatar from '../assets/mesero.svg';
import { Link } from 'react-router-dom';
import { searchProducts } from '../api/searchProducts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const HeaderDashboard = ({ userNavigation, setMobileMenuOpen, handleSearch }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem("token"));
  const [search, setSearch] = useState("");

  const handleSubmit = async() => {
    const searchData = await searchProducts(token, search);
    handleSearch(searchData);
  }

  const handleKeyDown = async(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [search]);

  return (
    <header className="w-full">
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0"
                  placeholder="Search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-4">
            {/* Profile dropdown */}
            <div className="hidden md:flex flex-col items-end">
              <h6 className="text-sm font-semibold text-dark">{user.email}</h6>
              <span className="bg-primary-500 py-1 px-2 text-xs text-white font-semibold rounded-md">
                {user.roles.admin
                  ? 'Admin'
                  : user.roles.chef
                    ? 'Chef'
                    : 'Mesera'}
              </span>
            </div>
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-offset-1">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={
                      user.roles.admin
                        ? AdminAvatar
                        : user.roles.chef
                          ? ChefAvatar
                          : MeseroAvatar
                    }
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.href}
                          onClick={item.name === "Cerrar Sesión" && localStorage.clear()}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
