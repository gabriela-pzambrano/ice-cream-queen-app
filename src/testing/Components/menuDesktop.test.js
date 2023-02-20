import { render } from '@testing-library/react';
import MenuDesktop from '../../components/MenuDesktop';

jest.mock('../../assets/logo-ice-cream-queen.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/bottom-ice-cream.svg', () => 'ruta/de/la/imagen.jpg');

describe('MenuDesktop', () => {
  test('Check that MenuDesktop renders correctly', () => {
    const sidebarNavigation = [
      { name: 'Home', href: '/', icon: () => {} },
      { name: 'About', href: '/about', icon: () => {} },
    ];

    const { container } = render(<MenuDesktop sidebarNavigation={sidebarNavigation} />);

    expect(container).toMatchSnapshot();
  });

  test('displays sidebar items correctly', () => {
    const sidebarNavigation = [
      { name: 'Home', href: '/', icon: () => {} },
      { name: 'About', href: '/about', icon: () => {} },
    ];

    const { getByText } = render(<MenuDesktop sidebarNavigation={sidebarNavigation} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Home')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('About')).toBeInTheDocument();
  });

  test('applies correct CSS classes to sidebar items', () => {
    const sidebarNavigation = [
      { name: 'Home', href: '/', icon: () => {}, current: true },
      { name: 'About', href: '/about', icon: () => {}, current: false },
    ];

    const { getByText } = render(<MenuDesktop sidebarNavigation={sidebarNavigation} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Home')).toHaveClass('mt-2');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('About')).toHaveClass('mt-2');
  });
  
});
