import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from '../components/Input';
import ItemOrderSidebar from './ItemOrderSidebar';
import { createOrder } from '../api/createOrder';

const SideBarOrders = ({ open, setOpen, orders, removeOrder, clearOrders, changeQtyProduct }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem("token"));
  const [clientName, setClientName] = useState("");
  const handleChange = (e) => {
    setClientName(e.target.value);
  };
//userId - client - products[{qty: 0 , productId}];
  const submitOrder = () => {
    const products = orders.map((order) => {return {qty: order.qty , productId: order._id}});
    const objectOrder = {
      userId: user._id,
      client: clientName,
      products: products
    }
    createOrder(token, objectOrder);
    clearOrders();
    setClientName("");
    
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
                    <div className="px-4 py-2 border-b-2">
                      <div className="text-primary-500 font-semibold text-sm flex items-center">
                        Usuario Activo {'|'}
                        <span className="ml-2 text-dark opacity-75 text-xs">
                          {user.email}
                        </span>
                        <span className="ml-2 text-background text-xs py-1 px-2 bg-primary-500 rounded-md">
                          {user.roles.admin
                            ? 'Admin'
                            : user.roles.cocina
                            ? 'Chef'
                            : 'Mesero'}
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-4">
                      <Input
                        labelText={'Nombre del Cliente:'}
                        type={'text'}
                        name={'name'}
                        placeholder={'Ej: Mariana Lopez...'}
                        onChange={handleChange}
                        value={clientName}
                      />
                    </div>
                    <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                      {orders?.map((order, index) => (
                        <li key={index}>
                          <ItemOrderSidebar
                            id={order._id}
                            image={order.image}
                            name={order.name}
                            price={order.price}
                            removeOrder={removeOrder}
                            qty={order.qty}
                            changeQtyProduct={changeQtyProduct}
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-center w-full p-4 gap-2">
                      <button
                        onClick={() => clearOrders()}
                        className="bg-[#FE7493] text-background px-4 py-2 w-full text-sm font-semibold rounded-md"
                      >
                        Limpiar Órden
                      </button>
                      <button onClick={() => submitOrder()} className="bg-primary-500 text-background px-4 py-2 w-full text-sm font-semibold rounded-md">
                        Crear Órden
                      </button>
                    </div>
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