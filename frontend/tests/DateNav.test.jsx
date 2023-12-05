import { describe, it } from 'vitest';
import TasksAppts from '../src/screens/TasksAppts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';

describe('TasksAppts.jsx', () => {
  it('renders TasksAppts component without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts />
        </MemoryRouter>
      </Provider>
    );

    screen.debug();
  });
});
