import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TaskAddingDialog from '../src/components/TaskDialog'; 
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';

//mock store
const mockStore = configureStore({
    reducer: {
      tasks: () => [], // Mock tasks reducer
    },
    preloadedState: {
      tasks: [], // Initial state for tasks
    },
  });

// page renders
describe('TaskAddingDialog', () => {
    test('renders without crashing', () => {
        render(
            <Provider store={mockStore}> 
                <TaskAddingDialog />
            </Provider>
        );
    });

// opens dialog, adds and submits a task
    test('calls handleSubmit on Save button click', () => {
        const handleSubmit = vi.fn();
        const { getByText, getByLabelText, getByRole } = 
        render(
            <Provider store = {mockStore}>
                <TaskAddingDialog  open={true} handleSubmit={handleSubmit()} />
            </Provider>
            );

        fireEvent.change(getByLabelText('Task'), { target: { value: 'Task' }});
        fireEvent.change(getByLabelText('Number of timers'), { target: { value: '2' }});
        fireEvent.change(getByLabelText('Notes'), { target: { value: 'Some notes' }});

        fireEvent.click(screen.getByRole('combobox', { name: /Select Priority/i }));
        waitFor(() => userEvent.click(screen.getByText('Top Priority')));

        fireEvent.click(getByText('Save'));
        expect(handleSubmit).toHaveBeenCalled();
    });

// closes dialog on cancel button click
    test('calls handleClose on Cancel button click', () => {
        const handleClose = vi.fn();
        const { getByText } = 
        render(
        <Provider store = {mockStore}>
            <TaskAddingDialog open={true} handleClose={handleClose} />
        </Provider>
            );
        fireEvent.click(getByText('Cancel'));
        expect(handleClose).toHaveBeenCalled();
    });
});