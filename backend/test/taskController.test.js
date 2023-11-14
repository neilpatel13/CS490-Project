const mongoose = require('mongoose');
const { addTask } = require('../controllers/taskController');

describe('Task Controller', () => {
  test('should create a new task', async () => {
    // Mock request and response objects
    const req = {
      body: {
        title: 'Test Task',
        priority: 'top priority',
        notes: 'Test notes',
        date: new Date()
      },
      user: {
        _id: new mongoose.Types.ObjectId()
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the function
    await addTask(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });
});
