import { useState, useEffect } from "react";

const useGoogleCalendar = () => {
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

  const listUpcomingEvents = async () => {
    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      const response = await gapi.client.calendar.events.list(request);
      setEvents(response.result.items);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };
  const listEventsofDay = async (selectedDate) => {
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0); // Set time to the beginning of the day

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day

      const request = {
        calendarId: "primary",
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };

      const response = await gapi.client.calendar.events.list(request);
      setEvents(response.result.items);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };
  const handleAuthClick = async () => {
    try {
      setLoading(true);
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, resp.credential);

        // Continue with listing upcoming events
        await listUpcomingEvents();
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
      function gapiLoaded() {
        gapi.load("client", initializeGapiClient);
      }

      async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        handleAuthClick(); // Initiating authentication on button click
      }

      function gisLoaded() {
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

  return {
    events,
    loading,
    handleAuthClick,
    listEventsofDay,
    initializeGoogleCalendar, // Add the initialization function to trigger on button click
  };
};

export default useGoogleCalendar;
