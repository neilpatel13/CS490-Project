import {useState, useEffect, useRef} from 'react';
// adding functionality to pull timer values from user profile
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Button } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const TimerModal = ({ open, handleClose, task }) => {
  const [timerValue, setTimerValue] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const timerValueRef = useRef(timerValue);
  // pulling timer values from user profile
  const userProfile = useSelector(state => state.userProfile) || {pomodoroTime: 25, shortBreakTime: 5, longBreakTime: 15};
// calculating timer finish times
  const[elapsedTime, setElapsedTime] = useState(0);
  const[startTime, setStartTime] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
//displaying pomo amounts
  const [currentTimer, setCurrentTimer] = useState(1);
  const [totalTimers, setTotalTimers] = useState(task.timer);

// i dont remember what this does but its important
  useEffect(() => {
    timerValueRef.current = timerValue;
  }, [timerValue]); 

// these hooks are for keeping track of what pomo we are on, and reseting it on different tasks
  useEffect(() => {
    if (timerValue ===0){
      setCurrentTimer(currentTimer => currentTimer + 1);
    }
  }, [timerValue]);

  useEffect(() => {
    setCurrentTimer(1);
    setTotalTimers(task.timer);
  }, [task]);

  // changing the default timer values to be populated by user preferences
  useEffect(() => {
  switch (tabValue) {
      case 0:
        setTimerValue(userProfile.pomodoroTime*60);
        break;
      case 1:
        setTimerValue(userProfile.shortBreakTime*60);
        break;
      case 2:
        setTimerValue(userProfile.longBreakTime*60);
        break;
      default:
        setTimerValue(userProfile.pomodoroTime*60);
        break;
    }
    setTimerCount(1);
  },[task, tabValue, userProfile.pomodoroTime, userProfile.shortBreakTime, userProfile.longBreakTime]);

  useEffect(() => {
    let timer;
    if(isRunning && timerCount >0) {
      timer = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    } else if(!isRunning && timerValue !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
    }, [isRunning, timerValue, timerCount]);    

  useEffect(() => {
    if(timerValue === 0 && timerCount > 0) {
      setTimerCount((prevCount) => prevCount - 1);
      switch (tabValue) {
        case 0:
          setTimerValue(userProfile.pomodoroTime*60);
          break;
        case 1:
          setTimerValue(userProfile.shortBreakTime*60);
          break;
        case 2:
          setTimerValue(userProfile.longBreakTime*60);
          break;
        default:
          setTimerValue(userProfile.pomodoroTime*60);
          break;
    }
    }
  }, [timerValue, timerCount, tabValue, userProfile.pomodoroTime, userProfile.shortBreakTime, userProfile.longBreakTime]);

//useEffect to get the initial finish time value on modal open
  useEffect(() => {
    const now =Date.now();
    setFinishTime(formatEndTime(now + timerValue * 1000));
  }, [timerValue, userProfile.pomodoroTime, userProfile.shortBreakTime, userProfile.longBreakTime]);

//this now also keeps track of elapsed time and helps us display the end time
  const handleStartStopClick = () => {
    const now = Date.now();
    if (isRunning) {
      setElapsedTime(elapsedTime => elapsedTime + now - startTime);
      setIsRunning(false);
    } else {
      setStartTime(now);
      setFinishTime(formatEndTime(now + (timerValue * 1000 - elapsedTime)));
      setIsRunning(true);
    }
  };

//these functions format how our time values are displayed

const formatEndTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

 const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

 };

 const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
 };


  return(
    <Dialog open={open}>
      <button className="closeButton" onClick={handleClose}>
        <HighlightOffOutlinedIcon />
      </button>
    <DialogContent>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Pomodoro"/>
        <Tab label="Short Break" />
        <Tab label="Long Break" />
      </Tabs>
      {tabValue ===0 && (
        <div>
        <div id="timer-backdrop" className="timerBackdrop">
        <p className="timerAppearance">{formatTime(timerValue)}</p>
        <button className="timerButton" onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
        <p className="focusTitle">{task.taskName}</p>
        <div className="notesBackdrop"> 
        <p className="notesFontStyle"><span style={{color:'#6284FF', fontWeight:'bold'}}>Notes:</span><br/><span style={{color:'#1F1F1F', fontSize:'14px'}}>{task.notes}</span></p>
        </div>
        <div className="pomoBackdrop">
        <p className="pomoFontStyle">Pomos: <span style={{color:'#407BFF'}}>{currentTimer}/{totalTimers}</span></p>
        <p className= "pomoFontStyle">Finish At: <span style={{color:'#407BFF'}}>{finishTime}</span></p>
        </div>
        </div>
      )}
      {tabValue ===1 && (
        <div>
        <div id="timer-backdrop" className="timerBackdrop">
        <p className="timerAppearance">{formatTime(timerValue)}</p>
        <button className="timerButton" onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
        <p className="focusTitle">{task.taskName}</p>
        <div className="notesBackdrop"> 
        <p className="notesFontStyle"><span style={{color:'#6284FF', fontWeight:'bold'}}>Notes:</span><br/><span style={{color:'#1F1F1F', fontSize:'14px'}}>{task.notes}</span></p>
        </div>
        <div className="pomoBackdrop">
        <p className="pomoFontStyle">Pomos: <span style={{color:'#407BFF'}}>{currentTimer}/{totalTimers}</span></p>
        <p className= "pomoFontStyle">Finish At: <span style={{color:'#407BFF'}}>{finishTime}</span></p>
        </div>
        </div>
      )}
      {tabValue ===2 && (
        <div>
        <div id="timer-backdrop" className="timerBackdrop">
        <p className="timerAppearance">{formatTime(timerValue)}</p>
        <button className="timerButton" onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
        <p className="focusTitle">{task.taskName}</p>
        <div className="notesBackdrop"> 
        <p className="notesFontStyle"><span style={{color:'#6284FF', fontWeight:'bold'}}>Notes:</span><br/><span style={{color:'#1F1F1F', fontSize:'14px'}}>{task.notes}</span></p>
        </div>
        <div className="pomoBackdrop">
        <p className="pomoFontStyle">Pomos: <span style={{color:'#407BFF'}}>{currentTimer}/{totalTimers}</span></p>
        <p className= "pomoFontStyle">Finish At: <span style={{color:'#407BFF'}}>{finishTime}</span></p>
        </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
  )};

  export default TimerModal;