import logo from '../assets/mainLogo.svg';
import lo from '../assets/logout.svg';
///import usr from '../assets/profile.svg';
///import lock from '../assets/lock.svg';
///import cl from '../assets/clock.svg';
import { Link } from 'react-router-dom';
import {Button, Box,
     Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import * as React from 'react';
import {useState} from 'react';
import TaskAddingDialog from '../components/TaskDialog';
const TasksAppts = () => {
    const [tasks, setTasks] = useState([]);
    const[dialogOpen, setDialogOpen ] = useState(false);
    const[expandedTask, setExpandedTask] = useState(null);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () =>{
        setDialogOpen(false);
    };

    const onAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks,newTask]);
    }

//toggle expanded task
const handleTaskClick = (taskId) => {
    setExpandedTask((prevExpandedTask) =>
    (prevExpandedTask === taskId ? null : taskId
    ));
};

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
        <div id='sideBr' className='blackSideBar'>
        <div id='text' style={{top:'3%', position: 'relative'}}>Crush It</div>
        <div id='line' style={{left:'15%',background: '#3E3F42', height:'1px', width:'70%',top:'6%', position: 'relative'}}> </div>
        <img style={{top:'10%', position:'relative', flexShrink: 0}} src={logo} alt='Someone Working!'/>
        <div id='moreText' className='fontStyle3'> It’s time to plan your day!</div>
        
        <Link to="/">
          <Button type='button' variant='primary' className='planDayButton' style={{fontFamily:'DM Sans', fontSize:'16px'}}>
            Plan Day
          </Button>
        </Link>


        <Button onClick={logoutHandler} type='button' variant='primary' className='logoutButton' style={{fontFamily:'DM Sans', fontSize:'12px'}}>
          <img src={lo} alt='logout'/>Log out
        </Button>
      </div>
    <Box>
    <div id='password' style={{color: "#000",fontFamily: "DM Sans", fontSize: "4vh", fontStyle: "normal", fontWeight: "700", lineHeight: "normal", position:'absolute', left:'14.8%', top:'20%'}}>
      Tasks
      <Fab onClick={handleClickOpen} size="small" color="primary" aria-label="add" sx={{width:'39px', height:'39px',  flexShrink:0}}>
        <AddIcon />
    </Fab>
    <TaskAddingDialog open={dialogOpen} handleClose={handleClose} onAddTask={onAddTask}/>
      </div>
      <div id='taskBox' className='taskRectangle'>
        <Box
        display="flex"
        spacing={4}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{bgcolor:'#FFF'}}
        >
            <div id='innerBox' className='taskInnerRectangle'>
                Top priority
            </div>
            <div id='innerBoxOne' className='taskInnerRectangle'>
                Important
                <ul>
                {tasks.map((task) => (
                        <li key={task.id} onClick={() => handleTaskClick(task.id)}>
                            {task.taskName}
                            {expandedTask === task.id &&(
                                <div>
                                    <p>Number of Pomodoro Timers: {task.timer}</p>
                                    <p>Notes: {task.notes}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div id='innerBoxTwo' className='taskInnerRectangle'>
                Other
            </div>
        </Box>
      </div>
      </Box>
      </Box>
    )
}
export default TasksAppts