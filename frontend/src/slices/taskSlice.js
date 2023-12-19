import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        setTasks: (state, action) => {
            return action.payload;
        },
        addTask: (state, action) => {
            state.push(action.payload);
        },
       updateTaskState: (state, action) => {
            // Find the task with the matching ID and update its state
            const task = state.find(task => task.id === action.payload.id);
            if (task) {
              task.state = action.payload.state;
            }
          }, //here for when update task is implemented 
    },
});

export const { setTasks, addTask, updateTaskState } = taskSlice.actions;

export default taskSlice.reducer;