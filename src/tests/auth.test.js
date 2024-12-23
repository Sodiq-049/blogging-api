require('dotenv').config(); // Load .env variables
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import your app
const User = require('../models/userModel'); // Adjust the path as necessary

describe('Auth API', () => {
  let server;

  beforeAll(async () => {
    try {
      // Connect to test database
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to test database.');

      // Start the server on a test-specific port
      server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
      });
    } catch (error) {
      console.error('Error in beforeAll:', error);
      throw error;
    }
  }, 180000); // Increased timeout

  beforeEach(async () => {
    await User.deleteMany(); // Clear the users collection before each test
  }); // Increased timeout

  afterAll(async () => {
    try {
      await mongoose.connection.dropDatabase(); // Drop the test database
      await mongoose.connection.close(); // Close database connection
      if (server) {
        await new Promise((resolve, reject) =>
          server.close((err) => (err ? reject(err) : resolve()))
        );
      }
      console.log('Server and database connections closed.');
    } catch (error) {
      console.error('Error in afterAll:', error);
    }
  }, 180000);

  test('POST /api/auth/signup should register a user', async () => {
    const response = await request(server)
      .post('/api/auth/signup')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user).toHaveProperty('email', 'johndoe@example.com');
  }, 30000);

  test('POST /api/auth/signin should log in a user', async () => {
    const response = await request(server)
      .post('/api/auth/signin')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  }, 30000);
});
