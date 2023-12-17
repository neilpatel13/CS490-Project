import logo from "../assets/mainLogo.svg";
import lo from "../assets/logout.svg";
///import usr from '../assets/profile.svg';
///import lock from '../assets/lock.svg';
///import cl from '../assets/clock.svg';
import { Link } from "react-router-dom";
import { Button, Box, Typography, Fab, Select, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";

// import * as React from 'react';

//import {useEffect, useState} from 'react';
import {useSelector } from 'react-redux';
import TaskAddingDialog from '../components/TaskDialog';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usrLogo from '../assets/user.svg'
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
// adding dnd import 
import TimerModal from '../components/FocusTime';
// edit icon import
import React, { useEffect, useState, useContext } from 'react';
import { useGetTasksQuery } from '../slices/taskApiSlice';
import { isToday } from "date-fns";




const TasksAppts = () => {
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [dialogOpen, setDialogOpen ] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);
    const today = new Date();

    // adding some logic for focus time here
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    //loading tasks if they exist 

  const today = new Date();
  const [timeSlots, setTimeSlots] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial state to false
  const [initialized, setInitialized] = useState(false); // Track initialization status
  const [planDayClicked, setPlanDayClicked] = useState(false);
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

  const [selectedDate, setSelectedDate] = useState({
    month: (today.getMonth() + 1).toString().padStart(2, "0"), // Adding 1 because months are zero-based
    day: today.getDate().toString().padStart(2, "0"),
    year: today.getFullYear().toString(),
  });
  // adding some logic for focus time here
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);


    const formattedDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
    const { data: initialTasks, isLoading, isError } = useGetTasksQuery(formattedDate);
    const [tasks, setTasks] = useState([]);

//function for opening the focus time modal
const handleTitleClick = (task) => {
  setCurrentTask(task);
  setModalOpen(true);
};
 const handleModalClose = () => {
    setModalOpen(false);
  };

    //dialog functions for adding tasks
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () =>{
        setDialogOpen(false);
    };

    const [lastUpdated, setLastUpdated] = useState(Date.now());

    const onAddTask = (newTask) => {
      console.log('Before adding task', tasks);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log('after adding tasks', tasks);
      setLastUpdated(Date.now());
    }

    const handleNewTaskAdded = () => {
      setTriggerFetch(prev => !prev); // Toggle the trigger to re-fetch tasks
    };

    useEffect(() => {
      const fetchTasks = async () => {
      if (!isLoading && !isError && initialTasks) {
          const currentDate = new Date();
          const selectedDateObj = new Date(formattedDate);

          const filteredTasks = initialTasks.filter(task => {
              const taskDate = new Date(task.date);

              // Include tasks that are not 'Complete' and are either from the past or the selected date
              return task.state !== 'Complete' && (taskDate <= selectedDateObj);
          });

          setTasks(filteredTasks);
      }
    };

    fetchTasks();
  }, [triggerFetch, lastUpdated, initialTasks, isLoading, isError, formattedDate]);

//toggle expanded task
const handleTaskClick = (taskId) => {
  setExpandedTask((prevExpandedTask) =>
      prevExpandedTask === taskId ? null : taskId
  );
};

