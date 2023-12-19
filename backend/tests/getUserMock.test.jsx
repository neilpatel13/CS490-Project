// Import necessary modules/functions
import { getUserProfile } from '../controllers/userController'; // Update the correct path
// Mocking req and res objects
const mockReq = {
  user: {
    _id: 'user_id',
    first: 'John',
    last: 'Doe',
    email: 'johndoe@example.com',
    pomodoro: 25,
    short: 5,
    long: 15,
  }
};

const mockJsonFn = jest.fn();
const mockStatusFn = jest.fn(() => ({ json: mockJsonFn }));
const mockRes = {
  status: mockStatusFn
};

describe('getUserProfile function', () => {
  it('should return user profile details with status code 200', async () => {
    await getUserProfile(mockReq, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledWith({
      _id: 'user_id',
      first: 'John',
      last: 'Doe',
      email: 'johndoe@example.com',
      pomodoro: 25,
      short: 5,
      long: 15,
    });
  });
});
