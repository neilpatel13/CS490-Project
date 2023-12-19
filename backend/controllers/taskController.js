import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import moment from 'moment-timezone';

// Add a new task
export const addTask = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401).json({ 'message': 'Not authorized, no user found' });
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
// Get tasks for a specific date
export const getTasksByDate = asyncHandler(async (req, res) => {
    const { date } = req.query; // Assuming date is in 'YYYY-MM-DD' format
    const userDate = moment.utc(date).startOf('day').toDate(); // Start of the user-selected day in UTC
    const nextDay = moment.utc(date).add(1, 'days').startOf('day').toDate(); // Start of the next day in UTC

    let query = {
        user: req.user._id
    };

    // Current date in UTC
    const currentDateUTC = moment.utc().startOf('day');

    if (currentDateUTC.isSame(userDate)) {
        // If the selected date is the current date, fetch all tasks from the current date and incomplete tasks from previous dates
        query.$or = [
            { date: { $gte: userDate, $lt: nextDay } },
            { state: { $ne: 'complete' }, date: { $lt: userDate } }
        ];
    } else {
        // For past dates, fetch both incomplete and complete tasks, but exclude 'complete' tasks that were not created on their respective dates
        query.$or = [
            { state: { $ne: 'complete' }, date: { $lt: nextDay } },
            { state: 'complete', date: { $gte: userDate, $lt: nextDay } }
        ];
    }

    const tasks = await Task.find(query);

    // Roll over tasks only if the selected date is a past date
    if (currentDateUTC.isAfter(userDate)) {
        for (let task of tasks) {
            if (task.state !== 'complete' && moment.utc(task.date).startOf('day').isBefore(userDate)) {
                task.state = 'rolled over';
                await task.save();
            }
        }
    }

    res.json(tasks);
});