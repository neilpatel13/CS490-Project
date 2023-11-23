// AppointmentComponent.jsx
import React, { useEffect, useState } from "react";
import { Box, Fab } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";

const AppointmentComponent = () => {
  const [events, setEvents] = useState([]);
  const CLIENT_ID =
    "248086281974-5u3hgq4tl01h5fj37t4bgb3gu6679boq.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBKIAglnDDSoOw75PRucrUqs3F6uUFHIP8";

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  let tokenClient;
  useEffect(() => {
    // Function to create a script element and add it to the document
    function loadScript(src, onloadCallback) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = onloadCallback;
      document.head.appendChild(script);
    }
    function handleAuthClick() {
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }
        await listUpcomingEvents();
      };

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: "" });
      }
    }
    async function listUpcomingEvents() {
      let response;
      try {
        const request = {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        };
        response = await gapi.client.calendar.events.list(request);
      } catch (err) {
        return;
      }
      setEvents(response.result.items); // Use setEvents to update the state
    }

    // Function to handle the loading of the Google API client
    function gapiLoaded() {
      gapi.load("client", initializeGapiClient);
    }
    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      handleAuthClick(); // Initiating authentication on page load
    }
    function gisLoaded() {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
      });
    }

    // Load the Google API client script
    loadScript("https://apis.google.com/js/api.js", gapiLoaded);

    // Load the Google Identity Services script
    loadScript("https://accounts.google.com/gsi/client", gisLoaded);
  }, []);
  useEffect(() => {
    console.log(events); // This will log the updated state
  }, [events]);
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
