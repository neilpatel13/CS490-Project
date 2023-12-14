import App from '../src/App';
import LoginScreen from '../src/screens/LoginScreen';
import { it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';



describe('LoginScreen.jsx', () => {
  it('Check if page renders', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();
  });
});
