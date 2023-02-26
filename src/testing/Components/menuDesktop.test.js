import { render, screen } from '@testing-library/react';
import MenuDesktop from '../../components/MenuDesktop';
/* import userEvent from '@testing-library/user-event'; */

jest.mock('../../assets/logo-ice-cream-queen.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/bottom-ice-cream.svg', () => 'ruta/de/la/imagen.jpg');

describe('MenuDesktop', () => {

  test('MenuDesktop should render the correct navigation links', () => {
    const sidebarNavigation = [
      { name: 'Home', icon: () => null },
      { name: 'About', icon: () => null },
      { name: 'Contact', icon: () => null },
    ];

    const selectedTab = { name: 'Home', current: true };
    const setSelectedTab = jest.fn();

    render(<MenuDesktop
      sidebarNavigation={sidebarNavigation}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  /* test('activates selected tab', () => {

    const sidebarNavigation = [
      { name: 'Home', icon: () => 'ruta/de/la/imagen.jpg' },
      { name: 'About', icon: () => 'ruta/de/la/imagen.jpg'},
      { name: 'Contact', icon: () => 'ruta/de/la/imagen.jpg' },
    ];

    const selectedTab = { name: 'Home' };
    const setSelectedTab = jest.fn();
  
    render(
      <MenuDesktop
        sidebarNavigation={sidebarNavigation}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    );
  
    const aboutTabElement = screen.getByText('About');
    userEvent.click(aboutTabElement);
  
    expect(setSelectedTab).toHaveBeenCalled();
    expect(setSelectedTab).toHaveBeenCalledWith({ name: 'About', icon: () => 'ruta/de/la/imagen.jpg' , current: true });
  }); */

  test('renders logo', () => {
    const sidebarNavigation = [
      { name: 'Home', icon: () => <div></div> },
      { name: 'About', icon: () => <div></div> },
      { name: 'Contact', icon: () => <div></div> },
    ];
    const selectedTab = { name: 'Home' };
    const setSelectedTab = () => {};
  
    render(
      <MenuDesktop
        sidebarNavigation={sidebarNavigation}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    );
  
    const logoElement = screen.getByAltText('ice-cream-queen');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders footer image', () => {
    const sidebarNavigation = [
      { name: 'Home', icon: () => <div></div> },
      { name: 'About', icon: () => <div></div> },
      { name: 'Contact', icon: () => <div></div> },
    ];
    const selectedTab = { name: 'Home' };
    const setSelectedTab = () => {};
  
    render(
      <MenuDesktop
        sidebarNavigation={sidebarNavigation}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    );
  
    const footerImageElement = screen.getByAltText('Ice Cream Queen');
    expect(footerImageElement).toBeInTheDocument();
  });



});
