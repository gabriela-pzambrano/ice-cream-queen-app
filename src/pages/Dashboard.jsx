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
  { id:1, name: 'Mi Perfil' },
  { id:2, name: 'Configuración' },
  { id:3, name: 'Cerrar Sesión' },
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [width, setWidth] = useState(window.innerWidth);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState({
    orders: 1,
    pos: 1,
    products: 1,
    users: 1
  });
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
  // user.roles.admin = true  | user.roles.cocina = true

  const sidebarNavigation = [
    {
      name: 'POS',
      icon: BanknotesIcon,
      current: true,
      show: true,
    },
    {
      name: 'Usuarios',
      icon: UserGroupIcon,
      current: false,
      show: user.roles.admin,
    },
    {
      name: 'Productos',
      icon: Squares2X2Icon,
      current: false,
      show: true,
    },
    {
      name: 'Ordenes',
      icon: RectangleStackIcon,
      current: false,
      show: user.roles.admin || user.roles.cocina,
    },
    {
      name: 'Reportes',
      icon: PresentationChartBarIcon,
      current: false,
      show: user.roles.admin,
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
              paginacion={paginacion}
              setPaginacion={setPaginacion}
              setPage={setPage}
            />
          ) : selectedTab.name === 'Productos' ? (
            <Products
              products={products}
              token={token}
              limit={limit}
              page={page}
              setProducts={setProducts}
              paginacion={paginacion}
              setPage={setPage}
              setPaginacion={setPaginacion}
              dataProducts={dataProducts}
              type={type}
              setType={setType}
              handleSearch={dataProducts}
            />
          ) : selectedTab.name === 'Ordenes' ? (
            <Orders
              orders={orders}
              token={token}
              limit={limit}
              page={page}
              setOrders={setOrders}
              paginacion={paginacion}
              setPaginacion={setPaginacion}
              setPage={setPage}
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