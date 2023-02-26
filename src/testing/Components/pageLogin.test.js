import React from "react";
import Login from "../../pages/Login"
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

// Mockear la imagen con Jest
jest.mock('../../assets/logo-ice-cream-queen.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/back-top-ice-cream.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/back-top-ice-cream-mobile.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/back-top-ice-cream-tablet.svg', () => 'ruta/de/la/imagen.jpg');
jest.mock('../../assets/background-ice.svg', () => 'ruta/de/la/imagen.jpg');

describe("Login component", () => {
    test("renders the welcome text", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const welcomeText = screen.getByText(/Bienvenido/i);
        expect(welcomeText).toBeInTheDocument();
    });

    test("renders the logo", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const logo = screen.getByAltText(/logo-ice-cream-queen/i);
        expect(logo).toBeInTheDocument();
    });

     test("renders the background image", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const backgroundImage = screen.getByAltText(/background-top-ice-cream/i);
        expect(backgroundImage).toBeInTheDocument();
    });
});