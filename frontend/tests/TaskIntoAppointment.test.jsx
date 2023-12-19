import { describe, it } from "vitest";
import TasksAppts from "../src/screens/TasksAppts";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";

describe("TasksAppts.jsx", () => {
  // Placeholder for mockUserInfo
  const mockUserInfo = {
    first: "John",
    last: "Doe",
  };

  it("renders TasksAppts component without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts />
        </MemoryRouter>
      </Provider>
    );

    screen.debug();
  });

  it("renders task sections", () => {
    // You might need to mock more data for tasks
    const mockTasks = {
      "Top Priority": [
        { _id: 1, taskName: "Task 1", timer: 1, notes: "Note 1" },
      ],
      Important: [{ _id: 2, taskName: "Task 2", timer: 2, notes: "Note 2" }],
      Other: [{ _id: 3, taskName: "Task 3", timer: 3, notes: "Note 3" }],
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts userInfo={mockUserInfo} groupedTasks={mockTasks} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Top Priority/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  });

  it("handles planning a day", () => {
    // You need to mock the function and check if it's called
    const mockHandlePlanDayClick = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts
            userInfo={mockUserInfo}
            handlePlanDayClick={mockHandlePlanDayClick}
          />
        </MemoryRouter>
      </Provider>
    );
    const planDayButton = screen.getByText(/Plan Day/i);
    fireEvent.click(planDayButton);
    expect(mockHandlePlanDayClick).toHaveBeenCalledTimes(1);
  });

  it("disables Plan Day button when the selected date is not today", () => {
    // Mocked data for a date that is not today
    const mockSelectedDate = {
      day: 10,
      month: "December",
      year: 2023,
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts userInfo={mockUserInfo} selectedDate={mockSelectedDate} />
        </MemoryRouter>
      </Provider>
    );

    const planDayButton = screen.getByText(/Plan Day/i);
    expect(planDayButton).toBeDisabled();
  });

  it("disables Plan Day button if it's already clicked for the day", () => {
    // Mocked data for a date that is today and planDayClicked is true
    const mockSelectedDate = {
      day: new Date().getDate(),
      month: "December",
      year: new Date().getFullYear(),
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts
            userInfo={mockUserInfo}
            selectedDate={mockSelectedDate}
            planDayClicked={true}
          />
        </MemoryRouter>
      </Provider>
    );

    const planDayButton = screen.getByText(/Plan Day/i);
    expect(planDayButton).toBeDisabled();
  });
  it("adds events in time slots after the current time", () => {
    // Mocked data for a current time
    const mockCurrentTime = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    };

    // Mocked data for time slots with events
    const mockTimeSlots = [
      {
        hour: 9,
        events: [
          { id: 1, summary: "Event 1", isPast: false, isFromTask: false },
        ],
      },
      {
        hour: 10,
        events: [
          { id: 2, summary: "Event 2", isPast: false, isFromTask: false },
          { id: 3, summary: "Event 3", isPast: true, isFromTask: true },
        ],
      },
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TasksAppts
            userInfo={mockUserInfo}
            timeSlots={mockTimeSlots}
            currentHour={mockCurrentTime.hour}
          />
        </MemoryRouter>
      </Provider>
    );
    // Check if Event 2 is in the document (after the current time)
    expect(screen.getByText(/Event 2/i)).toBeInTheDocument();

    // Check if Event 3 is not in the document (past event)
    expect(screen.queryByText(/Event 3/i)).toBeNull();
  });
});
