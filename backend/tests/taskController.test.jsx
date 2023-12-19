// Import necessary modules/functions
import { addTask } from '../controllers/taskController'; // Replace 'yourFileContainingFunction' with the appropriate file path
import Task from '../models/taskModel';
import User from '../models/userModel';

const mockId = 'user123';
    const mockUser = {
      _id: mockId,
    };

    // Mocking the behavior of User.findById
    const findByIdMock = jest.fn().mockResolvedValue(mockUser);
    require('../models/userModel.js').findById = findByIdMock;
// Mocking req and res objects
const mockReq = {
  user: {
    _id: findByIdMock._id,
  },
  body: {
    taskName: 'Test Task',
    priority: 'Top Priority',
    notes: 'Test notes',
    numberOfTimers: 3,
    date: new Date(),
  }
};

const mockJsonFn = jest.fn();
const mockStatusFn = jest.fn(() => ({ json: mockJsonFn }));
const mockSaveFn = jest.fn(() => ({
  _id: 'created_task_id',
  user: 'user_id',
  taskName: 'Test Task',
  state: 'not started',
  priority: 'High',
  notes: 'Test notes',
  timer: 3,
  date: new Date(),
}));
const mockFindByIdFn = jest.fn(() => ({
  _id: 'user_id',
  tasks: [],
  save: jest.fn(),
}));
const mockTaskSaveFn = jest.fn(() => ({
  _id: 'created_task_id',
}));
const mockTask = jest.fn(() => ({
  save: mockTaskSaveFn,
}));

const mockRes = {
  status: mockStatusFn
};

describe('addTask function', () => {
  it('should create a task and return it with status code 201', async () => {
    // Task.mockImplementation(() => ({
    //   save: mockSaveFn,
    // }));

    User.findById = mockFindByIdFn;

    await addTask(mockReq, mockRes);

    expect(Task).toHaveBeenCalledWith({
      user: 'user_id',
      taskName: 'Test Task',
      state: 'not started',
      priority: 'High',
      notes: 'Test notes',
      timer: 3,
      date: expect.any(Date),
    });
    expect(mockSaveFn).toHaveBeenCalled();
    expect(mockFindByIdFn).toHaveBeenCalledWith('user_id');
    expect(mockTaskSaveFn).toHaveBeenCalled();
    expect(mockJsonFn).toHaveBeenCalledWith({
      _id: 'created_task_id',
      user: 'user_id',
      taskName: 'Test Task',
      state: 'not started',
      priority: 'High',
      notes: 'Test notes',
      timer: 3,
      date: expect.any(Date),
    });
    expect(mockStatusFn).toHaveBeenCalledWith(201);
  });

  it('should return an error when req.user is not defined', async () => {
    const mockReqNoUser = { ...mockReq, user: undefined };

    await addTask(mockReqNoUser, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(401);
    expect(mockJsonFn).toHaveBeenCalledWith({ error: 'Not authorized, no user found' });
  });
});
