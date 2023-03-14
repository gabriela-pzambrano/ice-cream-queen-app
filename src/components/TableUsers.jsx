import React from 'react';
import Paginacion from './Paginacion';

const TableUsers = ({
  users,
  page,
  setPage,
  paginacion,
  handleChange,
  refresh,
  deleteUser,
  setOpen,
  setOpenUpdate,
  setId
}) => {

  const handleEdit = (id) => {
    setOpenUpdate(true);
    setId(id);
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <input
            type={'text'}
            name={'search'}
            placeholder={'ej: busca usuario'}
            onChange={handleChange}
            className="block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-dark placeholder:opacity-50"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="mr-2 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-secondary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 sm:w-auto"
            onClick={(e) => refresh(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            onClick={()=> setOpen(true)} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Añadir Usuario
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="hidden py-3.5 pl-3 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6 lg:table-cell sm:text-sm"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 sm:text-sm"
              >
                Email
              </th>
              <th
                scope="col"
                className="hidden py-3.5 pl-3 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6 lg:table-cell sm:text-sm"
              >
                Fecha de creación:
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 sm:text-sm"
              >
                Role
              </th>
              <th scope="col" className="relative py-3.5 pl-4 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="hidden whitespace-nowrap py-4 pl-3 pr-3 text-xs text-primary-500 sm:pl-6 lg:table-cell md:text-sm">
                  {user._id}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500 sm:text-sm">
                  {user.email}
                </td>
                <td className="hidden whitespace-nowrap py-4 pl-3 pr-3 text-xs text-primary-500 sm:pl-6 lg:table-cell md:text-sm">
                  {new Date(
                    user.createdAt || '2023-01-17T03:15:45.277Z'
                  ).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500 sm:text-sm">
                  {user.roles.admin
                    ? 'Admin'
                    : user.roles.cocina
                    ? 'Chef'
                    : 'Mesero'}
                </td>
                <td className="flex justify-end gap-4 lg:gap-4 whitespace-nowrap py-4 pl-3 pr-3 text-right text-xs font-medium sm:pr-6 sm:text-sm">
                  <button
                    className="flex gap-1 items-center text-xs text-background hover:bg-primary-700 px-1.5 py-1 rounded-md bg-primary-500"
                    onClick={()=> handleEdit(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex gap-1 items-center text-xs text-background hover:bg-[#e85d7b] px-1.5 py-1 rounded-md bg-[#FE7493]"
                    onClick={()=> deleteUser(user.email)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > 1 && (
        <Paginacion
          currentPage={page}
          totalPages={paginacion.pages}
          onPageChange={setPage}
          component={'users'}
        />
      )}
    </div>
  );
};

export default TableUsers;
