const Task = require('../models/Task');
const User = require('../models/User');

describe('Model Tests', () => {
  test('Task model structure', () => {
    const taskInstance = new Task();
    expect(taskInstance).toHaveProperty('title');
    expect(taskInstance).toHaveProperty('priority');
    // Add other properties as needed
  });

  test('User model structure', () => {
    const userInstance = new User();
    expect(userInstance).toHaveProperty('email');
    expect(userInstance).toHaveProperty('password');
    // Add other properties as needed
  });
});
