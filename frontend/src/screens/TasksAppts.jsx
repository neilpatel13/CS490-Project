import logo from '../assets/mainLogo.svg';
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
import {React ,useState} from 'react';
import {useSelector } from 'react-redux';
import TaskAddingDialog from '../components/TaskDialog';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usrLogo from '../assets/user.svg'
import OpenWithIcon from '@mui/icons-material/OpenWith';



const TasksAppts = () => {
    const [tasks, setTasks] = useState([]);
    const [dialogOpen, setDialogOpen ] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);
    const [selectedDate, setSelectedDate] = useState({
      month: '',
      day: '',
      year: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const handleDateChange = (field, value) => {
      setSelectedDate((prev) => ({ ...prev, [field]: value }));
    };

    // Generate an array of years (adjust the range as needed)
    const years = Array.from({ length: 20 }, (_, index) => new Date().getFullYear() + index);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () =>{
        setDialogOpen(false);
    };

    const onAddTask = (newTask) => {
      console.log('Before adding task', tasks);
        setTasks((prevTasks) => [...prevTasks,newTask]);
      console.log('after adding tasks', tasks);
    }

//toggle expanded task
const handleTaskClick = (taskId) => {
    setExpandedTask((prevExpandedTask) =>
    (prevExpandedTask === taskId ? null : taskId
    ));
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
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };


    return(
        <Box>
          <div id='topBar' className='topBar'>
          <p id='name' style={{fontSize:'15px', right:'3%', position: 'absolute', textAlign:'center', top:'28%'}}>{userInfo.first} {userInfo.last}</p>
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
              <Button type='button' variant='primary' className='planDayButton' style={{fontFamily:'DM Sans', fontSize:'16px', border: '1px solid #FFF', color: '#fff'}}>
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
    <TaskAddingDialog open={dialogOpen} handleClose={handleClose} onAddTask={onAddTask} />
      <div id='taskBox' className='taskRectangle'>
        <Box
        display="flex"
        spacing={4}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center" //made a change here, was 'flex-start'
        sx={{bgcolor:'#FFF'}}
        >
            <div id='innerBox' className='taskInnerRectangle'>
            <div className="sectionHeader">Top Priority</div>
              {groupedTasks['Top Priority'] &&
                groupedTasks['Top Priority'].map((task) => (
                  <div key={task.id} className="taskCard">
                    <div className="taskHeader" onClick={() => handleTaskClick(task.id)}>
                      {/* added drag icon and fixed issue where it was placed relatively to the task title instead of fixed */}
                      <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                      <div className="taskTitle" >
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '0.80rem', top: '15.75%'}}/>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task.id && (
                      <div className="taskDetails">
                        <p>Number of Pomodoro Timers 25 mins each: {task.timer}</p>
                        <p>Notes: {task.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div id='innerBoxOne' className='taskInnerRectangle'>
                <div className="sectionHeader">Important</div>
                {groupedTasks['Important'] &&
                groupedTasks['Important'].map((task) => (
                  <div key={task.id} className="taskCard">
                    <div className="taskHeader" onClick={() => handleTaskClick(task.id)}>
                    <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                      <div className="taskTitle" >
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '0.80rem', top: '15.75%'}}/>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task.id && (
                      <div className="taskDetails">
                        <p>Number of Pomodoro Timers: {task.timer}</p>
                        <p>Notes: {task.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div id='innerBoxTwo' className='taskInnerRectangle'>
            <div className="sectionHeader">Other</div>
                {groupedTasks['Other'] &&
                groupedTasks['Other'].map((task) => (
                  <div key={task.id} className="taskCard">
                    <div className="taskHeader" onClick={() => handleTaskClick(task.id)}>
                    <div style={{ position: 'relative', display:'flex', alignItems:'center' }}>
                      <div className="taskTitle" >
                        {task.taskName}
                        </div>
                        <div style={{ position: 'absolute', left: '400px'}}>
                        <OpenWithIcon style={{ color: '#292D32', fontSize: '0.80rem', top: '15.75%'}}/>
                        </div>
                      </div>
                    </div>
                    {expandedTask === task.id && (
                      <div className="taskDetails">
                        <p>Number of Pomodoro Timers: {task.timer}</p>
                        <p>Notes: {task.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
        </Box>
      </div>
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', position: 'absolute', left: '14.8%', top: '5%' }}>
          <div id='dateSelector' style={{ color: "#000", fontFamily: "DM Sans", fontSize: "2vh", fontStyle: "normal", fontWeight: "500", lineHeight: "normal" }}>
            Date Selector:
            {/* Month Select */}
            <Select
              value={selectedDate.month}
              onChange={(e) => handleDateChange('month', e.target.value)}
              style={{ marginLeft: '10px', fontFamily: 'DM Sans', fontSize: '12px' }}
            >
              <MenuItem value={'January'}>January</MenuItem>
              <MenuItem value={'February'}>February</MenuItem>
              <MenuItem value={'March'}>March</MenuItem>
              <MenuItem value={'April'}>April</MenuItem>
              <MenuItem value={'May'}>May</MenuItem>
              <MenuItem value={'June'}>June</MenuItem>
              <MenuItem value={'July'}>July</MenuItem>
              <MenuItem value={'August'}>August</MenuItem>
              <MenuItem value={'September'}>September</MenuItem>
              <MenuItem value={'October'}>October</MenuItem>
              <MenuItem value={'November'}>November</MenuItem>
              <MenuItem value={'December'}>December</MenuItem>
              {/* Add more months as needed */}
            </Select>
            {/* Day Select */}
            <Select
              value={selectedDate.day}
              onChange={(e) => handleDateChange('day', e.target.value)}
              style={{ marginLeft: '10px', fontFamily: 'DM Sans', fontSize: '12px' }}
            >
              {[...Array(31)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            {/* Year Select */}
            <Select
              value={selectedDate.year}
              onChange={(e) => handleDateChange('year', e.target.value)}
              style={{ marginLeft: '10px', fontFamily: 'DM Sans', fontSize: '12px' }}
            >
              {/* Generate the list of years dynamically */}
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Box>
    )
}
export default TasksAppts