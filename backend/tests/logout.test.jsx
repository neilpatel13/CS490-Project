import { logoutUser } from '../controllers/userController';

describe('logoutUser function', () => {
  it('should clear the jwt cookie and return a successful logout message', async () => {
    // Mock the response object
    const res = {
      cookie: jest.fn(), // Mock the cookie function
      status: jest.fn().mockReturnThis(), // Mock the status function
      json: jest.fn(), // Mock the json function
    };

    // Call the logoutUser function with the mocked request and response objects
    await logoutUser(null, res);

    // Assertions
    expect(res.cookie).toHaveBeenCalledWith('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User logged out' });
  });
});
