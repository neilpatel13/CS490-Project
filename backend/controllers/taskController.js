import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// Add a new task
export const addTask = asyncHandler(async (req, res) => {
    const { title, priority, notes, numberOfTimers, date } = req.body;

    const task = new Task({
        user: req.user._id,
        title,
        state: 'not started',
        priority,
        notes,
        numberOfTimers,
        date,
    });

    const createdTask = await task.save();
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
        task.numberOfTimers = req.body.numberOfTimers;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// Get tasks for a specific date
export const getTasksByDate = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id, date: req.query.date });
    res.json(tasks);
});
