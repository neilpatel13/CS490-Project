import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import RegisterScreen from '../src/screens/RegisterScreen'; // replace with the actual path to your RegisterScreen component
import { ToastContainer } from 'react-toastify';
import { vi } from 'vitest';


describe('RegisterScreen', () => {
    test('renders RegisterScreen', () => {
        render(<RegisterScreen />);
        
    });

    test('creates an account successfully and navigates to home page', async () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <RegisterScreen />
            </Router>
        );
    
        const emailElement = screen.getByPlaceholderText('Enter Email');
        const passwordElement = screen.getByPlaceholderText('Enter Password');
        const confirmPasswordElement = screen.getByPlaceholderText('Confirm Password');
    
        fireEvent.change(emailElement, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordElement, { target: { value: 'Testpassword@345' } });
        fireEvent.change(confirmPasswordElement, { target: { value: 'Testpassword@345' } });
    
        // Replace 'Submit' with the actual text of your submit button
        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);
    
        // Wait for the navigation to occur
        await waitFor(() => expect(history.location.pathname).toBe('/'));
    });

    test('fails password requirements and shows toast notification', async () => {
        render(
            <>
                <RegisterScreen />
                <ToastContainer />
            </>
        );
    
        const emailElement = screen.getByPlaceholderText('Enter Email');
        const passwordElement = screen.getByPlaceholderText('Enter Password');
        const confirmPasswordElement = screen.getByPlaceholderText('Confirm Password');
    
        fireEvent.change(emailElement, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordElement, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordElement, { target: { value: 'password' } });
    
        // Replace 'Submit' with the actual text of your submit button
        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);
    
        // Replace this with the actual error message you want to check
        const errorMessage = await screen.findByText('Password must be at least 12 characters long');
        expect(errorMessage).toBeInTheDocument();
    });


    test('password and confirm password fields do not match and shows toast notification', async () => {
        render(
            <>
                <RegisterScreen />
                <ToastContainer />
            </>
        );
    
        const emailElement = screen.getByPlaceholderText('Enter Email');
        const passwordElement = screen.getByPlaceholderText('Enter Password');
        const confirmPasswordElement = screen.getByPlaceholderText('Confirm Password');
    
        fireEvent.change(emailElement, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordElement, { target: { value: 'Testpassword@345' } });
        fireEvent.change(confirmPasswordElement, { target: { value: 'differentPassword' } });
    
        // Replace 'Submit' with the actual text of your submit button
        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);
    
        // Replace this with the actual error message you want to check
        const errorMessage = await screen.findByText('Passwords do not match');
        expect(errorMessage).toBeInTheDocument();
    });
    });