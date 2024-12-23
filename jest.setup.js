const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.env.NODE_ENV = 'test';
dotenv.config({ path: '.env' });

// Connect to the test database before running tests
beforeAll(async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
