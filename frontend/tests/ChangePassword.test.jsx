import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import ProfileScreen from '../src/screens/ProfileScreen';

describe('ProfileScreen.jsx', () => {
  it('updates the password', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileScreen />
        </MemoryRouter>
      </Provider>
    );

    // Get the input fields by their label text
    const currentPasswordInput = screen.getByLabelText('Current Password');
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');

    // Check if the input fields have any value initially
    expect(currentPasswordInput).toHaveValue('');
    expect(newPasswordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');

    // Change the passwords
    fireEvent.change(currentPasswordInput, { target: { value: 'oldPassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword' } });

    // Assert that the passwords have been updated
    expect(currentPasswordInput).toHaveValue('oldPassword');
    expect(newPasswordInput).toHaveValue('newPassword');
    expect(confirmPasswordInput).toHaveValue('newPassword');
    
    // Submit the form (assuming there is a button to submit the form)
    fireEvent.submit(screen.getByTestId('password-form'));

    // Wait for the asynchronous update to complete (if there is an asynchronous operation)
    await waitFor(() => {
      // Assert any post-update changes or messages here
    });
  });
});
