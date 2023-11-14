import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginScreen from './LoginScreen';
import authReducer from '../slices/authSlice';
import userApiSlice, { useLoginMutation } from '../slices/userApiSlice';

// Mock the necessary modules
vi.mock('../slices/userApiSlice', () => ({
  useLoginMutation: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"), // import and retain the actual functions
  return {
    ...actual,
  useNavigate: () => vi.fn(), // mock useNavigate
    },
});

describe('LoginScreen', () => {
  const mockLogin = useLoginMutation;

  beforeEach(() => {
    mockLogin.mockReturnValue([vi.fn(), { isLoading: false }]);
  });

  it('renders the login screen', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginScreen />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email Address\/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware),
    });

    // Mock successful login
    const mockResolve = {
      user: { name: 'John Doe', email: 'john@example.com' },
      token: 'fakeToken',
    };
    mockLogin.mockReturnValue([
      vi.fn().mockResolvedValue(mockResolve),
      { isLoading: false },
    ]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginScreen />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address\/username/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for the login function to be called
    await waitFor(() => expect(mockLogin()[0]).toHaveBeenCalled());
    // Here you should also check if the navigation has been called, but this is a mock so it won't actually navigate
  });

  it('handles unsuccessful login', async () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware),
    });

    // Mock unsuccessful login
    const error = {
      status: 401,
      data: { message: 'Incorrect email or password' },
    };
    mockLogin.mockReturnValue([
      vi.fn().mockRejectedValue(error),
      { isLoading: false },
    ]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginScreen />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address\/username/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Wait for the login function to be called and the error to be displayed
    await waitFor(() => expect(mockLogin()[0]).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Incorrect email or password'
      )
    );
  });

  // ...other tests
});

