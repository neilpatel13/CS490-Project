import React, { useState, useEffect, useCallback } from 'react';import logo from '../assets/mainLogo.svg';
import lo from '../assets/logout.svg';
///import usr from '../assets/profile.svg';
///import lock from '../assets/lock.svg';
///import cl from '../assets/clock.svg';
import { Link } from 'react-router-dom';
import {Box, Button, Fab, Select, MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
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
import { useGetTasksQuery } from '../slices/taskApiSlice';
import { isToday, addDays, isSameDay } from 'date-fns';
import moment from 'moment-timezone';




const TasksAppts = () => {
  const dateInEST = moment().tz('America/New_York');
  const currentDate = moment().tz('America/New_York');
  const [selectedDate, setSelectedDate] = useState({
    year: currentDate.format('YYYY'),
    month: currentDate.format('MM'),
    day: currentDate.format('DD'),
  });
  const [loadCurrentDayTasks, setLoadCurrentDayTasks] = useState(false);
  const [hasClickedPlanDay, setHasClickedPlanDay] = useState(false);

  const [displayCurrentDayTasks, setDisplayCurrentDayTasks] = useState(false);

  const formattedDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
  const [tasks, setTasks] = useState([]);

  // Define selectedDateObj and today here
  const selectedDateObj = new Date(formattedDate);
  selectedDateObj.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

    const [triggerFetch, setTriggerFetch] = useState(false);
    const [dialogOpen, setDialogOpen ] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);

    // adding some logic for focus time here
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    //loading tasks if they exist 

    const [shouldFetchTasks, setShouldFetchTasks] = useState(false);


    const { data: fetchedTasks, error, refetch } = useGetTasksQuery(formattedDate);

    useEffect(() => {
      // ... (the rest of your useEffect logic) ...
    
      const fetchTasksDirectly = async (date) => {
        try {
          const response = await fetch(`http://localhost:8000/api/tasks?date=${date}`, {
            // Include necessary headers for authentication if needed
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTasks(data);
          console.log("Tasks fetched:", data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
    
      // ... (the rest of your useEffect logic) ...
    }, [selectedDate, hasClickedPlanDay]);
    
    
    
    
    
    
    
    


    const handlePlanDayClick = () => {
      console.log("Plan Day clicked");
      const today = moment().tz('America/New_York');
      setSelectedDate({
        year: today.format('YYYY'),
        month: today.format('MM'),
        day: today.format('DD')
      });
      setHasClickedPlanDay(true);
      setTriggerFetch(Date.now());
    };
    

    const handleDateChange = (field, value) => {
      console.log("Date change handler triggered");
      setSelectedDate(prev => ({
        ...prev, 
        [field]: value 
      }));
    
      const newSelectedDate = moment({ ...selectedDate, [field]: value }).tz('America/New_York');
      const isToday = newSelectedDate.isSame(moment().tz('America/New_York'), 'day');
      console.log("New date is today:", isToday);
      setHasClickedPlanDay(isToday);
    };
    
    
    
// Function to fetch tasks based on the selected date
const fetchTasks = useCallback(async () => {
  const { data: fetchedTasks } = await useGetTasksQuery(formattedDate);
  if (fetchedTasks) {
    setTasks(fetchedTasks); // Update the tasks state
  } else {
    setTasks([]); // Clear tasks if no tasks were fetched
  }
}, [selectedDate]);


  const [lastUpdated, setLastUpdated] = useState(Date.now());
    

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

    

    const onAddTask = (newTask) => {
      refetch();
    };

    const handleNewTaskAdded = () => {
      refetch();
    };

    

//toggle expanded task
const handleTaskClick = (taskId) => {
  setExpandedTask((prevExpandedTask) =>
      prevExpandedTask === taskId ? null : taskId
  );
};

//handling priority 
const groupedTasks = tasks ? tasks.reduce((acc,task) => {
  if(!acc[task.priority]){
    acc[task.priority] = [];
  }
    acc[task.priority].push(task);
    return acc;
}, {}) : {};

//logout api call
const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMonthChange = (value) => {
    handleDateChange('month', value);

    // Adjust the number of days based on the selected month
    const daysInMonth = new Date(selectedDate.year, parseInt(value, 10), 0).getDate();
    const newDay = Math.min(parseInt(selectedDate.day, 10), daysInMonth);
    handleDateChange('day', newDay.toString().padStart(2, '0'));
  };
  

  // Generate an array of years around the selected year
  const generateYearRange = () => {
  const selectedYear = parseInt(selectedDate.year, 10);
  const startYear = selectedYear - 10;

  return Array.from({ length: 20 }, (_, index) => startYear + index);
  };

  // Generate an array of months (1 to 12)
  const monthOptions = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));

  const dayOptions = Array.from({ length: new Date(selectedDate.year, selectedDate.month, 0).getDate() }, (_, index) => (index + 1).toString().padStart(2, '0'));
  //i got the leap year working, im awesome! 
  const yearRange = generateYearRange();

  const handleMonthDecrement = () => {
    const currentMonth = parseInt(selectedDate.month, 10);
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    handleDateChange('month', newMonth.toString().padStart(2, '0'));
  };

  const handleMonthIncrement = () => {
    const currentMonth = parseInt(selectedDate.month, 10);
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    handleDateChange('month', newMonth.toString().padStart(2, '0'));
  };

  const handleDayDecrement = () => {
    const currentDay = parseInt(selectedDate.day, 10);
    const newDay = currentDay === 1 ? 31 : currentDay - 1;
    handleDateChange('day', newDay.toString().padStart(2, '0'));
  };

  const handleDayIncrement = () => {
    const currentDay = parseInt(selectedDate.day, 10);
    const newDay = currentDay === 31 ? 1 : currentDay + 1;
    handleDateChange('day', newDay.toString().padStart(2, '0'));
  };

  const handleYearDecrement = () => {
    const currentYear = parseInt(selectedDate.year, 10);
    const newYear = currentYear - 1;
    handleDateChange('year', newYear.toString());
  };

  const handleYearIncrement = () => {
    const currentYear = parseInt(selectedDate.year, 10);
    const newYear = currentYear + 1;
    handleDateChange('year', newYear.toString());
  };  

    return(
        <Box>
          <div id='topBar' className='topBar'>
          <p id='name' style={{fontSize:'15px', right:'3%', position: 'absolute', textAlign:'center', top:'28%'}}>{userInfo && userInfo.first} {userInfo && userInfo.last}</p>
          <a href='/profile'>
            <img src={usrLogo} alt='eclipse' style={{right:'10%', position:'absolute',  top: '22%', flexShrink: '0'}}/>
          </a>
          </div>
          <div id='sideBr' className='blackSideBar'>
            <div id='text' style={{top:'3%', position: 'relative'}}>Crush It</div>
            <div id='line' style={{left:'15%',background: '#3E3F42', height:'1px', width:'70%',top:'6%', position: 'relative'}}> </div>
            <img style={{top:'10%', position:'relative', flexShrink: 0}} src={logo} alt='Someone Working!'/>
            <div id='moreText' className='fontStyle3'> It’s time to plan your day!</div>
            
            <Link to="/tasks">
              <Button onClick={handlePlanDayClick} type='button' variant='primary' className='planDayButton' style={{fontFamily:'DM Sans', fontSize:'16px', border: '1px solid #FFF', color: '#fff'}}>
                Plan Day
              </Button>
            </Link>


            <Button onClick={logoutHandler} type='button' variant='primary' className='logoutButton' style={{fontFamily:'DM Sans', fontSize:'12px', border: '1px solid #FFF'}}>
              <img src={lo} alt='logout'/>Log out
            </Button>
        </div>
  <Box> 
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', position:'absolute', left:'14.8%', top: '18%' }}>
    <div id='taskHeading' style={{color: "#000",fontFamily: "DM Sans", fontSize: "4vh", fontStyle: "normal", fontWeight: "700", lineHeight: "normal"}}>
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

            {(selectedDateObj < today || (selectedDateObj.getTime() === today.getTime() && hasClickedPlanDay)) && (
              groupedTasks['Top Priority'] && groupedTasks['Top Priority'].map((task) => (
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
                ))
                )}
            </div>
            <div id='innerBoxOne' className='taskInnerRectangle'>
                <div className="sectionHeader">Important</div>
                {(selectedDateObj < today || (selectedDateObj.getTime() === today.getTime() && hasClickedPlanDay)) ? (
                  groupedTasks['Important'] && groupedTasks['Important'].map((task) => (
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
                ))
                ) : null }
            </div>
            <div id='innerBoxTwo' className='taskInnerRectangle'>
            <div className="sectionHeader">Other</div>
            {(selectedDateObj < today || (selectedDateObj.getTime() === today.getTime() && hasClickedPlanDay)) ? (
              groupedTasks['Other'] && groupedTasks['Other'].map((task) => (
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
                ))
                ) : null}
            </div>
        </Box>
      </div>
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', position: 'absolute', left: '14.8%', top: '5%' }}>
      <div id='dateSelector' data-testid="custom-date-selector" style={{ color: "#000", fontFamily: "DM Sans", fontSize: "2vh", fontStyle: "normal", fontWeight: "500", lineHeight: "normal" }}>
          {/* Left Arrow Button for Month */}
          <Button onClick={handleMonthDecrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '10px' }}>
            {'<'}
          </Button>
          {/* Month Select */}
          <Select
            value={selectedDate.month}
            onChange={(e) => handleDateChange('month', e.target.value)}
            style={{ marginLeft: '5px', fontFamily: 'DM Sans', fontSize: '12px' }}
          >
            {monthOptions.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Month */}
          <Button onClick={handleMonthIncrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '5px' }}>
            {'>'}
          </Button>
          {/* Left Arrow Button for Day */}
          <Button onClick={handleDayDecrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '10px' }}>
            {'<'}
          </Button>
          {/* Day Select */}
          <Select
            value={selectedDate.day}
            onChange={(e) => handleDateChange('day', e.target.value)}
            style={{ marginLeft: '5px', fontFamily: 'DM Sans', fontSize: '12px' }}
          >
            {dayOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Day */}
          <Button onClick={handleDayIncrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '5px' }}>
            {'>'}
          </Button>
          {/* Left Arrow Button for Year */}
          <Button onClick={handleYearDecrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '10px' }}>
            {'<'}
          </Button>
          {/* Year Select */}
          <Select
            value={selectedDate.year}
            onChange={(e) => handleDateChange('year', e.target.value)}
            style={{ marginLeft: '5px', fontFamily: 'DM Sans', fontSize: '12px' }}
          >
            {/* Generate the list of years dynamically around the selected year */}
            {yearRange.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          {/* Right Arrow Button for Year */}
          <Button onClick={handleYearIncrement} style={{ fontFamily: 'DM Sans', fontSize: '12px', marginLeft: '5px' }}>
            {'>'}
          </Button>
          {/* ... (existing code) */}
        </div>
      </div>
      </Box>
    )
}

export default TasksAppts