// backend/routes/taskRoutes.js
import express from 'express';
import { addTask, getTasksByDate, updateTaskNotes, updateNumberOfTimers, updatePriority } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import Task from '../models/taskModel.js';

const router = express.Router();

router.route('/')
  .post(protect, addTask)
  .get(protect, getTasksByDate);

router.route('/:id/notes')
  .put(protect, updateTaskNotes);

router.route('/:id/timers')
  .put(protect, updateNumberOfTimers);

router.route('/:id/priority')
  .put(protect, updatePriority);

// Endpoint to cycle through the task states
router.put('/:id/state', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const states = ['not started', 'in progress', 'complete', 'rolled over'];
    const currentIndex = states.indexOf(task.state);
    const nextState = states[(currentIndex + 1) % states.length];

    task.state = nextState;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send({ message: 'Error updating task state', error: error.toString() });
  }
});

export default router;