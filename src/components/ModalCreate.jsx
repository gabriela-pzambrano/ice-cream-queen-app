import React from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from './Input';
import { createUser } from '../api/createUser';

const ModalCreate = ({ open, setOpen, token, setPage, page, nameComponent }) => {
  const cancelButtonRef = useRef(null);


  const initialValues = {
    email: '',
    password: '',
    rol: 'Mesero',
  };

  const [input, setInput] = useState(initialValues); // estado

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: input.email,
      password: input.password,
      roles: {
        admin: input.rol === 'Administrador',
        cocina: input.rol === 'Chef',
      },
    };
    createUser(token, newUser);
    setTimeout(() => {
      setPage({
        ...page,
        users: 1,
      });
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white font-bold"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-primary-700"
                        >
                          Crear {nameComponent}
                          <p className="text-sm text-gray-500">
                            Para añadir un {nameComponent} nuevo complete los siguientes campos.
                          </p>
                        </Dialog.Title>
                        {nameComponent === "Usuario" ? (
                          <>
                            <div className="mt-3">
                              <Input
                                labelText={'Correo Electrónico:'}
                                type={'email'}
                                name={'email'}
                                placeholder={'example@gmail.com'}
                                onChange={handleChange}
                                value={input.email}
                              />
                              <Input
                                labelText={'Password:'}
                                type={'password'}
                                name={'password'}
                                placeholder={'**********'}
                                onChange={handleChange}
                                value={input.password}
                              />
                            </div>
                            <div className="mt-1 ">
                              <label
                                htmlFor="rol"
                                className="block text-sm font-medium text-dark"
                              >
                                Rol de Usuario:
                              </label>
                              <select
                                id="rol"
                                name="rol"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                onChange={handleChange}
                                value={input.rol}
                              >
                                <option>Administrador</option>
                                <option>Mesero</option>
                                <option>Chef</option>
                              </select>
                            </div>
                          </>
                        ) : <>
                          <div className="mt-3">
                            <Input
                              labelText={'Nombre del producto:'}
                              type={'text'}
                              name={'name'}
                              placeholder={'Helado de manzana'}
                              onChange={handleChange}
                              value={input.name}
                            />
                            <Input
                              labelText={'Precio del producto:'}
                              type={'number'}
                              name={'price'}
                              placeholder={'15.90'}
                              onChange={handleChange}
                              value={input.price}
                            />
                            <Input
                              labelText={'Ingresa la url de tu imagen:'}
                              type={'url'}
                              name={'image'}
                              placeholder={'http://ice-cream-queen.com/image/bacon-ice-cream-recipe-4.jpg'}
                              onChange={handleChange}
                              value={input.image}
                            />
                          </div>
                          <div className="mt-1 ">
                            <label
                              htmlFor="rol"
                              className="block text-sm font-medium text-dark"
                            >
                              Type de helado:
                            </label>
                            <select
                              id="rol"
                              name="rol"
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              onChange={handleChange}
                              value={input.type}
                            >
                              <option>Conos</option>
                              <option>Postres</option>
                              <option>Copas</option>
                              <option>Paletas</option>
                              <option>Milk Shakes</option>
                              <option>Granizados</option>
                            </select>
                          </div>
                        </>}

                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Crear {nameComponent}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ModalCreate;
