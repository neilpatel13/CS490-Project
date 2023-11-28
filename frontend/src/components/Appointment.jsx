import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import useGoogleCalendar from "./useGoogleCalendar";
import AddIcon from "@mui/icons-material/Add";

const AppointmentComponent = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial state to false
  const [initialized, setInitialized] = useState(false); // Track initialization status
  const CLIENT_ID =
    "248086281974-5u3hgq4tl01h5fj37t4bgb3gu6679boq.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBKIAglnDDSoOw75PRucrUqs3F6uUFHIP8";
  const SESSION_STORAGE_KEY = "googleAuthToken";

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  let tokenClient;
  const abortController = new AbortController();

  const handleAuthClick = async () => {
    try {
      setLoading(true);
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, resp.credential);

        // Continue with listing upcoming events
        //await listUpcomingEvents();
      };

      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        tokenClient.requestAccessToken({ prompt: "" });
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized) {
      // Load Google API client script only if initialized
      async function gapiLoaded() {
        gapi.load("client", initializeGapiClient);
      }

      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        await handleAuthClick(); // Initiating authentication on button click
      }

      async function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: "",
        });
      }

      function loadScript(src, onloadCallback) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = onloadCallback;
        document.head.appendChild(script);
      }

      loadScript("https://apis.google.com/js/api.js", gapiLoaded);
      loadScript("https://accounts.google.com/gsi/client", gisLoaded);
    }

    // Clean up function
    return () => abortController.abort();
  }, [initialized]);

  const initializeGoogleCalendar = () => {
    // Set initialized to true when the button is clicked
    setInitialized(true);
  };
  function convertToDate(dateStr) {
    // Split the date string into [year, month, day]
    const parts = dateStr.split("-").map((part) => parseInt(part, 10));

    // Create a new Date object using year, month (zero-indexed), and day
    // parts[0] is the year, parts[1] - 1 is the month (zero-indexed), parts[2] is the day
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return date;
  }
  const listEventsofDay = async (selectedDate) => {
    try {
      console.log(selectedDate);
      // Convert the selectedDate to a UTC date object
      const startOfDay = new Date(selectedDate + "T00:00:00Z");
      const endOfDay = new Date(selectedDate + "T23:59:59Z");

      // Convert startOfDay and endOfDay to UTC before making the API call
      const startOfDayUTC = startOfDay.toISOString();
      const endOfDayUTC = endOfDay.toISOString();

      //console.log("startOfDay:", startOfDayUTC);
      //console.log("endOfDay:", endOfDayUTC);

      const request = {
        calendarId: "primary",
        timeMin: startOfDayUTC,
        timeMax: endOfDayUTC,
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };

      const response = await gapi.client.calendar.events.list(request);
      setEvents(response.result.items);
      updateEventTimeSlots(response.result.items, selectedDate);
      //console.log(events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    listEventsofDay(date);
  };

  const updateEventTimeSlots = (_events, selected_date) => {
    console.log("Updating event time slots");
    console.log(_events, selected_date);
    const updatedTimeSlots = [...Array(16)].map((_, index) => {
      const hour = 5 + index;
      if (hour < 5 || hour >= 21) {
        // Skip time slots outside the desired range
        return { hour: "", events: [] };
      }

      const startTime = convertToDate(selected_date);
      console.log("StartTime", startTime);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = convertToDate(selected_date);
      endTime.setHours(hour + 1, 0, 0, 0);

      const eventsInTimeSlot = _events.filter((event) => {
        const eventStartTime = new Date(event.start.dateTime);
        console.log({ eventStartTime, startTime, endTime });
        return eventStartTime >= startTime && eventStartTime < endTime;
      });
      return {
        hour:
          hour === 12 ? "12 PM" : hour <= 11 ? `${hour} AM` : `${hour - 12} PM`,
        events: eventsInTimeSlot,
      };
    });
    console.log("Updated time slots", updatedTimeSlots);
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
