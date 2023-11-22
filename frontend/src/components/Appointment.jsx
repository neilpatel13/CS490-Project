// AppointmentComponent.jsx
import React from "react";
import { Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

const AppointmentComponent = () => {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
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
                      {hour < 10 ? `0${hour}` : hour}:00
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
