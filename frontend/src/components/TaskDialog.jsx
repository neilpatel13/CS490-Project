import React, { useState } from 'react';
import {Button, Box,
    TextField,
    Dialog,DialogActions,
    DialogContent,DialogContentText,
    DialogTitle} from '@mui/material';

    const TaskAddingDialog = ({open, handleClose,onAddTask }) =>{
        const [taskName, setTaskName] = useState('');
        const [timer, setTimer] = useState('');
        const [notes, setNotes] = useState('');

        const handleInputChange = (event, field) => {
            const value = event.target.value;
            switch(field){
                case 'taskName':
                    setTaskName(value);
                    break;
                case 'timer':
                    setTimer(value);
                    break;
                case 'notes':
                    setNotes(value);
                    break;
                default:
                break;
            }
        };
        const handleSubmit = () => {
            if(taskName.trim()=== '' || timer.trim() ===''){
                return;
            }
            const newTask ={
                id: Date.now(),
                taskName,
                timer,
                notes,
            };
            onAddTask(newTask);
        
            setTaskName('');
            setTimer('');
            setNotes('');
        
            handleClose();
        };
        return(
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter your task
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    label="Task"
                    fullWidth
                    variant="standard"
                    value={taskName}
                    onChange={(event) => handleInputChange(event,'taskName')}
                    />
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Add Pomodoro Timers
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="timer"
                    label="Number of timers"
                    fullWidth
                    variant="standard"
                    value={timer}
                    onChange={(event) => handleInputChange(event,'timer')}
                    />
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Add Notes
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="notes"
                    label="Notes"
                    fullWidth
                    variant="standard"
                    value={notes}
                    onChange={(event) => handleInputChange(event,'notes')}
                    />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
    </Dialog>
        );
    }
export default TaskAddingDialog