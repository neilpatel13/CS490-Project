import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import useGoogleCalendar from "./useGoogleCalendar";
import AddIcon from "@mui/icons-material/Add";

const AppointmentComponent = () => {
  const { events, loading, initializeGoogleCalendar, listEventsofDay } =
    useGoogleCalendar();
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Update time slots whenever events or selected date changes
    updateEventTimeSlots();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    listEventsofDay(date);
  };

  const updateEventTimeSlots = () => {
    console.log("Updating event time slots");
    const updatedTimeSlots = [...Array(16)].map((_, index) => {
      const hour = 5 + index;
      if (hour < 5 || hour >= 20) {
        // Skip time slots outside the desired range
        return { hour: "", events: [] };
      }

      const startTime = new Date(selectedDate);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(selectedDate);
      endTime.setHours(hour + 1, 0, 0, 0);

      const eventsInTimeSlot = events.filter((event) => {
        const eventStartTime = new Date(event.start.dateTime);
        return eventStartTime >= startTime && eventStartTime < endTime;
      });

      return {
        hour:
          hour === 12 ? "12 PM" : hour <= 11 ? `${hour} AM` : `${hour - 12} PM`,
        events: eventsInTimeSlot,
      };
    });

    setTimeSlots(updatedTimeSlots);
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
              top: "3%",
            }}
          >
            <DragDropContext onDragEnd={() => {}}>
              {timeSlots.map((timeSlot, index) => (
                <div key={index} style={{ height: "40px", display: "flex" }}>
                  <div style={{ width: "50px", height: "50px" }}>
                    {timeSlot.hour}
                  </div>
                  <div style={{ marginLeft: "25px", marginTop: "10px" }}>
                    {timeSlot.events.map((event) => (
                      <div key={event.id}>{event.summary}</div>
                    ))}
                  </div>
                </div>
              ))}
            </DragDropContext>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default AppointmentComponent;
