import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TaskAddingDialog from '../src/components/TaskDialog'; 
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// page renders
describe('TaskAddingDialog', () => {
    test('renders without crashing', () => {
        render(<TaskAddingDialog />);
    });


// opens dialog, adds and submits a task
    test('calls handleSubmit on Save button click', () => {
        const handleSubmit = vi.fn();
        const { getByText, getByLabelText, getByRole } = render(<TaskAddingDialog  open={true} handleSubmit={handleSubmit()} />);

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
        const { getByText } = render(<TaskAddingDialog open={true} handleClose={handleClose} />);
        fireEvent.click(getByText('Cancel'));
        expect(handleClose).toHaveBeenCalled();
    });
});