import LoginScreen from './LoginScreen';
import { it, describe,expect } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('LoginScreen.jsx', () => {
    it("Check if page renders", () => {
        <BrowserRouter>
        render(<LoginScreen/>);
        </BrowserRouter>
        screen.debug();

    });
    it("validates password ", async () => {
        <BrowserRouter>
        render(<LoginScreen />);
        </BrowserRouter>

        await waitFor(() => {
            const passwordInput = screen.getByTestId('password-input')
            expect(passwordInput).toBeInTheDocument();
        });
        const submitButton = screen.getByRole('button', { name: /submit/i});

        userEvent.type(passwordInput, 'wrong');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
        });

        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, '123');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/register/i)).toBeInTheDocument();
        });

    });
});