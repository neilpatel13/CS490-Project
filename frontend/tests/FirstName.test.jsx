import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import ProfileScreen from '../src/screens/ProfileScreen';

describe('ProfileScreen.jsx', () => {
  it('updates the first name', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileScreen />
        </MemoryRouter>
      </Provider>
    );

    // Get the input field by its label text
    const firstNameInput = screen.getByLabelText('First Name');

    // Check if the input field has any value initially
    expect(firstNameInput).toHaveValue('');

    // Change the first name to 'Jane'
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    // Assert that the first name has been updated
    expect(firstNameInput).toHaveValue('Jane');
  });
});
