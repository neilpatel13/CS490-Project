import express from 'express';
import { addTask, updateTaskState, updateTaskNotes, updateNumberOfTimers, getTasksByDate } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addTask).get(protect, getTasksByDate);
router.route('/:id/state').put(protect, updateTaskState);
router.route('/:id/notes').put(protect, updateTaskNotes);
router.route('/:id/timers').put(protect, updateNumberOfTimers);

export default router;
