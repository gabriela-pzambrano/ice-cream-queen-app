import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from '../components/Input';

const SideBarOrders = ({ open, setOpen, orders }) => {
  const initialValues = {
    name: "",
    products: [],
  };
  const [orderActive, setOrderActive] = useState(initialValues);

  const handleChange = (e) => {
    setOrderActive({
      ...orderActive,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#F6F6F6] shadow-xl">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Órden Activa
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-primary-500 text-background hover:text-gray-500 focus:ring-2 focus:ring-primary-500 p-1"
                            onClick={() => setOpen(!open)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='px-4'>
                      <Input labelText={"Nombre del Cliente:"} type={"text"} name={"name"} placeholder={"Ej: Mariana Lopez..."} onChange={handleChange} value={orderActive.name}/>
                    </div>
                    <ul
                      className="flex-1 divide-y divide-gray-200 overflow-y-auto"
                    >
                      {orders?.map((order, index) => (
                        <li key={index}>
                          <div className="group relative flex items-center py-4 px-5">
                            <a
                              href={order.href}
                              className="-m-1 block flex-1 p-1"
                            >
                              <div
                                className="absolute inset-0 group-hover:bg-gray-50"
                                aria-hidden="true"
                              />
                              <div className="relative flex min-w-0 flex-1 items-center">
                                <span className="relative inline-block flex-shrink-0">
                                  <img
                                    className="h-12 w-14 rounded-xl object-cover"
                                    src={order.image}
                                    alt=""
                                  />
                                </span>
                                <div className="ml-4 truncate">
                                  <p className="truncate text-sm font-medium text-gray-900 capitalize">
                                    {order.name}
                                  </p>
                                  <p className="truncate text-sm text-gray-500">
                                    <span className='text-primary-500 text-xs font-semibold'>Precio Unitario: </span>{'S/.' + order.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </a>
                           {/*  Acá va el input de cantidad */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideBarOrders;