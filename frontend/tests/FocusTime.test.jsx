import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TimerModal from '../src/components/FocusTime'; 
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/slices/authSlice'; 

// page renders
describe('TimerModal', () => {
    test('renders without crashing', () => {
      const store = configureStore({
        reducer: {
          auth: authReducer,
        },
        preloadedState: {
          auth: {
            userInfo: {
              pomodoro: 0,
              short: 0,
              long: 0,
            },
          },
        },
      });

      const mockTask = {
        id: Date.now(),
        taskName: 'Task',
        timer: '2',
        notes: 'Some notes',
        priority: 'Important',
      };
  
  
      render(
        <Provider store={store}>
          <TimerModal task={mockTask} />
        </Provider>
      );
    });
  test('initial state', () => {
    // Configure the store
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          userInfo: {
            pomodoro: 25,
            short: 5,
            long: 15,
          },
        },
      },
    });

    // Mock the task
    const mockTask = {
        id: Date.now(),
        taskName: 'Task',
        timer: '2',
        notes: 'Some notes',
        priority: 'Important',
    };

    // Render the component
    render(
      <Provider store={store}>
        <TimerModal open={true} handleClose={() => {}} task={mockTask} />
      </Provider>
    );

    // Check the initial state
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    // Add similar checks for other parts of the initial state
  });

  test('timer start and stop', async () => {
    // Configure the store
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          userInfo: {
            pomodoro: 25,
            short: 5,
            long: 15,
          },
        },
      },
    });
  
    // Mock the task
    const mockTask = {
      id: Date.now(),
      taskName: 'Task',
      timer: '2', // set the number of timers for the test
      notes: 'Some notes',
      priority: 'Important',
    };
  
    // Render the component
    const { getByText } = render(
      <Provider store={store}>
        <TimerModal open={true} handleClose={() => {}} task={mockTask} />
      </Provider>
    );
  
    // Check initial state
    expect(getByText('Start')).toBeInTheDocument();
  
    // Simulate start button click
    fireEvent.click(getByText('Start'));
  
    // Wait for next tick for state updates
    await new Promise(r => setTimeout(r, 0));
  
    // Check state after start
    expect(getByText('Stop')).toBeInTheDocument();
  
    // Simulate stop button click
    fireEvent.click(getByText('Stop'));
  
    // Wait for next tick for state updates
    await new Promise(r => setTimeout(r, 0));
  
    // Check state after stop
    expect(getByText('Start')).toBeInTheDocument();
  });
  
  test('timer and tab changes', async () => {
    // Start using fake timers
    vi.useFakeTimers();
  
    // Configure the store
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          userInfo: {
            pomodoro: 0.1,
            short: 0.05,
            long: 0.1,
          },
        },
      },
    });
  
    // Mock the task
    const mockTask = {
      id: Date.now(),
      taskName: 'Task',
      timer: '2', // set the number of timers for the test
      notes: 'Some notes',
      priority: 'Important',
    };
  
    // Render the component
    const { getByText } = render(
      <Provider store={store}>
        <TimerModal open={true} handleClose={() => {}} task={mockTask} />
      </Provider>
    );
  
    // Simulate start button click
    fireEvent.click(getByText('Start'));
// Advance timers by 25 minutes (1500 seconds)
    vi.advanceTimersByTime(0.1 * 60 * 1000);

// Wait for next tick for state updates
    await waitFor(() => {
        const timerElement = document.querySelector('.timerAppearance'); // replace '.timer' with the actual selector of your timer element
        expect(timerElement.textContent).toBe('00:03');
    });

// Simulate stop button click
    fireEvent.click(getByText('Stop'));

// Check state after stop
    await waitFor(() => expect(getByText('Start')).toBeInTheDocument());

    // Stop using fake timers
    vi.useRealTimers();
  }, 10000);

});