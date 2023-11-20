import {useState, useEffect, useRef} from 'react';
import { Dialog, DialogTitle, DialogContent, Tab, Tabs, Button } from '@mui/material';

const TimerModal = ({ open, handleClose, task }) => {
  const initialTimerValue = task ? task.timer * 60 : 25 * 60;
  const [timerValue, setTimerValue] = useState(initialTimerValue);
  const [isRunning, setIsRunning] = useState(false);
  const timerValueRef = useRef(timerValue);

  useEffect(() => {
    timerValueRef.current = timerValue;
  }, [timerValue]); 


useEffect(() => {
    let timer;
    if(isRunning) {
      timer = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    } else if(!isRunning && timerValue !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
    }, [isRunning, timerValue]);    


  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  };

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

};

  return(
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{task.taskName}</DialogTitle>
    <DialogContent>
      <p>{formatTime(timerValue)}</p>
      <Button onClick={handleStartStopClick}>{isRunning ? 'Stop' : 'Start'}</Button>
    </DialogContent>
  </Dialog>
  )};

  export default TimerModal;