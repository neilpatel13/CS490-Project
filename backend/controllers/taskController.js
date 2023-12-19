import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import moment from 'moment-timezone';

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
    const { date } = req.query; // Assuming date is in 'YYYY-MM-DD' format
    const userDate = moment.utc(date).startOf('day').toDate(); // Convert to JavaScript Date object
    const nextDay = moment.utc(date).add(1, 'days').startOf('day').toDate(); // Next day in UTC

    let query = {
        user: req.user._id
    };

    // If the selected date is the current date, include tasks that are not complete
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setMinutes(-currentDate.getTimezoneOffset()); // Convert to UTC

    userDate.setMinutes(-userDate.getTimezoneOffset()); // Convert to UTC

    if (userDate.getTime() === currentDate.getTime()) {
      query.state = { $ne: 'complete' }; // Tasks that are not complete
      query.date = { $lte: nextDay }; // Tasks on or before the selected date
    } else {
        console.log('userDate', userDate);
        query.$or = [
            { state: { $ne: 'complete' }, date: { $lt: nextDay } },
            { state: 'complete', date: { $gte: userDate, $lt: nextDay } }
          ];
    }

    const tasks = await Task.find(query);

    // If the selected date is not the current date, update all non-complete tasks to 'rolled over'
    if (userDate.getTime() !== currentDate.getTime()) {
      for (let task of tasks) {
        // Convert task's date to start of the day in UTC
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        taskDate.setMinutes(-taskDate.getTimezoneOffset());

        // Only roll over tasks that were created on a date before the selected date
        if (task.state !== 'complete' && taskDate.getTime() < userDate.getTime()) {
          task.state = 'rolled over';
          await task.save();
        }
      }
    }

    res.json(tasks);
});
