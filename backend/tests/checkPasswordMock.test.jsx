import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { checkPassword } from '../controllers/userController'; // Update the correct path

jest.mock('../models/userModel.js', () => ({
  findById: jest.fn(),
}));

describe('checkPassword function', () => {
  it('should check user password correctly', async () => {
    const mockId = 'user123';
    const mockPassword = 'testPassword';
    const mockUser = {
      _id: mockId,
      matchPassword: jest.fn().mockResolvedValue(true),
    };

    // Mocking the behavior of User.findById
    const findByIdMock = jest.fn().mockResolvedValue(mockUser);
    require('../models/userModel.js').findById = findByIdMock;

    const req = mockRequest({
      body: {
        _id: mockId,
        currentPassword: mockPassword,
      },
    });
    const res = mockResponse();

    await checkPassword(req, res);

    expect(findByIdMock).toHaveBeenCalledWith({"_id":mockId});
    expect(mockUser.matchPassword).toHaveBeenCalledWith(mockPassword);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Current password is correct' });
  });

  it('should handle incorrect password', async () => {
    const mockId = 'user456';
    const mockPassword = 'wrongPassword';
    const mockUser = {
      _id: mockId,
      matchPassword: jest.fn().mockResolvedValue(false),
    };

    // Mocking the behavior of User.findById
    const findByIdMock = jest.fn().mockResolvedValue(mockUser);
    require('../models/userModel.js').findById = findByIdMock;

    const req = mockRequest({
      body: {
        _id: mockId,
        currentPassword: mockPassword,
      },
    });
    const res = mockResponse();

    await checkPassword(req, res);

    // expect(401).toHaveBeenCalledWith(mockId);
    // expect(mockUser.matchPassword).toHaveBeenCalledWith(mockPassword);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Current password is incorrect' });
  });

});
