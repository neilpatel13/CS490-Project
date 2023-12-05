import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import TimerModal from '../src/components/FocusTime'; 
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, vi } from 'vitest';
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

  //test finish time
  test('Finish time display', () => {
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

    // Check for finish at
    expect(screen.getByText('Finish At:')).toBeInTheDocument();
  });

  //check the pomo counter: 
  test('Pomo tracker shows up', () => {
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

    // Check for pomos
    expect(screen.getByText('Pomos:')).toBeInTheDocument();
  });

//close button works 
test('closes the modal when the close button is clicked', async () => {
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

  // Mock the handleClose function
  const handleClose = vi.fn();

  // Render the component
    render(
    <Provider store={store}>
      <TimerModal open={true} handleClose={handleClose} task={mockTask} />
    </Provider>
  );

  // Simulate clicking on the close button
  const closeButton = screen.getByLabelText('Close modal');
  userEvent.click(closeButton);

  // Check if the handleClose function was called
  await waitFor(() => expect(handleClose).toHaveBeenCalled());
});


});

describe('Timer related tests', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
    // test if tab switches to short break
   test('tab changes to short break', async () => {

    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
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
        timer: '2', 
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
      await user.click(screen.getByText('Start'));
      
      await act(() => vi.advanceTimersByTime(6 * 1000));

      // Wait for next tick for state updates
      await new Promise(resolve => setImmediate(resolve));

      const timerElement = document.querySelector('.timerAppearance'); 
      expect(timerElement.textContent).toBe('0:03');
  
    });

  //test if tab switches back to pomo 

  test('tab changes back to pomo from short break', async () => {

    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
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
        timer: '2', 
        notes: 'Some notes',
        priority: 'Important',
      };
      
      // Render the component
      const { getByText } = render(
        <Provider store={store}>
          <TimerModal open={true} handleClose={() => {}} task={mockTask} />
        </Provider>
      );
      //switch tabs to short break
      await user.click(screen.getByText('Short Break'));
      // Simulate start button click
      await user.click(screen.getByText('Start'));
      
      await act(() => vi.advanceTimersByTime(3 * 1000));

      // Wait for next tick for state updates
      await new Promise(resolve => setImmediate(resolve));

      const timerElement = document.querySelector('.timerAppearance'); 
      expect(timerElement.textContent).toBe('0:06');
  
    });

    //test if tab switches back to pomo from long break

    test('tab changes back to pomo from long break', async () => {

      const user = userEvent.setup({
        advanceTimers: (ms) => vi.advanceTimersByTime(ms),
      });
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
          timer: '2', 
          notes: 'Some notes',
          priority: 'Important',
        };
        
        // Render the component
        const { getByText } = render(
          <Provider store={store}>
            <TimerModal open={true} handleClose={() => {}} task={mockTask} />
          </Provider>
        );
        //switch tabs to short break
        await user.click(screen.getByText('Long Break'));
        // Simulate start button click
        await user.click(screen.getByText('Start'));
        
        await act(() => vi.advanceTimersByTime(6 * 1000));
  
        // Wait for next tick for state updates
        await new Promise(resolve => setImmediate(resolve));
  
        const timerElement = document.querySelector('.timerAppearance'); 
        expect(timerElement.textContent).toBe('0:06');
    
      });

  //test if tab switches to long break

  test('tab changes to long break', async () => {

    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
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
              long: 0.2,
            },
          },
        },
      });
    
      // Mock the task
      const mockTask = {
        id: Date.now(),
        taskName: 'Task',
        timer: '5', 
        notes: 'Some notes',
        priority: 'Important',
      };
      
      // Render the component
      const { getByText } = render(
        <Provider store={store}>
          <TimerModal open={true} handleClose={() => {}} task={mockTask} />
        </Provider>
      );
    
      for (let i = 0; i < 4; i++) {
        await user.click(screen.getByText('Start'));
        await act(() => vi.advanceTimersByTime(6 * 1000));
        await new Promise(resolve => setImmediate(resolve));
        if(i < 3){
          await user.click(screen.getByText('Pomodoro'));
        }
      }

      const timerElement = document.querySelector('.timerAppearance'); 
      expect(timerElement.textContent).toBe('0:12');
  
    });

  // Stop using fake timers
  afterEach(() => {
    vi.useRealTimers();
  });
});