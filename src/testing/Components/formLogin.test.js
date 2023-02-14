import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FormLogin from '../../components/FormLogin';
import { login } from '../../api/auth';

jest.mock('axios');
jest.mock('../../api/auth', () => ({
    login: jest.fn(() => Promise.resolve(true)),
}));

describe('FormLogin component', () => {
    test('Verify that the component correctly renders the login form', () => {
        render(
            <MemoryRouter>
                <FormLogin />
            </MemoryRouter>);
        const linkElement = screen.getByText(/Iniciar Sesión/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('Verify that email and password are controlled correctly', () => {
        render(<MemoryRouter>
            <FormLogin />
        </MemoryRouter>);
        const emailInput = screen.getByLabelText(/Correo Electrónico:/i);
        const passwordInput = screen.getByLabelText(/Password:/i);

        fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('example@gmail.com');
        expect(passwordInput.value).toBe('password123');
    });

    test('Verify that the login function is called when the submit button is pressed', async () => {
        render(<MemoryRouter>
            <FormLogin />
        </MemoryRouter>);
        const submitButton = screen.getByText(/Iniciar Sesión/i);

        fireEvent.click(submitButton);
        expect(login).toHaveBeenCalled();
    });

    test("Verify redirects to the dashboard after a successful login", async () => {
        render(
            <MemoryRouter>
                <FormLogin />
            </MemoryRouter>
        );
        const emailInput = screen.getByLabelText("Correo Electrónico:");
        const passwordInput = screen.getByLabelText("Password:");
        const submitButton = screen.getByText("Iniciar Sesión");
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            fireEvent.change(emailInput, { target: { value: "test@example.com" } });
            fireEvent.change(passwordInput, { target: { value: "password" } });
            fireEvent.click(submitButton);
        });
        expect(login).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password",
        });
    });
});