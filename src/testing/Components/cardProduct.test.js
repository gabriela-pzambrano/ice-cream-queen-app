import React from 'react';
import { render, screen } from '@testing-library/react';
import CardProduct from '../../components/CardProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './carousel.css';

jest.mock('../../assets/purple-bottom.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/green-bottom.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/blue-bottom.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/pink-bottom.svg', () => 'ruta/de/la/imagen.jpg');


describe('Component cardProduct', () => {
  test('renders product name and price', () => {
    render(<CardProduct
      keyProduct="1"
      name="Chocolate Ice Cream"
      type="paletas"
      image="https://example.com/chocolate-ice-cream.jpg"
      price={5.99}
      product={{ id: 1, name: "Chocolate Ice Cream", price: 5.99 }}
      addOrders={jest.fn()}
    />);

    const productNameElement = screen.getByText(/Chocolate Ice Cream/i);
    const productPriceElement = screen.getByText(/S\/\.5\.99/i);
    expect(productNameElement).toBeInTheDocument();
    expect(productPriceElement).toBeInTheDocument();
  });


  test('renders product image and type', () => {
    render(<CardProduct
      keyProduct="1"
      name="Chocolate Ice Cream"
      type="paletas"
      image="https://example.com/chocolate-ice-cream.jpg"
      price={5.99}
      product={{ id: 1, name: "Chocolate Ice Cream", price: 5.99 }}
      addOrders={jest.fn()}
    />);

    const productImageElement = screen.getByAltText(/Chocolate Ice Cream/i);
    expect(productImageElement).toHaveAttribute('src', 'https://example.com/chocolate-ice-cream.jpg');
    const typeElement = screen.getByText('paletas');
    expect(typeElement).toBeInTheDocument();
  });


  test('verify if there is a button in the component', () => {
    const addOrdersMock = jest.fn();

    render(<CardProduct
      keyProduct="1"
      name="Chocolate Ice Cream"
      type="paletas"
      image="https://example.com/chocolate-ice-cream.jpg"
      price={5.99}
      product={{ id: 1, name: "Chocolate Ice Cream", price: 5.99 }}
      addOrders={addOrdersMock}
    />);

    const addButtonElement = screen.getByRole('button');
    expect(addButtonElement).toBeInTheDocument();
  });
});