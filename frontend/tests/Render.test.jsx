import App from '../src/App';
import { it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import ProfileScreen from '../src/screens/ProfileScreen';

describe('ProfileScreen.jsx', () => {
    it('Check if page renders', () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
            <ProfileScreen />
            </MemoryRouter>
        </Provider>
        );
        screen.debug();
    });
    });
