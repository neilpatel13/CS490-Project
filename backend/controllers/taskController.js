import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

// Add a new task
export const addTask = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, no user found');
    }
    const { taskName, priority, notes, numberOfTimers, date } = req.body;

    const task = new Task({
        user: req.user._id,
        taskName,
        state: 'not started',
        priority,
        notes,
        timer: numberOfTimers, // Map numberOfTimers to timer
        date,
    });

    const createdTask = await task.save();

    // Update user's tasks
    const user = await User.findById(req.user._id);
    if (user) {
        user.tasks.push(createdTask);
        await user.save();
    }

    res.status(201).json(createdTask);
});

// Update task state
export const updateTaskState = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.state = req.body.state;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// Update task notes
export const updateTaskNotes = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.notes = req.body.notes;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// Update number of timers
export const updateNumberOfTimers = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.timers = req.body.numberOfTimers;
        await task.save();
        const updatedTask = await Task.findById(task._id); // Fetch the updated task
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

export const updatePriority = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.priority = req.body.priority;
        await task.save();
        const updatedTask = await Task.findById(task._id); // Fetch the updated task
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});



// Get tasks for a specific date
export const getTasksByDate = asyncHandler(async (req, res) => {
    const userDate = new Date(req.query.date);
    const nextDay = new Date(userDate);
    nextDay.setDate(userDate.getDate() + 1);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    let query;
    if (userDate >= currentDate) {
    // Do not load tasks for future dates (including today)
    query = {
        user: req.user._id,
        date: { $gte: nextDay } // No tasks will match this condition for future dates
    };
    } else {
    // Include tasks for past dates
    query = {
        user: req.user._id,
        date: { $gte: userDate, $lt: nextDay }
    };
    }

    const tasks = await Task.find(query);
    res.json(tasks);    
});
