import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import ProfileScreen from '../src/screens/ProfileScreen';

describe('ProfileScreen.jsx', () => {
  it('updates the last name', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileScreen />
        </MemoryRouter>
      </Provider>
    );

    // Get the input field by its label text
    const lastNameInput = screen.getByLabelText('Last Name');

    // Check if the input field has any value initially
    expect(lastNameInput).toHaveValue('');

    // Change the last name to 'Doe'
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    // Assert that the last name has been updated
    expect(lastNameInput).toHaveValue('Doe');
  });
});
