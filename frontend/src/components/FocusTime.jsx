import {useState, useEffect, useRef} from 'react';
// adding functionality to pull timer values from user profile
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Button } from '@mui/material';

const TimerModal = ({ open, handleClose, task }) => {
  const [timerValue, setTimerValue] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const timerValueRef = useRef(timerValue);
  // pulling timer values from user profile
  const userProfile = useSelector(state => state.userProfile) || {pomodoroTime: 25, shortBreakTime: 5, longBreakTime: 15};

  useEffect(() => {
    timerValueRef.current = timerValue;
  }, [timerValue]); 

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


  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
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
  <div id="focus-time" className="focusContainer">
    <Dialog open={open} onClose={handleClose}>
    <DialogContent>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Pomodoro" />
        <Tab label="Short Break" />
        <Tab label="Long Break" />
      </Tabs>
      {tabValue ===0 && (
        <div>
        <div id="timer-backdrop" className="timerBackdrop">
        <p className="timerAppearance">{formatTime(timerValue)}</p>
        <button className="timerButton" onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
        <p>{task.taskName}</p>
        <p>Notes:<br/>{task.notes}</p>
        <p>Pomos: {task.timer}</p>
        </div>
      )}
      {tabValue ===1 && (
        <div>
        <p>{formatTime(timerValue)}</p>
        <Button onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</Button>
        </div>
      )}
      {tabValue ===2 && (
        <div>
        <p>{formatTime(timerValue)}</p>
        <Button onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</Button>
        </div>
      )}
    </DialogContent>
  </Dialog>
  </div>
  )};

  export default TimerModal;