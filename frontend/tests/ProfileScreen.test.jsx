import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Add this line
import LoginScreen from '../src/screens/LoginScreen';

// Mocking the store and the login API call
const mockStore = configureStore([]);

jest.mock('../slices/userApiSlice', () => ({
  ...jest.requireActual('../slices/userApiSlice'),
  useLoginMutation: jest.fn(),
}));

describe('LoginScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        userInfo: null,
      },
    });
  });

  test('renders login form', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginScreen />
        </Router>
      </Provider>
    );

    // Assert that the login form elements are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    // Mock the API response for a successful login
    const loginResponse = { token: 'mocked-token', user: { /* mocked user data */ } };
    const mockLogin = jest.fn().mockResolvedValue(loginResponse);

    render(
      <Provider store={store}>
        <Router>
          <LoginScreen />
        </Router>
      </Provider>
    );

    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/sign in/i));

    // Wait for the login process to complete
    await waitFor(() => expect(mockLogin).toHaveBeenCalled());

    // Assert that the user is redirected or some state is updated
    // This might depend on your actual implementation
    // For example, you might check for a change in the store state or a redirection
  });

  // Add more test cases for different scenarios
});