//handling priority 
const groupedTasks = tasks.reduce((acc,task) => {
  if(!acc[task.priority]){
    acc[task.priority] = [];
  }
    acc[task.priority].push(task);
    return acc;
  }, {});

  //logout api call
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleMonthChange = (value) => {
    handleDateChange("month", value);

    // Adjust the number of days based on the selected month
    const daysInMonth = new Date(
      selectedDate.year,
      parseInt(value, 10),
      0
    ).getDate();
    const newDay = Math.min(parseInt(selectedDate.day, 10), daysInMonth);
    handleDateChange("day", newDay.toString().padStart(2, "0"));
  };

  const handleDateChange = (field, value) => {

    setSelectedDate((prev) => ({ ...prev, [field]: value }));
    const updatedDate = { ...selectedDate, [field]: value };
    const dateStr = `${updatedDate.year}-${updatedDate.month}-${updatedDate.day}`;
    listEventsofDay(dateStr);
  };


  // Generate an array of years around the selected year
  const generateYearRange = () => {
    const selectedYear = parseInt(selectedDate.year, 10);
    const startYear = selectedYear - 10;

    return Array.from({ length: 20 }, (_, index) => startYear + index);
  };
  // Generate an array of months (1 to 12)
  const monthOptions = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, "0")
  );

  const dayOptions = Array.from(
    { length: new Date(selectedDate.year, selectedDate.month, 0).getDate() },
    (_, index) => (index + 1).toString().padStart(2, "0")
  );
  //i got the leap year working, im awesome!
  const yearRange = generateYearRange();

  const handleMonthDecrement = () => {
    const currentMonth = parseInt(selectedDate.month, 10);
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    handleDateChange("month", newMonth.toString().padStart(2, "0"));
  };

  const handleMonthIncrement = () => {
    const currentMonth = parseInt(selectedDate.month, 10);
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    handleDateChange("month", newMonth.toString().padStart(2, "0"));
  };

  const handleDayDecrement = () => {
    const currentDay = parseInt(selectedDate.day, 10);
    const newDay = currentDay === 1 ? 31 : currentDay - 1;
    handleDateChange("day", newDay.toString().padStart(2, "0"));
  };

  const handleDayIncrement = () => {
    const currentDay = parseInt(selectedDate.day, 10);
    const newDay = currentDay === 31 ? 1 : currentDay + 1;
    handleDateChange("day", newDay.toString().padStart(2, "0"));
  };

  const handleYearDecrement = () => {
    const currentYear = parseInt(selectedDate.year, 10);
    const newYear = currentYear - 1;
    handleDateChange("year", newYear.toString());
  };

  const handleYearIncrement = () => {
    const currentYear = parseInt(selectedDate.year, 10);
    const newYear = currentYear + 1;
    handleDateChange("year", newYear.toString());
  };
  const handleAuthClick = async () => {
    try {
      setLoading(true);
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw resp;
        }

        sessionStorage.setItem(SESSION_STORAGE_KEY, resp.credential);
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
  const initialTimeSlot = [...Array(16)].map((_, index) => {
    const hour = 5 + index;
    if (hour < 5 || hour >= 21) {
      return { hour: "", events: [] };
    }
    return {
      hour:
        hour === 12 ? "12 PM" : hour <= 11 ? `${hour} AM` : `${hour - 12} PM`,
      events: [],
    };
  });
  useEffect(() => {
    setTimeSlots(initialTimeSlot);
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

  const updateEventTimeSlots = (_events, selected_date) => {
    console.log("Updating event time slots");
    //console.log(_events, selected_date);
    const updatedTimeSlots = [...Array(16)].map((_, index) => {
      const hour = 5 + index;
      if (hour < 5 || hour >= 21) {
        // Skip time slots outside the desired range
        return { hour: "", events: [] };
      }

      const startTime = convertToDate(selected_date);
      //console.log("StartTime", startTime);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = convertToDate(selected_date);
      endTime.setHours(hour + 1, 0, 0, 0);

      const eventsInTimeSlot = _events.filter((event) => {
        const eventStartTime = new Date(event.start.dateTime);
        //console.log({ eventStartTime, startTime, endTime });
        return eventStartTime >= startTime && eventStartTime < endTime;
      });
      return {
        hour:
          hour === 12 ? "12 PM" : hour <= 11 ? `${hour} AM` : `${hour - 12} PM`,
        events: eventsInTimeSlot,
      };
    });
    //console.log("Updated time slots", updatedTimeSlots);
    setTimeSlots(updatedTimeSlots);
  };

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

  const returnEventsofDay = async (selectedDate) => {
    try {
      const formattedDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;

      console.log(formattedDate);

      // Convert the formattedDate to a UTC date object
      const startOfDay = new Date(`${formattedDate}T00:00:00Z`);
      const endOfDay = new Date(`${formattedDate}T23:59:59Z`);
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

      // Return the events instead of updating the time slots
      return response.result.items;
    } catch (err) {
      console.error("Error fetching events:", err);
      return []; // Return an empty array or handle the error accordingly
    }
  };

  const getAvailableTimeSlots = (timeSlots, googleCalendarEvents) => {
    // Clone the time slots array to avoid modifying the original array
    const clonedTimeSlots = timeSlots.map((slot) => ({
      ...slot,
      events: [...slot.events],
    }));

    return clonedTimeSlots.filter((slot) => {
      // Check for conflicts with Google Calendar events
      const hasConflict = googleCalendarEvents.some(
        (event) => event.startTime <= slot.hour && slot.hour < event.endTime
      );

      return !hasConflict;
    });
  };

  const fillTasksIntoSchedule = (availableTimeSlots, groupedTasks) => {
    const filledTimeSlots = [...availableTimeSlots];

    // Function to find the index of the first available slot
    const findAvailableSlotIndex = () => {
      return filledTimeSlots.findIndex((slot) => slot.events.length === 0);
    };

    // Function to fill a task into the first available slot
    const fillTaskIntoSlot = (task) => {
      const availableSlotIndex = findAvailableSlotIndex();

      if (availableSlotIndex !== -1) {
        filledTimeSlots[availableSlotIndex].events.push({
          id: task.id,
          summary: " Focus Time • " + task.taskName,
          totalPomTimers: task.timer,
          isFromTask: true,
          // Add other task details as needed
        });
      }
    };

    // Prioritize tasks and fill into the schedule
    if (groupedTasks["Top Priority"]) {
      groupedTasks["Top Priority"].forEach((task) => fillTaskIntoSlot(task));
    }

    if (groupedTasks["Important"]) {
      groupedTasks["Important"].forEach((task) => fillTaskIntoSlot(task));
    }

    if (groupedTasks["Other"]) {
      groupedTasks["Other"].forEach((task) => fillTaskIntoSlot(task));
    }

    return filledTimeSlots;
  };

  const planDay = async () => {
    try {
      // Fetch Google Calendar events
      const googleCalendarEvents = await returnEventsofDay(selectedDate);

      // Get available time slots without conflicts
      const availableTimeSlots = getAvailableTimeSlots(
        timeSlots,
        googleCalendarEvents
      );

      // Fill tasks into the schedule based on priority
      const filledTimeSlots = fillTasksIntoSchedule(
        availableTimeSlots,
        groupedTasks
      );

      // Update the state with the filled schedule
      setTimeSlots(filledTimeSlots);
      setPlanDayClicked(true);
    } catch (error) {
      console.error("Error planning the day:", error);
    }
  };

  const handlePlanDayClick = async () => {
    setLoading(true);

    // Trigger the planDay function
    planDay().finally(() => {
      // Reset loading state
      setLoading(false);
    });
  };

  const isToday = (date) => {
    const currentDate = new Date();
    const year = parseInt(date.year, 10); // Convert year to number
    const month = parseInt(date.month, 10); // Convert month to number
    const day = parseInt(date.day, 10); // Convert day to number

    return (
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth() + 1 &&
      day === currentDate.getDate()
    );
  };

  return (
    <Box>
      <div id="topBar" className="topBar">
        <p
          id="name"
          style={{
            fontSize: "15px",
            right: "3%",
            position: "absolute",
            textAlign: "center",
            top: "28%",
          }}
        >
          {userInfo.first} {userInfo.last}
        </p>
        <a href="/profile">
          <img
            src={usrLogo}
            alt="eclipse"
            style={{
              right: "10%",
              position: "absolute",
              top: "22%",
              flexShrink: "0",
            }}
          />
        </a>
      </div>
      <div id="sideBr" className="blackSideBar">
        <div id="text" style={{ top: "3%", position: "relative" }}>
          Crush It
        </div>
        <div
          id="line"
          style={{
            left: "15%",
            background: "#3E3F42",
            height: "1px",
            width: "70%",
            top: "6%",
            position: "relative",
          }}
        >
          {" "}
        </div>
        <img
          style={{ top: "10%", position: "relative", flexShrink: 0 }}
          src={logo}
          alt="Someone Working!"
        />
        <div id="moreText" className="fontStyle3">
          {" "}
          It’s time to plan your day!
        </div>

        <Link to="/tasks">
          <Button
            type="button"
            variant="primary"
            className="planDayButton"
            style={{
              fontFamily: "DM Sans",
              fontSize: "16px",
              border: "1px solid #FFF",
              color: "#fff",
            }}
            onClick={handlePlanDayClick}
            disabled={!isToday(selectedDate) || planDayClicked}
          >
            Plan Day
          </Button>
        </Link>

        <Button
          onClick={logoutHandler}
          type="button"
          variant="primary"
          className="logoutButton"
          style={{
            fontFamily: "DM Sans",
            fontSize: "12px",
            border: "1px solid #FFF",
          }}
        >
          <img src={lo} alt="logout" />
          Log out
        </Button>
      </div>
      <Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            left: "14.8%",
            top: "18%",
          }}
        >
          <div
            id="taskHeading"
            style={{
              color: "#000",
              fontFamily: "DM Sans",
              fontSize: "4vh",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "normal",
            }}
          >
            Tasks
          </div>


      <Fab onClick={handleClickOpen} size="small" color="primary" aria-label="add" sx={{width:'30px', height:'30px', marginLeft:'10px'}}>
        <AddIcon fontSize="1.25rem" />
    </Fab>
    </div>
    <TaskAddingDialog open={dialogOpen} handleClose={handleClose} onAddTask={handleNewTaskAdded} selectedDate={selectedDate} />
    {currentTask && <TimerModal open={modalOpen} handleClose={handleModalClose} task={currentTask} />}
      <div id='taskBox' className='taskRectangle'>
               <Box
        display="flex"
        spacing={4}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center" //made a change here, was 'flex-start'
        sx={{bgcolor:'#FFF'}}
        >
      {/* added drag drop context here */}
            <div id='innerBox' className='taskInnerRectangle'>
            <div className="sectionHeader">Top Priority</div>

              {groupedTasks['Top Priority'] &&
                groupedTasks['Top Priority'].map((task) => (
                  <div key={task._id} className="taskCard">
                    <div className="taskHeader">
                      {/* added drag icon and fixed issue where it was placed relatively to the task title instead of fixed */}
                      <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                      <div className="taskTitle" onClick={() => handleTitleClick(task)}>
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px', display: 'flex', alignItems: 'center'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '1.25rem', top: '15.75%', marginRight: '15px'}}/>
                        <div style={{marginTop: '-3px'}} onClick={() => handleTaskClick(task._id)}>
                        {expandedTask === task._id ? 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem'}}/> 
                        : 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem',transform:"rotate(270deg)"}}/>}
                        </div>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task._id && (
                      <div className="taskDetails">
                        <div id='break' className='taskBreak'/>
                        <p>Number of Pomodoro Timers (25 mins each):&emsp;&emsp;&emsp; &emsp; &emsp; &emsp; &emsp;<span style={{color:'#FE754D', fontWeight: 'bold'}}>{task.timer}</span></p>
                        <p><span style={{color:'#545454'}}>Notes:</span><br/><span style={{fontWeight:"bold"}}>{task.notes}</span></p>

                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div id='innerBoxOne' className='taskInnerRectangle'>
                <div className="sectionHeader">Important</div>
                {groupedTasks['Important'] &&
                groupedTasks['Important'].map((task) => (
                  <div key={task._id} className="taskCard">
                    <div className="taskHeader">
                    <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                    <div className="taskTitle" onClick={() => handleTitleClick(task)}>
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px', display: 'flex', alignItems: 'center'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '1.25rem', top: '15.75%', marginRight: '15px'}}/>
                        <div style={{marginTop: '-3px'}} onClick={() => handleTaskClick(task._id)}>
                        {expandedTask === task._id ? 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem'}}/> 
                        : 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem',transform:"rotate(270deg)"}}/>}
                        </div>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task._id && (
                      <div className="taskDetails">
                        <div id='break' className='taskBreak'/>
                        <p>Number of Pomodoro Timers (25 mins each):&emsp;&emsp;&emsp; &emsp; &emsp; &emsp; &emsp;<span style={{color:'#FE754D', fontWeight: 'bold'}}>{task.timer}</span></p>
                        <p><span style={{color:'#545454'}}>Notes:</span><br/><span style={{fontWeight:"bold"}}>{task.notes}</span></p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div id='innerBoxTwo' className='taskInnerRectangle'>
            <div className="sectionHeader">Other</div>
                {groupedTasks['Other'] &&
                groupedTasks['Other'].map((task) => (
                  <div key={task._id} className="taskCard">
                    <div className="taskHeader">
                    <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                    <div className="taskTitle" onClick={() => handleTitleClick(task)}>
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px', display: 'flex', alignItems: 'center'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '1.25rem', top: '15.75%', marginRight: '15px'}}/>
                        <div style={{marginTop: '-3px'}} onClick={() => handleTaskClick(task._id)}>
                        {expandedTask === task._id ? 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem'}}/> 
                        : 
                        <ExpandCircleDownOutlinedIcon style={{ color: '#292D32', fontSize: '1.25rem',transform:"rotate(270deg)"}}/>}
                        </div>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task._id && (
                      <div className="taskDetails">
                        <div id='break' className='taskBreak'/>
                        <p>Number of Pomodoro Timers (25 mins each):&emsp;&emsp;&emsp; &emsp; &emsp; &emsp; &emsp;<span style={{color:'#FE754D', fontWeight: 'bold'}}>{task.timer}</span></p>
                        <p><span style={{color:'#545454'}}>Notes:</span><br/><span style={{fontWeight:"bold"}}>{task.notes}</span></p>

                      </div>
                    )}
                  </div>
                ))}
            </div>

        </Box>
      </div>

      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          left: "14.8%",
          top: "5%",
        }}
      >
        <div
          id="dateSelector"
          data-testid="custom-date-selector"
          style={{
            color: "#000",
            fontFamily: "DM Sans",
            fontSize: "2vh",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
          }}
        >
          {/* Left Arrow Button for Month */}
          <Button
            onClick={handleMonthDecrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "10px",
            }}
          >
            {"<"}
          </Button>
          {/* Month Select */}
          <Select
            value={selectedDate.month}

            onChange={(e) => handleMonthChange(e.target.value)}
            style={{
              marginLeft: "5px",
              fontFamily: "DM Sans",
              fontSize: "12px",
            }}

          >
            {monthOptions.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Month */}
          <Button
            onClick={handleMonthIncrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "5px",
            }}
          >
            {">"}
          </Button>
          {/* Left Arrow Button for Day */}
          <Button
            onClick={handleDayDecrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "10px",
            }}
          >
            {"<"}
          </Button>
          {/* Day Select */}
          <Select
            value={selectedDate.day}
            onChange={(e) => handleDateChange("day", e.target.value)}
            style={{
              marginLeft: "5px",
              fontFamily: "DM Sans",
              fontSize: "12px",
            }}
          >
            {dayOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Day */}
          <Button
            onClick={handleDayIncrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "5px",
            }}
          >
            {">"}
          </Button>
          {/* Left Arrow Button for Year */}
          <Button
            onClick={handleYearDecrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "10px",
            }}
          >
            {"<"}
          </Button>
          {/* Year Select */}
          <Select
            value={selectedDate.year}
            onChange={(e) => handleDateChange("year", e.target.value)}
            style={{
              marginLeft: "5px",
              fontFamily: "DM Sans",
              fontSize: "12px",
            }}
          >
            {/* Generate the list of years dynamically around the selected year */}
            {yearRange.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Year */}
          <Button
            onClick={handleYearIncrement}
            style={{
              fontFamily: "DM Sans",
              fontSize: "12px",
              marginLeft: "5px",
            }}
          >
            {">"}
          </Button>
          {/* ... (existing code) */}
        </div>
      </div>

      <div>
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
              data-testid="connectCalendar"
              size="small"
              color="primary"
              aria-label="add"
              sx={{ width: "30px", height: "30px", marginLeft: "10px" }}
            >
              <AddIcon fontSize="1.25rem" />
            </Fab>
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
                    <div
                      key={index}
                      data-testid="time-slot"
                      style={{ height: "40px", display: "flex" }}
                    >
                      <div style={{ width: "50px", height: "50px" }}>
                        {timeSlot.hour}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "25px",
                          marginTop: "10px",
                          flex: "1",
                        }}
                      >
                        {timeSlot.events.map((event) => (
                          <div
                            key={event.id}
                            style={{
                              border: `1px solid ${
                                !event.isFromTask ? "#D3D3D3" : "#007BFF"
                              }`,
                              borderRadius: "5px",
                              padding: "5px",
                              marginBottom: "5px",
                              backgroundColor: "#fff",
                              width: "100%", // Ensure full width
                            }}
                          >
                            {event.summary}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </DragDropContext>
              </div>
            </Box>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default TasksAppts;
