import request from 'supertest';
import app from '../server'; // Make sure this is the correct path to your Express app instance

describe('API Endpoint Tests', () => {
  it('should authenticate a user and return user data with a valid email and password', async () => {
    const userData = {
      email: 'user5@test.com',
      password: '123456789.Com',
    };

    // Send a POST request to your authentication endpoint
    const response = await request(app)
      .post('/api/users/auth') // Replace with your actual authentication endpoint
      .send(userData);

    // Assertions to ensure that the response contains the expected data and status code
    expect(response.status).toBe(201); // Replace 201 with the expected status code on successful authentication
    // expect(response.body).toHaveProperty('_id');
    // expect(response.body).toHaveProperty('first', 'John');
    // Add more assertions based on the expected response data
  });

  it('should return an error with an invalid email or password', async () => {
    const userData = {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    };

    // Send a POST request to your authentication endpoint with invalid credentials
    const response = await request(app)
      .post('/api/users/auth') // Replace with your actual authentication endpoint
      .send(userData);

    // Assertions to ensure that the response contains the expected error message and status code
    expect(response.status).toBe(401); // Replace 401 with the expected status code for authentication failure
    expect(response.body).toEqual({ 'message': 'Invalid email or password' });
    // Add more assertions based on the expected error response
  }, 10000);

  it('should return an error with an invalid email or password', async () => {
    const userData = {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    };

    // Send a POST request to your authentication endpoint with invalid credentials
    const response = await request(app)
      .post('/api/users/auth') // Replace with your actual authentication endpoint
      .send(userData);

    // Assertions to ensure that the response contains the expected error message and status code
    expect(response.status).toBe(401); // Replace 401 with the expected status code for authentication failure
    expect(response.body).toEqual({ 'message': 'Invalid email or password' });
    // Add more assertions based on the expected error response
  }, 1000);
  it('should return an error with an invalid email or password', async () => {
    const userData = {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    };

    // Send a POST request to your authentication endpoint with invalid credentials
    const response = await request(app)
      .post('/api/users/auth') // Replace with your actual authentication endpoint
      .send(userData);

    // Assertions to ensure that the response contains the expected error message and status code
    expect(response.status).toBe(401); // Replace 401 with the expected status code for authentication failure
    expect(response.body).toEqual({ 'message': 'Invalid email or password' });
    // Add more assertions based on the expected error response
  });
  it('should return an error with an invalid email or password', async () => {
    const userData = {
      email: 'invalid@example.com',
      password: 'invalidpassword',
    };

    // Send a POST request to your authentication endpoint with invalid credentials
    const response = await request(app)
      .post('/api/users/auth') // Replace with your actual authentication endpoint
      .send(userData);

    // Assertions to ensure that the response contains the expected error message and status code
    expect(response.status).toBe(401); // Replace 401 with the expected status code for authentication failure
    expect(response.body).toEqual({ 'message': 'Invalid email or password' });
    // Add more assertions based on the expected error response
  });
});
