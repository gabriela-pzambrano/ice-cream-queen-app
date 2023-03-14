import React, { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import {
  UsersIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/24/outline';
import { MutatingDots } from 'react-loader-spinner';
import { getReports } from '../../api/getDataReports';
import { Link } from 'react-router-dom';
import LastUsers from '../../components/LastUsers';
import BarChartComponent from '../../components/BarChartComponent';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Reports = ({ token }) => {
  const [data, setData] = useState(null);
  const stats = [
    {
      id: 1,
      name: 'Total de Usuarios',
      stat: data?.countUsers,
      icon: UsersIcon,
      change: '9',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Total de Productos',
      stat: data?.countProducts,
      icon: ShoppingCartIcon,
      change: '5.4%',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'Órdenes Entregadas',
      stat: data?.ordersDelivered,
      icon: BuildingStorefrontIcon,
      change: '3.2%',
      changeType: 'increase',
    },
    {
      id: 4,
      name: 'Órdenes Pendientes',
      stat: data?.ordersPending,
      icon: CursorArrowRaysIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
  ];

  useEffect(() => {
    getReports(token).then((response) => setData(response));
  }, [token]);

  return (
    <div className="flex flex-1 flex-col items-stretch overflow-hidden overflow-y-auto bg-background">
      {!data ? (
        <section className="flex flex-col flex-1 justify-center items-center">
          <MutatingDots
            height="100"
            width="100"
            color="#7671D6"
            secondaryColor="#5751CD"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h2 className="font-bold text-primary-500 text-lg">Cargando...</h2>
        </section>
      ) : (
        <div className="px-4 py-4 sm:px-6 lg:px-8">

          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className={`absolute rounded-md ${index % 2 === 0 ? "bg-primary-500" : "bg-secondary-500" }  p-3`}>
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={classNames(
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600',
                      'ml-2 flex items-baseline text-sm font-semibold'
                    )}
                  >
                    {item.changeType === 'increase' ? (
                      <ArrowUpIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowDownIcon
                        className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <span className="sr-only">
                      {' '}
                      {item.changeType === 'increase'
                        ? 'Increased'
                        : 'Decreased'}{' '}
                      by{' '}
                    </span>
                    {item.change}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <Link
                        to="/"
                        className="font-medium text-primary-600 hover:text-primary-500"
                      >
                        {' '}
                        Ver todo
                        <span className="sr-only"> {item.name} stats</span>
                      </Link>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-3 lg:col-span-1">
              <LastUsers lastUsers={data.lastUsers} />
            </div>
            <div className="col-span-3 lg:col-span-2 lg:ml-5">
              <BarChartComponent data={data.ordersByDay} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Reports;