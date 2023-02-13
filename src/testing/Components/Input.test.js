import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Input';

describe('Input component', () => {
    test('renders label and input correctly', () => {
        const labelTextEmail = 'Email';
        const typeEmail = 'email';
        const nameEmail = 'email';
        const placeholderEmail = 'Enter your email';
        const valueEmail = 'test email';
        const onChange = jest.fn();
        render(
            <Input
                labelText={labelTextEmail}
                type={typeEmail}
                name={nameEmail}
                placeholder={placeholderEmail}
                onChange={onChange}
                value={valueEmail}
            />
        );
        
        const labelElement = screen.getByLabelText(labelTextEmail);
        expect(labelElement).toBeInTheDocument();

        const inputEmail = screen.getByPlaceholderText(placeholderEmail);
        expect(inputEmail).toBeInTheDocument();
        expect(inputEmail.value).toBe(valueEmail);
    });
    test('calls onChange function correctly', () => {
        const labelTextPassword = 'Password';
        const typePassword = 'password';
        const namePassword = 'password';
        const placeholderPassword = 'Enter your password';
        const valuePassword = '*********';
        const onChange = jest.fn();
        render(
            <Input
                labelText={labelTextPassword}
                type={typePassword}
                name={namePassword}
                placeholder={placeholderPassword}
                onChange={onChange}
                value={valuePassword}
            />
        );

        const inputPassword = screen.getByPlaceholderText(placeholderPassword);
        fireEvent.change(inputPassword, { target: { value: '7a*f$F8Aaj3' } });
        expect(onChange).toHaveBeenCalled();
    });
});