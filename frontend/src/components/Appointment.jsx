import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import useGoogleCalendar from "./useGoogleCalendar";
import AddIcon from "@mui/icons-material/Add";

const AppointmentComponent = () => {
  const { events, loading, initializeGoogleCalendar, listEventsofDay } =
    useGoogleCalendar();
  console.log(events);
  const [selectedDate, setSelectedDate] = useState(""); // Add state for selected date

  const handleDateChange = (date) => {
    setSelectedDate(date);
    listEventsofDay(date); // Pass the selected date to the listUpcomingEvents function
  };

  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          left: "56.8%",
          top: "18%",
        }}
      >
        <div
          id="appointmentHeading"
          style={{
            color: "#000",
            fontFamily: "DM Sans",
            fontSize: "4vh",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          Appointment
        </div>
        <Fab
          onClick={initializeGoogleCalendar}
          size="small"
          color="primary"
          aria-label="add"
          sx={{ width: "30px", height: "30px", marginLeft: "10px" }}
        >
          <AddIcon fontSize="1.25rem" />
        </Fab>
        {/* Add a date picker or input for selecting the date */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div
        id="appointmentBox"
        className="taskRectangle"
        style={{
          color: "#000",
          position: "absolute",
          left: "56.8%",
          top: "25%",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ bgcolor: "#FFF" }}
        >
          <div
            id="dayView"
            style={{
              color: "#000",
              position: "absolute",
              left: "2.8%",
              top: "1%",
            }}
          >
            <DragDropContext>
              {[...Array(16)].map((_, index) => {
                const hour = 5 + index;
                const timeSlotDiv = (
                  <div key={index} style={{ height: "42px", display: "flex" }}>
                    <div style={{ width: "50px", height: "60px" }}>
                      {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
                    </div>
                    {/* You can add appointment components here */}
                  </div>
                );
                return timeSlotDiv;
              })}
            </DragDropContext>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default AppointmentComponent;
