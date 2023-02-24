import { useState, useEffect } from 'react';
import {
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
  BanknotesIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';
import MenuDesktop from '../components/MenuDesktop';
import MenuMobile from '../components/MenuMobile';
import HeaderDashboard from '../components/HeaderDashboard';
import Pos from './sections/Pos';
import Users from './sections/Users';
import Products from './sections/Products';
import Orders from './sections/Orders';

const userNavigation = [
  { name: 'Mi Perfil', href: '#' },
  { name: 'Configuración', href: '#' },
  { name: 'Cerrar Sesión', href: '/' },
];

const limitProducts = {
  sm: 5,
  md: 8,
  lg: 12,
  xl: 12,
};

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();
  const [open, setOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));
  const [width, setWidth] = useState(window.innerWidth);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({});
  const [actualOrders, setActualOrders] = useState(
    JSON.parse(localStorage.getItem('orders')) || []
  );
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const dataProducts = (response) => {
    if (!response) {
      setProducts([]);
    } else {
      setPaginacion(response);
      setProducts(response.products);
    }
  };

  const addOrders = (product) => {
    const duplicado = actualOrders.find((order) => order._id === product._id);
    if (!duplicado) {
      const newProduct = {
        ...product,
        qty: 1,
      };
      setActualOrders([...actualOrders, newProduct]);
    }
  };

  const changeQtyProduct = (id, qty) => {
    const updatedOrders = actualOrders.map((order) => {
      if (order._id === id) {
        return { ...order, qty: qty };
      }
      return order;
    });
    setActualOrders(updatedOrders);
  };

  const removeOrder = (id) => {
    const newOrders = actualOrders.filter((order) => order._id !== id);
    setActualOrders(newOrders);
  };

  const clearOrders = () => {
    setActualOrders([]);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (actualOrders.length >= 0) {
      localStorage.setItem('orders', JSON.stringify(actualOrders));
    }
  }, [actualOrders]);

  const sidebarNavigation = [
    {
      name: 'POS',
      icon: BanknotesIcon,
      current: true,
    },
    {
      name: 'Usuarios',
      icon: UserGroupIcon,
      current: false,
    },
    {
      name: 'Productos',
      icon: Squares2X2Icon,
      current: false,
    },
    {
      name: 'Ordenes',
      icon: RectangleStackIcon,
      current: false,
    },
    {
      name: 'Reportes',
      icon: PresentationChartBarIcon,
      current: false,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(
    sidebarNavigation.find((tab) => tab.current)
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
    if (width < 460) {
      setLimit(limitProducts.sm);
    } else if (width < 999) {
      setLimit(limitProducts.md);
    } else if (width < 1500) {
      setLimit(limitProducts.lg);
    } else {
      setLimit(limitProducts.xl);
    }
  };

  return (
    <>
      <div className="flex h-full">
        <MenuDesktop
          sidebarNavigation={sidebarNavigation}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <MenuMobile
          sidebarNavigation={sidebarNavigation}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <HeaderDashboard
            userNavigation={userNavigation}
            setMobileMenuOpen={setMobileMenuOpen}
            handleSearch={dataProducts}
            limit={limit}
            setType={setType}
            search={search}
            setSearch={setSearch}
            labelSection={selectedTab.name !== "POS" ? "Lista de Registros" : undefined}
          />
          {selectedTab.name === 'POS' ? (
            <Pos
              products={products}
              limit={limit}
              setType={setType}
              setFilter={setFilter}
              paginacion={paginacion}
              setPage={setPage}
              addOrders={addOrders}
              setOpen={setOpen}
              actualOrders={actualOrders}
              removeOrder={removeOrder}
              clearOrders={clearOrders}
              changeQtyProduct={changeQtyProduct}
              page={page}
              open={open}
              dataProducts={dataProducts}
              filter={filter}
              search={search}
              type={type}
              token={token}
            />
          ) : selectedTab.name === 'Usuarios' ? (
            <Users
              users={users}
              token={token}
              limit={limit}
              page={page}
              setUsers={setUsers}
            />
          ) : selectedTab.name === 'Productos' ? (
            <Products
              products={products}
              token={token}
              limit={limit}
              page={page}
              setProducts={setProducts}
            />
          ) : selectedTab.name === 'Ordenes' ? (
            <Orders
              orders={orders}
              token={token}
              limit={limit}
              page={page}
              setOrders={setOrders}
            />
          ) : (
            <h1>Otro Componente</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;