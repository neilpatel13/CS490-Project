import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";
import React from "react";
import Appointment from "../src/components/Appointment.jsx";

describe("Appointment.jsx", () => {
  it("Appointment label present", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Appointment />
        </MemoryRouter>
      </Provider>
    );
    // Use getByText to check if the label is present
    const appointmentLabel = screen.getByText("Appointment");

    // Assert that the label is present
    expect(appointmentLabel).toBeInTheDocument();
  });
  it("connects to Google Calendar on button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Appointment />
        </MemoryRouter>
      </Provider>
    );
    // Simulate date change using the id attribute
    fireEvent.click(screen.getByTestId("connectCalendar"));
    /*await waitFor(() => {
      // Add assertions based on the expected behavior of a successful connection
      // For example, you can check that handleAuthClick is called
      expect(Appointment.initializeGoogleCalendar).toHaveBeenCalledTimes(1);
    });*/
  });
  it("Check date change", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Appointment />
        </MemoryRouter>
      </Provider>
    );

    // Simulate date change using the id attribute
    fireEvent.change(screen.getByTestId("appointmentDateInput"), {
      target: { value: "2023-01-01" },
    });
    // Retrieve the updated date
    const updatedDate = screen.getByTestId("appointmentDateInput").value;

    // Assert the updated date
    expect(updatedDate).toBe("2023-01-01");
  });
  it("Check if time-slots are displayed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Appointment />
        </MemoryRouter>
      </Provider>
    );
    const timeSlots = screen.getAllByTestId("time-slot");

    // Check the expected time slots from 5AM to 8PM
    for (let i = 5; i <= 20; i++) {
      const expectedHour =
        i === 12 ? "12 PM" : i <= 11 ? `${i} AM` : `${i - 12} PM`;

      // Log the actual text content of the time slots
      console.log(timeSlots.map((slot) => slot.textContent));

      const matchingSlot = timeSlots.find((slot) => {
        const hourElement = screen.getByText(expectedHour);
        return slot.contains(hourElement);
      });

      expect(matchingSlot).toBeInTheDocument();
    }
  });
});
