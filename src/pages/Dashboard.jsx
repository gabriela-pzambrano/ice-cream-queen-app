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
import CardProduct from '../components/CardProduct';
import { getProducts } from '../api/getProducts';
import { MutatingDots } from 'react-loader-spinner';

const sidebarNavigation = [
  { name: 'POS', href: '#', icon: BanknotesIcon, current: false },
  { name: 'Usuarios', href: '#', icon: UserGroupIcon, current: true },
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
  { name: 'Cerrar Sesión', href: '#' },
];

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState();
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    getProducts(token).then((products) => setProducts(products));
    // eslint-disable-next-line
  }, []);

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
          <div className="flex flex-1 items-stretch overflow-hidden bg-background">
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
                <h2 className='font-bold text-primary-500 text-lg'>Cargando...</h2>
              </section>
            ) : (
              <main className="flex-1 overflow-y-auto">
                {/* Primary column */}
                <section
                  aria-labelledby="primary-heading"
                  className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
                >
                  {/* Your content */}
                  {products.map((product) => {
                    return (
                      <CardProduct
                        key={product.id}
                        name={product.name}
                        type={product.type}
                        image={product.image}
                        price={product.price}
                      />
                    );
                  })}
                </section>
              </main>
            )}
            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 lg:block bg-indigo-500">
              {/* Your content */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;