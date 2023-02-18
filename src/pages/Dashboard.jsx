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
import { getProducts } from '../api/getProducts';
import { MutatingDots } from 'react-loader-spinner';
import GridCardsProducts from '../components/GridCardsProducts';
import SideBarOrders from '../components/SideBarOrders';
import Carousel from '../components/Carousel';

const sidebarNavigation = [
  { name: 'POS', href: '#', icon: BanknotesIcon, current: true },
  { name: 'Usuarios', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Productos', href: '#', icon: Squares2X2Icon, current: false },
  { name: 'Órdenes', href: '#', icon: RectangleStackIcon, current: false },
  {
    name: 'Reportes',
    href: '#',
    icon: PresentationChartBarIcon,
    current: false,
  },
];

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
  const [open, setOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));
  const [width, setWidth] = useState(window.innerWidth);
  const [limit, setLimit] = useState();
  const [page, setPage] = useState(1);
  const [paginacion, setPaginacion] = useState({});
  const [orders, setOrders] = useState([]);

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

  const dataProducts = (response) => {
    setPaginacion(response);
    setProducts(response.products);
  };

  const addOrders = (product) => {
    console.log(product._id);
    const duplicado = orders.find((order) => order._id === product._id);
    if(!duplicado){
      setOrders([...orders, product]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    getProducts(token, limit, page).then((response) => dataProducts(response));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  return (
    <>
      <div className="flex h-full">
        <MenuDesktop sidebarNavigation={sidebarNavigation} />
        <MenuMobile
          sidebarNavigation={sidebarNavigation}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <HeaderDashboard
            userNavigation={userNavigation}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <div className="flex flex-1 flex-col items-stretch overflow-hidden bg-background">
            {!products ? (
              <section className="flex flex-col flex-1 overflow-y-auto justify-center items-center">
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
                <h2 className="font-bold text-primary-500 text-lg">
                  Cargando...
                </h2>
              </section>
            ) : (
              <main className="flex-1 overflow-y-auto">
                {/* Primary column */}
                <Carousel />
                <section
                  aria-labelledby="primary-heading"
                  className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
                >
                  {/* Your content */}
                  <GridCardsProducts
                    products={products}
                    paginacion={paginacion}
                    setPage={setPage}
                    page={page}
                    addOrders={addOrders}
                  />
                </section>
              </main>
            )}
            {/* Secondary column (hidden on smaller screens) */}
            <>
              <button
                type="button"
                className="absolute py-20 px-1 sm:px-2 top-[50%] right-0 rounded-l-xl shadow-lg bg-primary-500 text-white hover:text-gray-300 focus:ring-2 focus:ring-primary-600"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <SideBarOrders open={open} setOpen={setOpen} orders={orders} />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;