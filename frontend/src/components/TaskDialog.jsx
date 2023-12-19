import React, { useState } from 'react';
import {Button,
    TextField, Select,
    Dialog,DialogActions,
    DialogContent,DialogContentText,
    DialogTitle, MenuItem, InputLabel} from '@mui/material';
import { useAddTaskMutation, useGetTasksQuery } from '../slices/taskApiSlice';
import { useDispatch } from 'react-redux';
import { toggleRefresh } from '../slices/refreshSlice';

    const TaskAddingDialog = ({open, handleClose, selectedDate }) =>{
        const dispatch = useDispatch();
        const [taskName, setTaskName] = useState('');
        const [timer, setTimer] = useState(null);
        const [notes, setNotes] = useState('');
        const [priority, setPriority] = useState('');
        const { refetch } = useGetTasksQuery();

        const priorityOptions = ['Top Priority', 'Important', 'Other'];

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
                case 'priority':
                    setPriority(value);
                    break;
                default:
                    break;
            }
        };

        const handlePriorityChange = (event) => {
            setPriority(event.target.value);
        };

        //recent change
        const handleNumberChange = (event) => {
            const value = event.target.value;
            if (!isNaN(value) && value >= 0) {
                setTimer(value === '' ? null : parseInt(value, 10));
            } else {
                setTimer(0); // Set to 0 instead of '0' to keep the state as a number
            }
        };

        const [addTask, { isLoading: isAdding, isError: addError}] = useAddTaskMutation();

        const handleSubmit = async (event) => {
            event.preventDefault();
        
            // Ensure taskName and priority are not empty and timer is a number
            if(taskName.trim() === '' || priority === '' || isNaN(timer) || timer === null) {
                return;
            }
        
            const formattedDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
        
            const newTask = {
                taskName,
                numberOfTimers: Number(timer), // Change this line to match the backend field name
                notes,
                priority,
                date: formattedDate,
            };
        
            try {
                const addedTask = await addTask(newTask).unwrap();
                // ... other code ...
        
                handleClose();
        
                // Dispatch the toggleRefresh action
                dispatch(toggleRefresh());
                console.log('toggleRefresh action dispatched');
            } catch (error) {
                console.error('Failed to add task', error);
            }
        };

        return(
        <Dialog open={open} onClose={ handleClose }>
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
                    type="number"
                    fullWidth
                    variant="standard"
                    value={timer === null? '' : timer} //
                    onChange={handleNumberChange} /*recent change*/
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
        <DialogContent>
            <DialogContentText>
                {/* changing the label here for testing purposes */}
               <InputLabel id="priority-label">Select Priority</InputLabel>
            </DialogContentText>
            <Select
                labelId="priority-label"
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
                fullWidth
                >
                {priorityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
    </Dialog>
        );
    }
export default TaskAddingDialog
